import { createHash } from "node:crypto";

/**
 * Can this URL be shown in an <iframe> at all?
 *
 * A site sending X-Frame-Options or a CSP frame-ancestors rule leaves the frame
 * blank and fires no error the parent page can catch, so the only way to avoid
 * a dead grey box is to ask before rendering one.
 */
const frameCache = new Map(); // url -> { ok, at }
const FRAME_TTL_MS = 6 * 60 * 60 * 1000;

export function urlKey(url) {
  return createHash("sha1").update(String(url)).digest("hex").slice(0, 16);
}

/** Normalises a stored link ("example.com") into a real URL, or null. */
export function toUrl(link) {
  if (!link) return null;
  try {
    const u = new URL(String(link).startsWith("http") ? link : `https://${link}`);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

export async function canFrame(url) {
  const hit = frameCache.get(url);
  if (hit && Date.now() - hit.at < FRAME_TTL_MS) return hit.ok;

  let ok = false;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    // GET, not HEAD: plenty of servers answer HEAD without the security headers
    // they actually send on a real page load.
    const res = await fetch(url, { signal: ctrl.signal, cache: "no-store", redirect: "follow" });
    clearTimeout(t);
    const xfo = (res.headers.get("x-frame-options") ?? "").toLowerCase();
    const csp = (res.headers.get("content-security-policy") ?? "").toLowerCase();
    const ancestors = /frame-ancestors\s+([^;]*)/.exec(csp)?.[1] ?? "";
    ok =
      res.ok &&
      !xfo.includes("deny") &&
      !xfo.includes("sameorigin") &&
      !(ancestors && !ancestors.includes("*") && !ancestors.includes("inquiry.ezcods.com"));
  } catch {
    ok = false;
  }
  frameCache.set(url, { ok, at: Date.now() });
  if (frameCache.size > 500) frameCache.clear();
  return ok;
}

/**
 * A client site's own <title> and meta description, so /work can say what each
 * business is instead of showing a bare domain. Fetched at render (not stored on
 * the project: the admin form submits title/description empty and would wipe
 * them), cached a day. Null on failure or on a parked domain.
 */
const infoCache = new Map(); // url -> { info, at }
const INFO_TTL_MS = 24 * 60 * 60 * 1000;

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();

export async function siteInfo(url) {
  const hit = infoCache.get(url);
  if (hit) {
    // Stale: serve it anyway and refresh behind the request, so only the very
    // first render after a restart ever waits on client sites.
    if (Date.now() - hit.at >= INFO_TTL_MS && !hit.refreshing) {
      hit.refreshing = true;
      fetchInfo(url).catch(() => {});
    }
    return hit.info;
  }
  return fetchInfo(url);
}

async function fetchInfo(url) {
  let info = null;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(url, { signal: ctrl.signal, cache: "no-store", redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (compatible; EZcodsPreview)" } });
    const html = res.ok ? (await res.text()).slice(0, 200_000) : "";
    clearTimeout(t);
    const title = decode(/<title[^>]*>([^<]*)/i.exec(html)?.[1] ?? "");
    const description = decode(
      /<meta[^>]+name=["']description["'][^>]*content=(["'])(.*?)\1/i.exec(html)?.[2] ??
        /<meta[^>]+content=(["'])(.*?)\1[^>]*name=["']description["']/i.exec(html)?.[2] ??
        "",
    );
    if (title && !/parked domain|domain for sale/i.test(title)) {
      info = { name: title.split(/\s[|—–-]\s/)[0].trim(), title, description };
    }
  } catch {
    info = null;
  }
  infoCache.set(url, { info, at: Date.now() });
  if (infoCache.size > 500) infoCache.clear();
  return info;
}
