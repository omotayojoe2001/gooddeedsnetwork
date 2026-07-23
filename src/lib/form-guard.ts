const RATE_LIMIT_KEY = "gdn_contact_last_submit";
const RATE_LIMIT_MS = 60 * 60 * 1000; // 1 hour between submissions per browser

export function canSubmitForm(): boolean {
  if (typeof window === "undefined") return true;
  const last = localStorage.getItem(RATE_LIMIT_KEY);
  if (!last) return true;
  return Date.now() - Number(last) > RATE_LIMIT_MS;
}

export function recordFormSubmit() {
  if (typeof window === "undefined") return;
  localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
}

/** Reject bots that fill hidden fields or submit too fast */
export function isLikelySpam(opts: { honeypot: string; formLoadedAt: number; minSeconds?: number }) {
  const { honeypot, formLoadedAt, minSeconds = 3 } = opts;
  if (honeypot.trim().length > 0) return true;
  if (Date.now() - formLoadedAt < minSeconds * 1000) return true;
  return false;
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
