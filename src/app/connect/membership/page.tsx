import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getConnectMembership } from "@/lib/content";
import { Check, Users, Vote, Heart, Star, ArrowRight, Mail, Phone } from "lucide-react";

const benefitIcons = [Users, Vote, Heart, Star] as const;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getConnectMembership();
  return {
    title: content?.pageTitle || "Membership",
    description: content?.pageDescription || "",
  };
}

export default async function MembershipPage() {
  const content = await getConnectMembership();
  if (!content) return null;

  const phoneDigits = (content.contactPhone || "").replace(/\D/g, "");

  return (
    <>
      <PageHeader
        title={content.pageTitle || "Membership"}
        subtitle={content.pageSubtitle || ""}
        description={content.pageDescription || ""}
        breadcrumb={[
          { label: "Connect", href: "/connect" },
          { label: "Membership", href: "/connect/membership" },
        ]}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
              {content.benefitsTitle}
            </h2>
            <p className="text-navy-600 text-lg">{content.benefitsIntro}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {(content.benefits ?? []).map((benefit, index) => {
              const Icon = benefitIcons[index] ?? Heart;
              return (
                <div
                  key={benefit.title}
                  className="bg-cream-50 p-6 rounded-xl border border-cream-200"
                >
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center text-gold-600 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-navy-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-navy-900 text-white rounded-2xl p-8 lg:p-12 mb-16">
            <h3 className="font-display text-2xl font-bold mb-6">{content.alsoIncludesTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {(content.alsoIncludes ?? []).map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span className="text-navy-100">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">{content.ctaTitle}</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">{content.ctaDescription}</p>

            <div className="bg-cream-50 inline-block p-6 rounded-xl">
              <p className="font-semibold text-navy-900 mb-2">{content.contactName}</p>
              <p className="text-gold-600 text-sm mb-4">{content.contactTitle}</p>
              <div className="space-y-2">
                {content.contactPhone && (
                  <a
                    href={`tel:${phoneDigits}`}
                    className="flex items-center justify-center gap-2 text-navy-600 hover:text-gold-600"
                  >
                    <Phone className="w-4 h-4" />
                    {content.contactPhone}
                  </a>
                )}
                {content.contactEmail && (
                  <a
                    href={`mailto:${content.contactEmail}`}
                    className="flex items-center justify-center gap-2 text-navy-600 hover:text-gold-600"
                  >
                    <Mail className="w-4 h-4" />
                    {content.contactEmail}
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8">
              <Button href="/connect/classes" variant="outline">
                Start with a Class
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
