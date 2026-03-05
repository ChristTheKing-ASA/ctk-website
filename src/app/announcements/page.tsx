import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { getAllAnnouncements } from "@/lib/content";
import { Megaphone, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "Latest announcements from Christ The King Anglican Church.",
};

export default async function AnnouncementsPage() {
  const announcements = await getAllAnnouncements();

  return (
    <>
      <PageHeader
        title="Announcements"
        subtitle="Stay Informed"
        description="News and updates from Christ The King."
        breadcrumb={[{ label: "Announcements", href: "/announcements" }]}
      />

      <Section background="white">
        <div className="max-w-3xl mx-auto">
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Megaphone className="w-8 h-8 text-navy-400" />
              </div>
              <h2 className="font-display text-xl font-semibold text-navy-900 mb-2">
                No Announcements
              </h2>
              <p className="text-navy-600">
                Check back soon for news and updates from the church.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <article
                  key={announcement?.slug}
                  className={`p-6 rounded-xl border ${
                    announcement?.important
                      ? "border-gold-300 bg-gold-50"
                      : "border-cream-200 bg-cream-50"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-display text-lg font-semibold text-navy-900">
                          {announcement?.title}
                        </h2>
                        {announcement?.important && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gold-200 text-gold-800 text-xs font-semibold rounded-full">
                            <AlertTriangle className="w-3 h-3" />
                            Important
                          </span>
                        )}
                      </div>
                      {announcement?.date && (
                        <p className="text-sm text-navy-500">
                          {new Date(announcement.date + "T00:00:00").toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                  {announcement?.content && (
                    <p className="text-navy-600 leading-relaxed whitespace-pre-line">
                      {announcement.content}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
