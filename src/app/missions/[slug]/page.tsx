import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getAllMissionPartners, getMissionPartnerBySlug } from "@/lib/content";
import { ArrowLeft, MapPin, Globe, Building } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Disable dynamic params - only use pre-generated paths
export const dynamicParams = false;

export async function generateStaticParams() {
  const partners = await getAllMissionPartners();
  return partners.map((partner) => ({
    slug: partner.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const partnerData = await getMissionPartnerBySlug(slug);

  if (!partnerData) {
    return { title: "Partner Not Found" };
  }

  return {
    title: partnerData.name || "",
    description: partnerData.shortDescription || "",
  };
}

export default async function PartnerPage({ params }: PageProps) {
  const { slug } = await params;
  const partnerData = await getMissionPartnerBySlug(slug);

  if (!partnerData) {
    return notFound();
  }

  const partner = {
    slug,
    name: partnerData.name || "",
    subtitle: partnerData.subtitle || undefined,
    category: partnerData.category || "Local",
    shortDescription: partnerData.shortDescription || "",
    fullDescription: partnerData.fullDescription || "",
  };

  const categoryIcon: Record<string, React.ReactNode> = {
    Local: <MapPin className="w-4 h-4" />,
    National: <Building className="w-4 h-4" />,
    Global: <Globe className="w-4 h-4" />,
  };

  const categoryColors: Record<string, string> = {
    Local: "bg-sage-100 text-sage-700",
    National: "bg-navy-100 text-navy-700",
    Global: "bg-gold-100 text-gold-700",
  };

  return (
    <>
      <PageHeader
        title={partner.name}
        subtitle={partner.subtitle ?? partner.category}
        breadcrumb={[
          { label: "Missions", href: "/missions" },
          { label: partner.name, href: `/missions/${partner.slug}` },
        ]}
      />

      <Section background="white">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/missions"
            className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Missions</span>
          </Link>

          {/* Category Badge */}
          <div className="mb-6">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                categoryColors[partner.category] ?? ""
              }`}
            >
              {categoryIcon[partner.category]}
              {partner.category} Partner
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl font-bold text-navy-900 mb-2">
            {partner.name}
          </h1>
          {partner.subtitle && (
            <p className="text-gold-600 font-medium text-lg mb-6">
              {partner.subtitle}
            </p>
          )}

          {/* Description */}
          <div className="prose prose-navy max-w-none mb-12">
            {partner.fullDescription.split("\n\n").map((paragraph, index) => {
              // Check if paragraph contains bold markers
              if (paragraph.startsWith("**")) {
                const title = paragraph.replace(/\*\*/g, "").split(" — ")[0];
                const content = paragraph.replace(/\*\*/g, "").split(" — ")[1];
                return (
                  <div key={index} className="mb-4">
                    <h3 className="font-display text-lg font-semibold text-navy-900">
                      {title}
                    </h3>
                    {content && (
                      <p className="text-navy-600 leading-relaxed">{content}</p>
                    )}
                  </div>
                );
              }
              return (
                <p key={index} className="text-navy-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="bg-cream-50 rounded-xl p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-navy-900 mb-4">
              Support This Ministry
            </h2>
            <p className="text-navy-600 mb-6">
              Your giving helps CTK support partners like {partner.name} and
              many others.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/give" variant="primary">
                Give to Missions
              </Button>
              <Button href="/missions" variant="outline">
                View All Partners
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
