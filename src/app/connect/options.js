// Shared by the /connect form and /api/book (TIMES, DIALS, slots). NEEDS/BUDGETS are form presets; "Custom" allows free text.
// NEEDS/BUDGETS match inquiry.ezcods.com, whose WhatsApp templates these fill.
export const NEEDS = ["Website", "Mobile app", "CRM/ERP (custom)", "Other help"];
export const BUDGETS = ["Below 50K", "50K to 1L", "1L to 10L"];

// IST, hourly 11:00 to 18:00.
export const TIMES = Array.from({ length: 8 }, (_, i) => `${String(11 + i).padStart(2, "0")}:00`);

export const DAYS_AHEAD = 30;

export const DIALS = [
  { dial: "+91", label: "India +91" },
  { dial: "+1", label: "USA/Canada +1" },
  { dial: "+44", label: "UK +44" },
  { dial: "+971", label: "UAE +971" },
  { dial: "+61", label: "Australia +61" },
];

/**
 * 2-3 hours per day shown as already booked. Seeded from the date so every
 * visitor and every reload sees the same ones, and /api/book can refuse them.
 */
export function blockedTimes(date) {
  let seed = 2166136261;
  for (const ch of date) seed = Math.imul(seed ^ ch.charCodeAt(0), 16777619) >>> 0;
  const next = () => (seed = (Math.imul(seed, 1103515245) + 12345) >>> 0) / 4294967296;
  const pool = [...TIMES];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 2 + (next() < 0.5 ? 0 : 1));
}

/** Today's IST date as YYYY-MM-DD, shifted by `days`. */
export function istDate(days = 0) {
  return new Date(Date.now() + 330 * 60_000 + days * 86_400_000).toISOString().slice(0, 10);
}
