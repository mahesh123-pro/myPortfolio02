"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={ref} className="relative py-20 px-6 flex items-center justify-center min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <motion.div style={{ opacity, y: useTransform(scrollYProgress, [0, 1], [50, -50]) }} className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Hi, I'm <span className="text-gradient">Mahesh.</span><br />
            An architect of <span className="italic">digital ecosystems.</span>
          </h2>
          <p className="text-lg text-neutral-400 font-light leading-relaxed">
            I am a B-Tech student at MLRITM focused on Cloud Computing and Full-Stack Development. I build scalable applications on AWS, craft user-centric interfaces, and continuously grow in DevOps and system design.
          </p>
          <p className="text-lg text-neutral-400 font-light leading-relaxed">
            Currently working as Tech Lead @ GKLT (Manakrishi). I thrive in the intersection of design and logic—where raw performance meets elegant aesthetics. Continuous learning is my default state.
          </p>
          
          <div className="flex gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col hover:border-white/30 transition-colors">
              <span className="text-3xl font-bold text-white">4+</span>
              <span className="text-sm text-neutral-400 uppercase tracking-wider">Years of Learning</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col hover:border-white/30 transition-colors">
              <span className="text-3xl font-bold text-white">5+</span>
              <span className="text-sm text-neutral-400 uppercase tracking-wider">Flagship Projects</span>
            </div>
          </div>
        </motion.div>

        <div className="relative group">
          {/* Decorative background glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-blue/10 rounded-full blur-[100px] group-hover:bg-accent-blue/15 transition-colors duration-700"></div>
          
          <div className="relative h-[650px] w-full flex items-center justify-center">
            <motion.div className="relative w-full h-full flex items-center justify-center">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '50px 50px' }}></div>
               <motion.img
                  src="/portfolio1assests/maheshmain.png"
                  alt="Mahesh Profile"
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter brightness-[1.05] transition-transform duration-700"
               />
               
               {/* Technical Specs Overlay - Floating near the subject */}
               <div className="absolute top-12 right-0 flex flex-col gap-3 items-end">
                  <div className="px-5 py-2.5 rounded-xl bg-neutral-900/90 backdrop-blur-2xl border border-white/10 shadow-2xl">
                     <span className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase font-bold">Node.js / AWS / Cloud</span>
                  </div>
                  <div className="px-5 py-2.5 rounded-xl bg-neutral-900/90 backdrop-blur-2xl border border-white/10 shadow-2xl">
                     <span className="text-xs font-mono text-accent-purple tracking-[0.2em] uppercase font-bold">React / Next.js / TypeScript</span>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Floating Badge for About section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -bottom-6 -right-6 p-6 rounded-[28px] bg-neutral-900/95 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hidden md:flex flex-col"
          >
             <span className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.3em] mb-2">Current Status</span>
             <span className="text-xl font-bold text-white mb-0.5">Full-Stack Lead</span>
             <span className="text-xs text-neutral-400 font-medium">@ Manakrishi (GKLT)</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
