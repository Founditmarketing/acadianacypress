import { useEffect, useState } from "react";
import { ArrowLeft, MessageSquare, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { categorySlug, getProduct, products } from "../data/products";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "../data/contact";
import PageSEO from "../seo/PageSEO";
import { breadcrumbSchema, productSchema } from "../seo/schema";

export default function ProductPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const product = getProduct(slug);
  const [activeImage, setActiveImage] = useState(0);

  // Reset gallery when navigating between products
  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  if (!product) {
    return (
      <section className="pt-44 lg:pt-52 pb-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto min-h-screen">
        <PageSEO
          title="Product Not Found | Acadiana Cypress"
          description="This product could not be found. Browse our full catalog of mill-direct Louisiana cypress."
          path={`/product/${slug}`}
          noIndex
        />
        <h1 className="text-brand-dark text-4xl font-light mb-6">
          Product not found
        </h1>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-brand-accent hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all products</span>
        </Link>
      </section>
    );
  }

  const related = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.categories.some((c) => product.categories.includes(c))
    )
    .slice(0, 4);

  return (
    <section className="bg-white pt-40 lg:pt-48 pb-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto min-h-screen">
      <PageSEO
        title={`${product.name} | Acadiana Cypress`}
        description={product.description}
        path={`/product/${product.slug}`}
        image={product.images[0]}
        jsonLd={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.categories[0], path: `/products/${categorySlug(product.categories[0])}` },
            { name: product.name, path: `/product/${product.slug}` },
          ]),
        ]}
      />
      {/* Breadcrumb */}
      <Link
        to="/products"
        className="inline-flex items-center space-x-2 text-sm text-brand-dark/60 hover:text-brand-accent transition-colors mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to all products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-4 relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={product.images[activeImage]}
                alt={`${product.name} — photo ${activeImage + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`aspect-square overflow-hidden transition-all ${
                    i === activeImage
                      ? "ring-2 ring-brand-accent ring-offset-2"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="max-w-xl">
          <div className="flex flex-wrap gap-2 mb-5">
            {product.categories.map((cat) => (
              <Link
                key={cat}
                to={`/products/${categorySlug(cat)}`}
                className="text-xs uppercase tracking-wider text-brand-dark/60 border border-gray-200 px-3 py-1.5 hover:border-brand-accent hover:text-brand-accent transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          <h1 className="title-serif text-brand-dark text-3xl md:text-5xl tracking-tight mb-6 leading-tight">
            {product.name}
          </h1>

          <p className="text-brand-accent text-xl font-medium mb-8">
            Contact us for pricing
          </p>

          <p className="text-brand-dark/80 text-lg font-light leading-relaxed mb-12">
            {product.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex-1 inline-flex items-center justify-center space-x-3 bg-brand-accent text-white px-8 py-4 hover:bg-[#a36814] transition-colors font-medium tracking-wide"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                `Product inquiry: ${product.name}`
              )}`}
              className="flex-1 inline-flex items-center justify-center space-x-3 border border-brand-dark text-brand-dark px-8 py-4 hover:bg-brand-dark hover:text-white transition-colors font-medium tracking-wide"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Message Us</span>
            </a>
          </div>

          <p className="text-sm text-brand-dark/50 font-light">
            Call us at {PHONE_DISPLAY} or stop by our Grand Coteau showroom or
            Moreauville sawmill — we'll help you find the right fit for your
            project.
          </p>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-24 pt-16 border-t border-gray-200">
          <h2 className="title-serif text-brand-dark text-2xl md:text-3xl tracking-tight mb-10">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <Link key={p.slug} to={`/product/${p.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-brand-dark mb-4">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <h3 className="text-brand-dark font-medium leading-snug group-hover:text-brand-accent transition-colors">
                  {p.name}
                </h3>
                <p className="text-brand-accent text-sm font-medium mt-1">
                  Contact us for pricing
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
