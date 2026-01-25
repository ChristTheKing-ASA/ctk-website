// Featured video for DeafChurch page
const FEATURED_VIDEO_ID = "UfT4kke9Fao";

export function DeafChurchVideo() {
  return (
    <div>
      <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}`}
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
