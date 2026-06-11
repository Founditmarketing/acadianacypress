// Single source of truth for business contact info.
export const EMAIL = "codycoco_1@yahoo.com";
export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=100076284221092";

// Primary contact for general CTAs (showroom line).
export const PHONE_DISPLAY = "(318) 240-3874";
export const PHONE_TEL = "+13182403874";

export interface LocationInfo {
  key: string;
  /** "Sawmill" / "Showroom" */
  label: string;
  city: string;
  addressLines: string[];
  hours: string[];
  phoneDisplay: string;
  phoneTel: string;
  phoneContact: string;
  mapsUrl: string;
}

export const LOCATIONS: LocationInfo[] = [
  {
    key: "sawmill",
    label: "Sawmill",
    city: "Moreauville",
    addressLines: ["2463 N. Bayou Desglaises", "Moreauville, LA 71355"],
    hours: [
      "6:30 am – 4:30 pm, Monday – Friday",
      "(Closed 11:15 am – 12:00 pm for lunch)",
      "Saturdays by appointment only",
      "Closed Sundays",
    ],
    phoneDisplay: "(318) 240-4688",
    phoneTel: "+13182404688",
    phoneContact: "Cody",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("2463 N. Bayou Desglaises, Moreauville, LA 71355"),
  },
  {
    key: "showroom",
    label: "Showroom",
    city: "Grand Coteau",
    addressLines: ["I 49 South Service Rd", "Grand Coteau, LA 70451"],
    hours: [
      "9:00 am – 5:00 pm, Monday – Friday",
      "Saturday by appointment only",
      "Closed Sunday",
    ],
    phoneDisplay: "(318) 240-3874",
    phoneTel: "+13182403874",
    phoneContact: "Priscilla",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("I 49 South Service Rd, Grand Coteau, LA 70451"),
  },
];
