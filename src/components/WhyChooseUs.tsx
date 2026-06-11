import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionLabel from "./SectionLabel";

export default function WhyChooseUs() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  // Gentle parallax: the photo drifts as the section scrolls through view
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section className="flex flex-col lg:flex-row min-h-[700px] bg-white">
      {/* Left Column: Text */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12 md:p-16 xl:p-20">
        <div className="max-w-2xl">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="title-serif text-brand-dark text-3xl md:text-4xl xl:text-5xl tracking-tight mb-12 leading-tight">
            DIRECT FROM THE MILL. AUTHENTIC LOUISIANA CYPRESS.
          </h2>
          <ul className="space-y-6 mb-16 text-lg text-brand-dark/80 font-light">
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 mr-4 flex-shrink-0" />
              <p><strong>Sustainably Sourced</strong> — carefully harvested to preserve the natural ecosystem.</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 mr-4 flex-shrink-0" />
              <p><strong>Custom Profile Matching</strong> — we can match existing profiles or create unique designs.</p>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 mr-4 flex-shrink-0" />
              <p><strong>Nationwide Delivery</strong> — shipped directly from our mills to your job site anywhere in the USA.</p>
            </li>
          </ul>
          <a href="#why-cypress" className="inline-flex items-center space-x-4 text-brand-dark hover:text-brand-accent transition-colors group border-b border-brand-dark hover:border-brand-accent pb-2">
            <span className="font-medium tracking-wider uppercase text-sm">Learn more about our process</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>

      {/* Right Column: Image with scroll parallax (oversized so the drift never shows edges) */}
      <div ref={imageRef} className="w-full lg:w-1/2 h-[50vh] lg:h-auto overflow-hidden relative">
        <motion.img
          src="/acadiana-location2.jpg"
          alt="Acadiana Cypress mill direct showroom"
          style={{ y, scale: 1.16 }}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
