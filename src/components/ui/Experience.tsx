"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyData, type JourneyStep } from "@/data/experience";
import { Calendar } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Draw the vertical timeline line dynamically with scroll trigger
    const line = lineRef.current;
    const container = containerRef.current;
    if (!line || !container) return;

    gsap.fromTo(line, 
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "bottom 80%",
          scrub: true,
        }
      }
    );

    // 2. Animate timeline blocks
    const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
    items.forEach((item, i) => {
      const isLeft = i % 2 === 0;
      const content = item.querySelector('.timeline-content');
      const dot = item.querySelector('.timeline-dot');

      // Animate dot pop-in
      if (dot) {
        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        });
      }

      // Animate content card slide-in
      if (content) {
        gsap.from(content, {
          x: isLeft ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        });
      }
    });

  }, []);

  const experiences = Object.values(journeyData);

  return (
    <section id="experience" ref={containerRef} className="relative w-full py-28 bg-[#0A0A0A] overflow-hidden border-t border-white/5">
      
      {/* Background glow node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#ff6b00]/1 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-20 relative z-10 text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#ff6b00]" />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#ff6b00] font-bold">05 — History</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase text-white leading-none">
            Learning & <span className="text-gradient-orange">Milestones.</span>
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light max-w-xl font-mono mt-2">
            The chronological progression of my technology stacks: Linux foundations, AWS deployment, Azure architectures, DevOps, and leadership.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="relative wrap flex flex-col items-center">
          
          {/* Static background track */}
          <div className="absolute w-[2px] h-full bg-white/5 left-[20px] lg:left-1/2 lg:-translate-x-1/2 rounded-full" />
          
          {/* Active orange glowing line drawn by GSAP */}
          <div ref={lineRef} className="absolute w-[2px] h-full bg-gradient-to-b from-[#ff6b00] to-[#ffaa00] left-[20px] lg:left-1/2 lg:-translate-x-1/2 rounded-full z-10 shadow-[0_0_12px_#ff6b00]" />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div 
                key={exp.id} 
                className="timeline-item w-full flex justify-[flex-start] lg:justify-between items-center mb-16 relative pl-12 lg:pl-0"
              >
                
                {/* Timeline Dot with orange glow ring */}
                <div className="timeline-dot absolute w-8 h-8 rounded-full border-2 border-[#ff6b00] bg-black shadow-[0_0_10px_rgba(255,107,0,0.5)] z-20 left-[6px] lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b00]" />
                </div>

                {/* Left Card (Large screens) */}
                <div className={`hidden lg:block w-5/12 ${isLeft ? 'text-right pr-10' : 'lg:invisible'}`}>
                  {isLeft && <TimelineCard exp={exp} isRight={false} />}
                </div>

                {/* Right Card */}
                <div className={`w-full lg:w-5/12 ${!isLeft ? 'lg:pl-10 text-left' : 'lg:invisible'}`}>
                  <TimelineCard exp={exp} isRight={true} />
                </div>
                
              </div>
            );
          })}

        </div>
      </div>

    </section>
  );
}

function TimelineCard({ exp, isRight }: { exp: JourneyStep, isRight: boolean }) {
  return (
    <div className="timeline-content bg-white/3 p-6 sm:p-8 rounded-[2rem] border border-white/5 hover:border-[#ff6b00]/30 hover:bg-white/5 transition-all duration-300 relative group flex flex-col gap-4">
      {/* Subtle hover backlight glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#ff6b00]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />

      <div className={`flex flex-col gap-1 relative z-10 ${isRight ? 'text-left' : 'lg:text-right text-left'}`}>
        <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-[#ff6b00] uppercase flex items-center gap-1.5 justify-start lg:justify-end">
          <Calendar className="w-3.5 h-3.5" />
          {exp.year}
        </span>
        <h3 className="text-xl sm:text-2xl font-heading font-black text-white leading-tight uppercase group-hover:text-[#ff6b00] transition-colors duration-300">
          {exp.role}
        </h3>
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white/50">
          @ {exp.company}
        </h4>
      </div>

      <p className={`text-white/60 text-xs sm:text-sm font-light leading-relaxed relative z-10 ${isRight ? 'text-left' : 'lg:text-right text-left'}`}>
        {exp.description}
      </p>

      <div className={`flex flex-wrap gap-1.5 relative z-10 ${isRight ? 'justify-start' : 'lg:justify-end justify-start'}`}>
        {exp.skills.map((skill: string) => (
          <span 
            key={skill} 
            className="px-2.5 py-1 bg-black/60 border border-white/5 rounded-lg text-[9px] font-mono uppercase tracking-wide text-white/80"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}