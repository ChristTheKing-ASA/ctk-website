import { describe, it, expect } from "vitest";
import { normalizeExternalUrl, displayUrl } from "@/lib/utils";

describe("normalizeExternalUrl", () => {
  it("leaves absolute URLs alone", () => {
    expect(normalizeExternalUrl("https://example.com")).toBe("https://example.com");
    expect(normalizeExternalUrl("http://example.com")).toBe("http://example.com");
    expect(normalizeExternalUrl("HTTPS://example.com")).toBe("HTTPS://example.com");
  });

  // The case that prompted this: arise-go-serve.json stored "www.arisegoserve.com".
  // Dropped into an href unmodified, that resolves as a relative path.
  it("adds https to a schemeless host", () => {
    expect(normalizeExternalUrl("www.arisegoserve.com")).toBe(
      "https://www.arisegoserve.com"
    );
    expect(normalizeExternalUrl("example.com/path")).toBe("https://example.com/path");
  });

  it("upgrades protocol-relative URLs", () => {
    expect(normalizeExternalUrl("//example.com")).toBe("https://example.com");
  });

  it("trims surrounding whitespace", () => {
    expect(normalizeExternalUrl("  example.com  ")).toBe("https://example.com");
  });

  it("returns null for empty input so callers can skip the link", () => {
    expect(normalizeExternalUrl("")).toBeNull();
    expect(normalizeExternalUrl("   ")).toBeNull();
    expect(normalizeExternalUrl(null)).toBeNull();
    expect(normalizeExternalUrl(undefined)).toBeNull();
  });

  it("produces an href that resolves absolutely, not relative to the page", () => {
    const href = normalizeExternalUrl("www.arisegoserve.com")!;
    expect(new URL(href, "https://ctkasa.com/missions/arise-go-serve").host).toBe(
      "www.arisegoserve.com"
    );
  });
});

describe("displayUrl", () => {
  it("strips the scheme", () => {
    expect(displayUrl("https://www.example.com")).toBe("www.example.com");
    expect(displayUrl("http://example.com")).toBe("example.com");
  });

  it("strips a trailing slash", () => {
    expect(displayUrl("https://example.com/")).toBe("example.com");
  });

  it("keeps a path", () => {
    expect(displayUrl("https://example.com/give")).toBe("example.com/give");
  });
});
