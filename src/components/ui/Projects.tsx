"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Code, BookOpen } from "lucide-react";
import Link from "next/link";

const projects = [
  // ... (keeping original project data)
  {
    id: "manakrishi",
    title: "Manakrishi App",
    description: "Agri-tech platform enabling precision drone spraying, safer operations, and better farm outcomes.",
    tech: ["React Native", "Node.js", "AWS"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    color: "#10b981",
    image: "/portfolio1assests/work-1.png",
    link: "https://www.manakrishi.in/"
  },
  {
    id: "prolance",
    title: "Prolance",
    description: "Professional networking platform built to help users create meaningful connections and growth opportunities.",
    tech: ["Next.js", "Node.js", "MongoDB"],
    gradient: "from-blue-500/20 to-indigo-500/20",
    color: "#3b82f6",
    image: "/portfolio1assests/prolance.png",
    link: "https://www.prolance.me/"
  },
  {
    id: "visaensure",
    title: "VisaEnsure",
    description: "Global visa assistance platform with AI-powered document validation and a student-first experience.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    gradient: "from-purple-500/20 to-pink-500/20",
    color: "#a855f7",
    image: "/portfolio1assests/visaensure.png",
    link: "https://visaensure.vercel.app/"
  },
  {
    id: "3d-portfolio",
    title: "3D Portfolio Website",
    description: "Immersive 3D portfolio experience crafted with modern web technologies and cinematic motion design.",
    tech: ["Next.js", "Three.js", "Framer Motion"],
    gradient: "from-orange-500/20 to-red-500/20",
    color: "#f97316",
    image: "/portfolio1assests/my3dportfolioimage.png",
    link: "https://my-3d-portfolio-zeta-coral.vercel.app/"
  },
  {
    id: "elegance-events",
    title: "Elegance Events",
    description: "End-to-end event management platform with an admin suite for operations and insights.",
    tech: ["React", "Node.js", "MongoDB"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    color: "#06b6d4",
    image: "/portfolio1assests/work-4.png",
    link: "https://event-management-nine-chi.vercel.app/"
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture",
    description: "Enterprise-style 3-tier AWS architecture focused on high availability, security, and resilience.",
    tech: ["EC2", "VPC", "RDS DB"],
    gradient: "from-yellow-500/20 to-orange-500/20",
    color: "#eab308",
    image: "/portfolio1assests/work-3.png",
    link: "#"
  }
];

function Card({ project, i }: { project: any, i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl p-px bg-white/10 hover:bg-white/20 transition-colors duration-500 overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              ${project.color}22,
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative h-full bg-neutral-950/90 backdrop-blur-3xl rounded-[23px] p-8 flex flex-col justify-between overflow-hidden">
        <div className="space-y-6">
          <div className="h-48 w-full bg-neutral-900 rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/5">
            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
               <Link href={`/case-study/${project.id}`} className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-2xl">
                 <BookOpen size={16} /> View Case Study
               </Link>
               <div className="flex gap-4">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10">
                  <ExternalLink size={18} className="text-white" />
                </a>
               </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-2xl font-bold font-heading group-hover:text-white transition-colors tracking-tight">{project.title}</h3>
            <p className="text-neutral-400 font-light text-sm leading-relaxed group-hover:text-neutral-300 transition-colors">{project.description}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((tech: string, j: number) => (
            <span key={j} className="px-3 py-1 text-[10px] font-mono rounded-full bg-white/5 border border-white/10 text-neutral-400 group-hover:text-neutral-200 group-hover:border-white/20 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

import { useMotionTemplate } from "framer-motion";

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 flex flex-col items-center justify-center min-h-screen relative">
      {/* Decorative side glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full space-y-20 relative z-10">
        
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 mb-4"
          >
            <span className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.3em]">Project Gallery</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-bold tracking-tight"
          >
            Featured <span className="text-gradient">Work</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-neutral-400 font-light max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A curated selection of high-impact applications focused on architecture, scalability, and premium user experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Card key={i} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
