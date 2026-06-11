import { ArrowRight, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "../data/contact";
import DedicatedCTA from "./DedicatedCTA";
import PageHero from "./PageHero";

/** Image block with offset accent frame, caption chip, and hover zoom. */
function FramedImage({
  src,
  alt,
  caption,
  offset = "left",
}: {
  src: string;
  alt: string;
  caption: string;
  offset?: "left" | "right";
}) {
  return (
    <div
      className={`relative pb-6 ${offset === "left" ? "pl-6" : "pr-6"}`}
    >
      {/* Offset line frame behind the photo */}
      <div
        className={`absolute bottom-0 w-3/4 h-3/4 border border-brand-accent/50 ${
          offset === "left" ? "left-0" : "right-0"
        }`}
      />
      <div className="relative overflow-hidden group">
        <img
          src={src}
          alt={alt}
          className="w-full max-h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        {/* Caption chip */}
        <p className="absolute bottom-5 left-5 bg-brand-dark/85 backdrop-blur-sm text-white text-[11px] uppercase tracking-[0.25em] px-4 py-2.5">
          {caption}
        </p>
        {/* Inset frame on hover */}
        <div className="pointer-events-none absolute inset-3 border border-white/40 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
      </div>
    </div>
  );
}

export default function WhyCypressPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <PageHero
        label="Why Cypress"
        title="QUALITY PRODUCT, AMAZING CYPRESS"
        image="/heropics/acadiana-lumber-hero.jpg"
        alt="Milled Louisiana cypress lumber"
      />

      {/* Body */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-20 lg:py-28">
        {/* History */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-28">
          <div>
            <p className="text-brand-accent text-xs uppercase tracking-[0.25em] mb-5">
              Louisiana's State Tree
            </p>
            <h2 className="title-serif text-brand-dark text-3xl md:text-4xl tracking-tight mb-7">
              ROOTED IN HISTORY
            </h2>
            <p className="text-brand-dark/80 font-light text-lg leading-relaxed">
              Huge Cypress forests once dominated Louisiana's low-lying areas,
              with strands of trees containing thousands of board feet per
              acre. For decades, native tribes used the trees to construct
              boats, tools, and lumber for a wide range of purposes. Henry Ford
              collected cypress from the containers that shipped in Spanish
              moss in the early 1900s and used it to construct the chassis for
              his Model T Ford. In 1963 the bald cypress was designated as
              Louisiana's official state tree. Today, Cypress grows abundantly
              throughout the Gulf Coast and in hardwood bottomlands, and it is
              valued for its beauty and longevity. Wood from the marshes of
              South Louisiana is the finest Cypress you can get anywhere,
              combining heart content and rich color with the tight grain that
              comes from slow tree development in moist ground circumstances.
            </p>
          </div>
          <FramedImage
            src="/acadiana-lumberhero.jpeg"
            alt="Freshly milled Louisiana cypress lumber"
            caption="Milled in Moreauville"
            offset="right"
          />
        </div>

        {/* Durability */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-28">
          <FramedImage
            src="/acadaiana-ourwork1.jpg"
            alt="Home with cypress beam front porch"
            caption="Cypress beam front porch"
            offset="left"
          />
          <div className="order-first lg:order-last">
            <p className="text-brand-accent text-xs uppercase tracking-[0.25em] mb-5">
              Built for the Elements
            </p>
            <h2 className="title-serif text-brand-dark text-3xl md:text-4xl tracking-tight mb-7">
              MADE TO OUTLAST
            </h2>
            <p className="text-brand-dark/80 font-light text-lg leading-relaxed">
              The construction industry makes extensive use of cypress wood
              because of its many desired traits. Cypress wood can be used for
              a wide variety of purposes, including siding and shingles, log
              homes, paneling, boat docks and piers, mulch, and even boats.
              Cypress wood furniture can withstand the elements and last for
              years. The fact that it can withstand rain and insects makes it a
              great pick for outdoor seating. Cypress wood tables, chairs, and
              outdoor cabinets are built to last, even when subjected to the
              harshest weather and environmental conditions.
            </p>
          </div>
        </div>

        {/* Closing pitch */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-brand-accent to-transparent mb-10" />
          <p className="text-brand-dark/80 font-light text-xl md:text-2xl leading-relaxed mb-10">
            If you're wanting to add cypress to your home give us a call. This
            beautiful wood can't be replicated by what you find in stores. It's
            not only beautiful, but adds an element of Louisiana culture to any
            project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center space-x-3 bg-brand-accent text-white px-8 py-4 hover:bg-[#a36814] transition-colors font-medium tracking-widest text-sm uppercase"
            >
              <Phone className="w-4 h-4" />
              <span>Call {PHONE_DISPLAY}</span>
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center space-x-3 border border-brand-dark text-brand-dark px-8 py-4 hover:bg-brand-dark hover:text-white transition-colors font-medium tracking-widest text-sm uppercase"
            >
              <span>Browse Products</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <DedicatedCTA />
    </div>
  );
}
