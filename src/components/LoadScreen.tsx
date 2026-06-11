import { useEffect, useState } from "react";

const TOTAL_MS = 3100; // matches the gif's play length
const FADE_MS = 800;


/**
 * The outer fade + dismissal run on CSS transitions and plain timers
 * (not AnimatePresence) so the screen always dismisses, even if
 * rAF-driven animations stall.
 */
export default function LoadScreen({ onDone }: { onDone?: () => void }) {
  const [phase, setPhase] = useState<"show" | "fading" | "gone">("show");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fadeTimer = setTimeout(() => {
      setPhase("fading");
      document.body.style.overflow = "";
    }, TOTAL_MS);
    const doneTimer = setTimeout(() => {
      setPhase("gone");
      onDone?.();
    }, TOTAL_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex items-center justify-center px-6 overflow-hidden transition-opacity ease-in-out ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      {/* Faint woodgrain texture (inverted to dark for the white background) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.006] invert"
        style={{
          backgroundImage: "url(/acadiana-woodpatternbackground.png)",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Gif with trust lines: flanking on desktop, single line below on mobile */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center justify-center md:gap-12">
          <p
            className="hidden md:block title-serif text-brand-dark/75 text-xs lg:text-sm tracking-[0.22em] whitespace-nowrap"
            style={{ animation: "loadscreen-fade 1s ease-out 0.7s both" }}
          >
            QUALITY CRAFTSMANSHIP
          </p>

          {/* Animated logo gif — plays once through while the screen is up,
              fading in with a slow zoom (CSS-driven so it can't stall) */}
          <img
            src="/acadiana-loadscreen.gif"
            alt="Acadiana Cypress"
            className="w-40 md:w-52 flex-shrink-0"
            style={{
              animation: `loadscreen-fade 0.9s ease-out both, loadscreen-zoom ${
                (TOTAL_MS + FADE_MS) / 1000
              }s linear both`,
            }}
          />

          <p
            className="hidden md:block title-serif text-brand-dark/75 text-xs lg:text-sm tracking-[0.22em] whitespace-nowrap"
            style={{ animation: "loadscreen-fade 1s ease-out 0.7s both" }}
          >
            BUILT TO LAST FOREVER
          </p>
        </div>

        {/* Mobile: divider + one line under the logo */}
        <div
          className="md:hidden flex flex-col items-center mt-6"
          style={{ animation: "loadscreen-fade 1s ease-out 0.7s both" }}
        >
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-brand-accent to-transparent mb-4" />
          <p className="title-serif text-brand-dark/75 text-xs tracking-[0.22em] whitespace-nowrap">
            BUILT TO LAST FOREVER
          </p>
        </div>
      </div>
    </div>
  );
}
