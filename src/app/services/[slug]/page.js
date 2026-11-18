import Link from "next/link";
import { brandTitle } from "@/lib/site";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { getProjects } from "@/lib/data";
import { toUrl } from "@/lib/preview";
import { SERVICES, serviceBySlug } from "@/lib/services";

// Project list comes from the CMS, so render per request like /work.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return { title: await brandTitle(`${s.title} | EZcods IT Solutions`), description: s.summary };
}

const host = (link) => {
  try {
    return new URL(toUrl(link)).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

export default async function ServicePage({ params }) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();

  const projects = ((await getProjects()) || []).filter((p) => s.categories.includes(p.category) && host(p.link));

  const url = `https://ezcods.com/services/${s.slug}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      serviceType: s.name,
      description: s.intro,
      url,
      areaServed: "IN",
      provider: { "@type": "Organization", name: "EZcods IT Solutions", url: "https://ezcods.com" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];

  return (
    <div className="min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-6 md:px-24 py-8 max-w-5xl">
        <SiteHeader />

        <section className="mb-20">
          <p className="text-[#C778DD] text-sm mb-3">/services/{s.slug}</p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">{s.title}</h1>
          <p className="text-[#ABB2BF] leading-relaxed max-w-3xl mb-8">{s.intro}</p>
          <Link href="/connect" className="bg-[#C778DD] text-white py-2 px-4 hover:opacity-90 font-medium text-sm inline-block">
            Book a free discovery call
          </Link>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-medium mb-6"><span className="text-[#C778DD]">#</span>what-you-get</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {s.points.map((p) => (
              <li key={p} className="border border-[#ABB2BF]/40 p-3 text-[#ABB2BF] text-sm flex gap-2">
                <span className="text-[#C778DD]">▸</span>{p}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-medium mb-6"><span className="text-[#C778DD]">#</span>tech-we-use</h2>
          <p className="text-[#ABB2BF]">{s.tech.join(" · ")}</p>
        </section>

        {projects.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-medium mb-2"><span className="text-[#C778DD]">#</span>live-client-projects</h2>
            <p className="text-[#ABB2BF] text-sm mb-6">Sites we built that are live today. <Link href="/work" className="text-[#C778DD] hover:underline">See them all with previews →</Link></p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {projects.map((p) => (
                <li key={p._id}>
                  <a href={toUrl(p.link)} target="_blank" rel="noopener" className="block border border-[#ABB2BF]/40 p-3 hover:border-[#C778DD] text-sm">
                    {p.title || host(p.link)} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-20">
          <h2 className="text-2xl font-medium mb-6"><span className="text-[#C778DD]">#</span>faq</h2>
          <div className="space-y-6">
            {s.faqs.map(([q, a]) => (
              <div key={q}>
                <h3 className="font-semibold mb-1">{q}</h3>
                <p className="text-[#ABB2BF] text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-6"><span className="text-[#C778DD]">#</span>other-services</h2>
          <div className="flex flex-wrap gap-3">
            {SERVICES.filter((o) => o.slug !== s.slug).map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="border border-[#ABB2BF] px-3 py-2 text-sm hover:border-[#C778DD]">
                {o.name}
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
