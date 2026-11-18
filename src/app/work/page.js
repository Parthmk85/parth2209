import Link from "next/link";
import { brandTitle } from "@/lib/site";
import { getProjects } from "@/lib/data";
import SitePreview from "@/components/SitePreview";
import { canFrame, siteInfo, toUrl } from "@/lib/preview";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return { ...METADATA, title: await brandTitle(METADATA.title) };
}

const METADATA = {
  title: "Our Work: Websites & E-commerce Stores We've Built | EZcods IT Solutions",
  description: "Portfolio of EZcods IT Solutions: live business websites, animated brand sites and e-commerce stores built for clients in skincare, jewellery, fashion, dairy, travel, exports and manufacturing.",
};

/**
 * The capability ladder.
 *
 * Ordered deliberately from least to most involved, because that is the order a
 * visitor recognises themselves in: most people arrive knowing roughly how
 * complex their idea is, not what it is called. Each step says what it is and
 * what it is for, so the budget question on the form stops being a guess.
 */
const STEPS = [
  {
    n: "01",
    key: "informational",
    title: "Informational website",
    blurb: "A clear, fast site that tells people who you are and how to reach you.",
    points: ["Home, about, services and contact pages", "Mobile-first and quick to load", "Google-friendly structure", "Enquiry form straight to your WhatsApp"],
  },
  {
    n: "02",
    key: "animated",
    title: "Animated website",
    blurb: "Everything above, with motion that makes the brand feel premium.",
    points: ["Scroll and hover animations", "Custom transitions between sections", "Interactive hero and highlights", "Tuned so it stays fast on phones"],
  },
  {
    n: "03",
    key: "ecommerce",
    title: "Ecommerce website",
    blurb: "A full store — products, payments and orders you can actually run.",
    points: ["Product catalogue with variants", "UPI, cards and netbanking", "Cart, checkout and order tracking", "Admin panel to manage stock and orders"],
  },
  {
    n: "04",
    key: "crm",
    title: "CRM / ERP (custom)",
    blurb: "Software built around how your business already works, not the other way round.",
    points: ["Leads, clients and follow-ups in one place", "Roles and permissions for your team", "Reports and dashboards", "WhatsApp and payment integrations"],
  },
];

const STEP_KEYS = new Set(STEPS.map((s) => s.key));

const SERVICE_FOR = { informational: "website-development", animated: "website-development", ecommerce: "ecommerce-development", crm: "crm-erp-development" };

/** A link may be stored bare ("example.com"); the preview needs a real URL. */
const href = toUrl;

/** With no title saved, the domain is a better label than an empty card. */
function label(p) {
  if (p.title) return p.title;
  try {
    return new URL(href(p.link)).hostname.replace(/^www\./, "");
  } catch {
    return "Project";
  }
}

