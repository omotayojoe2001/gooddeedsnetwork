import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { ASSETS, SITE } from "@/lib/site-data";
import { ArrowRight, Heart, Users, HandHeart } from "lucide-react";

export const Route = createFileRoute("/volunteers")({
  head: () => ({
    meta: [
      { title: `Volunteers | ${SITE.name}` },
      {
        name: "description",
        content: "Meet the volunteers powering Good Deeds Network. Join our team and lend a hand for outreach, classes, and community support.",
      },
      { property: "og:title", content: `Volunteers | ${SITE.name}` },
      { property: "og:image", content: ASSETS.logo },
    ],
  }),
  component: Volunteers,
});

function Volunteers() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our volunteers"
        title="The heart of the network."
        description="Every outreach, every class, and every act of kindness is powered by people who choose to give their time. This is who we are."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elegant)]">
          <img
            src={ASSETS.volunteers}
            alt="Good Deeds Network volunteers needed. Join our team."
            className="w-full object-cover"
            width={1400}
            height={900}
          />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Why we serve",
              body: "We believe generosity should be organised, dignified, and accessible. Volunteers make that possible on the ground and online.",
            },
            {
              icon: Users,
              title: "Who we need",
              body: "Marketers, teachers, designers, drivers, cooks, students, and professionals. If you have time or skill, there is a place for you.",
            },
            {
              icon: HandHeart,
              title: "How you help",
              body: "Outreach days in Ikotun, free class facilitation, content creation, logistics, and community support across Lagos and beyond.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-royal)] text-primary-foreground">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-medium text-foreground">{item.title}</h3>
              <p className="mt-3 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-[image:var(--gradient-royal)] p-10 text-center text-primary-foreground shadow-[var(--shadow-elegant)] md:p-14">
          <h2 className="font-display text-3xl font-medium md:text-4xl">Ready to lend a hand?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Tell us your skill and availability. We will match you with the next outreach, class, or community need.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Join as a volunteer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
