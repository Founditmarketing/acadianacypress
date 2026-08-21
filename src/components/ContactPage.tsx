import { useState, type FormEvent } from "react";
import { Check, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { EMAIL, FACEBOOK_URL, LOCATIONS } from "../data/contact";
import PageSEO from "../seo/PageSEO";
import { breadcrumbSchema } from "../seo/schema";
import SectionLabel from "./SectionLabel";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setContact("");
    setMessage("");
  };

  const inputClasses =
    "w-full border border-gray-200 bg-white px-4 py-3.5 text-sm font-light text-brand-dark placeholder:text-brand-dark/35 focus:outline-none focus:border-brand-accent transition-colors rounded-none";

  return (
    <div className="bg-white pt-44 lg:pt-52 pb-24 min-h-screen">
      <PageSEO
        title="Contact Us | Acadiana Cypress"
        description="Call, message, or visit us at our Moreauville sawmill or Grand Coteau showroom for pricing, samples, and custom milling."
        path="/contact-us"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact-us" },
        ])}
      />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Page header */}
        <div className="text-center mb-16">
          <SectionLabel center>Get In Touch</SectionLabel>
          <h1 className="title-serif text-brand-dark text-4xl md:text-6xl tracking-tight mb-5">
            CONTACT US
          </h1>
          <p className="text-brand-dark/70 font-light text-lg max-w-2xl mx-auto">
            Pricing, samples, custom milling, or just talking through a project
            — call, message, or stop by either yard.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <div>
            <h2 className="title-serif text-brand-dark text-2xl md:text-3xl tracking-tight mb-8">
              SEND A MESSAGE
            </h2>
            {submitted ? (
              <div className="border border-brand-dark/10 p-8 flex flex-col items-center text-center space-y-3">
                <Check className="w-8 h-8 text-brand-accent" />
                <p className="text-brand-dark font-medium">
                  Thanks — your message was sent. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  className={inputClasses}
                />
                <input
                  type="text"
                  name="phone_or_email"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Phone or email"
                  required
                  className={inputClasses}
                />
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What can we help you with?"
                  rows={6}
                  required
                  className={`${inputClasses} resize-none`}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center space-x-3 w-full bg-brand-dark text-white py-4 hover:bg-brand-accent transition-colors font-medium tracking-widest text-sm uppercase"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
            <p className="text-brand-dark/50 font-light text-sm mt-4">
              Or email us directly at{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-brand-accent hover:underline"
              >
                {EMAIL}
              </a>
              , or find us on{" "}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent hover:underline"
              >
                Facebook
              </a>
              .
            </p>
          </div>

          {/* Contact info */}
          <div className="space-y-10">
            {LOCATIONS.map((location) => (
              <div
                key={location.key}
                className="border border-brand-dark/10 p-8"
              >
                <p className="text-brand-accent text-[11px] uppercase tracking-[0.3em] mb-1.5">
                  {location.label}
                </p>
                <h3 className="title-serif text-brand-dark text-2xl md:text-3xl tracking-tight mb-6">
                  {location.city}
                </h3>
                <div className="space-y-4 text-sm">
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-3 text-brand-dark/75 hover:text-brand-accent transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="font-light">
                      {location.addressLines.join(", ")}
                    </span>
                  </a>
                  <a
                    href={`tel:${location.phoneTel}`}
                    className="flex items-start space-x-3 text-brand-dark/75 hover:text-brand-accent transition-colors"
                  >
                    <Phone className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="font-light">
                      {location.phoneDisplay} ({location.phoneContact})
                    </span>
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-start space-x-3 text-brand-dark/75 hover:text-brand-accent transition-colors"
                  >
                    <Mail className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="font-light">{EMAIL}</span>
                  </a>
                  <div className="flex items-start space-x-3 text-brand-dark/75">
                    <Clock className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                    <div className="font-light space-y-0.5">
                      {location.hours.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
