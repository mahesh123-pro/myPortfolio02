"use client";

import { useRef } from "react";
import { ExternalLink, Code } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    id: "manakrishi",
    title: "Manakrishi Platform",
    description: "An advanced agri-tech ecosystem enabling precision drone operations and data-driven farming insights for scalable agriculture.",
    tech: ["React Native", "Node.js", "AWS Architecture"],
    color: "#10b981",
    image: "/portfolio1assests/work-1.png",
    link: "https://www.manakrishi.in/"
  },
  {
    id: "prolance",
    title: "Prolance Network",
    description: "A professional networking hub architected for meaningful industry connections and career growth through intelligent matching.",
    tech: ["Next.js 14", "MongoDB", "Auth.js"],
    color: "#3b82f6",
    image: "/portfolio1assests/prolance.png",
    link: "https://www.prolance.me/"
  },
  {
    id: "visaensure",
    title: "VisaEnsure Global",
    description: "Enterprise visa assistance platform featuring AI-driven document verification and a streamlined student immigration workflow.",
    tech: ["Next.js", "Tailwind", "Cloudfront"],
    color: "#a855f7",
    image: "/portfolio1assests/visaensure.png",
    link: "https://visaensure.vercel.app/"
  },
  {
    id: "3d-portfolio",
    title: "Cinematic 3D Portfolio",
    description: "A high-performance immersive experience utilizing Three.js and Framer Motion to showcase technical artistry and design depth.",
    tech: ["Three.js", "GSAP", "React Three Fiber"],
    color: "#f97316",
    image: "/portfolio1assests/my3dportfolioimage.png",
    link: "https://my-3d-portfolio-zeta-coral.vercel.app/"
  },
  {
    id: "elegance-events",
    title: "Elegance Events",
    description: "A premium event management dashboard with real-time analytics, vendor coordination, and seamless customer onboarding.",
    tech: ["React", "Express", "PostgreSQL"],
    color: "#ec4899",
    image: "/portfolio1assests/work-2.png",
    link: "https://elegance-events.vercel.app/"
  }
];

const ProjectCard = ({ project, index, total }: { project: any, index: number, total: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific card to scale it down when scrolling past
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95 - (total - index) * 0.01]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div 
      ref={cardRef} 
      className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden" 
      style={{ zIndex: index }}
    >
      <motion.div 
        style={{ scale, opacity }}
        className="w-full max-w-7xl h-full max-h-[85vh] lg:max-h-[800px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-background rounded-[2rem] border border-foreground/10 p-6 md:p-10 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{ background: `radial-gradient(circle at 80% 20%, ${project.color}40, transparent 50%)` }} 
        />
        
        {/* Project Info */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 z-10 relative order-2 lg:order-1 h-full justify-center">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold tracking-[0.3em] uppercase" style={{ color: project.color }}>
              0{index + 1} / 0{total}
            </div>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-none">
              {project.title}
            </h3>
          </div>
          
          <p className="font-light text-foreground/70 text-base md:text-lg leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {project.tech.map((t: string) => (
              <span key={t} className="px-3 py-1.5 border border-foreground/10 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest text-foreground/80 bg-foreground/5">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-2">
            <Link 
              href={project.link} 
              target="_blank"
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-accent-blue transition-colors"
            >
              <span className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-accent-blue transition-colors bg-background">
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </span>
              Live Site
            </Link>
            <Link 
              href={`/case-study/${project.id}`} 
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors"
            >
              <Code className="w-4 h-4" />
              Case Study
            </Link>
          </div>
        </div>

        {/* Project Image Showcase */}
        <div className="lg:col-span-7 w-full h-[35vh] lg:h-full relative group overflow-hidden rounded-[1.5rem] bg-foreground/5 order-1 lg:order-2">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
          
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Interactive floating cursor element */}
          <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-background/90 backdrop-blur-md rounded-full flex items-center justify-center text-[10px] uppercase font-bold tracking-widest z-20 pointer-events-none transition-all duration-300 scale-50 group-hover:scale-100 text-foreground shadow-xl">
            View
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative w-full bg-background text-foreground pb-24">
      {/* Sticky header for the section */}
      <div className="sticky top-0 z-50 px-6 md:px-12 lg:px-20 pt-12 pb-4 pointer-events-none mix-blend-difference text-white">
        <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tighter uppercase">
          Selected <span className="text-gray-400">Works / 2026</span>
        </h2>
      </div>

      <div className="flex flex-col w-full relative mt-[-60px]">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            total={projects.length} 
          />
        ))}
      </div>
    </section>
  );
}