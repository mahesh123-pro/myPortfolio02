"use client";

import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Globe, Info, Layers, Star, Zap, Cpu, TrendingUp, Lightbulb } from "lucide-react";

// Inline SVG for GitHub
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
import { projectData } from "@/data/projects";
import { Footer } from "@/components/ui/Footer";

export default function CaseStudyPage() {
  const { id } = useParams();
  const router = useRouter();
  const project = projectData[id as keyof typeof projectData];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button onClick={() => router.push("/")} className="text-accent-blue hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-blue selection:text-white">
      {/* Scroll Progress */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue origin-left z-[60]"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract background */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent-blue/10 blur-[150px] -z-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-accent-purple/10 blur-[120px] -z-10 rounded-full"></div>

        <div className="max-w-5xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-12 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-mono tracking-widest text-accent-blue mb-8 uppercase">
              <Zap size={14} /> Case Study
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight tracking-tight">
              {project.title.split(" ").map((word, i) => (
                <span key={i} className={i === 1 ? "text-gradient" : ""}> {word} </span>
              ))}
            </h1>

            <p className="text-xl md:text-2xl text-foreground/60 max-w-3xl leading-relaxed font-light mb-12">
              {project.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { label: "Role", value: project.role, icon: <Info size={16} /> },
                { label: "Stack", value: project.stack.join(" · "), icon: <Layers size={16} /> },
                { label: "Hardware", value: project.hardware, icon: <Cpu size={16} /> },
                { label: "Status", value: "Completed", icon: <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-emerald-400">&#x25cf;</motion.span> }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2 text-neutral-500 text-sm font-mono uppercase tracking-widest">
                    {item.icon} {item.label}
                  </div>
                  <div className="text-lg font-medium">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={project.liveLink} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                <Globe size={18} /> Live Project
              </a>
              <a href={project.githubLink} className="flex items-center gap-3 px-8 py-4 bg-neutral-900 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all">
                <GithubIcon /> GitHub Repo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto rounded-[40px] overflow-hidden border border-white/10 bg-neutral-900/40 backdrop-blur-3xl p-4 shadow-2xl shadow-blue-500/10"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-auto rounded-[32px] object-cover"
          />
        </motion.div>
      </section>

      {/* Bento Content Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Architecture Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[40px] bg-foreground/5 border border-foreground/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-accent-blue/10 text-accent-blue">
                  <Cpu />
                </div>
                <h2 className="text-3xl font-heading font-bold">System Architecture</h2>
              </div>
              <p className="text-foreground/60 leading-relaxed text-lg">
                {project.architecture}
              </p>
            </motion.div>

            {/* Features Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[40px] bg-foreground/5 border border-foreground/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-accent-purple/10 text-accent-purple">
                  <Star />
                </div>
                <h2 className="text-3xl font-heading font-bold">Key Features</h2>
              </div>
              <ul className="space-y-6">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-accent-purple shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                    <span className="text-foreground/80 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Impact/Metrics Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[40px] bg-foreground/5 border border-foreground/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <TrendingUp />
                </div>
                <h2 className="text-3xl font-heading font-bold">Impact & Metrics</h2>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-foreground/5 border border-foreground/5 group hover:bg-foreground/10 transition-colors">
                    <p className="text-foreground/80 group-hover:text-foreground transition-colors">{metric}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Challenges/Solutions Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[40px] bg-foreground/5 border border-foreground/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                  <Lightbulb />
                </div>
                <h2 className="text-3xl font-heading font-bold">Challenges & Solutions</h2>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] px-3 py-1 bg-red-500/10 text-red-500 rounded-full border border-red-500/20">The Problem</span>
                  <p className="text-foreground/80 text-lg leading-relaxed">{project.challenge}</p>
                </div>
                <div className="w-full h-px bg-foreground/10"></div>
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">The Solution</span>
                  <p className="text-foreground/80 text-lg leading-relaxed">{project.solution}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Call to Action Footer Card */}
      <section className="py-32 px-6">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="max-w-5xl mx-auto p-16 rounded-[50px] bg-gradient-to-br from-accent-blue/10 via-accent-purple/10 to-transparent border border-foreground/10 relative overflow-hidden flex flex-col items-center text-center gap-8"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] pointer-events-none"></div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">Ready to scale your mission?</h2>
          <p className="text-xl text-foreground/60 max-w-2xl">Let&apos;s connect to build something equally impactful. My inbox is always open for new challenges.</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <a href="mailto:bakki.mahesh5263@gmail.com" className="px-10 py-5 bg-foreground text-background font-bold rounded-full shadow-2xl transition-all">Start a Conversation</a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
