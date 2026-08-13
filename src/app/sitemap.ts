import type { MetadataRoute } from "next";
import { getAllClergy, getAllMissionPartners } from "@/lib/content";
import { SITE_URL, STATIC_ROUTES } from "@/lib/site";

// Static export needs a concrete file rather than a request-time route.
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [clergy, partners] = await Promise.all([
    getAllClergy(),
    getAllMissionPartners(),
  ]);

  const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}/`;

  // The homepage and Visit are what a first-time visitor lands on, so they
  // carry the highest priority; detail pages sit below their listings.
  const priorityFor = (path: string) => {
    if (path === "/") return 1;
    if (path === "/visit" || path === "/worship") return 0.9;
    return 0.7;
  };

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: url(path),
      changeFrequency: "weekly" as const,
      priority: priorityFor(path),
    })),
    ...clergy.map((person) => ({
      url: url(`/about/team/${person.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...partners.map((partner) => ({
      url: url(`/missions/${partner.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
