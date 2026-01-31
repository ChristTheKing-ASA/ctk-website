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
          src={`https://www.youtube.com/embed/${videoId}`}
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
