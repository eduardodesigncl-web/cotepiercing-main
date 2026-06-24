import { writeFile } from "node:fs/promises";
import { absoluteUrl, SITEMAP_LASTMOD, sitemapPages } from "../src/lib/seo.ts";

const sitemapPath = new URL("../public/sitemap.xml", import.meta.url);

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const urls = sitemapPages.map((page) => {
  const loc = escapeXml(absoluteUrl(page.path));
  return `  <url><loc>${loc}</loc><lastmod>${SITEMAP_LASTMOD}</lastmod></url>`;
});

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

await writeFile(sitemapPath, sitemap, "utf8");
console.log(`Generated public/sitemap.xml with ${sitemapPages.length} URLs.`);
