import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { Heart, BookOpen, HandHeart } from "lucide-react";

// Mission pillars are core to church identity and rarely change - keeping static
const missionPillars = [
  {
    title: "Love God",
    description: "With all your heart, soul, mind, and strength",
    icon: "Heart",
  },
  {
    title: "Become Disciples",
    description: "Growing in spiritual maturity modeled on Christ",
    icon: "BookOpen",
  },
  {
    title: "Serve Others",
    description: "Expressing divine love through humble service",
    icon: "HandHeart",
  },
];

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
        description="To be co-workers with Christ in the Kingdom of God"
      />

      <div className="grid md:grid-cols-3 gap-8">
        {missionPillars.map((pillar) => (
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
