import { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/Section";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getChurchInfo, getServePage, getVolunteerAreas } from "@/lib/content";
import { getMissionStats } from "@/lib/missionStats";
import {
  Shield,
  Phone,
  Globe,
  Users,
  HandHeart,
  Music,
  Coffee,
  Baby,
  Wrench,
  Heart,
} from "lucide-react";

const areaIcons = [Music, Coffee, Baby, Wrench, Heart] as const;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getServePage();
  return {
    title: content?.pageTitle || "Serve",
    description: content?.pageDescription || "",
  };
}

export default async function ServePage() {
  const [churchInfo, content, volunteerAreas, missionStats] = await Promise.all([
    getChurchInfo(),
    getServePage(),
    getVolunteerAreas(),
    getMissionStats(),
  ]);
  if (!content) return null;

  return (
    <>
      <PageHeader
        title={content.pageTitle || "Serve"}
        subtitle={content.pageSubtitle || ""}
        description={content.pageDescription || ""}
        breadcrumb={[{ label: "Serve", href: "/serve" }]}
      />

      <Section background="white">
        <SectionHeader
          subtitle={content.hubSubtitle || ""}
          title={content.hubTitle || ""}
          description={content.hubDescription || ""}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Volunteer at CTK"
            description="Serve during worship, hospitality, children's ministry, or facilities."
            icon={<HandHeart className="w-6 h-6" />}
            href="#volunteer"
          />
          <FeatureCard
            title="Missions"
            description="Support our mission partners locally and around the world."
            icon={<Globe className="w-6 h-6" />}
            href="/missions"
          />
          <FeatureCard
            title="DeafChurch"
            description="Help bring Anglican worship to the Deaf community through ASL services."
            icon={<Users className="w-6 h-6" />}
            href="/deafchurch"
          />
        </div>
      </Section>

      <Section background="cream" id="volunteer">
        <SectionHeader
          subtitle={content.volunteerSubtitle || ""}
          title={content.volunteerTitle || ""}
          description={content.volunteerDescription || ""}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {volunteerAreas.map((area, index) => {
            const Icon = areaIcons[index] ?? Heart;
            return (
              <div key={area.slug} className="bg-white p-6 rounded-xl border border-navy-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-gold-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-display text-xl font-semibold text-navy-900">
                        {area.name}
                      </h3>
                      {area.requiresTraining && (
                        <span className="inline-flex items-center gap-1 text-xs bg-navy-100 text-navy-700 px-2 py-0.5 rounded-full font-medium">
                          <Shield className="w-3 h-3" />
                          Training
                        </span>
                      )}
                    </div>
                    <p className="text-navy-600 text-sm mb-4">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.roles.map((role) => (
                        <span
                          key={role}
                          className="bg-cream-100 px-3 py-1 rounded-full text-sm text-navy-700"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 border border-navy-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
              {content.volunteerCtaTitle}
            </h3>
            <p className="text-navy-600">{content.volunteerCtaDescription}</p>
          </div>
          <a
            href={`tel:${churchInfo.phone.replace(/\./g, "")}`}
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
          >
            <Phone className="w-5 h-5" />
            {churchInfo.phone}
          </a>
        </div>
      </Section>

      <Section background="white">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-navy-900 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Shield className="w-10 h-10 text-gold-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-2">
              {content.safeguardingTitle}
            </h2>
            <p className="text-navy-600">{content.safeguardingDescription}</p>
          </div>
          <Button href="/serve/safeguarding" variant="outline" className="flex-shrink-0">
            Learn More
          </Button>
        </div>
      </Section>

      <Section background="navy">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src="/images/ministries/marsabit-kenya-missions.jpg"
              alt="Mission trip to Kenya"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-2">
              {content.missionsSubtitle}
            </p>
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              {content.missionsTitle}
            </h2>
            <p className="text-navy-200 mb-6 leading-relaxed">{content.missionsDescription}</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-gold-400">{missionStats.local}</p>
                <p className="text-navy-300 text-sm">Local Partners</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gold-400">{missionStats.national}</p>
                <p className="text-navy-300 text-sm">National</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gold-400">{missionStats.global}</p>
                <p className="text-navy-300 text-sm">Global</p>
              </div>
            </div>
            <Button href="/missions" variant="secondary" size="lg">
              Explore All Missions
            </Button>
          </div>
        </div>
      </Section>

      <Section background="cream">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">
              {content.deafChurchSubtitle}
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
              {content.deafChurchTitle}
            </h2>
            <p className="text-navy-600 mb-6 leading-relaxed">{content.deafChurchDescription}</p>
            <div className="flex flex-wrap gap-4">
              <Button href="/deafchurch" variant="primary">
                Learn About DeafChurch
              </Button>
              <Button href="/about/team/bob-ayres" variant="ghost">
                Meet Fr. Bob Ayres
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden order-1 lg:order-2 bg-navy-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-16 h-16 text-gold-500 mx-auto mb-4" />
                <p className="font-display text-2xl font-bold text-navy-900">DeafChurch</p>
                <p className="text-navy-600">Together</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
