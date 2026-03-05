import { Button } from "@/components/ui/Button";
import { Home, Search, Church } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Church className="w-10 h-10 text-gold-600" />
        </div>

        <h1 className="font-display text-4xl font-bold text-navy-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-navy-600 text-lg mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been
          moved or no longer exists.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary" size="lg">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
          <Button href="/connect/contact" variant="ghost" size="lg">
            <Search className="w-4 h-4" />
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
