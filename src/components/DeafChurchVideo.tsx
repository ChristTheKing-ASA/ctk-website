"use client";

import { useState, useEffect } from "react";
import { Radio, Play } from "lucide-react";

const YOUTUBE_API_KEY = "AIzaSyA6Syni8N0wQp6chAP3Q5zR1liM4xuSR58";
const DEAFCHURCH_CHANNEL_URL = "https://www.youtube.com/@deafchurchtogether";

// We'll resolve the channel ID from the handle at runtime

interface VideoInfo {
  id: string;
  title: string;
  isLive: boolean;
  publishedAt: string;
  viewerCount?: string;
}

// Check if a video is a Short using YouTube's oEmbed endpoint
async function checkIfShort(videoId: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/shorts/${videoId}&format=json`
    );
    return response.ok;
  } catch {
    return false;
  }
}

export function DeafChurchVideo() {
  const [video, setVideo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      try {
        // First, resolve the channel ID from the handle
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=deafchurchtogether&key=${YOUTUBE_API_KEY}`
        );
        const channelData = await channelResponse.json();

        if (!channelData.items || channelData.items.length === 0) {
          console.error("Could not find DeafChurch channel");
          setError(true);
          setLoading(false);
          return;
        }

        const channelId = channelData.items[0].id;

        // Check for live streams
        const liveResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
        );
        const liveData = await liveResponse.json();

        if (liveData.items && liveData.items.length > 0) {
          const liveVideo = liveData.items[0];
          const statsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${liveVideo.id.videoId}&key=${YOUTUBE_API_KEY}`
          );
          const statsData = await statsResponse.json();
          const viewerCount = statsData.items?.[0]?.liveStreamingDetails?.concurrentViewers;

          setVideo({
            id: liveVideo.id.videoId,
            title: liveVideo.snippet.title,
            isLive: true,
            publishedAt: liveVideo.snippet.publishedAt,
            viewerCount,
          });
          setLoading(false);
          return;
        }

        // Get recent videos (not Shorts)
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`
        );
        const searchData = await searchResponse.json();

        if (searchData.items && searchData.items.length > 0) {
          // Check each video to find the first non-Short
          for (const item of searchData.items) {
            const isShort = await checkIfShort(item.id.videoId);
            if (!isShort) {
              setVideo({
                id: item.id.videoId,
                title: item.snippet.title,
                isLive: false,
                publishedAt: item.snippet.publishedAt,
              });
              break;
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch DeafChurch YouTube data:", err);
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
      <div className="aspect-video bg-navy-100 rounded-xl animate-pulse" />
    );
  }

  if (error || !video) {
    return (
      <a
        href={DEAFCHURCH_CHANNEL_URL + "/videos"}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-video bg-navy-900 rounded-xl overflow-hidden relative group"
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
    );
  }

  return (
    <div>
      {video.isLive && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="flex items-center gap-1.5 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded">
            <Radio className="w-4 h-4 animate-pulse" />
            LIVE NOW
          </span>
          {video.viewerCount && (
            <span className="text-navy-600">{video.viewerCount} watching</span>
          )}
        </div>
      )}
      {!video.isLive && (
        <div className="text-center mb-4">
          <p className="text-navy-600 font-medium">{video.title}</p>
          <p className="text-navy-400 text-sm">{formatDate(video.publishedAt)}</p>
        </div>
      )}
      <div className={`aspect-video rounded-xl overflow-hidden shadow-xl ${video.isLive ? 'ring-4 ring-red-500' : ''}`}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.id}${video.isLive ? '?autoplay=1' : ''}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
