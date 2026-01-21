"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-6 top-8 bottom-8 flex-col items-center gap-4 z-50 hidden md:flex">
      {/* Top Decoration: Dots */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {[...Array(6)].map((_, i) => (
           <div key={i} className="w-1 h-1 bg-[#ABB2BF] rounded-full"></div>
        ))}
      </div>

      {/* Track & Thumb */}
      <div className="relative flex-1 w-[1px] bg-[#ABB2BF] opacity-30">
        {/* Fill/Progress Line (Optional, maybe just the circle moving is enough like the photo) */}
        
        {/* Moving Circle Thumb */}
        <div 
            className="absolute left-1/2 w-3 h-3 bg-[#C778DD] rounded-full -translate-x-1/2 shadow-[0_0_10px_#C778DD]"
            style={{
                top: `${scrollProgress * 100}%`
            }}
        ></div>
      </div>
    </div>
  );
}
