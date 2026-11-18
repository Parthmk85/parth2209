"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NEEDS, BUDGETS, TIMES, DIALS, DAYS_AHEAD, istDate } from "./options";

const ACCENT = "#C778DD";
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const field = "w-full bg-transparent border border-[#ABB2BF] text-white px-3 py-2 text-sm focus:outline-none focus:border-[#C778DD]";
const lbl = "block text-xs font-bold uppercase tracking-widest text-[#ABB2BF] mb-3";

function label12(t) {
  const h = Number(t.slice(0, 2));
  return `${((h + 11) % 12) + 1}:00 ${h < 12 ? "AM" : "PM"}`;
}

function prettyDate(ymd) {
  return new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" })
    .format(new Date(`${ymd}T00:00:00Z`));
}

/** Month grid. Only tomorrow..+DAYS_AHEAD, Mon–Sat, are clickable. */
function Calendar({ value, onChange }) {
  const min = istDate(1);
  const max = istDate(DAYS_AHEAD);
  const [month, setMonth] = useState(min.slice(0, 7)); // "YYYY-MM"

  const [y, m] = month.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells = [...Array(first.getUTCDay()).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const shift = (n) => setMonth(new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 7));
  const title = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric", timeZone: "UTC" }).format(first);

  return (
    <div className="border border-[#ABB2BF] p-4 select-none">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={() => shift(-1)} disabled={month <= min.slice(0, 7)} aria-label="Previous month"
          className="w-8 h-8 border border-[#ABB2BF] hover:border-[#C778DD] disabled:opacity-30 disabled:hover:border-[#ABB2BF]">‹</button>
        <span className="font-medium">{title}</span>
        <button type="button" onClick={() => shift(1)} disabled={month >= max.slice(0, 7)} aria-label="Next month"
          className="w-8 h-8 border border-[#ABB2BF] hover:border-[#C778DD] disabled:opacity-30 disabled:hover:border-[#ABB2BF]">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#ABB2BF] mb-2">
        {WEEKDAYS.map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const ymd = `${month}-${String(d).padStart(2, "0")}`;
          const sunday = (first.getUTCDay() + d - 1) % 7 === 0;
          const ok = ymd >= min && ymd <= max && !sunday;
          const selected = ymd === value;
          return (
            <button key={i} type="button" disabled={!ok} onClick={() => onChange(ymd)} aria-pressed={selected}
              aria-label={prettyDate(ymd)}
              className={`aspect-square text-sm border transition-colors ${
                selected ? "bg-[#C778DD] border-[#C778DD] text-white"
                : ok ? "border-[#ABB2BF]/40 hover:border-[#C778DD] text-white"
                : "border-transparent text-[#ABB2BF]/30 cursor-not-allowed"}`}>
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const chip = (on) => `border px-3 py-3 text-sm text-left transition-colors ${
  on ? "bg-[#C778DD]/20 border-[#C778DD] text-white" : "border-[#ABB2BF]/50 text-[#ABB2BF] hover:border-[#C778DD] hover:text-white"}`;

/** Radio-style boxes instead of a <select>, plus a "Custom" box that opens a text field. */
function Chips({ name, options, value, onChange, placeholder }) {
  const [custom, setCustom] = useState(false);
  return (
    <>
      <div role="radiogroup" aria-label={name} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={!custom && value === o}
            onClick={() => { setCustom(false); onChange(o); }} className={chip(!custom && value === o)}>
            {o}
          </button>
        ))}
        <button type="button" role="radio" aria-checked={custom}
          onClick={() => { if (!custom) { setCustom(true); onChange(""); } }} className={chip(custom)}>
          ✎ Custom
        </button>
      </div>
      {custom && (
        <input autoFocus aria-label={`${name} (custom)`} maxLength={60} value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)} className={`${field} mt-2`} />
      )}
    </>
  );
}

