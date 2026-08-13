#!/usr/bin/env node
/**
 * Copy everything the parish can edit to a dated archive outside the repo.
 *
 * Git already holds the full history, because Keystatic Cloud commits every
 * save, and a tag is the quickest way back. This exists for the cases git does
 * not cover: the repo being lost, force-pushed, or the CMS writing something
 * bad that then gets committed over several times before anyone notices.
 *
 * Deliberately plain: a timestamped directory of files, no archive format and
 * no tooling needed to read it. Someone recovering this in a year should be
 * able to open it in Finder and see the JSON and the photos.
 *
 * Usage: npm run snapshot
 */
import { cpSync, existsSync, mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, resolve } from "node:path";
import { homedir } from "node:os";

const SOURCES = ["src/content", "public/images"];
const DEST_ROOT =
  process.env.CTK_SNAPSHOT_DIR ||
  join(homedir(), "Documents", "PROJECTS", "~backups", "ctk-website");

function git(cmd) {
  try {
    return execSync(`git ${cmd}`, { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
const dest = join(DEST_ROOT, stamp);

for (const source of SOURCES) {
  if (!existsSync(source)) {
    console.error(`missing ${source}; refusing to write a partial snapshot`);
    process.exit(1);
  }
}

mkdirSync(dest, { recursive: true });
for (const source of SOURCES) {
  cpSync(source, join(dest, source), { recursive: true });
}

// Record where this came from, so a restore does not have to guess.
const commit = git("rev-parse HEAD");
const dirty = git("status --porcelain");
writeFileSync(
  join(dest, "SNAPSHOT.md"),
  `# CTK content snapshot

Taken: ${new Date().toISOString()}
Commit: ${commit}
Branch: ${git("rev-parse --abbrev-ref HEAD")}
Describe: ${git("describe --tags --always")}
Working tree: ${dirty ? "HAD UNCOMMITTED CHANGES\\n\\n" + dirty : "clean"}

## Contents

- \`src/content/\` every field the parish edits in Keystatic
- \`public/images/\` every photo they upload

## Restoring

Prefer git. It is exact and keeps the history:

    git checkout ${commit} -- src/content public/images

Use these files only if the repo is gone or its history is untrustworthy.
Copy them back over the same paths, then commit.
`
);

const count = (dir) => {
  let n = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (entry.isFile()) n++;
  }
  return n;
};

console.log(`snapshot written to ${dest}`);
console.log(`  ${count(join(dest, "src/content"))} content files`);
console.log(`  ${count(join(dest, "public/images"))} images`);
console.log(`  commit ${commit.slice(0, 8)}${dirty ? " (working tree was dirty)" : ""}`);
console.log(`\nrestore from git instead when you can:`);
console.log(`  git checkout ${commit.slice(0, 8)} -- src/content public/images`);
