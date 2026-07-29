import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const requiredPages = [
  "out/index.html",
  "out/404.html",
  "out/admin/index.html",
  "out/keystatic/index.html",
  "out/keystatic/cloud/oauth/callback/index.html",
];

for (const page of requiredPages) {
  if (!existsSync(page)) {
    throw new Error(`Missing Cloudflare export: ${page}`);
  }
}

const chunksDirectory = "out/_next/static/chunks";
const javascript = readdirSync(chunksDirectory)
  .filter((file) => file.endsWith(".js"))
  .map((file) => readFileSync(join(chunksDirectory, file), "utf8"))
  .join("\n");

for (const expected of ["/keystatic", "/cloud/oauth/callback"]) {
  if (!javascript.includes(expected)) {
    throw new Error(`Exported JavaScript is missing ${expected}`);
  }
}

if (javascript.includes("/ctk-website/keystatic")) {
  throw new Error("Cloudflare export still contains the GitHub Pages base path");
}

const adminPage = readFileSync("out/admin/index.html", "utf8");
if (!adminPage.includes("NEXT_REDIRECT;replace;/keystatic")) {
  throw new Error("The exported /admin page no longer redirects to Keystatic");
}

const recoveryPages = [
  readFileSync("out/404.html", "utf8"),
  readFileSync("out/keystatic/index.html", "utf8"),
].join("\n");
if (!recoveryPages.includes("__ks_path")) {
  throw new Error("The export is missing Keystatic deep-link recovery");
}

console.log("Cloudflare root-domain export routing verified.");
