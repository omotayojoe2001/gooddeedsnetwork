import { ExternalLink, Play } from "lucide-react";
import type { VideoItem } from "@/lib/site-data";
import { youtubeWatchUrl } from "@/lib/site-data";
import { YouTubeEmbed } from "./youtube-embed";

type VideoCardProps = {
  video: VideoItem;
  featured?: boolean;
};

export function VideoCard({ video, featured = false }: VideoCardProps) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)] ${
        featured ? "lg:flex-row lg:items-stretch" : ""
      }`}
    >
      <div className={featured ? "lg:w-[58%] lg:shrink-0" : ""}>
        <YouTubeEmbed videoId={video.id} title={video.title} />
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:justify-center lg:p-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
          <Play className="h-3.5 w-3.5" />
          {video.category === "outreach" && "Outreach"}
          {video.category === "story" && "Impact story"}
          {video.category === "class" && "Free class"}
          {video.date && <span className="text-muted-foreground">· {video.date}</span>}
        </div>
        <h3 className={`mt-3 font-display font-medium text-foreground ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
          {video.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{video.description}</p>
        {video.place && (
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">{video.place}</p>
        )}
        <a
          href={youtubeWatchUrl(video.id)}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-deep"
        >
          Watch on YouTube <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

type VideoGridProps = {
  videos: VideoItem[];
  featuredFirst?: boolean;
};

export function VideoGrid({ videos, featuredFirst = false }: VideoGridProps) {
  if (featuredFirst && videos.length > 0) {
    const [first, ...rest] = videos;
    return (
      <div className="space-y-8">
        <VideoCard video={first} featured />
        {rest.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
