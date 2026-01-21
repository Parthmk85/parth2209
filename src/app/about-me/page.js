import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function AboutMe() {
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
            <Link href="/projects" className="hover:text-white transition-colors group">
              <span className="text-[#C778DD]">#</span>works
            </Link>
            <Link href="/about-me" className="hover:text-white transition-colors group text-white font-semibold">
              <span className="text-[#C778DD]">#</span>about-me
            </Link>
            <Link href="/#contacts" className="hover:text-white transition-colors group">
              <span className="text-[#C778DD]">#</span>contacts
            </Link>
            <div className="ml-4 flex items-center gap-1 cursor-pointer hover:text-white">
              <span>EN</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          </nav>
        </header>

        {/* Page Title */}
        <div className="mb-12">
             <h1 className="text-3xl font-semibold mb-2"><span className="text-[#C778DD]">/</span>about-me</h1>
             <p className="text-[#ABB2BF]">Who am I?</p>
        </div>

        {/* About Me Content */}
        <section className="flex flex-col md:flex-row justify-between gap-12 mb-32 relative">
             {/* Left Content */}
             <div className="md:w-1/2 text-[#ABB2BF] leading-relaxed">
               <p className="mb-8">
                 Hello, I&apos;m Parth!
               </p>
               <p className="mb-8">
                 I&apos;m a self-taught front-end developer based in Kyiv, Ukraine. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.
               </p>
               <p className="mb-8">
                 Transforming my creativity and knowledge into a websites has been my passion for over a year. I have been helping various clients to establish their presence online. I always strive to learn about the newest technologies and frameworks.
               </p>
             </div>

             {/* Right Image */}
             <div className="md:w-1/2 relative flex justify-center">
                <div className="relative">
                   <div className="w-[300px] h-[400px] relative z-10">
                       <img 
                         src="/parth-portfolio.png" 
                         alt="Parth" 
                         className="w-full h-full object-cover grayscale"
                       />
                   </div>
                   {/* Dots decoration */}
                   <div className="absolute top-12 -left-4 grid grid-cols-5 gap-4 z-20">
                     {[...Array(25)].map((_, i) => (
                         <div key={i} className="w-1 h-1 bg-[#ABB2BF] rounded-full"></div>
                     ))}
                   </div>
                   {/* Middle right dots */}
                   <div className="absolute top-1/2 -right-12 grid grid-cols-5 gap-4 z-20">
                     {[...Array(20)].map((_, i) => (
                         <div key={i} className="w-1 h-1 bg-[#ABB2BF] rounded-full"></div>
                     ))}
                   </div>
                </div>
             </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>skills</h2>
          </div>

          <div className="flex flex-wrap gap-4">
               {/* Column 1 */}
               <div className="flex flex-col gap-4">
                  <div className="border border-[#ABB2BF] w-44">
                     <h4 className="border-b border-[#ABB2BF] p-2 font-semibold text-white">Languages</h4>
                     <p className="p-2 text-[#ABB2BF]">TypeScript Lua<br/>Python JavaScript</p>
                  </div>
               </div>

               {/* Column 2 */}
               <div className="flex flex-col gap-4">
                  <div className="border border-[#ABB2BF] w-44">
                     <h4 className="border-b border-[#ABB2BF] p-2 font-semibold text-white">Other</h4>
                     <p className="p-2 text-[#ABB2BF]">HTML CSS EJS SCSS<br/>REST Jinja</p>
                  </div>
               </div>

               {/* Column 3 */}
               <div className="flex flex-col gap-4">
                  <div className="border border-[#ABB2BF] w-44">
                     <h4 className="border-b border-[#ABB2BF] p-2 font-semibold text-white">Tools</h4>
                     <p className="p-2 text-[#ABB2BF]">VSCode Neovim Linux<br/>Figma XFCE Arch<br/>Git Font Awesome</p>
                  </div>
               </div>
               
               {/* Column 4 */}
               <div className="flex flex-col gap-4">
                  <div className="border border-[#ABB2BF] w-44">
                     <h4 className="border-b border-[#ABB2BF] p-2 font-semibold text-white">Databases</h4>
                     <p className="p-2 text-[#ABB2BF]">SQLite PostgreSQL<br/>Mongo</p>
                  </div>
               </div>

               {/* Column 5 */}
               <div className="flex flex-col gap-4">
                  <div className="border border-[#ABB2BF] w-44">
                     <h4 className="border-b border-[#ABB2BF] p-2 font-semibold text-white">Frameworks</h4>
                     <p className="p-2 text-[#ABB2BF]">React Vue<br/>Disnake Discord.js<br/>Flask Express.js</p>
                  </div>
               </div>
          </div>
        </section>

        {/* My Fun Facts Section */}
        <section id="my-fun-facts" className="mb-24 relative">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>my-fun-facts</h2>
          </div>

          <div className="flex flex-wrap gap-4 max-w-2xl relative z-10">
              <div className="border border-[#ABB2BF] p-2 text-[#ABB2BF]">I like winter more than summer</div>
              <div className="border border-[#ABB2BF] p-2 text-[#ABB2BF]">I often bike with my friends</div>
              <div className="border border-[#ABB2BF] p-2 text-[#ABB2BF]">I like pizza and pasta</div>
              <div className="border border-[#ABB2BF] p-2 text-[#ABB2BF]">I was in Egypt, Poland and Turkey</div>
              <div className="border border-[#ABB2BF] p-2 text-[#ABB2BF]">My favorite movie is The Green Mile</div>
              <div className="border border-[#ABB2BF] p-2 text-[#ABB2BF]">I am still in school</div>
              <div className="border border-[#ABB2BF] p-2 text-[#ABB2BF]">I don&apos;t have any siblings</div>
          </div>

          {/* Decorations */}
           <div className="absolute top-0 right-0 hidden md:block">
               {/* Dots */}
               <div className="grid grid-cols-5 gap-4 mb-12">
                   {[...Array(15)].map((_, i) => (
                       <div key={i} className="w-1 h-1 bg-[#ABB2BF] rounded-full"></div>
                   ))}
               </div>
               {/* Squares */}
               <div className="relative w-32 h-32">
                   <div className="absolute top-0 right-8 w-24 h-24 border border-[#C778DD]"></div>
                   <div className="absolute top-8 right-0 w-24 h-24 border border-[#C778DD]"></div>
               </div>
           </div>
           
           <div className="absolute bottom-0 -left-8 md:hidden">
              <div className="w-24 h-24 border border-[#C778DD]"></div>
           </div>
        </section>

        {/* Footer - Shared */}
        <Footer />

      </div>
      
       <div className="fixed top-0 left-8 h-[200px] w-px bg-transparent md:hidden"></div>
    </div>
  );
}
