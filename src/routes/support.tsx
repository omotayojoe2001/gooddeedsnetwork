import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { CustomDonation, DonationTiers } from "@/components/paystack-donate";
import { ASSETS, SITE } from "@/lib/site-data";
import { ArrowRight, Heart, HandHeart, Megaphone, Package } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: `Support Us | ${SITE.name}` },
      {
        name: "description",
        content: "Support Good Deeds Network. Donate, volunteer, partner, or use our products to fund community outreach and free education.",
      },
      { property: "og:title", content: `Support ${SITE.name}` },
      { property: "og:description", content: "Every good deed multiplies. Here is how to be part of it." },
      { property: "og:image", content: ASSETS.logo },
    ],
  }),
  component: Support,
});

function Support() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Support us"
        title="Fund the good. Multiply the deed."
        description="Every naira, every hour and every skill you share turns into outreach, classes and free tools for people who need them most."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Heart, title: "Donate", body: "One time or recurring gifts, direct to the network." },
            { icon: HandHeart, title: "Volunteer", body: "Give your time, skill or presence at outreach and classes." },
            { icon: Package, title: "In kind", body: "Send goods, supplies or equipment to fuel an outreach." },
            { icon: Megaphone, title: "Spread the word", body: "Tell your network. Every share is a good deed." },
          ].map((w) => (
            <div key={w.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-royal)] text-primary-foreground">
                <w.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-medium text-foreground">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Choose a gift</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-foreground md:text-5xl">Every amount, a whole story.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Give any amount that fits your heart. Online payments are powered by Paystack.
            </p>
          </div>
          <div className="mt-14">
            <DonationTiers />
          </div>
          <CustomDonation />
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Prefer a bank transfer or in kind gift?{" "}
            <Link to="/contact" className="font-semibold text-primary hover:text-primary-deep">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl border border-border bg-card p-10 shadow-[var(--shadow-card)] md:p-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Support by using</p>
          <h2 className="mt-3 font-display text-4xl font-medium text-foreground md:text-5xl">Grow your business. Fund the mission.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Our products, <strong className="text-foreground">genrev.ng</strong> for businesses and{" "}
            <strong className="text-foreground">genrev.app</strong> for creators, are built by Good Deeds Network. Every subscription helps fund our outreach and free classes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] hover:bg-primary-deep"
            >
              Explore projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
