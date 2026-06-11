import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SLIDE_DURATION = 6000;

const slides = [
  {
    label: "Walls/Ceilings",
    image: "/heropics/acadiana-wals-ceilings-hero.jpg",
    alt: "Cypress wall and ceiling planks",
    tagline:
      "Shiplap, pecky cypress & reclaimed paneling that turn walls and ceilings into showpieces.",
  },
  {
    label: "Flooring",
    image: "/heropics/acadiana-flooring-hero.jpg",
    alt: "Finished cypress flooring in a sunlit room",
    tagline:
      "Antique pine, oak & reclaimed hardwood floors, milled to order in Louisiana.",
  },
  {
    label: "Hunting Blinds",
    image: "/heropics/acadiana-huntingblinds-hero.jpg",
    alt: "Custom cypress hunting blind",
    tagline:
      "Hand-built cypress blinds — quiet, weather-tough comfort for the field.",
  },
  {
    label: "Lumber",
    image: "/acadiana-lumberhero.jpeg",
    alt: "Milled cypress lumber at the mill yard",
    tagline:
      "New, sinker & pecky cypress, sawn fresh at our Moreauville mill.",
  },
];

export default function Hero({ revealed = true }: { revealed?: boolean }) {
  const [active, setActive] = useState(0);

  // Auto-advance; restarting the timeout whenever `active` changes also
  // resets the timer after a manual selection.
  useEffect(() => {
    const timer = setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      SLIDE_DURATION
    );
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] bg-brand-dark overflow-hidden flex items-end">
      {/* Background Images (all mounted so they stay preloaded, crossfade via opacity) */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, i) => (
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === active ? "opacity-80 hero-zoom" : "opacity-0"
            }`}
          />
        ))}
        {/* Subtle gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 pb-10 md:pb-14 flex flex-col items-start max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <h1 className="sr-only">
            Acadiana Cypress — Mill-Direct Louisiana Cypress
          </h1>
          <div className="title-serif text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl leading-tight">
            {slides.map((slide, i) => (
              <div key={slide.label}>
                <button
                  onClick={() => setActive(i)}
                  className={`block text-left uppercase tracking-tight leading-tight transition-colors duration-300 cursor-pointer ${
                    i === active
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {slide.label}
                </button>
                {/* Description expands under the highlighted service */}
                <AnimatePresence initial={false}>
                  {i === active && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans normal-case tracking-normal text-white/85 text-base md:text-lg font-light leading-snug max-w-xl py-2">
                        {slide.tagline}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Slide navigation / timer */}
          <div className="flex items-center space-x-3 mt-10">
            {slides.map((slide, i) => (
              <button
                key={slide.label}
                onClick={() => setActive(i)}
                aria-label={`Show ${slide.label}`}
                className="relative h-[3px] w-14 md:w-24 bg-white/25 overflow-hidden cursor-pointer"
              >
                {i === active && (
                  <motion.span
                    key={active}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: SLIDE_DURATION / 1000,
                      ease: "linear",
                    }}
                    className="absolute left-0 top-0 h-full bg-white"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white flex-col items-center hidden md:flex"
      >
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ top: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
