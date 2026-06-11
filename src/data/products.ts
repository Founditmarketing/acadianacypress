export type ProductCategory =
  | "Flooring"
  | "Hunting Blinds"
  | "Lumber"
  | "Mantels"
  | "Posts & Beams"
  | "Tongue & Groove"
  | "Walls & Ceilings";

export interface Product {
  slug: string;
  name: string;
  description: string;
  categories: ProductCategory[];
  /** First image is the featured/main image; order preserved from the old site. */
  images: string[];
  /** Description was missing/placeholder on the old site and was written fresh. */
  generatedDescription?: boolean;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Flooring",
  "Hunting Blinds",
  "Lumber",
  "Mantels",
  "Posts & Beams",
  "Tongue & Groove",
  "Walls & Ceilings",
];

export const categorySlug = (category: string) =>
  category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const imgs = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) =>
    `/products/${slug}/${String(i + 1).padStart(2, "0")}.jpg`
  );

export const products: Product[] = [
  {
    slug: "cypress-post-beams",
    name: "Cypress Post & Beams",
    description: "Our biggest sellers are 6×6, 8×8, 10×10 & 12×12.",
    categories: ["Posts & Beams"],
    images: imgs("cypress-post-beams", 7),
  },
  {
    slug: "cypress-shiplap",
    name: "Cypress Shiplap",
    description:
      "We make Cypress Shiplap rather than pine shiplap. By using cypress you won't ever have to worry about termites eating it as they would pine.",
    categories: ["Walls & Ceilings"],
    images: imgs("cypress-shiplap", 2),
  },
  {
    slug: "cypress-trees",
    name: "Cypress Trees",
    description:
      "We sell Cypress trees which look amazing in homes, offices, camps, or lodges. Give your space that good 'Louisiana Look.'",
    categories: ["Posts & Beams"],
    images: imgs("cypress-trees", 3),
  },
  {
    slug: "fireplace-mantels",
    name: "Fireplace Mantels",
    description:
      "We have a large variety of fireplace mantels and we're always putting more for display in our mantel shed.",
    categories: ["Mantels"],
    images: imgs("fireplace-mantels", 3),
  },
  {
    slug: "hardwood-varieties",
    name: "Hardwood Varieties",
    description:
      "Our buildings are stocked with some beautiful Cypress, Willow, Cedar, and Reclaimed Hardwoods!",
    categories: ["Flooring", "Walls & Ceilings"],
    images: imgs("hardwood-varieties", 11),
  },
  {
    slug: "hunting-blinds",
    name: "Hunting Blinds",
    description:
      "Our cypress hunting blinds redefine comfort in the field. Crafted with meticulous attention to detail, these blinds offer a quiet and cozy haven for hunters.",
    categories: ["Hunting Blinds"],
    images: imgs("hunting-blinds", 1),
  },
  {
    slug: "kentucky-black",
    name: "Kentucky Black",
    description:
      "Kentucky Black adds elegance and depth to walls and ceilings, perfect for a stylish, modern look.",
    categories: ["Walls & Ceilings"],
    images: imgs("kentucky-black", 9),
  },
  {
    slug: "kentucky-white-wash",
    name: "Kentucky White Wash",
    description:
      "Kentucky White Wash brightens walls and ceilings, offering a fresh, airy feel to any room.",
    categories: ["Walls & Ceilings"],
    images: imgs("kentucky-white-wash", 9),
  },
  {
    slug: "mixed-hardwood-reclaimed-flooring",
    name: "Mixed Hardwood & Reclaimed Flooring",
    description:
      "Choose Acadiana Cypress for beautiful high quality Mixed Hardwood Reclaimed Flooring. This product can be used for flooring, ceilings, and walls.",
    categories: ["Flooring", "Lumber", "Walls & Ceilings"],
    images: imgs("mixed-hardwood-reclaimed-flooring", 5),
  },
  {
    slug: "mixed-reclaimed-naily-hardwood",
    name: "Mixed Reclaimed Naily Hardwood",
    description:
      "Mixed reclaimed naily hardwood adds a touch of history and character to walls and ceilings, perfect for a rustic yet refined look.",
    categories: ["Walls & Ceilings"],
    images: imgs("mixed-reclaimed-naily-hardwood", 5),
  },
  {
    slug: "pecky-black-ant-trailed-tg-cypress",
    name: "Pecky & Black Ant Trailed Tongue & Grooved Cypress",
    description:
      "High-quality cypress with natural pecking and ant trails. Ideal for ceilings, walls, and flooring. Choose Acadiana Cypress for durable, reclaimed wood products.",
    categories: ["Lumber", "Tongue & Groove"],
    images: imgs("pecky-black-ant-trailed-tg-cypress", 2),
  },
  {
    slug: "pecky-cypress",
    name: "Pecky Cypress",
    description:
      "Choose Acadiana Cypress for beautiful high quality Pecky Cypress. Pecky cypress showcases nature's creativity. Its textured beauty is unmatched.",
    categories: ["Lumber", "Walls & Ceilings"],
    images: imgs("pecky-cypress", 11),
  },
  {
    slug: "sinker-cypress",
    name: "Sinker Cypress",
    description:
      'Sinker Cypress 2" thick slabs. These are used mostly for table, counter, island tops and shelvings.',
    categories: ["Lumber"],
    images: imgs("sinker-cypress", 3),
  },
  {
    slug: "tg-cypress",
    name: "T&G Cypress",
    description:
      "Classic tongue & groove cypress, milled in-house for a clean, seamless fit. A timeless choice for walls, ceilings, and porches that's naturally resistant to rot and insects.",
    categories: ["Lumber", "Tongue & Groove"],
    images: imgs("tg-cypress", 5),
    generatedDescription: true,
  },
  {
    slug: "tight-fitted-tg-cypress",
    name: "Tight Fitted Tongue & Grooved Cypress",
    description:
      "Precision-milled tongue & groove cypress with an extra-tight fit for a smooth, uniform finish. Perfect for interior walls and ceilings where clean lines matter.",
    categories: ["Lumber", "Tongue & Groove"],
    images: imgs("tight-fitted-tg-cypress", 1),
    generatedDescription: true,
  },
  {
    slug: "weathered-gray-mixed-hardwoods",
    name: "Weathered Gray Mixed Hardwoods",
    description:
      "Weathered Gray Mixed Hardwoods offer a classic, aged look for walls and ceilings, ideal for creating a serene, timeless atmosphere.",
    categories: ["Walls & Ceilings"],
    images: imgs("weathered-gray-mixed-hardwoods", 4),
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
