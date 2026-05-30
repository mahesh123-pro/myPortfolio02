"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Center coordinates
    const curPos = { x: 0, y: 0 };
    const folPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      curPos.x = e.clientX;
      curPos.y = e.clientY;

      gsap.to(cursor, {
        x: curPos.x,
        y: curPos.y,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(follower, {
        x: curPos.x,
        y: curPos.y,
        duration: 0.6,
        ease: "power3.out"
      });

      const target = e.target as HTMLElement;
      const isPointer = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") || 
        target.closest("button");
      
      setIsHovering(!!isPointer);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-2 h-2 bg-foreground rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${isHovering ? 'scale-[3]' : 'scale-100'}`}
      />
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-10 h-10 border border-foreground/30 bg-foreground/5 backdrop-blur-[1px] rounded-full pointer-events-none z-[9998] hidden lg:block transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isHovering ? 'scale-150 border-foreground/50 bg-foreground/10' : 'scale-100'}`}
      />
    </>
  );
}