import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getProjects, getContent } from "@/lib/data";

export default async function Home() {
  const dbProjects = await getProjects();
  const dbContent = await getContent();

  // Normalize content structure
  const content = {
    hero: dbContent?.hero || { heading: "", subtext: "", image: "" },
    about: dbContent?.about || { text1: "", text2: "", text3: "", image: "/parth-car.jpg" },
    skills: dbContent?.skills || [],
    socials: dbContent?.socials || { whatsapp: "9725942209", instagram: "techly_the_freelancer", email: "parthmk85@gmail.com" },
    reviews: dbContent?.reviews || []
  };

  const projects = (dbProjects || [])
    .filter(p => p.showOnHome)
    .slice(0, 3);

  return (
    <div className="min-h-screen text-white flex flex-col relative overflow-x-hidden">


      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-24 py-8 max-w-7xl">
        
        {/* Navbar */}
        <header className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2 font-bold text-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2H4V14H12V10H8V8H12V2ZM4 0C2.89543 0 2 0.89543 2 2V14C2 15.1046 2.89543 16 4 16H12C13.1046 16 14 15.1046 14 14V2C14 0.89543 13.1046 0 12 0H4Z" />
              <path d="M6 4H10V6H6V4Z" fill="#282C33"/>
            </svg>
            <span>Parth Patel</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[#ABB2BF] font-medium">
            <a href="#home" className="hover:text-white transition-colors group">
              <span className="text-[#C778DD]">#</span>home
            </a>
            <a href="#works" className="hover:text-white transition-colors group">
              <span className="text-[#C778DD]">#</span>works
            </a>
            <a href="#about-me" className="hover:text-white transition-colors group">
              <span className="text-[#C778DD]">#</span>about-me
            </a>
            <a href="#contacts" className="hover:text-white transition-colors group">
              <span className="text-[#C778DD]">#</span>contacts
            </a>
            <Link href="/admin" className="hover:text-white transition-colors group">
              <span className="text-[#C778DD]">#</span>admin
            </Link>
            <div className="ml-4 flex items-center gap-1 cursor-pointer hover:text-white">
              <span>EN</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
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
            <a href="#contacts" className="border border-[#C778DD] text-white py-2 px-4 hover:bg-[#C778DD] hover:bg-opacity-20 transition-all duration-300 font-medium text-sm inline-block">
              Contact me !!
            </a>
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
                  alt="Parth" 
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
               <span>Currently working on <strong className="text-white">Portfolio</strong></span>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="flex justify-center mb-24 relative mt-20">
             <div className="border border-[#ABB2BF] p-8 inline-block relative bg-[#282C33]">
                 <div className="absolute -top-3 left-4 px-2 bg-[#282C33] text-2xl font-medium text-[#ABB2BF]">"</div>
                 <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                    With great power comes great electricity bill
                 </h3>
                 <div className="absolute -bottom-3 right-4 px-2 bg-[#282C33] text-2xl font-medium text-[#ABB2BF]">"</div>
             </div>
             <div className="border border-[#ABB2BF] border-t-0 p-4 absolute right-[20%] md:right-[30%] -bottom-14 bg-[#282C33]">
                - Dr. Who
             </div>
        </section>

        {/* Projects Section */}
        <section id="works" className="mb-24">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4 w-2/3">
              <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>projects</h2>
              <div className="h-px bg-[#C778DD] w-full max-w-[500px]"></div>
            </div>
            <Link href="/projects" className="hidden md:flex items-center gap-2 text-white hover:text-[#C778DD] transition-colors">
              View all ~~&gt;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="border border-[#ABB2BF]">
                <div className="h-[200px] border-b border-[#ABB2BF] overflow-hidden">
                  <img src={project.image || null} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-2 border-b border-[#ABB2BF] text-[#ABB2BF]">
                  {project.tech}
                </div>
                <div className="p-4">
                  <h3 className="text-2xl font-medium mb-4 text-white">{project.title}</h3>
                  <p className="text-[#ABB2BF] mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    <a 
                      href={project.link?.startsWith("http") ? project.link : `https://${project.link}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="border border-[#C778DD] px-4 py-2 text-white hover:bg-[#C778DD] hover:bg-opacity-20 transition-all font-medium text-sm flex items-center gap-2"
                    >
                      Live &lt;~&gt;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        {content.skills.length > 0 && (
          <section id="skills" className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>skills</h2>
              <div className="h-px bg-[#C778DD] w-64"></div>
            </div>

          <div className="flex flex-col md:flex-row gap-16">
            {/* Left Side - Decorations */}
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

            {/* Right Side - Skills Grid */}
            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
               {content.skills.map((category, idx) => (
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
        )}

        {/* About Me Section */}
        <section id="about-me" className="mb-32 relative">
           <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>about-me</h2>
            <div className="h-px bg-[#C778DD] w-64"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-12">
            
            {/* Left Content */}
            <div className="md:w-1/2 text-[#ABB2BF] leading-relaxed">
              <p className="mb-8">
                {content.about.text1}
              </p>
              <p className="mb-8">
                {content.about.text2}
              </p>
              <p className="mb-8">
                {content.about.text3}
              </p>
              <Link href="/about-me" className="border border-[#C778DD] px-4 py-2 text-white hover:bg-[#C778DD] hover:bg-opacity-20 transition-all font-medium text-sm inline-flex items-center gap-2">
                Read more -&gt;
              </Link>
            </div>

            {/* Right Image */}
            <div className="md:w-1/2 relative flex justify-center">
               <div className="relative">
                  {/* Image */}
                  <div className="w-[340px] h-[500px] border-b border-[#C778DD] relative z-10">
                      <img 
                        src={content.about.image || "https://via.placeholder.com/400x500/282c33/abb2bf?text=Parth"} 
                        alt="Parth" 
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

        {/* Contacts Section */}
        <section id="contacts" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>contacts</h2>
            <div className="h-px bg-[#C778DD] w-32"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-12 relative">
             {/* Left Text */}
             <div className="md:w-1/2 text-[#ABB2BF]">
                <p className="mb-4">
                  I&apos;m interested in freelance opportunities. However, if you have other request or question, don&apos;t hesitate to contact me
                </p>
             </div>

             {/* Right Box */}
             <div className="md:w-1/2 flex justify-end">
                <div className="border border-[#ABB2BF] p-4 min-w-[200px]">
                   <h4 className="font-semibold text-white mb-4">Message me here</h4>
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
