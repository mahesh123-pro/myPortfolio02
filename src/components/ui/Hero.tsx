"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

// Helper to generate stable random data for the vortex
const genVortexData = (count: number) => {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 2 + Math.random() * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = radius * Math.cos(phi);
  }

  const rotations = [...Array(3)].map(() => [
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    0
  ] as [number, number, number]);

  return { positions: pos, ringRotations: rotations };
};

// 1. Futuristic Neural Vortex Animation
function NeuralVortex({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Particle configuration - generated once
  const count = 400;
  const { positions, ringRotations } = useMemo(() => genVortexData(count), [count]);

  // Update positions for organic pulsing effect
  useFrame((state, delta) => {
    if (!groupRef.current || !pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const scrollVal = scrollYProgress.get();
    
    // Smooth group rotation - speeds up on scroll
    groupRef.current.rotation.y += delta * (0.1 + scrollVal * 0.5);
    groupRef.current.rotation.x += delta * (0.05 + scrollVal * 0.2);

    // React to mouse movement
    const targetX = (state.mouse.x * Math.PI) / 6;
    const targetY = (state.mouse.y * Math.PI) / 6;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);

    // Expand the whole group on scroll
    const scaleValue = 1 + scrollVal * 1.5;
    groupRef.current.scale.set(scaleValue, scaleValue, scaleValue);

    // Pulse the particles with scroll intensity
    const posAttr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const px = posAttr[i3];
        const py = posAttr[i3 + 1];
        const pz = posAttr[i3 + 2];
        
        // Intensity of chaos increases with scroll
        const intensity = 0.002 + scrollVal * 0.01;
        const wave = Math.sin(time + px + py + pz) * intensity;
        posAttr[i3] += wave;
        posAttr[i3 + 1] += wave;
        posAttr[i3 + 2] += wave;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* Central Energy Core - pulses opacity on pulse */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial 
          color="#ff6b00" 
          transparent 
          opacity={0.03} 
          wireframe 
        />
      </mesh>
      
      {/* Glowing Inner Core */}
      <mesh scale={[0.8, 0.8, 0.8]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial 
          color="#ff6b00" 
          transparent 
          opacity={0.05} 
          wireframe 
        />
      </mesh>

      {/* Floating Particles */}
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#ff6b00"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Orbiting Tech Rings */}
      {ringRotations.map((rotation, i) => (
        <mesh key={i} rotation={rotation}>
          <torusGeometry args={[2.2 + i * 0.4, 0.005, 16, 100]} />
          <meshBasicMaterial color="#ff6b00" transparent opacity={0.15 - i * 0.03} />
        </mesh>
      ))}

      {/* Additional Glow */}
      <mesh scale={[2.5, 2.5, 2.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ff6b00" transparent opacity={0.01} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

// 2. Character Reveal Animation
const CharReveal = ({ text, className = "" }: { text: string; className?: string }) => {
  const chars = text.split("");
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const charVariants = {
    hidden: { y: "150%", opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: "1000px" }}
      className={className}
    >
      {chars.map((char, index) => (
        <span key={index} className="inline-block overflow-hidden py-1">
          <motion.span 
            variants={charVariants} 
            className="inline-block origin-bottom"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};

// Subheading Word Reveal
const WordReveal = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-3 md:mr-4 py-1">
          <motion.span variants={wordVariants} className="inline-block origin-left">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewProjectsBtnRef = useRef<HTMLAnchorElement>(null);
  const resumeBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Magnetic button effects using GSAP
  useEffect(() => {
    if (!mounted) return;
    
    const registerMagnetic = (btn: HTMLAnchorElement | null) => {
      if (!btn) return;
      
      const hoverBtn = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      const leaveBtn = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
      };

      btn.addEventListener("mousemove", hoverBtn);
      btn.addEventListener("mouseleave", leaveBtn);
      
      return () => {
        btn.removeEventListener("mousemove", hoverBtn);
        btn.removeEventListener("mouseleave", leaveBtn);
      };
    };

    const cleanup1 = registerMagnetic(viewProjectsBtnRef.current);
    const cleanup2 = registerMagnetic(resumeBtnRef.current);

    return () => {
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  }, [mounted]);

  const techStack = ["AWS", "Azure", "Linux", "DevOps", "React", "Next.js"];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[120vh] w-full flex items-center justify-center bg-[#0A0A0A] overflow-hidden pt-28 lg:pt-0"
    >
      <motion.div 
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 z-0 bg-radial-at-c from-[#ff6b00]/3 to-transparent pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Headline details */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-8">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[#ff6b00]" />
            <span className="text-[10px] font-mono font-bold text-[#ff6b00] uppercase tracking-[0.4em]">Available for projects</span>
          </motion.div>

          <CharReveal
            text="Cloud Engineer & Full-Stack Developer"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] text-white"
          />

          <WordReveal
            text="Building scalable cloud solutions, modern web applications, and automation systems with production-grade resiliency."
            className="text-white/60 text-base sm:text-lg max-w-xl font-sans leading-relaxed"
          />

          {/* Tech Stack Pills */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
            }}
            className="flex flex-wrap gap-2.5 pt-2"
          >
            {techStack.map((tech) => (
              <motion.span 
                key={tech}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 10 },
                  visible: { opacity: 1, scale: 1, y: 0 }
                }}
                className="px-4 py-2 rounded-full border border-white/5 bg-white/3 text-[10px] font-mono text-white/80 uppercase tracking-widest hover:border-[#ff6b00] hover:text-[#ff6b00] transition-colors duration-300 shadow-sm"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap items-center gap-5 pt-4"
          >
            <a 
              ref={viewProjectsBtnRef}
              href="#projects"
              className="px-8 py-4 bg-[#ff6b00] text-black font-mono font-black uppercase text-xs tracking-widest rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-2 group shadow-[0_4px_20px_rgba(255,107,0,0.25)]"
            >
              View Projects
              <ArrowDown className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a 
              ref={resumeBtnRef}
              href="/resume.pdf" 
              target="_blank"
              className="px-8 py-4 bg-transparent text-white font-mono font-black uppercase text-xs tracking-widest rounded-full border border-white/10 hover:border-[#ff6b00] hover:text-[#ff6b00] transition-colors duration-300 flex items-center gap-2"
            >
              Download Resume
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: High-Tech Neural Vortex */}
        <div className="lg:col-span-5 w-full aspect-square relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative max-w-[500px]"
          >
            {mounted && (
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b00" />
                <NeuralVortex scrollYProgress={scrollYProgress} />
              </Canvas>
            )}
            
            {/* Ambient Pulse Glow */}
            <motion.div 
              animate={{ 
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 -z-10 rounded-full bg-radial-gradient from-[#ff6b00]/15 to-transparent blur-[80px] pointer-events-none" 
            />
          </motion.div>
        </div>

      </div>

      {/* Downward indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ delay: 1.6, duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-white/40 font-bold font-mono">Scroll</span>
        <ArrowDown className="w-4 h-4 text-[#ff6b00]" />
      </motion.div>
    </section>
  );
}