import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import SectionLabel from "./SectionLabel";

interface GalleryEntry {
  category: string;
  image: string;
  caption: string;
  /** When set, the tile is a video spotlight and the lightbox plays it. */
  video?: string;
}

const galleryItems: GalleryEntry[] = [
  {
    category: "Furniture",
    image: "/acadiana-video-thumb.jpg",
    caption: "Live-edge sinker cypress table — watch the showcase",
    video: "/acadiana-video.mp4",
  },
  { category: "Exteriors", image: "/acadaiana-ourwork1.jpg", caption: "Cypress beam front porch" },
  { category: "Interiors", image: "/acadaiana-ourwork2.jpeg", caption: "Sunroom with reclaimed hardwood floors" },
  { category: "Interiors", image: "/acadaiana-ourwork3.jpeg", caption: "Rustic kitchen, walls & flooring" },
  { category: "Interiors", image: "/acadaiana-ourwork4.jpeg", caption: "Cabin bedroom suite" },
  { category: "Interiors", image: "/acadaiana-ourwork5.jpeg", caption: "Lodge great room" },
  { category: "Furniture", image: "/acadaiana-ourwork6.jpg", caption: "Live-edge cypress table & benches" },
];

const filters = ["All", "Interiors", "Exteriors", "Furniture"];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const prev = () =>
    setLightbox((i) => (i === null ? null : (i + visible.length - 1) % visible.length));
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % visible.length));

  // Keyboard navigation + scroll lock while the lightbox is open
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
  }, [lightbox, visible.length]);

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto">
      <SectionLabel>Project Gallery</SectionLabel>
      <h2 className="title-serif text-brand-dark text-3xl md:text-5xl mb-4 tracking-tight">
        OUR WORK
      </h2>
      <p className="text-brand-dark/60 font-light text-lg mb-12 max-w-xl">
        Real projects, real cypress — from our mill to homes, camps, and businesses.
      </p>

      {/* Filters */}
      <div className="flex space-x-8 mb-12 overflow-x-auto no-scrollbar border-b border-gray-200 pb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setLightbox(null);
            }}
            className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-brand-accent ${
              filter === activeFilter
                ? "text-brand-dark border-b-2 border-brand-accent pb-4 -mb-[18px]"
                : "text-brand-dark/50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((item, index) => (
            <motion.button
              key={item.image}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              onClick={() => setLightbox(index)}
              className={`group relative overflow-hidden bg-brand-dark text-left cursor-pointer ${
                item.video ? "col-span-2" : "aspect-square"
              }`}
            >
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Inset line frame */}
              <div className="pointer-events-none absolute inset-3 border border-white/40 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />

              {/* Play badge (videos) / expand icon (photos) */}
              {item.video ? (
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/70 flex items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                  <Expand className="w-5 h-5" />
                </div>
              )}

              {/* Caption */}
              <div className="absolute inset-x-6 bottom-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-brand-accent text-[11px] uppercase tracking-[0.25em] mb-1">
                  {item.category}
                </p>
                <p className="text-white font-light">{item.caption}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View More */}
      <div className="flex justify-center mt-14">
        <a
          href="#our-work"
          className="inline-flex items-center justify-center border border-brand-dark text-brand-dark px-10 py-4 hover:bg-brand-dark hover:text-white transition-colors font-medium tracking-widest text-sm uppercase"
        >
          View More
        </a>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && visible[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev / Next */}
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

            {/* Image */}
            <motion.div
              key={visible[lightbox].image}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            >
              {visible[lightbox].video ? (
                <video
                  src={visible[lightbox].video}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[75vh] bg-black"
                />
              ) : (
                <img
                  src={visible[lightbox].image}
                  alt={visible[lightbox].caption}
                  className="max-w-full max-h-[75vh] object-contain"
                />
              )}
              <div className="text-center mt-5">
                <p className="text-brand-accent text-xs uppercase tracking-[0.25em] mb-1">
                  {visible[lightbox].category}
                </p>
                <p className="text-white font-light">
                  {visible[lightbox].caption}
                  <span className="text-white/40 ml-4 text-sm">
                    {lightbox + 1} / {visible.length}
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
