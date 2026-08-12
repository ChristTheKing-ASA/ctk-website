import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  getDeafChurchInfo,
  getHomePage,
  getMissionPartnerCounts,
} from "@/lib/content";
import { HandHeart, ArrowRight, Users, Globe } from "lucide-react";

export async function FeaturedMinistries() {
  const [deafChurchData, home, counts] = await Promise.all([
    getDeafChurchInfo(),
    getHomePage(),
    getMissionPartnerCounts(),
  ]);

  const deafChurch = {
    name: deafChurchData?.name || "DeafChurch First Coast",
    tagline:
      deafChurchData?.tagline ||
      "Bringing Anglican worship to the Deaf community in American Sign Language",
  };

  const categories = [
    { label: "Local", count: counts.local },
    { label: "National", count: counts.national },
    { label: "Global", count: counts.global },
  ];

  return (
    <Section background="gradient">
      <SectionHeader
        subtitle={home?.ministriesEyebrow || ""}
        title={home?.ministriesTitle || ""}
        description={home?.ministriesDescription || ""}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* DeafChurch Card - Featured */}
        <div className="relative bg-navy-900 text-white rounded-2xl overflow-hidden p-8 lg:p-10">
          {/* Background Pattern - simple solid for performance */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full opacity-5" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <HandHeart className="w-4 h-4" />
              <span>Featured Ministry</span>
            </div>

            <h3 className="font-display text-3xl font-bold mb-4">
              {deafChurch.name}
            </h3>

            <p className="text-navy-200 mb-6 leading-relaxed">
              {deafChurch.tagline}. {home?.deafChurchBody}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-navy-300">
                <Users className="w-4 h-4 text-gold-500" />
                <span>Weekly ASL Services</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-navy-300">
                <Globe className="w-4 h-4 text-gold-500" />
                <span>Regional Ministry</span>
              </div>
            </div>

            <Button href="/deafchurch" variant="secondary">
              {home?.deafChurchCtaLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Missions Overview Card */}
        <div className="bg-white rounded-2xl border border-navy-100 p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            <span>Global Impact</span>
          </div>

          {/* Counted from the Mission Partners collection. Previously hardcoded
              as "11" over tiles reading 4/2/4, which sum to 10. */}
          <h3 className="font-display text-3xl font-bold text-navy-900 mb-4">
            {counts.total} Mission {counts.total === 1 ? "Partner" : "Partners"}
          </h3>

          <p className="text-navy-600 mb-6 leading-relaxed">
            {home?.missionsBody}
          </p>

          {/* Partner Categories */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {categories.map((category) => (
              <div
                key={category.label}
                className="text-center p-4 bg-cream-50 rounded-xl"
              >
                <p className="text-2xl font-bold text-navy-900">
                  {category.count}
                </p>
                <p className="text-sm text-navy-600">{category.label}</p>
              </div>
            ))}
          </div>

          <Button href="/missions" variant="primary">
            {home?.missionsCtaLabel}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
