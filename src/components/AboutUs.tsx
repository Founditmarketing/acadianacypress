import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionLabel from "./SectionLabel";

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  // Gentle parallax: the watermark drifts as the section scrolls through view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-48, 48]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 md:py-28 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Faint watermark logo behind the text (outer div keeps the Tailwind
          centering transforms; motion drives only the parallax drift) */}
      <div className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-[12%] top-1/2 -translate-y-1/2">
        <motion.img
          src="/AcadianaCypressLogo.png"
          alt=""
          aria-hidden="true"
          style={{ y }}
          className="w-[420px] md:w-[560px] max-w-none opacity-[0.05]"
        />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto text-center flex flex-col items-center">
        <SectionLabel center>Who We Are</SectionLabel>
        <h2 className="title-serif text-brand-dark text-3xl md:text-5xl tracking-tight mb-4">
          OUR LOUISIANA HERITAGE
        </h2>
        <div className="w-10 h-[2px] bg-brand-accent mb-8 md:mb-10" />
        <p className="text-brand-dark/80 text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-tight max-w-4xl">
          We are located in South Louisiana in Moreauville & Grand Coteau, where we carefully mill the one-of-a-kind cypress wood that grows in the swamps of Louisiana and ship it to you anywhere in the United States. Customers are more than welcome to come see what we're all about by visiting our mill yard during business hours.
        </p>
      </div>
    </section>
  );
}
