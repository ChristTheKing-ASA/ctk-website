import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHeader, Section } from "@/components/ui/Section";
import { getAllEventsIncludingPast, getChurchInfo } from "@/lib/content";
import { EventsBoard } from "@/components/EventsBoard";
import { getTodayDateKey } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming worship, fellowship, formation, and community events at Christ The King Anglican Church in St. Augustine.",
};

export default async function EventsPage() {
  const [events, churchInfo] = await Promise.all([
    getAllEventsIncludingPast(),
    getChurchInfo(),
  ]);

  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Life Together"
        description="Make room for worship, friendship, and the shared life of our parish."
        breadcrumb={[{ label: "Events", href: "/events" }]}
      />

      <Section background="white">
        <EventsBoard events={events} buildDateKey={getTodayDateKey()} />
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
