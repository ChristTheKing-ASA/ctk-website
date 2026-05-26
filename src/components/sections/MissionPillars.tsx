import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { Heart, BookOpen, HandHeart } from "lucide-react";
import { getChurchInfo } from "@/lib/content";

const icons = [Heart, BookOpen, HandHeart] as const;

export async function MissionPillars() {
  const churchInfo = await getChurchInfo();

  return (
    <Section background="white">
      <SectionHeader
        subtitle="Our Mission"
        title={churchInfo.mission.headline}
        description={churchInfo.mission.vision}
      />

      <div className="grid md:grid-cols-3 gap-8">
        {churchInfo.mission.pillars.map((pillar, index) => {
          const Icon = icons[index] ?? Heart;
          return (
            <FeatureCard
              key={pillar.title}
              title={pillar.title}
              description={pillar.description}
              icon={<Icon className="w-6 h-6" />}
            />
          );
        })}
      </div>
    </Section>
  );
}
