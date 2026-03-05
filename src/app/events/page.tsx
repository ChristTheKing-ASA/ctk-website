import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { getAllEvents } from "@/lib/content";
import { CalendarDays, Clock, MapPin, Repeat, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events at Christ The King Anglican Church in St. Augustine, FL.",
};

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Upcoming"
        description="Join us for fellowship, worship, and community."
        breadcrumb={[{ label: "Events", href: "/events" }]}
      />

      <Section background="white">
        <div className="max-w-3xl mx-auto">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="w-8 h-8 text-navy-400" />
              </div>
              <h2 className="font-display text-xl font-semibold text-navy-900 mb-2">
                No Upcoming Events
              </h2>
              <p className="text-navy-600">
                Check back soon or visit our{" "}
                <a href="/worship/weekly" className="text-gold-600 hover:text-gold-700 underline">
                  weekly schedule
                </a>{" "}
                for regular gatherings.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <article
                  key={event?.slug}
                  className="flex gap-4 sm:gap-6 p-6 rounded-xl border border-cream-200 bg-cream-50"
                >
                  {/* Date badge */}
                  {event?.date && (
                    <div className="flex-shrink-0 w-16 h-16 bg-navy-900 rounded-xl flex flex-col items-center justify-center text-white">
                      <span className="text-xs font-semibold uppercase">
                        {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" })}
                      </span>
                      <span className="text-xl font-bold leading-tight">
                        {new Date(event.date + "T00:00:00").getDate()}
                      </span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-lg font-semibold text-navy-900 mb-2">
                      {event?.title}
                    </h2>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-navy-600 mb-3">
                      {event?.time && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-navy-400" />
                          {event.time}
                        </span>
                      )}
                      {event?.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-navy-400" />
                          {event.location}
                        </span>
                      )}
                      {event?.recurring && event.recurring !== "none" && (
                        <span className="flex items-center gap-1.5">
                          <Repeat className="w-4 h-4 text-gold-500" />
                          <span className="text-gold-700 font-medium capitalize">
                            {event.recurring}
                          </span>
                        </span>
                      )}
                    </div>

                    {event?.description && (
                      <p className="text-navy-600 text-sm leading-relaxed whitespace-pre-line">
                        {event.description}
                      </p>
                    )}

                    {event?.contactName && (
                      <p className="mt-3 text-sm text-navy-500 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        Contact: {event.contactName}
                        {event.contactEmail && (
                          <>
                            {" — "}
                            <a
                              href={`mailto:${event.contactEmail}`}
                              className="text-gold-600 hover:text-gold-700 underline"
                            >
                              {event.contactEmail}
                            </a>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
