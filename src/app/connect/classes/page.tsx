import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { getChurchInfo, getConnectClasses } from "@/lib/content";
import { BookOpen, Clock, Users, Check, Phone } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getConnectClasses();
  return {
    title: content?.pageTitle || "Classes",
    description: content?.pageDescription || "",
  };
}

export default async function ClassesPage() {
  const [churchInfo, content] = await Promise.all([getChurchInfo(), getConnectClasses()]);
  if (!content) return null;

  return (
    <>
      <PageHeader
        title={content.pageTitle || "Classes"}
        subtitle={content.pageSubtitle || ""}
        description={content.pageDescription || ""}
        breadcrumb={[
          { label: "Connect", href: "/connect" },
          { label: "Classes", href: "/connect/classes" },
        ]}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
                {content.mainTitle}
              </h2>
              <p className="text-navy-600 mb-4 leading-relaxed">{content.mainIntro}</p>
              <ul className="space-y-3 mb-6">
                {(content.audienceItems ?? []).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold-500 mt-0.5" />
                    <span className="text-navy-600">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-navy-600 leading-relaxed">{content.mainClosing}</p>
            </div>

            <div className="bg-cream-50 rounded-xl p-6 h-fit">
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-4">Class Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gold-500" />
                  <div>
                    <p className="font-medium text-navy-900">{content.detailWeeks}</p>
                    <p className="text-sm text-navy-600">{content.detailWeeksSub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-gold-500" />
                  <div>
                    <p className="font-medium text-navy-900">{content.detailSchedule}</p>
                    <p className="text-sm text-navy-600">{content.detailScheduleSub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gold-500" />
                  <div>
                    <p className="font-medium text-navy-900">{content.detailAudience}</p>
                    <p className="text-sm text-navy-600">{content.detailAudienceSub}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-navy-900 text-white rounded-2xl p-8 lg:p-12 mb-16">
            <h3 className="font-display text-2xl font-bold mb-6">{content.topicsTitle}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {(content.topics ?? []).map((topic) => (
                <div key={topic} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gold-400" />
                  <span className="text-navy-100">{topic}</span>
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
