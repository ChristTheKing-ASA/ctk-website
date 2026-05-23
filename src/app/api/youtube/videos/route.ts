import { NextResponse } from "next/server";

const CHANNEL_ID = "UC3qXOkET13YuCc4dNr89Q2w";

interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails?: { medium?: { url: string }; default?: { url: string } };
  };
}

interface YouTubeSearchResponse {
  items?: YouTubeSearchItem[];
}

interface YouTubeVideoStatsResponse {
  items?: Array<{
    liveStreamingDetails?: { concurrentViewers?: string };
  }>;
}

async function checkIfShort(videoId: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/shorts/${videoId}&format=json`,
      { next: { revalidate: 3600 } },
    );
    return response.ok;
  } catch {
    return false;
  }
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "YouTube API is not configured" }, { status: 503 });
  }

  try {
    const liveResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${apiKey}`,
      { next: { revalidate: 120 } },
    );
    const liveData = (await liveResponse.json()) as YouTubeSearchResponse;

    if (liveData.items && liveData.items.length > 0) {
      const liveVideo = liveData.items[0];
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${liveVideo.id.videoId}&key=${apiKey}`,
        { next: { revalidate: 120 } },
      );
      const statsData = (await statsResponse.json()) as YouTubeVideoStatsResponse;
      const viewerCount = statsData.items?.[0]?.liveStreamingDetails?.concurrentViewers;

      return NextResponse.json({
        sermon: {
          id: liveVideo.id.videoId,
          title: liveVideo.snippet.title,
          isLive: true,
          isUpcoming: false,
          publishedAt: liveVideo.snippet.publishedAt,
          viewerCount,
        },
        shorts: [],
      });
    }

    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=20&key=${apiKey}`,
      { next: { revalidate: 120 } },
    );
    const searchData = (await searchResponse.json()) as YouTubeSearchResponse;

    if (!searchData.items?.length) {
      return NextResponse.json({ sermon: null, shorts: [] });
    }

    const videos = searchData.items.map((v) => ({
      id: v.id.videoId,
      title: v.snippet.title,
      isLive: false,
      isUpcoming: false,
      publishedAt: v.snippet.publishedAt,
      thumbnail:
        v.snippet.thumbnails?.medium?.url || v.snippet.thumbnails?.default?.url,
    }));

    const shortChecks = await Promise.all(
      videos.map(async (video) => ({
        ...video,
        isShort: await checkIfShort(video.id),
      })),
    );

    const fullVideos = shortChecks.filter((v) => !v.isShort);
    const shortVideos = shortChecks.filter((v) => v.isShort);

    return NextResponse.json({
      sermon: fullVideos[0] ?? null,
      shorts: shortVideos.slice(0, 4),
    });
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
