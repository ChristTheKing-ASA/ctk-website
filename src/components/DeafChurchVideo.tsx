// Video ID can be overridden via props (from CMS) or uses default
const DEFAULT_VIDEO_ID = "UfT4kke9Fao";

interface DeafChurchVideoProps {
  videoId?: string;
}

export function DeafChurchVideo({ videoId = DEFAULT_VIDEO_ID }: DeafChurchVideoProps) {
  return (
    <div>
      <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
        <iframe
          width="100%"
          height="100%"
          // cc_load_policy=1 turns captions on by default. This parish runs a
          // ministry for the Deaf community; captions should not be something a
          // Deaf visitor has to find and switch on for every video.
          src={`https://www.youtube-nocookie.com/embed/${videoId}?cc_load_policy=1&rel=0`}
          title="DeafChurch Together"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
