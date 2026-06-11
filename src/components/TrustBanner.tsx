const items = [
  "Direct From the Mill",
  "5-Star Customer Rated",
  "Family-Owned",
  "Authentic Louisiana Cypress",
  "Sustainably Sourced",
  "Custom Milling",
];

// One half of the marquee strip. Rendered twice; the animation shifts the
// track exactly -50%, so the second (identical) half lands where the first
// began and the loop is seamless forever.
function Strip({ hidden = false }: { hidden?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex items-center flex-none" aria-hidden={hidden}>
      {doubled.map((item, index) => (
        <div key={index} className="flex items-center">
          <span
            className={`px-9 text-sm md:text-base font-light uppercase tracking-[0.3em] ${
              index % 2 === 0
                ? "text-white"
                : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.55)]"
            }`}
          >
            {item}
          </span>
          {/* Diamond divider */}
          <span className="w-1.5 h-1.5 rotate-45 border border-brand-accent/80" />
        </div>
      ))}
    </div>
  );
}

export default function TrustBanner() {
  return (
    <div className="group w-full bg-brand-dark py-3.5 overflow-hidden relative">
      <div className="flex w-max whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        <Strip />
        <Strip hidden />
      </div>

      {/* Edge fades so items dissolve in/out instead of hard-clipping */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-dark to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-dark to-transparent" />
    </div>
  );
}
