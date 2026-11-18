import { SERVICES } from "@/lib/services";

const SITE = "https://ezcods.com";

export default function sitemap() {
  return ["", "/work", "/about-me", "/connect", ...SERVICES.map((s) => `/services/${s.slug}`)].map((p) => ({ url: `${SITE}${p}`, lastModified: new Date() }));
}
