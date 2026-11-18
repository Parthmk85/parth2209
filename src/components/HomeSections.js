import Link from "next/link";
import { SERVICES } from "@/lib/services";
import TechWorkspace from "@/components/TechWorkspace";

// Homepage sections shared with the parthdev.in About page, so both pages
// render the exact same markup (and the theme styles them identically).
// Markup is unchanged from the homepage; only headings/links are props.

// `links`: cards link to /services/<slug> with "Learn more"; false renders
// the same cards without links (parthdev.in About page).
export function ServicesSection({ title = "services", links = true }) {
  return (
    <section id="services" className="mb-32">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>{title}</h2>
        <div className="h-px bg-[#C778DD] w-64"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SERVICES.map((sv) =>
          links ? (
            <Link key={sv.slug} href={`/services/${sv.slug}`} className="border border-[#ABB2BF] p-5 hover:border-[#C778DD] transition-all duration-300 group">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-[#C778DD] transition-colors">{sv.name}</h3>
              <p className="text-[#ABB2BF] text-sm leading-relaxed mb-3">{sv.summary}</p>
              <span className="text-[#C778DD] text-sm">Learn more -&gt;</span>
            </Link>
          ) : (
            <div key={sv.slug} className="border border-[#ABB2BF] p-5 hover:border-[#C778DD] transition-all duration-300 group">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-[#C778DD] transition-colors">{sv.name}</h3>
              <p className="text-[#ABB2BF] text-sm leading-relaxed">{sv.summary}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}

// `parthdev`: left column shows the 3D workspace instead of the decorations.
export function SkillsSection({ skills = [], parthdev = false, title = "techstack" }) {
  if (!skills.length) return null;
  return (
    <section id="skills" className="mb-32">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>{title}</h2>
        <div className="h-px bg-[#C778DD] w-64"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-16">
        {parthdev ? <TechWorkspace /> : (
          <div className="hidden md:block w-1/3 relative">
            {/* 5x5 Dots Top Left */}
            <div className="absolute top-8 left-8 grid grid-cols-5 gap-4">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-[#ABB2BF] rounded-full"></div>
              ))}
            </div>

            {/* Purple Squares Decoration */}
            <div className="absolute bottom-12 left-20">
              <div className="w-20 h-20 border border-[#C778DD] absolute bottom-8 right-8"></div>
              <div className="w-20 h-20 border border-[#C778DD] absolute bottom-0 right-0"></div>
            </div>

            {/* 5x5 Dots Bottom Right of this area */}
            <div className="absolute bottom-32 left-44 grid grid-cols-5 gap-4">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-[#ABB2BF] rounded-full"></div>
              ))}
            </div>

            {/* Random small square */}
            <div className="absolute top-20 right-12 w-16 h-16 border border-[#ABB2BF]"></div>
            <div className="absolute bottom-20 right-0 w-12 h-12 border border-[#ABB2BF]"></div>
          </div>
        )}

        {/* Right Side - Skills Grid */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
          {skills.map((category, idx) => (
            <div key={idx} className="border border-[#ABB2BF] h-fit hover:border-[#C778DD] transition-all duration-300 group hover:shadow-[0_0_20px_rgba(199,120,221,0.1)]">
              <h4 className="border-b border-[#ABB2BF] p-2 font-semibold text-white group-hover:text-[#C778DD] transition-colors">{category.title}</h4>
              <div className="p-2 text-[#ABB2BF] flex flex-wrap gap-2">
                {category.skills.split(",").map((s, i) => (
                  <span key={i} className="hover:text-white transition-colors cursor-default leading-relaxed">
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// `as`: heading level (the About page uses its section title as the page h1).
export function AboutSection({ paragraphs = [], image, title = "about-us", as: Heading = "h2", readMore = true }) {
  return (
    <section id="about-me" className="mb-32 relative">
      <div className="flex items-center gap-4 mb-12">
        <Heading className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>{title}</Heading>
        <div className="h-px bg-[#C778DD] w-64"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 text-[#ABB2BF] leading-relaxed">
          {paragraphs.map((text, i) => (
            <p key={i} className="mb-8">{text}</p>
          ))}
          {readMore && (
            <Link href="/about-me" className="border border-[#C778DD] px-4 py-2 text-white hover:bg-[#C778DD] hover:bg-opacity-20 transition-all font-medium text-sm inline-flex items-center gap-2">
              Read more -&gt;
            </Link>
          )}
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 relative flex justify-center">
          <div className="relative">
            {/* Image */}
            <div className="w-[340px] h-[500px] border-b border-[#C778DD] relative z-10">
              <img
                src={image || "https://via.placeholder.com/400x500/282c33/abb2bf?text=Parth"}
                alt="Parth Badreshiya, founder of EZcods IT Solutions"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Decorations */}
            <div className="absolute top-12 -left-4 grid grid-cols-5 gap-4 z-20">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-[#ABB2BF] rounded-full"></div>
              ))}
            </div>

            <div className="absolute bottom-16 -right-4 grid grid-cols-4 gap-4 z-20">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-[#ABB2BF] rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Far right dots decoration */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 grid grid-cols-2 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-[#ABB2BF] rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative box on far left */}
      <div className="absolute top-20 -left-20 w-32 h-40 border border-[#ABB2BF] opacity-50 hidden md:block"></div>
    </section>
  );
}
