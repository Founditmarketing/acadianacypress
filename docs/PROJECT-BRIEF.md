# Project Brief — Lumber Quote Calculator

**Project:** Online instant-price quote calculator for Acadiana Cypress
**Status:** Built and functional on placeholder pricing — ready for review; awaiting real prices to go live.
**Date:** 2026-07-16

---

## What it does

A customer picks a board or beam size, enters a quantity, and gets an **instant
price estimate** — no phone call required. They can stack several sizes into a
running estimate and email the whole list to the team with one click.

## Where it lives

On the **homepage**, in its own section directly **below "Custom Milling &
Lumber" (the Services section)**. It uses the same dark background + faint
woodgrain treatment as the "Get Started" section, so it feels native to the site.
Direct anchor: `/#quote-calculator`.

## What launched (Phase 1 — top sellers only)

- **1× Cypress Boards** — 1×4, 1×6, 1×8, 1×10, 1×12 in lengths 8–16 ft
- **Cypress Posts & Beams** — 6×6, 8×8, 10×10, 12×12 in lengths 8–16 ft
  (matches the "biggest sellers" already called out on the product page)

Features:
- Live price as you change size / length / quantity
- Board-foot breakdown shown for transparency
- "Add to estimate" list with running subtotal
- "Email this estimate" → pre-filled email to the team (reuses the site's
  existing quote-by-email flow)
- A "Preliminary estimate — not a final quote" badge while prices are unconfirmed

## Important: pricing is PLACEHOLDER right now

All dollar amounts are stand-in numbers so the tool works during review. They
are **not** real quotes. Every price is centralized in one file
(`src/data/pricing.ts`) and clearly flagged. See **PRICING-DATA-NEEDED.md** for
the exact list of numbers to request from the client.

## To go live with real pricing (5-minute change)

1. Client returns the price sheet (see `PRICING-DATA-NEEDED.md`).
2. Update `pricePerBoardFoot` (or add per-piece overrides) in `src/data/pricing.ts`.
3. Set `PRICING_IS_PRELIMINARY = false` to drop the preliminary badge.
4. Publish.

## Phase 2 (follow-up)

Client is sending pricing for the rest of the catalog afterward. Adding a new
product line = one new entry in `src/data/pricing.ts`; the calculator UI adapts
automatically (it renders whatever lines exist).

## Files touched

- `src/data/pricing.ts` — NEW: pricing data + board-foot math (the one file to edit for prices)
- `src/components/QuoteCalculator.tsx` — NEW: the calculator UI/section
- `src/App.tsx` — inserted `<QuoteCalculator />` below `<Services />`

## Open questions for the client

Captured in `PRICING-DATA-NEEDED.md` — pricing unit (board foot vs. lineal foot
vs. per piece), nominal vs. actual dimensions, grade/type price differences,
minimums, and whether to include freight.
