import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { MapPin, Play, Users, Heart } from "lucide-react";

const links = [
  {
    title: "Plan Your Visit",
    description: "Everything you need to know for your first Sunday with us.",
    icon: <MapPin className="w-6 h-6" />,
    href: "/visit",
  },
  {
    title: "Watch Sermons",
    description: "Catch up on recent messages or browse our sermon archive.",
    icon: <Play className="w-6 h-6" />,
    href: "/worship/sermons",
  },
  {
    title: "Get Connected",
    description: "Join a small group, class, or find your place to serve.",
    icon: <Users className="w-6 h-6" />,
    href: "/connect",
  },
  {
    title: "Give Online",
    description: "Support the ministry of CTK through secure online giving.",
    icon: <Heart className="w-6 h-6" />,
    href: "/give",
  },
];

export function QuickLinks() {
  return (
    <Section background="white">
      <SectionHeader
        subtitle="Get Started"
        title="How Can We Help?"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {links.map((link) => (
          <FeatureCard
            key={link.title}
            title={link.title}
            description={link.description}
            icon={link.icon}
            href={link.href}
          />
        ))}
      </div>
    </Section>
  );
}
