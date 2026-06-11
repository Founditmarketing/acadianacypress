import { ArrowRight } from "lucide-react";
import { products, type ProductCategory } from "../data/products";
import SectionLabel from "./SectionLabel";

const cards: {
  title: ProductCategory;
  subtitle: string;
  image: string;
  href: string;
}[] = [
  {
    title: "Walls & Ceilings",
    subtitle: "Shiplap, Kentucky finishes & reclaimed looks",
    image: "/products/cypress-shiplap/01.jpg",
    href: "#products/walls-ceilings",
  },
  {
    title: "Flooring",
    subtitle: "Antique pine, oak & reclaimed hardwoods",
    image: "/acadiana-floor2.jpg",
    href: "#products/flooring",
  },
  {
    title: "Lumber",
    subtitle: "New, sinker & pecky cypress",
    image: "/products/sinker-cypress/01.jpg",
    href: "#products/lumber",
  },
  {
    title: "Posts & Beams",
    subtitle: "6×6 to 12×12, milled to order",
    image: "/products/cypress-post-beams/01.jpg",
    href: "#products/posts-beams",
  },
  {
    title: "Tongue & Groove",
    subtitle: "Classic & tight-fit profiles",
    image: "/products/tg-cypress/01.jpg",
    href: "#products/tongue-groove",
  },
  {
    title: "Mantels",
    subtitle: "One-of-a-kind fireplace pieces",
    image: "/products/fireplace-mantels/01.jpg",
    href: "#products/mantels",
  },
  {
    title: "Hunting Blinds",
    subtitle: "Custom cypress comfort in the field",
    image: "/products/hunting-blinds/01.jpg",
    href: "#products/hunting-blinds",
  },
];

const countFor = (category: ProductCategory) =>
  products.filter((p) => p.categories.includes(category)).length;

export default function Services() {
  return (
    <section className="relative bg-gray-50 py-24 pl-6 md:pl-12 lg:pl-24 overflow-hidden">
      {/* Faint woodgrain pattern, tiled at natural size (white art inverted to dark for the light background) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.01] invert"
        style={{
          backgroundImage: "url(/acadiana-woodpatternbackground.png)",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 max-w-[1920px] mx-auto">
        <div className="flex items-end justify-between pr-6 md:pr-12 lg:pr-24 mb-16">
          <div>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="title-serif text-brand-dark text-3xl md:text-5xl tracking-tight">
              CUSTOM MILLING & LUMBER
            </h2>
            <p className="text-brand-dark/60 font-light text-lg mt-4 max-w-2xl">
              From rough-sawn timbers to finished flooring — every piece is
              milled, dried, and finished in-house at our Louisiana sawmill.
            </p>
          </div>
          <a
            href="#products"
            className="hidden md:inline-flex items-center space-x-3 text-sm font-medium tracking-wider uppercase text-brand-dark hover:text-brand-accent transition-colors border-b border-brand-dark/30 hover:border-brand-accent pb-1 whitespace-nowrap ml-8"
          >
            <span>Browse All</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="flex space-x-6 overflow-x-auto pb-12 pr-6 md:pr-12 lg:pr-24 no-scrollbar snap-x snap-mandatory">
          {cards.map((card, index) => {
            const count = countFor(card.title);
            return (
              <a
                key={card.title}
                href={card.href}
                className="group relative flex-none w-[72vw] sm:w-[380px] md:w-[440px] lg:w-[480px] h-[430px] md:h-[600px] overflow-hidden snap-center bg-brand-dark"
              >
                {/* Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-100 md:opacity-90 transition-all duration-700 md:group-hover:scale-110 md:group-hover:opacity-100"
                />

                {/* Overlay gradient, deepens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 opacity-100 md:opacity-90 md:group-hover:opacity-100 transition-opacity duration-500" />

                {/* Inset line frame, draws in on hover */}
                <div className="pointer-events-none absolute inset-3 md:inset-4 border border-white/40 scale-100 md:border-white/0 md:scale-[0.97] md:group-hover:border-white/40 md:group-hover:scale-100 transition-all duration-500" />

                {/* Index */}
                <span className="absolute top-7 right-7 md:top-8 md:right-8 text-brand-accent md:text-white/60 text-sm font-light tracking-[0.3em] transition-colors duration-500 md:group-hover:text-brand-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="absolute inset-x-7 bottom-7 md:inset-x-8 md:bottom-8">
                  <div className="h-[2px] w-24 md:w-10 bg-brand-accent mb-4 md:mb-5 transition-all duration-500 md:group-hover:w-24" />
                  <h3 className="title-serif text-white text-xl md:text-3xl leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-white/70 text-sm font-light mt-2">
                    {card.subtitle}
                  </p>

                  {/* Reveal row */}
                  <div className="flex items-center justify-between max-h-14 opacity-100 mt-5 md:max-h-0 md:opacity-0 md:mt-0 overflow-hidden transition-all duration-500 md:group-hover:max-h-14 md:group-hover:opacity-100 md:group-hover:mt-6">
                    <span className="text-white/80 text-xs uppercase tracking-[0.2em]">
                      {count} {count === 1 ? "Product" : "Products"}
                    </span>
                    <span className="flex items-center text-brand-accent text-sm font-medium tracking-wide">
                      View
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
