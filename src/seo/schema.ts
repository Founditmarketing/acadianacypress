import { EMAIL, FACEBOOK_URL, LOCATIONS, type LocationInfo } from "../data/contact";
import type { Product } from "../data/products";
import { SITE_NAME, SITE_URL } from "./constants";

const ORG_ID = `${SITE_URL}/#organization`;

function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/AcadianaCypressLogo.png`,
    email: EMAIL,
    sameAs: [FACEBOOK_URL],
  };
}

/** "2463 N. Bayou Desglaises, Moreauville, LA 71355" (2nd line) -> { region, postalCode } */
function regionAndZip(addressLines: string[]) {
  const last = addressLines[addressLines.length - 1];
  const match = last.match(/,\s*([A-Z]{2})\s+(\d{5})/);
  return { addressRegion: match?.[1] ?? "LA", postalCode: match?.[2] ?? "" };
}

/**
 * Monday–Friday hours only, split around any stated lunch closure.
 * Saturday ("by appointment only") and Sunday (closed) are left out rather
 * than approximated, since schema.org has no "by appointment" state and a
 * fabricated Saturday/Sunday spec would misrepresent actual availability.
 */
function weekdayOpeningHours(location: LocationInfo) {
  if (location.key === "sawmill") {
    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "06:30",
        closes: "11:15",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "12:00",
        closes: "16:30",
      },
    ];
  }
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ];
}

export function localBusinessSchema(location: LocationInfo) {
  const { addressRegion, postalCode } = regionAndZip(location.addressLines);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/locations#${location.key}`,
    name: `${SITE_NAME} — ${location.label}, ${location.city}`,
    branchOf: { "@id": ORG_ID },
    url: `${SITE_URL}/locations`,
    telephone: location.phoneTel,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.addressLines[0],
      addressLocality: location.city,
      addressRegion,
      postalCode,
      addressCountry: "US",
    },
    openingHoursSpecification: weekdayOpeningHours(location),
  };
}

/** Organization + a LocalBusiness entry for each branch — used on the Locations page. */
export function locationsSchema() {
  return [organizationSchema(), ...LOCATIONS.map(localBusinessSchema)];
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map(absoluteUrl),
    category: product.categories.join(", "),
    brand: { "@type": "Brand", name: SITE_NAME },
    url: absoluteUrl(`/product/${product.slug}`),
  };
}
