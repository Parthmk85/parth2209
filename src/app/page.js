import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/data";
import { headers } from "next/headers";
import HeroSection from "@/components/hero/HeroSection";
import { ServicesSection, SkillsSection, AboutSection } from "@/components/HomeSections";
import ContactPhone from "@/components/ContactPhone";
import ContactEnvelope from "@/components/ContactEnvelope";

// CMS content lives in data/db_fallback.json (or Mongo) and is read per-request.
// Without this the page is prerendered at build time and admin edits never
// reach the live site until the next rebuild.
export const dynamic = "force-dynamic";

// Shown on the page and as FAQPage schema, so AI search can quote the answers.
const FAQS = [
  ["What does EZcods IT Solutions do?", "We are a software development company in India. We build business websites, e-commerce stores, Android and iOS apps, and custom CRM / ERP software."],
  ["How much does a website or app cost?", "It depends on what you need. We quote after a free discovery call; the projects we take on range from under ₹50,000 to ₹10 lakh."],
  ["Can I see your past work?", "Yes. Our work page lists live client websites, from simple business sites to e-commerce stores."],
  ["Which technologies do you use?", "Next.js, React, Node.js, Flutter, React Native, PostgreSQL, MongoDB and .NET, chosen to fit the project."],
  ["How do I start a project?", "Book a free discovery call on our website. We confirm on WhatsApp, understand your requirement, and share the right approach with an indicative timeline and budget."],
];

const STEPS = [
  ["Discovery call", "A free call to understand your business and what you need."],
  ["Plan & quote", "We suggest the right approach and share an indicative timeline and budget."],
  ["Design & build", "We design, build and show you progress as we go."],
  ["Launch", "We put it live on your domain and hand it over."],
];

