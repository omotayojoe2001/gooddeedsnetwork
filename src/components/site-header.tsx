import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Users,
  Layers,
  BookOpen,
  Mail,
  FolderKanban,
  CalendarDays,
  FileText,
  GraduationCap,
} from "lucide-react";
import { BrandLogo } from "./brand-logo";

const nav = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/about", label: "About", icon: Info },
  { to: "/volunteers", label: "Volunteers", icon: Users },
  {
    label: "Impact",
    icon: Layers,
    children: [
      { to: "/projects", label: "Projects", icon: FolderKanban },
      { to: "/events", label: "Events", icon: CalendarDays },
    ],
  },
  {
    label: "Learn",
    icon: BookOpen,
    children: [
      { to: "/resources", label: "Free Resources", icon: FileText },
      { to: "/resources/classes", label: "Free Classes", icon: GraduationCap },
    ],
  },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

function NavLink({
  to,
  label,
  icon: Icon,
  exact,
  onClick,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  exact?: boolean;
  onClick?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = exact ? pathname === to : pathname.startsWith(to);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-1 px-3 py-2 transition-all duration-300 ${
        active ? "text-primary" : "text-foreground/70 hover:text-primary"
      }`}
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-xl border transition-all duration-300 [transform:perspective(300px)_rotateX(6deg)] group-hover:-translate-y-0.5 group-hover:[transform:perspective(300px)_rotateX(0deg)_translateY(-2px)] ${
          active
            ? "border-primary/30 bg-primary/10 shadow-[0_6px_20px_-6px_oklch(0.32_0.19_268/0.35)]"
            : "border-border/60 bg-card/80 shadow-sm group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:shadow-[0_8px_24px_-8px_oklch(0.32_0.19_268/0.25)]"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-[11px] font-semibold tracking-wide">{label}</span>
      <span
        className={`absolute -bottom-0.5 h-0.5 rounded-full bg-accent transition-all duration-300 ${
          active ? "w-8" : "w-0 group-hover:w-6"
        }`}
      />
    </Link>
  );
}

function NavDropdown({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof Layers;
  children: readonly { to: string; label: string; icon: typeof Home }[];
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = children.some((c) => pathname.startsWith(c.to));

  return (
    <div className="group relative">
      <button
        type="button"
        className={`relative flex flex-col items-center gap-1 px-3 py-2 transition-all duration-300 ${
          active ? "text-primary" : "text-foreground/70 hover:text-primary"
        }`}
      >
        <span
          className={`grid h-9 w-9 place-items-center rounded-xl border transition-all duration-300 [transform:perspective(300px)_rotateX(6deg)] group-hover:-translate-y-0.5 group-hover:[transform:perspective(300px)_rotateX(0deg)_translateY(-2px)] ${
            active
              ? "border-primary/30 bg-primary/10 shadow-[0_6px_20px_-6px_oklch(0.32_0.19_268/0.35)]"
              : "border-border/60 bg-card/80 shadow-sm group-hover:border-primary/20 group-hover:bg-primary/5"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="flex items-center gap-0.5 text-[11px] font-semibold tracking-wide">
          {label}
          <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
        </span>
        <span
          className={`absolute -bottom-0.5 h-0.5 rounded-full bg-accent transition-all duration-300 ${
            active ? "w-8" : "w-0 group-hover:w-6"
          }`}
        />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 mt-1 w-52 -translate-x-1/2 rounded-xl border border-border bg-popover/95 p-2 opacity-0 shadow-[var(--shadow-elegant)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {children.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
          >
            <c.icon className="h-4 w-4 text-primary/70" />
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/30 bg-background/88 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        <BrandLogo imageClassName="h-10 w-10 rounded-xl object-cover shadow-[var(--shadow-card)] ring-1 ring-border/50 sm:h-11 sm:w-11" />

        <nav className="hidden items-end gap-1 lg:flex">
          {nav.map((item) =>
            "children" in item ? (
              <NavDropdown key={item.label} label={item.label} icon={item.icon} children={item.children} />
            ) : (
              <NavLink key={item.to} to={item.to} label={item.label} icon={item.icon} exact={"exact" in item ? item.exact : false} />
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/support"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-[var(--shadow-elegant)]"
          >
            Support us
          </Link>
        </div>

        <button type="button" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {nav.map((item) =>
              "children" in item ? (
                <div key={item.label} className="py-2">
                  <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <item.icon className="h-3.5 w-3.5" /> {item.label}
                  </div>
                  {item.children.map((c) => (
                    <Link key={c.to} to={c.to} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/80">
                      <c.icon className="h-4 w-4 text-primary/70" /> {c.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80"
                >
                  <item.icon className="h-4 w-4 text-primary/70" /> {item.label}
                </Link>
              ),
            )}
            <Link
              to="/support"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Support us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
