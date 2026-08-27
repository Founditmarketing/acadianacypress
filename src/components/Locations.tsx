import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { EMAILS, LOCATIONS } from "../data/contact";
import SectionLabel from "./SectionLabel";

export default function Locations({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section
      id="locations"
      className="w-full px-6 md:px-12 lg:px-24 py-20 lg:py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {showHeader && (
          <div className="text-center mb-14">
            <SectionLabel center>Visit Us</SectionLabel>
            <h2 className="title-serif text-brand-dark text-3xl md:text-5xl tracking-tight">
              OUR LOCATIONS
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {LOCATIONS.map((location) => (
            <div
              key={location.key}
              className="group bg-white border border-brand-dark/10 hover:border-brand-accent/50 transition-colors duration-500 flex flex-col"
            >
              {/* Card header */}
              <div className="flex items-start justify-between p-8 lg:p-10 pb-0">
                <div>
                  <p className="text-brand-accent text-[11px] uppercase tracking-[0.3em] mb-2">
                    {location.label}
                  </p>
                  <h3 className="title-serif text-brand-dark text-4xl lg:text-5xl tracking-tight">
                    {location.city}
                  </h3>
                  <div className="h-[2px] w-10 bg-brand-accent mt-4 transition-all duration-500 group-hover:w-24" />
                </div>
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-brand-accent/50 flex items-center justify-center text-brand-accent flex-shrink-0 transition-all duration-500 group-hover:bg-brand-accent group-hover:text-white">
                  <MapPin className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
              </div>

              {/* Info rows */}
              <div className="flex-1 px-8 lg:px-10 py-8 divide-y divide-gray-100">
                <div className="flex py-5 first:pt-0">
                  <p className="w-28 flex-shrink-0 flex items-center gap-2 text-brand-dark/40 text-[11px] uppercase tracking-[0.2em] pt-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                    Address
                  </p>
                  <div className="text-brand-dark/80 font-light">
                    {location.addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="flex py-5">
                  <p className="w-28 flex-shrink-0 flex items-center gap-2 text-brand-dark/40 text-[11px] uppercase tracking-[0.2em] pt-1">
                    <Clock className="w-3.5 h-3.5 text-brand-accent" />
                    Hours
                  </p>
                  <div className="text-brand-dark/80 font-light text-sm leading-relaxed space-y-1">
                    {location.hours.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="flex py-5">
                  <p className="w-28 flex-shrink-0 flex items-center gap-2 text-brand-dark/40 text-[11px] uppercase tracking-[0.2em] pt-1">
                    <Phone className="w-3.5 h-3.5 text-brand-accent" />
                    Phone
                  </p>
                  <a
                    href={`tel:${location.phoneTel}`}
                    className="text-brand-dark/80 font-light hover:text-brand-accent transition-colors"
                  >
                    {location.phoneDisplay}{" "}
                    <span className="text-brand-dark/40">
                      ({location.phoneContact})
                    </span>
                  </a>
                </div>

                <div className="flex py-5 last:pb-0">
                  <p className="w-28 flex-shrink-0 flex items-center gap-2 text-brand-dark/40 text-[11px] uppercase tracking-[0.2em] pt-1">
                    <Mail className="w-3.5 h-3.5 text-brand-accent" />
                    Email
                  </p>
                  <div className="flex flex-col gap-1">
                    {EMAILS.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="text-brand-dark/80 font-light hover:text-brand-accent transition-colors break-all"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Get Directions */}
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-8 lg:px-10 py-5 bg-brand-dark text-white hover:bg-brand-accent transition-colors duration-300 group/cta"
              >
                <span className="font-medium tracking-widest text-sm uppercase">
                  Get Directions
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
