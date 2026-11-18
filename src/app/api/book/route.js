import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { notifyOwnerBooking, notifyClientBooked } from "@/lib/wa";
import { TIMES, DIALS, DAYS_AHEAD, blockedTimes, istDate } from "@/app/connect/options";

export const dynamic = "force-dynamic";

// Leads sit beside CMS content; resilient-db rewrites the whole object, so this key survives.
const FILE = path.join(process.cwd(), "data/db_fallback.json");

async function readDb() {
  const db = JSON.parse(await readFile(FILE, "utf8"));
  if (!Array.isArray(db.leads)) db.leads = [];
  return db;
}

/** GET ?date=YYYY-MM-DD → IST times already taken that day (real bookings + the seeded ones). */
export async function GET(req) {
  const date = clean(new URL(req.url).searchParams.get("date"), 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ taken: [] });
  const real = (await readDb()).leads
    .filter((l) => l.slot && istTime(l.slot).date === date)
    .map((l) => istTime(l.slot).time);
  return NextResponse.json({ taken: [...new Set([...blockedTimes(date), ...real])] });
}

function istTime(iso) {
  const s = new Date(new Date(iso).getTime() + 330 * 60_000).toISOString();
  return { date: s.slice(0, 10), time: s.slice(11, 16) };
}

// ponytail: in-memory per-IP limit, resets on restart; fine for one server.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 5;
}

const clean = (v, max) => String(v ?? "").trim().slice(0, max);

/** "2026-09-25" + "14:00" (IST) → UTC ISO, or null outside tomorrow..+30 days, Sundays, or a seeded-booked hour. */
function slotIso(date, time) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !TIMES.includes(time)) return null;
  if (date < istDate(1) || date > istDate(DAYS_AHEAD)) return null;
  const at = new Date(`${date}T${time}:00+05:30`);
  if (Number.isNaN(at.getTime()) || new Date(`${date}T12:00:00Z`).getUTCDay() === 0) return null;
  if (blockedTimes(date).includes(time)) return null;
  return at.toISOString();
}

function formatSlot(iso) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short", day: "2-digit", month: "short",
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata",
  }).format(new Date(iso)) + " IST";
}

export async function POST(req) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name, 80);
  const dial = clean(body.dial, 6);
  const phone = clean(body.phone, 20).replace(/\D/g, "");
  // A preset from NEEDS/BUDGETS or the visitor's own "Custom" text.
  const need = clean(body.need, 60);
  const budget = clean(body.budget, 60);
  const brief = clean(body.brief, 1000);

  if (name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!DIALS.some((d) => d.dial === dial)) return NextResponse.json({ error: "Please pick a country code." }, { status: 400 });
  if (phone.length < 6 || phone.length > 15) return NextResponse.json({ error: "Please enter a valid WhatsApp number." }, { status: 400 });
  if (need.length < 2) return NextResponse.json({ error: "Please pick or type your requirement." }, { status: 400 });
  if (budget.length < 2) return NextResponse.json({ error: "Please pick or type your budget." }, { status: 400 });
  const slot = slotIso(clean(body.date, 10), clean(body.time, 5));
  if (!slot) return NextResponse.json({ error: "That slot is not available. Please pick another date or time." }, { status: 400 });

  // ponytail: read-check-write without a lock; two bookings in the same millisecond could share a slot.
  const db = await readDb();
  if (db.leads.some((l) => l.slot === slot)) {
    return NextResponse.json({ error: "That time is already booked. Please pick another." }, { status: 409 });
  }
  const ref = `HELLO${Date.now()}`;
  // The form is served on ezcods.com, parthdev.in and job.ezcods.com; name the one used.
  const site = (req.headers.get("host") ?? "ezcods.com").split(":")[0];
  db.leads.push({ _id: ref, source: site, name, dial, phone, need, budget, brief, slot, ip, createdAt: new Date().toISOString() });
  await writeFile(FILE, JSON.stringify(db, null, 2));

  const when = formatSlot(slot);
  const fullPhone = `${dial} ${phone}`;

  // Same two messages inquiry.ezcods.com sends on a booking.
  await Promise.all([
    notifyOwnerBooking(
      [name, fullPhone, "not given", when, need, budget, brief || "not given", `Free (${site})`, ref],
      `New consultation booked (${site})\n\n${name} — ${fullPhone}\nWhen: ${when}\n` +
        `Needs: ${need}\nBudget: ${budget}\n` + (brief ? `Brief: ${brief}\n` : "") + `Ref: ${ref}`,
    ),
    notifyClientBooked(
      `${dial}${phone}`,
      [name, when, fullPhone, ref],
      `Hi ${name.split(" ")[0]}, your EZcods consultation is confirmed for ${when}. We will call you on ${fullPhone}. Ref: ${ref}`,
    ),
  ]);

  return NextResponse.json({ ok: true, when, ref });
}
