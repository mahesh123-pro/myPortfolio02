"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = [
  { category: "Frontend Engineering", items: ["React.js", "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "GSAP"] },
  { category: "Backend & Systems", items: ["Node.js", "Python", "RESTful APIs", "PostgreSQL", "MongoDB", "Redis", "WebSockets"] },
  { category: "Cloud & DevOps", items: ["AWS Architecting", "Docker Containers", "GitHub Actions", "CI/CD Pipelines", "Linux Mastery", "Terraform"] }
];

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal container title
      gsap.fromTo(".skills-header", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );

      // 2. Animate cards with a tilt effect
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.9, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%"
            },
            delay: i * 0.15
          }
        );

        // Interactive hover 3D tilt
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;

          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 1000,
            ease: "power1.out",
            duration: 0.4
          });
          
          // Glow effect follows cursor
          const glow = card.querySelector('.glow-effect') as HTMLElement;
          if(glow) {
            gsap.to(glow, {
              x,
              y,
              opacity: 1,
              duration: 0.2
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            ease: "elastic.out(1, 0.3)",
            duration: 1.5
          });
          const glow = card.querySelector('.glow-effect') as HTMLElement;
          if(glow) {
            gsap.to(glow, { opacity: 0, duration: 0.4 });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-32 px-6 flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-background">
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen" 
           style={{ backgroundImage: 'radial-gradient(circle at 10% 90%, rgba(139,92,246,0.15) 0%, transparent 50%)' }} />

      <div className="max-w-7xl mx-auto w-full z-10 text-center space-y-24">
        
        <div className="skills-header flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-foreground/20"></div>
            <span className="text-xs font-mono tracking-[0.4em] uppercase text-foreground/50 font-bold">04 — Core Competencies</span>
            <div className="w-12 h-px bg-foreground/20"></div>
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase mix-blend-difference leading-[0.9]">
            The <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Arsenal.</span>
          </h2>
          <p className="text-foreground/50 text-sm md:text-base font-light max-w-xl font-mono mt-4">
            Interactive, performant, and scalable technologies spanning the entire modern stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left z-20 perspective-[1000px]">
          {skills.map((skillGroup, i) => (
            <div
               key={i}
               ref={(el) => { if(el) cardsRef.current[i] = el; }}
               className="relative p-10 rounded-[2.5rem] bg-foreground/5 border border-foreground/10 backdrop-blur-3xl overflow-hidden group shadow-2xl transform-style-3d cursor-crosshair"
            >
               <div className="glow-effect absolute w-64 h-64 bg-accent-blue/30 rounded-full blur-[80px] pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen"></div>

               <h3 className="text-2xl font-black font-heading text-foreground mb-8 border-b border-foreground/10 pb-6 transition-colors tracking-tight relative z-10">
                 {skillGroup.category}
               </h3>
               
               <div className="flex flex-wrap gap-2 relative z-10">
                  {skillGroup.items.map((item, j) => (
                    <motion.div
                      key={j}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-background/80 border border-foreground/10 rounded-xl text-[10px] text-foreground/70 font-mono font-bold uppercase tracking-widest hover:border-accent-blue hover:text-foreground transition-colors shadow-sm"
                    >
                      {item}
                    </motion.div>
                 ))}
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}