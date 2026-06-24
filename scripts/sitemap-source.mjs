import { readFile } from "node:fs/promises";

const sitePath = new URL("../src/lib/site.ts", import.meta.url);
const seoPath = new URL("../src/lib/seo.ts", import.meta.url);
const serviceContentPath = new URL("../src/data/service-content.ts", import.meta.url);

function unique(values) {
  return [...new Set(values)];
}

function requireMatch(source, pattern, label) {
  const match = source.match(pattern);
  if (!match?.[1]) {
    throw new Error(`No se pudo leer ${label} para el sitemap dinámico.`);
  }
  return match[1];
}

function extractCorePaths(seoSource) {
  const block = requireMatch(
    seoSource,
    /export const corePageSeo:[\s\S]*?=\s*\[([\s\S]*?)\];/,
    "corePageSeo",
  );
  const paths = [...block.matchAll(/\bpath:\s*"([^"]+)"/g)].map((match) => match[1]);
  if (paths.length === 0) {
    throw new Error("corePageSeo no contiene rutas para el sitemap.");
  }
  return unique(paths);
}

function extractServiceSlugs(serviceSource) {
  const slugs = [...serviceSource.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
  if (slugs.length === 0) {
    throw new Error("service-content.ts no contiene slugs para el sitemap.");
  }
  return unique(slugs);
}

const [siteSource, seoSource, serviceSource] = await Promise.all([
  readFile(sitePath, "utf8"),
  readFile(seoPath, "utf8"),
  readFile(serviceContentPath, "utf8"),
]);

export const SITE_URL = requireMatch(siteSource, /\burl:\s*"([^"]+)"/, "SITE.url");
export const SITEMAP_LASTMOD = requireMatch(
  seoSource,
  /export const SITEMAP_LASTMOD\s*=\s*"([^"]+)"/,
  "SITEMAP_LASTMOD",
);

export function absoluteUrl(path) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export const sitemapPages = [
  ...extractCorePaths(seoSource).map((path) => ({ path })),
  ...extractServiceSlugs(serviceSource).map((slug) => ({ path: `/servicios/${slug}` })),
];
