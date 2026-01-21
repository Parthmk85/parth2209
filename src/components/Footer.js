
export default function Footer() {
  return (
    <footer className="border-t border-[#ABB2BF] pt-8 pb-8 mt-32">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        
        {/* Left */}
        <div>
           <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2H4V14H12V10H8V8H12V2ZM4 0C2.89543 0 2 0.89543 2 2V14C2 15.1046 2.89543 16 4 16H12C13.1046 16 14 15.1046 14 14V2C14 0.89543 13.1046 0 12 0H4Z" />
                <path d="M6 4H10V6H6V4Z" fill="#282C33"/>
              </svg>
              <span>Parth</span>
              <a href="mailto:parthmk85@gmail.com" className="text-[#ABB2BF] font-normal text-sm ml-4">parthmk85@gmail.com</a>
           </div>
           <p className="text-[#ABB2BF]">Web designer and full stack developer</p>
        </div>
      </div>
      
      <div className="text-center text-[#ABB2BF] text-sm">
         &copy; Copyright 2022. Made by Parth
      </div>
    </footer>
  );
}
