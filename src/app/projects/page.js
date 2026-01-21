import Link from "next/link";
import Footer from "@/components/Footer";

export default function Projects() {
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
            <div className="ml-4 flex items-center gap-1 cursor-pointer hover:text-white">
              <span>EN</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          </nav>
        </header>

        {/* Page Title */}
        <div className="mb-16">
             <h1 className="text-3xl font-semibold mb-2"><span className="text-[#C778DD]">/</span>projects</h1>
             <p className="text-[#ABB2BF]">List of my projects</p>
        </div>

        {/* Complete Apps Section */}
        <section id="complete-apps" className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>complete-apps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="border border-[#ABB2BF]">
              <div className="h-[200px] border-b border-[#ABB2BF] overflow-hidden relative">
                <img src="https://via.placeholder.com/400x200/282C33/ABB2BF?text=ChertNodes" alt="ChertNodes" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#282C33]/80 flex items-center justify-center z-10 transition-opacity duration-300">
                  <span className="text-2xl font-bold text-white">Coming Up</span>
                </div>
              </div>
              <div className="p-2 border-b border-[#ABB2BF] text-[#ABB2BF]">HTML SCSS Python Flask</div>
              <div className="p-4">
                <h3 className="text-2xl font-medium mb-4 text-white">ChertNodes</h3>
                <p className="text-[#ABB2BF] mb-4">Minecraft servers hosting</p>
                <div className="flex gap-4">
                  <a href="#" className="border border-[#C778DD] px-4 py-2 text-white hover:bg-[#C778DD] hover:bg-opacity-20 transition-all font-medium text-sm flex items-center gap-2">Live &lt;~&gt;</a>
                  <a href="#" className="border border-[#ABB2BF] px-4 py-2 text-[#ABB2BF] hover:text-white transition-all font-medium text-sm">Cached &gt;</a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="border border-[#ABB2BF]">
              <div className="h-[200px] border-b border-[#ABB2BF] bg-[#4c1d95] flex items-center justify-center relative overflow-hidden">
                {/* Kahoot styled bg */}
                <h3 className="text-3xl font-bold italic text-white flex gap-1">Kahoot<span className="text-white">!</span></h3>
                <div className="absolute inset-0 bg-[#282C33]/80 flex items-center justify-center z-10 transition-opacity duration-300">
                  <span className="text-2xl font-bold text-white">Coming Up</span>
                </div>
              </div>
              <div className="p-2 border-b border-[#ABB2BF] text-[#ABB2BF]">CSS Express Node.js</div>
              <div className="p-4">
                <h3 className="text-2xl font-medium mb-4 text-white">Kahoot Answers Viewer</h3>
                <p className="text-[#ABB2BF] mb-4">Get answers to your kahoot quiz</p>
                <div className="flex gap-4">
                  <a href="#" className="border border-[#C778DD] px-4 py-2 text-white hover:bg-[#C778DD] hover:bg-opacity-20 transition-all font-medium text-sm flex items-center gap-2">Live &lt;~&gt;</a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="border border-[#ABB2BF]">
              <div className="h-[200px] border-b border-[#ABB2BF] bg-[#1a1c20] flex items-center justify-center relative overflow-hidden">
                 <div className="flex items-center gap-2 text-white text-xl font-bold tracking-widest"><span className="text-green-500">PROTECTX</span></div>
                 <div className="absolute right-4 top-4 text-green-500"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 5V11C4 16.55 7.4 21.74 12 23C16.6 21.74 20 16.55 20 11V5L12 2ZM12 16C10.9 16 10 15.1 10 14C10 12.9 10.9 12 12 12C13.1 12 14 12.9 14 14C14 15.1 13.1 16 12 16ZM13 10H11V7H13V10Z" /></svg></div>
                 <div className="absolute inset-0 bg-[#282C33]/80 flex items-center justify-center z-10 transition-opacity duration-300">
                  <span className="text-2xl font-bold text-white">Coming Up</span>
                </div>
              </div>
              <div className="p-2 border-b border-[#ABB2BF] text-[#ABB2BF]">React Express Discord.js Node.js</div>
              <div className="p-4">
                <h3 className="text-2xl font-medium mb-4 text-white">ProtectX</h3>
                <p className="text-[#ABB2BF] mb-4">Discord anti-crash bot</p>
                <div className="flex gap-4">
                   <a href="#" className="border border-[#ABB2BF] px-4 py-2 text-[#ABB2BF] hover:text-white transition-all font-medium text-sm">Cached &gt;</a>
                </div>
              </div>
            </div>

             {/* Project 4 */}
             <div className="border border-[#ABB2BF]">
              <div className="h-[200px] border-b border-[#ABB2BF] overflow-hidden relative">
                <img src="https://via.placeholder.com/400x200/000000/FFFFFF?text=Kotik+Bot" alt="Kotik Bot" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#282C33]/80 flex items-center justify-center z-10 transition-opacity duration-300">
                  <span className="text-2xl font-bold text-white">Coming Up</span>
                </div>
              </div>
              <div className="p-2 border-b border-[#ABB2BF] text-[#ABB2BF]">HTML CSS JS</div>
              <div className="p-4">
                <h3 className="text-2xl font-medium mb-4 text-white">Kotik Bot</h3>
                <p className="text-[#ABB2BF] mb-4">Multi-functional discord bot</p>
                <div className="flex gap-4">
                  <a href="#" className="border border-[#C778DD] px-4 py-2 text-white hover:bg-[#C778DD] hover:bg-opacity-20 transition-all font-medium text-sm flex items-center gap-2">Live &lt;~&gt;</a>
                </div>
              </div>
            </div>

             {/* Project 5 */}
             <div className="border border-[#ABB2BF]">
              <div className="h-[200px] border-b border-[#ABB2BF] overflow-hidden relative">
                 <img src="/parth-portfolio.png" alt="Portfolio" className="w-full h-full object-cover object-top" />
                 <div className="absolute inset-0 bg-[#282C33]/80 flex items-center justify-center z-10 transition-opacity duration-300">
                  <span className="text-2xl font-bold text-white">Coming Up</span>
                </div>
              </div>
              <div className="p-2 border-b border-[#ABB2BF] text-[#ABB2BF]">Vue TS Less</div>
              <div className="p-4">
                <h3 className="text-2xl font-medium mb-4 text-white">Portfolio</h3>
                <p className="text-[#ABB2BF] mb-4">You&apos;re using it rn</p>
                <div className="flex gap-4">
                  <a href="#" className="border border-[#ABB2BF] px-4 py-2 text-[#ABB2BF] hover:text-white transition-all font-medium text-sm">Github &lt;~&gt;</a>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* Small Projects Section */}
        <section id="small-projects" className="mb-20">
          <div className="flex items-center gap-4 mb-8">
             <h2 className="text-3xl font-medium"><span className="text-[#C778DD]">#</span>small-projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Small Project Card 1 */}
             <div className="border border-[#ABB2BF] p-4">
                <div className="text-[#ABB2BF] text-sm mb-2">HTML CSS JS</div>
                <h3 className="text-xl font-medium text-white mb-2">Jewelery Shop</h3>
                <p className="text-[#ABB2BF] text-sm mb-4">Start creating scalable discord.js bot with typescript in seconds</p>
                <a href="https://parthmk85.github.io/Project-22/" target="_blank" className="border border-[#C778DD] px-3 py-1 text-white hover:bg-[#C778DD] hover:bg-opacity-20 transition-all font-medium text-sm inline-block">View &lt;~&gt;</a>
             </div>
             
             {/* Small Project Card 2 */}
             <div className="border border-[#ABB2BF] p-4">
                <div className="text-[#ABB2BF] text-sm mb-2">HTML CSS JS</div>
                <h3 className="text-xl font-medium text-white mb-2">Tour & Travel</h3>
                <p className="text-[#ABB2BF] text-sm mb-4">Front-end of my future blog website written in vue</p>
                <a href="https://parthmk85.github.io/Project-23/" target="_blank" className="border border-[#ABB2BF] px-3 py-1 text-[#ABB2BF] hover:text-white transition-all font-medium text-sm inline-block">View    &lt;~&gt;</a>
             </div>

             {/* Small Project Card 3 */}
             <div className="border border-[#ABB2BF] p-4">
                <div className="text-[#ABB2BF] text-sm mb-2">HTML CSS JS</div>
                <h3 className="text-xl font-medium text-white mb-2">Car Dealer</h3>
                <p className="text-[#ABB2BF] text-sm mb-4">Figma landing page about service for viewing chess tournaments</p>
                <a href="https://parthmk85.github.io/Project24/" target="_blank" className="border border-[#ABB2BF] px-3 py-1 text-[#ABB2BF] hover:text-white transition-all font-medium text-sm inline-block">View &lt;~&gt;</a>
             </div>

             {/* Small Project Card 4 */}
             <div className="border border-[#ABB2BF] p-4">
                <div className="text-[#ABB2BF] text-sm mb-2">HTML CSS JS</div>
                <h3 className="text-xl font-medium text-white mb-2">Tech Pro</h3>
                <p className="text-[#ABB2BF] text-sm mb-4">Figma template for website about anti-raid, anti-crash discord bot</p>
                <a href="https://parthmk85.github.io/Project26/" target="_blank" className="border border-[#ABB2BF] px-3 py-1 text-[#ABB2BF] hover:text-white transition-all font-medium text-sm inline-block">View &lt;~&gt;</a>
             </div>

             {/* Small Project Card 5 */}
             <div className="border border-[#ABB2BF] p-4">
                <div className="text-[#ABB2BF] text-sm mb-2">HTML CSS</div>
                <h3 className="text-xl font-medium text-white mb-2">CSS expirements</h3>
                <p className="text-[#ABB2BF] text-sm mb-4">Collection of my different little projects in css</p>
                <a href="#" className="border border-[#ABB2BF] px-3 py-1 text-[#ABB2BF] hover:text-white transition-all font-medium text-sm inline-block">Live &lt;~&gt;</a>
             </div>

             {/* Small Project Card 6 */}
             <div className="border border-[#ABB2BF] p-4">
                <div className="text-[#ABB2BF] text-sm mb-2">Lua Neovim</div>
                <h3 className="text-xl font-medium text-white mb-2">Web Dev nvim config</h3>
                <p className="text-[#ABB2BF] text-sm mb-4">Config for neovim perfect for web developer</p>
                <a href="#" className="border border-[#ABB2BF] px-3 py-1 text-[#ABB2BF] hover:text-white transition-all font-medium text-sm inline-block">Github &lt;~&gt;</a>
             </div>
             
             {/* Small Project Card 7 */}
             <div className="border border-[#ABB2BF] p-4">
                <div className="text-[#ABB2BF] text-sm mb-2">Python Quart HTML</div>
                <h3 className="text-xl font-medium text-white mb-2">Ooku</h3>
                <p className="text-[#ABB2BF] text-sm mb-4">Simple link shortener with auth</p>
                <a href="#" className="border border-[#C778DD] px-3 py-1 text-white hover:bg-[#C778DD] hover:bg-opacity-20 transition-all font-medium text-sm inline-block">Live &lt;~&gt;</a>
             </div>

             {/* Small Project Card 8 */}
             <div className="border border-[#ABB2BF] p-4">
                <div className="text-[#ABB2BF] text-sm mb-2">Figma</div>
                <h3 className="text-xl font-medium text-white mb-2">School website</h3>
                <p className="text-[#ABB2BF] text-sm mb-4">Figma template website for my school</p>
                <a href="#" className="border border-[#ABB2BF] px-3 py-1 text-[#ABB2BF] hover:text-white transition-all font-medium text-sm inline-block">Figma &lt;~&gt;</a>
             </div>

          </div>
        </section>


        {/* Footer - Shared */}
        {/* Footer - Shared */}
        <Footer />

      </div>
      
       <div className="fixed top-0 left-8 h-[200px] w-[2px] bg-transparent md:hidden"></div>
    </div>
  );
}
