import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Check, Users, Vote, Heart, Star, ArrowRight, Mail } from "lucide-react";
import { getMembershipPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Membership",
  description: "Learn about becoming a member of Christ The King Anglican Church.",
};

const benefits = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Personal Sense of Belonging",
    description: "Become part of a caring community committed to walking together in faith.",
  },
  {
    icon: <Vote className="w-6 h-6" />,
    title: "Voting Rights",
    description: "Participate in congregational meetings and help shape the direction of CTK.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Meaningful Ministry Roles",
    description: "Access to significant ministry positions and leadership opportunities.",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Spiritual Development",
    description: "Opportunities for personal and spiritual growth through classes and mentoring.",
  },
];

export default async function MembershipPage() {
  const membership = await getMembershipPage();

  return (
    <>
      <PageHeader
        title="Membership"
        subtitle="Belong"
        description="Membership at Christ The King is about more than attending—it's about belonging, growing, and serving together."
        breadcrumb={[
          { label: "Connect", href: "/connect" },
          { label: "Membership", href: "/connect/membership" },
        ]}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          {/* Benefits */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
              Benefits of Membership
            </h2>
            <p className="text-navy-600 text-lg">
              Membership provides a framework for mutual commitment, accountability,
              and growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-cream-50 p-6 rounded-xl border border-cream-200"
              >
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center text-gold-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-navy-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="bg-navy-900 text-white rounded-2xl p-8 lg:p-12 mb-16">
            <h3 className="font-display text-2xl font-bold mb-6">
              Membership Also Includes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Meaningful relationships with fellow believers",
                "Eternal rewards through faithful service",
                "Accountability for spiritual growth",
                "Connection to the wider Anglican family",
                "Pastoral care and support",
                "Opportunities to use your gifts",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span className="text-navy-100">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              Interested in Membership?
            </h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              {membership?.contactIntro ||
                "We'd love to talk with you about becoming a member of Christ the King."}
            </p>

            <div className="bg-cream-50 inline-block p-6 rounded-xl">
              <p className="font-semibold text-navy-900 mb-2">
                {membership?.contactName}
              </p>
              <p className="text-gold-600 text-sm mb-4">
                {membership?.contactTitle}
              </p>
              <a
                href={`mailto:${membership?.contactEmail}`}
                className="flex items-center justify-center gap-2 text-navy-600 hover:text-gold-600"
              >
                <Mail className="w-4 h-4" />
                {membership?.contactEmail}
              </a>
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