export default async function Work() {
  // Only projects the admin has filed under a /work step. Legacy portfolio rows
  // (no category) stay out of here and live on /projects instead.
  const all = ((await getProjects()) || []).filter((p) => STEP_KEYS.has(p.category) && href(p.link));

  // Asked once per render and cached in-process, so the cards never render a
  // frame for a site that refuses to be framed.
  const framable = Object.fromEntries(
    await Promise.all(
      all
        .filter((p) => href(p.link) && !p.media)
        .map(async (p) => [p._id, await canFrame(href(p.link))]),
    ),
  );

  // Each client's own title/description, so the page says what the business is.
  const info = Object.fromEntries(await Promise.all(all.map(async (p) => [p._id, await siteInfo(href(p.link))])));

  // Every project filed under a step is shown — no cap, no rotation.
  const byStep = (key) => all.filter((p) => (p.category || "informational") === key);

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-6 md:px-24 py-8 max-w-7xl">
        <header className="flex justify-between items-center mb-20">
          <a href="/" className="flex items-center gap-2 font-bold text-lg hover:text-[#C778DD] transition-colors">
            <img src="/ezcods-mark-light.png" alt="EZcods IT Solutions" className="h-6 w-auto" />
            <span>EZcods IT Solutions</span>
          </a>
          <a href="/" className="text-[#ABB2BF] text-sm hover:text-white transition-colors">
            <span className="text-[#C778DD]">#</span>home
          </a>
        </header>

        <section className="mb-24">
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-2xl md:text-3xl font-semibold">
              <span className="text-[#C778DD]">#</span>our-work
            </h1>
            <div className="h-[1px] bg-[#C778DD] flex-1 max-w-[220px]" />
          </div>
          <p className="text-[#ABB2BF] text-sm mb-12 max-w-2xl leading-relaxed">
            Websites, animated brand sites and e-commerce stores built by EZcods IT Solutions, grouped by how involved the build is.{" "}
            <span className="text-white">Every site here is live</span> &mdash; click through and judge for yourself.
          </p>

          <ol className="relative">
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative pl-10 md:pl-14 pb-12 last:pb-0">
                {/* The rail joins the steps into one progression; the last one
                    stops at its own marker so the ladder has an end. */}
                {i < STEPS.length - 1 && (
                  <span className="absolute left-[11px] md:left-[15px] top-8 bottom-0 w-[1px] bg-[#ABB2BF]/40" aria-hidden="true" />
                )}
                <span className="absolute left-0 top-0 w-6 h-6 md:w-8 md:h-8 border border-[#C778DD] text-[#C778DD] text-[11px] md:text-xs flex items-center justify-center bg-[#282C33]">
                  {s.n}
                </span>
                <h2 className="text-lg md:text-xl font-semibold mb-2">{s.title}</h2>
                <p className="text-[#ABB2BF] text-sm mb-4 max-w-xl">
                  {s.blurb}{" "}
                  <Link href={`/services/${SERVICE_FOR[s.key]}`} className="text-[#C778DD] hover:underline whitespace-nowrap">Our {s.title.toLowerCase()} service &rarr;</Link>
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 max-w-2xl">
                  {s.points.map((p) => (
                    <li key={p} className="text-[#ABB2BF] text-sm flex gap-2">
                      <span className="text-[#C778DD]">▸</span>
                      {p}
                    </li>
                  ))}
                </ul>

                {/* A step with nothing under it shows nothing: an empty
                    placeholder row reads as a section that failed to load. */}
                {byStep(s.key).length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-5 mt-7 max-w-3xl">
                    {byStep(s.key).map((p) => (
                      <a
                        key={p._id}
                        href={href(p.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#ABB2BF] hover:border-[#C778DD] transition-colors block group min-w-0"
                      >
                        <div className="h-44 border-b border-[#ABB2BF] overflow-hidden">
                          <SitePreview
                            url={href(p.link)}
                            framable={framable[p._id]}
                            media={p.media}
                            mediaType={p.mediaType}
                            title={label(p)}
                          />
                        </div>
                        <div className="p-3 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-sm font-medium group-hover:text-[#C778DD] transition-colors truncate">
                              {info[p._id]?.name || label(p)}
                            </h3>
                            {info[p._id]?.name && <p className="text-xs text-[#ABB2BF] truncate">{label(p)}</p>}
                          </div>
                          <span className="shrink-0 border border-[#C778DD] text-[#C778DD] group-hover:bg-[#C778DD] group-hover:text-white transition-all text-xs px-3 py-1">
                            Visit website &rarr;
                          </span>
                        </div>
                        {info[p._id]?.description && (
                          <p className="px-3 pb-3 -mt-1 text-xs text-[#ABB2BF] leading-relaxed line-clamp-2">{info[p._id].description}</p>
                        )}
                      </a>
                    ))}
                  </div>
                )}

              </li>
            ))}
          </ol>
        </section>

        <section className="mb-24 border border-[#C778DD] p-8 max-w-2xl">
          <h2 className="text-xl font-semibold mb-3">See something close to your idea?</h2>
          <p className="text-[#ABB2BF] text-sm mb-6">
            Tell us what you need and book a free discovery call. We&apos;ll suggest the right approach with an indicative
            timeline and budget.
          </p>
          <Link
            href="/connect"
            className="border border-[#C778DD] text-white bg-[#C778DD]/10 hover:bg-[#C778DD]/25 py-3 px-6 transition-all duration-300 font-medium text-sm inline-block"
          >
            Start a project
          </Link>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Our work — EZcods IT Solutions",
          url: "https://ezcods.com/work",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: all.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "WebSite", name: info[p._id]?.name || label(p), url: href(p.link), ...(info[p._id]?.description ? { description: info[p._id].description } : {}), creator: { "@type": "Organization", name: "EZcods IT Solutions", url: "https://ezcods.com" } },
            })),
          },
        }) }} />

        <Footer />
      </div>
    </div>
  );
}
