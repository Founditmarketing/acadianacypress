import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ClipboardList, Plus, Send, Trash2, X } from "lucide-react";
import { EMAIL } from "../data/contact";
import {
  LUMBER_LINES,
  PRICING_IS_PRELIMINARY,
  formatUSD,
  pricePiece,
  skuKey,
  type CrossSection,
  type LumberLine,
} from "../data/pricing";
import SectionLabel from "./SectionLabel";

interface EstimateItem {
  key: string;
  lineId: string;
  lineName: string;
  label: string; // e.g. "1×6×12"
  qty: number;
  unitPrice: number;
  boardFeet: number;
}

const dimLabel = (section: CrossSection, lengthFt: number) =>
  `${section.label}×${lengthFt}`;

/** Left-column trust cues — carry the brand voice so the calculator can shed headings. */
const CUES: [string, string][] = [
  ["Milled in-house", "Cut & dried at our Louisiana sawmill."],
  ["Priced by the board foot", "Every piece figured on real footage — no guesswork."],
  ["Confirmed by our team", "Freight & finishing finalized by a person, not a bot."],
];

export default function QuoteCalculator() {
  const [lineId, setLineId] = useState<LumberLine["id"]>(LUMBER_LINES[0].id);
  const line = useMemo(
    () => LUMBER_LINES.find((l) => l.id === lineId) ?? LUMBER_LINES[0],
    [lineId]
  );

  const [sectionIdx, setSectionIdx] = useState(0);
  const [lengthFt, setLengthFt] = useState(line.lengths[Math.floor(line.lengths.length / 2)]);
  const [qty, setQty] = useState(1);
  const [items, setItems] = useState<EstimateItem[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  // Keep the cross-section / length selections valid when the product line changes.
  const section = line.crossSections[sectionIdx] ?? line.crossSections[0];
  const activeLength = line.lengths.includes(lengthFt)
    ? lengthFt
    : line.lengths[Math.floor(line.lengths.length / 2)];

  const changeLine = (id: string) => {
    const next = LUMBER_LINES.find((l) => l.id === id);
    if (!next) return;
    setLineId(id);
    setSectionIdx(0);
    setLengthFt(next.lengths[Math.floor(next.lengths.length / 2)]);
  };

  const priced = pricePiece(line, section, activeLength);
  const safeQty = Number.isFinite(qty) && qty > 0 ? Math.floor(qty) : 0;
  const lineTotal = priced.unitPrice * safeQty;

  const addToEstimate = () => {
    if (safeQty < 1) return;
    const key = `${line.id}-${skuKey(section.t, section.w, activeLength)}`;
    setItems((prev) => {
      const existing = prev.find((it) => it.key === key);
      if (existing) {
        return prev.map((it) =>
          it.key === key ? { ...it, qty: it.qty + safeQty } : it
        );
      }
      return [
        ...prev,
        {
          key,
          lineId: line.id,
          lineName: line.name,
          label: dimLabel(section, activeLength),
          qty: safeQty,
          unitPrice: priced.unitPrice,
          boardFeet: priced.boardFeet,
        },
      ];
    });
  };

  const removeItem = (key: string) =>
    setItems((prev) => prev.filter((it) => it.key !== key));

  const estimateTotal = items.reduce(
    (sum, it) => sum + it.unitPrice * it.qty,
    0
  );

  // Keep the newest line in view when the (scroll-capped) ledger grows.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items]);

  const emailEstimate = () => {
    const lines = items.map(
      (it) =>
        `• ${it.qty} × ${it.lineName} ${it.label}  —  ${formatUSD(
          it.unitPrice
        )}/ea  =  ${formatUSD(it.unitPrice * it.qty)}`
    );
    const subject = encodeURIComponent(
      "Lumber quote request (from website calculator)"
    );
    const body = encodeURIComponent(
      [
        "Hi Acadiana Cypress team,",
        "",
        "I put together the following estimate on your website and would like to confirm pricing and availability:",
        "",
        ...lines,
        "",
        `Estimated subtotal: ${formatUSD(estimateTotal)}`,
        "",
        PRICING_IS_PRELIMINARY
          ? "(I understand these are preliminary estimates, not a final quote.)"
          : "",
        "",
        "Name:",
        "Phone:",
        "Project / delivery location:",
        "Notes:",
      ]
        .filter((l) => l !== null)
        .join("\n")
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const fieldClasses =
    "w-full border border-brand-dark/15 bg-white py-2.5 text-sm font-medium text-brand-dark focus:outline-none focus:border-brand-accent transition-colors rounded-none";
  const labelClasses =
    "block text-[10px] uppercase tracking-[0.18em] text-brand-dark/45 mb-1.5";

  const preliminaryChip = PRICING_IS_PRELIMINARY ? (
    <span className="inline-flex items-center border border-brand-accent/40 text-brand-accent text-[9px] font-semibold uppercase tracking-[0.2em] px-2 py-0.5">
      Preliminary
    </span>
  ) : null;

  return (
    <section
      id="quote-calculator"
      className="relative bg-brand-dark py-16 md:py-24 px-6 overflow-hidden"
    >
      {/* Faint woodgrain pattern — same treatment as the "Get Started" section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "url(/acadiana-woodpatternbackground.png)",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 lg:items-start">
        {/* ── LEFT — editorial pitch ──────────────────────────────────── */}
        <div className="relative min-w-0 lg:col-span-5 flex flex-col justify-between">
          {/* Warm amber "ember" glow behind the headline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -left-10 w-72 h-72 rounded-full bg-brand-accent/15 blur-3xl"
          />
          <div className="relative">
            <SectionLabel>Instant Pricing</SectionLabel>
            <h2 className="title-serif text-white text-4xl md:text-5xl leading-[1.05] tracking-tight mb-6">
              LUMBER QUOTE CALCULATOR
            </h2>
            <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-md">
              Pick a size, set a quantity, and see a live cypress estimate —
              priced the way we mill it, by the board foot.
            </p>
          </div>

          <ul className="mt-10 space-y-4 border-t border-white/10 pt-8">
            {CUES.map(([title, detail]) => (
              <li key={title} className="flex gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rotate-45 border border-brand-accent flex-none" />
                <span>
                  <span className="block text-white text-sm font-medium">
                    {title}
                  </span>
                  <span className="block text-white/50 text-sm font-light">
                    {detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT — calculator card ─────────────────────────────────── */}
        <div className="min-w-0 lg:col-span-7">
          <div className="bg-white shadow-2xl">
            {/* Builder */}
            <div className="p-6 md:p-8">
              {/* Product-line segmented toggle */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 border border-brand-dark/10">
                {LUMBER_LINES.map((l) => {
                  const active = l.id === line.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => changeLine(l.id)}
                      className={`px-3 py-2.5 text-xs md:text-sm font-semibold leading-tight transition-colors ${
                        active
                          ? "bg-white shadow-sm text-brand-accent"
                          : "text-brand-dark/60 hover:text-brand-dark"
                      }`}
                    >
                      {l.name}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs font-light text-brand-dark/50 mt-3 mb-5">
                {line.note}
              </p>

              {/* Controls */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <label className="block">
                  <span className={labelClasses}>
                    {line.family === "beam" ? "Size" : "Thick × Width"}
                  </span>
                  <div className="relative">
                    <select
                      value={sectionIdx}
                      onChange={(e) => setSectionIdx(Number(e.target.value))}
                      className={`${fieldClasses} appearance-none pl-3 pr-9 cursor-pointer`}
                    >
                      {line.crossSections.map((s, i) => (
                        <option key={s.label} value={i}>
                          {s.label}
                          {line.family === "board" ? " in" : ""}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                  </div>
                </label>

                <label className="block">
                  <span className={labelClasses}>Length</span>
                  <div className="relative">
                    <select
                      value={activeLength}
                      onChange={(e) => setLengthFt(Number(e.target.value))}
                      className={`${fieldClasses} appearance-none pl-3 pr-9 cursor-pointer`}
                    >
                      {line.lengths.map((ft) => (
                        <option key={ft} value={ft}>
                          {ft} ft
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                  </div>
                </label>

                <label className="block col-span-2 sm:col-span-1">
                  <span className={labelClasses}>Quantity</span>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={Number.isFinite(qty) ? qty : ""}
                    onChange={(e) =>
                      setQty(Math.max(1, Math.floor(Number(e.target.value))))
                    }
                    className={`${fieldClasses} px-3`}
                  />
                </label>
              </div>

              <p className="text-xs font-light text-brand-dark/45 mt-4">
                Estimating{" "}
                <span className="font-medium text-brand-dark/70">
                  {line.name} {dimLabel(section, activeLength)}
                </span>{" "}
                —{" "}
                {priced.boardFeet.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}{" "}
                board feet per piece.
              </p>
            </div>

            {/* Live price bar */}
            <div className="flex flex-wrap items-end justify-between gap-4 px-6 md:px-8 py-5 border-t border-brand-dark/10 bg-gray-50">
              <div>
                <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-brand-dark/50 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  Estimated Price
                  {preliminaryChip}
                </span>
                <span className="title-serif text-brand-dark text-4xl leading-none tabular-nums transition-all duration-200">
                  {formatUSD(lineTotal)}
                </span>
                <span className="block text-sm font-light text-brand-dark/55 mt-1 tabular-nums">
                  {formatUSD(priced.unitPrice)} each × {safeQty}
                </span>
              </div>
              <button
                type="button"
                onClick={addToEstimate}
                disabled={safeQty < 1}
                className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-3.5 hover:bg-brand-accent transition-colors text-xs font-medium uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Ledger */}
            {items.length > 0 ? (
              <div className="border-t border-brand-dark/10">
                <div className="flex items-center justify-between px-6 md:px-8 pt-5 pb-3">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-brand-dark/50">
                    Your Estimate
                  </span>
                  <button
                    type="button"
                    onClick={() => setItems([])}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-brand-dark/50 hover:text-brand-accent transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear
                  </button>
                </div>

                <div className="relative">
                  <ul
                    ref={listRef}
                    className="max-h-[220px] overflow-y-auto divide-y divide-brand-dark/10 px-6 md:px-8"
                  >
                    {items.map((it) => (
                      <li
                        key={it.key}
                        className="flex items-center gap-3 py-2.5 text-sm tabular-nums"
                      >
                        <span className="w-9 flex-none font-semibold text-brand-dark">
                          {it.qty}×
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-medium text-brand-dark truncate">
                            {it.lineName} {it.label}
                          </span>
                          <span className="block text-xs font-light text-brand-dark/45">
                            {formatUSD(it.unitPrice)} each
                          </span>
                        </span>
                        <span className="flex-none font-semibold text-brand-dark">
                          {formatUSD(it.unitPrice * it.qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(it.key)}
                          aria-label={`Remove ${it.lineName} ${it.label}`}
                          className="flex-none text-brand-dark/30 hover:text-brand-accent transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {items.length >= 5 && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent"
                    />
                  )}
                </div>

                {/* Double-rule subtotal — a subtle mill-ticket cue */}
                <div className="mx-6 md:mx-8 border-t border-brand-dark/10" />
                <div className="flex items-center justify-between px-6 md:px-8 py-4 border-t border-brand-dark/15">
                  <span className="text-xs uppercase tracking-[0.25em] text-brand-dark/60">
                    Estimated Subtotal
                  </span>
                  <span className="title-serif text-brand-dark text-2xl tabular-nums">
                    {formatUSD(estimateTotal)}
                  </span>
                </div>

                <div className="px-6 md:px-8 pb-6">
                  <button
                    type="button"
                    onClick={emailEstimate}
                    className="inline-flex items-center justify-center gap-2.5 w-full bg-brand-accent text-white py-3.5 hover:bg-[#a36814] transition-colors font-medium tracking-widest text-sm uppercase shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    Email This Estimate
                  </button>
                  <p className="text-center text-xs font-light text-brand-dark/45 mt-3">
                    Opens a pre-filled email to confirm pricing, availability,
                    and delivery.
                  </p>
                  {PRICING_IS_PRELIMINARY && (
                    <p className="text-center text-[11px] font-light text-brand-dark/40 mt-2">
                      Preliminary estimate — not a final quote; freight &
                      finishing not included.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* Empty state — keeps the card balanced beside the tall left column */
              <div className="border-t border-brand-dark/10 px-6 md:px-8 py-8 text-center">
                <ClipboardList className="w-6 h-6 text-brand-dark/25 mx-auto mb-3" />
                <p className="text-sm font-light text-brand-dark/45">
                  Your estimate is empty. Choose a size and hit{" "}
                  <span className="font-medium text-brand-dark/70">Add</span> to
                  start building a quote.
                </p>
                {PRICING_IS_PRELIMINARY && (
                  <p className="text-[11px] font-light text-brand-dark/40 mt-3">
                    Prices are preliminary — freight &amp; finishing not
                    included, final quote confirmed by our team.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
