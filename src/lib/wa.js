/**
 * WhatsApp via the main EzCods app on loopback — the same gateway and the same
 * approved templates inquiry.ezcods.com uses (see /root/inquiry/src/lib/ezcods.js),
 * so a booking from here looks identical to one from there.
 *
 * Never throws: a failed message must not undo a booking that is already saved.
 */

const BASE = (process.env.EZCODS_PROXY_URL ?? "http://127.0.0.1:3100").replace(/\/+$/, "");

// Meta rejects template params with newlines, tabs, 4+ spaces, or empty values.
function cleanParam(v) {
  const s = String(v ?? "").replace(/\s+/g, " ").trim();
  return s ? s.slice(0, 900) : "-";
}

async function send(phone, { text, template, params = [] }) {
  const to = String(phone ?? "").replace(/\D/g, "");
  if (!to) return { ok: false, error: "no phone" };
  try {
    const res = await fetch(`${BASE}/api/send-wa`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": process.env.EZCODS_API_KEY ?? "" },
      cache: "no-store",
      body: JSON.stringify({
        phone: to,
        text,
        template,
        lang: process.env.WHATSAPP_TPL_LANG ?? "en",
        params: params.map(cleanParam),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.error ?? `EzCods service error (${res.status})`);
    return { ok: true };
  } catch (err) {
    console.error("[whatsapp]", err.message);
    return { ok: false, error: err.message };
  }
}

/** consultation_owner_alert: headline, client, phone, slot, details. */
export function notifyOwner(params, text) {
  const to = process.env.NOTIFY_WHATSAPP ?? "";
  if (!to) return Promise.resolve({ ok: false, error: "NOTIFY_WHATSAPP not set" });
  return send(to, { text, template: process.env.WHATSAPP_TPL_OWNER ?? "consultation_owner_alert", params });
}

/** consultation_owner_booking: name, phone, email, slot, needs, budget, brief, amount, ref. */
export function notifyOwnerBooking(params, text) {
  const to = process.env.NOTIFY_WHATSAPP ?? "";
  if (!to) return Promise.resolve({ ok: false, error: "NOTIFY_WHATSAPP not set" });
  return send(to, { text, template: process.env.WHATSAPP_TPL_OWNER_BOOKING ?? "consultation_owner_booking", params });
}

/** consultation_booked: name, slot, phone, ref. */
export function notifyClientBooked(phone, params, text) {
  return send(phone, { text, template: process.env.WHATSAPP_TPL_BOOKED ?? "consultation_booked", params });
}
