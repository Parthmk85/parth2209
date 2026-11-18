// Served here, not by the SaaS fallthrough — the platform answers ezcods.com
// with `Disallow: /`, which hid this whole site from Google and ChatGPT.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/projects"] },
    sitemap: "https://ezcods.com/sitemap.xml",
  };
}
