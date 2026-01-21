"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
      
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      );
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <>
      {/* Spotlight Effect */}
      <div 
        className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-0 opacity-30"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          background: "radial-gradient(circle, rgba(199, 120, 221, 0.4) 0%, rgba(0, 0, 0, 0) 70%)"
        }}
      />

      {/* Main Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#C778DD] rounded-full pointer-events-none z-[9999] transition-transform duration-0"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />
      
      {/* Trailing Ring */}
      <div
        className={`fixed top-0 left-0 border border-[#C778DD] rounded-full pointer-events-none z-[9999] transition-all duration-150 ease-out will-change-transform ${
          isPointer ? "w-12 h-12" : "w-8 h-8"
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          backgroundColor: 'transparent' // Explicitly ensuring no fill
        }}
      />
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
