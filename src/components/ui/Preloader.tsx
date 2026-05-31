"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  const words = [
    "Compiling",
    "Linking",
    "Building",
    "Initializing",
    "Booting",
    "Online"
  ];
  
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";
    
    let lastWordIndex = 0;
    // Progress increment
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 2;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Final exit sequence
        const tl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            document.body.style.overflow = "";
          }
        });
        
        tl.to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in"
        })
        .to(progressBarRef.current, {
          scaleX: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        }, "-=0.3")
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut"
        }, "-=0.2");
      }
      
      setProgress(currentProgress);
      
      // Update word based on progress
      const wordIndex = Math.min(
        Math.floor((currentProgress / 100) * words.length),
        words.length - 1
      );
      
      if (wordIndex !== lastWordIndex && wordRef.current) {
        lastWordIndex = wordIndex;
        gsap.to(wordRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            setCurrentWord(words[wordIndex]);
            gsap.fromTo(wordRef.current, 
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.2 }
            );
          }
        });
      }
      
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-sm px-6">
        <div ref={textRef} className="flex justify-between items-end mb-4 font-mono text-sm tracking-widest text-white/50 uppercase">
          <div ref={wordRef} className="font-bold text-white">{currentWord}</div>
          <div className="tabular-nums">{progress}%</div>
        </div>
        
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] origin-left"
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          ></div>
        </div>
      </div>
    </div>
  );
};