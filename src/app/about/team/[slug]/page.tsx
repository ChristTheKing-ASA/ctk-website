import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getAllClergy, getClergyBySlug } from "@/lib/content";
import { Mail, Phone, BookOpen, Users, ArrowLeft, Quote } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Disable dynamic params - only use pre-generated paths
export const dynamicParams = false;

export async function generateStaticParams() {
  const clergy = await getAllClergy();
  return clergy.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getClergyBySlug(slug);

  if (!member) {
    return { title: "Team Member Not Found" };
  }

  return {
    title: member.name || "",
    description: member.shortBio || "",
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const memberData = await getClergyBySlug(slug);

  if (!memberData) {
    notFound();
  }

  // Transform CMS data to expected format
  const member = {
    slug,
    name: memberData.name || "",
    title: memberData.title || "",
    email: memberData.email || "",
    phone: memberData.phone || "",
    image: memberData.image || "",
    shortBio: memberData.shortBio || "",
    fullBio: memberData.fullBio || "",
    family: memberData.family || "",
    education: memberData.education || [],
    quote: memberData.quote
      ? { text: memberData.quote, source: memberData.name || "" }
      : null,
    publications: [] as string[],
  };

  if (!member) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={member.name}
        subtitle={member.title}
        breadcrumb={[
          { label: "About", href: "/about" },
          { label: "Team", href: "/about/team" },
          { label: member.name.split(" ").pop() || "", href: `/about/team/${member.slug}` },
        ]}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/about/team"
            className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Team</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Photo */}
              <div className="aspect-[4/5] bg-navy-100 rounded-xl overflow-hidden mb-6 relative">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-200 to-navy-300">
                    <span className="text-5xl font-display font-bold text-navy-500">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-3 text-navy-600 hover:text-navy-900 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-gold-500" />
                    <span className="text-sm">{member.email}</span>
                  </a>
                )}
                {member.phone && (
                  <a
                    href={`tel:${member.phone.replace(/[^\d]/g, "")}`}
                    className="flex items-center gap-3 text-navy-600 hover:text-navy-900 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-gold-500" />
                    <span className="text-sm">{member.phone}</span>
                  </a>
                )}
              </div>

              {/* Quick Facts */}
              <div className="mt-6 pt-6 border-t border-navy-100">
                {member.family && (
                  <div className="flex items-start gap-3 mb-4">
                    <Users className="w-5 h-5 text-gold-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-navy-900">Family</p>
                      <p className="text-sm text-navy-600">{member.family}</p>
                    </div>
                  </div>
                )}
                {member.education && (
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-gold-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-navy-900">Education</p>
                      <ul className="text-sm text-navy-600">
                        {member.education.map((edu) => (
                          <li key={edu}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-2">
                {member.name}
              </h2>
              <p className="text-gold-600 font-medium mb-6">{member.title}</p>

              {/* Quote */}
              {member.quote && (
                <div className="relative bg-cream-50 rounded-xl p-6 mb-8">
                  <Quote className="absolute top-4 left-4 w-6 h-6 text-gold-300" />
                  <blockquote className="pl-8 italic text-navy-700 text-lg leading-relaxed">
                    &quot;{member.quote.text}&quot;
                  </blockquote>
                  {member.quote.source && (
                    <p className="pl-8 mt-3 text-sm text-gold-600">
                      — {member.quote.source}
                    </p>
                  )}
                </div>
              )}

              {/* Bio */}
              <div className="prose prose-navy max-w-none">
                {member.fullBio.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-navy-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Publications */}
              {member.publications && member.publications.length > 0 && (
                <div className="mt-8 pt-6 border-t border-navy-100">
                  <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">
                    Publications
                  </h3>
                  <ul className="space-y-2">
                    {member.publications.map((pub) => (
                      <li
                        key={pub}
                        className="flex items-center gap-2 text-navy-600"
                      >
                        <BookOpen className="w-4 h-4 text-gold-500" />
                        <span className="italic">{pub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* DeafChurch Link for Fr. Bob */}
              {member.slug === "bob-ayres" && (
                <div className="mt-8 p-6 bg-navy-900 text-white rounded-xl">
                  <h3 className="font-display text-lg font-semibold mb-2">
                    DeafChurch First Coast
                  </h3>
                  <p className="text-navy-200 mb-4">
                    Fr. Bob is the founding pastor of DeafChurch Together. Learn
                    more about this unique ministry serving the Deaf community.
                  </p>
                  <Button href="/deafchurch" variant="secondary">
                    Learn About DeafChurch
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
