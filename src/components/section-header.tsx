import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  action?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  action,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-6 ${centered ? "mx-auto max-w-3xl flex-col items-center text-center" : ""}`}
    >
      <div className={centered ? "flex flex-col items-center" : "max-w-2xl"}>
        <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
          <span className={`h-px w-8 ${light ? "bg-accent/60" : "bg-primary/30"}`} aria-hidden />
          <p
            className={`text-[11px] font-bold uppercase tracking-[0.22em] ${light ? "text-accent" : "text-primary"}`}
          >
            {eyebrow}
          </p>
          <span className={`h-px w-8 ${light ? "bg-accent/60" : "bg-primary/30"}`} aria-hidden />
        </div>
        <h2
          className={`mt-4 font-display text-3xl font-medium leading-tight md:text-4xl lg:text-[2.75rem] text-balance ${
            light ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p className={`mt-4 text-base leading-relaxed md:text-lg ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
