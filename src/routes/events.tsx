import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { OptimizedImage } from "@/components/optimized-image";
import { VideoGrid } from "@/components/video-card";
import { ASSETS, CLASS_VIDEOS, GALLERY_IMAGES, OUTREACH_VIDEOS, SITE } from "@/lib/site-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: `Events | ${SITE.name}` },
      {
        name: "description",
        content: "Watch outreach stories, photo gallery, and free class replays from Good Deeds Network in Ikotun, Lagos.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Events" },
      { property: "og:image", content: `${SITE.url}${ASSETS.logo}` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/events` }],
  }),
  component: Events,
});

function Events() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Events"
        title="Where we show up and what we share."
        description="Watch our outreach in Ikotun, impact stories, and free class replays. Every event is open to the community."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Outreach and impact</p>
        <h2 className="mt-3 font-display text-4xl font-medium text-foreground md:text-5xl">On the ground in Lagos.</h2>
        <div className="mt-12">
          <VideoGrid videos={OUTREACH_VIDEOS} featuredFirst />
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Media library</p>
          <h2 className="mt-3 font-display text-4xl font-medium text-foreground md:text-5xl">Moments from Ikotun outreach.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Photos from our Cloth the Clothless outreach in Ikotun, Lagos. Real people, real presence, real good deeds.
          </p>
          <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={src} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
                <OptimizedImage
                  src={src}
                  alt={`Good Deeds Network Ikotun outreach photo ${i + 1}`}
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                  width={600}
                  height={800}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Free class replays</p>
          <h2 className="mt-3 font-display text-4xl font-medium text-foreground md:text-5xl">Learn at your own pace.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Full replays from our free marketing and business classes. Watch, share, and grow.
          </p>
          <div className="mt-12">
            <VideoGrid videos={CLASS_VIDEOS} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
