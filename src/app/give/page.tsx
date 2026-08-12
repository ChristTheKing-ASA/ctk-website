import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getChurchInfo, getGivePage } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Heart, ExternalLink, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Support the ministry of Christ The King Anglican Church through online giving.",
};

export default async function GivePage() {
  const [churchInfo, page] = await Promise.all([getChurchInfo(), getGivePage()]);
  const whereCards = page?.whereCards ?? [];

  return (
    <>
      <PageHeader
        title={page?.heroTitle || "Give"}
        subtitle={page?.heroSubtitle || ""}
        description={page?.heroDescription || ""}
        breadcrumb={[{ label: "Give", href: "/give" }]}
      />

      <Section background="white">
        <div className="max-w-3xl mx-auto">
          {/* Main CTA */}
          <div className="bg-navy-900 text-white rounded-2xl p-8 lg:p-12 text-center mb-12">
            <Heart className="w-12 h-12 text-gold-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold mb-4">
              {page?.onlineTitle}
            </h2>
            <p className="text-navy-200 text-lg mb-8 max-w-xl mx-auto">
              {page?.onlineBody}
            </p>
            {churchInfo.giving.url && (
              <Button
                href={churchInfo.giving.url}
                external
                variant="secondary"
                size="lg"
              >
                <Heart className="w-5 h-5" />
                {page?.onlineCtaLabel}
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
            <p className="mt-4 text-sm text-navy-400 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              {page?.onlineSecureNote}
            </p>
          </div>

          {/* Why Give */}
          {whereCards.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-6 text-center">
                {page?.whereTitle}
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {whereCards.map((card) => (
                  <div
                    key={card.title}
                    className="bg-cream-50 p-6 rounded-xl text-center"
                  >
                    <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name={card.icon} className="w-6 h-6 text-gold-600" />
                    </div>
                    <h3 className="font-semibold text-navy-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-navy-600 text-sm">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Ways to Give. The mailing address and app URL come from
              Site Settings so they cannot drift from the footer. */}
          <div className="bg-cream-50 rounded-xl p-8">
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">
              {page?.otherWaysTitle}
            </h3>
            <div className="space-y-4 text-navy-600">
              <div>
                <h4 className="font-semibold text-navy-900">
                  {page?.inPersonTitle}
                </h4>
                <p className="text-sm">{page?.inPersonBody}</p>
              </div>
              <div>
                <h4 className="font-semibold text-navy-900">
                  {page?.byMailTitle}
                </h4>
                <p className="text-sm">
                  {page?.byMailBody} {churchInfo.address.mailing}
                </p>
              </div>
              {churchInfo.giving.appUrl && (
                <div>
                  <h4 className="font-semibold text-navy-900">
                    {page?.appTitle}
                  </h4>
                  <p className="text-sm">
                    {page?.appBody}{" "}
                    <a
                      href={churchInfo.giving.appUrl}
                      className="text-gold-600 hover:text-gold-700"
                    >
                      {page?.appLinkLabel}
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Missions Link */}
          <div className="mt-12 text-center">
            <p className="text-navy-600 mb-4">{page?.missionsPrompt}</p>
            <Button href="/missions" variant="outline">
              {page?.missionsCtaLabel}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
