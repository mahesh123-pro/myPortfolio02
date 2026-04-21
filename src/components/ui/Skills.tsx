"use client";

import { motion } from "framer-motion";

const skills = [
  { category: "Frontend", items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"] },
  { category: "Backend & Cloud", items: ["Node.js", "Python", "AWS EC2", "S3", "RDS DB"] },
  { category: "Tools & DevOps", items: ["Linux", "Docker", "IAM", "REST APIs", "Git"] }
];

export function Skills() {
  return (
    <section className="py-32 px-6 flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full z-10 text-center space-y-20">
        
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Technical <span className="text-gradient">Arsenal</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             className="text-neutral-400 font-light max-w-2xl mx-auto"
          >
            I build with modern, scalable, and high-performance technologies.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {skills.map((skillGroup, i) => (
            <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.15 }}
               className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 backdrop-blur-sm hover:bg-neutral-900/80 transition-colors"
            >
               <h3 className="text-xl font-bold font-heading mb-6 border-b border-white/10 pb-4">{skillGroup.category}</h3>
               <div className="flex flex-wrap gap-3">
                 {skillGroup.items.map((item, j) => (
                    <motion.div
                      key={j}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-neutral-300 font-mono tracking-wide shadow-sm hover:border-accent-blue/50 hover:text-white transition-all cursor-crosshair"
                    >
                      {item}
                    </motion.div>
                 ))}
               </div>
            </motion.div>
          ))}
        </div>

        {/* Floating animated elements representing architecture/skills */}
        <div className="mt-20 h-[300px] w-full rounded-3xl border border-white/5 bg-gradient-to-b from-transparent to-neutral-900/50 relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
             
             {/* Center Node */}
             <motion.div 
               animate={{ boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 60px rgba(139,92,246,0.4)", "0 0 20px rgba(59,130,246,0.2)"] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="w-20 h-20 bg-neutral-950 border-2 border-accent-blue/30 rounded-2xl flex items-center justify-center z-10 neon-glow"
             >
                <span className="font-bold text-gradient">Core</span>
             </motion.div>

             {/* Orbiting elements */}
             {[0, 1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                  style={{ width: `${200 + i * 100}px`, height: `${200 + i * 100}px` }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/10 rounded-full border border-white/20" />
                  <div className="w-full h-full rounded-full border border-white/[0.02]" />
                </motion.div>
             ))}
        </div>

      </div>
    </section>
  );
}
