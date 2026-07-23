import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] text-primary-foreground">
      <div className="section-mesh pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.55 0.22 265 / 0.45) 0%, transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.4 0.22 265 / 0.35) 0%, transparent 50%)",
        }}
      />
      <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        {eyebrow && (
          <div className="animate-fade-up flex items-center gap-3">
            <span className="h-px w-8 bg-accent/50" aria-hidden />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
          </div>
        )}
        <h1 className="animate-fade-up animation-delay-150 mt-5 max-w-4xl font-display text-4xl font-medium leading-[1.05] md:text-5xl lg:text-6xl text-balance">
          {title}
        </h1>
        {description && (
          <p className="animate-fade-up animation-delay-300 mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/88 md:text-xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
