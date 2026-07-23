import { HeartHandshake, GraduationCap, Users } from "lucide-react";

const nodes = [
  {
    icon: HeartHandshake,
    title: "Give",
    body: "Share resources, time, skills, or presence.",
    position: "left",
  },
  {
    icon: Users,
    title: "Receive",
    body: "Access community, mentorship, and support.",
    position: "center",
  },
  {
    icon: GraduationCap,
    title: "Learn",
    body: "Join free classes and grow with our educators.",
    position: "right",
  },
] as const;

export function MissionMindMap() {
  return (
    <div className="relative mx-auto mt-14 max-w-4xl">
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 800 280"
        fill="none"
        aria-hidden
      >
        <path d="M130 140 C250 140, 280 80, 400 80" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/25" />
        <path d="M670 140 C550 140, 520 80, 400 80" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/25" />
        <path d="M130 140 C250 140, 280 200, 400 200" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/25" />
        <path d="M670 140 C550 140, 520 200, 400 200" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/25" />
        <circle cx="400" cy="140" r="8" className="fill-primary/30" />
        <circle cx="400" cy="80" r="5" className="fill-accent/60" />
        <circle cx="400" cy="200" r="5" className="fill-accent/60" />
      </svg>

      <div className="relative grid gap-6 md:grid-cols-3">
        {nodes.map((node) => (
          <div
            key={node.title}
            className="group relative flex flex-col items-center text-center"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-2xl bg-primary/10 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
              <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-royal)] text-primary-foreground shadow-[0_8px_24px_-6px_oklch(0.32_0.19_268/0.45)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 [transform:perspective(400px)_rotateX(8deg)]">
                <node.icon className="h-7 w-7" />
              </div>
            </div>
            <h3 className="mt-5 font-display text-2xl font-medium text-foreground">{node.title}</h3>
            <p className="mt-2 max-w-[200px] text-sm leading-relaxed text-muted-foreground">{node.body}</p>
            <span className="mt-4 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-12" />
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm font-medium text-primary/80">
        Give flows into the network. The network lifts those who receive. Learning keeps the cycle growing.
      </p>
    </div>
  );
}
