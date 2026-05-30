"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text reveal parsing
    const paragraphs = textRef.current?.querySelectorAll("p");
    
    if (paragraphs) {
      paragraphs.forEach((p) => {
        const split = new SplitType(p, { types: 'lines,words' });
        
        gsap.from(split.words, {
          scrollTrigger: {
            trigger: p,
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
          opacity: 0.1,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
        });
      });
    }

    // 2. Parallax Image
    gsap.fromTo(imageRef.current,
      { y: 100, scale: 1.1 },
      {
        y: -100,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // 3. Stats Fade in
    gsap.fromTo(".stat-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="relative w-full min-h-screen pt-32 pb-24 overflow-hidden bg-background text-foreground flex flex-col justify-center">
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-blue/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-12 h-px bg-foreground/20"></div>
            <span className="text-xs font-mono tracking-[0.4em] uppercase text-foreground/50 font-bold">01 — The Architect</span>
          </motion.div>

          <div ref={textRef} className="space-y-12">
            <p className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-[1.1]">
              Currently spearheading technical initiatives as <span className="text-accent-blue">Tech Lead @ GKLT (Manakrishi)</span>, specializing in building cloud-native applications that balance high performance with sophisticated design.
            </p>
            
            <p className="text-xl md:text-2xl text-foreground/60 font-light leading-relaxed max-w-2xl">
              As a B-Tech student at MLRITM, my focus lies at the intersection of Cloud Engineering and Full-Stack development. I don't just write code; I engineer systems that scale, secure, and solve real-world problems seamlessly.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 gap-6 mt-16 lg:mt-24">
            <div className="stat-card p-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors group">
              <div className="text-5xl md:text-6xl font-black text-foreground mb-4 group-hover:text-accent-blue transition-colors">04+</div>
              <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-foreground/40 leading-relaxed">Years Deep<br />in Tech</div>
            </div>
            <div className="stat-card p-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors group">
              <div className="text-5xl md:text-6xl font-black text-foreground mb-4 group-hover:text-accent-purple transition-colors">07+</div>
              <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-foreground/40 leading-relaxed">Flagship<br />Deploys</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end h-[60vh] lg:h-auto">
          <div className="relative w-full max-w-[450px] aspect-[3/4] rounded-[2rem] overflow-hidden bg-background/5 border border-foreground/10">
            <div className="absolute inset-0 bg-black/20 z-10 mix-blend-multiply"></div>
            <div 
              ref={imageRef} 
              className="absolute inset-[-10%] w-[120%] h-[120%] bg-[url('/portfolio1assests/maheshmain.png')] bg-cover bg-center filter grayscale opacity-80"
            />
            
            <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start">
              <div className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-xl border border-foreground/10 text-[9px] font-mono tracking-[0.3em] font-bold uppercase shadow-xl">
                Current Status
              </div>
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="p-6 rounded-2xl bg-background/80 backdrop-blur-xl border border-foreground/10 shadow-2xl">
                 <div className="flex items-center gap-3 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em]">Leadership</span>
                 </div>
                 <h4 className="text-xl font-bold font-heading">Tech Lead</h4>
                 <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-mono mt-1">@ Manakrishi (GKLT)</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}