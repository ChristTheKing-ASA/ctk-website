import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { getConnectDaughters } from "@/lib/content";
import { Heart, BookOpen, Users, Megaphone, Mail, Phone, ExternalLink } from "lucide-react";

const vowIcons = [Heart, Users, BookOpen, Megaphone] as const;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getConnectDaughters();
  return {
    title: content?.pageTitle || "Daughters of the Holy Cross",
    description: content?.pageDescription || "",
  };
}

export default async function DaughtersPage() {
  const content = await getConnectDaughters();
  if (!content) return null;

  const phoneDigits = (content.contactPhone || "").replace(/\D/g, "");

  return (
    <>
      <PageHeader
        title={content.pageTitle || "Daughters of the Holy Cross"}
        subtitle={content.pageSubtitle || ""}
        description={content.pageDescription || ""}
        breadcrumb={[
          { label: "Connect", href: "/connect" },
          {
            label: "Daughters of the Holy Cross",
            href: "/connect/daughters-of-the-holy-cross",
          },
        ]}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-8">{content.vowsTitle}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(content.vows ?? []).map((vow, index) => {
                const Icon = vowIcons[index] ?? Heart;
                return (
                  <div key={vow} className="bg-cream-50 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-gold-600" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-navy-900">{vow}</h3>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">{content.aboutTitle}</h2>
              <p className="text-navy-600 mb-4 leading-relaxed">{content.aboutParagraph1}</p>
              <p className="text-navy-600 leading-relaxed">{content.aboutParagraph2}</p>
            </div>
            <div className="bg-navy-900 text-white p-8 rounded-xl">
              <h3 className="font-display text-xl font-semibold mb-4">{content.contactBoxTitle}</h3>
              <p className="text-navy-200 mb-6">{content.contactBoxDescription}</p>
              <div className="space-y-3">
                {content.contactPhone && (
                  <a
                    href={`tel:${phoneDigits}`}
                    className="flex items-center gap-2 text-gold-400 hover:text-gold-300"
                  >
                    <Phone className="w-4 h-4" />
                    {content.contactPhone}
                  </a>
                )}
                {content.contactEmail && (
                  <a
                    href={`mailto:${content.contactEmail}`}
                    className="flex items-center gap-2 text-gold-400 hover:text-gold-300"
                  >
                    <Mail className="w-4 h-4" />
                    {content.contactEmail}
                  </a>
                )}
              </div>
            </div>
          </div>

          {content.externalLinkUrl && (
            <div className="text-center">
              <a
                href={content.externalLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                {content.externalLinkLabel}
              </a>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
