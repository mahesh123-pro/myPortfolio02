"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Code, BookOpen } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: "manakrishi",
    title: "Manakrishi Platform",
    description: "An advanced agri-tech ecosystem enabling precision drone operations and data-driven farming insights for scalable agriculture.",
    tech: ["React Native", "Node.js", "AWS Architecture"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    color: "#10b981",
    image: "/portfolio1assests/work-1.png",
    link: "https://www.manakrishi.in/"
  },
  {
    id: "prolance",
    title: "Prolance Network",
    description: "A professional networking hub architected for meaningful industry connections and career growth through intelligent matching.",
    tech: ["Next.js 14", "MongoDB", "Auth.js"],
    gradient: "from-blue-500/20 to-indigo-500/20",
    color: "#3b82f6",
    image: "/portfolio1assests/prolance.png",
    link: "https://www.prolance.me/"
  },
  {
    id: "visaensure",
    title: "VisaEnsure Global",
    description: "Enterprise visa assistance platform featuring AI-driven document verification and a streamlined student immigration workflow.",
    tech: ["Next.js", "Tailwind", "Cloudfront"],
    gradient: "from-purple-500/20 to-pink-500/20",
    color: "#a855f7",
    image: "/portfolio1assests/visaensure.png",
    link: "https://visaensure.vercel.app/"
  },
  {
    id: "3d-portfolio",
    title: "Cinematic 3D Portfolio",
    description: "A high-performance immersive experience utilizing Three.js and Framer Motion to showcase technical artistry and design depth.",
    tech: ["Three.js", "GSAP", "React Three Fiber"],
    gradient: "from-orange-500/20 to-red-500/20",
    color: "#f97316",
    image: "/portfolio1assests/my3dportfolioimage.png",
    link: "https://my-3d-portfolio-zeta-coral.vercel.app/"
  },
  {
    id: "elegance-events",
    title: "Elegance Suite",
    description: "Comprehensive event management infrastructure with real-time analytics and an end-to-end operational dashboard.",
    tech: ["React", "Express", "Chart.js"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    color: "#06b6d4",
    image: "/portfolio1assests/work-4.png",
    link: "https://event-management-nine-chi.vercel.app/"
  },
  {
    id: "cloud-architecture",
    title: "3-Tier AWS Architecture",
    description: "A production-grade cloud blueprint focused on high availability, disaster recovery, and multi-region resilience.",
    tech: ["VPC", "EC2 Auto-scaling", "RDS"],
    gradient: "from-yellow-500/20 to-orange-500/20",
    color: "#eab308",
    image: "/portfolio1assests/work-3.png",
    link: "#"
  }
];

function Card({ project, i }: { project: any, i: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-[2.5rem] p-px bg-foreground/5 hover:bg-foreground/10 transition-all duration-500 overflow-hidden border border-foreground/5"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              ${project.color}15,
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative h-full bg-background/40 backdrop-blur-xl rounded-[calc(2.5rem-1px)] p-8 flex flex-col justify-between overflow-hidden">
        <div className="space-y-8">
          <div className="h-56 w-full bg-foreground/5 rounded-3xl relative overflow-hidden border border-foreground/5 shadow-inner">
            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4 px-6 text-center">
               <Link href={`/case-study/${project.id}`} className="px-8 py-3 bg-foreground text-background text-xs font-bold rounded-2xl flex items-center gap-2 hover:scale-105 transition-all active:scale-95 shadow-2xl">
                 <BookOpen size={14} /> Documentation
               </Link>
               <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-foreground/10 backdrop-blur-md border border-foreground/20 text-foreground text-xs font-bold rounded-2xl hover:bg-foreground/20 transition-all">
                 Live Preview
               </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
               <h3 className="text-2xl font-bold font-heading text-foreground tracking-tight">{project.title}</h3>
               <ArrowUpRight size={20} className="text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <p className="text-foreground/60 font-light text-sm leading-relaxed">{project.description}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {project.tech.map((tech: string, j: number) => (
            <span key={j} className="px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-xl bg-foreground/5 border border-foreground/10 text-foreground/60 group-hover:text-foreground group-hover:border-foreground/20 transition-all">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

import { useMotionTemplate } from "framer-motion";
import { Tilt3D } from "../effects/HoverEffects";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-background">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent-1/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-2/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-24 relative z-10">
        
        <SectionHeading 
          number="03 /"
          badge="Product Showcase"
          title="Featured"
          gradientPart="Deployments"
          description="A selection of production-grade systems engineered for scale, resilience, and premium user interaction."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <Tilt3D key={i} className="w-full">
              <Card project={project} i={i} />
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  );
}
