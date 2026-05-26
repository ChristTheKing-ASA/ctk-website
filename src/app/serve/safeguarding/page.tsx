import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { getSafeguarding } from "@/lib/content";
import { Shield, Check, Users, BookOpen } from "lucide-react";

const requirementIcons = [Check, BookOpen, Users, Shield] as const;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSafeguarding();
  return {
    title: content?.pageTitle || "Safeguarding",
    description: content?.pageDescription || "",
  };
}

export default async function SafeguardingPage() {
  const content = await getSafeguarding();
  if (!content) return null;

  return (
    <>
      <PageHeader
        title={content.pageTitle || "Safeguarding"}
        subtitle={content.pageSubtitle || ""}
        description={content.pageDescription || ""}
        breadcrumb={[
          { label: "Serve", href: "/serve" },
          { label: "Safeguarding", href: "/serve/safeguarding" },
        ]}
      />

      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-cream-50 p-6 rounded-xl mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-navy-700" />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-navy-900">
                  {content.directorTitle}
                </h2>
                <p className="text-gold-600">{content.directorName}</p>
              </div>
            </div>
          </div>

          <div className="prose prose-navy max-w-none mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              {content.commitmentTitle}
            </h2>
            <p className="text-navy-600 leading-relaxed mb-6">{content.commitmentText}</p>
          </div>

          <div className="space-y-8 mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900">
              {content.requirementsTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {(content.requirements ?? []).map((req, index) => {
                const Icon = requirementIcons[index] ?? Check;
                return (
                  <div key={req.title} className="bg-white p-6 rounded-xl border border-navy-100">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 text-gold-500" />
                      <h3 className="font-semibold text-navy-900">{req.title}</h3>
                    </div>
                    <p className="text-navy-600 text-sm">{req.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-navy-900 text-white p-8 rounded-xl">
            <h3 className="font-display text-xl font-semibold mb-4">{content.rolesTitle}</h3>
            <ul className="space-y-2">
              {(content.trainingRoles ?? []).map((role) => (
                <li key={role} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-400" />
                  <span className="text-navy-100">{role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
