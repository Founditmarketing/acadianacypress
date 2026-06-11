import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";

/** Classic circular Facebook logo (filled) — distinct from the lucide outline icon. */
const FacebookCircle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.992 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);
import { AnimatePresence, motion } from "motion/react";
import {
  EMAIL,
  FACEBOOK_URL,
  LOCATIONS,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "../data/contact";
import { searchSite } from "../data/searchIndex";

const tagline_phrases = [
  "Moreauville & Grand Coteau, Louisiana",
  "Quality you can see. Craftsmanship you can trust.",
  "Family-owned & operated in the heart of Acadiana.",
  "Custom milling, flooring, mantels & more.",
  "Timeless wood for projects built to last generations.",
];

const productLinks = [
  "Browse All",
  "Flooring",
  "Hunting Blinds",
  "Lumber",
  "Mantels",
  "Posts & Beams",
  "Tongue & Groove",
  "Walls & Ceilings",
];

const slug = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const productHref = (label: string) =>
  label === "Browse All" ? "#products" : `#products/${slug(label)}`;

/** Preview image per mega-menu entry. */
const productImages: Record<string, string> = {
  "Browse All": "/acadiana-lumberhero.jpeg",
  Flooring: "/acadiana-floor2.jpg",
  "Hunting Blinds": "/products/hunting-blinds/01.jpg",
  Lumber: "/products/sinker-cypress/01.jpg",
  Mantels: "/products/fireplace-mantels/01.jpg",
  "Posts & Beams": "/products/cypress-post-beams/01.jpg",
  "Tongue & Groove": "/products/tg-cypress/01.jpg",
  "Walls & Ceilings": "/products/cypress-shiplap/01.jpg",
};

const navItems = [
  { label: "Home", href: "#" },
  { label: "Why Cypress", href: "#why-cypress" },
  { label: "Products", href: "#products", dropdown: productLinks },
  { label: "Browse All", href: "#products" },
  { label: "Our Work", href: "#our-work" },
  { label: "Contact Us", href: "#contact-us" },
  { label: "Locations", href: "#locations" },
];

export default function Header({ revealed = true }: { revealed?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [phrase, setPhrase] = useState(0);
  const [route, setRoute] = useState(() => window.location.hash);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaPreview, setMegaPreview] = useState(productLinks[0]);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Shared by the trigger and the panel so the menu survives the gap between them
  const openMega = () => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    setMegaOpen(true);
  };
  const scheduleMegaClose = () => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Close the search panel and mega menu when navigating
  useEffect(() => {
    setSearchOpen(false);
    setQuery("");
    setMegaOpen(false);
  }, [route]);
  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  // Pages without a dark hero behind the header need it solid from the top
  // (Why Cypress and Locations have their own page heroes, so they stay transparent)
  const onSubPage =
    route === "#products" ||
    route.startsWith("#products/") ||
    route.startsWith("#product/") ||
    route === "#contact-us";
  const solid = scrolled || onSubPage;

  // Rotate the top-bar tagline. The first phrase (our locations) holds for
  // 7s so it's still showing when the load screen reveals the site.
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setPhrase(1);
      interval = setInterval(
        () => setPhrase((p) => (p + 1) % tagline_phrases.length),
        5000
      );
    }, 7000);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    // z-[60] keeps the slide-out menu above the mobile sticky action bar (z-50)
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-opacity duration-1000 ${
        revealed ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-brand-dark text-white text-xs">
        <div className="max-w-[1920px] mx-auto px-6 py-2 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-x-6">
          <div className="hidden md:flex items-center space-x-2 text-white/80">
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            <span>Moreauville &amp; Grand Coteau, Louisiana</span>
          </div>
          <div className="relative h-5 overflow-hidden text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phrase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="tracking-wide font-medium leading-5"
              >
                {tagline_phrases[phrase]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="hidden md:flex items-center justify-end space-x-6 text-white/80">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center space-x-2 hover:text-brand-accent transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-accent" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="hidden lg:flex items-center space-x-2 hover:text-brand-accent transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-accent" />
              <span>{EMAIL}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div
        className={`transition-colors duration-300 ${
          solid
            ? "bg-white border-b border-gray-200"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Grid with equal 1fr flanks keeps the nav perfectly page-centered on desktop */}
        <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] px-6 py-2 max-w-[1920px] mx-auto">
          {/* Left: Logo */}
          <div className="flex-shrink-0 lg:justify-self-start">
            <a href="#" className="block">
              {/* Logo artwork is black; invert renders it white over the hero */}
              <img
                src="/AcadianaCypressLogo.png"
                alt="Acadiana Cypress"
                className={`w-auto transition-all duration-300 ${
                  solid ? "h-12 lg:h-14" : "h-20 lg:h-24 invert"
                }`}
              />
            </a>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center space-x-9 text-sm">
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleMegaClose}
                >
                  <a
                    href={item.href}
                    className={`flex items-center space-x-1.5 hover:text-brand-accent transition-colors font-medium border-b border-transparent pb-1 ${
                      megaOpen ? "border-brand-accent text-brand-accent" : ""
                    } ${solid ? "text-brand-dark" : "text-white"}`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        megaOpen ? "rotate-180" : ""
                      }`}
                    />
                  </a>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={`hover:text-brand-accent transition-colors font-medium border-b border-transparent hover:border-brand-accent pb-1 ${
                    solid ? "text-brand-dark" : "text-white"
                  }`}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-5 text-sm font-medium lg:justify-self-end">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acadiana Cypress on Facebook"
              className={`flex items-center justify-center hover:text-brand-accent transition-colors p-1 ${
                solid ? "text-brand-dark" : "text-white"
              }`}
            >
              <FacebookCircle className="w-[22px] h-[22px]" />
            </a>
            <button
              onClick={() => setSearchOpen((o) => !o)}
              aria-label={searchOpen ? "Close search" : "Open search"}
              className={`flex items-center justify-center hover:text-brand-accent transition-colors p-1 ${
                searchOpen
                  ? "text-brand-accent"
                  : solid
                    ? "text-brand-dark"
                    : "text-white"
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
            <a href="#contact-us" className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-brand-accent text-white hover:bg-[#a36814] transition-colors rounded-none">
              Request Quote
            </a>
            {/* Hamburger (mobile/tablet) */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={`lg:hidden flex items-center justify-center p-1 hover:text-brand-accent transition-colors ${
                solid ? "text-brand-dark" : "text-white"
              }`}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-width products mega menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            onMouseEnter={openMega}
            onMouseLeave={scheduleMegaClose}
            className="hidden lg:block absolute inset-x-0 top-full bg-white border-b border-gray-200 shadow-2xl"
          >
            <div className="max-w-[1400px] mx-auto grid grid-cols-[1fr_1fr_440px] gap-12 px-12 py-12">
              {/* Link columns */}
              {[productLinks.slice(0, 4), productLinks.slice(4)].map(
                (column, colIndex) => (
                  <div key={colIndex} className="space-y-1">
                    {colIndex === 0 && (
                      <p className="text-brand-accent text-[11px] uppercase tracking-[0.3em] mb-5">
                        Our Products
                      </p>
                    )}
                    {colIndex === 1 && <div className="h-[34px]" />}
                    {column.map((product) => (
                      <a
                        key={product}
                        href={productHref(product)}
                        onMouseEnter={() => setMegaPreview(product)}
                        className={`group/item flex items-center justify-between py-3 border-b border-gray-100 transition-colors ${
                          megaPreview === product
                            ? "text-brand-accent"
                            : "text-brand-dark hover:text-brand-accent"
                        }`}
                      >
                        <span className="title-serif text-xl tracking-wide">
                          {product}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 -rotate-90 transition-all duration-300 ${
                            megaPreview === product
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2"
                          }`}
                        />
                      </a>
                    ))}
                  </div>
                )
              )}

              {/* Preview image column */}
              <a
                href={productHref(megaPreview)}
                className="relative block overflow-hidden bg-brand-dark aspect-[4/3] group/preview"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={megaPreview}
                    src={productImages[megaPreview]}
                    alt={megaPreview}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-6 bottom-5 flex items-end justify-between">
                  <div>
                    <p className="text-brand-accent text-[10px] uppercase tracking-[0.25em] mb-1">
                      {megaPreview === "Browse All" ? "Catalog" : "Category"}
                    </p>
                    <p className="title-serif text-white text-2xl tracking-wide">
                      {megaPreview}
                    </p>
                  </div>
                  <span className="text-white text-xs uppercase tracking-[0.2em] border-b border-brand-accent pb-1 group-hover/preview:text-brand-accent transition-colors">
                    View
                  </span>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search panel under the header */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-white border-b border-gray-200 shadow-2xl"
          >
            <div className="max-w-3xl mx-auto px-6 py-6">
              <div className="flex items-center gap-3 border-b border-brand-dark/20 focus-within:border-brand-accent transition-colors pb-3">
                <Search className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories, and pages…"
                  className="flex-1 outline-none text-lg font-light text-brand-dark placeholder:text-brand-dark/35 bg-transparent"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="p-1 text-brand-dark/50 hover:text-brand-accent transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {query.trim() && (
                <div className="max-h-[50vh] overflow-y-auto mt-2">
                  {searchSite(query).length === 0 ? (
                    <p className="py-5 text-brand-dark/50 font-light text-sm">
                      No results for “{query.trim()}” — try “pecky”,
                      “flooring”, or “mantels”.
                    </p>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {searchSite(query).map((result) => (
                        <li key={result.href}>
                          <a
                            href={result.href}
                            onClick={() => {
                              setSearchOpen(false);
                              setQuery("");
                            }}
                            className="flex items-center justify-between py-3.5 group"
                          >
                            <span className="text-brand-dark font-light group-hover:text-brand-accent transition-colors">
                              {result.title}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-dark/40 flex-shrink-0 ml-6">
                              {result.type}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-brand-dark text-white lg:hidden flex flex-col h-dvh"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <img
                  src="/AcadianaCypressLogo.png"
                  alt="Acadiana Cypress"
                  className="h-16 w-auto invert"
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-white/80 hover:text-brand-accent transition-colors"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              {/* Drawer nav */}
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                    >
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => setMobileProductsOpen((o) => !o)}
                            className="w-full flex items-center justify-between py-3 text-2xl font-light tracking-wide hover:text-brand-accent transition-colors"
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-200 ${
                                mobileProductsOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileProductsOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden border-l border-brand-accent/40 ml-1 pl-5"
                              >
                                {item.dropdown.map((product) => (
                                  <li key={product}>
                                    <a
                                      href={productHref(product)}
                                      onClick={() => setMenuOpen(false)}
                                      className="block py-2.5 text-base font-light text-white/80 hover:text-brand-accent transition-colors"
                                    >
                                      {product}
                                    </a>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="block py-3 text-2xl font-light tracking-wide hover:text-brand-accent transition-colors"
                        >
                          {item.label}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-6 border-t border-white/10 space-y-4">
                <a
                  href="#contact-us"
                  onClick={() => setMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-brand-accent text-white hover:bg-[#a36814] transition-colors font-medium tracking-wide"
                >
                  Request Quote
                </a>
                <div className="space-y-2 text-sm text-white/70 font-light">
                  {LOCATIONS.map((location) => (
                    <a
                      key={location.key}
                      href={`tel:${location.phoneTel}`}
                      className="flex items-center space-x-3 hover:text-brand-accent transition-colors"
                    >
                      <Phone className="w-4 h-4 text-brand-accent" />
                      <span>
                        {location.phoneDisplay} ({location.phoneContact},{" "}
                        {location.label})
                      </span>
                    </a>
                  ))}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center space-x-3 hover:text-brand-accent transition-colors"
                  >
                    <Mail className="w-4 h-4 text-brand-accent" />
                    <span>{EMAIL}</span>
                  </a>
                  <p className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-brand-accent" />
                    <span>Moreauville &amp; Grand Coteau, LA</span>
                  </p>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:text-brand-accent transition-colors"
                  >
                    <FacebookCircle className="w-4 h-4 text-brand-accent" />
                    <span>Follow us on Facebook</span>
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
