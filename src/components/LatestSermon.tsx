"use client";

import { useState, useEffect } from "react";
import { Radio, Play } from "lucide-react";

const YOUTUBE_API_KEY = "AIzaSyA6Syni8N0wQp6chAP3Q5zR1liM4xuSR58";
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

// Check if a video is a Short using YouTube's oEmbed endpoint
// Shorts URLs return valid oEmbed data, regular videos at /shorts/ URL return errors
async function checkIfShort(videoId: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/shorts/${videoId}&format=json`
    );
    // If oEmbed returns 200, it's a valid Short
    return response.ok;
  } catch {
    return false;
  }
}

export function LatestSermon() {
  const [sermon, setSermon] = useState<VideoInfo | null>(null);
  const [shorts, setShorts] = useState<VideoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      try {
        // First check for live streams
        const liveResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
        );
        const liveData = await liveResponse.json();

        if (liveData.items && liveData.items.length > 0) {
          const liveVideo = liveData.items[0];
          const statsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${liveVideo.id.videoId}&key=${YOUTUBE_API_KEY}`
          );
          const statsData = await statsResponse.json();
          const viewerCount = statsData.items?.[0]?.liveStreamingDetails?.concurrentViewers;

          setSermon({
            id: liveVideo.id.videoId,
            title: liveVideo.snippet.title,
            isLive: true,
            isUpcoming: false,
            publishedAt: liveVideo.snippet.publishedAt,
            viewerCount,
          });
          setLoading(false);
          return;
        }

        // Get recent videos
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=20&key=${YOUTUBE_API_KEY}`
        );
        const searchData = await searchResponse.json();

        if (searchData.items && searchData.items.length > 0) {
          const videos = searchData.items.map((v: any) => ({
            id: v.id.videoId,
            title: v.snippet.title,
            isLive: false,
            isUpcoming: false,
            publishedAt: v.snippet.publishedAt,
            thumbnail: v.snippet.thumbnails?.medium?.url || v.snippet.thumbnails?.default?.url,
          }));

          // Check each video to see if it's a Short
          const shortChecks = await Promise.all(
            videos.map(async (video: VideoInfo) => {
              const isShort = await checkIfShort(video.id);
              return { ...video, isShort };
            })
          );

          const fullVideos = shortChecks.filter((v: VideoInfo) => !v.isShort);
          const shortVideos = shortChecks.filter((v: VideoInfo) => v.isShort);

          if (fullVideos.length > 0) {
            setSermon(fullVideos[0]);
          }
          setShorts(shortVideos.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch YouTube data:", err);
        setError(true);
      }
      setLoading(false);
    }

    fetchVideos();
    const interval = setInterval(fetchVideos, 120000);
    return () => clearInterval(interval);
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
            {shorts.map((short) => (
              <a
                key={short.id}
                href={`https://www.youtube.com/shorts/${short.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[9/16] bg-navy-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {short.thumbnail && (
                  <img
                    src={short.thumbnail}
                    alt={short.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-medium line-clamp-2">{short.title}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-navy-900 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
