import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHeader, Section } from "@/components/ui/Section";
import { getAllEvents, getChurchInfo } from "@/lib/content";
import {
  formatEventDate,
  getEventCategoryLabel,
  getEventDateBadge,
} from "@/lib/events";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming worship, fellowship, formation, and community events at Christ The King Anglican Church in St. Augustine.",
};

type Event = Awaited<ReturnType<typeof getAllEvents>>[number];

function EventDetails({ event }: { event: Event }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-navy-600">
      <time
        dateTime={event.date}
        className="flex items-center gap-2 font-medium text-navy-800"
      >
        <CalendarDays className="h-4 w-4 text-gold-600" aria-hidden="true" />
        {formatEventDate(event.date, event.endDate)}
      </time>
      {event.time && (
        <span className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-gold-600" aria-hidden="true" />
          {event.time}
        </span>
      )}
      {event.location && (
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gold-600" aria-hidden="true" />
          {event.location}
        </span>
      )}
    </div>
  );
}

function EventActions({ event }: { event: Event }) {
  if (!event.registrationUrl && !event.contactEmail) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      {event.registrationUrl && (
        <Button href={event.registrationUrl} external variant="primary">
          Event details
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}
      {event.contactEmail && (
        <a
          href={`mailto:${event.contactEmail}`}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-700 underline decoration-navy-200 underline-offset-4 transition-colors hover:text-gold-700 hover:decoration-gold-400"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {event.contactName || "Ask a question"}
        </a>
      )}
    </div>
  );
}

function DateBadge({ date }: { date: string }) {
  const { month, day } = getEventDateBadge(date);

  return (
    <div
      className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-navy-900 text-white"
      aria-hidden="true"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
        {month}
      </span>
      <span className="font-display text-3xl font-semibold leading-none">
        {day}
      </span>
    </div>
  );
}

export default async function EventsPage() {
  const [events, churchInfo] = await Promise.all([
    getAllEvents(),
    getChurchInfo(),
  ]);
  const [nextEvent, ...laterEvents] = events;

  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Life Together"
        description="Make room for worship, friendship, and the shared life of our parish."
        breadcrumb={[{ label: "Events", href: "/events" }]}
      />

      <Section background="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div className="lg:pt-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-700">
              What&apos;s Ahead
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl">
              Come share the life of our parish.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-navy-600">
              Our calendar holds the moments that draw us together—holy days,
              shared meals, thoughtful formation, and opportunities to serve
              our neighbors.
            </p>
          </div>

          {nextEvent ? (
            <article className="overflow-hidden rounded-3xl border border-navy-100 bg-cream-50">
              <div className="border-b border-navy-100 px-6 py-4 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">
                  Next Gathering
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <DateBadge date={nextEvent.date} />
                  <div className="min-w-0 flex-1">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
                      {getEventCategoryLabel(nextEvent.category)}
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
                      {nextEvent.title}
                    </h3>
                    <div className="mt-4">
                      <EventDetails event={nextEvent} />
                    </div>
                    {nextEvent.description && (
                      <p className="mt-5 whitespace-pre-line leading-relaxed text-navy-600">
                        {nextEvent.description}
                      </p>
                    )}
                    <EventActions event={nextEvent} />
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <div className="rounded-3xl border border-navy-100 bg-cream-50 p-8 sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-gold-700 shadow-sm ring-1 ring-navy-100">
                <CalendarDays className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-7 font-display text-2xl font-semibold text-navy-900">
                The calendar is taking shape.
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-navy-600">
                New gatherings will appear here as they are announced. In the
                meantime, our weekly rhythm of worship, prayer, and study
                continues.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/worship/weekly" variant="primary">
                  View the weekly schedule
                </Button>
                <Button href="/connect/contact" variant="ghost">
                  Contact the church
                </Button>
              </div>
            </div>
          )}
        </div>

        {laterEvents.length > 0 && (
          <div className="mt-16 border-t border-navy-100 pt-12 lg:mt-20">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-700">
                  Save the Date
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-navy-900">
                  More Upcoming Events
                </h2>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {laterEvents.map((event) => (
                <article
                  key={event.slug}
                  className="rounded-2xl border border-navy-100 bg-white p-6"
                >
                  <div className="flex items-start gap-5">
                    <DateBadge date={event.date} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
                        {getEventCategoryLabel(event.category)}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-navy-900">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-5 border-t border-navy-100 pt-5">
                    <EventDetails event={event} />
                    {event.description && (
                      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-navy-600">
                        {event.description}
                      </p>
                    )}
                    <EventActions event={event} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section background="cream">
        <div className="grid items-center gap-8 border-y border-navy-200 py-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-700">
              Our Weekly Rhythm
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900">
              Sunday worship and gatherings throughout the week
            </h2>
            <p className="mt-3 text-navy-600">
              Holy Eucharist, {churchInfo.serviceTime}, at{" "}
              {churchInfo.address.street}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button href="/worship/weekly" variant="outline">
              Weekly schedule
            </Button>
            <Button href="/visit" variant="primary">
              Plan your visit
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
