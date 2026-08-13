import { Metadata } from "next";
import {
  getConnectPage,
  getVolunteerCounts,
  getMissionPartnerCounts,
} from "@/lib/content";
import { Icon } from "@/lib/icons";
import { PageHeader } from "@/components/ui/Section";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Get connected at Christ The King - small groups, classes, membership, and more.",
};

export default async function ConnectPage() {
  const [page, volunteers, partners] = await Promise.all([
    getConnectPage(),
    getVolunteerCounts(),
    getMissionPartnerCounts(),
  ]);
  const ways = page?.ways ?? [];

  return (
    <>
      <PageHeader
        title={page?.heroTitle || "Get Connected"}
        subtitle={page?.heroSubtitle || ""}
        description={page?.heroDescription || ""}
        breadcrumb={[{ label: "Connect", href: "/connect" }]}
      />

      {/* Ways to Connect */}
      <Section background="white">
        <SectionHeader
          subtitle={page?.waysSubtitle || ""}
          title={page?.waysTitle || ""}
          description={page?.waysDescription || ""}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ways.map((way) => (
            <FeatureCard
              key={way.title}
              title={way.title}
              description={way.description}
              icon={<Icon name={way.icon} className="w-6 h-6" />}
              href={way.href}
            />
          ))}
        </div>
      </Section>

      {/* Quick Contact */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-gold-600" />
          </div>
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
            Questions? We&apos;d Love to Hear From You
          </h2>
          <p className="text-navy-600 text-lg mb-8">
            Whether you have questions about CTK, want to learn more about our
            community, or just want to say hello—we&apos;re here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/connect/contact" variant="primary" size="lg">
              Contact Us
            </Button>
            <Button href="/visit" variant="outline" size="lg">
              Plan a Visit
            </Button>
          </div>
        </div>
      </Section>

      {/* Volunteer CTA */}
      <Section background="navy">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              {page?.serveTitle}
            </h2>
            <p className="text-navy-200 text-lg mb-6">{page?.serveBody}</p>
            <Button href="/serve" variant="secondary" size="lg">
              {page?.serveCtaLabel}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-navy-800 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-gold-400 mb-1">
                {volunteers.roles}
              </p>
              <p className="text-navy-200 text-sm">Volunteer Roles</p>
            </div>
            <div className="bg-navy-800 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-gold-400 mb-1">
                {volunteers.areas}
              </p>
              <p className="text-navy-200 text-sm">Ministry Areas</p>
            </div>
            <div className="bg-navy-800 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-gold-400 mb-1">
                {partners.total}
              </p>
              <p className="text-navy-200 text-sm">Mission Partners</p>
            </div>
            <div className="bg-navy-800 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-gold-400 mb-1">∞</p>
              <p className="text-navy-200 text-sm">Ways to Give</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
