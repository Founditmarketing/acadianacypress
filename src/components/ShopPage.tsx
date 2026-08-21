import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import {
  PRODUCT_CATEGORIES,
  categorySlug,
  products,
} from "../data/products";
import PageSEO from "../seo/PageSEO";
import { breadcrumbSchema } from "../seo/schema";
import SectionLabel from "./SectionLabel";

const MotionLink = motion.create(Link);

// Only categories that actually contain products, with live counts,
// so the filters always match the catalog exactly.
const countFor = (cat: string) =>
  products.filter((p) => (p.categories as string[]).includes(cat)).length;
const filterCategories = PRODUCT_CATEGORIES.filter((c) => countFor(c) > 0);

export default function ShopPage() {
  const { category } = useParams<{ category?: string }>();
  const activeCategory = filterCategories.find(
    (c) => categorySlug(c) === category
  );
  const visible = activeCategory
    ? products.filter((p) => p.categories.includes(activeCategory))
    : products;

  const title = activeCategory
    ? `${activeCategory} | Acadiana Cypress`
    : "Shop All Cypress Products | Acadiana Cypress";
  const description = activeCategory
    ? `Browse our ${activeCategory.toLowerCase()} — mill-direct Louisiana cypress, milled in South Louisiana. Call or message us for pricing.`
    : "Browse mill-direct Louisiana cypress: flooring, lumber, mantels, posts & beams, tongue & groove, walls & ceilings, and hunting blinds.";
  const path = activeCategory ? `/products/${categorySlug(activeCategory)}` : "/products";

  return (
    <section className="bg-white pt-44 lg:pt-52 pb-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto min-h-screen">
      <PageSEO
        title={title}
        description={description}
        path={path}
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          ...(activeCategory ? [{ name: activeCategory, path }] : []),
        ])}
      />
      <SectionLabel>Our Products</SectionLabel>
      <h1 className="title-serif text-brand-dark text-4xl md:text-6xl tracking-tight mb-6">
        {activeCategory ? activeCategory.toUpperCase() : "BROWSE ALL"}
      </h1>
      <p className="text-brand-dark/70 font-light text-lg max-w-2xl mb-12">
        Every piece is milled in-house in South Louisiana. Found something you
        like? Call or message us — we'll talk through sizing, finish, and
        shipping.
      </p>

      {/* Category filters — wrapping chips, no horizontal scroll needed */}
      <div className="flex flex-wrap gap-2.5 mb-14">
        {["All", ...filterCategories].map((cat) => {
          const isActive =
            cat === "All" ? !activeCategory : cat === activeCategory;
          const count = cat === "All" ? products.length : countFor(cat);
          return (
            <Link
              key={cat}
              to={cat === "All" ? "/products" : `/products/${categorySlug(cat)}`}
              className={`inline-flex items-center gap-2 px-4 py-2 border text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-dark border-brand-dark text-white"
                  : "border-brand-dark/20 text-brand-dark/70 hover:border-brand-accent hover:text-brand-accent"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[11px] ${
                  isActive ? "text-brand-accent" : "text-brand-dark/40"
                }`}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {visible.map((product, i) => (
          <MotionLink
            key={product.slug}
            to={`/product/${product.slug}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
            className="group block bg-white"
          >
            <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden bg-brand-dark relative">
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-4 left-4 text-white text-sm font-medium tracking-wide opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                View details →
              </span>
            </div>
            <div className="pt-5 pb-2">
              <p className="text-xs text-brand-dark/50 uppercase tracking-wider mb-1.5">
                {product.categories.join(" · ")}
              </p>
              <h3 className="text-brand-dark text-lg font-medium leading-snug mb-1.5 group-hover:text-brand-accent transition-colors">
                {product.name}
              </h3>
              <p className="text-brand-accent text-sm font-medium">
                Contact us for pricing
              </p>
            </div>
          </MotionLink>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-brand-dark/60 font-light text-lg py-12">
          No products in this category yet.
        </p>
      )}
    </section>
  );
}
