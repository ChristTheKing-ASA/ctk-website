import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { churchInfo } from "@/data/church";
import { Heart, BookOpen, HandHeart } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  HandHeart: <HandHeart className="w-6 h-6" />,
};

export function MissionPillars() {
  return (
    <Section background="white">
      <SectionHeader
        subtitle="Our Mission"
        title="Love God. Become Disciples. Serve Others."
        description={churchInfo.mission.vision}
      />

      <div className="grid md:grid-cols-3 gap-8">
        {churchInfo.mission.pillars.map((pillar) => (
          <FeatureCard
            key={pillar.title}
            title={pillar.title}
            description={pillar.description}
            icon={icons[pillar.icon]}
          />
        ))}
      </div>
    </Section>
  );
}
