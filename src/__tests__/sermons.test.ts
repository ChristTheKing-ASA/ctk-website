import { afterEach, describe, expect, it, vi } from "vitest";
import { getSermonArchive } from "@/lib/sermons";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getSermonArchive", () => {
  // Regression: Next cached these responses for a year and Cloudflare restored
  // the cache on every build, so the live archive stopped at 10 August 2026.
  it("keeps YouTube responses out of the long-lived build cache", async () => {
    const fetchMock = vi.fn(async (url: string) => ({
      json: async () =>
        url.includes("playlistItems")
          ? { items: [{ contentDetails: { videoId: "abc" } }] }
          : {
              items: [
                {
                  id: "abc",
                  snippet: { title: "A sermon", publishedAt: "2026-11-08T15:00:00Z" },
                  contentDetails: { duration: "PT20M" },
                },
              ],
            },
    }));
    vi.stubGlobal("fetch", fetchMock);

    const archive = await getSermonArchive();

    expect(archive).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    for (const [, init] of fetchMock.mock.calls as unknown as [string, { next?: { revalidate?: number } }][]) {
      expect(init.next?.revalidate).toBeLessThanOrEqual(60);
    }
  });

  it("returns an empty archive instead of failing the build", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ json: async () => ({ error: { message: "quota" } }) }))
    );
    vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(await getSermonArchive()).toEqual([]);
  });
});
