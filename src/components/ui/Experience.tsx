"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timeline = [
  { year: "PRESENT", role: "Tech Lead & Architect", company: "GKLT (Manakrishi)", description: "Delivering scalable, high-impact agri-tech solutions for Indian farmers. Leading platforms and product strategy." },
  { year: "2025", role: "Professional Execution", company: "System Design", description: "Production-grade AWS architecture, Dockerized workflows, and leading product engineering for real-world impact." },
  { year: "2024", role: "Linux & Cloud Infrastructure", company: "AWS Foundations", description: "Transitioning to Linux primary OS and AWS. Learning EC2, S3, and VPC networking to build resilient backbones." },
  { year: "2023", role: "Modern Web Ecosystem", company: "Full-Stack Dev", description: "Mastering React navigation, Node.js backend logic, and NoSQL databases. Building first full-stack applications." },
  { year: "2020", role: "The Foundation", company: "Web Fundamentals", description: "Deep dive into web fundamentals (HTML/CSS/JS). Building basic static sites and understanding browser architectures." },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-32 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading font-bold text-center mb-20"
        >
          My <span className="text-gradient">Journey</span>
        </motion.h2>

        <div ref={containerRef} className="relative">
          {/* The animated line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
               style={{ height: lineHeight }}
               className="w-full bg-gradient-to-b from-accent-blue via-accent-purple to-transparent"
            />
          </div>

          <div className="space-y-24">
            {timeline.map((item, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-center justify-between group ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                
                {/* Node */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-neutral-900 border-2 border-accent-blue -translate-x-1/2 z-10 group-hover:bg-accent-blue group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300"
                />

                {/* Content */}
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`pl-20 md:pl-0 w-full md:w-[45%] text-left ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}
                >
                  <span className="text-accent-purple font-mono text-sm tracking-widest">{item.year}</span>
                  <h3 className="text-2xl font-bold font-heading mt-2">{item.role}</h3>
                  <h4 className="text-lg text-neutral-300 font-medium mb-4">{item.company}</h4>
                  <p className="text-neutral-400 font-light leading-relaxed">{item.description}</p>
                </motion.div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
