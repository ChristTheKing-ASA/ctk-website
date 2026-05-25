import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function wranglerHasDatabaseId(): boolean {
  for (const file of ["wrangler.jsonc", "wrangler.toml"]) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    const content = readFileSync(path, "utf8");
    const match = content.match(/database_id["\s]*[:=]+\s*"?([a-f0-9-]+)"?/i);
    if (match?.[1]) return true;
  }
  return false;
}

export interface ConfigCheck {
  id: string;
  label: string;
  configured: boolean;
  detail: string;
  setupAnchor: string;
  optional?: boolean;
}

export function getConfigStatus(): ConfigCheck[] {
  const env = process.env;
  const has = (key: string) => Boolean(env[key]?.trim());
  const resendKey = env.RESEND_API_KEY?.trim() ?? "";
  const resendOk =
    resendKey.length > 10 &&
    !resendKey.includes("xxxx") &&
    !resendKey.includes("your_key");

  const keystaticGithub =
    has("KEYSTATIC_GITHUB_CLIENT_ID") &&
    has("KEYSTATIC_GITHUB_CLIENT_SECRET") &&
    has("KEYSTATIC_SECRET");

  const wranglerHasDb = wranglerHasDatabaseId();

  return [
    {
      id: "admin",
      label: "Admin password & session",
      configured: has("ADMIN_PASSWORD") && has("ADMIN_SESSION_SECRET"),
      detail: has("ADMIN_PASSWORD")
        ? "Password set — login at /admin"
        : "Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET",
      setupAnchor: "admin",
    },
    {
      id: "resend",
      label: "Resend API key",
      configured: resendOk,
      detail: resendOk ? "API key present — run npm run test:resend" : "Add RESEND_API_KEY to .env.local",
      setupAnchor: "resend",
    },
    {
      id: "resend-domain",
      label: "Resend domain (ctkasa.com)",
      configured: (env.EMAIL_FROM ?? "").includes("@ctkasa.com"),
      detail:
        "Verify ctkasa.com at resend.com/domains so EMAIL_FROM=website@ctkasa.com works",
      setupAnchor: "resend",
      optional: true,
    },
    {
      id: "d1",
      label: "Cloudflare D1 database",
      configured: wranglerHasDb,
      detail: wranglerHasDb
        ? "database_id set in wrangler.toml"
        : "Run npm run db:setup — needed for newsletter & admin lists in production",
      setupAnchor: "d1",
    },
    {
      id: "youtube",
      label: "YouTube Data API",
      configured: has("YOUTUBE_API_KEY"),
      detail: has("YOUTUBE_API_KEY")
        ? "Key set — run npm run test:youtube"
        : "Enables latest sermon embed on /worship/sermons",
      setupAnchor: "youtube",
      optional: true,
    },
    {
      id: "keystatic",
      label: "Keystatic GitHub mode",
      configured: keystaticGithub,
      detail: keystaticGithub
        ? "Production CMS edits commit to GitHub"
        : "Local JSON mode (fine for dev)",
      setupAnchor: "keystatic",
      optional: true,
    },
    {
      id: "maps",
      label: "Google Maps embed",
      configured: has("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"),
      detail: has("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY")
        ? "Map embed enabled on Visit & Contact"
        : "Falls back to “Open in Google Maps” link",
      setupAnchor: "maps",
      optional: true,
    },
    {
      id: "deploy",
      label: "Cloudflare deploy token",
      configured: has("CLOUDFLARE_ACCOUNT_ID") && has("CLOUDFLARE_API_TOKEN"),
      detail: "Required for npm run deploy",
      setupAnchor: "deploy",
      optional: true,
    },
    {
      id: "site",
      label: "Public site URL",
      configured: has("NEXT_PUBLIC_SITE_URL"),
      detail: env.NEXT_PUBLIC_SITE_URL ?? "Set NEXT_PUBLIC_SITE_URL for SEO/sitemap",
      setupAnchor: "production",
    },
  ];
}
