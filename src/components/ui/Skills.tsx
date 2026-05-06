"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const skills = [
  { category: "Frontend Engineering", items: ["React.js", "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"] },
  { category: "Backend & Systems", items: ["Node.js", "Python", "RESTful APIs", "PostgreSQL", "MongoDB", "Redis"] },
  { category: "Cloud & DevOps", items: ["AWS (EC2, S3, RDS)", "Docker", "GitHub Actions", "CI/CD Pipelines", "Linux Mastery"] }
];

export function Skills() {
  return (
    <section id="skills" className="py-32 px-6 flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-background">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-2/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 text-center space-y-24">
        
        <SectionHeading 
          number="04 /"
          badge="Technical Stack"
          title="The"
          gradientPart="Arsenal"
          description="A curated selection of modern technologies I leverage to build resilient and high-performance digital products."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {skills.map((skillGroup, i) => (
            <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.6 }}
               className="p-10 rounded-[2.5rem] bg-foreground/5 border border-foreground/10 backdrop-blur-md hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-500 group"
            >
               <h3 className="text-xl font-bold font-heading text-foreground mb-8 border-b border-foreground/10 pb-6 group-hover:text-accent-blue transition-colors tracking-tight">{skillGroup.category}</h3>
               <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((item, j) => (
                    <motion.div
                      key={j}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-xl text-[11px] text-foreground/40 font-bold uppercase tracking-widest hover:border-accent-blue/50 hover:text-foreground transition-all cursor-crosshair shadow-sm"
                    >
                      {item}
                    </motion.div>
                 ))}
               </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Architecture Representation */}
        <div className="mt-20 h-[350px] w-full rounded-[3rem] border border-foreground/5 bg-gradient-to-b from-transparent to-foreground/5 relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
             
             {/* Center Node */}
             <motion.div 
               animate={{ boxShadow: ["0 0 20px rgba(59,130,246,0.1)", "0 0 60px rgba(139,92,246,0.3)", "0 0 20px rgba(59,130,246,0.1)"] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="w-24 h-24 bg-background border-2 border-accent-blue/20 rounded-3xl flex items-center justify-center z-10 shadow-2xl"
             >
                <span className="font-bold text-xs uppercase tracking-[0.3em] text-gradient">Core</span>
             </motion.div>

             {/* Orbiting Tech Rings */}
             {[0, 1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25 + i * 8, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                  style={{ width: `${250 + i * 120}px`, height: `${250 + i * 120}px` }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-foreground/10 rounded-full border border-foreground/20 shadow-[0_0_10px_rgba(var(--foreground-rgb),0.1)]" />
                  <div className="w-full h-full rounded-full border border-foreground/[0.03]" />
                </motion.div>
             ))}
        </div>

      </div>
    </section>
  );
}
