import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const baseUrl = (process.env.AUDIT_BASE_URL || process.argv[2] || "http://127.0.0.1:4173").replace(
  /\/$/,
  "",
);
const publicSiteUrl = "https://cotepiercing.cl";
const failures = [];

function fail(message) {
  failures.push(message);
}

function extract(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return "";
}

function localUrl(publicUrl) {
  const url = new URL(publicUrl);
  return `${baseUrl}${url.pathname}${url.search}`;
}

async function request(url, options = {}) {
  return fetch(url, { redirect: "manual", ...options });
}

const sitemapSource = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
if (!sitemapSource.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
  fail("sitemap.xml no tiene una declaración XML válida.");
}
if (!sitemapSource.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
  fail("sitemap.xml no contiene el urlset esperado.");
}

const sitemapUrls = [
  ...sitemapSource.matchAll(/<loc>(https:\/\/cotepiercing\.cl[^<]*)<\/loc>/g),
].map((match) => match[1]);
if (sitemapUrls.length === 0) fail("El sitemap no contiene URLs.");
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail("El sitemap contiene URLs duplicadas.");
for (const url of sitemapUrls) {
  if (url !== `${publicSiteUrl}/` && url.endsWith("/")) {
    fail(`URL no canónica con barra final en sitemap: ${url}`);
  }
}

const sitemapUrlSet = new Set(sitemapUrls);
const inboundLinks = new Map(sitemapUrls.map((url) => [url, new Set()]));
const results = [];
for (const canonicalUrl of sitemapUrls) {
  const response = await request(localUrl(canonicalUrl), {
    headers: { "user-agent": "Cotepiercing-Day1-Audit/1.0" },
  });
  const html = await response.text();
  const title = extract(html, [/<title[^>]*>([\s\S]*?)<\/title>/i]);
  const description = extract(html, [
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i,
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i,
  ]);
  const canonical = extract(html, [
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)/i,
    /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i,
  ]);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const hasNoindex =
    /<meta[^>]+(?:name=["']robots["'][^>]+content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots)/i.test(
      html,
    );

  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (/^(?:mailto:|tel:|javascript:)/i.test(href)) continue;
    try {
      const target = new URL(href, canonicalUrl);
      if (target.origin !== publicSiteUrl) continue;
      target.hash = "";
      target.search = "";
      const normalizedTarget =
        target.pathname === "/"
          ? `${publicSiteUrl}/`
          : `${publicSiteUrl}${target.pathname.replace(/\/$/, "")}`;
      if (normalizedTarget !== canonicalUrl && sitemapUrlSet.has(normalizedTarget)) {
        inboundLinks.get(normalizedTarget)?.add(canonicalUrl);
      }
    } catch {
      fail(`${canonicalUrl} contiene un enlace interno inválido: ${href}`);
    }
  }

  if (response.status !== 200)
    fail(`${canonicalUrl} respondió ${response.status}; se esperaba 200.`);
  if (!title) fail(`${canonicalUrl} no tiene title.`);
  if (!description) fail(`${canonicalUrl} no tiene meta description.`);
  if (canonical !== canonicalUrl) {
    fail(`${canonicalUrl} declara canonical ${canonical || "(vacío)"}.`);
  }
  if (h1Count !== 1) fail(`${canonicalUrl} contiene ${h1Count} H1; se esperaba 1.`);
  if (hasNoindex) fail(`${canonicalUrl} contiene noindex.`);

  const responseCommit = response.headers.get("x-app-commit");
  if (!responseCommit) fail(`${canonicalUrl} no expone X-App-Commit.`);

  if (canonicalUrl !== `${publicSiteUrl}/`) {
    const slashUrl = `${localUrl(canonicalUrl)}/`;
    const slashResponse = await request(slashUrl);
    const expectedLocation = new URL(canonicalUrl).pathname;
    const actualLocation = slashResponse.headers.get("location");
    if (slashResponse.status !== 301) {
      fail(`${canonicalUrl}/ respondió ${slashResponse.status}; se esperaba 301.`);
    }
    if (actualLocation !== expectedLocation) {
      fail(
        `${canonicalUrl}/ redirige a ${actualLocation || "(vacío)"}; se esperaba ${expectedLocation}.`,
      );
    }
    const targetResponse = await request(`${baseUrl}${actualLocation || ""}`);
    if (targetResponse.status !== 200) {
      fail(`El destino de ${canonicalUrl}/ respondió ${targetResponse.status}; se esperaba 200.`);
    }
  }

  results.push({
    url: canonicalUrl,
    status: response.status,
    title: Boolean(title),
    description: Boolean(description),
    canonical: canonical === canonicalUrl,
    h1: h1Count,
  });
}

for (const [url, sources] of inboundLinks) {
  if (sources.size < 2) {
    fail(`${url} tiene ${sources.size} enlaces internos entrantes; se requieren al menos 2.`);
  }
}

const queryResponse = await request(`${baseUrl}/servicios/?utm_source=auditoria&x=1`);
if (queryResponse.status !== 301) fail("La variante con query string no respondió 301.");
if (queryResponse.headers.get("location") !== "/servicios?utm_source=auditoria&x=1") {
  fail(`La redirección no preservó la query string: ${queryResponse.headers.get("location")}`);
}

