import { describe, expect, it } from "vitest";
import {
  compareEventsByDate,
  formatEventDate,
  getEventCategoryLabel,
  getEventDateBadge,
  isUpcomingEvent,
} from "@/lib/events";

describe("event helpers", () => {
  it("keeps future and ongoing events but hides past events", () => {
    expect(isUpcomingEvent({ date: "2026-08-10" }, "2026-08-01")).toBe(true);
    expect(
      isUpcomingEvent(
        { date: "2026-07-30", endDate: "2026-08-02" },
        "2026-08-01"
      )
    ).toBe(true);
    expect(isUpcomingEvent({ date: "2026-07-30" }, "2026-08-01")).toBe(false);
    expect(isUpcomingEvent({}, "2026-08-01")).toBe(false);
  });

  it("sorts events in chronological order", () => {
    const events = [
      { date: "2026-12-24" },
      { date: "2026-09-13" },
      { date: "2026-10-04" },
    ];

    expect(events.sort(compareEventsByDate).map((event) => event.date)).toEqual([
      "2026-09-13",
      "2026-10-04",
      "2026-12-24",
    ]);
  });

  it("formats event dates without timezone drift", () => {
    expect(formatEventDate("2026-12-24")).toBe(
      "Thursday, December 24, 2026"
    );
    expect(formatEventDate("2026-12-24", "2026-12-25")).toBe(
      "Thursday, December 24, 2026 – Friday, December 25, 2026"
    );
    expect(getEventDateBadge("2026-12-24")).toEqual({
      month: "Dec",
      day: "24",
    });
  });

  it("provides a graceful category fallback", () => {
    expect(getEventCategoryLabel("formation")).toBe("Formation");
    expect(getEventCategoryLabel()).toBe("Parish Life");
  });
});

describe("past and upcoming split", () => {
  it("uses the parish time zone, not UTC, to decide what day it is", async () => {
    const { getTodayDateKey } = await import("@/lib/events");
    // 9 PM Saturday in St. Augustine is already Sunday in UTC.
    expect(getTodayDateKey(new Date("2026-11-15T02:00:00Z"))).toBe("2026-11-14");
  });

  it("moves an event to past the day after it ends, newest past first", async () => {
    const { splitEventsByDate } = await import("@/lib/events");
    const events = [
      { date: "2026-11-22" },
      { date: "2026-10-04" },
      { date: "2026-11-14" },
      { date: "2026-10-28", endDate: "2026-11-15" },
    ];

    const onTheDay = splitEventsByDate(events, "2026-11-14");
    expect(onTheDay.upcoming.map((e) => e.date)).toEqual([
      "2026-10-28",
      "2026-11-14",
      "2026-11-22",
    ]);
    expect(onTheDay.past.map((e) => e.date)).toEqual(["2026-10-04"]);

    const dayAfter = splitEventsByDate(events, "2026-11-16");
    expect(dayAfter.upcoming.map((e) => e.date)).toEqual(["2026-11-22"]);
    expect(dayAfter.past.map((e) => e.date)).toEqual([
      "2026-11-14",
      "2026-10-28",
      "2026-10-04",
    ]);
  });
});
