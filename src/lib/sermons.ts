/**
 * Sermon archive, fetched at build time.
 *
 * Old sermons never change, so paying YouTube quota for them on every visit
 * would be waste: ~20 units per page load against a 10,000 daily budget, which
 * 500 visitors would exhaust. Fetching once per deploy costs 20 units total and
 * produces static HTML a search engine can actually read, which is the point.
 *
 * The live and latest sermon stays client-side in LatestSermon, because that is
 * the only part that has to be current.
 */

const CHANNEL_ID = "UC3qXOkET13YuCc4dNr89Q2w";
const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`;

// Same public browser key the client uses. It is referrer-restricted, and a
// server request sends no Referer, so we set one explicitly. That is not a
// bypass: the key is public by design and the restriction exists to stop other
// sites spending the quota, not to stop this site's own build.
const API_KEY =
  process.env.YOUTUBE_API_KEY || "AIzaSyBTTsjuKTFwBWjeRmVF1pleR0wjgHpYHqI";
const REFERER = "https://ctkasa.com/";

const SHORT_MAX_SECONDS = 180;

/** Below this, a full-length upload is a sermon rather than a whole service. */
const SERVICE_MIN_SECONDS = 45 * 60;

export type SermonKind = "sermon" | "service" | "clip";

export interface ArchiveVideo {
  id: string;
  title: string;
  publishedAt: string;
  durationSeconds: number;
  thumbnail?: string;
  kind: SermonKind;
}

function durationToSeconds(iso: string): number {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m) return 0;
  const [, h, min, s] = m;
  return Number(h ?? 0) * 3600 + Number(min ?? 0) * 60 + Number(s ?? 0);
}

/**
 * Full-length uploads are of two kinds, and mixing them serves nobody: a
 * 20-minute sermon and a 98-minute service recording are different things to
 * someone browsing. Length separates them reliably, and the service recordings
 * additionally carry liturgical-calendar titles.
 */
function classify(durationSeconds: number, title: string): SermonKind {
  if (durationSeconds <= SHORT_MAX_SECONDS) return "clip";
  if (durationSeconds >= SERVICE_MIN_SECONDS) return "service";
  // Belt and braces: a shorter recording still titled like a service.
  if (/\b(SUNDAY|ADVENT|LENT|EASTER|PENTECOST|PROPER|YEAR [ABC])\b/i.test(title)) {
    return "service";
  }
  return "sermon";
}

async function fetchJson(url: string) {
  const res = await fetch(url, { headers: { Referer: REFERER } });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message ?? "YouTube API error");
  return json;
}

/**
 * Every upload, newest first.
 *
 * Returns an empty array rather than throwing if YouTube is unreachable or the
 * quota is spent. A failed archive fetch must not fail the deploy: the page
 * still renders its live sermon, and the next build picks the archive back up.
 */
export async function getSermonArchive(): Promise<ArchiveVideo[]> {
  try {
    const ids: string[] = [];
    let pageToken = "";

    // Paginate the uploads playlist. 1 quota unit per page of 50.
    do {
      const data = await fetchJson(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=50&key=${API_KEY}` +
          (pageToken ? `&pageToken=${pageToken}` : "")
      );
      for (const item of data.items ?? []) {
        const id = item?.contentDetails?.videoId;
        if (id) ids.push(id);
      }
      pageToken = data.nextPageToken ?? "";
    } while (pageToken);

    // Durations and titles, 50 ids per call, 1 unit each.
    const videos: ArchiveVideo[] = [];
    for (let i = 0; i < ids.length; i += 50) {
      const batch = ids.slice(i, i + 50);
      const data = await fetchJson(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${batch.join(
          ","
        )}&key=${API_KEY}`
      );

      for (const v of data.items ?? []) {
        const durationSeconds = durationToSeconds(v.contentDetails?.duration ?? "");
        videos.push({
          id: v.id,
          title: v.snippet?.title ?? "",
          publishedAt: v.snippet?.publishedAt ?? "",
          durationSeconds,
          thumbnail:
            v.snippet?.thumbnails?.medium?.url ?? v.snippet?.thumbnails?.default?.url,
          kind: classify(durationSeconds, v.snippet?.title ?? ""),
        });
      }
    }

    return videos.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch (error) {
    console.warn(
      "[sermons] archive unavailable at build time, page will render without it:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

export function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * How many full-service recordings to ship to the browser.
 *
 * Services outnumber sermons six to one and are mostly hour-plus recordings of
 * the whole liturgy. Every one handed to the client component is embedded in
 * the page whether it renders or not, so the older ones stay on YouTube.
 */
export const SERVICE_LIMIT = 60;
