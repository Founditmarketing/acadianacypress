import { useState, type FormEvent } from "react";
import {
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Tag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { EMAIL, LOCATIONS, PHONE_DISPLAY, PHONE_TEL } from "../data/contact";

/** Shared panel content: Call Now on top, quick contact form below. */
function ContactPanel({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Quote request from ${name || "website visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nPhone / Email: ${contact}\n\n${message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const inputClasses =
    "w-full border border-gray-200 bg-white px-4 py-3 text-sm font-light text-brand-dark placeholder:text-brand-dark/35 focus:outline-none focus:border-brand-accent transition-colors rounded-none";

  return (
    <div className="bg-white shadow-2xl border border-brand-dark/10 overflow-hidden">
      {/* Header */}
      <div className="relative bg-brand-dark px-6 py-5">
        <p className="text-brand-accent text-[10px] uppercase tracking-[0.3em] mb-1">
          Acadiana Cypress
        </p>
        <h3 className="title-serif text-white text-2xl tracking-tight">
          GET IN TOUCH
        </h3>
        <button
          onClick={onClose}
          aria-label="Close contact window"
          className="absolute top-4 right-4 p-1.5 text-white/60 hover:text-brand-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6">
        {/* Call now */}
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex items-center justify-center space-x-3 w-full bg-brand-accent text-white py-3.5 hover:bg-[#a36814] transition-colors font-medium tracking-widest text-sm uppercase"
        >
          <Phone className="w-4 h-4" />
          <span>Call Now — {PHONE_DISPLAY}</span>
        </a>
        <div className="flex justify-center gap-x-6 mt-3 text-xs text-brand-dark/50 font-light">
          {LOCATIONS.map((location) => (
            <a
              key={location.key}
              href={`tel:${location.phoneTel}`}
              className="hover:text-brand-accent transition-colors"
            >
              {location.label}: {location.phoneDisplay}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-brand-dark/40 text-[11px] uppercase tracking-[0.25em]">
            or send a message
          </span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Quick contact form */}
        <form onSubmit={submit} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className={inputClasses}
          />
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Phone or email"
            required
            className={inputClasses}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What can we help you with?"
            rows={3}
            required
            className={`${inputClasses} resize-none`}
          />
          <button
            type="submit"
            className="flex items-center justify-center space-x-3 w-full bg-brand-dark text-white py-3.5 hover:bg-brand-accent transition-colors font-medium tracking-widest text-sm uppercase"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ContactDock() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Desktop: floating button + popover panel ───────────────── */}
      <div className="hidden lg:block">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed bottom-28 right-6 w-[380px] z-[70]"
            >
              <ContactPanel onClose={() => setOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close contact window" : "Open contact window"}
          className="fixed bottom-8 right-6 z-[70] w-16 h-16 rounded-full bg-brand-accent text-white shadow-xl shadow-black/25 flex items-center justify-center hover:bg-[#a36814] transition-colors"
        >
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {open ? (
              <X className="w-7 h-7" />
            ) : (
              <MessageSquare className="w-7 h-7" />
            )}
          </motion.span>
        </button>
      </div>

      {/* ── Mobile: sticky action bar + bottom sheet ───────────────── */}
      <div className="lg:hidden">
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="fixed inset-x-0 bottom-0 z-[70] max-h-[88dvh] overflow-y-auto"
              >
                <ContactPanel onClose={() => setOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Sticky footer bar */}
        <nav className="fixed bottom-0 inset-x-0 z-50 bg-gradient-to-t from-[#241111] to-brand-dark shadow-[0_-10px_30px_rgba(0,0,0,0.45)] pb-[env(safe-area-inset-bottom)]">
          {/* Amber hairline that fades at the edges */}
          <div className="h-px bg-gradient-to-r from-transparent via-brand-accent/70 to-transparent" />

          <div className="grid grid-cols-4 divide-x divide-white/[0.06]">
            {/* Call — the primary action, filled accent circle */}
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex flex-col items-center gap-1.5 pt-2.5 pb-2 active:scale-95 transition-transform"
            >
              <span className="w-9 h-9 rounded-full bg-brand-accent text-white flex items-center justify-center shadow-lg shadow-brand-accent/30">
                <Phone className="w-[18px] h-[18px]" />
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white font-medium">
                Call
              </span>
            </a>

            <button
              onClick={() => setOpen(true)}
              className="flex flex-col items-center gap-1.5 pt-2.5 pb-2 active:scale-95 transition-transform"
            >
              <span className="w-9 h-9 rounded-full border border-white/20 text-white/85 flex items-center justify-center transition-colors active:border-brand-accent active:text-brand-accent">
                <MessageSquare className="w-[18px] h-[18px]" />
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
                Form
              </span>
            </button>

            <a
              href="#products"
              className="flex flex-col items-center gap-1.5 pt-2.5 pb-2 active:scale-95 transition-transform"
            >
              <span className="w-9 h-9 rounded-full border border-white/20 text-white/85 flex items-center justify-center transition-colors active:border-brand-accent active:text-brand-accent">
                <Tag className="w-[18px] h-[18px]" />
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
                Products
              </span>
            </a>

            <a
              href="#locations"
              className="flex flex-col items-center gap-1.5 pt-2.5 pb-2 active:scale-95 transition-transform"
            >
              <span className="w-9 h-9 rounded-full border border-white/20 text-white/85 flex items-center justify-center transition-colors active:border-brand-accent active:text-brand-accent">
                <MapPin className="w-[18px] h-[18px]" />
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
                Visit
              </span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
