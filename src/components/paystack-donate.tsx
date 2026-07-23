import { useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import { DONATION_TIERS, SITE } from "@/lib/site-data";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
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

type PaystackDonateProps = {
  amountKobo: number;
  label: string;
  featured?: boolean;
  className?: string;
};

export function PaystackDonateButton({ amountKobo, label, featured = false, className = "" }: PaystackDonateProps) {
  const [loading, setLoading] = useState(false);

  const donate = useCallback(async () => {
    if (!PAYSTACK_KEY) {
      window.location.href = `mailto:${SITE.email}?subject=Donation%20to%20Good%20Deeds%20Network&body=Hello,%20I%20would%20like%20to%20support%20Good%20Deeds%20Network.`;
      return;
    }

    const email = window.prompt("Enter your email to continue with your donation:");
    if (!email) return;

    setLoading(true);
    try {
      await loadPaystackScript();
      window.PaystackPop?.setup({
        key: PAYSTACK_KEY,
        email,
        amount: amountKobo,
        currency: "NGN",
        ref: `gdn_${Date.now()}`,
        metadata: { custom_fields: [{ display_name: "Organization", variable_name: "organization", value: SITE.name }] },
        callback: () => {
          alert("Thank you for supporting Good Deeds Network. Your gift makes outreach and free education possible.");
        },
        onClose: () => setLoading(false),
      }).openIframe();
    } catch {
      alert("Unable to open payment right now. Please contact us directly.");
    } finally {
      setLoading(false);
    }
  }, [amountKobo]);

  return (
    <button
      type="button"
      onClick={donate}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all disabled:opacity-60 ${
        featured
          ? "bg-accent text-accent-foreground hover:-translate-y-0.5"
          : "bg-primary text-primary-foreground hover:bg-primary-deep"
      } ${className}`}
    >
      {loading ? "Opening..." : label} <ArrowRight className="h-4 w-4" />
    </button>
  );
}

export function DonationTiers() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {DONATION_TIERS.map((tier) => (
        <div
          key={tier.name}
          className={`relative flex flex-col rounded-2xl border p-8 shadow-[var(--shadow-card)] ${
            tier.featured
              ? "border-primary bg-[image:var(--gradient-hero)] text-primary-foreground"
              : "border-border bg-card"
          }`}
        >
          {tier.featured && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
              Most impact
            </span>
          )}
          <p className={`text-xs font-semibold uppercase tracking-wider ${tier.featured ? "text-accent" : "text-primary"}`}>
            {tier.name}
          </p>
          <p className={`mt-3 font-display text-5xl font-medium ${tier.featured ? "text-primary-foreground" : "text-foreground"}`}>
            {tier.amountDisplay}
          </p>
          <p className={`mt-4 flex-1 ${tier.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
            {tier.body}
          </p>
          <div className="mt-8">
            <PaystackDonateButton amountKobo={tier.amount} label={tier.cta} featured={tier.featured} className="w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CustomDonation() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const donateCustom = useCallback(async () => {
    const naira = Number(amount.replace(/,/g, ""));
    if (!naira || naira < 100) {
      alert("Please enter at least ₦100.");
      return;
    }

    if (!PAYSTACK_KEY) {
      window.location.href = `mailto:${SITE.email}?subject=Custom%20Donation&body=I%20would%20like%20to%20donate%20₦${naira}%20to%20Good%20Deeds%20Network.`;
      return;
    }

    const email = window.prompt("Enter your email to continue with your donation:");
    if (!email) return;

    setLoading(true);
    try {
      await loadPaystackScript();
      window.PaystackPop?.setup({
        key: PAYSTACK_KEY,
        email,
        amount: naira * 100,
        currency: "NGN",
        ref: `gdn_custom_${Date.now()}`,
        callback: () => alert("Thank you for your generous support."),
        onClose: () => setLoading(false),
      }).openIframe();
    } catch {
      alert("Unable to open payment right now. Please contact us directly.");
    } finally {
      setLoading(false);
    }
  }, [amount]);

  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <p className="text-center font-display text-lg font-medium text-foreground">Give any amount</p>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Every gift, large or small, fuels outreach, classes, and free resources.
      </p>
      <div className="mt-5 flex gap-3">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">₦</span>
          <input
            type="number"
            min={100}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="5,000"
            className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button
          type="button"
          onClick={donateCustom}
          disabled={loading}
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-deep disabled:opacity-60"
        >
          {loading ? "..." : "Give"}
        </button>
      </div>
      {!PAYSTACK_KEY && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Online payments will activate once Paystack is configured. You can also email us to give.
        </p>
      )}
    </div>
  );
}
