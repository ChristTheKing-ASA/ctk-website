import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { TeamCard } from "@/components/ui/Card";
import { getAllClergy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the clergy of Christ The King Anglican Church in St. Augustine, FL.",
};

export default async function TeamPage() {
  const clergy = await getAllClergy();

  return (
    <>
      <PageHeader
        title="Our Team"
        subtitle="Meet the Clergy"
        description="Faithful shepherds dedicated to serving Christ and His people at CTK."
        breadcrumb={[
          { label: "About", href: "/about" },
          { label: "Team", href: "/about/team" },
        ]}
      />

      <Section background="white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clergy.map((member) => (
            <TeamCard
              key={member.slug}
              name={member.name || ""}
              title={member.title || ""}
              image={member.image || undefined}
              shortBio={member.shortBio || ""}
              href={`/about/team/${member.slug}`}
            />
          ))}
        </div>
      </Section>

      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
            Contact Our Staff
          </h2>
          <p className="text-navy-600 mb-6">
            Have questions or need to get in touch? Our parish administrator
            Terri Husberg can help connect you with the right person.
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-4 text-center">
            <a
              href="tel:9044602318"
              className="px-6 py-3 bg-navy-900 text-white rounded-lg font-medium hover:bg-navy-800 transition-colors"
            >
              Call: 904.460.2318
            </a>
            <a
              href="mailto:thusberg@bellsouth.net"
              className="px-6 py-3 border-2 border-navy-900 text-navy-900 rounded-lg font-medium hover:bg-navy-900 hover:text-white transition-colors"
            >
              Email Parish Office
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
