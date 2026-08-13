import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { getHomePage } from "@/lib/content";
import { Icon } from "@/lib/icons";

export async function QuickLinks() {
  const home = await getHomePage();
  const links = home?.quickLinks ?? [];

  if (links.length === 0) return null;

  return (
    <Section background="white">
      <SectionHeader
        subtitle={home?.quickLinksEyebrow || ""}
        title={home?.quickLinksTitle || ""}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {links.map((link) => (
          <FeatureCard
            key={link.title}
            title={link.title}
            description={link.description}
            icon={<Icon name={link.icon} className="w-6 h-6" />}
            href={link.href}
          />
        ))}
      </div>
    </Section>
  );
}
