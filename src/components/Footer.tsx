import { ChevronRight, Facebook } from "lucide-react";
import { EMAIL, LOCATIONS } from "../data/contact";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-12 relative overflow-hidden">
      <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Links Grid (logo sits in the first column, level with the link lists) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          <div>
            <a href="#" className="inline-block">
              {/* Logo artwork is black; invert renders it white on the dark footer */}
              <img
                src="/AcadianaCypressLogo.png"
                alt="Acadiana Cypress"
                className="h-28 w-auto invert"
              />
            </a>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm">Products</h4>
            <ul className="space-y-4 text-white/70 font-light text-sm">
              <li><a href="#products" className="hover:text-brand-accent transition-colors">Browse All</a></li>
              <li><a href="#products/flooring" className="hover:text-brand-accent transition-colors">Flooring</a></li>
              <li><a href="#products/lumber" className="hover:text-brand-accent transition-colors">Lumber</a></li>
              <li><a href="#products/mantels" className="hover:text-brand-accent transition-colors">Mantels</a></li>
              <li><a href="#products/posts-beams" className="hover:text-brand-accent transition-colors">Posts & Beams</a></li>
              <li><a href="#products/tongue-groove" className="hover:text-brand-accent transition-colors">Tongue & Groove</a></li>
              <li><a href="#products/walls-ceilings" className="hover:text-brand-accent transition-colors">Walls & Ceilings</a></li>
              <li><a href="#products/hunting-blinds" className="hover:text-brand-accent transition-colors">Hunting Blinds</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm">Company</h4>
            <ul className="space-y-4 text-white/70 font-light text-sm">
              <li><a href="#why-cypress" className="hover:text-brand-accent transition-colors">Why Cypress</a></li>
              <li><a href="#our-work" className="hover:text-brand-accent transition-colors">Our Work</a></li>
              <li><a href="#locations" className="hover:text-brand-accent transition-colors">Locations</a></li>
              <li><a href="#contact-us" className="hover:text-brand-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm">Visit Us</h4>
            <ul className="space-y-4 text-white/70 font-light text-sm">
              {LOCATIONS.map((location) => (
                <li key={location.key}>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-accent transition-colors"
                  >
                    {location.label} — {location.city}
                  </a>
                  <p className="text-white/50 mt-1">
                    {location.addressLines.join(", ")}
                  </p>
                  <a
                    href={`tel:${location.phoneTel}`}
                    className="text-white/50 hover:text-brand-accent transition-colors"
                  >
                    {location.phoneDisplay} ({location.phoneContact})
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-brand-accent transition-colors"
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm">Follow us:</h4>
            <div className="flex space-x-5 text-white">
              <a href="https://www.facebook.com/profile.php?id=100076284221092" target="_blank" rel="noopener noreferrer" aria-label="Acadiana Cypress on Facebook" className="flex items-center justify-center hover:text-brand-accent transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 space-y-4 md:space-y-0">
          <p>Acadiana Cypress, All rights reserved</p>
          <div className="flex space-x-6">
            <a href="#privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
