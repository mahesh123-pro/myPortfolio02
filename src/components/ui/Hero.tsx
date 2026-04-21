"use client";

import { motion, Variants, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Magnetic from "./Magnetic";

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

  const rotateX = useTransform(mouseY, [-500, 500], [5, -5]);
  const rotateY = useTransform(mouseX, [-500, 500], [-5, 5]);

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden w-full">
      {/* Background Gradient responding to mouse cursor */}
      <div 
        className="pointer-events-none absolute inset-0 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
      />

      <div className="z-10 max-w-screen-2xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center px-6 md:px-12">
        <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0 z-20">
          <motion.div initial="hidden" animate="visible" variants={titleVariants} className="flex flex-wrap justify-center lg:justify-start gap-[0.4em] text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-tight mb-8">
            {["Architecting", "the", "future", "of", "cloud", "&", "digital", "experiences."].map((word, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block hover:text-accent-blue transition-colors duration-300">
                {(word === "cloud" || word === "digital") ? <span className="text-gradient drop-shadow-lg">{word}</span> : word}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-sans font-light leading-relaxed"
          >
            I design and deliver end-to-end solutions using AWS, React, and Node.js, combining clean architecture with high-impact product engineering.
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.5, duration: 0.8 }}
             className="mt-10 flex items-center justify-center lg:justify-start gap-6"
          >
             <Magnetic>
                <a href="#projects" className="group px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2">
                  View Projects
                </a>
             </Magnetic>
             <Magnetic>
                <a href="#contact" className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors">
                  Contact Me
                </a>
             </Magnetic>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative hidden lg:flex justify-center items-center z-10"
        >
          <motion.div 
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="relative w-full max-w-[780px]"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-blue/10 rounded-full blur-[180px] animate-pulse"></div>
            
            {/* Image Container - Balanced Scale */}
            <div className="relative z-10 w-full group">
                <motion.img 
                  src="/portfolio1assests/maheshmain.png" 
                  alt="Mahesh Profile" 
                  className="w-full h-auto object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)] filter contrast-[1.02] brightness-[1.05]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Status Indicator */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className="absolute top-4 -right-4 px-5 py-2.5 rounded-full bg-neutral-900/95 backdrop-blur-3xl border border-white/10 flex items-center gap-2.5 shadow-2xl z-30"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">Status: Available</span>
                </motion.div>

                {/* Technical Label - Bottom Right, well spaced */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  className="absolute bottom-4 right-0 max-w-[260px] text-right z-30"
                >
                   <div className="flex flex-col gap-1.5 items-end bg-neutral-950/70 backdrop-blur-3xl p-5 rounded-2xl border border-white/10 shadow-2xl">
                      <p className="text-[10px] font-mono text-accent-blue font-bold uppercase tracking-[0.2em] leading-none mb-1">Architecture v3.0</p>
                      <div className="h-px w-10 bg-accent-blue/50 mb-2"></div>
                      <p className="text-[13px] font-medium text-white/90 leading-tight">
                        Pioneering high-scale digital solutions through cloud-native engineering.
                      </p>
                   </div>
                </motion.div>
            </div>
            
            {/* Statistics Badge - Top Leftish */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              style={{ translateZ: 50 }}
              className="absolute -top-10 -left-10 z-20 p-6 rounded-3xl bg-neutral-950/90 backdrop-blur-3xl border border-white/10 shadow-2xl flex flex-col items-center min-w-[140px]"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gradient">5+</span>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-tighter">Units</span>
              </div>
              <p className="text-[9px] font-black text-neutral-500 uppercase tracking-[0.2em] mt-1 text-center leading-tight">
                Live Products<br/>Deployed
              </p>
            </motion.div>

            {/* Experience Badge - Middle Left */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              style={{ translateZ: 70 }}
              className="absolute top-1/2 -left-20 -translate-y-1/2 z-20 px-6 py-4 rounded-2xl bg-neutral-950/90 backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-accent-blue/10 border border-white/10 flex items-center justify-center">
                 <div className="w-2.5 h-2.5 rounded-full bg-accent-blue animate-pulse"></div>
              </div>
              <div>
                <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest leading-none mb-1">Expertise</p>
                <p className="text-sm font-bold text-white leading-none">Full-Stack Lead</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <Magnetic>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 text-neutral-500 cursor-pointer"
        >
          <span className="text-sm uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown size={24} />
        </motion.div>
      </Magnetic>
    </section>
  );
}
