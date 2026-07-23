import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { YouTubeEmbed } from "@/components/youtube-embed";
import type { VideoItem } from "@/lib/site-data";
import { ExternalLink } from "lucide-react";
import { youtubeWatchUrl } from "@/lib/site-data";

type VideoCarouselProps = {
  videos: VideoItem[];
};

export function VideoCarousel({ videos }: VideoCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {videos.map((video) => (
          <CarouselItem key={video.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:border-primary/25 hover:shadow-[var(--shadow-elegant)]">
              <YouTubeEmbed videoId={video.id} title={video.title} className="rounded-none rounded-t-2xl" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {video.category === "story" ? "Impact story" : video.category === "class" ? "Free class" : "Outreach"}
                </p>
                <h3 className="mt-2 line-clamp-2 font-display text-lg font-medium text-foreground">{video.title}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{video.description}</p>
                <a
                  href={youtubeWatchUrl(video.id)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-deep"
                >
                  Watch <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
