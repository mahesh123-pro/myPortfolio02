"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Code, Terminal, BrainCircuit } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect on the image container
  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    gsap.fromTo(img,
      { yPercent: 12 },
      {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );
  }, []);

  const cards = [
    {
      icon: <Cloud className="w-6 h-6 text-[#ff6b00]" />,
      title: "Cloud Architecting",
      description: "Designing high-availability multi-region setups across AWS and Azure. Specializing in serverless microservices."
    },
    {
      icon: <Code className="w-6 h-6 text-[#ff6b00]" />,
      title: "Full-Stack Mastery",
      description: "Constructing pixel-perfect React and Next.js interfaces powered by Node.js backends and Redis data layers."
    },
    {
      icon: <Terminal className="w-6 h-6 text-[#ff6b00]" />,
      title: "Linux & DevOps",
      description: "Automating server deployments, scripting in Bash, containerizing with Docker, and building CI/CD pipelines."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-[#ff6b00]" />,
      title: "Problem Solving",
      description: "Resolving performance bottlenecks, optimizing query structures, and ensuring 99.9% uptime for core workloads."
    }
  ];

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="relative w-full py-28 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#ff6b00]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side: Professional image placeholder with parallax */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div 
            initial={{ clipPath: "inset(100% 0 0 0)", filter: "grayscale(100%)", scale: 0.9 }}
            whileInView={{ clipPath: "inset(0 0 0 0)", filter: "grayscale(0%)", scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-white/3 shadow-[0_20px_50px_rgba(255,107,0,0.1)] group"
          >
            {/* Grayscale overlay with hover color reveal */}
            <div className="absolute inset-0 bg-[#ff6b00]/10 mix-blend-color z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none opacity-80" />
            
            {/* The actual photo */}
            <div 
              ref={imageRef}
              className="absolute inset-[-15%] w-[130%] h-[130%] bg-[url('/portfolio1assests/mahesh-about.png')] bg-cover bg-center filter grayscale contrast-[1.15] opacity-80 group-hover:grayscale-0 group-hover:opacity-95 transition-all duration-700 ease-out"
            />
            
            {/* Border frame glow */}
            <div className="absolute inset-4 rounded-[1.5rem] border border-white/5 group-hover:border-[#ff6b00]/40 transition-colors duration-500 z-20 pointer-events-none" />
          </motion.div>
        </div>

        {/* Right Side: Narrative and Interactive Cards */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-12">
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-px bg-[#ff6b00]" />
              <span className="text-[10px] font-mono font-bold text-[#ff6b00] uppercase tracking-[0.4em]">01 — Biography</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-none text-white uppercase"
            >
              Engineering Scalable <br />
              <span className="text-gradient-orange">Cloud Systems.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl font-light"
            >
              I am a Cloud Engineer and Full-Stack Developer specializing in building scalable web applications and high-availability serverless systems. With a strong background in AWS, Azure, Linux administration, and modern JavaScript ecosystems, I focus on constructing secure, performant environments that tackle real-world architectural issues.
            </motion.p>
          </div>

          {/* Animated Experience Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {cards.map((card, idx) => {
              // Alternating directions: left for even, right for odd
              const slideDirection = idx % 2 === 0 ? -40 : 40;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: slideDirection }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 * idx, ease: "easeOut" }}
                  whileHover={{ 
                    y: -8, 
                    rotateX: 4, 
                    rotateY: slideDirection > 0 ? 4 : -4,
                    scale: 1.02
                  }}
                  style={{ perspective: "1000px" }}
                  className="p-6 rounded-[1.8rem] bg-white/3 border border-white/5 hover:border-[#ff6b00]/60 hover:bg-white/5 transition-all duration-300 relative group overflow-visible shadow-[0_0_0_rgba(255,107,0,0)] hover:shadow-[0_0_25px_rgba(255,107,0,0.25)]"
                >
                  {/* Spotlight background hover glow */}
                  <div className="absolute -inset-2 bg-radial-gradient from-[#ff6b00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-[#ff6b00]/5 border border-[#ff6b00]/20 flex items-center justify-center mb-5 relative z-10 group-hover:bg-[#ff6b00]/20 group-hover:border-[#ff6b00]/40 group-hover:scale-110 transition-all duration-300">
                    {card.icon}
                  </div>
                  
                  <h3 className="text-base font-heading font-bold text-white mb-2 relative z-10 group-hover:text-[#ff6b00] transition-colors duration-300">
                    {card.title}
                  </h3>
                  
                  <p className="text-xs text-white/50 leading-relaxed font-mono relative z-10">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}