import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getClergyBySlug, getHomePage } from "@/lib/content";
import { Quote } from "lucide-react";

export async function RectorWelcome() {
  // Identity comes from the clergy collection so it cannot drift from the Team
  // page; only the surrounding copy is homepage content.
  const [rectorData, home] = await Promise.all([
    getClergyBySlug("craig-sanders"),
    getHomePage(),
  ]);

  if (!rectorData) return null;

  const rector = {
    slug: "craig-sanders",
    name: rectorData.name || "",
    title: rectorData.title || "",
    image: rectorData.image || "",
    quote: home?.rectorQuote || "",
  };

  return (
    <Section background="cream">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-navy-100 shadow-xl relative">
            {rector.image ? (
              <Image
                src={rector.image}
                alt={rector.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-200 to-navy-300">
                <span className="text-6xl font-display font-bold text-navy-500">
                  CS
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-4">
            {home?.rectorEyebrow}
          </p>

          <div className="relative mb-6">
            <Quote className="absolute -top-2 -left-4 w-8 h-8 text-gold-300" />
            <blockquote className="font-display text-2xl sm:text-3xl text-navy-900 leading-relaxed pl-6 italic">
              {rector.quote}
            </blockquote>
          </div>

          <div className="mb-6">
            <p className="font-display text-lg font-semibold text-navy-900">
              {rector.name}
            </p>
            <p className="text-gold-600 font-medium">{rector.title}</p>
          </div>

          <p className="text-navy-600 mb-8 leading-relaxed">{home?.rectorBody}</p>

          <div className="flex flex-wrap gap-4">
            <Button href={`/about/team/${rector.slug}`} variant="primary">
              {home?.rectorPrimaryCtaLabel}
            </Button>
            <Button href="/about" variant="ghost">
              {home?.rectorSecondaryCtaLabel}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
