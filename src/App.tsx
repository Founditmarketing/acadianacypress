/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, type ReactNode } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBanner from './components/TrustBanner';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Locations from './components/Locations';
import DedicatedCTA from './components/DedicatedCTA';
import Footer from './components/Footer';
import ShopPage from './components/ShopPage';
import ProductPage from './components/ProductPage';
import WhyCypressPage from './components/WhyCypressPage';
import OurWorkPage from './components/OurWorkPage';
import ContactPage from './components/ContactPage';
import LocationsPage from './components/LocationsPage';
import LegalPage from './components/LegalPage';
import ContactDock from './components/ContactDock';
import LoadScreen from './components/LoadScreen';

/**
 * Lightweight hash routing:
 *   #products            → shop, all products
 *   #products/<category> → shop, filtered
 *   #product/<slug>      → product detail
 *   anything else        → home (plain #anchors still scroll natively)
 */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();
  // Flips when the load screen's fade-out finishes; header + hero content
  // hold invisible until then.
  const [revealed, setRevealed] = useState(false);

  let page: ReactNode = null;
  if (hash.startsWith('#product/')) {
    page = <ProductPage slug={hash.slice('#product/'.length)} />;
  } else if (hash === '#products' || hash.startsWith('#products/')) {
    page = <ShopPage category={hash.split('/')[1]} />;
  } else if (hash === '#why-cypress') {
    page = <WhyCypressPage />;
  } else if (hash === '#our-work') {
    page = <OurWorkPage />;
  } else if (hash === '#contact-us') {
    page = <ContactPage />;
  } else if (hash === '#locations') {
    page = <LocationsPage />;
  } else if (hash === '#privacy-policy') {
    page = <LegalPage page="privacy" />;
  } else if (hash === '#terms-conditions') {
    page = <LegalPage page="terms" />;
  }

  // Start each shop/product view from the top (in-page #anchors keep native behavior)
  useEffect(() => {
    if (page) window.scrollTo(0, 0);
  }, [hash]);

  return (
    <div className="min-h-screen relative font-sans text-brand-dark bg-white">
      <LoadScreen onDone={() => setRevealed(true)} />
      <Header revealed={revealed} />
      <main> {/* Hero slides under the transparent fixed header */}
        {page ?? (
          <>
            <Hero revealed={revealed} />
            <TrustBanner />
            <AboutUs />
            <Services />
            <WhyChooseUs />
            <Gallery />
            <DedicatedCTA />
            <Locations />
          </>
        )}
      </main>
      <Footer />
      {/* Spacer so the mobile sticky action bar never covers page content */}
      <div className="h-20 lg:hidden" />
      <ContactDock />
    </div>
  );
}
