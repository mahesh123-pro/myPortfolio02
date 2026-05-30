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

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const splitTitle = new SplitType(textRef.current!, { types: 'chars,words' });
    
    gsap.fromTo(splitTitle.chars, 
      { opacity: 0, filter: 'blur(20px)', y: 40, scale: 0.8 },
      { 
        opacity: 1, 
        filter: 'blur(0px)', 
        y: 0, 
        scale: 1,
        duration: 1.2, 
        stagger: 0.02, 
        ease: "power4.out",
        delay: 0.2
      }
    );

    gsap.fromTo(subTextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power3.out" }
    );

    gsap.to(backgroundRef.current, {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(imageRef.current, {
      y: "-20%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2
      }
    });

    gsap.to(textRef.current, {
      y: "15%",
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5
      }
    });

    return () => {
      splitTitle.revert();
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-background flex flex-col justify-center items-center">
      
      <div 
        ref={backgroundRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%), url("https://grainy-gradients.vercel.app/noise.svg")',
          backgroundSize: '100% 100%, 150px 150px'
        }}
      />

      <div className="absolute inset-0 z-10 pointer-events-none flex justify-center items-center">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="z-20 w-full max-w-screen-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 md:px-12 lg:px-20">
        
        <div className="flex flex-col justify-center text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center lg:justify-start gap-3 mb-6"
          >
            <div className="h-px w-12 bg-foreground/20" />
            <span className="text-xs font-bold text-foreground/60 uppercase tracking-[0.4em] font-mono">Premium Portfolios / 2026</span>
          </motion.div>

          <h1 
            ref={textRef} 
            className="text-[4rem] sm:text-7xl md:text-8xl lg:text-[7rem] font-heading font-black tracking-tighter leading-[0.9] text-foreground mix-blend-difference mb-8"
          >
            ENGINEERING 
            <br />
            CINEMATIC
            <br />
            ECOSYSTEMS.
          </h1>
          
          <div ref={subTextRef} className="space-y-8 max-w-xl mx-auto lg:mx-0">
            <p className="text-foreground/70 text-lg md:text-xl font-sans font-light leading-relaxed">
              Elevating digital products through deep technical expertise, robust cloud architecture, and immersive motion design.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 font-mono text-xs uppercase tracking-widest text-foreground/50">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available
              </span>
              <span className="h-4 w-px bg-foreground/10" />
              <span>Full-Stack</span>
              <span className="h-4 w-px bg-foreground/10" />
              <span>AWS Certified</span>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:flex justify-end items-center h-full min-h-[600px] z-20">
          <div ref={imageRef} className="relative w-full max-w-[500px] aspect-[4/5] rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-background/5 border border-foreground/10 rounded-3xl backdrop-blur-sm z-0" />
            
            <motion.img 
              src="/portfolio1assests/maheshmain.png" 
              alt="Profile" 
              className="absolute inset-0 w-full h-full object-cover rounded-3xl z-10 filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100 object-top"
            />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="absolute -left-12 top-1/4 bg-background/80 backdrop-blur-xl border border-foreground/10 p-6 rounded-2xl shadow-2xl z-30 flex gap-4 items-center"
            >
              <div className="text-4xl font-bold">100<span className="text-accent-blue">+</span></div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-foreground/50 leading-tight">
                Lighthouse<br />Score
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 font-bold font-mono">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent animate-pulse" />
      </motion.div>
      
    </section>
  );
}