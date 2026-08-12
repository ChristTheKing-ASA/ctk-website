import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import { compareEventsByDate, isUpcomingEvent } from "@/lib/events";

export const reader = createReader(process.cwd(), keystaticConfig);

// Helper type for transformed church info
export interface ChurchInfoTransformed {
  name: string;
  shortName: string;
  phone: string;
  email: string;
  adminEmail: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    mailing: string;
  };
  serviceTime: string;
  social: {
    facebook: string;
    youtube: string;
    instagram: string;
  };
  giving: {
    url: string;
    appUrl: string;
  };
  diocese: {
    name: string;
    url: string;
    bishop: string;
  };
  denomination: {
    name: string;
    shortName: string;
    url: string;
  };
  scripture: {
    main: {
      text: string;
      reference: string;
    };
    about: {
      text: string;
      reference: string;
    };
  };
  mission: {
    vision: string;
  };
}

// Helper functions for reading content
export async function getChurchInfo(): Promise<ChurchInfoTransformed> {
  const data = await reader.singletons.churchInfo.read();

  // Transform flat CMS structure to nested structure expected by components
  return {
    name: data?.name || "",
    shortName: data?.shortName || "",
    phone: data?.phone || "",
    email: data?.email || "",
    adminEmail: data?.adminEmail || "",
    address: {
      street: data?.street || "",
      city: data?.city || "",
      state: data?.state || "",
      zip: data?.zip || "",
      mailing: data?.mailingAddress || "",
    },
    serviceTime: data?.serviceTime || "",
    social: {
      facebook: data?.facebookUrl || "",
      youtube: data?.youtubeUrl || "",
      instagram: data?.instagramUrl || "",
    },
    giving: {
      url: data?.givingUrl || "",
      appUrl: data?.appUrl || "",
    },
    diocese: {
      name: data?.dioceseName || "",
      url: data?.dioceseUrl || "",
      bishop: data?.dioceseBishop || "",
    },
    denomination: {
      name: data?.denominationName || "",
      shortName: data?.denominationShortName || "",
      url: data?.denominationUrl || "",
    },
    scripture: {
      main: {
        text: data?.scriptureText || "",
        reference: data?.scriptureReference || "",
      },
      about: {
        text: "Jesus replied: 'Love the Lord your God with all your heart and with all your soul and with all your mind.' This is the first and greatest commandment.",
        reference: "Matthew 22:37-38",
      },
    },
    mission: {
      vision: data?.visionStatement || "",
    },
  };
}

export async function getHomePage() {
  return await reader.singletons.homePage.read();
}

export async function getDeafChurchInfo() {
  return await reader.singletons.deafChurch.read();
}

/**
 * Counts of mission partners by category, for the homepage summary.
 *
 * Derived rather than stored: these were previously hardcoded in
 * FeaturedMinistries as "11 Mission Partners" over tiles reading 4/2/4, which
 * sum to 10. Adding a partner in Keystatic silently made both wrong.
 */
export async function getMissionPartnerCounts() {
  const partners = await getAllMissionPartners();
  const byCategory = (category: string) =>
    partners.filter((p) => p.category === category).length;

  return {
    total: partners.length,
    local: byCategory("Local"),
    national: byCategory("National"),
    global: byCategory("Global"),
  };
}

export async function getAllClergy() {
  const slugs = await reader.collections.clergy.list();
  const clergy = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.clergy.read(slug);
      return { slug, ...data };
    })
  );
  return clergy.filter(Boolean);
}

export async function getTeamPage() {
  return await reader.singletons.teamPage.read();
}

export async function getMembershipPage() {
  return await reader.singletons.membershipPage.read();
}

export async function getClergyBySlug(slug: string) {
  return await reader.collections.clergy.read(slug);
}

export async function getAllMissionPartners() {
  const slugs = await reader.collections.missionPartners.list();
  const partners = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.missionPartners.read(slug);
      return { slug, ...data };
    })
  );
  return partners.filter(Boolean);
}

export async function getMissionPartnerBySlug(slug: string) {
  return await reader.collections.missionPartners.read(slug);
}

export async function getAllActivities() {
  const slugs = await reader.collections.weeklyActivities.list();
  const activities = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.weeklyActivities.read(slug);
      return { slug, ...data };
    })
  );
  return activities.filter(Boolean);
}

export async function getAllEvents() {
  const slugs = await reader.collections.events.list();
  const events = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.events.read(slug);
      return data ? { slug, ...data } : null;
    })
  );

  return events
    .filter(
      (event): event is NonNullable<typeof event> & { date: string } =>
        event !== null &&
        typeof event.date === "string" &&
        isUpcomingEvent(event)
    )
    .sort(compareEventsByDate);
}

export async function getAllAnnouncements() {
  const slugs = await reader.collections.announcements.list();
  const announcements = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.announcements.read(slug);
      return { slug, ...data };
    })
  );
  // Filter out expired announcements and sort by date
  const now = new Date().toISOString().split("T")[0];
  return announcements
    .filter((a) => a && (!a.expiresAt || a.expiresAt >= now))
    .sort((a, b) => {
      if (!a?.date || !b?.date) return 0;
      return b.date.localeCompare(a.date);
    });
}
