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
    headline: string;
    vision: string;
    pillars: Array<{ title: string; description: string }>;
  };
}

export interface BeliefsContent {
  intro: string;
  pageDescription: string;
  foundations: Array<{ title: string; description: string }>;
}

export interface HomepageContent {
  anglicanTitle: string;
  anglicanDescription: string;
  rectorWelcomeBody: string;
}

const defaultMissionPillars = [
  { title: "Love God", description: "With all your heart, soul, mind, and strength" },
  { title: "Become Disciples", description: "Growing in spiritual maturity modeled on Christ" },
  { title: "Serve Others", description: "Expressing divine love through humble service" },
];

// Helper functions for reading content
export async function getChurchInfo(): Promise<ChurchInfoTransformed> {
  const data = await reader.singletons.churchInfo.read();
  return transformChurchInfoJson(data);
}

export async function getDeafChurchInfo() {
  return await reader.singletons.deafChurch.read();
}

export async function getBeliefs(): Promise<BeliefsContent> {
  const data = await reader.singletons.beliefs.read();
  return {
    intro: data?.intro || "",
    pageDescription: data?.pageDescription || "",
    foundations: data?.foundations?.filter(Boolean) ?? [],
  };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const data = await reader.singletons.homepage.read();
  return {
    anglicanTitle: data?.anglicanTitle || "What is Anglicanism?",
    anglicanDescription: data?.anglicanDescription || "",
    rectorWelcomeBody: data?.rectorWelcomeBody || "",
  };
}

export async function getAdditionalMissionPartners() {
  const slugs = await reader.collections.additionalMissionPartners.list();
  const partners = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.additionalMissionPartners.read(slug);
      return { slug, ...data };
    }),
  );
  return partners
    .filter((p) => p?.name)
    .map((p) => ({ name: p.name || "", type: p.type || "" }));
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

export async function getConnectSmallGroups() {
  return await reader.singletons.connectSmallGroups.read();
}

export async function getConnectClasses() {
  return await reader.singletons.connectClasses.read();
}

export async function getConnectMembership() {
  return await reader.singletons.connectMembership.read();
}

export async function getConnectDaughters() {
  return await reader.singletons.connectDaughters.read();
}

export async function getServePage() {
  return await reader.singletons.servePage.read();
}

export async function getSafeguarding() {
  return await reader.singletons.safeguarding.read();
}

export interface VolunteerArea {
  slug: string;
  name: string;
  description: string;
  requiresTraining: boolean;
  sortOrder: number;
  roles: string[];
}

export async function getVolunteerAreas(): Promise<VolunteerArea[]> {
  const slugs = await reader.collections.volunteerAreas.list();
  const areas = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.volunteerAreas.read(slug);
      return {
        slug,
        name: data?.name || "",
        description: data?.description || "",
        requiresTraining: Boolean(data?.requiresTraining),
        sortOrder: data?.sortOrder ?? 0,
        roles: data?.roles?.filter(Boolean) ?? [],
      };
    }),
  );
  return areas.sort((a, b) => a.sortOrder - b.sortOrder);
}
