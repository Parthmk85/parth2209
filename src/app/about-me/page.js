import Link from "next/link";
import { headers } from "next/headers";
import { brandTitle } from "@/lib/site";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { getContent } from "@/lib/data";
import { SERVICES } from "@/lib/services";
import { ServicesSection, SkillsSection, AboutSection } from "@/components/HomeSections";

// Tech stack comes from the CMS skills section.
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return { ...METADATA, title: await brandTitle(METADATA.title) };
}

const METADATA = {
  title: "About EZcods IT Solutions | Software Development Company in India",
  description: "EZcods IT Solutions is an Indian software development company founded by Parth Badreshiya, building websites, e-commerce stores, mobile apps and custom CRM/ERP software.",
};

const ABOUT = [
  "EZcods IT Solutions is a software development company in India, founded by Parth Badreshiya. We build business websites, e-commerce stores, Android and iOS apps, and custom CRM and ERP software.",
  "We start from how a business already works and build around it. That means fast, mobile-first websites, online stores you can run from an admin panel, and software that fits your team instead of forcing it to change.",
  "Every project starts with a free discovery call, where we understand the requirement, suggest the right approach and share an indicative timeline and budget.",
];

export default async function About() {
  const data = await getContent();
  const skills = data?.skills || [];

  // parthdev.in: same sections, markup and theme as its homepage
  // (ezcods.com keeps the page below unchanged).
  const host = (await headers()).get("host") ?? "";
  if (/^(www\.)?parthdev\.in(:\d+)?$/.test(host)) {
    return (
      <div className="min-h-screen text-white flex flex-col relative overflow-x-hidden">
        <div className="pd-about container mx-auto px-6 md:px-24 py-8 max-w-7xl">
          <SiteHeader brand={false} />
          <AboutSection paragraphs={ABOUT} image={data?.about?.image} as="h1" readMore={false} />
          <ServicesSection title="what-we-build" links={false} />
          <SkillsSection skills={skills} parthdev title="tech-stack" />
          <div className="mb-8 text-[#ABB2BF]">
            <p className="mb-4">
              See what we&apos;ve built on our <Link href="/work" className="text-[#C778DD] hover:underline">work page</Link>, or tell us about your project.
            </p>
            <Link href="/connect" className="bg-[#C778DD] text-white py-2 px-4 hover:opacity-90 transition-opacity font-medium text-sm inline-block">
              Book a free discovery call
            </Link>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-6 md:px-24 py-8 max-w-5xl">
        <SiteHeader />

        <section className="mb-20">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6"><span className="text-[#C778DD]">/</span>about-us</h1>
          <div className="text-[#ABB2BF] leading-relaxed max-w-3xl space-y-5">
            <p>
              EZcods IT Solutions is a software development company in India, founded by Parth Badreshiya. We build
              business websites, e-commerce stores, Android and iOS apps, and custom CRM and ERP software.
            </p>
            <p>
              We start from how a business already works and build around it. That means fast, mobile-first
              websites, online stores you can run from an admin panel, and software that fits your team instead of
              forcing it to change.
            </p>
            <p>
              Every project starts with a free discovery call, where we understand the requirement, suggest the
              right approach and share an indicative timeline and budget.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-medium mb-6"><span className="text-[#C778DD]">#</span>what-we-build</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="border border-[#ABB2BF] p-4 hover:border-[#C778DD]">
                <h3 className="font-semibold mb-1">{s.name}</h3>
                <p className="text-[#ABB2BF] text-sm">{s.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        {skills.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-medium mb-6"><span className="text-[#C778DD]">#</span>tech-stack</h2>
            <dl className="grid sm:grid-cols-2 gap-4">
              {skills.map((c) => (
                <div key={c.title} className="border border-[#ABB2BF]/40 p-3">
                  <dt className="font-semibold mb-1">{c.title}</dt>
                  <dd className="text-[#ABB2BF] text-sm">{c.skills}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className="mb-8">
          <p className="text-[#ABB2BF] mb-4">
            See what we&apos;ve built on our <Link href="/work" className="text-[#C778DD] hover:underline">work page</Link>, or tell us about your project.
          </p>
          <Link href="/connect" className="bg-[#C778DD] text-white py-2 px-4 hover:opacity-90 font-medium text-sm inline-block">
            Book a free discovery call
          </Link>
        </section>

        <Footer />
      </div>
    </div>
  );
}
