"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { GlowBorder } from "../effects/HoverEffects";
import { LetterWave, GradientText } from "../effects/TextEffects";
import { BlurReveal, FlipIn } from "../effects/EnterAnimations";
import { ColorReveal } from "../effects/HoverEffects";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 flex items-center justify-center min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
        
        {/* Bio Content */}
        <motion.div style={{ opacity, y: useTransform(scrollYProgress, [0, 1], [50, -50]) }} className="space-y-10">
          <div className="space-y-4">
            <SectionHeading 
              number="01 /"
              badge="The Introduction"
              title="I'm"
              gradientPart="Mahesh Bakki."
              centered={false}
            />
            <BlurReveal delay={0.2}>
              <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground/90">
                <LetterWave text="Architecting resilient digital ecosystems." delay={0.1} />
              </h3>
            </BlurReveal>
          </div>

          <div className="space-y-6">
            <BlurReveal delay={0.4}>
              <p className="text-lg text-foreground/60 font-light leading-relaxed">
                Currently spearheading technical initiatives as <span className="text-foreground font-medium">Tech Lead @ GKLT (Manakrishi)</span>, I specialize in building cloud-native applications that balance high performance with sophisticated design. 
              </p>
            </BlurReveal>
            <BlurReveal delay={0.5}>
              <p className="text-lg text-foreground/60 font-light leading-relaxed">
                As a B-Tech student at <span className="text-foreground font-medium">MLRITM</span>, my focus lies at the intersection of Cloud Engineering and Full-Stack development. I don't just write code; I engineer systems that scale, secure, and solve real-world problems.
              </p>
            </BlurReveal>
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-6">
            <ColorReveal color="bg-blue-600/20" className="w-full">
              <div className="p-6 rounded-3xl bg-foreground/5 border border-foreground/10 flex flex-col gap-2 hover:border-foreground/20 transition-all w-full h-full relative z-10 group">
                <span className="text-4xl font-bold text-foreground group-hover:text-accent-blue transition-colors">04+</span>
                <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-[0.2em]">Years Deep in Tech</span>
              </div>
            </ColorReveal>
            <ColorReveal color="bg-purple-600/20" className="w-full">
              <div className="p-6 rounded-3xl bg-foreground/5 border border-foreground/10 flex flex-col gap-2 hover:border-foreground/20 transition-all w-full h-full relative z-10 group">
                <span className="text-4xl font-bold text-foreground group-hover:text-accent-purple transition-colors">07+</span>
                <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-[0.2em]">Flagship Deploys</span>
              </div>
            </ColorReveal>
          </div>
        </motion.div>

        {/* Visual Content */}
        <div className="relative group flex justify-center lg:justify-end">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
          
          <GlowBorder>
            <div className="relative h-[600px] w-full max-w-[420px] flex items-center justify-center p-3">
              <motion.div className="relative w-full h-full flex items-center justify-center bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                 <motion.img
                    src="/portfolio1assests/maheshmain.png"
                    alt="Mahesh Profile"
                    whileHover={{ scale: 1.02 }}
                    className="w-full h-full object-cover filter brightness-[1.1] contrast-[1.05] transition-transform duration-1000 ease-out"
                 />
                 
                 {/* Tech Tags */}
                 <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 z-20">
                    {['AWS Architect', 'Full Stack'].map((tag) => (
                      <div key={tag} className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest shadow-xl">
                        {tag}
                      </div>
                    ))}
                 </div>
              </motion.div>
            </div>
          </GlowBorder>

          {/* Leadership Badge */}
          <FlipIn delay={0.4} className="absolute -top-10 -left-10 lg:-left-20 z-30">
            <div className="p-8 rounded-[2.5rem] bg-background/90 backdrop-blur-3xl border border-foreground/10 shadow-2xl flex flex-col items-start min-w-[220px]">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em]">Current Leadership</span>
               </div>
               <span className="text-2xl font-bold text-foreground leading-tight mb-1">Tech Lead</span>
               <span className="text-xs text-foreground/40 font-medium font-mono uppercase tracking-widest">@ Manakrishi (GKLT)</span>
            </div>
          </FlipIn>
        </div>
      </div>
    </section>
  );
}
