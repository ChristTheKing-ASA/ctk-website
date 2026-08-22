import { describe, expect, it } from "vitest";
import deafChurch from "../content/deafchurch.json";
import { deafChurchCardBody, deafChurchPublicCopy } from "@/lib/deafchurch";
import marva from "../content/clergy/marva-sellers.json";
import kathy from "../content/clergy/the-rev-kathy-ayres.json";

describe("DeafChurch CMS copy", () => {
  it("uses Craig's host-church wording as the public description", () => {
    const copy = deafChurchPublicCopy(deafChurch);
    expect(copy.description).toMatch(/host church/i);
    expect(copy.description).toMatch(/DeafChurch First Coast/i);
    expect(copy.badge).toBe("Host Church");
  });

  it("prefers the DeafChurch description over leftover homepage copy", () => {
    expect(
      deafChurchCardBody(deafChurch, "Christ The King serves as an Anchor Church.")
    ).toBe(deafChurch.description);
  });

  it("falls back to the homepage field only when description is empty", () => {
    expect(
      deafChurchCardBody(
        { name: "DeafChurch First Coast", description: "" },
        "Fallback from Home"
      )
    ).toBe("Fallback from Home");
  });

  it("lists Marva and Kathy on the DeafChurch page roster", () => {
    expect(deafChurch.people).toEqual(
      expect.arrayContaining(["marva-sellers", "the-rev-kathy-ayres"])
    );
    expect(marva.name).toMatch(/Marva/);
    expect(kathy.name).toMatch(/Kathy/);
  });
});
