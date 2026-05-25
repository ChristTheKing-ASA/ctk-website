/**
 * Apply D1 migrations locally and optionally create remote DB.
 * Run: npm run db:setup
 */
import { spawnSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const wranglerFiles = [
  resolve(root, "wrangler.jsonc"),
  resolve(root, "wrangler.toml"),
];
const migrationPath = "./drizzle/migrations/0000_initial.sql";

function run(cmd, args, { allowFail = false } = {}) {
  console.log(`\n> ${cmd} ${args.join(" ")}\n`);
  const result = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: false });
  if (result.status !== 0 && !allowFail) process.exit(result.status ?? 1);
  return result.status === 0;
}

function getDatabaseId() {
  for (const path of wranglerFiles) {
    if (!existsSync(path)) continue;
    const content = readFileSync(path, "utf8");
    const match = content.match(/database_id["\s]*[:=]+\s*"?([a-f0-9-]+)"?/i);
    if (match?.[1]) return match[1];
  }
  return "";
}

function setDatabaseId(id) {
  for (const path of wranglerFiles) {
    if (!existsSync(path)) continue;
    let content = readFileSync(path, "utf8");
    if (path.endsWith(".jsonc")) {
      content = content.replace(/"database_id"\s*:\s*"[^"]*"/, `"database_id": "${id}"`);
    } else {
      content = content.replace(/database_id\s*=\s*"[^"]*"/, `database_id = "${id}"`);
    }
    writeFileSync(path, content);
    console.log(`   Updated ${path.split("/").pop()}`);
  }
}

console.log("CTK — D1 database setup\n");

console.log("Step 1: Apply migrations to local D1 (auto-created on first run)...");
const migrated = run("npx", [
  "wrangler",
  "d1",
  "execute",
  "ctk-website-db",
  "--local",
  `--file=${migrationPath}`,
]);

if (!migrated) {
  console.error("\n❌ Local migration failed. Ensure wrangler.jsonc lists the D1 binding.");
  process.exit(1);
}

if (!getDatabaseId()) {
  console.log("\nStep 2: Create remote D1 for production (requires wrangler login)...");
  const create = spawnSync(
    "npx",
    ["wrangler", "d1", "create", "ctk-website-db", "--update-config"],
    { cwd: root, encoding: "utf8" },
  );

  const output = `${create.stdout ?? ""}${create.stderr ?? ""}`;
  const idMatch = output.match(/database_id[=:\s"]+([a-f0-9-]+)/i);
  if (idMatch) {
    setDatabaseId(idMatch[1]);
    console.log(`\n✅ Remote database_id: ${idMatch[1]}`);
  } else {
    console.warn("\n⚠️  Skipping remote D1 — run manually:");
    console.warn("   npx wrangler login");
    console.warn("   npx wrangler d1 create ctk-website-db --update-config\n");
  }
} else {
  console.log(`\nRemote database_id already set: ${getDatabaseId()}`);
}

console.log("\n✅ Local D1 is ready. Restart: npm run dev");
console.log("   Production: npm run db:migrate:remote\n");
