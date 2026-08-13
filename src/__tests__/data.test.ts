import { describe, it, expect } from "vitest";
import { navigation, missionPartners } from "@/data/church";

// Only covers what `src/data/church.ts` still exports. The suites that used to
// assert on churchInfo, clergy, weeklyActivities, volunteerRoles, deafChurch,
// and the categorised mission partners were removed alongside that data: it had
// no consumer, so those tests passed while rendering nothing. Live equivalents
// come from Keystatic and are covered by church-info.test.ts and by the pages
// that read them.

describe("Navigation Data", () => {
  it("should have main navigation items", () => {
    expect(navigation.length).toBeGreaterThan(0);
    expect(navigation.map((n) => n.name)).toContain("Visit");
    expect(navigation.map((n) => n.name)).toContain("Worship");
    expect(navigation.map((n) => n.name)).toContain("Events");
    expect(navigation.map((n) => n.name)).toContain("About");
  });

  it("should have valid hrefs", () => {
    navigation.forEach((item) => {
      expect(item.href).toMatch(/^\//);
    });
  });
});

describe("Mission Partners Data", () => {
  it("should have additional partners", () => {
    expect(missionPartners.additional.length).toBeGreaterThan(0);
  });

  it("should have a name and type for each additional partner", () => {
    missionPartners.additional.forEach((partner) => {
      expect(partner.name).toBeTruthy();
      expect(partner.type).toBeTruthy();
    });
  });
});
