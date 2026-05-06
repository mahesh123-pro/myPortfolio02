"use client";

import { motion, Variants, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Magnetic from "./Magnetic";
import { FloatingParticles } from "../effects/Ambient";
import { BlurReveal, FadeUp } from "../effects/EnterAnimations";
import { GradientText, Typewriter } from "../effects/TextEffects";
import { SlideFillButton, ShockwaveButton } from "../effects/ButtonEffects";
import { MagneticLift } from "../effects/HoverEffects";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const springConfig = { damping: 25, stiffness: 150 };
  
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(mouseY, [-500, 500], [7, -7]);
  const rotateY = useTransform(mouseX, [-500, 500], [-7, 7]);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden w-full">
      <FloatingParticles count={1200} color="#3b82f6" />
      
      {/* Dynamic Ambient Background */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.12), transparent 70%)`,
        }}
      />

      <div className="z-10 max-w-screen-2xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center px-6 md:px-12 lg:px-20">
        
        {/* Text Content */}
        <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0 z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center lg:justify-start gap-3 mb-6"
          >
            <div className="h-px w-8 bg-accent-blue/50" />
            <span className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.4em] font-mono">Mahesh Bakki / Portfolio 2026</span>
          </motion.div>

          <BlurReveal delay={0.2} className="mb-8">
            <h1 className="flex flex-wrap justify-center lg:justify-start gap-x-[0.3em] gap-y-[0.1em] text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-tight leading-[0.95]">
              Engineering <GradientText text="Intelligent" /> & <GradientText text="Scalable" /> Ecosystems.
            </h1>
          </BlurReveal>
          
          <FadeUp delay={0.8}>
            <div className="space-y-6">
              <p className="text-foreground/60 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-sans font-light leading-relaxed">
                I bridge the gap between complex <span className="text-foreground font-medium">Cloud Architecture</span> and high-fidelity <span className="text-foreground font-medium">Product Engineering</span>. Specializing in AWS, React, and Node.js.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[10px] font-mono text-foreground/40 uppercase tracking-widest">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" /> AWS Certified</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500/50" /> Full-Stack Expert</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /> Open to Innovation</span>
              </div>
            </div>
          </FadeUp>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.2, duration: 0.8 }}
             className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6"
          >
             <MagneticLift>
                <SlideFillButton className="border-foreground/20 hover:border-foreground text-foreground rounded-2xl px-10 py-4 text-sm font-bold">
                  <a href="#projects" className="flex items-center gap-2">View My Arsenal</a>
                </SlideFillButton>
             </MagneticLift>
             <MagneticLift>
                <ShockwaveButton className="bg-foreground/5 border border-foreground/10 text-foreground rounded-2xl px-10 py-4 text-sm font-bold hover:bg-foreground/10 transition-colors backdrop-blur-xl">
                  <a href="#contact">Get in Touch</a>
                </ShockwaveButton>
             </MagneticLift>
          </motion.div>
        </div>

        {/* Visual Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative hidden lg:flex justify-center items-center z-10"
        >
          <motion.div 
            style={{ rotateX, rotateY, perspective: 1500 }}
            className="relative w-full max-w-[600px] aspect-square flex items-center justify-center"
          >
            {/* Background Layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] animate-pulse" />
            <div className="absolute inset-0 border border-white/[0.03] rounded-full rotate-45 scale-110" />
            <div className="absolute inset-0 border border-white/[0.03] rounded-full -rotate-12 scale-125" />
            
            {/* Subject Image */}
            <div className="relative z-10 w-full group overflow-visible">
                <motion.img 
                  src="/portfolio1assests/maheshmain.png" 
                  alt="Mahesh Profile" 
                  className="w-full h-auto object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)] filter brightness-[1.05] contrast-[1.05]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                
                {/* Status Floating Label */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute -top-6 right-0 px-6 py-3 rounded-2xl bg-background/90 backdrop-blur-3xl border border-foreground/10 flex items-center gap-3 shadow-2xl z-30"
                >
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute inset-0"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative"></div>
                  </div>
                  <span className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em] leading-none">Ready for New Challenges</span>
                </motion.div>

                {/* Floating Tech Stack Indicator */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 }}
                  className="absolute bottom-10 -left-10 z-30 p-6 rounded-3xl bg-background/80 backdrop-blur-2xl border border-foreground/10 shadow-2xl min-w-[200px]"
                >
                   <div className="space-y-4">
                      <p className="text-[9px] font-mono text-accent-blue font-bold uppercase tracking-[0.3em]">Core Stack / v.26</p>
                      <div className="flex flex-wrap gap-2">
                        {['AWS', 'Next.js', 'Node'].map((tech) => (
                          <span key={tech} className="px-2 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-[9px] text-foreground/70 font-bold uppercase tracking-widest">{tech}</span>
                        ))}
                      </div>
                   </div>
                </motion.div>
            </div>
            
            {/* Experience Counter Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="absolute top-1/4 -right-12 z-20 p-8 rounded-[2.5rem] bg-background/90 backdrop-blur-3xl border border-foreground/10 shadow-2xl flex flex-col items-center"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-gradient">07+</span>
              </div>
              <p className="text-[8px] font-black text-foreground/40 uppercase tracking-[0.3em] mt-2 text-center leading-tight">
                Flagship Projects<br/>Successfully Built
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Explore Trigger */}
      <Magnetic>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-neutral-500 cursor-pointer group"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] group-hover:text-white transition-colors">Scroll to Discover</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="group-hover:text-accent-blue transition-colors" />
          </motion.div>
        </motion.div>
      </Magnetic>
    </section>
  );
}
