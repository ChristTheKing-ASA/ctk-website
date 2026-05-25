/**
 * Test YouTube API configuration.
 * Run: npm run test:youtube
 */
const apiKey = process.env.YOUTUBE_API_KEY;
const channelId = process.env.YOUTUBE_CHANNEL_ID ?? "UC3qXOkET13YuCc4dNr89Q2w";

if (!apiKey) {
  console.error(`
❌ YOUTUBE_API_KEY is not set in .env.local

Fix:
  1. Google Cloud Console → APIs & Services → Credentials
  2. Create API key, enable "YouTube Data API v3"
  3. Add YOUTUBE_API_KEY=... to .env.local
  4. Run: npm run test:youtube
`);
  process.exit(1);
}

const url = new URL("https://www.googleapis.com/youtube/v3/search");
url.searchParams.set("part", "snippet");
url.searchParams.set("channelId", channelId);
url.searchParams.set("order", "date");
url.searchParams.set("type", "video");
url.searchParams.set("maxResults", "3");
url.searchParams.set("key", apiKey);

console.log(`Fetching latest videos for channel ${channelId}...`);

const res = await fetch(url);
const data = await res.json();

if (!res.ok) {
  console.error("❌ YouTube API error:", data.error?.message ?? res.statusText);
  process.exit(1);
}

const items = data.items ?? [];
if (items.length === 0) {
  console.warn("⚠️  API works but no videos returned for this channel ID.");
  process.exit(0);
}

console.log("✅ YouTube API is working. Latest videos:");
for (const item of items) {
  console.log(`   - ${item.snippet?.title ?? "(no title)"}`);
}
