"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { journeyData } from "@/data/experience";
import { 
  ArrowLeft, 
  Briefcase, 
  Building2, 
  Calendar, 
  Trophy, 
  Cpu, 
  ChevronRight,
  Target,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function JourneyPage() {
  const { id } = useParams();
  const router = useRouter();
  const journey = journeyData[id as string];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (!journey) {
      router.push("/#experience");
    }
  }, [journey, router]);

  if (!journey) return null;

  return (
    <main ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-accent-blue/30 overflow-x-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-background/90 to-background`} />
        <div className={`absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent-blue/10 rounded-full blur-[120px] animate-pulse`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-purple/10 rounded-full blur-[120px] animate-pulse`} style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link 
            href="/#experience" 
            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-foreground/5 border border-foreground/10 backdrop-blur-xl hover:bg-foreground/10 transition-all"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Path</span>
          </Link>
          
          <div className="px-6 py-3 rounded-2xl bg-foreground/5 border border-foreground/10 backdrop-blur-xl text-xs font-mono font-bold uppercase tracking-[0.3em]">
            Step / {journey.year}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <motion.div 
          style={{ y: y1, opacity }}
          className="max-w-5xl mx-auto space-y-12"
        >
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 text-accent-blue font-mono text-sm font-bold tracking-[0.4em] uppercase">
              <div className="h-px w-12 bg-accent-blue/50" />
              <span>The Evolution</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tight leading-[0.9]">
              {journey.role}
            </h1>
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-3 text-2xl text-foreground/60">
                <Building2 className="text-accent-blue" />
                <span className="font-medium">{journey.company}</span>
              </div>
              <div className="flex items-center gap-3 text-2xl text-foreground/60">
                <Calendar className="text-accent-purple" />
                <span className="font-medium">{journey.year}</span>
              </div>
            </div>
          </motion.div>

          <div className="h-px w-full bg-gradient-to-r from-foreground/20 via-foreground/5 to-transparent" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-2xl md:text-3xl text-foreground/60 leading-relaxed font-light italic">
              &quot;{journey.description}&quot;
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Bento Content Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Story Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 p-12 rounded-[3rem] bg-foreground/5 border border-foreground/10 backdrop-blur-md space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-accent-blue/10 text-accent-blue">
                <Sparkles size={24} />
              </div>
              <h2 className="text-3xl font-heading font-bold">The Deep Dive</h2>
            </div>
            <div className="space-y-6 text-xl text-foreground/70 leading-relaxed font-light">
              <p>{journey.details}</p>
            </div>
          </motion.div>

          {/* Stats/Quick Info Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-12 rounded-[3rem] bg-accent-blue/10 border border-accent-blue/20 backdrop-blur-md flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-accent-blue">Key Focus</div>
              <h3 className="text-4xl font-bold font-heading">Driving Innovation at Scale</h3>
            </div>
            <div className="pt-12 grid grid-cols-2 gap-8">
              <div>
                <span className="block text-4xl font-bold text-foreground">100%</span>
                <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">Precision</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-foreground">A+</span>
                <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">Standard</span>
              </div>
            </div>
          </motion.div>

          {/* Achievements Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 p-12 rounded-[3rem] bg-foreground/5 border border-foreground/10 backdrop-blur-md space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-accent-purple/10 text-accent-purple">
                <Trophy size={24} />
              </div>
              <h2 className="text-3xl font-heading font-bold">Key Milestones</h2>
            </div>
            <ul className="space-y-6">
              {journey.achievements.map((achievement, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  <span className="text-foreground/70 leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Technical Arsenal Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 p-12 rounded-[3rem] bg-foreground/5 border border-foreground/10 backdrop-blur-md space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                <Cpu size={24} />
              </div>
              <h2 className="text-3xl font-heading font-bold">Technical Focus</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {journey.skills.map((skill, i) => (
                <span key={i} className="px-6 py-3 rounded-2xl bg-foreground/5 border border-foreground/10 text-sm font-bold uppercase tracking-widest hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="h-20 w-px bg-gradient-to-b from-accent-blue to-transparent mx-auto" />
          <h2 className="text-4xl font-heading font-bold italic">Continual growth is the only constant.</h2>
          <div className="flex justify-center gap-6">
            <Link 
              href="/#experience" 
              className="px-12 py-5 bg-foreground text-background font-bold rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95"
            >
              Explore Full Path
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
