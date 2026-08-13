import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Shield, Check, Users, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Safeguarding",
  description:
    "Learn about child safety and safeguarding policies at Christ The King Anglican Church.",
};

export default function SafeguardingPage() {
  return (
    <>
      <PageHeader
        title="Safeguarding"
        subtitle="Child Safety"
        description="Protecting the children and vulnerable adults in our community is a sacred responsibility."
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
                  Director of Safeguarding
                </h2>
                <p className="text-gold-600">Rev. Langdon Pegram</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="prose prose-navy max-w-none mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              Our Commitment
            </h2>
            <p className="text-navy-600 leading-relaxed mb-6">
              At Christ The King, the safety of children, youth, and vulnerable
              adults is paramount. We take proactive steps to create a safe
              environment where everyone can worship, learn, and grow.
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-8 mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900">
              Volunteer Requirements
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-navy-100">
                <div className="flex items-center gap-3 mb-4">
                  <Check className="w-6 h-6 text-gold-500" />
                  <h3 className="font-semibold text-navy-900">
                    Background Screening
                  </h3>
                </div>
                <p className="text-navy-600 text-sm">
                  All volunteers who work with children and youth undergo a
                  comprehensive background check.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-navy-100">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-gold-500" />
                  <h3 className="font-semibold text-navy-900">
                    Safeguarding Our People
                  </h3>
                </div>
                {/* The parish moved from MinistrySafe to the diocesan
                    Safeguarding Our People (SOP) program. This names the right
                    program; the specific training requirements have not been
                    confirmed with the parish, so the wording below claims only
                    that the training is required. */}
                <p className="text-navy-600 text-sm">
                  Completion of Safeguarding Our People (SOP) training, our
                  diocese&apos;s safeguarding program, is required before
                  serving in children&apos;s or youth ministry.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-navy-100">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-gold-500" />
                  <h3 className="font-semibold text-navy-900">
                    Two-Adult Rule
                  </h3>
                </div>
                <p className="text-navy-600 text-sm">
                  We maintain a two-adult minimum in all settings with children
                  and youth.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-navy-100">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-gold-500" />
                  <h3 className="font-semibold text-navy-900">
                    Clear Policies
                  </h3>
                </div>
                <p className="text-navy-600 text-sm">
                  Written policies and procedures guide all children&apos;s and
                  youth activities.
                </p>
              </div>
            </div>
          </div>

          {/* Affected Roles */}
          <div className="bg-navy-900 text-white p-8 rounded-xl">
            <h3 className="font-display text-xl font-semibold mb-4">
              Roles Requiring Safeguarding Training
            </h3>
            <ul className="space-y-2">
              {[
                "Sunday School Teachers",
                "Sunday School Assistants",
                "Nursery Volunteers",
                "Youth Ministry Leaders",
                "Children's Ministry Coordinators",
              ].map((role) => (
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
