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
