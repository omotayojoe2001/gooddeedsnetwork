import { HeartHandshake, GraduationCap, Users } from "lucide-react";

const nodes = [
  {
    icon: HeartHandshake,
    title: "Give",
    body: "Share resources, time, skills, or presence with someone who needs them.",
    step: "01",
  },
  {
    icon: Users,
    title: "Receive",
    body: "Access community, mentorship, and material support when you need it.",
    step: "02",
  },
  {
    icon: GraduationCap,
    title: "Learn",
    body: "Join free classes and resources built by volunteer educators.",
    step: "03",
  },
] as const;

export function MissionMindMap() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl">
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 md:block" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-2xl md:block" aria-hidden />

      <svg className="pointer-events-none absolute inset-x-0 top-24 hidden h-32 w-full md:block" viewBox="0 0 900 120" fill="none" aria-hidden>
        <path d="M120 60 H360" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="8 8" />
        <path d="M540 60 H780" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="8 8" />
        <circle cx="450" cy="60" r="10" fill="oklch(0.32 0.19 268 / 0.15)" stroke="oklch(0.82 0.14 85 / 0.6)" strokeWidth="2" />
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="900" y2="0">
            <stop stopColor="oklch(0.32 0.19 268 / 0.35)" />
            <stop offset="0.5" stopColor="oklch(0.82 0.14 85 / 0.5)" />
            <stop offset="1" stopColor="oklch(0.32 0.19 268 / 0.35)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative grid gap-5 md:grid-cols-3 md:gap-6">
        {nodes.map((node, i) => (
          <div
            key={node.title}
            className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[var(--shadow-elegant)] md:pt-8"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="absolute -right-4 -top-4 font-display text-7xl font-bold text-primary/[0.04]">{node.step}</div>
            <div className="relative flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-royal)] text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-105 [transform:perspective(500px)_rotateY(-6deg)_rotateX(4deg)]">
                  <node.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-medium text-foreground md:text-2xl">{node.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{node.body}</p>
              </div>
            </div>
            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-0 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-lg text-center text-sm font-medium leading-relaxed text-primary/75">
        One cycle: give generously, receive with dignity, learn continuously. That is how good deeds compound.
      </p>
    </div>
  );
}
