import { describe, it, expect } from "vitest";
import churchInfo from "../content/church-info.json";

// These values are edited by parish staff in Keystatic, not by developers, and
// they render in the footer on every page. A typo here ships a site-wide broken
// link with no other signal, which is how the YouTube handle went out as "@@".
//
// Shape is checked; presence deliberately is not. Clearing a field is a
// legitimate edit — a parish closes its Instagram — and failing the build for
// it would stop the entire site deploying, with nothing an editor could act on.
// Consumers skip empty values rather than rendering an empty href.
const URL_FIELDS = [
  "facebookUrl",
  "youtubeUrl",
  "instagramUrl",
  "givingUrl",
  "appUrl",
  "dioceseUrl",
  "denominationUrl",
] as const;

const valueOf = (field: string) =>
  (churchInfo as Record<string, string | undefined>)[field] ?? "";

describe("Church Info URLs", () => {
  it.each(URL_FIELDS)(
    "%s is either unset or a well-formed https URL",
    (field) => {
      const value = valueOf(field);
      if (!value) return; // not configured, which is allowed

      expect(() => new URL(value), `${field} is not parseable`).not.toThrow();
      expect(new URL(value).protocol).toBe("https:");
    }
  );

  it.each(URL_FIELDS)("%s has no repeated @ in its handle", (field) => {
    expect(valueOf(field)).not.toContain("@@");
  });

  it("has no leading or trailing whitespace in URLs", () => {
    for (const field of URL_FIELDS) {
      const value = valueOf(field);
      expect(value, `${field} has surrounding whitespace`).toBe(value.trim());
    }
  });
});
