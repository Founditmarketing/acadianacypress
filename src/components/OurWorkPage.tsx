import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import PageSEO from "../seo/PageSEO";
import DedicatedCTA from "./DedicatedCTA";
import PageHero from "./PageHero";

interface WorkTile {
  image: string;
  caption: string;
  category: string;
  /** Product pages get a link from the lightbox. */
  href?: string;
  /** When set, the tile is a video spotlight and the lightbox plays it. */
  video?: string;
}

const galleryTiles: WorkTile[] = [
  { category: "Exteriors", image: "/acadaiana-ourwork1.jpg", caption: "Cypress beam front porch" },
  { category: "Interiors", image: "/acadaiana-ourwork2.jpeg", caption: "Sunroom with reclaimed hardwood floors" },
  { category: "Interiors", image: "/acadaiana-ourwork3.jpeg", caption: "Rustic kitchen, walls & flooring" },
  { category: "Interiors", image: "/acadaiana-ourwork4.jpeg", caption: "Cabin bedroom suite" },
  { category: "Interiors", image: "/acadaiana-ourwork5.jpeg", caption: "Lodge great room" },
  { category: "Furniture", image: "/acadaiana-ourwork6.jpg", caption: "Live-edge cypress table & benches" },
];

const tiles: WorkTile[] = [
  {
    category: "Furniture",
    image: "/acadiana-video-thumb.jpg",
    caption: "Live-edge sinker cypress table — watch the showcase",
    video: "/acadiana-video.mp4",
  },
  ...galleryTiles,
  ...products.map((product) => ({
    image: product.images[0],
    caption: product.name,
    category: product.categories[0],
    href: `/product/${product.slug}`,
  })),
];

export default function OurWorkPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () =>
    setLightbox((i) => (i === null ? null : (i + tiles.length - 1) % tiles.length));
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % tiles.length));

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
    <div className="bg-white min-h-screen">
      <PageSEO
        title="Our Work | Acadiana Cypress"
        description="A gallery of finished cypress projects — beam porches, reclaimed hardwood floors, rustic kitchens, and custom furniture milled in South Louisiana."
        path="/our-work"
      />
      <PageHero
        label="Project Gallery"
        title="OUR WORK"
        image="/acadaiana-ourwork3.jpeg"
        alt="Rustic kitchen with cypress walls and flooring"
      />

      {/* Full-width grid */}
      <div className="p-2 md:p-3">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
          {tiles.map((tile, index) => (
            <button
              key={tile.image}
              onClick={() => setLightbox(index)}
              className={`group relative overflow-hidden bg-brand-dark text-left cursor-pointer ${
                tile.video ? "col-span-2 aspect-[2/1] md:aspect-auto" : "aspect-square"
              }`}
            >
              <img
                src={tile.image}
                alt={tile.caption}
                loading="lazy"
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                  tile.video ? "absolute inset-0 w-full h-full" : "w-full h-full"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="pointer-events-none absolute inset-3 border border-white/40 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
              {tile.video ? (
                <>
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-accent text-white flex items-center justify-center shadow-2xl shadow-black/40 transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="currentColor" />
                  </div>
                  <span className="absolute top-5 left-5 border border-white/40 bg-black/40 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.3em] px-3 py-1.5">
                    Watch
                  </span>
                </>
              ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/70 flex items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                  <Expand className="w-4 h-4" />
                </div>
              )}
              <div className="absolute inset-x-5 bottom-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-brand-accent text-[10px] uppercase tracking-[0.25em] mb-1">
                  {tile.category}
                </p>
                <p className="text-white font-light text-sm">{tile.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <DedicatedCTA />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && tiles[lightbox] && (
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
              key={tiles[lightbox].image}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            >
              {tiles[lightbox].video ? (
                <video
                  src={tiles[lightbox].video}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[70vh] bg-black"
                />
              ) : (
                <img
                  src={tiles[lightbox].image}
                  alt={tiles[lightbox].caption}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              )}
              <div className="text-center mt-5">
                <p className="text-brand-accent text-xs uppercase tracking-[0.25em] mb-1">
                  {tiles[lightbox].category}
                </p>
                <p className="text-white font-light">
                  {tiles[lightbox].caption}
                  <span className="text-white/40 ml-4 text-sm">
                    {lightbox + 1} / {tiles.length}
                  </span>
                </p>
                {tiles[lightbox].href && (
                  <Link
                    to={tiles[lightbox].href}
                    onClick={() => setLightbox(null)}
                    className="inline-flex items-center space-x-2 mt-4 text-sm font-medium tracking-wider uppercase text-white border-b border-brand-accent pb-1 hover:text-brand-accent transition-colors"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
