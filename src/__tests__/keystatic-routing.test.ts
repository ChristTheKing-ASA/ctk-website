import { describe, expect, it } from "vitest";
import { generateStaticParams } from "@/app/keystatic/[[...params]]/page";
import {
  buildKeystaticRecoveryUrl,
  getRecoveredKeystaticUrl,
} from "@/lib/keystatic-routing";

describe("Keystatic static routes", () => {
  it("exports the editor root and the Cloud OAuth callback", () => {
    expect(generateStaticParams()).toEqual([
      { params: [] },
      { params: ["cloud", "oauth", "callback"] },
    ]);
  });

  it("round-trips a project-prefixed deep link through the exported root", () => {
    const original = new URL(
      "https://wallscaler.github.io/ctk-website/keystatic/branch/main/singleton/churchInfo/?tab=details#contact"
    );
    const recovery = buildKeystaticRecoveryUrl(original, "/ctk-website");

    expect(recovery?.pathname).toBe("/ctk-website/keystatic/");
    expect(getRecoveredKeystaticUrl(recovery!, "/ctk-website")?.href).toBe(
      original.href
    );
  });

  it("does not recover non-editor or cross-origin paths", () => {
    expect(
      buildKeystaticRecoveryUrl(
        new URL("https://wallscaler.github.io/ctk-website/about/"),
        "/ctk-website"
      )
    ).toBeNull();

    const recovery = new URL(
      "https://wallscaler.github.io/ctk-website/keystatic/?__ks_path=https%3A%2F%2Fevil.example%2Fkeystatic"
    );
    expect(getRecoveredKeystaticUrl(recovery, "/ctk-website")).toBeNull();
  });
});
