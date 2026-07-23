import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { ASSETS, CLASS_VIDEOS, SITE, youtubeWatchUrl } from "@/lib/site-data";
import { Clock, ExternalLink, Play, Users2 } from "lucide-react";

export const Route = createFileRoute("/resources/classes")({
  head: () => ({
    meta: [
      { title: `Free Classes | ${SITE.name}` },
      {
        name: "description",
        content: "Join a free class from Good Deeds Network. Marketing, business, and community skills taught by volunteers.",
      },
      { property: "og:title", content: "Free Classes" },
      { property: "og:description", content: "Live and on demand classes, taught by volunteer educators." },
      { property: "og:image", content: ASSETS.logo },
    ],
  }),
  component: Classes,
});

function Classes() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free classes"
        title="Learn from people who have done it."
        description="Full class replays taught by our volunteer educators. No fees, no gates. Just skills you can use today."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="space-y-12">
          {CLASS_VIDEOS.map((c) => (
            <article
              key={c.id}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
                <YouTubeEmbed videoId={c.id} title={c.title} className="rounded-none" />
                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
                    <Play className="h-3.5 w-3.5" /> Free replay
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-medium text-foreground md:text-3xl">{c.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{c.description}</p>
                  <div className="mt-5 flex flex-wrap gap-5 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Users2 className="h-4 w-4 text-primary" /> Free
                    </span>
                    {c.place && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-primary" /> {c.place}
                      </span>
                    )}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <a
                      href={youtubeWatchUrl(c.id)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep"
                    >
                      Watch on YouTube <ExternalLink className="h-4 w-4" />
                    </a>
                    <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
                      Join the next cohort
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
