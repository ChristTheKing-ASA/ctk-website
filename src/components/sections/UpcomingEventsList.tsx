"use client";

import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { EventDateBadge } from "@/components/EventDateBadge";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { SiteEvent } from "@/lib/content";
import {
  formatEventDate,
  getEventCategoryLabel,
  splitEventsByDate,
} from "@/lib/events";
import { useTodayDateKey } from "@/lib/useTodayDateKey";

/** How many events the homepage previews before sending people to /events. */
const HOMEPAGE_EVENT_LIMIT = 3;

/**
 * Browser half of the homepage events section. It picks the upcoming events
 * using today's date, so a finished event drops off without a site rebuild.
 */
export function UpcomingEventsList({
  allEvents,
  buildDateKey,
}: {
  allEvents: SiteEvent[];
  buildDateKey: string;
}) {
  const today = useTodayDateKey(buildDateKey);
  const { upcoming: events } = splitEventsByDate(allEvents, today);
  if (events.length === 0) return null;

  const shown = events.slice(0, HOMEPAGE_EVENT_LIMIT);
  const remaining = events.length - shown.length;

  return (
    <Section background="cream" className="py-14 lg:py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold-700">
            Coming Up
          </p>
          <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Join us in the weeks ahead
          </h2>
        </div>
        <Button href="/events" variant="outline">
          {remaining > 0 ? `See all ${events.length} events` : "See the events page"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((event) => (
          <li key={event.slug}>
            <Link
              href="/events"
              className="group flex h-full items-start gap-5 rounded-2xl border border-navy-100 bg-white p-6 transition-colors duration-200 hover:border-gold-400"
            >
              <EventDateBadge date={event.date} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
                  {getEventCategoryLabel(event.category)}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-navy-900 group-hover:text-navy-700">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-navy-800">
                  <time dateTime={event.date}>
                    {formatEventDate(event.date, event.endDate)}
                  </time>
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-navy-600">
                  {event.time && (
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4 text-gold-600" aria-hidden="true" />
                      {event.time}
                    </span>
                  )}
                  {event.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-gold-600" aria-hidden="true" />
                      {event.location}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
