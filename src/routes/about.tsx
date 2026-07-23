import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { OptimizedImage } from "@/components/optimized-image";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { ASSETS, FOUNDER_SOCIAL, SITE, SOCIAL, VIDEOS } from "@/lib/site-data";
import { ArrowRight, Facebook, Linkedin, Youtube } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About | ${SITE.name}` },
      {
        name: "description",
        content: `Founded in ${SITE.founded} by ${SITE.founder}, Good Deeds Network is a licensed nonprofit connecting givers with receivers through outreach and free education in Lagos, Nigeria.`,
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: `About ${SITE.name}` },
      { property: "og:image", content: `${SITE.url}${ASSETS.logo}` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/about` }],
  }),
  component: About,
});

const ikotunVideo = VIDEOS.find((v) => v.id === "7983qO8kXhk")!;
const classVideo = VIDEOS.find((v) => v.id === "G_L1tjpJ7Sc")!;

function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About us"
        title="Ordinary people, doing extraordinary good."
        description={`Good Deeds Network was founded in ${SITE.founded} by ${SITE.founder}. We are a licensed and registered nonprofit building a trusted platform for connecting givers and receivers.`}
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our story</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-foreground md:text-5xl">Kindness, organised.</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Good Deeds Network began in {SITE.founded} with a single question: what if generosity were as easy as ordering a ride? What if the person who has an extra bag of rice could find, safely and quickly, the family that needs it?
              </p>
              <p>
                We built a platform, and we hit the streets. Our first flagship outreach happened in{" "}
                <strong className="text-foreground">Ikotun, Lagos</strong>, distributing essentials, listening to community leaders, and mapping needs. Alongside our physical outreach, we have run multiple{" "}
                <strong className="text-foreground">free online marketing classes</strong>, giving small business owners the skills to earn independently.
              </p>
              <p>
                Today we are a growing network of volunteers, educators, and givers, all coordinated around one belief: the world gets better when good deeds compound.
              </p>
            </div>
          </div>
          <OptimizedImage
            src={ASSETS.hero}
            alt="Good Deeds Network volunteers giving out supplies in Ikotun, Lagos"
            width={1024}
            height={1024}
            className="aspect-square w-full rounded-3xl object-cover shadow-[var(--shadow-elegant)]"
          />
        </div>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Founder</p>
              <blockquote className="mt-6 font-display text-3xl font-medium leading-tight text-foreground md:text-4xl text-balance">
                "We do not have to solve every problem. We just have to make giving simple, and trust the network to do the rest."
              </blockquote>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {SITE.founder}, Founder of {SITE.name}
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href={FOUNDER_SOCIAL.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Joshua Omotayo on LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={FOUNDER_SOCIAL.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Joshua Omotayo on Facebook"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
            <OptimizedImage
              src={ASSETS.founder}
              alt={`${SITE.founder}, founder of Good Deeds Network`}
              width={800}
              height={1000}
              className="mx-auto aspect-[4/5] w-full max-w-md rounded-3xl object-cover object-top shadow-[var(--shadow-elegant)]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What we have done</p>
        <h2 className="mt-3 font-display text-4xl font-medium text-foreground md:text-5xl">Outreach and impact.</h2>

        <div className="mt-12 space-y-8">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] lg:grid lg:grid-cols-2">
            <YouTubeEmbed videoId={ikotunVideo.id} title={ikotunVideo.title} className="rounded-none" />
            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Ikotun Outreach</p>
              <h3 className="mt-2 font-display text-2xl font-medium text-foreground">Lagos, Nigeria</h3>
              <p className="mt-4 text-muted-foreground">
                Our flagship community distribution, meeting families in Ikotun with essentials, prayer and presence.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] lg:grid lg:grid-cols-2">
            <YouTubeEmbed videoId={classVideo.id} title={classVideo.title} className="rounded-none lg:order-2" />
            <div className="flex flex-col justify-center p-8 md:p-10 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Free Marketing Classes</p>
              <h3 className="mt-2 font-display text-2xl font-medium text-foreground">Online, worldwide</h3>
              <p className="mt-4 text-muted-foreground">
                Multiple cohorts of small business owners trained for free by our volunteer marketers.
              </p>
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-deep"
              >
                <Youtube className="h-4 w-4" /> Watch on YouTube
              </a>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
              <OptimizedImage
                src={ASSETS.volunteers}
                alt="Good Deeds Network volunteer mobilisation"
                className="h-48 w-full object-cover object-top md:hidden"
                width={800}
                height={400}
              />
              <div className="p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Volunteer Mobilisation</p>
                <h3 className="mt-2 font-display text-xl font-medium text-foreground">Across regions</h3>
                <p className="mt-3 text-muted-foreground">
                  A growing pool of vetted volunteers ready to deploy for outreach, teaching, and logistics.
                </p>
                <Link to="/volunteers" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep">
                  Meet our volunteers <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
              <OptimizedImage
                src={ASSETS.hero}
                alt="Good Deeds Network free resource library"
                className="h-48 w-full object-cover"
                width={800}
                height={400}
              />
              <div className="p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Free Resource Library</p>
                <h3 className="mt-2 font-display text-xl font-medium text-foreground">Digital</h3>
                <p className="mt-3 text-muted-foreground">
                  Class replays, guides and playbooks. Free access for anyone building or growing.
                </p>
                <Link to="/resources" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep">
                  Browse resources <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)]">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
            <div className="p-10 md:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our volunteers</p>
              <h2 className="mt-3 font-display text-4xl font-medium leading-tight md:text-5xl">The heart of the network.</h2>
              <p className="mt-6 text-primary-foreground/80">
                Every good deed we do is powered by volunteers. Marketers, teachers, drivers, cooks, students and professionals who give their time freely.
              </p>
              <Link
                to="/volunteers"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Meet our volunteers <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <OptimizedImage
              src={ASSETS.volunteers}
              alt="Good Deeds Network volunteers"
              width={1024}
              height={768}
              className="hidden h-full w-full object-cover lg:block"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
