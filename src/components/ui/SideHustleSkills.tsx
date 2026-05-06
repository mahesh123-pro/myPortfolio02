"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Code, Palette, Video, Image as ImageIcon, Award, Mic2, Cloud, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const sideHustles = [
  {
    title: "Web Development",
    description: "Building scalable, high-performance web applications with modern tech stacks.",
    image: "/portfolio1assests/service-web-development.png",
    icon: <Code className="w-6 h-6" />,
    color: "from-blue-500/20 to-cyan-500/20",
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    title: "UI/UX Design",
    description: "Crafting intuitive and visually stunning user experiences.",
    image: "/portfolio1assests/service-web-design.png",
    icon: <Palette className="w-6 h-6" />,
    color: "from-purple-500/20 to-pink-500/20",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Video Editing",
    description: "Professional post-production and cinematic storytelling.",
    image: "/portfolio1assests/service-video-editing.png",
    icon: <Video className="w-6 h-6" />,
    color: "from-orange-500/20 to-red-500/20",
    gridClass: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Cloud Architecture",
    description: "AWS Certified solutions for scalable infrastructure.",
    image: "/portfolio1assests/aws_cert_img.png",
    icon: <Cloud className="w-6 h-6" />,
    color: "from-yellow-500/20 to-orange-500/20",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Technical Speaking",
    description: "Sharing insights and knowledge at global tech conferences.",
    image: "/portfolio1assests/tech_speaker_img.png",
    icon: <Mic2 className="w-6 h-6" />,
    color: "from-indigo-500/20 to-blue-500/20",
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Photo Retouching",
    description: "High-end image processing and color grading.",
    image: "/portfolio1assests/service-photo-editing.png",
    icon: <ImageIcon className="w-6 h-6" />,
    color: "from-emerald-500/20 to-teal-500/20",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Innovation Strategy",
    description: "Award-winning problem solving and hackathon wins.",
    image: "/portfolio1assests/hackathon_win_img.png",
    icon: <Award className="w-6 h-6" />,
    color: "from-red-500/20 to-rose-500/20",
    gridClass: "md:col-span-1 md:row-span-1",
  }
];

function BentoCard({ item, index }: { item: typeof sideHustles[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const xSpring = useSpring(0, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(0, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);
    
    xSpring.set(x / width - 0.5);
    ySpring.set(y / height - 0.5);
  }

  function handleMouseLeave() {
    xSpring.set(0);
    ySpring.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden rounded-[2.5rem] border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-all duration-500 hover:border-foreground/20 hover:bg-foreground/10 ${item.gridClass} min-h-[240px]`}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(var(--foreground-rgb), 0.08), transparent 40%)`
          ),
        }}
      />

      {/* Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src={item.image} 
          alt={item.title} 
          fill
          className="object-cover opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 h-full p-8 flex flex-col justify-between" style={{ transform: "translateZ(50px)" }}>
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center backdrop-blur-xl group-hover:scale-110 group-hover:bg-foreground/10 transition-all duration-500">
            <div className="text-foreground group-hover:text-accent-blue transition-colors">
              {item.icon}
            </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 45 }}
            className="w-8 h-8 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            <ArrowUpRight className="w-4 h-4 text-foreground" />
          </motion.div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-foreground font-heading tracking-tight leading-none">{item.title}</h3>
          <p className="text-foreground/60 font-light text-xs leading-relaxed max-w-[240px]">
            {item.description}
          </p>
        </div>
      </div>

      {/* Accent Glow */}
      <div className={`absolute -inset-px bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />
    </motion.div>
  );
}

export function SideHustleSkills() {
  return (
    <section id="side-hustle" className="py-32 px-6 min-h-screen relative overflow-hidden bg-background flex flex-col items-center">
      
      {/* Background radial gradients for depth */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--foreground-rgb),0.02)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center space-y-20">
        
        {/* Header Section */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-8">
          <div className="lg:w-2/3">
            <SectionHeading 
              number="03.5 /"
              badge="Expertise Spectrum"
              title="Side"
              gradientPart="Arsenal"
              description="A multi-dimensional showcase of my creative and technical capabilities beyond core engineering."
              centered={false}
            />
          </div>
          
          <div className="flex gap-4 pb-2">
            <div className="px-6 py-3 rounded-2xl bg-foreground/5 border border-foreground/10 backdrop-blur-sm">
              <span className="block text-2xl font-bold text-foreground">07</span>
              <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-bold">Disciplines</span>
            </div>
            <div className="px-6 py-3 rounded-2xl bg-foreground/5 border border-foreground/10 backdrop-blur-sm">
              <span className="block text-2xl font-bold text-gradient">100%</span>
              <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-bold">Precision</span>
            </div>
          </div>
        </div>

        {/* Bento Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full auto-rows-[240px]">
          {sideHustles.map((item, i) => (
            <BentoCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Decorative Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="pt-10 flex items-center gap-4 text-foreground/40"
        >
          <div className="h-[1px] w-20 bg-foreground/10" />
          <span className="text-xs uppercase tracking-[0.4em] font-bold">Infinite Exploration</span>
          <div className="h-[1px] w-20 bg-foreground/10" />
        </motion.div>
      </div>
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
