import { youtubeEmbedUrl } from "@/lib/site-data";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
};

export function YouTubeEmbed({ videoId, title, className = "" }: YouTubeEmbedProps) {
  return (
    <div className={`relative aspect-video overflow-hidden rounded-2xl bg-foreground/5 shadow-[var(--shadow-card)] ${className}`}>
      <iframe
        src={youtubeEmbedUrl(videoId)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
