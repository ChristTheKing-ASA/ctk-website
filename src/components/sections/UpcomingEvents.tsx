import { UpcomingEventsList } from "@/components/sections/UpcomingEventsList";
import { getAllEventsIncludingPast } from "@/lib/content";
import { getTodayDateKey } from "@/lib/events";

/**
 * The next few events, straight under the hero.
 *
 * There is nothing to switch on in Keystatic. Whatever the parish adds under
 * Events shows up here in date order and drops off once it has passed, so the
 * Advent and Christmas services, Holy Week, or a parish picnic all get
 * homepage space without a second place to maintain. With no upcoming events
 * the section is not rendered at all.
 */
export async function UpcomingEvents() {
  const allEvents = await getAllEventsIncludingPast();
  if (allEvents.length === 0) return null;

  return (
    <UpcomingEventsList allEvents={allEvents} buildDateKey={getTodayDateKey()} />
  );
}
