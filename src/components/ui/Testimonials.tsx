"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote: "Mahesh completely transformed our enterprise architecture. His approach to system design is both elegant and incredibly robust. A rare talent who understands both infrastructure and user experience.",
    author: "Sarah Jenkins",
    role: "CTO, TechNova Solutions",
  },
  {
    quote: "Working with Mahesh was a masterclass in modern web development. The performance gains we saw after his optimizations were staggering. He doesn't just write code; he crafts technical solutions.",
    author: "David Chen",
    role: "Lead Architect, Nexus Group",
  },
  {
    quote: "His ability to bridge the gap between complex backend logic and pixel-perfect UI is unmatched. Mahesh delivered our product flawlessy, on time, and with impeccable attention to detail.",
    author: "Elena Rodriguez",
    role: "Product Director, Vertex Dynamics",
  }
];

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(".test-header", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // Stagger Cards
      gsap.fromTo(cardsRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".test-grid",
            start: "top 70%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={containerRef} className="py-32 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-background">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.05]"
           style={{ backgroundImage: 'radial-gradient(circle at 0% 100%, rgba(255,255,255,1) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto w-full space-y-24 relative z-10">
        
        <div className="test-header flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-foreground/20"></div>
            <span className="text-xs font-mono tracking-[0.4em] uppercase text-foreground/50 font-bold">07 — Endorsements</span>
            <div className="w-12 h-px bg-foreground/20"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase leading-[0.9]">
            Peer <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-600">Review.</span>
          </h2>
        </div>

        <div className="test-grid grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
          {testimonials.map((test, i) => (
            <div 
              key={i} 
              ref={(el) => { if(el) cardsRef.current[i] = el; }}
              className="group relative p-10 flex flex-col gap-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-foreground/30 transition-colors backdrop-blur-md overflow-hidden"
            >
              <Quote className="text-foreground/10 w-16 h-16 absolute -top-4 -left-4 -rotate-12 group-hover:scale-110 group-hover:-rotate-0 group-hover:text-accent-blue/10 transition-all duration-500" />
              
              <p className="text-foreground/80 font-light text-sm md:text-base leading-relaxed relative z-10 font-mono italic">
                "{test.quote}"
              </p>
              
              <div className="mt-auto pt-8 border-t border-foreground/10 relative z-10">
                <h4 className="font-bold font-heading text-foreground tracking-tight">{test.author}</h4>
                <p className="text-xs font-mono text-foreground/50 mt-1 uppercase tracking-wider">{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}