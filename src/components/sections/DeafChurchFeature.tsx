import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { HandHeart } from "lucide-react";

export function DeafChurchFeature() {
  return (
    <Section background="navy">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        {/* Image Side */}
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/team/revs-kathy-bob-ayres.jpg"
              alt="Fr. Bob and Deacon Kathy Ayres"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <HandHeart className="w-4 h-4" />
            Deaf Ministry
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            DeafChurch First Coast
          </h2>

          <p className="text-navy-200 text-lg mb-6 leading-relaxed">
            CTK is an anchor church for DeafChurch First Coast, bringing Anglican
            worship to the Deaf community through weekly ASL services.
          </p>

          <Button href="/deafchurch" variant="secondary">
            Learn More
          </Button>
        </div>
      </div>
    </Section>
  );
}
