"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Radio, Play } from "lucide-react";

// Browser key: it is sent from the visitor's browser to YouTube, so it is
// public by necessity and cannot be hidden. It is protected by restriction
// instead — Google only accepts it from ctkasa.com, the staging site, and
// localhost, and only for the YouTube Data API. A copy is useless anywhere
// else. Owned by the church's own Google project (christtheking-485406).
const YOUTUBE_API_KEY = "AIzaSyBTTsjuKTFwBWjeRmVF1pleR0wjgHpYHqI";
const CHANNEL_ID = "UC3qXOkET13YuCc4dNr89Q2w";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@christthekinganglicanchurc8992";

interface VideoInfo {
  id: string;
  title: string;
  isLive: boolean;
  isUpcoming: boolean;
  publishedAt: string;
  viewerCount?: string;
  thumbnail?: string;
  isShort?: boolean;
}

// Uploads playlist. Every channel has one, and reading it costs 1 quota unit
// against search.list's 100.
const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`;

// A Short is at most 3 minutes. Sunday services run over an hour, so duration
// separates them cleanly.
const SHORT_MAX_SECONDS = 180;

/** Seconds from an ISO 8601 duration such as PT1H38M36S. */
function durationToSeconds(iso: string): number {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m) return 0;
  const [, h, min, s] = m;
  return Number(h ?? 0) * 3600 + Number(min ?? 0) * 60 + Number(s ?? 0);
}

export function LatestSermon() {
  const [sermon, setSermon] = useState<VideoInfo | null>(null);
  const [shorts, setShorts] = useState<VideoInfo[]>([]);
  const [playingShort, setPlayingShort] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchVideos() {
      try {
        // Recent uploads. playlistItems.list costs 1 quota unit; the
        // search.list call this replaces cost 100.
        const listResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=20&key=${YOUTUBE_API_KEY}`
        );
        const listData = await listResponse.json();
        if (listData.error) throw new Error(listData.error.message);

        const ids: string[] = (listData.items ?? [])
          .map((i: { contentDetails?: { videoId?: string } }) => i.contentDetails?.videoId)
          .filter(Boolean);
        if (ids.length === 0) throw new Error("No uploads returned");

        // One more unit buys duration and live status for all of them, which
        // is what separates Shorts from services and detects a live stream.
        const detailResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,liveStreamingDetails&id=${ids.join(
            ","
          )}&key=${YOUTUBE_API_KEY}`
        );
        const detailData = await detailResponse.json();
        if (detailData.error) throw new Error(detailData.error.message);

        type ApiVideo = {
          id: string;
          snippet: {
            title: string;
            publishedAt: string;
            liveBroadcastContent?: string;
            thumbnails?: { medium?: { url: string }; default?: { url: string } };
          };
          contentDetails: { duration: string };
          liveStreamingDetails?: { concurrentViewers?: string };
        };

        const videos: VideoInfo[] = (detailData.items ?? []).map((v: ApiVideo) => ({
          id: v.id,
          title: v.snippet.title,
          isLive: v.snippet.liveBroadcastContent === "live",
          isUpcoming: v.snippet.liveBroadcastContent === "upcoming",
          publishedAt: v.snippet.publishedAt,
          thumbnail:
            v.snippet.thumbnails?.medium?.url || v.snippet.thumbnails?.default?.url,
          isShort: durationToSeconds(v.contentDetails.duration) <= SHORT_MAX_SECONDS,
          viewerCount: v.liveStreamingDetails?.concurrentViewers,
        }));

        if (cancelled) return;

        // A live stream outranks everything; otherwise the newest full-length
        // video. Shorts are never the headline.
        const live = videos.find((v) => v.isLive);
        const fullVideos = videos.filter((v) => !v.isShort && !v.isLive);

        if (live) {
          setSermon(live);
        } else if (fullVideos.length > 0) {
          setSermon(fullVideos[0]);
        } else {
          setError(true);
        }
        setShorts(videos.filter((v) => v.isShort).slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch YouTube data:", err);
        if (!cancelled) setError(true);
      }
      if (!cancelled) setLoading(false);
    }

    fetchVideos();

    // Refresh every 5 minutes so a service going live is picked up without a
    // reload. At 2 units a run this is ~576 units/day per open tab, against a
    // 10,000 daily quota. The previous 2-minute interval cost 200 units a run
    // and drained the entire day's quota in under two hours.
    const interval = setInterval(fetchVideos, 300000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div>
        <div className="mb-4">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-1">Latest Sermon</h2>
          <p className="text-navy-600">Loading...</p>
        </div>
        <div className="aspect-video bg-navy-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error || !sermon) {
    return (
      <div>
        <div className="mb-4 flex justify-between items-end">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-1">Watch Sermons</h2>
            <p className="text-navy-600">Visit our YouTube channel for all messages</p>
          </div>
        </div>
        <a
          href={YOUTUBE_CHANNEL_URL + "/videos"}
          target="_blank"
          rel="noopener noreferrer"
          className="block aspect-video bg-navy-900 rounded-xl overflow-hidden shadow-xl relative group"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 transition-colors">
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </div>
              <p className="text-white font-semibold">Watch on YouTube</p>
            </div>
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Main Sermon */}
      <div>
        <div className="mb-4 flex justify-between items-end">
          <div>
            {sermon.isLive ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    <Radio className="w-3 h-3 animate-pulse" />
                    LIVE NOW
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-navy-900">{sermon.title}</h2>
                {sermon.viewerCount && (
                  <p className="text-navy-600">{sermon.viewerCount} watching</p>
                )}
              </>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-1">Latest Sermon</h2>
                <p className="text-navy-600">{sermon.title}</p>
                <p className="text-navy-400 text-sm">{formatDate(sermon.publishedAt)}</p>
              </>
            )}
          </div>
          <a
            href={YOUTUBE_CHANNEL_URL + "/videos"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gold-600 hover:text-gold-700 font-medium whitespace-nowrap"
          >
            View all →
          </a>
        </div>
        <div className={`aspect-video rounded-xl overflow-hidden shadow-xl ${sermon.isLive ? 'ring-4 ring-red-500' : ''}`}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${sermon.id}${sermon.isLive ? '?autoplay=1' : ''}`}
            title={sermon.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Shorts Section */}
      {shorts.length > 0 && (
        <div>
          <div className="mb-4 flex justify-between items-end">
            <div>
              <h2 className="font-display text-xl font-bold text-navy-900 mb-1">Quick Clips</h2>
              <p className="text-navy-600 text-sm">Bite-sized moments from our community</p>
            </div>
            <a
              href={YOUTUBE_CHANNEL_URL + "/shorts"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gold-600 hover:text-gold-700 font-medium whitespace-nowrap"
            >
              View all shorts →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {shorts.map((short) =>
              playingShort === short.id ? (
                <div
                  key={short.id}
                  className="relative aspect-[9/16] bg-navy-900 rounded-xl overflow-hidden shadow-lg"
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${short.id}?autoplay=1&rel=0`}
                    title={short.title}
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                /* Thumbnail until clicked: four autoplaying iframes would load
                   megabytes of player on every visit to this page. */
                <button
                  key={short.id}
                  type="button"
                  onClick={() => setPlayingShort(short.id)}
                  aria-label={`Play ${short.title}`}
                  className="group relative aspect-[9/16] bg-navy-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow text-left"
                >
                  {short.thumbnail && (
                    <Image
                      src={short.thumbnail}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs font-medium line-clamp-2">{short.title}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity bg-black/20">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-navy-900 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
