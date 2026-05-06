"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowBorder, Tilt3D, BlobExpand } from "../effects/HoverEffects";
import { GradientText } from "../effects/TextEffects";
import { FadeUp, BlurReveal } from "../effects/EnterAnimations";
import { Server, Smartphone, Globe, Cloud, Database, Shield } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

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
  return (
    <section id="services" className="py-32 px-6 flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-background">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-24 relative z-10">
        <SectionHeading 
          number="02 /"
          badge="Expertise Spectrum"
          title="Core"
          gradientPart="Capabilities"
          description="A comprehensive suite of technical services designed to power modern digital enterprises."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <FadeUp key={i} delay={0.1 * i}>
              <div className="group relative p-10 h-full flex flex-col gap-8 rounded-[2.5rem] bg-foreground/5 border border-foreground/10 backdrop-blur-md hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-500">
                
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:text-accent-blue transition-all duration-500 shadow-2xl">
                  {service.icon}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold font-heading text-foreground tracking-tight">{service.title}</h3>
                  <p className="text-foreground/60 font-light text-sm leading-relaxed">{service.description}</p>
                </div>

                {/* Decorative Accent */}
                <div className="absolute bottom-0 right-0 p-8 opacity-0 group-hover:opacity-10 translate-y-4 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                  {React.cloneElement(service.icon as React.ReactElement, { size: 100 } as any)}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
