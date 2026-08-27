import { EMAILS, LOCATIONS, PHONE_DISPLAY } from "../data/contact";
import PageSEO from "../seo/PageSEO";
import SectionLabel from "./SectionLabel";

interface LegalSection {
  heading: string;
  body: string[];
}

const content: Record<
  "privacy" | "terms",
  { label: string; title: string; intro: string; sections: LegalSection[] }
> = {
  privacy: {
    label: "Legal",
    title: "PRIVACY POLICY",
    intro:
      "Acadiana Cypress respects your privacy. This policy explains what information we collect when you use this website, how we use it, and the choices you have.",
    sections: [
      {
        heading: "Information We Collect",
        body: [
          "When you contact us through the website — by form, email, or phone — we collect the information you choose to share, such as your name, phone number, email address, and the details of your project or request.",
          "Like most websites, our hosting providers may automatically log basic technical information such as your IP address, browser type, and the pages you visit. This information is used in aggregate to keep the site running smoothly and is not used to personally identify you.",
        ],
      },
      {
        heading: "How We Use Your Information",
        body: [
          "We use the information you provide solely to respond to your inquiries, prepare quotes, fulfill orders, and communicate with you about your project. We do not sell, rent, or trade your personal information to third parties.",
        ],
      },
      {
        heading: "Cookies & Analytics",
        body: [
          "This site may use basic cookies or similar technologies to remember your preferences and to understand, in aggregate, how visitors use the site. You can disable cookies in your browser settings at any time without affecting your ability to browse the site.",
        ],
      },
      {
        heading: "Third-Party Links",
        body: [
          "Our site contains links to third-party services such as Facebook and Google Maps. Those services operate under their own privacy policies, and we encourage you to review them before sharing information there.",
        ],
      },
      {
        heading: "Data Retention & Security",
        body: [
          "We keep correspondence only as long as needed to serve you and meet our business and legal obligations. We take reasonable measures to protect your information, though no method of transmission over the internet is completely secure.",
        ],
      },
      {
        heading: "Your Choices",
        body: [
          "You may contact us at any time to ask what information we hold about you, request a correction, or ask that it be deleted.",
        ],
      },
    ],
  },
  terms: {
    label: "Legal",
    title: "TERMS & CONDITIONS",
    intro:
      "By using this website, you agree to the following terms. Please read them before browsing or placing an inquiry.",
    sections: [
      {
        heading: "Use of This Site",
        body: [
          "This website is provided to showcase Acadiana Cypress products and to help you get in touch with us. You agree to use it lawfully and not to interfere with its operation or attempt to access non-public areas.",
        ],
      },
      {
        heading: "Products & Pricing",
        body: [
          "Cypress is a natural material — every board, beam, and slab is unique. Photos on this site are representative, and the color, grain, and character of the product you receive may vary.",
          "Prices are not listed on this site. All pricing is provided by quote; contact us by phone or message for current pricing and availability. Quotes are estimates until confirmed and may change based on material selection, milling requirements, and shipping.",
        ],
      },
      {
        heading: "Orders, Payment & Shipping",
        body: [
          "Orders are arranged directly with our team. Payment terms, delivery timelines, and shipping arrangements are agreed upon at the time of sale. Risk of loss passes to the buyer upon delivery to the carrier unless otherwise agreed in writing.",
        ],
      },
      {
        heading: "Intellectual Property",
        body: [
          "All content on this site — including photos, text, and the Acadiana Cypress name and logo — belongs to Acadiana Cypress and may not be reproduced without our written permission.",
        ],
      },
      {
        heading: "Limitation of Liability",
        body: [
          "This site and its content are provided “as is.” While we work to keep information accurate and current, we make no warranties about its completeness. To the fullest extent permitted by law, Acadiana Cypress is not liable for damages arising from your use of this website.",
        ],
      },
      {
        heading: "Governing Law",
        body: [
          "These terms are governed by the laws of the State of Louisiana. Any disputes arising from them will be resolved in the courts of Louisiana.",
        ],
      },
      {
        heading: "Changes to These Terms",
        body: [
          "We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.",
        ],
      },
    ],
  },
};

const seoTitle: Record<"privacy" | "terms", string> = {
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
};

export default function LegalPage({ page }: { page: "privacy" | "terms" }) {
  const { label, title, intro, sections } = content[page];
  const path = page === "privacy" ? "/privacy-policy" : "/terms-conditions";
  return (
    <div className="bg-white pt-44 lg:pt-52 pb-24 min-h-screen">
      <PageSEO
        title={`${seoTitle[page]} | Acadiana Cypress`}
        description={intro}
        path={path}
      />
      <div className="max-w-3xl mx-auto px-6">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="title-serif text-brand-dark text-4xl md:text-5xl tracking-tight mb-6">
          {title}
        </h1>
        <p className="text-brand-dark/70 font-light text-lg leading-relaxed mb-12">
          {intro}
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="title-serif text-brand-dark text-2xl tracking-tight mb-3">
                {section.heading.toUpperCase()}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-brand-dark/75 font-light leading-relaxed mb-3"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="pt-6 border-t border-gray-200">
            <h2 className="title-serif text-brand-dark text-2xl tracking-tight mb-3">
              QUESTIONS?
            </h2>
            <p className="text-brand-dark/75 font-light leading-relaxed">
              Reach us at{" "}
              {EMAILS.map((email, index) => (
                <span key={email}>
                  {index > 0 && ", "}
                  <a
                    href={`mailto:${email}`}
                    className="text-brand-accent hover:underline break-all"
                  >
                    {email}
                  </a>
                </span>
              ))}
              , or {PHONE_DISPLAY}, or stop by our {LOCATIONS[1].city} showroom or{" "}
              {LOCATIONS[0].city} sawmill.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
