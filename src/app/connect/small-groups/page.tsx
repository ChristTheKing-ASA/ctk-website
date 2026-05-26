import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { getChurchInfo, getConnectSmallGroups } from "@/lib/content";
import { Users, MapPin, Heart, BookOpen, UtensilsCrossed, Phone } from "lucide-react";

const highlightIcons = [Users, UtensilsCrossed, Heart, BookOpen] as const;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getConnectSmallGroups();
  return {
    title: content?.pageTitle || "Small Groups",
    description: content?.pageDescription || "",
  };
}

export default async function SmallGroupsPage() {
  const [churchInfo, content] = await Promise.all([getChurchInfo(), getConnectSmallGroups()]);
  if (!content) return null;

  const highlights = content.highlights ?? [];

  return (
    <>
      <PageHeader
        title={content.pageTitle || "Small Groups"}
        subtitle={content.pageSubtitle || ""}
        description={content.pageDescription || ""}
        breadcrumb={[
          { label: "Connect", href: "/connect" },
          { label: "Small Groups", href: "/connect/small-groups" },
        ]}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
                {content.whyTitle}
              </h2>
              <p className="text-navy-600 mb-4 leading-relaxed">{content.whyParagraph1}</p>
              <p className="text-navy-600 leading-relaxed">{content.whyParagraph2}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((label, index) => {
                const Icon = highlightIcons[index] ?? Users;
                return (
                  <div key={label} className="bg-cream-50 p-6 rounded-xl text-center">
                    <Icon className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                    <p className="font-semibold text-navy-900">{label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-navy-900 text-white rounded-2xl p-8 lg:p-12 mb-16">
            <h3 className="font-display text-2xl font-bold mb-6">{content.locationsTitle}</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {(content.locations ?? []).map((loc) => (
                <div key={loc.title} className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-gold-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{loc.title}</h4>
                    <p className="text-navy-200">{loc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-display text-2xl font-bold text-navy-900 mb-4">{content.ctaTitle}</h3>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">{content.ctaDescription}</p>
            <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-6 py-3 rounded-lg font-medium">
              <Phone className="w-5 h-5" />
              <a href={`tel:${churchInfo.phone.replace(/\./g, "")}`}>{churchInfo.phone}</a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
