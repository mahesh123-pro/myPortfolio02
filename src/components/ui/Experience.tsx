"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "./SectionHeading";
import { journeyData } from "@/data/experience";
import Link from "next/link";
import { ArrowUpRight, Calendar, Briefcase, Building2 } from "lucide-react";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const journeySteps = Object.values(journeyData);

  return (
    <section id="experience" className="py-32 px-6 min-h-screen relative overflow-hidden bg-background">
      
      {/* Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading 
          number="05 /"
          badge="Professional Path"
          title="The"
          gradientPart="Evolution"
          description="A chronological record of technical leadership, architectural growth, and continuous learning."
        />
        <div className="mb-24" />

        <div ref={containerRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-foreground/5 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
               style={{ height: lineHeight }}
               className="w-full bg-gradient-to-b from-accent-blue via-accent-purple to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </div>

          <div className="space-y-40">
            {journeySteps.map((item, i) => (
              <div key={item.id} className={`relative flex flex-col md:flex-row items-center justify-between group ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                
                {/* Year Badge - Sticky potential */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20 top-0 -translate-y-16 md:translate-y-0">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="px-6 py-2 rounded-full bg-background border-2 border-accent-blue/30 backdrop-blur-xl text-accent-blue font-mono text-sm font-bold tracking-[0.2em] shadow-2xl flex items-center gap-2 group-hover:border-accent-blue transition-all duration-500"
                  >
                    <Calendar size={14} />
                    {item.year}
                  </motion.div>
                </div>

                {/* Node */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-background border-[3px] border-accent-blue -translate-x-1/2 z-10 group-hover:scale-125 transition-all duration-500 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                >
                  <div className="absolute inset-0 rounded-full bg-accent-blue opacity-0 group-hover:opacity-20 animate-ping" />
                </motion.div>

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                  className={`pl-24 md:pl-0 w-full md:w-[45%] ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}
                >
                  <Link href={`/journey/${item.id}`} className="block group/card">
                    <div className={`p-8 md:p-10 rounded-[2.5rem] bg-foreground/5 border border-foreground/10 backdrop-blur-xl transition-all duration-500 hover:bg-foreground/10 hover:border-foreground/20 hover:translate-y-[-5px] relative overflow-hidden flex flex-col ${i % 2 === 0 ? "items-start" : "items-end"}`}>
                      
                      {/* Hover Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10 space-y-6 w-full">
                        <div className={`flex flex-col gap-2 ${i % 2 === 0 ? "items-start" : "items-end"}`}>
                          <div className="flex items-center gap-3 text-accent-blue mb-2">
                             <Briefcase size={20} className="opacity-60" />
                             <span className="text-xs font-bold uppercase tracking-[0.3em]">Professional Role</span>
                          </div>
                          <h3 className="text-3xl md:text-4xl font-bold font-heading text-foreground tracking-tight leading-none group-hover/card:text-accent-blue transition-colors">
                            {item.role}
                          </h3>
                        </div>

                        <div className={`flex items-center gap-4 text-foreground/40 font-mono text-sm uppercase tracking-widest ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                          <Building2 size={16} />
                          <span className="font-bold">{item.company}</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                          <span>Full-Time</span>
                        </div>

                        <p className={`text-foreground/60 font-light text-base leading-relaxed max-w-lg ${i % 2 === 0 ? "" : "ml-auto"}`}>
                          {item.description}
                        </p>

                        <div className={`flex items-center gap-3 pt-4 font-bold text-xs uppercase tracking-[0.2em] group-hover/card:gap-5 transition-all ${i % 2 === 0 ? "text-accent-blue" : "flex-row-reverse text-accent-purple"}`}>
                           <span>Read Full Story</span>
                           <ArrowUpRight size={16} />
                        </div>
                      </div>

                      {/* Decorative Background Icon */}
                      <div className={`absolute -bottom-10 -right-10 opacity-[0.03] group-hover/card:opacity-[0.07] transition-opacity duration-700 pointer-events-none ${i % 2 === 0 ? "-right-10" : "-left-10"}`}>
                        <Briefcase size={200} />
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Spacer for MD screens */}
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
