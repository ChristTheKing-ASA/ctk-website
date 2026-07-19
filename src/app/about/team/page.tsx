import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { TeamCard } from "@/components/ui/Card";
import { getAllClergy, getChurchInfo, getTeamPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the staff and clergy of Christ The King Anglican Church in St. Augustine, FL.",
};

export default async function TeamPage() {
  const [clergy, churchInfo, teamPage] = await Promise.all([
    getAllClergy(),
    getChurchInfo(),
    getTeamPage(),
  ]);

  const byOrder = (a: (typeof clergy)[number], b: (typeof clergy)[number]) =>
    (a.order ?? 99) - (b.order ?? 99);
  const staff = clergy.filter((m) => m.group === "staff").sort(byOrder);
  const volunteerClergy = clergy
    .filter((m) => m.group !== "staff")
    .sort(byOrder);
  const vestryMembers = (teamPage?.vestryMembers ?? []).filter(Boolean);
  const phoneDigits = churchInfo.phone.replace(/\D/g, "");

  return (
    <>
      <PageHeader
        title="Our Team"
        subtitle="Staff, Clergy & Vestry"
        description="Faithful shepherds dedicated to serving Christ and His people at CTK."
        breadcrumb={[
          { label: "About", href: "/about" },
          { label: "Team", href: "/about/team" },
        ]}
      />

      <Section background="white">
        <h2 className="font-display text-2xl font-bold text-navy-900 mb-8">
          Staff
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff.map((member) => (
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
        <h2 className="font-display text-2xl font-bold text-navy-900 mb-8">
          Volunteer Clergy
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {volunteerClergy.map((member) => (
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

      {vestryMembers.length > 0 && (
        <Section background="white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
              {teamPage?.vestryTitle || "Our Vestry"}
            </h2>
            {teamPage?.vestryDescription && (
              <p className="text-navy-600 mb-6">{teamPage.vestryDescription}</p>
            )}
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {vestryMembers.map((name) => (
                <li key={name} className="text-navy-900 font-medium">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section background={vestryMembers.length > 0 ? "cream" : "white"}>
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
              href={`tel:${phoneDigits}`}
              className="px-6 py-3 bg-navy-900 text-white rounded-lg font-medium hover:bg-navy-800 transition-colors"
            >
              Call: {churchInfo.phone}
            </a>
            <a
              href={`mailto:${churchInfo.adminEmail}`}
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
