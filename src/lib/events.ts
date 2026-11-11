type DatedEvent = {
  date?: string | null;
  endDate?: string | null;
};

const eventDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const eventMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

const eventDayFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  timeZone: "UTC",
});

function parseEventDate(date: string) {
  return new Date(`${date}T12:00:00Z`);
}

const churchDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/**
 * Today's date as YYYY-MM-DD in the parish's own time zone.
 *
 * Not UTC: by 7 or 8 PM in St. Augustine it is already tomorrow in UTC, which
 * would move an evening service to "past" while people are still driving to it.
 */
export function getTodayDateKey(now = new Date()) {
  return churchDateFormatter.format(now);
}

export function isUpcomingEvent(
  event: DatedEvent,
  today = getTodayDateKey()
) {
  if (!event.date) return false;
  return (event.endDate || event.date) >= today;
}

/**
 * Splits events into what is still ahead (soonest first) and what has
 * happened (most recent first).
 */
export function splitEventsByDate<T extends DatedEvent>(
  events: T[],
  today = getTodayDateKey()
) {
  const sorted = [...events].sort(compareEventsByDate);
  return {
    upcoming: sorted.filter((event) => isUpcomingEvent(event, today)),
    past: sorted.filter((event) => !isUpcomingEvent(event, today)).reverse(),
  };
}

export function compareEventsByDate(a: DatedEvent, b: DatedEvent) {
  return (a.date || "").localeCompare(b.date || "");
}

export function formatEventDate(date: string, endDate?: string | null) {
  const start = eventDateFormatter.format(parseEventDate(date));
  if (!endDate || endDate === date) return start;
  return `${start} – ${eventDateFormatter.format(parseEventDate(endDate))}`;
}

export function getEventDateBadge(date: string) {
  const parsedDate = parseEventDate(date);
  return {
    month: eventMonthFormatter.format(parsedDate),
    day: eventDayFormatter.format(parsedDate),
  };
}

export function getEventCategoryLabel(category?: string | null) {
  const labels: Record<string, string> = {
    worship: "Worship",
    fellowship: "Fellowship",
    formation: "Formation",
    outreach: "Outreach",
    other: "Parish Life",
  };

  return labels[category || ""] || "Parish Life";
}
