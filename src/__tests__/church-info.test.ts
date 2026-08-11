import { describe, it, expect } from "vitest";
import churchInfo from "../content/church-info.json";

// These values are edited by parish staff in Keystatic, not by developers, and
// they render in the footer on every page. A typo here ships a site-wide broken
// link with no other signal, which is how the YouTube handle went out as "@@".
const URL_FIELDS = [
  "facebookUrl",
  "youtubeUrl",
  "instagramUrl",
  "givingUrl",
  "appUrl",
  "dioceseUrl",
  "denominationUrl",
] as const;

describe("Church Info URLs", () => {
  it.each(URL_FIELDS)("%s is a well-formed https URL", (field) => {
    const value = (churchInfo as Record<string, string>)[field];
    expect(value, `${field} is missing`).toBeTruthy();
    expect(() => new URL(value), `${field} is not parseable`).not.toThrow();
    expect(new URL(value).protocol).toBe("https:");
  });

  it.each(URL_FIELDS)("%s has no repeated @ in its handle", (field) => {
    expect((churchInfo as Record<string, string>)[field]).not.toContain("@@");
  });

  it("has no leading or trailing whitespace in URLs", () => {
    for (const field of URL_FIELDS) {
      const value = (churchInfo as Record<string, string>)[field];
      expect(value, `${field} has surrounding whitespace`).toBe(value.trim());
    }
  });
});
