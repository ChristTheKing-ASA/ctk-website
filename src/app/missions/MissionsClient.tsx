"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/Section";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PartnerCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Globe, MapPin, Building } from "lucide-react";

type Category = "all" | "Local" | "National" | "Global";

interface Partner {
  slug: string;
  name: string;
  subtitle?: string;
  category: string;
  shortDescription: string;
}

interface MissionsClientProps {
  partners: Partner[];
  additionalPartners: { name: string; type: string }[];
  children?: React.ReactNode;
}

export default function MissionsClient({
  partners,
  additionalPartners,
  children,
}: MissionsClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredPartners =
    activeCategory === "all"
      ? partners
      : partners.filter((p) => p.category === activeCategory);

  const localCount = partners.filter((p) => p.category === "Local").length;
  const nationalCount = partners.filter((p) => p.category === "National").length;
  const globalCount = partners.filter((p) => p.category === "Global").length;

  const categories: { value: Category; label: string; icon: React.ReactNode }[] = [
    { value: "all", label: "All Partners", icon: <Globe className="w-4 h-4" /> },
    { value: "Local", label: "Local", icon: <MapPin className="w-4 h-4" /> },
    { value: "National", label: "National", icon: <Building className="w-4 h-4" /> },
    { value: "Global", label: "Global", icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <>
      <PageHeader
        title="Missions"
        subtitle="Serving Beyond Our Walls"
        description={`Through faithful giving, CTK supports ${partners.length} mission partners monthly—locally, nationally, and around the world.`}
        breadcrumb={[{ label: "Missions", href: "/missions" }]}
      />

      {/* Stats */}
      <Section background="white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-cream-50 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold text-navy-900 mb-2">{partners.length}</p>
            <p className="text-navy-600">Monthly Partners</p>
          </div>
          <div className="bg-cream-50 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold text-navy-900 mb-2">{localCount}</p>
            <p className="text-navy-600">Local</p>
          </div>
          <div className="bg-cream-50 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold text-navy-900 mb-2">{nationalCount}</p>
            <p className="text-navy-600">National</p>
          </div>
          <div className="bg-cream-50 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold text-navy-900 mb-2">{globalCount}</p>
            <p className="text-navy-600">Global</p>
          </div>
        </div>

        {children}

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === cat.value
                  ? "bg-navy-900 text-white"
                  : "bg-cream-100 text-navy-700 hover:bg-cream-200"
              )}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <PartnerCard
              key={partner.slug}
              name={partner.name}
              subtitle={partner.subtitle}
              category={partner.category}
              shortDescription={partner.shortDescription}
              href={`/missions/${partner.slug}`}
            />
          ))}
        </div>
      </Section>

      {/* Additional Partners */}
      <Section background="cream">
        <SectionHeader
          subtitle="Also Supporting"
          title="Additional Partners"
          description="CTK also supports these organizations as needs arise."
        />

        <div className="flex flex-wrap justify-center gap-4">
          {additionalPartners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white px-4 py-3 rounded-lg border border-cream-200"
            >
              <p className="font-medium text-navy-900 text-sm">{partner.name}</p>
              <p className="text-xs text-navy-500">{partner.type}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Give CTA */}
      <Section background="navy">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Support Our Mission Partners
          </h2>
          <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
            Your generous giving makes this global impact possible. Every dollar
            helps us serve those in need locally and around the world.
          </p>
          <Button href="/give" variant="secondary" size="lg">
            Give Now
          </Button>
        </div>
      </Section>
    </>
  );
}
