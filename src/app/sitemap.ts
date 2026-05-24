import type { MetadataRoute } from "next";
import { getAllMissionPartners, getAllClergy } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ctkasa.com";

const staticRoutes = [
  "",
  "/visit",
  "/worship",
  "/worship/sermons",
  "/worship/weekly",
  "/connect",
  "/connect/contact",
  "/connect/prayer",
  "/connect/classes",
  "/connect/membership",
  "/connect/small-groups",
  "/connect/daughters-of-the-holy-cross",
  "/serve",
  "/serve/safeguarding",
  "/missions",
  "/about",
  "/about/beliefs",
  "/about/story",
  "/about/team",
  "/about/anglican-faith",
  "/give",
  "/deafchurch",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [missions, clergy] = await Promise.all([
    getAllMissionPartners(),
    getAllClergy(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const missionEntries: MetadataRoute.Sitemap = missions
    .filter((m) => m?.slug)
    .map((m) => ({
      url: `${siteUrl}/missions/${m!.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const teamEntries: MetadataRoute.Sitemap = clergy
    .filter((c) => c?.slug)
    .map((c) => ({
      url: `${siteUrl}/about/team/${c!.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...staticEntries, ...missionEntries, ...teamEntries];
}
