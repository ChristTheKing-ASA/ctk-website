import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

// Helper functions for reading content
export async function getChurchInfo() {
  return await reader.singletons.churchInfo.read();
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
