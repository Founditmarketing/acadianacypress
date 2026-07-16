/**
 * Lumber quote-calculator pricing.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ⚠️  PLACEHOLDER PRICING — NOT REAL QUOTES YET                            │
 * │                                                                           │
 * │  Every `pricePerBoardFoot` below is a stand-in so the calculator works    │
 * │  during development. Replace them with the client's real numbers when     │
 * │  they arrive (see docs/PRICING-DATA-NEEDED.md for exactly what to ask).   │
 * │                                                                           │
 * │  To go live with real pricing:                                           │
 * │    1. Set PRICING_IS_PRELIMINARY = false                                  │
 * │    2. Update each line's `pricePerBoardFoot` (or add `priceOverrides`)    │
 * │  Nothing else in the app needs to change.                                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

/**
 * While true, the calculator shows a "Preliminary estimate" badge and disclaimer
 * so nobody mistakes placeholder math for a firm quote. Flip to false once the
 * real client pricing is in.
 */
export const PRICING_IS_PRELIMINARY = true;

export type LumberFamily = "board" | "beam";

/** A selectable cross-section, e.g. 1×6 (boards) or 8×8 (beams). Dimensions are nominal inches. */
export interface CrossSection {
  /** Nominal thickness, inches. */
  t: number;
  /** Nominal width, inches. */
  w: number;
  /** Display label, e.g. "1×6" or "8×8". */
  label: string;
}

export interface LumberLine {
  id: string;
  /** Menu label, e.g. "1× Cypress Boards". */
  name: string;
  family: LumberFamily;
  species: string;
  /**
   * PLACEHOLDER price in dollars per board foot.
   * board foot = (thickness_in × width_in × length_ft) ÷ 12
   * Replace with the client's real $/BF for this product line.
   */
  pricePerBoardFoot: number;
  /** Selectable cross-sections for this line. */
  crossSections: CrossSection[];
  /** Selectable lengths, in feet. */
  lengths: number[];
  /**
   * Optional per-piece price overrides for specific SKUs, keyed by "TxWxL"
   * (nominal, e.g. "1x6x12"). Use this when the client prices certain sizes
   * as a flat dollar-per-piece instead of by board foot. An override always
   * wins over the board-foot calculation.
   */
  priceOverrides?: Record<string, number>;
  /** Shown under the line in the UI (species/grade note, etc.). */
  note?: string;
}

const cs = (t: number, w: number): CrossSection => ({
  t,
  w,
  label: `${t}×${w}`,
});

/** Standard stocked lengths (feet) shared by the initial top-seller lines. */
const STANDARD_LENGTHS = [8, 10, 12, 14, 16];

/**
 * Initial launch set — "top sellers only": 1× cypress boards and cypress
 * posts & beams. Beam sizes mirror the biggest sellers listed on the product
 * page (6×6, 8×8, 10×10, 12×12). Add more lines here as the client sends data.
 */
export const LUMBER_LINES: LumberLine[] = [
  {
    id: "cypress-1x-boards",
    name: "1× Cypress Boards",
    family: "board",
    species: "Cypress",
    pricePerBoardFoot: 4.75, // PLACEHOLDER
    crossSections: [cs(1, 4), cs(1, 6), cs(1, 8), cs(1, 10), cs(1, 12)],
    lengths: STANDARD_LENGTHS,
    note: "Rough-sawn, milled in-house.",
  },
  {
    id: "cypress-posts-beams",
    name: "Cypress Posts & Beams",
    family: "beam",
    species: "Cypress",
    pricePerBoardFoot: 6.0, // PLACEHOLDER
    crossSections: [cs(6, 6), cs(8, 8), cs(10, 10), cs(12, 12)],
    lengths: STANDARD_LENGTHS,
    note: "Milled to order. Our biggest sellers.",
  },
];

export const getLine = (id: string): LumberLine | undefined =>
  LUMBER_LINES.find((l) => l.id === id);

/** Board feet for a single piece. bf = (t × w × lengthFt) ÷ 12, dimensions in inches. */
export const boardFeet = (t: number, w: number, lengthFt: number): number =>
  (t * w * lengthFt) / 12;

/** SKU key used for `priceOverrides` lookups, e.g. "1x6x12". */
export const skuKey = (t: number, w: number, lengthFt: number): string =>
  `${t}x${w}x${lengthFt}`;

export interface PricedPiece {
  boardFeet: number;
  /** Price for one piece. */
  unitPrice: number;
  /** True when the price came from a `priceOverrides` entry rather than $/BF. */
  fromOverride: boolean;
}

/**
 * Price a single piece of a line at a given cross-section and length.
 * Uses a per-SKU override when one exists, otherwise board-foot × $/BF.
 */
export const pricePiece = (
  line: LumberLine,
  section: CrossSection,
  lengthFt: number
): PricedPiece => {
  const bf = boardFeet(section.t, section.w, lengthFt);
  const override = line.priceOverrides?.[skuKey(section.t, section.w, lengthFt)];
  if (override != null) {
    return { boardFeet: bf, unitPrice: override, fromOverride: true };
  }
  return {
    boardFeet: bf,
    unitPrice: bf * line.pricePerBoardFoot,
    fromOverride: false,
  };
};

export const formatUSD = (n: number): string =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
