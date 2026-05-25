import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ChurchMapEmbedProps {
  street: string;
  city: string;
  state: string;
  zip: string;
  className?: string;
  minHeight?: string;
}

function buildQuery(street: string, city: string, state: string) {
  return `Christ The King Anglican Church, ${street}, ${city}, ${state}`;
}

export function ChurchMapEmbed({
  street,
  city,
  state,
  zip,
  className = "",
  minHeight = "400px",
}: ChurchMapEmbedProps) {
  const query = buildQuery(street, city, state);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${street}, ${city}, ${state} ${zip}`,
  )}`;
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!mapsKey) {
    return (
      <div
        className={`rounded-xl border border-navy-100 bg-cream-50 flex flex-col items-center justify-center p-8 text-center ${className}`}
        style={{ minHeight }}
      >
        <MapPin className="w-10 h-10 text-gold-500 mb-4" />
        <p className="text-navy-700 font-medium mb-2">Map preview unavailable</p>
        <p className="text-sm text-navy-500 mb-6 max-w-sm">
          Add <code className="text-xs bg-white px-1 py-0.5 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to
          enable the embedded map. See THIRD_PARTY_SETUP.md.
        </p>
        <Button href={directionsUrl} external variant="primary" size="sm">
          <MapPin className="w-4 h-4" />
          Open in Google Maps
        </Button>
      </div>
    );
  }

  return (
    <iframe
      src={`https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${encodeURIComponent(query)}`}
      width="100%"
      height="100%"
      style={{ border: 0, minHeight }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Church Location Map"
      className={className}
    />
  );
}
