interface SectionLabelProps {
  children: string;
  /** Symmetric flanking lines for centered headers; leading line only when left-aligned. */
  center?: boolean;
}

const Diamond = () => (
  <span className="w-1.5 h-1.5 rotate-45 border border-brand-accent flex-shrink-0" />
);

const Rule = () => (
  <span className="h-px w-8 bg-gradient-to-r from-transparent via-brand-accent/70 to-brand-accent/70 flex-shrink-0" />
);

export default function SectionLabel({ children, center = false }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 mb-4 ${center ? "justify-center" : ""}`}
    >
      <Rule />
      <Diamond />
      <span className="text-brand-accent text-xs md:text-sm font-medium tracking-[0.35em] uppercase whitespace-nowrap">
        {children}
      </span>
      {center && (
        <>
          <Diamond />
          <span className="h-px w-8 bg-gradient-to-l from-transparent via-brand-accent/70 to-brand-accent/70 flex-shrink-0" />
        </>
      )}
    </div>
  );
}
