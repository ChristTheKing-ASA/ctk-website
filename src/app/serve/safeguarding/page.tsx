import { Metadata } from "next";
import { getSafeguardingPage } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Shield, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Safeguarding",
  description:
    "Learn about child safety and safeguarding policies at Christ The King Anglican Church.",
};

export default async function SafeguardingPage() {
  const page = await getSafeguardingPage();
  const requirements = page?.requirements ?? [];

  return (
    <>
      <PageHeader
        title={page?.heroTitle || "Safeguarding"}
        subtitle={page?.heroSubtitle || ""}
        description={page?.heroDescription || ""}
        breadcrumb={[
          { label: "Serve", href: "/serve" },
          { label: "Safeguarding", href: "/serve/safeguarding" },
        ]}
      />

      <Section background="white">
        <div className="max-w-3xl mx-auto">
          {/* Director */}
          <div className="bg-cream-50 p-6 rounded-xl mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-navy-700" />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-navy-900">
                  {page?.directorLabel}
                </h2>
                <p className="text-gold-700">{page?.directorName}</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="prose prose-navy max-w-none mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              {page?.commitmentTitle}
            </h2>
            <p className="text-navy-600 leading-relaxed mb-6">
              {page?.commitmentBody}
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-8 mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900">
              {page?.requirementsTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {requirements.map((req) => (
                <div
                  key={req.title}
                  className="bg-white p-6 rounded-xl border border-navy-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name={req.icon} className="w-6 h-6 text-gold-600" />
                    <h3 className="font-semibold text-navy-900">{req.title}</h3>
                  </div>
                  <p className="text-navy-600 text-sm">{req.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Affected Roles */}
          <div className="bg-navy-900 text-white p-8 rounded-xl">
            <h3 className="font-display text-xl font-semibold mb-4">
              {page?.rolesTitle}
            </h3>
            <ul className="space-y-2">
              {(page?.roles ?? []).map((role) => (
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