for (const excludedPath of [
  "/api/google-reviews/",
  "/robots.txt/",
  "/google6dcbd8f7e36626a2.html/",
]) {
  const response = await request(`${baseUrl}${excludedPath}`);
  if (response.status === 301) fail(`${excludedPath} no debe normalizarse como página HTML.`);
}

const notFoundResponse = await request(`${baseUrl}/__auditoria-pagina-inexistente`);
const notFoundBody = await notFoundResponse.text();
if (notFoundResponse.status !== 404)
  fail(`La página inexistente respondió ${notFoundResponse.status}.`);
if (!/Página no encontrada/i.test(notFoundBody))
  fail("La respuesta 404 no muestra la página de error.");

for (const endpoint of ["/api/google-reviews", "/google6dcbd8f7e36626a2.html"]) {
  const response = await request(`${baseUrl}${endpoint}`);
  if (response.status !== 200) fail(`${endpoint} respondió ${response.status}; se esperaba 200.`);
}

const robotsResponse = await request(`${baseUrl}/robots.txt`);
const robotsBody = await robotsResponse.text();
if (robotsResponse.status !== 200) fail("robots.txt no respondió 200.");
if (!robotsBody.includes("Sitemap: https://cotepiercing.cl/sitemap.xml")) {
  fail("robots.txt no apunta al sitemap canónico.");
}

const servedSitemapResponse = await request(`${baseUrl}/sitemap.xml`);
if (servedSitemapResponse.status !== 200) fail("sitemap.xml no respondió 200.");

const homeResponse = await request(`${baseUrl}/`);
const homeHtml = await homeResponse.clone().text();
if (!/La ubicación exacta se proporciona por DM/i.test(homeHtml)) {
  fail("La portada no informa que la ubicación exacta se proporciona por DM.");
}
if (/"@type":"(?:PostalAddress|GeoCoordinates)"/.test(homeHtml)) {
  fail("La portada publica dirección o coordenadas en sus datos estructurados.");
}
if (/<iframe\b[^>]+(?:maps|location)/i.test(homeHtml)) {
  fail("La portada todavía incluye un mapa de ubicación público.");
}
const requiredHeaders = [
  "strict-transport-security",
  "content-security-policy",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-frame-options",
  "x-app-commit",
];
for (const header of requiredHeaders) {
  if (!homeResponse.headers.get(header)) fail(`Falta el header de seguridad/versión ${header}.`);
}
if (homeResponse.headers.get("cache-control") !== "public, max-age=0, must-revalidate") {
  fail(`Cache-Control HTML inesperado: ${homeResponse.headers.get("cache-control")}`);
}

const assetPath = extract(homeHtml, [/(?:href|src)=["'](\/assets\/[^"']+)/i]);
if (!assetPath) {
  fail("No se encontró un asset versionado en la portada.");
} else {
  const assetResponse = await request(`${baseUrl}${assetPath}`);
  if (assetResponse.status !== 200)
    fail(`El asset ${assetPath} respondió ${assetResponse.status}.`);
  if (assetResponse.headers.get("cache-control") !== "public, max-age=31536000, immutable") {
    fail(`Cache-Control del asset ${assetPath} no es inmutable.`);
  }
}

const versionResponse = await request(`${baseUrl}/version.json`);
const version = await versionResponse.json().catch(() => ({}));
if (versionResponse.status !== 200) fail("/version.json no respondió 200.");
if (!version.commit || !version.buildTime) fail("/version.json no contiene commit y buildTime.");
if (versionResponse.headers.get("cache-control") !== "no-store") {
  fail("/version.json debe usar Cache-Control: no-store.");
}
if (versionResponse.headers.get("x-app-commit") !== version.commit) {
  fail("X-App-Commit y version.json no coinciden.");
}
if (
  baseUrl.startsWith("https://") &&
  (!version.cloudflareVersion?.id ||
    versionResponse.headers.get("x-cloudflare-worker-version") !== version.cloudflareVersion.id)
) {
  fail("La versión pública no expone un deployment ID consistente de Cloudflare.");
}

let expectedCommit = process.env.EXPECTED_COMMIT;
if (!expectedCommit) {
  try {
    expectedCommit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    expectedCommit = undefined;
  }
}
if (expectedCommit && version.commit !== expectedCommit) {
  fail(`Versión desplegada ${version.commit} no coincide con commit esperado ${expectedCommit}.`);
}

const errorPageSource = await readFile(
  new URL("../src/lib/error-page.ts", import.meta.url),
  "utf8",
);
if (!errorPageSource.includes("Something went wrong on our end.")) {
  fail("La página 500 no conserva un mensaje genérico.");
}
if (/error\.stack|stackTrace|JSON\.stringify\(error\)/.test(errorPageSource)) {
  fail("La página 500 podría exponer detalles internos.");
}

const summary = {
  baseUrl,
  sitemapUrls: sitemapUrls.length,
  passed: failures.length === 0,
  commit: version.commit,
  buildTime: version.buildTime,
  results,
  inboundLinks: Object.fromEntries([...inboundLinks].map(([url, sources]) => [url, sources.size])),
  minimumInboundLinks: Math.min(...[...inboundLinks.values()].map((sources) => sources.size)),
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length > 0) process.exitCode = 1;
