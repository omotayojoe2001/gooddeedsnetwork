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
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.55 0.22 265 / 0.5) 0%, transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.4 0.22 265 / 0.4) 0%, transparent 50%)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,oklch(0.18_0.16_268/0.25)_100%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        {eyebrow && (
          <p className="animate-fade-up mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        )}
        <h1 className="animate-fade-up animation-delay-150 max-w-4xl font-display text-4xl font-medium leading-[1.05] md:text-6xl text-balance">
          {title}
        </h1>
        {description && (
          <p className="animate-fade-up animation-delay-300 mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
