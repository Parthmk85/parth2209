import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
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
              Parth is a <span className="text-[#C778DD]">web designer</span> and <span className="text-[#C778DD]">front-end developer</span>
            </h1>
            <p className="text-[#ABB2BF] mb-8 leading-relaxed max-w-md">
              He crafts responsive websites where technologies meet creativity
            </p>
            <button className="border border-[#C778DD] text-white py-2 px-4 hover:bg-[#C778DD] hover:bg-opacity-20 transition-all duration-300 font-medium text-sm">
              Contact me !!
            </button>
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
               {/* Since we don't have the exact image, I'll use a placeholder that looks cool/dark or just a colored block if needed, but the user wants 'same'. 
                   I will try to simulate the look with a placeholder image from standard placeholder services if I can find a 'person' one, or just a dark shape.
                   Actually, I'll use a generic developer/hoodie guy if I can link one, or a solid placeholder. 
               */}
                <img 
                 src="/parth-portfolio.png" 
                 alt="Parth" 
                 className="w-full h-full object-cover object-[50%_25%] filter grayscale transition-all duration-500"
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
            {/* Project 1: ChertNodes */}
            <div className="border border-[#ABB2BF]">
              <div className="h-[200px] border-b border-[#ABB2BF] overflow-hidden">
                <img src="glamora.png" alt="ChertNodes" className="w-full h-full object-cover" />
              </div>
              <div className="p-2 border-b border-[#ABB2BF] text-[#ABB2BF]">
                Next js , Tailwind css , Framer motion
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-medium mb-4 text-white">Glamora</h3>
                <p className="text-[#ABB2BF] mb-4">E-commerce website</p>
                <div className="flex gap-4">
                  <a href="https://final-glamora.vercel.app/" target="_blank" className="border border-[#C778DD] px-4 py-2 text-white hover:bg-[#C778DD] hover:bg-opacity-20 transition-all font-medium text-sm flex items-center gap-2">
                    Live &lt;~&gt;
                  </a>
                  
                </div>
              </div>
            </div>

            {/* Project 2: ProtectX */}
            <div className="border border-[#ABB2BF]">
              <div className="h-[200px] border-b border-[#ABB2BF] overflow-hidden relative">
                 <img src="medikit.png" alt="ProtectX" className="w-full h-full object-cover" />
                 {/* Decorative elements to match design - optional */}
              </div>
              <div className="p-2 border-b border-[#ABB2BF] text-[#ABB2BF]">
