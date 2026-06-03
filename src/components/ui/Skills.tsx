"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
  { 
    category: "Cloud", 
    items: ["AWS Architecting", "Azure Cloud Solutions", "Serverless Architecture", "Route53 & CDN", "IAM Security"] 
  },
  { 
    category: "Development", 
    items: ["React.js", "Next.js", "TypeScript", "Node.js", "Python / Go", "RESTful APIs"] 
  },
  { 
    category: "DevOps", 
    items: ["GitHub Actions", "Docker Containers", "CI/CD Pipelines", "Linux Administration", "Terraform IaC"] 
  },
  { 
    category: "Databases", 
    items: ["PostgreSQL", "MongoDB", "Redis Caching", "DynamoDB", "SQL Optimization"] 
  },
  { 
    category: "Tools", 
    items: ["Git / Versioning", "VS Code", "Postman API testing", "Linux Terminal", "Figma UI design"] 
  }
];

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header
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

      // Animate skill cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(card,
          { opacity: 0, scale: 0.95, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%"
            },
            delay: i * 0.12
          }
        );

        // 3D Tilt mouse effect
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -12;
          const rotateY = ((x - centerX) / centerX) * 12;

          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 1000,
            ease: "power1.out",
            duration: 0.3
          });
          
          // Glow spot tracker
          const glow = card.querySelector('.glow-effect') as HTMLElement;
          if (glow) {
            gsap.to(glow, {
              x,
              y,
              opacity: 1,
              duration: 0.15
            });
          }
        });

        // Reset on leave
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            ease: "elastic.out(1, 0.4)",
            duration: 1.2
          });
          const glow = card.querySelector('.glow-effect') as HTMLElement;
          if (glow) {
            gsap.to(glow, { opacity: 0, duration: 0.3 });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-28 flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-[#0A0A0A] border-t border-white/5">
      
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 10% 90%, rgba(255, 107, 0, 0.04) 0%, transparent 50%)' }} />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 z-10 text-center space-y-20">
        
        <div className="skills-header flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#ff6b00]" />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#ff6b00] font-bold">02 — Expertise</span>
            <span className="w-8 h-px bg-[#ff6b00]" />
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase text-white leading-none">
            Technical <span className="text-gradient-orange">Arsenal.</span>
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light max-w-xl font-mono mt-2">
            Highly optimized architectures, development libraries, and system management tools.
          </p>
        </div>

        {/* 5 column responsive cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 text-left z-20 perspective-[1000px] items-stretch">
          {skillCategories.map((group, i) => (
            <div
               key={group.category}
               ref={(el) => { if(el) cardsRef.current[i] = el; }}
               className="relative p-8 rounded-[2.2rem] bg-white/3 border border-white/5 backdrop-blur-3xl overflow-hidden group shadow-2xl transform-style-3d cursor-crosshair flex flex-col h-full hover:border-[#ff6b00]/30 transition-colors duration-300"
            >
               {/* Spotlight Glow Effect inside card */}
               <div className="glow-effect absolute w-48 h-48 bg-[#ff6b00]/20 rounded-full blur-[60px] pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen" />

               <h3 className="text-xl font-black font-heading text-white mb-6 border-b border-white/5 pb-4 transition-colors tracking-tight relative z-10 group-hover:text-[#ff6b00]">
                 {group.category}
               </h3>
               
               <div className="flex flex-col gap-2 relative z-10 flex-grow justify-start">
                  {group.items.map((item, j) => (
                    <motion.div
                      key={j}
                      whileHover={{ scale: 1.03, x: 4 }}
                      className="px-4 py-2.5 bg-[#0A0A0A]/80 border border-white/5 rounded-xl text-[9px] text-white/70 font-mono font-bold uppercase tracking-widest hover:border-[#ff6b00]/30 hover:text-white transition-colors duration-300 shadow-sm"
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