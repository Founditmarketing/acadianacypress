/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBanner from './components/TrustBanner';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import QuoteCalculator from './components/QuoteCalculator';
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
import PageSEO from './seo/PageSEO';
import { organizationSchema } from './seo/schema';

function HomePage({ revealed }: { revealed: boolean }) {
  return (
    <>
      <PageSEO
        title="Acadiana Cypress | Mill-Direct Louisiana Cypress, Built to Last"
        description="One-of-a-kind cypress wood, milled in South Louisiana. Exceptional quality and timeless Louisiana heritage."
        path="/"
        jsonLd={organizationSchema()}
      />
      <Hero revealed={revealed} />
      <TrustBanner />
      <AboutUs />
      <Services />
      <QuoteCalculator />
      <WhyChooseUs />
      <Gallery />
      <DedicatedCTA />
      <Locations />
    </>
  );
}

/** Scrolls to top on every route change except the home page (matches prior hash-router behavior). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== '/') window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Flips when the load screen's fade-out finishes; header + hero content
  // hold invisible until then.
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="min-h-screen relative font-sans text-brand-dark bg-white">
      <LoadScreen onDone={() => setRevealed(true)} />
      <ScrollToTop />
      <Header revealed={revealed} />
      <main> {/* Hero slides under the transparent fixed header */}
        <Routes>
          <Route path="/" element={<HomePage revealed={revealed} />} />
          <Route path="/why-cypress" element={<WhyCypressPage />} />
          <Route path="/products" element={<ShopPage />} />
          <Route path="/products/:category" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/privacy-policy" element={<LegalPage page="privacy" />} />
          <Route path="/terms-conditions" element={<LegalPage page="terms" />} />
          {/* Unknown paths fall back to home, matching the previous hash router's behavior. */}
          <Route path="*" element={<HomePage revealed={revealed} />} />
        </Routes>
      </main>
      <Footer />
      {/* Spacer so the mobile sticky action bar never covers page content */}
      <div className="h-20 lg:hidden" />
      <ContactDock />
    </div>
  );
}
