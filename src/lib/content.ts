import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import { transformChurchInfoJson } from "@/lib/churchInfoFromJson";

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
  return transformChurchInfoJson(data);
}

export async function getDeafChurchInfo() {
  return await reader.singletons.deafChurch.read();
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