export default function Connect() {
  const [form, setForm] = useState({ name: "", dial: "+91", phone: "", date: "", time: "", need: "", budget: "", brief: "" });
  const [taken, setTaken] = useState(null); // null = loading
  const [status, setStatus] = useState({ state: "idle" });
  const put = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const set = (k) => (e) => put(k, e.target.value);

  useEffect(() => {
    if (!form.date) return;
    let live = true;
    setTaken(null);
    fetch(`/api/book?date=${form.date}`)
      .then((r) => r.json())
      .then((d) => live && setTaken(d.taken ?? []))
      .catch(() => live && setTaken([]));
    return () => { live = false; };
  }, [form.date]);

  async function submit(e) {
    e.preventDefault();
    const missing = !form.date ? "Please pick a date." : !form.time ? "Please pick a time."
      : form.need.trim().length < 2 ? "Please pick or type your requirement."
      : form.budget.trim().length < 2 ? "Please pick or type your budget." : "";
    if (missing) return setStatus({ state: "error", error: missing });

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      setStatus({ state: "done", when: data.when });
    } catch (err) {
      setStatus({ state: "error", error: err.message });
    }
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 md:px-24 py-8 max-w-2xl">
        <header className="flex items-center mb-12">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <img src="/ezcods-mark-light.png" alt="EZcods IT Solutions" className="h-6 w-auto" />
            <span>EZcods IT Solutions</span>
          </Link>
        </header>

        <h1 className="text-3xl font-semibold mb-2">
          <span style={{ color: ACCENT }}>#</span>get-connected
        </h1>
        <p className="text-[#ABB2BF] mb-10">Pick a time and tell us what you need. We&apos;ll confirm on WhatsApp.</p>

        {status.state === "done" ? (
          <div className="border border-[#C778DD] p-6" role="status">
            <p className="text-lg font-medium mb-2">Booked for {status.when}</p>
            <p className="text-[#ABB2BF] mb-6">A confirmation is on its way to your WhatsApp. We&apos;ll call you at that time.</p>
            <Link href="/" className="border border-[#C778DD] py-2 px-4 text-sm inline-block hover:bg-[#C778DD]/20">
              Back to home
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-8">
            <div>
              <label htmlFor="name" className={lbl}>Your name</label>
              <input id="name" required minLength={2} maxLength={80} value={form.name} onChange={set("name")} className={field} autoComplete="name" />
            </div>

            <div>
              <label htmlFor="phone" className={lbl}>WhatsApp number</label>
              <div className="flex gap-2">
                <select aria-label="Country code" value={form.dial} onChange={set("dial")}
                  className={`${field} w-40 bg-[#282C33] [color-scheme:dark]`}>
                  {DIALS.map((d) => <option key={d.dial} value={d.dial}>{d.label}</option>)}
                </select>
                <input id="phone" required type="tel" inputMode="numeric" value={form.phone} onChange={set("phone")} className={field} autoComplete="tel-national" />
              </div>
            </div>

            <div>
              <span className={lbl}>Date</span>
              <Calendar value={form.date} onChange={(d) => setForm((f) => ({ ...f, date: d, time: "" }))} />
            </div>

            <div>
              <span className={lbl}>Time (IST){form.date && <span className="normal-case font-normal"> · {prettyDate(form.date)}</span>}</span>
              {!form.date ? (
                <p className="text-sm text-[#ABB2BF] border border-dashed border-[#ABB2BF]/40 px-3 py-4">Pick a date first.</p>
              ) : taken === null ? (
                <p className="text-sm text-[#ABB2BF] px-3 py-4">Loading slots…</p>
              ) : (
                <div role="radiogroup" aria-label="Time" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIMES.map((t) => {
                    const booked = taken.includes(t);
                    const selected = form.time === t;
                    return (
                      <button key={t} type="button" role="radio" aria-checked={selected} disabled={booked} onClick={() => put("time", t)}
                        className={`border px-3 py-2 text-sm transition-colors ${
                          booked ? "border-[#ABB2BF]/20 text-[#ABB2BF]/40 cursor-not-allowed"
                          : selected ? "bg-[#C778DD] border-[#C778DD] text-white"
                          : "border-[#ABB2BF]/50 hover:border-[#C778DD]"}`}>
                        <span className={booked ? "line-through" : ""}>{label12(t)}</span>
                        {booked && <span className="block text-[10px] uppercase tracking-widest mt-0.5">Booked</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <span className={lbl}>Requirement</span>
              <Chips name="Requirement" options={NEEDS} value={form.need} onChange={(v) => put("need", v)}
                placeholder="e.g. Online booking system for my salon" />
            </div>

            <div>
              <span className={lbl}>Budget (₹)</span>
              <Chips name="Budget" options={BUDGETS} value={form.budget} onChange={(v) => put("budget", v)}
                placeholder="e.g. 2.5 Lakh, or $3000" />
            </div>

            <div>
              <label htmlFor="brief" className={lbl}>Description <span className="normal-case font-normal">(optional)</span></label>
              <textarea id="brief" rows={4} maxLength={1000} value={form.brief} onChange={set("brief")} className={field} placeholder="Tell us a little about the project" />
            </div>

            {status.state === "error" && <p className="text-red-400 text-sm" role="alert">{status.error}</p>}

            <button type="submit" disabled={status.state === "sending"}
              className="w-full sm:w-auto bg-[#C778DD] text-white py-3 px-8 font-medium text-sm hover:opacity-90 disabled:opacity-60 transition-opacity">
              {status.state === "sending" ? "Booking…" : "Book now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
