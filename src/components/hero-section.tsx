import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { OptimizedImage } from "@/components/optimized-image";
import { useCountUp, useInView } from "@/hooks/use-count-up";
import { ASSETS, SITE, STATS } from "@/lib/site-data";

function StatCounter({ value, label }: { value: string; label: string }) {
  const { ref, inView } = useInView(0.3);
  const display = useCountUp(value, 1800, inView);

  return (
    <div ref={ref} className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3 backdrop-blur-sm">
      <dt className="font-display text-2xl font-semibold tabular-nums text-accent sm:text-3xl">{display}</dt>
      <dd className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/60 sm:text-xs">{label}</dd>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background layer — lighter on mobile so people stay visible */}
      <div className="absolute inset-0 lg:hidden">
        <OptimizedImage
          src={ASSETS.hero}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-[center_30%]"
          width={800}
          height={600}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/55 via-primary/70 to-primary-deep/95" />
      </div>

      <div className="absolute inset-0 hidden lg:block">
        <OptimizedImage
          src={ASSETS.hero}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center animate-hero-zoom"
          width={1600}
          height={900}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/92 via-primary/78 to-primary/45" />
      </div>

      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-primary-glow/20 blur-3xl" aria-hidden />

      <div className="section-mesh pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:py-20 lg:min-h-[90vh] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-24">
        <div className="order-2 lg:order-1">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 animate-float" /> Since {SITE.founded}
          </div>

          <h1 className="animate-fade-up animation-delay-150 mt-6 font-display text-[2.65rem] font-medium leading-[1.02] text-primary-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            A network for
            <span className="hero-shimmer mt-1 block italic">good deeds.</span>
          </h1>

          <p className="animate-fade-up animation-delay-300 mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/88 sm:text-lg">
            We connect givers with receivers across Lagos and beyond. Share what you have. Receive what you need. Grow together.
          </p>

          <div className="animate-fade-up animation-delay-450 mt-8 flex flex-wrap gap-3">
            <Link
              to="/support"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-[0_12px_40px_-12px_oklch(0.82_0.14_85/0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-12px_oklch(0.82_0.14_85/0.85)]"
            >
              Support our work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/35 bg-primary-foreground/8 px-6 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur-md transition-colors hover:bg-primary-foreground/15"
            >
              Our story
            </Link>
          </div>

          <dl className="animate-fade-up animation-delay-600 mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <StatCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </dl>
        </div>

        {/* Always-visible hero image card — fixes mobile visibility */}
        <div className="order-1 lg:order-2">
          <div className="animate-fade-up animation-delay-300 relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/40 via-primary-glow/30 to-transparent blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-primary-foreground/20 shadow-[0_32px_80px_-24px_oklch(0.18_0.16_268/0.65)]">
              <OptimizedImage
                src={ASSETS.hero}
                alt="Good Deeds Network volunteers at Ikotun outreach, Lagos"
                className="aspect-[4/5] w-full object-cover object-[center_28%] sm:aspect-[5/6] lg:aspect-[4/5]"
                width={720}
                height={900}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="flex items-start gap-2 rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-4 backdrop-blur-md">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-display text-sm font-semibold text-primary-foreground">Ikotun Outreach</p>
                    <p className="mt-0.5 text-xs text-primary-foreground/75">Lagos, Nigeria · Our flagship community program</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
