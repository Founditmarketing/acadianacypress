import SectionLabel from "./SectionLabel";

export default function DedicatedCTA() {
  return (
    <section className="relative bg-brand-dark py-16 md:py-20 px-6 text-center overflow-hidden">
      {/* Faint woodgrain pattern, tiled at natural size */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "url(/acadiana-woodpatternbackground.png)",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionLabel center>Get Started</SectionLabel>
        <h2 className="title-serif text-white text-3xl md:text-5xl tracking-tight mb-5 leading-tight">
          START YOUR NEXT PROJECT WITH ACADIANA CYPRESS
        </h2>
        <p className="text-white/80 text-lg md:text-xl font-light mb-10 max-w-3xl mx-auto">
          Contact us for pricing, samples, or custom milling requests.
        </p>
        <a href="#contact-us" className="inline-flex items-center justify-center bg-brand-accent text-white px-10 py-4 hover:bg-[#a36814] transition-colors rounded-none font-medium tracking-wide text-lg shadow-lg">
          REQUEST A QUOTE
        </a>
      </div>
    </section>
  );
}
