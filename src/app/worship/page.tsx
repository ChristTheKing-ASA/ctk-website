import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getChurchInfo, getAllActivities, getWorshipPage } from "@/lib/content";
import { Calendar, Clock, MapPin, Video, BookOpen, Users, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Worship",
  description:
    "Join Christ The King for worship - Sunday services, weekly prayer, Bible study, and sermon archive.",
};

export default async function WorshipPage() {
  const [churchInfo, activities, page] = await Promise.all([
    getChurchInfo(),
    getAllActivities(),
    getWorshipPage(),
  ]);

  // Read the Bible study from the CMS rather than restating it. This block used
  // to hardcode its own copy, which drifted: it still advertised the Psalms
  // study after the parish moved to Luke, and carried an old address for the
  // parish administrator. One source now, editable by the parish.
  const bibleStudy = activities.find((a) =>
    (a.title ?? "").toLowerCase().includes("bible study")
  );

  return (
    <>
      <PageHeader
        title={page?.heroTitle || "Worship With Us"}
        subtitle={page?.heroSubtitle || ""}
        description={page?.heroDescription || ""}
        breadcrumb={[{ label: "Worship", href: "/worship" }]}
      />

      {/* Sunday Services */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">
              {page?.sundayEyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
              {page?.sundayTitle}
            </h2>
            <p className="text-navy-600 mb-6 leading-relaxed">
              {page?.sundayBody}
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
                <span className="text-navy-700">{page?.streamingNote}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/visit" variant="primary">
                Plan Your Visit
              </Button>
              {churchInfo.social.youtube && (
                <Button href={churchInfo.social.youtube} external variant="outline">
                  <Video className="w-4 h-4" />
                  Watch Live
                </Button>
              )}
            </div>
          </div>

          <div className="bg-cream-100 rounded-2xl p-8">
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">
              {page?.expectTitle}
            </h3>
            <ul className="space-y-3 text-navy-600">
              {(page?.expectItems ?? []).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1" aria-hidden="true">
                    &bull;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Weekly Activities */}
      <Section background="cream">
        <SectionHeader
          subtitle={page?.weeklySubtitle || ""}
          title={page?.weeklyTitle || ""}
          description={page?.weeklyDescription || ""}
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Morning Prayer */}
          <div className="bg-white p-6 rounded-xl border border-navy-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-gold-600" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  Morning Prayer
                </h3>
                <p className="text-sm text-gold-600">Tuesdays at 10:00 AM</p>
              </div>
            </div>
            <p className="text-navy-600 mb-4">
              Join us for a time of prayer following the Daily Office
            </p>
            <p className="text-sm text-navy-500">In-person</p>
          </div>

          {/* Bible Study */}
          {bibleStudy && (
            <div className="bg-white rounded-xl border border-navy-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy-900">
                      {bibleStudy.title}
                    </h3>
                    <p className="text-sm text-gold-700">
                      {bibleStudy.day} at {bibleStudy.time}
                    </p>
                  </div>
                </div>
                <p className="text-navy-600 text-sm mb-3">{bibleStudy.description}</p>
                <p className="text-sm text-navy-500 mb-4">{bibleStudy.location}</p>
                {bibleStudy.contactEmail && (
                  <div className="pt-3 border-t border-navy-100">
                    <p className="text-xs text-navy-500 font-medium mb-1">Contact:</p>
                    <p className="text-sm text-navy-600 flex items-start gap-2">
                      <Mail className="w-3.5 h-3.5 text-navy-500 shrink-0 mt-1" aria-hidden="true" />
                      <span className="min-w-0">
                        {bibleStudy.contactName}:{" "}
                        <a
                          href={`mailto:${bibleStudy.contactEmail}`}
                          className="text-gold-700 hover:text-gold-800 break-all"
                        >
                          {bibleStudy.contactEmail}
                        </a>
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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
