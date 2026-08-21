// Generates public/sitemap.xml and public/robots.txt from the real app
// routes and product catalog, so they can never drift out of sync with the
// site. Runs automatically before every build (see package.json "build").
import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PRODUCT_CATEGORIES, categorySlug, products } from "../src/data/products";
import { SITE_URL } from "../src/seo/constants";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const staticRoutes = [
  "/",
  "/why-cypress",
  "/products",
  "/our-work",
  "/contact-us",
  "/locations",
  "/privacy-policy",
  "/terms-conditions",
];

const categoryRoutes = PRODUCT_CATEGORIES.map(
  (category) => `/products/${categorySlug(category)}`
);

const productRoutes = products.map((product) => `/product/${product.slug}`);

const routes = [...staticRoutes, ...categoryRoutes, ...productRoutes];

function buildSitemap(): string {
  const urls = routes
    .map(
      (route) =>
        `  <url>\n    <loc>${SITE_URL}${route}</loc>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

writeFileSync(path.join(ROOT, "public", "sitemap.xml"), buildSitemap());
writeFileSync(path.join(ROOT, "public", "robots.txt"), buildRobots());

console.log(`Generated sitemap.xml with ${routes.length} URLs and robots.txt.`);
