"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Code, Palette, Video, Image as ImageIcon, Award, Mic2, Cloud } from "lucide-react";

const sideHustles = [
  {
    title: "Web Development",
    description: "Full-stack solutions with modern frameworks.",
    image: "/portfolio1assests/service-web-development.png",
    icon: <Code className="w-5 h-5" />,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Web Design",
    description: "Premium UI/UX and branding.",
    image: "/portfolio1assests/service-web-design.png",
    icon: <Palette className="w-5 h-5" />,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Video Editing",
    description: "Cinematic storytelling & post-production.",
    image: "/portfolio1assests/service-video-editing.png",
    icon: <Video className="w-5 h-5" />,
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Cloud Solutions",
    description: "AWS Certified infrastructure & scaling.",
    image: "/portfolio1assests/aws_cert_img.png",
    icon: <Cloud className="w-5 h-5" />,
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    title: "Technical Speaking",
    description: "Sharing knowledge at tech conferences.",
    image: "/portfolio1assests/tech_speaker_img.png",
    icon: <Mic2 className="w-5 h-5" />,
    color: "from-indigo-500/20 to-blue-500/20",
  },
  {
    title: "Photo Editing",
    description: "High-end retouching & color grading.",
    image: "/portfolio1assests/service-photo-editing.png",
    icon: <ImageIcon className="w-5 h-5" />,
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Innovation Strategy",
    description: "Award-winning problem solving & hacking.",
    image: "/portfolio1assests/hackathon_win_img.png",
    icon: <Award className="w-5 h-5" />,
    color: "from-red-500/20 to-rose-500/20",
  }
];

function MarqueeColumn({ items, reverse = false, speed = 20 }: { items: typeof sideHustles, reverse?: boolean, speed?: number }) {
  return (
    <div className="flex flex-col gap-6 relative">
      <motion.div 
        animate={{ 
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] 
        }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex flex-col gap-6"
      >
        {[...items, ...items, ...items].map((hustle, i) => (
          <div
            key={i}
            className="relative h-[320px] w-full min-w-[300px] rounded-[2.5rem] overflow-hidden border border-white/5 bg-neutral-900/40 backdrop-blur-md group transition-all duration-500 hover:border-white/20"
          >
            {/* Image Layer */}
            <div className="absolute inset-0">
              <Image 
                src={hustle.image} 
                alt={hustle.title} 
                fill
                className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:scale-110 transition-transform duration-500">
                  <div className="text-white">
                    {hustle.icon}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-heading tracking-tight">{hustle.title}</h3>
                  <p className="text-neutral-400 font-light text-xs leading-relaxed max-w-[200px]">
                    {hustle.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Accent Glow */}
            <div className={`absolute -inset-px bg-gradient-to-br ${hustle.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function SideHustleSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Split items for different columns
  const col1 = [...sideHustles.slice(0, 3)];
  const col2 = [...sideHustles.slice(3, 5)];
  const col3 = [...sideHustles.slice(5, 7)];

  return (
    <section id="side-hustle" className="py-32 px-6 min-h-screen relative overflow-hidden bg-black flex flex-col items-center">
      
      {/* Background radial gradients for depth */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-20 items-center">
        
        {/* Text Content */}
        <div className="lg:w-1/3 space-y-8 text-center lg:text-left sticky top-32 h-fit">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <span className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.4em]">Expertise Spectrum</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-heading font-bold tracking-tighter leading-none"
          >
            Side <br /> <span className="text-gradient">Arsenal</span>
          </motion.h2>
          
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-neutral-400 font-light max-w-sm mx-auto lg:mx-0 text-lg leading-relaxed"
          >
            A high-speed vertical showcase of the creative and technical services I provide beyond core development.
          </motion.p>

          <div className="flex gap-4 justify-center lg:justify-start pt-4">
             <div className="p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="block text-2xl font-bold text-white">7+</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">Domains</span>
             </div>
             <div className="p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="block text-2xl font-bold text-white">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">Quality</span>
             </div>
          </div>
        </div>

        {/* Vertical Marquee Section */}
        <div className="lg:w-2/3 h-[700px] w-full relative overflow-hidden flex gap-6 mask-gradient-vertical">
          <div className="flex-1">
            <MarqueeColumn items={col1} speed={30} />
          </div>
          <div className="flex-1 mt-20">
            <MarqueeColumn items={col2} reverse={true} speed={25} />
          </div>
          <div className="flex-1">
            <MarqueeColumn items={col3} speed={35} />
          </div>
        </div>
      </div>
    </section>
  );
}
