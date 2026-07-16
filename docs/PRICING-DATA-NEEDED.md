# Pricing Data Needed — Lumber Quote Calculator

_This is the exact information we need from Acadiana Cypress to turn the new
website quote calculator from placeholder numbers into real, live pricing._

The calculator is **built and working now** — it just runs on stand-in prices
until we get the real ones. When you send these numbers back, updating the site
is a 5-minute change to a single file (`src/data/pricing.ts`).

---

## Phase 1 — Top sellers only (what we need first)

We launched with your two biggest categories. Please fill in the blanks below.

### How do you price these — pick one and tell us:

- [ ] **Per board foot** (board foot = thickness-in × width-in × length-ft ÷ 12)
- [ ] **Per lineal (running) foot**
- [ ] **Flat price per piece**, by exact size

> If different categories are priced differently, just note it next to each.

### 1× Cypress Boards (rough-sawn)

| Size  | Price | Unit (per BF / per LF / per piece) |
|-------|-------|-------------------------------------|
| 1×4   |       |                                     |
| 1×6   |       |                                     |
| 1×8   |       |                                     |
| 1×10  |       |                                     |
| 1×12  |       |                                     |

- Lengths we're offering: **8, 10, 12, 14, 16 ft** — is that right? Add/remove any.
- Are these priced the same regardless of length (other than the size math), or
  do certain lengths cost more per foot?

### Cypress Posts & Beams

| Size   | Price | Unit (per BF / per LF / per piece) |
|--------|-------|-------------------------------------|
| 6×6    |       |                                     |
| 8×8    |       |                                     |
| 10×10  |       |                                     |
| 12×12  |       |                                     |

- Lengths we're offering: **8, 10, 12, 14, 16 ft** — correct? Add/remove any.

### A few clarifying questions

1. **Nominal vs. actual size:** When you quote a "1×6," is it a full rough 1"×6",
   or a planed/dressed size? (This affects the board-foot math shown to the customer.)
2. **Grades / types:** Do *new*, *sinker*, and *pecky* cypress price differently?
   If so, we may add them as separate options.
3. **Minimum order** or cut fees we should mention?
4. **Freight / delivery:** Keep it out of the online estimate (customer confirms
   later), or do you want a flat/zone estimate added?
5. Any sizes listed above you **don't** actually stock, so we can remove them?

---

## Phase 2 — Everything else (send when ready)

Per the plan, you're sending the rest afterward. For each additional product,
we need the same three things:

- Product / category name
- Available sizes
- Price + pricing unit (per BF, per LF, per piece, or per sq ft for paneling/flooring)

Likely Phase 2 candidates from the current site:
Tongue & Groove, Shiplap, Flooring (sq ft), Sinker Cypress slabs, Pecky Cypress,
Mantels (likely one-off / quote-only).

---

## What happens on our end when you send this

1. Drop your numbers into `src/data/pricing.ts` (one line per size).
2. Flip `PRICING_IS_PRELIMINARY` to `false` to remove the "preliminary estimate" badge.
3. Publish. No other changes needed.
