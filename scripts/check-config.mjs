/**
 * Check which third-party services are configured.
 * Run: npm run check:config
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");
const wranglerPath = resolve(root, "wrangler.toml");

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    vars[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
  return vars;
}

function isSet(value, placeholders = []) {
  if (!value || !value.trim()) return false;
  return !placeholders.some((p) => value.includes(p));
}

function readWranglerDatabaseId() {
  for (const path of [
    resolve(root, "wrangler.jsonc"),
    resolve(root, "wrangler.toml"),
  ]) {
    if (!existsSync(path)) continue;
    const content = readFileSync(path, "utf8");
    const match = content.match(/database_id["\s]*[:=]+\s*"?([a-f0-9-]+)"?/i);
    if (match?.[1]) return match[1];
  }
  return "";
}

const env = { ...loadEnvFile(resolve(root, ".env.example")), ...loadEnvFile(envPath) };
const dbId = readWranglerDatabaseId();

const checks = [
  {
    id: "admin",
    name: "Admin login",
    ok: isSet(env.ADMIN_PASSWORD) && isSet(env.ADMIN_SESSION_SECRET),
    hint: "Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in .env.local",
    doc: "#1-admin-password",
  },
  {
    id: "resend",
    name: "Resend (email)",
    ok: isSet(env.RESEND_API_KEY, ["re_xxxxxxxxx", "your_key"]),
    hint: "Add RESEND_API_KEY from https://resend.com/api-keys — then run npm run test:resend",
    doc: "#2-resend-email",
  },
  {
    id: "resend-domain",
    name: "Resend domain (ctkasa.com)",
    ok: env.EMAIL_FROM?.includes("@ctkasa.com") ?? false,
    hint: "Verify ctkasa.com at https://resend.com/domains — required for EMAIL_FROM=website@ctkasa.com",
    doc: "#2-resend-email",
    optional: true,
  },
  {
    id: "d1-local",
    name: "D1 database (local)",
    ok: Boolean(dbId) || existsSync(resolve(root, ".wrangler/state/v3/d1")),
    hint: "Run: npm run db:setup — creates D1 and runs migrations",
    doc: "#3-cloudflare-d1",
  },
  {
    id: "d1-remote",
    name: "D1 database (production ID in wrangler)",
    ok: Boolean(dbId),
    hint: "npx wrangler login && npx wrangler d1 create ctk-website-db --update-config",
    doc: "#3-cloudflare-d1",
    optional: true,
  },
  {
    id: "youtube",
    name: "YouTube API (sermons)",
    ok: isSet(env.YOUTUBE_API_KEY),
    hint: "Create key at Google Cloud Console — run npm run test:youtube",
    doc: "#4-youtube",
  },
  {
    id: "keystatic",
    name: "Keystatic GitHub (production CMS)",
    ok:
      isSet(env.KEYSTATIC_GITHUB_CLIENT_ID) &&
      isSet(env.KEYSTATIC_GITHUB_CLIENT_SECRET) &&
      isSet(env.KEYSTATIC_SECRET),
    hint: "GitHub OAuth app — optional locally (uses local JSON files)",
    doc: "#5-keystatic-github",
    optional: true,
  },
  {
    id: "maps",
    name: "Google Maps embed",
    ok: isSet(env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
    hint: "Maps Embed API key — see THIRD_PARTY_SETUP.md",
    doc: "#6-google-maps",
    optional: true,
  },
  {
    id: "cloudflare-deploy",
    name: "Cloudflare deploy credentials",
    ok: isSet(env.CLOUDFLARE_ACCOUNT_ID) && isSet(env.CLOUDFLARE_API_TOKEN),
    hint: "CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_API_TOKEN for wrangler deploy",
    doc: "#3-cloudflare-d1",
    optional: true,
  },
  {
    id: "site-url",
    name: "Site URL",
    ok: isSet(env.NEXT_PUBLIC_SITE_URL),
    hint: "Set NEXT_PUBLIC_SITE_URL=https://ctkasa.com for production",
    doc: "#7-production-env",
  },
];

console.log("\nCTK Website — third-party configuration\n");
console.log(existsSync(envPath) ? "Using: .env.local\n" : "⚠️  No .env.local — copy from .env.example\n");

let requiredMissing = 0;
let optionalMissing = 0;

for (const check of checks) {
  const icon = check.ok ? "✅" : check.optional ? "○" : "❌";
  console.log(`${icon} ${check.name}`);
  if (!check.ok) {
    console.log(`   → ${check.hint}`);
    if (check.optional) optionalMissing += 1;
    else requiredMissing += 1;
  }
}

console.log("\n---");
if (requiredMissing === 0) {
  console.log("Required services look configured. Run npm run test:resend to verify email.");
} else {
  console.log(`${requiredMissing} required item(s) still need setup.`);
}
if (optionalMissing > 0) {
  console.log(`${optionalMissing} optional item(s) for full production parity.`);
}
console.log("\nFull guide: THIRD_PARTY_SETUP.md\n");

process.exit(requiredMissing > 0 ? 1 : 0);
