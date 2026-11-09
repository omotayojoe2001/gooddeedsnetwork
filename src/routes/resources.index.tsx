import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { ASSETS, CLASS_VIDEOS, OUTREACH_VIDEOS, SITE, youtubeWatchUrl } from "@/lib/site-data";
import { BookOpen, Download, Play, Video } from "lucide-react";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: `Free Resources | ${SITE.name}` },
      {
        name: "description",
        content: "Free class replays, guides and playbooks from Good Deeds Network. Learn, build, and grow at no cost.",
      },
      { property: "og:title", content: "Free Resources" },
      { property: "og:description", content: "Class replays and learning resources, free forever." },
      { property: "og:image", content: ASSETS.logo },
    ],
  }),
  component: Resources,
});

const writtenResources = [
  { icon: BookOpen, tag: "Guide", title: "WhatsApp for Business Playbook", body: "Turn WhatsApp into your number one sales channel.", type: "Coming soon" },
  { icon: BookOpen, tag: "Guide", title: "Volunteer Handbook", body: "Everything a new Good Deeds Network volunteer needs to know.", type: "Coming soon" },
  { icon: BookOpen, tag: "Guide", title: "Community Outreach Checklist", body: "The exact list we use to plan every community outreach.", type: "Coming soon" },
];

function Resources() {
  const videoResources = [...OUTREACH_VIDEOS, ...CLASS_VIDEOS];

  return (
    <PageShell>
      <PageHero
        eyebrow="Free resources"
        title="Take what you need. Build what you love."
        description="A growing library of class replays, guides and playbooks. Created by our volunteers and given to the community, free forever."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-medium text-foreground md:text-4xl">Video library</h2>
            <p className="mt-2 text-muted-foreground">Watch outreach stories and full class replays on YouTube.</p>
          </div>
          <Link to="/resources/classes" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep">
            Browse classes
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videoResources.map((r) => (
            <a
              key={r.id}
              href={youtubeWatchUrl(r.id)}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-royal)] text-primary-foreground">
                  <Video className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground">
                  Video
                </span>
              </div>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-primary">
                {r.category === "class" ? "Free class" : r.category === "story" ? "Impact story" : "Outreach"}
              </p>
              <h3 className="mt-1 font-display text-xl font-medium text-foreground">{r.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary-deep">
                <Play className="h-4 w-4" /> Watch now
              </span>
            </a>
          ))}
        </div>

        <div className="mt-24">
          <h2 className="font-display text-3xl font-medium text-foreground md:text-4xl">Written resources</h2>
          <p className="mt-2 text-muted-foreground">Guides and templates coming soon. Check back as our library grows.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {writtenResources.map((r) => (
              <div key={r.title} className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-royal)] text-primary-foreground">
                  <r.icon className="h-5 w-5" />
                </div>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-primary">{r.tag}</p>
                <h3 className="mt-1 font-display text-xl font-medium text-foreground">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Download className="h-4 w-4" /> {r.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
