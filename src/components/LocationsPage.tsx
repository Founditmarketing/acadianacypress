import DedicatedCTA from "./DedicatedCTA";
import Locations from "./Locations";
import PageHero from "./PageHero";

export default function LocationsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHero
        label="Visit Us"
        title="OUR LOCATIONS"
        image="/acadiana-location2.jpg"
        alt="Acadiana Cypress mill direct showroom"
      />
      <Locations showHeader={false} />
      <DedicatedCTA />
    </div>
  );
}
