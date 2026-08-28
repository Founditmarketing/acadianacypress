/**
 * Lumber quote-builder product lines.
 *
 * No dollar pricing lives on the site — the client's prices change too often
 * to publish (their call, 2026-08-28). The quote builder only collects sizes,
 * quantities, and board footage; the team replies with current pricing.
 */

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
  /** Selectable cross-sections for this line. */
  crossSections: CrossSection[];
  /** Selectable lengths, in feet. */
  lengths: number[];
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
 * page (6×6, 8×8, 10×10, 12×12).
 */
export const LUMBER_LINES: LumberLine[] = [
  {
    id: "cypress-1x-boards",
    name: "1× Cypress Boards",
    family: "board",
    species: "Cypress",
    crossSections: [cs(1, 4), cs(1, 6), cs(1, 8), cs(1, 10), cs(1, 12)],
    lengths: STANDARD_LENGTHS,
    note: "Rough-sawn, milled in-house.",
  },
  {
    id: "cypress-posts-beams",
    name: "Cypress Posts & Beams",
    family: "beam",
    species: "Cypress",
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

/** SKU key, e.g. "1x6x12" — used to dedupe ledger lines. */
export const skuKey = (t: number, w: number, lengthFt: number): string =>
  `${t}x${w}x${lengthFt}`;

export const formatBF = (n: number): string =>
  n.toLocaleString("en-US", { maximumFractionDigits: 2 });
