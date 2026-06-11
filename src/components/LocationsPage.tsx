import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import DedicatedCTA from "./DedicatedCTA";
import Locations from "./Locations";
import PageHero from "./PageHero";
import SectionLabel from "./SectionLabel";

// Gallery from the old site's "New Location" page (25 photos)
const allGalleryImages = Array.from(
  { length: 25 },
  (_, i) => `/locations-gallery/${String(i + 1).padStart(2, "0")}.jpg`
);

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export default function LocationsPage() {
  // Shuffled once per visit so the grid feels fresh but stays stable while open
  const [galleryImages] = useState(() => shuffle(allGalleryImages));
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () =>
    setLightbox((i) =>
      i === null ? null : (i + galleryImages.length - 1) % galleryImages.length
    );
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % galleryImages.length));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHero
        label="Visit Us"
        title="OUR LOCATIONS"
        image="/acadiana-location2.jpg"
        alt="Acadiana Cypress mill direct showroom"
      />

      {/* New showroom announcement (from the old site's New Location page) */}
      <section className="bg-white px-6 md:px-12 lg:px-24 py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionLabel>Now Open in Grand Coteau</SectionLabel>
            <h2 className="title-serif text-brand-dark text-3xl md:text-5xl tracking-tight mb-8">
              OUR NEW SHOWROOM
            </h2>
            <p className="text-brand-dark/80 font-light text-lg md:text-xl leading-relaxed">
              Acadiana Cypress is proud to announce the opening of our new
              store located on the I-49 South Service Road in Grand Coteau, LA!
              Known for our high-quality cypress lumber, beams, and custom wood
              products, we're excited to bring our craftsmanship even closer to
              our customers. Whether you're a contractor, builder, or DIY
              enthusiast, our new location offers easy access to the premium
              materials and expert service you've come to expect. Stop by to
              explore our wide selection of cypress products and see how we can
              help with your next project. Visit our showroom and mill today!
            </p>
          </div>

          {/* Framed showroom photo */}
          <div className="relative pb-6 pr-6">
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 border border-brand-accent/50" />
            <div className="relative overflow-hidden group">
              <img
                src="/acadiana-location2.jpg"
                alt="The new Acadiana Cypress showroom in Grand Coteau"
                className="w-full max-h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 bg-brand-dark/85 backdrop-blur-sm text-white text-[11px] uppercase tracking-[0.25em] px-4 py-2.5">
                I-49 South Service Rd, Grand Coteau
              </p>
              <div className="pointer-events-none absolute inset-3 border border-white/40 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
            </div>
          </div>
        </div>
      </section>

      <Locations showHeader={false} />

      {/* Showroom gallery */}
      <section className="bg-white px-6 md:px-12 lg:px-24 py-20 lg:py-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-12">
            <SectionLabel center>Take a Look Around</SectionLabel>
            <h2 className="title-serif text-brand-dark text-3xl md:text-5xl tracking-tight">
              INSIDE THE NEW LOCATION
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
            {galleryImages.map((image, index) => (
              <button
                key={image}
                onClick={() => setLightbox(index)}
                className="group relative aspect-square overflow-hidden bg-brand-dark cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Grand Coteau showroom photo ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="pointer-events-none absolute inset-3 border border-white/40 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/70 flex items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                  <Expand className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <DedicatedCTA />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-brand-accent transition-colors p-2 z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-brand-accent transition-colors p-2 z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              key={galleryImages[lightbox]}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={galleryImages[lightbox]}
                alt={`Grand Coteau showroom photo ${lightbox + 1}`}
                className="max-w-full max-h-[78vh] object-contain"
              />
              <p className="text-white/60 font-light text-sm mt-4">
                {lightbox + 1} / {galleryImages.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
