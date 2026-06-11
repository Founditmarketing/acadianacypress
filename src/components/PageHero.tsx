import SectionLabel from "./SectionLabel";

interface PageHeroProps {
  label: string;
  title: string;
  image: string;
  alt?: string;
}

/** Full-width banner hero for subpages — sits under the transparent header. */
export default function PageHero({ label, title, image, alt = "" }: PageHeroProps) {
  return (
    <section className="relative h-[45vh] min-h-[380px] bg-brand-dark overflow-hidden flex items-end justify-center">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
      <div className="relative z-10 text-center px-6 pb-12 md:pb-16">
        <SectionLabel center>{label}</SectionLabel>
        <h1 className="title-serif text-white text-4xl md:text-6xl tracking-tight">
          {title}
        </h1>
      </div>
    </section>
  );
}
