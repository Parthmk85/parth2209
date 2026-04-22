import Link from "next/link";
import Footer from "@/components/Footer";
import { getProjects } from "@/lib/data";

export default async function Projects() {
  const projects = await getProjects() || [];

  return (
    <div className="min-h-screen text-white flex flex-col relative overflow-x-hidden font-mono">
      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-24 py-8 max-w-7xl">
        
        {/* Navbar */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2 font-bold text-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2H4V14H12V10H8V8H12V2ZM4 0C2.89543 0 2 0.89543 2 2V14C2 15.1046 2.89543 16 4 16H12C13.1046 16 14 15.1046 14 14V2C14 0.89543 13.1046 0 12 0H4Z" />
              <path d="M6 4H10V6H6V4Z" fill="#282C33"/>
            </svg>
            <span>Parth Patel</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[#ABB2BF] font-medium">
            <Link href="/" className="hover:text-white transition-colors group">
              <span className="text-[#C778DD]">#</span>home
            </Link>
            <Link href="/projects" className="hover:text-white transition-colors group text-white font-semibold">
              <span className="text-[#C778DD]">#</span>works
            </Link>
            <Link href="/#about-me" className="hover:text-white transition-colors group">
              <span className="text-[#C778DD]">#</span>about-me
            </Link>
            <Link href="/#contacts" className="hover:text-white transition-colors group">
              <span className="text-[#C778DD]">#</span>contacts
            </Link>
          </nav>
        </header>

        {/* Page Title */}
        <div className="mb-16">
             <h1 className="text-3xl font-semibold mb-2"><span className="text-[#C778DD]">/</span>projects</h1>
             <p className="text-[#ABB2BF]">List of my dynamic projects</p>
        </div>

        {/* Dynamic Projects Section */}
        <section id="complete-apps" className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>all-projects</h2>
            <div className="h-px bg-[#C778DD] flex-1"></div>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-[#ABB2BF] border-opacity-20">
              <p className="text-[#ABB2BF]">No projects found in the database. Add some from the admin panel!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project._id} className="border border-[#ABB2BF] hover:border-[#C778DD] transition-all group">
                  <div className="h-[200px] border-b border-[#ABB2BF] overflow-hidden group-hover:opacity-80 transition-opacity">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2 border-b border-[#ABB2BF] text-[#ABB2BF] text-sm italic">
                    {project.tech}
                  </div>
                  <div className="p-4">
                    <h3 className="text-2xl font-medium mb-4 text-white group-hover:text-[#C778DD] transition-colors">{project.title}</h3>
                    <p className="text-[#ABB2BF] mb-4 line-clamp-2">{project.description}</p>
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
          )}
        </section>

        <Footer />
      </div>
    </div>
  );
}
