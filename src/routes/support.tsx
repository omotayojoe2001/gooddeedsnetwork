import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { SupportProjectDonate } from "@/components/paystack-donate";
import { ASSETS, SITE, SUPPORT_PROJECTS } from "@/lib/site-data";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: `Support Our Projects | ${SITE.name}` },
      {
        name: "description",
        content: "Support Good Deeds Network projects with any amount from ₦100. Help build our platform, GenRev, AI education tools, and student data initiatives.",
      },
      { property: "og:title", content: `Support Our Projects | ${SITE.name}` },
      { property: "og:image", content: `${SITE.url}${ASSETS.logo}` },
    ],
  }),
  component: Support,
});

const statusStyles = {
  live: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20",
  in_progress: "bg-amber-500/10 text-amber-800 ring-amber-500/20",
  coming_soon: "bg-muted text-muted-foreground ring-border",
} as const;

function Support() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Support our projects"
        title="Back the work we are building."
        description="Give any amount from ₦100. Every naira helps us ship platforms for givers, students, and communities."
      />

      <section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-12 xl:grid-cols-[1fr_420px]">
          {/* Projects — left on desktop */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Our projects</p>
            <h2 className="mt-2 font-display text-2xl font-medium text-foreground sm:text-3xl">What your support builds</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Live products channel profits back to Good Deeds Network. In progress and coming soon projects are listed below.
            </p>

            <ul className="mt-6 space-y-3">
              {SUPPORT_PROJECTS.map((p) => {
                const inner = (
                  <>
                    {"logo" in p && p.logo ? (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-background p-2">
                        <img src={p.logo} alt="" className="max-h-full max-w-full object-contain" />
                      </div>
                    ) : (
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-royal)] font-display text-lg font-semibold text-primary-foreground">
                        {p.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-base font-medium text-foreground sm:text-lg">{p.name}</h3>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-inset ${statusStyles[p.status]}`}
                        >
                          {p.statusLabel}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                      {"profitNote" in p && p.profitNote && (
                        <p className="mt-1.5 text-xs font-medium text-primary">Every profit supports Good Deeds Network.</p>
                      )}
                    </div>
                    {"url" in p && p.url && (
                      <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    )}
                  </>
                );

                return (
                  <li key={p.name}>
                    {"url" in p && p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/25 hover:bg-card/80 sm:p-5"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Donation form — right on desktop, below projects on mobile */}
          <SupportProjectDonate />
        </div>
      </section>
    </PageShell>
  );
}