Next js , Tailwind css , Framer motion              </div>
              <div className="p-4">
                <h3 className="text-2xl font-medium mb-4 text-white">MediKit</h3>
                <p className="text-[#ABB2BF] mb-4">Medical website</p>
                <div className="flex gap-4">
                  <a href="https://parth-medikit.vercel.app/" target="_blank" className="border border-[#C778DD] px-4 py-2 text-white hover:bg-[#C778DD] hover:bg-opacity-20 transition-all font-medium text-sm flex items-center gap-2">
                    Live &lt;~&gt;
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3: Kahoot Answers Viewer */}
            <div className="border border-[#ABB2BF]">
              <div className="h-[200px] border-b border-[#ABB2BF] overflow-hidden">
                <img src="https://via.placeholder.com/400x200/4c1d95/ffffff?text=Kahoot+Answers" alt="Kahoot Answers" className="w-full h-full object-cover" />
              </div>
              <div className="p-2 border-b border-[#ABB2BF] text-[#ABB2BF]">
                CSS Express Node.js
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-medium mb-4 text-white">Kahoot Answers Viewer</h3>
                <p className="text-[#ABB2BF] mb-4">Get answers to your kahoot quiz</p>
                <div className="flex gap-4">
                  <a href="#" className="border border-[#C778DD] px-4 py-2 text-white hover:bg-[#C778DD] hover:bg-opacity-20 transition-all font-medium text-sm flex items-center gap-2">
                    Live &lt;~&gt;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
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
            <div className="w-full md:w-2/3 flex flex-wrap gap-4 justify-end">
               
               {/* Column 1 */}
               <div className="flex flex-col gap-4">
                  <div className="border border-[#ABB2BF] w-44">
                     <h4 className="border-b border-[#ABB2BF] p-2 font-semibold text-white">Languages</h4>
                     <p className="p-2 text-[#ABB2BF]">Python<br/> JavaScript</p>
                  </div>
               </div>

               {/* Column 2 */}
               <div className="flex flex-col gap-4">
                  <div className="border border-[#ABB2BF] w-44">
                     <h4 className="border-b border-[#ABB2BF] p-2 font-semibold text-white">Databases</h4>
                     <p className="p-2 text-[#ABB2BF]">SQLite <br/>Mongo</p>
                  </div>
                  <div className="border border-[#ABB2BF] w-44">
                     <h4 className="border-b border-[#ABB2BF] p-2 font-semibold text-white">Other</h4>
                     <p className="p-2 text-[#ABB2BF]">HTML CSS EJS <br/></p>
                  </div>
               </div>

               {/* Column 3 */}
               <div className="flex flex-col gap-4">
                  <div className="border border-[#ABB2BF] w-44">
                     <h4 className="border-b border-[#ABB2BF] p-2 font-semibold text-white">Tools</h4>
                     <p className="p-2 text-[#ABB2BF]">VSCode Neovim Linux<br/>Figma XFCE Arch<br/>Git Font Awesome</p>
                  </div>
                  <div className="border border-[#ABB2BF] w-44">
                     <h4 className="border-b border-[#ABB2BF] p-2 font-semibold text-white">Frameworks</h4>
                     <p className="p-2 text-[#ABB2BF]">React Vue<br/>Next Js<br/></p>
                  </div>
               </div>
            </div>
          </div>
        </section>

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
                Hello, I&apos;m Parth!
              </p>
              <p className="mb-8">
                I&apos;m a self-taught front-end developer based in Bhavnagar. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.
              </p>
              <p className="mb-8">
                Transforming my creativity and knowledge into a websites has been my passion for over a year. I have been helping various clients to establish their presence online. I always strive to learn about the newest technologies and frameworks.
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
                               src="/parth-portfolio.png" 
                        alt="Parth" 
                        className="w-full h-full object-cover grayscale"
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
                   <div className="flex flex-col gap-2 text-[#ABB2BF]">
                      <a href="tel:9725942209" className="flex items-center gap-2 hover:text-[#C778DD] transition-colors cursor-pointer">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 16.92V19.92C22.0011 20.1986 21.9442 20.4742 21.8325 20.7308C21.7209 20.9873 21.5567 21.2197 21.3496 21.4144C21.1424 21.6091 20.8966 21.7623 20.6264 21.8651C20.3562 21.9678 20.0671 22.0182 19.776 22.013C16.8271 21.905 13.9845 21.0569 11.444 20.528C9.04306 20.024 6.81268 18.9951 4.90801 17.502C3.1518 16.115 1.70479 14.3932 0.69001 12.428C0.16101 9.88795 0.76001 7.04295 1.78001 4.22395C1.86561 3.59374 2.11463 3.00318 2.50275 2.5085C2.89087 2.01383 3.40498 1.63155 3.99601 1.39795C4.59401 1.15995 5.24201 1.09995 5.86601 1.22395C6.49001 1.34795 7.06001 1.65195 7.50801 2.09995L8.78001 3.37195C9.40578 3.99818 9.75713 4.84738 9.75713 5.73295C9.75713 6.61853 9.40578 7.46772 8.78001 8.09395L8.03801 8.83595C8.42316 10.3235 9.14187 11.7107 10.1343 12.8795C11.1267 14.0483 12.3639 14.9658 13.744 15.556L14.486 14.814C15.1123 14.1882 15.9614 13.8368 16.847 13.8368C17.7326 13.8368 18.5818 14.1882 19.208 14.814L20.48 16.086C20.8407 16.4468 21.1068 16.8893 21.2584 17.379C21.4099 17.8687 21.4429 18.3924 21.3546 18.909C21.2663 19.4255 21.0589 19.921 20.7482 20.3559C20.4375 20.7907 20.0315 21.1534 19.562 21.416L18.942 21.808C18.942 21.808 18.942 21.808 18.942 21.808Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 16.92L19.208 14.128C18.5818 13.5022 17.7326 13.1508 16.847 13.1508C15.9614 13.1508 15.1123 13.5022 14.486 14.128L13.744 14.87C12.3639 14.2798 11.1267 13.3623 10.1343 12.1935C9.14187 11.0247 8.42316 9.63754 8.03801 8.14995L8.78001 7.40795C9.40578 6.78172 9.75713 5.93253 9.75713 5.04695C9.75713 4.16138 9.40578 3.31218 8.78001 2.68595L7.50801 1.41395C7.06001 0.965953 6.49001 0.661953 5.86601 0.537953C5.24201 0.413953 4.59401 0.473953 3.99601 0.711953C3.40498 0.945553 2.89087 1.32783 2.50275 1.8225C2.11463 2.31718 1.86561 2.90774 1.78001 3.53795C0.76001 6.35695 0.16101 9.20195 0.69001 11.742C1.70479 13.7072 3.1518 15.429 4.90801 16.816C6.81268 18.3091 9.04306 19.338 11.444 19.842C13.9845 20.3709 16.8271 21.219 19.776 21.327C20.0671 21.3323 20.3562 21.2818 20.6264 21.1791C20.8966 21.0763 21.1424 20.9231 21.3496 20.7284C21.5567 20.5337 21.7209 20.3013 21.8325 20.0448C21.9442 19.7882 22.0011 19.5126 22 19.234V16.92Z" fill="currentColor"/>
                         </svg>
                         <span>9725942209</span>
                      </a>
                      <a href="mailto:parthmk85@gmail.com" className="flex items-center gap-2 hover:text-[#C778DD] transition-colors cursor-pointer">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                         <span>parthmk85@gmail.com</span>
                      </a>
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
