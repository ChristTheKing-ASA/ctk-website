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

export function getTodayDateKey(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

export function isUpcomingEvent(
  event: DatedEvent,
  today = getTodayDateKey()
) {
  if (!event.date) return false;
  return (event.endDate || event.date) >= today;
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
