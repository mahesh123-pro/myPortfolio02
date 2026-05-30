"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Code, MoveRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const horizontalPanelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".project-panel");
    const container = containerRef.current;
    if (!container || !horizontalPanelRef.current) return;

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        start: "top top",
        end: () => "+=" + horizontalPanelRef.current!.offsetWidth,
      }
    });

    // Animate inner images to create a parallax effect within the horizontal scroll
    panels.forEach((panel: any, i) => {
      const image = panel.querySelector(".project-image");
      if (image) {
        gsap.fromTo(image, 
          { x: -50, scale: 1.1 },
          { 
            x: 50, 
            scale: 1, 
            ease: "none",
            scrollTrigger: {
              trigger: container,
              scrub: true,
              start: () => "top top-=" + (i - 1) * window.innerWidth,
              end: () => "top top-=" + (i + 1) * window.innerWidth
            }
          }
        );
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="projects" className="relative h-screen w-full bg-background overflow-hidden text-foreground">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 70%)" }}></div>

      {/* Sticky header for the section */}
      <div className="absolute top-12 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 flex justify-between items-center pointer-events-none">
        <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tighter uppercase uppercase mix-blend-difference">
          Selected <span className="text-gray-500">Works / 2026</span>
        </h2>
        <div className="text-xs uppercase tracking-[0.3em] font-mono text-gray-400 flex items-center gap-2">
          Scroll
          <MoveRight className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      <div ref={scrollWrapperRef} className="h-full w-full flex items-center">
        <div ref={horizontalPanelRef} className="flex h-full w-[500vw]">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-panel relative w-screen h-full flex flex-col justify-center items-center p-6 md:p-12 lg:p-24"
            >
              <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center z-10">
                
                {/* Project Info */}
                <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-10 order-2 lg:order-1">
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-bold tracking-[0.3em] uppercase" style={{ color: project.color }}>
                      0{index + 1} / 0{projects.length}
                    </div>
                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black tracking-tighter leading-none">
                      {project.title.split(' ').map((word, i) => (
                        <div key={i} className="overflow-hidden">
                          <span className="block">{word}</span>
                        </div>
                      ))}
                    </h3>
                  </div>
                  
                  <p className="font-light text-foreground/70 text-lg leading-relaxed max-w-md">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 border border-foreground/10 rounded-full text-xs font-mono uppercase tracking-widest text-foreground/80 backdrop-blur-md bg-foreground/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    <Link 
                      href={project.link} 
                      target="_blank"
                      className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-accent-blue transition-colors"
                    >
                      <span className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-accent-blue transition-colors">
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
                <div className="lg:col-span-8 w-full h-[40vh] lg:h-[70vh] relative group overflow-hidden rounded-[2rem] border border-foreground/10 bg-background/50 order-1 lg:order-2">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image w-full h-full object-cover rounded-[2rem]"
                  />

                  {/* Interactive floating cursor element that follows mouse - CSS only for simplicity here */}
                  <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-background/80 backdrop-blur-xl rounded-full flex items-center justify-center text-[10px] uppercase font-bold tracking-widest z-20 pointer-events-none transition-all duration-300 scale-50 group-hover:scale-100">
                    View
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}