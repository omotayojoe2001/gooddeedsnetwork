import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, PageHero } from "@/components/page-shell";
import { ASSETS, SITE } from "@/lib/site-data";
import { canSubmitForm, isLikelySpam, isValidEmail, recordFormSubmit } from "@/lib/form-guard";
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
  const [error, setError] = useState("");
  const [formLoadedAt] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Clear stale rate limit after 24h (housekeeping)
    const last = localStorage.getItem("gdn_contact_last_submit");
    if (last && Date.now() - Number(last) > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("gdn_contact_last_submit");
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (isLikelySpam({ honeypot, formLoadedAt })) {
      // Silent reject for bots
      setSent(true);
      return;
    }

    if (!canSubmitForm()) {
      setError("Please wait before sending another message. You can also email us directly.");
      return;
    }

    if (!name.trim() || !isValidEmail(email) || !message.trim()) {
      setError("Please fill in your name, a valid email, and your message.");
      return;
    }

    recordFormSubmit();

    const subject = encodeURIComponent(`Good Deeds Network: message from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\nReaching out as: ${role.trim() || "Not specified"}\n\n${message.trim()}`,
    );

    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Say hello. Or ask us anything."
        description="Whether you would like to give, receive, volunteer or partner, we would love to hear from you."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div className="space-y-6 sm:space-y-8">
            <ContactRow icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
            <ContactRow icon={Phone} label="Phone" value={SITE.phoneDisplay} href={`tel:${SITE.phone}`} />
            <ContactRow icon={MapPin} label="Address" value={SITE.location} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8 md:p-10"
          >
            {sent ? (
              <div className="grid place-items-center py-12 text-center sm:py-16">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-royal)] text-primary-foreground">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium text-foreground">Ready to send</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Your message is ready to send. If your email app did not open, write us directly at{" "}
                  <a href={`mailto:${SITE.email}`} className="font-semibold text-primary">
                    {SITE.email}
                  </a>
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-medium text-foreground sm:text-3xl">Send a message</h2>
                <p className="mt-2 text-sm text-muted-foreground">We reply to most messages within 48 hours.</p>

                {/* Honeypot — hidden from humans, bots often fill it */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" value={name} onChange={setName} />
                  <Field label="Email" name="email" type="email" value={email} onChange={setEmail} />
                </div>
                <div className="mt-5">
                  <Field
                    label="I am reaching out as"
                    name="role"
                    value={role}
                    onChange={setRole}
                    placeholder="Giver, receiver, volunteer, partner"
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {error && (
                  <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-[var(--shadow-card)] hover:bg-primary-deep sm:w-auto"
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
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-royal)] text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        {href ? (
          <a href={href} className="mt-1 block break-all font-display text-lg text-foreground hover:text-primary">
            {value}
          </a>
        ) : (
          <p className="mt-1 font-display text-lg text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={name !== "role"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
