import { describe, it, expect } from "vitest";
import {
  churchInfo,
  navigation,
  clergy,
  beliefs,
  weeklyActivities,
  volunteerRoles,
  missionPartners,
  deafChurch,
} from "@/data/church";

describe("Church Info Data", () => {
  it("should have required church information", () => {
    expect(churchInfo.name).toBe("Christ The King Anglican Church");
    expect(churchInfo.shortName).toBe("CTK");
    expect(churchInfo.phone).toBeDefined();
    expect(churchInfo.email).toBeDefined();
  });

  it("should have valid address information", () => {
    expect(churchInfo.address).toBeDefined();
    expect(churchInfo.address.street).toBeDefined();
    expect(churchInfo.address.city).toBe("St. Augustine");
    expect(churchInfo.address.state).toBe("FL");
    expect(churchInfo.address.zip).toBeDefined();
  });

  it("should have service time defined", () => {
    expect(churchInfo.serviceTime).toContain("Sunday");
  });

  it("should have social media links", () => {
    expect(churchInfo.social.facebook).toContain("facebook.com");
    expect(churchInfo.social.youtube).toContain("youtube.com");
    expect(churchInfo.social.instagram).toContain("instagram.com");
  });

  it("should have giving information", () => {
    expect(churchInfo.giving.url).toBeDefined();
    expect(churchInfo.giving.appUrl).toBeDefined();
  });

  it("should have diocese and denomination info", () => {
    expect(churchInfo.diocese.name).toBe("Gulf Atlantic Diocese");
    expect(churchInfo.denomination.name).toBe("Anglican Church in North America");
    expect(churchInfo.denomination.shortName).toBe("ACNA");
  });

  it("should have mission pillars", () => {
    expect(churchInfo.mission.pillars).toHaveLength(3);
    expect(churchInfo.mission.pillars[0].title).toBe("Love God");
    expect(churchInfo.mission.pillars[1].title).toBe("Become Disciples");
    expect(churchInfo.mission.pillars[2].title).toBe("Serve Others");
  });

  it("should have scripture references", () => {
    expect(churchInfo.scripture.main.text).toBeDefined();
    expect(churchInfo.scripture.main.reference).toBeDefined();
    expect(churchInfo.scripture.about.text).toBeDefined();
    expect(churchInfo.scripture.about.reference).toContain("Matthew");
  });
});

describe("Navigation Data", () => {
  it("should have main navigation items", () => {
    expect(navigation.length).toBeGreaterThan(0);
    expect(navigation.map((n) => n.name)).toContain("Visit");
    expect(navigation.map((n) => n.name)).toContain("Worship");
    expect(navigation.map((n) => n.name)).toContain("About");
  });

  it("should have valid hrefs", () => {
    navigation.forEach((item) => {
      expect(item.href).toMatch(/^\//);
    });
  });
});

describe("Clergy Data", () => {
  it("should have clergy members", () => {
    expect(clergy.length).toBeGreaterThan(0);
  });

  it("should have a rector", () => {
    const rector = clergy.find((c) => c.title === "Rector");
    expect(rector).toBeDefined();
    expect(rector?.name).toContain("Craig Sanders");
  });

  it("should have required fields for each clergy member", () => {
    clergy.forEach((member) => {
      expect(member.slug).toBeDefined();
      expect(member.name).toBeDefined();
      expect(member.title).toBeDefined();
      expect(member.shortBio).toBeDefined();
    });
  });

  it("should have valid slugs", () => {
    clergy.forEach((member) => {
      expect(member.slug).toMatch(/^[a-z-]+$/);
    });
  });
});

describe("Beliefs Data", () => {
  it("should have intro text", () => {
    expect(beliefs.intro).toBeDefined();
    expect(beliefs.intro).toContain("Anglican");
  });

  it("should have foundations", () => {
    expect(beliefs.foundations.length).toBeGreaterThan(0);
  });

  it("should include Scripture as a foundation", () => {
    const scripture = beliefs.foundations.find((f) => f.title === "Scripture");
    expect(scripture).toBeDefined();
    expect(scripture?.description).toContain("Word of God");
  });

  it("should include key Anglican beliefs", () => {
    const titles = beliefs.foundations.map((f) => f.title);
    expect(titles).toContain("Scripture");
    expect(titles).toContain("Sacraments");
    expect(titles).toContain("Book of Common Prayer");
  });
});

describe("Weekly Activities Data", () => {
  it("should have activities defined", () => {
    expect(weeklyActivities.length).toBeGreaterThan(0);
  });

  it("should have Sunday worship", () => {
    const sunday = weeklyActivities.find((a) => a.day === "Sundays");
    expect(sunday).toBeDefined();
    expect(sunday?.time).toBeDefined();
  });

  it("should have required fields for each activity", () => {
    weeklyActivities.forEach((activity) => {
      expect(activity.title).toBeDefined();
      expect(activity.day).toBeDefined();
      expect(activity.time).toBeDefined();
      expect(activity.description).toBeDefined();
    });
  });
});

describe("Volunteer Roles Data", () => {
  it("should have categories", () => {
    expect(volunteerRoles.categories.length).toBeGreaterThan(0);
  });

  it("should have roles in each category", () => {
    volunteerRoles.categories.forEach((category) => {
      expect(category.name).toBeDefined();
      expect(category.roles.length).toBeGreaterThan(0);
    });
  });

  it("should flag roles requiring training", () => {
    const childrenCategory = volunteerRoles.categories.find(
      (c) => c.name === "Children & Youth"
    );
    expect(childrenCategory).toBeDefined();
    const rolesRequiringTraining = childrenCategory?.roles.filter(
      (role) => "requiresTraining" in role && role.requiresTraining
    );
    expect(rolesRequiringTraining?.length).toBeGreaterThan(0);
  });
});

describe("Mission Partners Data", () => {
  it("should have local partners", () => {
    expect(missionPartners.local.length).toBeGreaterThan(0);
  });

  it("should have national partners", () => {
    expect(missionPartners.national.length).toBeGreaterThan(0);
  });

  it("should have global partners", () => {
    expect(missionPartners.global.length).toBeGreaterThan(0);
  });

  it("should have additional partners", () => {
    expect(missionPartners.additional.length).toBeGreaterThan(0);
  });

  it("should have required fields for each partner", () => {
    [...missionPartners.local, ...missionPartners.national, ...missionPartners.global].forEach(
      (partner) => {
        expect(partner.slug).toBeDefined();
        expect(partner.name).toBeDefined();
        expect(partner.category).toBeDefined();
        expect(partner.shortDescription).toBeDefined();
      }
    );
  });

  it("should have valid slugs for partners", () => {
    [...missionPartners.local, ...missionPartners.national, ...missionPartners.global].forEach(
      (partner) => {
        expect(partner.slug).toMatch(/^[a-z-]+$/);
      }
    );
  });
});

describe("DeafChurch Data", () => {
  it("should have ministry information", () => {
    expect(deafChurch.name).toBeDefined();
    expect(deafChurch.tagline).toBeDefined();
    expect(deafChurch.description).toBeDefined();
  });

  it("should have founder information", () => {
    expect(deafChurch.founders.primary).toContain("Bob Ayres");
    expect(deafChurch.founders.email).toBeDefined();
  });

  it("should have model description", () => {
    expect(deafChurch.model.title).toBeDefined();
    expect(deafChurch.model.description).toBeDefined();
  });
});
