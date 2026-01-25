"use client";

import { useState, useEffect } from "react";
import { Radio } from "lucide-react";

const YOUTUBE_API_KEY = "AIzaSyA6Syni8N0wQp6chAP3Q5zR1liM4xuSR58";
const DEAFCHURCH_CHANNEL_ID = "UCf9-EmGUJJZcwYqJeyO67xw";

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
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        // Check for live streams
        const liveResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${DEAFCHURCH_CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
        );
        const liveData = await liveResponse.json();

        if (liveData.items && liveData.items.length > 0) {
          const liveVideo = liveData.items[0];
          setVideo({
            id: liveVideo.id.videoId,
            title: liveVideo.snippet.title,
            isLive: true,
            publishedAt: liveVideo.snippet.publishedAt,
          });
          setIsLive(true);
          setLoading(false);
          return;
        }

        // Get recent videos (not Shorts)
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${DEAFCHURCH_CHANNEL_ID}&order=date&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`
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
        // Don't set error - we'll fall back to channel embed
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

  // If we have a specific video, show it
  if (video) {
    return (
      <div>
        {video.isLive && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded">
              <Radio className="w-4 h-4 animate-pulse" />
              LIVE NOW
            </span>
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

  // Fallback: embed using the channel's uploads playlist (UC -> UU)
  // YouTube automatically creates an uploads playlist by replacing UC with UU in channel ID
  const uploadsPlaylistId = DEAFCHURCH_CHANNEL_ID.replace('UC', 'UU');

  return (
    <div>
      <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/videoseries?list=${uploadsPlaylistId}`}
          title="DeafChurch Together - Latest Service"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
