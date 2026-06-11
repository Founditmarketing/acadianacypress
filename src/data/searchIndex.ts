import { PRODUCT_CATEGORIES, categorySlug, products } from "./products";

export interface SearchItem {
  title: string;
  href: string;
  type: "Page" | "Category" | "Product";
  /** Extra lowercase text matched against the query. */
  keywords: string;
}

export const searchIndex: SearchItem[] = [
  { title: "Home", href: "#", type: "Page", keywords: "home welcome main" },
  {
    title: "Why Cypress",
    href: "#why-cypress",
    type: "Page",
    keywords:
      "history quality louisiana state tree bald cypress durability heart grain",
  },
  {
    title: "Contact Us",
    href: "#contact-us",
    type: "Page",
    keywords: "phone email message quote form call pricing samples",
  },
  {
    title: "Our Locations",
    href: "#locations",
    type: "Page",
    keywords:
      "visit showroom sawmill moreauville grand coteau hours directions address map",
  },
  {
    title: "Browse All Products",
    href: "#products",
    type: "Page",
    keywords: "shop store catalog browse products",
  },
  {
    title: "Our Work",
    href: "#our-work",
    type: "Page",
    keywords: "gallery projects portfolio showcase photos work examples",
  },
  ...PRODUCT_CATEGORIES.map(
    (category): SearchItem => ({
      title: category,
      href: `#products/${categorySlug(category)}`,
      type: "Category",
      keywords: category.toLowerCase(),
    })
  ),
  ...products.map(
    (product): SearchItem => ({
      title: product.name,
      href: `#product/${product.slug}`,
      type: "Product",
      keywords: `${product.categories.join(" ")} ${product.description}`.toLowerCase(),
    })
  ),
];

/** Every space-separated term must match the title or keywords. */
export function searchSite(query: string, limit = 12): SearchItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];
  const terms = trimmed.split(/\s+/);
  return searchIndex
    .filter((item) => {
      const haystack = `${item.title.toLowerCase()} ${item.keywords}`;
      return terms.every((term) => haystack.includes(term));
    })
    .slice(0, limit);
}
