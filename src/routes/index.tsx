import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { HeroSection } from "@/components/hero-section";
import { SectionHeader } from "@/components/section-header";
import { MissionMindMap } from "@/components/mission-mind-map";
import { VideoCarousel } from "@/components/video-carousel";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { ASSETS, IMPACT_CAROUSEL_VIDEOS, PROJECTS, SITE, VIDEOS } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} | ${SITE.tagline}` },
      {
        name: "description",
        content: SITE.description,
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: `${SITE.name} | ${SITE.tagline}` },
      { property: "og:image", content: `${SITE.url}${ASSETS.logo}` },
      { property: "og:url", content: SITE.url },
    ],
    links: [{ rel: "canonical", href: SITE.url }],
  }),
  component: Home,
});

function Home() {
  const featuredOutreach = VIDEOS.find((v) => v.id === "7983qO8kXhk");

  return (
    <PageShell>
      <HeroSection />

      <section className="section-surface relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            align="center"
            eyebrow={SITE.role}
            title="Two hands. One platform. Endless good."
            description={SITE.vision}
          />
          <MissionMindMap />
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary/50 py-20 md:py-28">
        <div className="section-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Watch our impact"
            title="Stories and classes that inspire."
            description="Real outreach in Ikotun. Real lessons online. Every video is a signal of hope."
            action={
              <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep">
                All events <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />

          <div className="mt-12">
            <VideoCarousel videos={IMPACT_CAROUSEL_VIDEOS} />
          </div>

          {featuredOutreach && (
            <div className="gradient-border mt-12 overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-elegant)] lg:grid lg:grid-cols-2">
              <YouTubeEmbed videoId={featuredOutreach.id} title={featuredOutreach.title} className="rounded-none lg:min-h-[300px]" />
              <div className="relative flex flex-col justify-center p-8 lg:p-10">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Play className="h-3.5 w-3.5" /> Featured
                </div>
                <h3 className="font-display text-2xl font-medium text-foreground md:text-3xl">{featuredOutreach.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{featuredOutreach.description}</p>
                <Link to="/events" className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep">
                  See all outreach <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Our projects"
            title="Built to fund the work."
            description="Every subscription to our products helps power outreach days, free classes, and community support across Lagos."
            action={
              <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep">
                All projects <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group gradient-border relative flex flex-col justify-between overflow-hidden rounded-3xl bg-card p-8 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elegant)] md:p-10"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" aria-hidden />
                <div>
                  <div className="flex min-h-[88px] items-center rounded-2xl bg-secondary/60 px-5 py-4">
                    <img src={p.logo} alt={`${p.name} logo`} className="h-20 w-auto max-w-[240px] object-contain md:h-24" />
                  </div>
                  <span className="mt-6 inline-block rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {p.tag}
                  </span>
                  <h3 className="mt-5 font-display text-3xl font-medium text-foreground">{p.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Funds the mission</span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Visit {p.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-[image:var(--gradient-royal)] p-10 text-primary-foreground shadow-[var(--shadow-elegant)] md:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary-glow/25 blur-3xl" aria-hidden />
          <div className="section-mesh pointer-events-none absolute inset-0 opacity-20" aria-hidden />
          <div className="relative grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Join the network</p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight md:text-5xl text-balance">
                Every good deed multiplies. <span className="italic text-accent">Start yours today.</span>
              </h2>
              <p className="mt-5 max-w-xl text-primary-foreground/85">
                Donate, volunteer, or share what you know. Every contribution funds outreach, classes and free tools.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end lg:items-end">
              <Link
                to="/support"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Support us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/35 bg-primary-foreground/8 px-7 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/15"
              >
                Volunteer with us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
