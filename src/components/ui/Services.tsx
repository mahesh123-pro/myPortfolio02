"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Server, Smartphone, Globe, Cloud, Database, Shield } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: <Globe size={32} />,
    title: "Full-Stack Architecture",
    description: "Developing robust, scalable web ecosystems using Next.js, React, and Node.js. My approach combines pixel-perfect UI with enterprise-grade backend logic.",
  },
  {
    icon: <Cloud size={32} />,
    title: "Cloud Infrastructure",
    description: "Specializing in AWS cloud-native solutions. From serverless deployments to complex VPC networking, I engineer systems for 99.9% availability.",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile Engineering",
    description: "Building high-performance cross-platform mobile applications using React Native. Delivering seamless user experiences across iOS and Android.",
  },
  {
    icon: <Database size={32} />,
    title: "Database Engineering",
    description: "Architecting high-performance data layers with MongoDB, PostgreSQL, and Redis. Focused on data integrity, complex queries, and global scalability.",
  },
  {
    icon: <Server size={32} />,
    title: "DevOps & Automation",
    description: "Streamlining development lifecycles with robust CI/CD pipelines, Docker containerization, and automated infrastructure as code.",
  },
  {
    icon: <Shield size={32} />,
    title: "Technical Consultation",
    description: "Providing strategic insights on system design, security protocols, and tech stack optimization to align technical execution with business goals.",
  }
];

export function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(".services-header", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // Stagger Cards
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 75%",
          }
        }
      );

      // Mouse move effect for cards
      cardsRef.current.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Glow spot
          const glow = card.querySelector('.glow-spot') as HTMLElement;
          if(glow) {
            gsap.to(glow, {
              x,
              y,
              opacity: 1,
              duration: 0.2
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          const glow = card.querySelector('.glow-spot') as HTMLElement;
          if(glow) {
            gsap.to(glow, { opacity: 0, duration: 0.4 });
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="py-32 flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-background border-t border-foreground/10">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50"
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)' }} />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 space-y-24 relative z-10">
        
        <div className="services-header flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-foreground/20"></div>
            <span className="text-xs font-mono tracking-[0.4em] uppercase text-foreground/50 font-bold">02 — Expertise</span>
            <div className="w-12 h-px bg-foreground/20"></div>
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase mix-blend-difference leading-[0.9]">
            Core <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Capabilities.</span>
          </h2>
          <p className="text-foreground/50 text-sm md:text-base font-light max-w-xl font-mono mt-4">
            A comprehensive suite of technical services designed to power modern digital enterprises.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
          {services.map((service, i) => (
            <div 
              key={i} 
              ref={(el) => { if(el) cardsRef.current[i] = el; }}
              className="group relative p-10 flex flex-col gap-8 rounded-[2.5rem] bg-foreground/5 border border-foreground/10 overflow-hidden cursor-crosshair transform-style-3d hover:border-accent-blue/50 transition-colors duration-500 backdrop-blur-3xl"
            >
              <div className="glow-spot absolute w-[300px] h-[300px] bg-accent-blue/20 rounded-full blur-[80px] pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen"></div>

              {/* Icon Container */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-background border border-foreground/10 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:text-accent-blue transition-transform duration-500 shadow-2xl">
                {service.icon}
              </div>
              
              <div className="space-y-4 relative z-10">
                <h3 className="text-2xl font-black font-heading text-foreground tracking-tight group-hover:text-accent-blue transition-colors">{service.title}</h3>
                <p className="text-foreground/60 font-mono text-xs leading-relaxed">{service.description}</p>
              </div>

              {/* Decorative Accent Background */}
              <div className="absolute -bottom-10 -right-10 p-8 opacity-0 group-hover:opacity-[0.03] scale-50 group-hover:scale-150 transition-all duration-700 pointer-events-none mix-blend-difference z-0">
                {React.cloneElement(service.icon as React.ReactElement, { size: 200 } as any)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}