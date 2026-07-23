import { useCallback, useState } from "react";
import { ArrowRight, Heart, Lock } from "lucide-react";
import { isValidEmail } from "@/lib/form-guard";
import { MIN_DONATION_NAIRA, SITE } from "@/lib/site-data";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        firstname?: string;
        lastname?: string;
        amount: number;
        currency?: string;
        ref?: string;
        metadata?: Record<string, unknown>;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string | undefined;

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

function loadPaystackScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.PaystackPop) {
      resolve();
      return;
    }
    const existing = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Paystack failed to load")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Paystack failed to load"));
    document.body.appendChild(script);
  });
}

export function SupportProjectDonate() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const donate = useCallback(async () => {
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const naira = Number(String(amount).replace(/,/g, ""));
    if (!naira || naira < MIN_DONATION_NAIRA) {
      setError(`Minimum support amount is ₦${MIN_DONATION_NAIRA}.`);
      return;
    }
    if (!reason.trim()) {
      setError("Please tell us why you are supporting our projects.");
      return;
    }
    if (!PAYSTACK_KEY) {
      setError(`We could not open checkout right now. Please email ${SITE.email} to support us.`);
      return;
    }

    setLoading(true);
    try {
      await loadPaystackScript();
      window.PaystackPop?.setup({
        key: PAYSTACK_KEY,
        email: email.trim(),
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        amount: Math.round(naira * 100),
        currency: "NGN",
        ref: `gdn_project_${Date.now()}`,
        metadata: {
          custom_fields: [
            { display_name: "First name", variable_name: "first_name", value: firstName.trim().slice(0, 80) },
            { display_name: "Last name", variable_name: "last_name", value: lastName.trim().slice(0, 80) },
            { display_name: "Why supporting", variable_name: "support_reason", value: reason.trim().slice(0, 200) },
          ],
        },
        callback: () => {
          setSuccess(true);
          setAmount("");
          setReason("");
        },
        onClose: () => setLoading(false),
      }).openIframe();
    } catch {
      setError("Unable to open Paystack right now. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }, [amount, email, firstName, lastName, reason]);

  if (success) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-card p-6 text-center shadow-[var(--shadow-card)] sm:p-8">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <Heart className="h-6 w-6" />
        </div>
        <h3 className="mt-5 font-display text-xl font-medium text-foreground">Thank you for supporting our projects</h3>
        <p className="mt-2 text-sm text-muted-foreground">Your gift helps us build platforms that serve communities across Nigeria.</p>
        <button type="button" onClick={() => setSuccess(false)} className="mt-6 text-sm font-semibold text-primary hover:text-primary-deep">
          Support again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6 lg:sticky lg:top-24">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Lock className="h-3.5 w-3.5" /> Secured by Paystack
      </div>
      <h3 className="mt-3 font-display text-xl font-medium text-foreground sm:text-2xl">Support our projects</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">Any amount from ₦{MIN_DONATION_NAIRA}. No fixed packages.</p>

      <div className="mt-5 space-y-3.5">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="First name" id="support-first" value={firstName} onChange={setFirstName} autoComplete="given-name" />
          <Field label="Last name" id="support-last" value={lastName} onChange={setLastName} autoComplete="family-name" />
        </div>
        <Field label="Email" id="support-email" type="email" value={email} onChange={setEmail} autoComplete="email" inputMode="email" />
        <div>
          <label htmlFor="support-amount" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Amount (NGN)
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">₦</span>
            <input
              id="support-amount"
              type="number"
              inputMode="numeric"
              min={MIN_DONATION_NAIRA}
              step={100}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`${MIN_DONATION_NAIRA} or more`}
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="support-reason" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Why are you supporting us?
          </label>
          <textarea
            id="support-reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Tell us what inspired you to give..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={donate}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] hover:bg-primary-deep disabled:opacity-50"
        >
          {loading ? "Opening Paystack..." : "Support with Paystack"}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
        Card details are handled by Paystack. We never store them.
      </p>
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  autoComplete,
  inputMode,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  inputMode?: "email" | "numeric" | "text";
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={inputClass}
      />
    </div>
  );
}
