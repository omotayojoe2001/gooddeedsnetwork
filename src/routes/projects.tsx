import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { ASSETS, PROJECTS, SITE } from "@/lib/site-data";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects | ${SITE.name}` },
      {
        name: "description",
        content: "genrev.ng and genrev.app fund Good Deeds Network outreach and free education in Lagos, Nigeria.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Our Projects" },
      { property: "og:image", content: `${SITE.url}${ASSETS.logo}` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/projects` }],
  }),
  component: Projects,
});

function Projects() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our projects"
        title="Products that fund the mission."
        description="Every project we build channels its proceeds back into our outreach and free education. When you grow with us, the community grows with you."
      />

      <section className="mx-auto max-w-7xl space-y-12 px-6 py-24">
        {PROJECTS.map((p, i) => (
          <div
            key={p.name}
            className={`grid gap-10 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] md:p-12 lg:grid-cols-2 lg:items-center ${
              i % 2 ? "lg:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div>
              <div className="flex min-h-[96px] items-center rounded-2xl bg-secondary/40 px-6 py-5">
                <img src={p.logo} alt={`${p.name} logo`} className="h-20 w-auto max-w-[280px] object-contain md:h-24" />
              </div>
              <span className="mt-6 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
                {p.tag}
              </span>
              <h2 className="mt-4 font-display text-5xl font-medium text-foreground">{p.name}</h2>
              <p className="mt-3 font-display text-xl italic text-primary">{p.tagline}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{p.body}</p>
              <p className="mt-4 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-foreground/80">
                Proceeds from {p.name} directly support Good Deeds Network outreach programs and free classes.
              </p>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] hover:bg-primary-deep"
              >
                Visit {p.name} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {p.features.map((label) => (
                <div key={label} className="rounded-2xl border border-border bg-background p-5">
                  <p className="font-display text-sm font-semibold text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
