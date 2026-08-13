"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import type { ArchiveVideo, SermonKind } from "@/lib/sermons";
import { formatDuration } from "@/lib/sermons";

const TABS: { kind: SermonKind; label: string; blurb: string }[] = [
  { kind: "sermon", label: "Sermons", blurb: "Messages from our clergy" },
  { kind: "service", label: "Full Services", blurb: "Complete Sunday worship" },
  { kind: "clip", label: "Short Clips", blurb: "Bite-sized moments" },
];

function formatDate(value: string) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function SermonArchive({
  videos,
  channelUrl,
  totalServices,
}: {
  videos: ArchiveVideo[];
  channelUrl: string;
  /** Full count on the channel, including services trimmed before serialising. */
  totalServices: number;
}) {
  const [active, setActive] = useState<SermonKind>("sermon");
  const [playing, setPlaying] = useState<string | null>(null);

  if (videos.length === 0) return null;

  const counts = {
    sermon: videos.filter((v) => v.kind === "sermon").length,
    service: videos.filter((v) => v.kind === "service").length,
    clip: videos.filter((v) => v.kind === "clip").length,
  };
  // The services tab advertises the true channel total, not the trimmed count.
  counts.service = totalServices;

  const shown = videos.filter((v) => v.kind === active);
  const activeTab = TABS.find((t) => t.kind === active)!;

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-navy-900 mb-1">
          Sermon Archive
        </h2>
        <p className="text-navy-600">{activeTab.blurb}</p>
      </div>

      {/* Tabs. Horizontally scrollable rather than wrapped, so three labels
          plus counts never crush the layout on a narrow phone. */}
      <div
        role="tablist"
        aria-label="Filter recordings"
        className="flex gap-2 mb-8 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {TABS.map((tab) => (
          <button
            key={tab.kind}
            role="tab"
            type="button"
            aria-selected={active === tab.kind}
            onClick={() => {
              setActive(tab.kind);
              setPlaying(null);
            }}
            className={`shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active === tab.kind
                ? "bg-navy-900 text-white"
                : "bg-cream-100 text-navy-700 hover:bg-cream-200"
            }`}
          >
            {tab.label}
            <span
              className={`ml-2 tabular-nums ${
                active === tab.kind ? "text-navy-300" : "text-navy-400"
              }`}
            >
              {counts[tab.kind]}
            </span>
          </button>
        ))}
      </div>

      <div
        className={
          active === "clip"
            ? "grid grid-cols-2 md:grid-cols-4 gap-4"
            : "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        }
      >
        {shown.map((video) =>
          playing === video.id ? (
            <div
              key={video.id}
              className={`relative bg-navy-900 rounded-xl overflow-hidden shadow-lg ${
                video.kind === "clip"
                  ? "aspect-[9/16] col-span-2 md:col-span-1 max-w-xs mx-auto w-full md:max-w-none"
                  : "aspect-video"
              }`}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&cc_load_policy=1`}
                title={video.title}
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            <div key={video.id} className="flex flex-col">
              {/* Thumbnail only until clicked: mounting sixty players would
                  pull tens of megabytes onto the page. */}
              <button
                type="button"
                onClick={() => setPlaying(video.id)}
                aria-label={`Play ${video.title}`}
                className={`group relative bg-navy-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
                  video.kind === "clip" ? "aspect-[9/16]" : "aspect-video"
                }`}
              >
                {video.thumbnail && (
                  <Image
                    src={video.thumbnail}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-navy-900 ml-0.5" fill="currentColor" />
                  </div>
                </div>
                {video.durationSeconds > 0 && (
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded tabular-nums">
                    {formatDuration(video.durationSeconds)}
                  </span>
                )}
              </button>
              <h3 className="mt-3 text-sm font-medium text-navy-900 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-xs text-navy-500 mt-1">
                {formatDate(video.publishedAt)}
              </p>
            </div>
          )
        )}
      </div>

      {active === "service" && totalServices > shown.length && (
        <p className="mt-8 text-sm text-navy-600">
          Showing the {shown.length} most recent of {totalServices} services.{" "}
          <a
            href={`${channelUrl}/videos`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-600 hover:text-gold-700 font-medium inline-flex items-center gap-1"
          >
            Browse the rest on YouTube
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </p>
      )}
    </div>
  );
}
