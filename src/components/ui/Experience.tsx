"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { journeyData } from "@/data/experience";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Animate the central vertical line drawing down depending on scroll progress
    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        }
      }
    );

    // 2. Animate each experience block
    const items = gsap.utils.toArray(".timeline-item");
    items.forEach((item: any, i) => {
      // Alternate animation direction for left/right
      const isLeft = i % 2 === 0;
      const content = item.querySelector('.timeline-content');
      const dot = item.querySelector('.timeline-dot');

      // Pop in the dot
      gsap.from(dot, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: item,
          start: "top 70%",
        }
      });

      // Slide in the content card
      gsap.from(content, {
        x: isLeft ? -100 : 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 75%",
        }
      });
    });

  }, { scope: containerRef });

  const experiences = Object.values(journeyData);

  return (
    <section id="experience" ref={containerRef} className="relative w-full py-32 bg-background overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-500/5 rounded-full blur-[200px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-20 relative z-10 text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-foreground/20"></div>
            <span className="text-xs font-mono tracking-[0.4em] uppercase text-foreground/50 font-bold">06 — Career Path</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter mix-blend-difference">
            THE JOURNEY.
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="relative wrap flex flex-col items-center">
          
          {/* Static thin line track */}
          <div className="absolute w-[2px] h-full bg-foreground/5 left-[30px] lg:left-1/2 lg:-translate-x-1/2 rounded-full"></div>
          
          {/* Active colored line drawn by GSAP */}
          <div ref={lineRef} className="absolute w-[2px] h-full bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 left-[30px] lg:left-1/2 lg:-translate-x-1/2 rounded-full z-10"></div>

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={exp.id} className="timeline-item w-full flex justify-[flex-start] lg:justify-between items-center mb-16 relative pl-20 lg:pl-0">
                
                {/* Timeline Dot */}
                <div className={`timeline-dot absolute w-10 h-10 rounded-full border-4 border-background bg-foreground shadow-xl z-20 left-[10px] lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center`}>
                  <div className="w-2 h-2 rounded-full bg-background"></div>
                </div>

                {/* Left Card (only visible on large screens) */}
                <div className={`hidden lg:block w-5/12 ${isLeft ? 'text-right pr-12' : 'lg:invisible'}`}>
                  {isLeft && <TimelineCard exp={exp} isRight={false} />}
                </div>

                {/* Right Card */}
                <div className={`w-full lg:w-5/12 ${!isLeft ? 'lg:pl-12 text-left' : 'lg:invisible'}`}>
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

function TimelineCard({ exp, isRight }: { exp: any, isRight: boolean }) {
  return (
    <div className={`timeline-content bg-foreground/5 p-8 rounded-3xl border border-foreground/10 hover:bg-foreground/10 transition-colors duration-500 relative group`}>
      <span className="text-[10px] font-mono tracking-[0.3em] font-bold text-foreground/40 uppercase mb-4 block" style={{ color: exp.color }}>
        {exp.year}
      </span>
      <h3 className="text-2xl lg:text-3xl font-heading font-black mb-2 leading-tight">
        {exp.role}
      </h3>
      <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/60 mb-6">
        @ {exp.company}
      </h4>
      <p className="text-foreground/70 font-light leading-relaxed mb-8">
        {exp.description}
      </p>

      <div className={`flex flex-wrap gap-2 ${isRight ? 'justify-start' : 'lg:justify-end justify-start'}`}>
        {exp.skills.map((skill: string) => (
          <span key={skill} className="px-3 py-1 bg-background/50 border border-foreground/5 rounded-full text-[10px] font-mono uppercase tracking-widest text-foreground/70">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}