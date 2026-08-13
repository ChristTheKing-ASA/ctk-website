import type { MetadataRoute } from "next";
import { SITE_URL, IS_NOINDEX, EXCLUDED_ROUTES } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // The staging copy on GitHub Pages is word-for-word identical to production.
  // Its pages already carry a noindex tag; this stops crawlers spending time
  // on it at all, and keeps it from advertising a sitemap.
  if (IS_NOINDEX) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The content editor. No value in search results, and it should not
        // invite attention.
        disallow: EXCLUDED_ROUTES.map((path) => `${path}/`),
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
