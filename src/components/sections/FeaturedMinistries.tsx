import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getDeafChurchInfo, getAllMissionPartners } from "@/lib/content";
import { HandHeart, ArrowRight, Users, Globe } from "lucide-react";

export async function FeaturedMinistries() {
  const [deafChurchData, partners] = await Promise.all([
    getDeafChurchInfo(),
    getAllMissionPartners(),
  ]);

  const counts = { local: 0, national: 0, global: 0 };
  for (const partner of partners) {
    if (partner?.category === "Local") counts.local += 1;
    else if (partner?.category === "National") counts.national += 1;
    else if (partner?.category === "Global") counts.global += 1;
  }

  const deafChurch = {
    name: deafChurchData?.name || "DeafChurch First Coast",
    tagline: deafChurchData?.tagline || "Bringing Anglican worship to the Deaf community in American Sign Language",
  };

  return (
    <Section background="gradient">
      <SectionHeader
        subtitle="Making a Difference"
        title="Featured Ministries"
        description="Discover how CTK is serving our community and the world."
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative bg-navy-900 text-white rounded-2xl overflow-hidden p-8 lg:p-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full opacity-5" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <HandHeart className="w-4 h-4" />
              <span>Featured Ministry</span>
            </div>
            <h3 className="font-display text-3xl font-bold mb-4">{deafChurch.name}</h3>
            <p className="text-navy-200 mb-6 leading-relaxed">
              {deafChurch.tagline}. Christ The King serves as an Anchor Church,
              helping establish in-person community for the Deaf across Northeast Florida.
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
              Learn More About DeafChurch
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-navy-100 p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            <span>Global Impact</span>
          </div>
          <h3 className="font-display text-3xl font-bold text-navy-900 mb-4">
            {partners.length} Mission Partner{partners.length === 1 ? "" : "s"}
          </h3>
          <p className="text-navy-600 mb-6 leading-relaxed">
            Through faithful giving, CTK supports mission partners across
            St. Augustine, the United States, and around the world.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-cream-50 rounded-xl">
              <p className="text-2xl font-bold text-navy-900">{counts.local}</p>
              <p className="text-sm text-navy-600">Local</p>
            </div>
            <div className="text-center p-4 bg-cream-50 rounded-xl">
              <p className="text-2xl font-bold text-navy-900">{counts.national}</p>
              <p className="text-sm text-navy-600">National</p>
            </div>
            <div className="text-center p-4 bg-cream-50 rounded-xl">
              <p className="text-2xl font-bold text-navy-900">{counts.global}</p>
              <p className="text-sm text-navy-600">Global</p>
            </div>
          </div>
          <Button href="/missions" variant="primary">
            Explore Our Missions
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
