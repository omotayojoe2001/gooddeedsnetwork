import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { SITE, SOCIAL } from "@/lib/site-data";

const socialLinks = [
  { href: SOCIAL.youtube, label: "YouTube", icon: Youtube },
  { href: SOCIAL.facebook, label: "Facebook", icon: Facebook },
  { href: SOCIAL.instagram, label: "Instagram", icon: Instagram },
  { href: SOCIAL.linkedin, label: "LinkedIn", icon: Linkedin },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-[image:var(--gradient-hero)] text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo link={false} imageClassName="h-12 w-12 rounded-xl object-cover shadow-[var(--shadow-card)]" />
            <p className="mt-5 text-sm leading-relaxed text-primary-foreground/75">
              Connecting givers and receivers since {SITE.founded}. A licensed and registered nonprofit founded by {SITE.founder}.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link to="/about" className="hover:text-accent">About us</Link></li>
              <li><Link to="/volunteers" className="hover:text-accent">Volunteers</Link></li>
              <li><Link to="/projects" className="hover:text-accent">Projects</Link></li>
              <li><Link to="/events" className="hover:text-accent">Events</Link></li>
              <li><Link to="/resources" className="hover:text-accent">Free resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">Get involved</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link to="/support" className="hover:text-accent">Support us</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Volunteer with us</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Partner with us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {SITE.location}
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 text-primary-foreground/80 transition-colors hover:border-accent hover:bg-primary-foreground/5 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Licensed and registered nonprofit.</p>
          <p>Founded by {SITE.founder}</p>
        </div>
      </div>
    </footer>
  );
}
