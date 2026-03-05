import { MetadataRoute } from "next";
import { getAllClergy, getAllMissionPartners } from "@/lib/content";

const BASE_URL = "https://ctkasa.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const clergy = await getAllClergy();
  const missions = await getAllMissionPartners();

  const staticPages = [
    "",
    "/about",
    "/about/beliefs",
    "/about/anglican-faith",
    "/about/story",
    "/about/team",
    "/visit",
    "/worship",
    "/worship/sermons",
    "/worship/weekly",
    "/give",
    "/deafchurch",
    "/connect",
    "/connect/contact",
    "/connect/classes",
    "/connect/small-groups",
    "/connect/membership",
    "/connect/daughters-of-the-holy-cross",
    "/serve",
    "/serve/safeguarding",
    "/missions",
    "/privacy",
    "/announcements",
    "/events",
  ];

  const clergyPages = clergy.map((person) => `/about/team/${person.slug}`);
  const missionPages = missions.map((partner) => `/missions/${partner.slug}`);

  const allPages = [...staticPages, ...clergyPages, ...missionPages];

  return allPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
