import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DEFAULT_DEAFCHURCH_PEOPLE } from "@/lib/deafchurch";

/**
 * Keystatic Cloud rejects a save when a JSON file contains a key the Cloud
 * project schema does not allow. That is the error Fr. Craig hit:
 * `Field validation failed: Key on object value "badge" is not allowed`.
 *
 * Extra keys in repo content are a customer-facing outage, not a style issue.
 */
const CONFIG_PATH = join(process.cwd(), "keystatic.config.ts");
const CONTENT_ROOT = join(process.cwd(), "src/content");
const PUBLIC_ROOT = join(process.cwd(), "public");

function extractSchemaKeys(block: string): string[] {
  const schemaStart = block.indexOf("schema:");
  if (schemaStart < 0) return [];
  const open = block.indexOf("{", schemaStart);
  let depth = 0;
  let end = -1;
  for (let i = open; i < block.length; i++) {
    if (block[i] === "{") depth++;
    else if (block[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const schema = block.slice(open, end + 1);
  const keys: string[] = [];
  depth = 0;
  for (let i = 0; i < schema.length; i++) {
    const ch = schema[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    else if (depth === 1) {
      const match = schema.slice(i).match(/^(\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/);
      if (match) {
        keys.push(match[2]);
        i += match[0].length - 1;
      }
    }
  }
  return keys;
}

function extractEntries(kind: "singleton" | "collection") {
  const source = readFileSync(CONFIG_PATH, "utf8");
  const entries: { name: string; path: string; keys: string[]; block: string }[] =
    [];
  const re = new RegExp(`(\\w+):\\s*${kind}\\(\\{`, "g");
  let match: RegExpExecArray | null;
  while ((match = re.exec(source))) {
    const name = match[1];
    const start = match.index + match[0].length - 1;
    let depth = 0;
    let end = -1;
    for (let i = start; i < source.length; i++) {
      if (source[i] === "{") depth++;
      else if (source[i] === "}") {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    const block = source.slice(start, end + 1);
    const pathMatch = block.match(/path:\s*"([^"]+)"/);
    if (!pathMatch) continue;
    entries.push({
      name,
      path: pathMatch[1],
      keys: extractSchemaKeys(block),
      block,
    });
  }
  return entries;
}

function jsonFilesFor(entry: { path: string }) {
  if (entry.path.endsWith("/*")) {
    const dir = join(process.cwd(), entry.path.replace(/\/\*$/, ""));
    return readdirSync(dir)
      .filter((file) => file.endsWith(".json"))
      .map((file) => join(dir, file));
  }
  return [join(process.cwd(), `${entry.path}.json`)];
}

describe("Keystatic content matches the Cloud-safe schema", () => {
  const singletons = extractEntries("singleton");
  const collections = extractEntries("collection");

  it("finds every singleton and collection declared in the config", () => {
    expect(singletons.map((entry) => entry.name)).toContain("deafChurch");
    expect(collections.map((entry) => entry.name)).toEqual(
      expect.arrayContaining(["clergy", "events", "missionPartners"])
    );
  });

  it("keeps DeafChurch on the original Cloud field set", () => {
    const deafChurch = singletons.find((entry) => entry.name === "deafChurch");
    expect(deafChurch?.keys).toEqual([
      "name",
      "tagline",
      "description",
      "featuredVideoId",
      "founderName",
      "founderEmail",
      "familyInfo",
      "publicationTitle",
    ]);
    expect(deafChurch?.block).not.toMatch(/\bbadge\s*:/);
    expect(deafChurch?.block).not.toMatch(/\bpeople\s*:/);
  });

  it.each([...singletons, ...collections].map((entry) => [entry.name, entry]))(
    "%s JSON has no keys Cloud would reject",
    (_name, entry) => {
      for (const file of jsonFilesFor(entry)) {
        const data = JSON.parse(readFileSync(file, "utf8")) as Record<
          string,
          unknown
        >;
        const extra = Object.keys(data).filter(
          (key) => !entry.keys.includes(key)
        );
        expect(extra, file.replace(process.cwd() + "/", "")).toEqual([]);
      }
    }
  );

  it("ships clergy files for everyone listed on the DeafChurch plant team", () => {
    for (const slug of DEFAULT_DEAFCHURCH_PEOPLE) {
      expect(
        existsSync(join(CONTENT_ROOT, "clergy", `${slug}.json`)),
        slug
      ).toBe(true);
    }
  });

  it("points clergy photos at files that exist when a photo is set", () => {
    const clergyDir = join(CONTENT_ROOT, "clergy");
    for (const file of readdirSync(clergyDir).filter((name) =>
      name.endsWith(".json")
    )) {
      const data = JSON.parse(
        readFileSync(join(clergyDir, file), "utf8")
      ) as { image?: string | null };
      if (!data.image) continue;
      const relative = data.image.replace(/^\//, "");
      expect(
        existsSync(join(PUBLIC_ROOT, relative)),
        `${file} -> ${data.image}`
      ).toBe(true);
    }
  });
});
