import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getChurchInfo } from "@/lib/content";
import { Calendar, Clock, MapPin, Video, Users } from "lucide-react";
import { WeeklyActivitiesList } from "@/components/sections/WeeklyActivitiesList";

export const metadata: Metadata = {
  title: "Worship",
  description:
    "Join Christ The King for worship - Sunday services, weekly prayer, Bible study, and sermon archive.",
};

export default async function WorshipPage() {
  const churchInfo = await getChurchInfo();

  return (
    <>
      <PageHeader
        title="Worship With Us"
        subtitle="Gather Together"
        description="Experience the beauty of Anglican liturgy, the power of Scripture, and the warmth of community."
        breadcrumb={[{ label: "Worship", href: "/worship" }]}
      />

      {/* Sunday Services */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Every Sunday
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
              Sunday Morning Worship
            </h2>
            <p className="text-navy-600 mb-6 leading-relaxed">
              Our main weekly gathering features blended worship with traditional
              hymns and contemporary music, Scripture readings, a sermon, and the
              celebration of Holy Eucharist.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold-500" />
                <span className="text-navy-700">{churchInfo.serviceTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold-500" />
                <span className="text-navy-700">
                  {churchInfo.address.street}, {churchInfo.address.city}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-gold-500" />
                <span className="text-navy-700">Also streaming on YouTube</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/visit" variant="primary">
                Plan Your Visit
              </Button>
              <Button href={churchInfo.social.youtube} external variant="outline">
                <Video className="w-4 h-4" />
                Watch Live
              </Button>
            </div>
          </div>

          <div className="bg-cream-100 rounded-2xl p-8">
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">
              What to Expect
            </h3>
            <ul className="space-y-3 text-navy-600">
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span>
                Welcoming atmosphere for all
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span>
                Traditional and contemporary music
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span>
                Scripture readings and sermon
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span>
                Weekly Holy Communion
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span>
                Nursery and children&apos;s programs
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span>
                Fellowship after the service
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Weekly Activities */}
      <Section background="cream">
        <SectionHeader
          subtitle="Throughout the Week"
          title="Weekly Gatherings"
          description="Beyond Sunday, join us for prayer and study during the week."
        />

        <WeeklyActivitiesList compact excludeTitles={["Sunday Worship"]} />
      </Section>

      {/* Quick Links */}
      <Section background="white">
        <SectionHeader title="Explore More" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Watch Sermons"
            description="Browse our sermon archive and catch up on recent messages."
            icon={<Video className="w-6 h-6" />}
            href="/worship/sermons"
          />
          <FeatureCard
            title="Weekly Schedule"
            description="See all our weekly gatherings for prayer and study."
            icon={<Calendar className="w-6 h-6" />}
            href="/worship/weekly"
          />
          <FeatureCard
            title="DeafChurch"
            description="Weekly ASL services for the Deaf community."
            icon={<Users className="w-6 h-6" />}
            href="/deafchurch"
          />
        </div>
      </Section>
    </>
  );
}
