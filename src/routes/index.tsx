import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { OptimizedImage } from "@/components/optimized-image";
import { MissionMindMap } from "@/components/mission-mind-map";
import { VideoCarousel } from "@/components/video-carousel";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { useCountUp, useInView } from "@/hooks/use-count-up";
import { ASSETS, IMPACT_CAROUSEL_VIDEOS, PROJECTS, SITE, STATS, VIDEOS } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} | ${SITE.tagline}` },
      {
        name: "description",
        content:
          "Good Deeds Network is a nonprofit in Lagos, Nigeria connecting givers and receivers through community outreach in Ikotun, free marketing classes, and volunteer powered support.",
      },
      {
        name: "keywords",
        content:
          "Good Deeds Network, nonprofit Nigeria, Ikotun outreach, Lagos charity, free marketing classes, volunteer Nigeria, genrev.ng, community support",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: `${SITE.name} | ${SITE.tagline}` },
      {
        property: "og:description",
        content:
          "Community outreach, free classes, and a network built on good deeds. Based in Lagos, Nigeria.",
      },
      { property: "og:image", content: `${SITE.url}${ASSETS.logo}` },
      { property: "og:url", content: SITE.url },
    ],
    links: [{ rel: "canonical", href: SITE.url }],
  }),
  component: Home,
});

function StatCounter({ value, label }: { value: string; label: string }) {
  const { ref, inView } = useInView(0.3);
  const display = useCountUp(value, 1800, inView);

  return (
    <div ref={ref}>
      <dt className="font-display text-3xl font-semibold tabular-nums text-accent md:text-4xl">{display}</dt>
      <dd className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/65">{label}</dd>
    </div>
  );
}

function Home() {
  const featuredOutreach = VIDEOS.find((v) => v.id === "7983qO8kXhk");

  return (
    <PageShell>
      <section className="relative min-h-[92vh] overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={ASSETS.hero}
            alt="Good Deeds Network volunteers at a community outreach in Ikotun, Lagos"
            className="h-full w-full object-cover animate-hero-zoom"
            width={1600}
            height={900}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-deep/95 via-primary/85 to-primary/60" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, oklch(0.55 0.22 265 / 0.45) 0%, transparent 55%), radial-gradient(circle at 85% 90%, oklch(0.4 0.22 265 / 0.35) 0%, transparent 50%)",
            }}
          />
          <div className="hero-particles absolute inset-0 overflow-hidden" aria-hidden>
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="hero-particle absolute rounded-full bg-accent/20 blur-sm"
                style={{
                  width: `${8 + i * 4}px`,
                  height: `${8 + i * 4}px`,
                  left: `${10 + i * 14}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.7}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 py-28">
          <div className="max-w-3xl">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 animate-float" /> Since {SITE.founded}
            </div>
            <h1 className="animate-fade-up animation-delay-150 mt-7 font-display text-5xl font-medium leading-[1.02] text-primary-foreground md:text-7xl lg:text-[5.25rem]">
              A network for
              <span className="hero-shimmer mt-1 block italic text-accent">good deeds.</span>
            </h1>
            <p className="animate-fade-up animation-delay-300 mt-7 max-w-xl text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
              We connect givers with receivers. The people who have something to share, and the people who need to receive. Together we build a kinder economy.
            </p>
            <div className="animate-fade-up animation-delay-450 mt-10 flex flex-wrap gap-3">
              <Link
                to="/support"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5"
              >
                Support our work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/5 px-7 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/15"
              >
                Our story
              </Link>
            </div>

            <dl className="animate-fade-up animation-delay-600 mt-16 grid grid-cols-3 gap-6 border-t border-primary-foreground/15 pt-8">
              {STATS.map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} />
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our mission</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-foreground md:text-4xl text-balance">
            Two hands. One network. Endless good.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Everyone has something to give, and everyone needs something to receive. From Ikotun outreach to free online classes, we make generosity intentional and dignified.
          </p>
        </div>
        <MissionMindMap />
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Play className="h-4 w-4" /> Watch our impact
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium text-foreground md:text-4xl text-balance">
                Stories and classes that inspire.
              </h2>
            </div>
            <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep">
              All events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10">
            <VideoCarousel videos={IMPACT_CAROUSEL_VIDEOS} />
          </div>

          {featuredOutreach && (
            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] lg:grid lg:grid-cols-2">
              <YouTubeEmbed videoId={featuredOutreach.id} title={featuredOutreach.title} className="rounded-none lg:min-h-[280px]" />
              <div className="flex flex-col justify-center p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Featured outreach</p>
                <h3 className="mt-2 font-display text-2xl font-medium text-foreground">{featuredOutreach.title}</h3>
                <p className="mt-3 text-muted-foreground">{featuredOutreach.description}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our projects</p>
            <h2 className="mt-3 font-display text-3xl font-medium text-foreground md:text-4xl">Built to fund the work.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Every subscription to our products helps power outreach days, free classes, and community support across Lagos.
            </p>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep">
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]"
            >
              <div>
                <div className="flex min-h-[72px] items-center">
                  <img src={p.logo} alt={`${p.name} logo`} className="h-16 w-auto max-w-[220px] object-contain md:h-20" />
                </div>
                <span className="mt-6 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
                  {p.tag}
                </span>
                <h3 className="mt-4 font-display text-3xl font-medium text-foreground">{p.name}</h3>
                <p className="mt-3 text-muted-foreground">{p.body}</p>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Visit {p.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-royal)] p-10 text-primary-foreground shadow-[var(--shadow-elegant)] md:p-16">
          <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-medium leading-tight md:text-5xl text-balance">
                Every good deed multiplies. <span className="italic text-accent">Start yours today.</span>
              </h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">
                Donate, volunteer, or share what you know. Every contribution funds outreach, classes and free tools.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                to="/support"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Support us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
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
