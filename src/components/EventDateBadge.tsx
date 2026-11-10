import { getEventDateBadge } from "@/lib/events";

/** The navy month-and-day tile used wherever an event is listed. */
export function EventDateBadge({ date }: { date: string }) {
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
