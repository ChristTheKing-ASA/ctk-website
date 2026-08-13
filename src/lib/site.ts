/**
 * Canonical public address of the site.
 *
 * Production is ctkasa.com, served from the domain root. The staging copy on
 * GitHub Pages sets NEXT_PUBLIC_SITE_URL so its sitemap points at itself rather
 * than at production, but staging is noindex anyway so nothing crawls it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ctkasa.com"
).replace(/\/$/, "");

/** True when this build should be kept out of search results. */
export const IS_NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";

/**
 * Every crawlable page, most important first.
 *
 * Listed by hand rather than derived from the filesystem: the export runs
 * `output: export`, so there is no route manifest to read at build time, and a
 * wrong sitemap is worse than none. Detail pages for clergy and mission
 * partners are generated from their collections.
 */
export const STATIC_ROUTES = [
  "/",
  "/visit",
  "/worship",
  "/worship/sermons",
  "/worship/weekly",
  "/events",
  "/connect",
  "/connect/contact",
  "/connect/membership",
  "/connect/classes",
  "/connect/small-groups",
  "/connect/daughters-of-the-holy-cross",
  "/serve",
  "/serve/safeguarding",
  "/deafchurch",
  "/about",
  "/about/team",
  "/about/story",
  "/about/beliefs",
  "/about/anglican-faith",
  "/missions",
  "/give",
] as const;

/** Pages that exist but should never appear in search results. */
export const EXCLUDED_ROUTES = ["/keystatic"] as const;
