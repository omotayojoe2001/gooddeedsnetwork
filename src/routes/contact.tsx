import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/page-shell";
import { ASSETS, SITE } from "@/lib/site-data";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact | ${SITE.name}` },
      {
        name: "description",
        content: "Get in touch with Good Deeds Network. Volunteer, partner, request support, or just say hello.",
      },
      { property: "og:title", content: `Contact ${SITE.name}` },
      { property: "og:image", content: ASSETS.logo },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Say hello. Or ask us anything."
        description="Whether you would like to give, receive, volunteer or partner, we would love to hear from you."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8">
            <ContactRow icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
            <ContactRow icon={Phone} label="Phone" value={SITE.phoneDisplay} href={`tel:${SITE.phone}`} />
            <ContactRow icon={MapPin} label="Address" value={SITE.location} />

            <div className="rounded-2xl border border-border bg-secondary/50 p-6">
              <p className="font-display text-lg font-medium text-foreground">Volunteer with us</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us your skill. Marketing, teaching, logistics, tech. We will match you with the next outreach or class.
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] md:p-10"
          >
            {sent ? (
              <div className="grid place-items-center py-16 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-royal)] text-primary-foreground">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium text-foreground">Message sent</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Thanks for reaching out. A member of the Good Deeds Network team will get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-3xl font-medium text-foreground">Send a message</h2>
                <p className="mt-2 text-sm text-muted-foreground">We reply to most messages within 48 hours.</p>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <Field label="Full name" name="name" />
                  <Field label="Email" name="email" type="email" />
                </div>
                <div className="mt-5">
                  <Field label="I am reaching out as" name="role" placeholder="Giver, receiver, volunteer, partner" />
                </div>
                <div className="mt-5">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] hover:bg-primary-deep"
                >
                  Send message <Send className="h-4 w-4" />
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </PageShell>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-royal)] text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        {href ? (
          <a href={href} className="mt-1 block font-display text-lg text-foreground hover:text-primary">
            {value}
          </a>
        ) : (
          <p className="mt-1 font-display text-lg text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
