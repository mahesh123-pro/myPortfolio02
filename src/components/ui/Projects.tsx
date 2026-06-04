"use client";

import React, { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  color: string;
  image: string;
  link: string;
  github: string;
}

const projects: Project[] = [
  {
    id: "manakrishi",
    title: "Manakrishi Platform",
    description: "An advanced agri-tech ecosystem enabling precision drone operations and data-driven farming insights for scalable agriculture.",
    tech: ["React Native", "Node.js", "AWS Architecture"],
    color: "#ff6b00",
    image: "/portfolio1assests/work-1.png",
    link: "https://www.manakrishi.in/",
    github: "https://github.com/mahesh123-pro/manakrishi-platform"
  },
  {
    id: "prolance",
    title: "Prolance Network",
    description: "A professional networking hub architected for meaningful industry connections and career growth through intelligent matching.",
    tech: ["Next.js", "MongoDB", "Auth.js", "TailwindCSS"],
    color: "#ff6b00",
    image: "/portfolio1assests/prolance.png",
    link: "https://www.prolance.me/",
    github: "https://github.com/mahesh123-pro/prolance-network"
  },
  {
    id: "visaensure",
    title: "VisaEnsure Global",
    description: "Enterprise visa assistance platform featuring AI-driven document verification and a streamlined student immigration workflow.",
    tech: ["Next.js", "Tailwind", "Cloudfront CDN"],
    color: "#ff6b00",
    image: "/portfolio1assests/visaensure.png",
    link: "https://visaensure.vercel.app/",
    github: "https://github.com/mahesh123-pro/visaensure"
  },
  {
    id: "3d-portfolio",
    title: "Cinematic 3D Portfolio",
    description: "A high-performance immersive experience utilizing Three.js and Framer Motion to showcase technical artistry and design depth.",
    tech: ["Three.js", "GSAP", "React Three Fiber"],
    color: "#ff6b00",
    image: "/portfolio1assests/my3dportfolioimage.png",
    link: "https://my-3d-portfolio-zeta-coral.vercel.app/",
    github: "https://github.com/mahesh123-pro/3d-portfolio"
  },
  {
    id: "elegance-events",
    title: "Elegance Events",
    description: "A premium event management dashboard with real-time analytics, vendor coordination, and seamless customer onboarding.",
    tech: ["React", "Express", "PostgreSQL"],
    color: "#ff6b00",
    image: "/portfolio1assests/work-2.png",
    link: "https://elegance-events.vercel.app/",
    github: "https://github.com/mahesh123-pro/elegance-events"
  }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  // 3D Tilt values via Framer Motion
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  
  const rotateX = useTransform(tiltY, [-250, 250], [6, -6]);
  const rotateY = useTransform(tiltX, [-250, 250], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    tiltX.set(mouseX);
    tiltY.set(mouseY);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 border-b border-white/5 last:border-b-0`}
    >
      
      {/* 1. Large Project Image Container (Zig-Zag order) */}
      <div 
        className={`lg:col-span-7 relative group overflow-hidden rounded-[2rem] bg-white/3 border border-white/5 cursor-pointer shadow-xl overflow-hidden aspect-[16/10] ${
          isEven ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full relative"
        >
          {/* Custom Orange Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-radial-gradient from-[#ff6b00]/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Actual image zoom */}
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-103"
          />

          {/* Hover View Label Badge */}
          <div className="absolute top-6 right-6 z-20 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 flex items-center gap-1.5 text-[9px] font-mono text-white tracking-widest uppercase">
            Interact <ArrowUpRight className="w-3 h-3 text-[#ff6b00]" />
          </div>
        </motion.div>
      </div>

      {/* 2. Project Information Content (Zig-Zag order) */}
      <div 
        className={`lg:col-span-5 flex flex-col gap-6 relative z-10 ${
          isEven ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-[#ff6b00] uppercase tracking-[0.3em] block">
            Project 0{index + 1}
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tight leading-none text-white uppercase">
            {project.title}
          </h3>
        </div>

        <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light font-sans">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((badge: string) => (
            <span 
              key={badge} 
              className="px-3.5 py-1.5 border border-white/5 rounded-full text-[9px] font-mono uppercase tracking-widest text-white/80 bg-white/3"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Actions buttons */}
        <div className="flex items-center gap-4 pt-3">
          <a 
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#ff6b00] hover:text-black font-mono font-black uppercase text-[10px] tracking-widest transition-colors duration-300 flex items-center gap-2 group shadow-md"
          >
            Live Site
            <ExternalLink className="w-3.5 h-3.5 transform group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-transparent text-white border border-white/10 hover:border-[#ff6b00] hover:text-[#ff6b00] font-mono font-black uppercase text-[10px] tracking-widest transition-colors duration-300 flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.26c3-.3 6-1.5 6-6.44a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.15-3.8s-1.18-.38-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.72-1.78-3.9-1.4-3.9-1.4a5.5 5.5 0 0 0-.15 3.8 5.5 5.5 0 0 0-1.5 3.8c0 4.9 3 6.1 6 6.44a4.8 4.8 0 0 0-1 3.26v4"></path></svg>
            Repository
          </a>
        </div>

      </div>

    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative w-full bg-[#0A0A0A] py-28 border-t border-white/5">
      {/* Background glow shadow */}
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#ff6b00]/2 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full space-y-16">
        
        {/* Sticky-like section title */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#ff6b00]" />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#ff6b00] font-bold">03 — Works</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase text-white leading-none">
            Selected <span className="text-gradient-orange">Creations.</span>
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light max-w-xl font-mono mt-2">
            A hand-picked selection of production solutions balancing cloud capabilities with elegant UI design.
          </p>
        </div>

        {/* Project zig-zag list */}
        <div className="flex flex-col w-full relative pt-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}