export default async function Home() {
  // parthdev.in serves this same app: it gets the 3D hero, ezcods.com keeps the
  // CMS hero. Chosen here, not by a middleware rewrite: parthdev.in's nginx
  // sends X-Forwarded-Proto, which turns rewrites into a proxy to
  // https://localhost:3700 that 500s.
  const host = (await headers()).get("host") ?? "";
  const hero = /^(www\.)?parthdev\.in(:\d+)?$/.test(host) ? <HeroSection /> : null;
  const dbContent = await getContent();

  // Normalize content structure
  const content = {
    hero: dbContent?.hero || { heading: "", subtext: "", image: "" },
    about: dbContent?.about || { text1: "", text2: "", text3: "", image: "/parth-car.jpg" },
    skills: dbContent?.skills || [],
    socials: dbContent?.socials || { whatsapp: "9725942209", instagram: "techly_the_freelancer", email: "parthmk85@gmail.com" },
    reviews: dbContent?.reviews || []
  };

  return (
    <div className="min-h-screen text-white flex flex-col relative overflow-x-hidden">


      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-24 py-8 max-w-7xl">
        
        {/* Brand header (nav links removed on request) */}
        <header className="flex items-center mb-20">
          <div className="flex items-center gap-2 font-bold text-lg">
            <img src="/ezcods-mark-light.png" alt="EZcods IT Solutions" className="h-6 w-auto" />
            <span>EZcods IT Solutions</span>
          </div>
        </header>

        {/* Hero Section */}
        {hero ?? (
        <section className="flex flex-col md:flex-row items-center justify-between mb-32">
          {/* Hero Text */}
          <div className="max-w-xl z-10">
            <h1 className="text-3xl md:text-[32px] font-semibold leading-normal mb-8">
              {content.hero.heading.split("Parth").map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-[#C778DD]">Parth</span>}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-[#ABB2BF] mb-8 leading-relaxed max-w-md">
              {content.hero.subtext}
            </p>
            <Link href="/work" className="border border-[#C778DD] text-white py-2 px-4 hover:bg-[#C778DD] hover:bg-opacity-20 transition-all duration-300 font-medium text-sm inline-block">
              View our past work
            </Link>
            <Link href="/connect" className="ml-3 bg-[#C778DD] text-white py-2 px-4 hover:opacity-90 transition-opacity font-medium text-sm inline-block">
              Get connected
            </Link>
          </div>

          {/* Hero Image / Graphics */}
          <div className="relative mt-12 md:mt-0">
            {/* Background Decorative Logo Outline */}
            <div className="absolute top-12 left-[-20px] md:left-[-40px] z-0 opacity-40">
                <svg width="155" height="155" viewBox="0 0 155 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 77.5L52.5 77.5L52.5 127.5H2.5V77.5Z" stroke="#ABB2BF" strokeWidth="1"/>
                    <path d="M102.5 77.5L52.5 77.5L52.5 27.5H102.5V77.5Z" stroke="#ABB2BF" strokeWidth="1"/>
                </svg>
                {/* Simplified Logo Graphic Placeholder representation */}
                 <div className="absolute top-[-20px] left-[-20px] w-32 h-32 border border-[#C778DD] z-[-1]" />
                 <div className="absolute bottom-[-10px] right-[-10px] w-24 h-24 border border-[#C778DD] z-[-1]" />
            </div>

            {/* Main Image Placeholder (Man in hoodie) */}
            <div className="relative z-10 w-[300px] h-[340px] md:w-[450px] md:h-[386px] grayscale hover:grayscale-0 transition-all duration-500">
                <img 
                  src={content.hero.image || "https://via.placeholder.com/600x600/282c33/abb2bf?text=Parth"} 
                  alt="Parth Badreshiya, founder of EZcods IT Solutions" 
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                />
               
               {/* Dots Pattern */}
               <div className="absolute bottom-16 right-4 md:right-[-20px] z-20">
                 <div className="grid grid-cols-5 gap-4">
                     {[...Array(25)].map((_, i) => (
                         <div key={i} className="w-1 h-1 bg-[#ABB2BF] rounded-full"></div>
                     ))}
                 </div>
               </div>
            </div>

            {/* Status Badge */}
            <div className="absolute bottom-4 left-4 md:left-2 flex items-center gap-2 border border-[#ABB2BF] bg-[#282C33] p-2 text-[#ABB2BF] text-sm z-20 w-max">
               <div className="w-4 h-4 bg-[#C778DD]"></div>
               <span>Websites · Apps · CRM</span>
            </div>
          </div>
        </section>
        )}

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        }) }} />

        {/* parthdev.in: service cards without "Learn more" links */}
        <ServicesSection links={!hero} />

        {/* Process */}
        <section id="process" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>how-we-work</h2>
            <div className="h-px bg-[#C778DD] w-48"></div>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="border border-[#ABB2BF] p-4">
                <span className="text-[#C778DD] text-sm">0{i + 1}</span>
                <h3 className="font-semibold my-2">{t}</h3>
                <p className="text-[#ABB2BF] text-sm leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <SkillsSection skills={content.skills} parthdev={!!hero} />

        <AboutSection
          paragraphs={[content.about.text1, content.about.text2, content.about.text3]}
          image={content.about.image}
        />

        {/* Reviews Section */}
        {content.reviews.length > 0 && (
          <section id="reviews" className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>client-reviews</h2>
              <div className="h-px bg-[#C778DD] w-48"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.reviews.map((review, idx) => (
                <div key={idx} className="border border-[#ABB2BF] p-6 hover:border-[#C778DD] transition-all duration-300 group relative flex flex-col">
                   {/* Star Rating */}
                   <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < review.stars ? "#E1B12C" : "none"} stroke={i < review.stars ? "#E1B12C" : "#ABB2BF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      ))}
                   </div>
                   
                   {/* Quote Icon */}
                   <div className="absolute top-6 right-6 text-[#ABB2BF] opacity-20 group-hover:opacity-40 transition-opacity">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c1 0 1.25.25 1.25 1.25V15c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path></svg>
                   </div>

                   {/* Video Review */}
                   {review.video && (
                     <div className="mb-4 rounded-xl overflow-hidden border border-[#ABB2BF] border-opacity-20 aspect-video bg-black/40">
                        <video 
                          src={review.video} 
                          controls 
                          className="w-full h-full object-cover"
                          poster={review.video.replace(".mp4", ".jpg").replace(".mov", ".jpg")} // Basic attempt at poster
                        />
                     </div>
                   )}

                   <p className="text-[#ABB2BF] italic mb-6 leading-relaxed">
                     &quot;{review.feedback}&quot;
                   </p>

                   <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#ABB2BF] border-opacity-20">
                      <div className="font-semibold text-white">{review.name}</div>
                      {review.productLink && (
                        <a 
                          href={review.productLink.startsWith("http") ? review.productLink : `https://${review.productLink}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-[#C778DD] hover:underline"
                        >
                          View his product ~~&gt;
                        </a>
                      )}
                   </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>faq</h2>
            <div className="h-px bg-[#C778DD] w-32"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {FAQS.map(([q, a]) => (
              <div key={q}>
                <h3 className="font-semibold mb-2">{q}</h3>
                <p className="text-[#ABB2BF] text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contacts Section */}
        <section id="contacts" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>contacts</h2>
            <div className="h-px bg-[#C778DD] w-32"></div>
          </div>

          <div className={hero ? "flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative" : "flex flex-col md:flex-row justify-between gap-12 relative"}>
             {/* Left Text */}
             <div className={hero ? "lg:w-[32%] text-[#ABB2BF]" : "md:w-1/2 text-[#ABB2BF]"}>
                <p className="mb-4">
                  Have a website, app or software idea? Tell us what your business needs and we&apos;ll suggest the right way to build it.
                </p>
                <Link href="/connect" className="bg-[#C778DD] text-white py-2 px-4 hover:opacity-90 transition-opacity font-medium text-sm inline-block">
                  Book a free discovery call
                </Link>
             </div>

             {/* parthdev.in: floating 3D phone between the text and the box */}
             {hero && <ContactPhone socials={content.socials} />}

             {/* Right Box */}
             <div className={hero ? "lg:w-[28%] flex justify-end" : "md:w-1/2 flex justify-end"}>
                {/* parthdev.in: 3D envelope letter; ezcods.com: the plain card */}
                {hero ? <ContactEnvelope socials={content.socials} /> : (
                <div className="border border-[#ABB2BF] p-4 min-w-[200px]">
                   <h4 className="font-semibold text-white mb-4">Message us here</h4>
                   <div className="flex flex-col gap-3">
                      {/* WhatsApp */}
                      {content.socials.whatsapp && (
                        <a 
                          href={`https://wa.me/${content.socials.whatsapp}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#ABB2BF] hover:text-[#98C379] transition-all group"
                        >
                           <div className="p-1.5 border border-[#ABB2BF] group-hover:border-[#98C379] transition-colors">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                           </div>
                           <span className="font-medium">WhatsApp</span>
                        </a>
                      )}

                      {/* Instagram */}
                      {content.socials.instagram && (
                        <a 
                          href={`https://instagram.com/${content.socials.instagram}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#ABB2BF] hover:text-[#C778DD] transition-all group"
                        >
                           <div className="p-1.5 border border-[#ABB2BF] group-hover:border-[#C778DD] transition-colors">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                           </div>
                           <span className="font-medium">Instagram</span>
                        </a>
                      )}

                      {/* Email */}
                      {content.socials.email && (
                        <a 
                          href={`mailto:${content.socials.email}`}
                          className="flex items-center gap-2 text-[#ABB2BF] hover:text-white transition-all group"
                        >
                           <div className="p-1.5 border border-[#ABB2BF] group-hover:border-white transition-colors">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                           </div>
                           <span className="font-medium text-xs truncate max-w-[120px]">{content.socials.email}</span>
                        </a>
                      )}
                   </div>
                </div>
                )}
             </div>
             
             <div className="absolute top-1/2 left-[-60px] transform -translate-y-1/2 grid-cols-2 gap-4 hidden md:grid">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-[#ABB2BF] rounded-full"></div>
                ))}
             </div>

          </div>
        </section>


        {/* Footer */}
        <Footer />

      </div>

       
       <div className="fixed top-0 left-8 h-[200px] w-[2px] bg-transparent md:hidden"></div> {/* Spacer for mobile */}

    </div>
  );
}
