"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Paintbrush, Video, Camera, Palette, Box, Lightbulb } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const customSkills = [
  { icon: <Paintbrush size={24} />, title: "Digital Art & Illustration", level: 90, color: "from-pink-500 to-rose-400" },
  { icon: <Video size={24} />, title: "Motion Graphics & VFX", level: 85, color: "from-violet-500 to-purple-400" },
  { icon: <Camera size={24} />, title: "Cinematography", level: 75, color: "from-blue-500 to-cyan-400" },
  { icon: <Palette size={24} />, title: "Brand Identity Design", level: 88, color: "from-emerald-500 to-teal-400" },
  { icon: <Box size={24} />, title: "3D Modeling (Blender)", level: 70, color: "from-orange-500 to-amber-400" },
  { icon: <Lightbulb size={24} />, title: "Creative Direction", level: 95, color: "from-yellow-500 to-orange-400" }
];

export function SideHustleSkills() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(".hustle-header", 
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

      // Stagger Items
      gsap.fromTo(itemsRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hustle-grid",
            start: "top 75%",
          }
        }
      );

      // Progress bar fill on scroll
      barsRef.current.forEach((bar, i) => {
        const targetWidth = bar.getAttribute("data-width");
        gsap.fromTo(bar, 
          { width: "0%" },
          {
            width: `${targetWidth}%`,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.2 + (i * 0.1),
            scrollTrigger: {
              trigger: ".hustle-grid",
              start: "top 75%",
            }
          }
        );
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="side-hustle" ref={containerRef} className="py-32 flex flex-col items-center justify-center relative overflow-hidden bg-background">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-10"
           style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(236,72,153,0.3) 0%, transparent 50%)' }} />

      <div className="max-w-4xl mx-auto w-full px-6 md:px-12 lg:px-20 space-y-24 relative z-10">
        
        <div className="hustle-header flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono tracking-[0.4em] uppercase text-foreground/50 font-bold">04 — Side Hustles</span>
            <div className="w-12 h-px bg-foreground/20"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase leading-[0.9]">
            Beyond the <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Terminal.</span>
          </h2>
          <p className="text-foreground/50 text-sm font-light max-w-xl font-mono mt-4">
            Engineering is my profession, but creativity is my core. Exploring visual arts, motion design, and cinematography.
          </p>
        </div>

        <div className="hustle-grid flex flex-col gap-8 relative z-20">
          {customSkills.map((skill, i) => (
            <div 
              key={i} 
              ref={(el) => { if(el) itemsRef.current[i] = el; }}
              className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/10 transition-colors backdrop-blur-3xl overflow-hidden"
            >
              {/* Icon Container */}
              <div className="relative z-10 w-14 h-14 shrink-0 rounded-2xl bg-background border border-foreground/10 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:text-white transition-all duration-500 shadow-xl overflow-hidden">
                 <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                 <div className="relative z-10">{skill.icon}</div>
              </div>
              
              <div className="flex-1 w-full space-y-3 relative z-10">
                <div className="flex justify-between items-end">
                  <h3 className="text-lg font-bold font-heading text-foreground tracking-tight">{skill.title}</h3>
                  <span className="text-xs font-mono text-foreground/40 tabular-nums">{skill.level}%</span>
                </div>
                
                {/* Progress Bar Track */}
                <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-foreground/10">
                   <div 
                     ref={(el) => { if(el) barsRef.current[i] = el; }}
                     data-width={skill.level}
                     className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}