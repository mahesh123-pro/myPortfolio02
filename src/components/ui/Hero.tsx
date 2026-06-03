"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { ArrowDown, Code, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

// 1. Procedural texture generation for Earth
function createEarthTexture() {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Ocean background
  ctx.fillStyle = "#0A0A0A";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dotted ocean grid
  ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
  const oceanGrid = 16;
  for (let x = 0; x < canvas.width; x += oceanGrid) {
    for (let y = 0; y < canvas.height; y += oceanGrid) {
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  }

  // Draw simplified high-tech continents
  ctx.fillStyle = "#161616";
  ctx.strokeStyle = "rgba(255, 107, 0, 0.15)";
  ctx.lineWidth = 1;

  // Simplified continent polygons (normalized 0 to 1)
  const landmasses = [
    // North America
    [[0.08, 0.15], [0.34, 0.15], [0.38, 0.32], [0.34, 0.42], [0.26, 0.52], [0.22, 0.52], [0.18, 0.45], [0.12, 0.38]],
    // South America
    [[0.24, 0.54], [0.31, 0.56], [0.34, 0.65], [0.30, 0.85], [0.26, 0.88], [0.22, 0.68]],
    // Eurasia / Europe / Asia
    [[0.42, 0.15], [0.86, 0.15], [0.88, 0.48], [0.72, 0.52], [0.65, 0.48], [0.54, 0.46], [0.46, 0.28]],
    // Africa
    [[0.46, 0.48], [0.58, 0.48], [0.62, 0.62], [0.56, 0.78], [0.51, 0.84], [0.47, 0.74], [0.44, 0.56]],
    // Australia
    [[0.76, 0.68], [0.85, 0.68], [0.87, 0.78], [0.81, 0.82], [0.77, 0.74]],
    // Greenland
    [[0.36, 0.08], [0.44, 0.08], [0.42, 0.18], [0.37, 0.18]],
    // United Kingdom / Iceland / Japan / Madagascar (small indicators)
    [[0.41, 0.24], [0.43, 0.25], [0.42, 0.27]],
    [[0.82, 0.26], [0.84, 0.28], [0.83, 0.30]],
    [[0.60, 0.72], [0.62, 0.75], [0.61, 0.77]]
  ];

  landmasses.forEach((poly) => {
    ctx.beginPath();
    poly.forEach((pt, idx) => {
      const px = pt[0] * canvas.width;
      const py = pt[1] * canvas.height;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Fill with tech orange dots inside the continent bounds
    ctx.save();
    ctx.clip();
    ctx.fillStyle = "#ff6b00";
    const dotSpacing = 5;
    for (let dx = 0; dx < canvas.width; dx += dotSpacing) {
      for (let dy = 0; dy < canvas.height; dy += dotSpacing) {
        ctx.beginPath();
        ctx.arc(dx, dy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 2. Interactive Globe component
function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const [earthTexture, setEarthTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const tex = createEarthTexture();
    if (tex) setEarthTexture(tex);
  }, []);

  useFrame((state, delta) => {
    if (globeRef.current) {
      // Slow rotation on y axis
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Glow Backing Shadow / Aura */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#ff6b00"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Atmospheric glow ring */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Earth Sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        {earthTexture ? (
          <meshStandardMaterial
            map={earthTexture}
            roughness={0.7}
            metalness={0.15}
            emissive="#ff6b00"
            emissiveIntensity={0.08}
          />
        ) : (
          <meshStandardMaterial color="#0A0A0A" wireframe />
        )}
      </mesh>
    </group>
  );
}

// 3. Orbiting Satellite Particles
function SatelliteParticles({ count = 60 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 0.5;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ff6b00"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

// 4. Character Reveal Animation
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
    setMounted(true);
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

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex items-center justify-center bg-[#0A0A0A] overflow-hidden pt-28 lg:pt-0"
    >
      <div className="absolute inset-0 z-0 bg-radial-at-c from-[#ff6b00]/3 to-transparent pointer-events-none" />

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

          <WordReveal
            text="Cloud Engineer & Full-Stack Developer"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] text-white"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/60 text-base sm:text-lg max-w-xl font-sans leading-relaxed"
          >
            Building scalable cloud solutions, modern web applications, and automation systems with production-grade resiliency.
          </motion.p>

          {/* Tech Stack Pills */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap gap-2.5 pt-2"
          >
            {techStack.map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 rounded-full border border-white/5 bg-white/3 text-[10px] font-mono text-white/80 uppercase tracking-widest hover:border-[#ff6b00] hover:text-[#ff6b00] transition-colors duration-300 shadow-sm"
              >
                {tech}
              </span>
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

        {/* Right Column: WebGL Rotating Globe */}
        <div className="lg:col-span-5 w-full aspect-square relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
            className="w-full h-full relative cursor-grab active:cursor-grabbing max-w-[450px]"
          >
            {mounted && (
              <Canvas camera={{ position: [0, 0, 4] }} gl={{ alpha: true }}>
                <ambientLight intensity={0.15} />
                <directionalLight position={[-4, 2, 4]} intensity={2.2} color="#ffffff" />
                <directionalLight position={[4, -2, -4]} intensity={0.4} color="#ff6b00" />
                <Globe />
                <SatelliteParticles count={70} />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  autoRotate 
                  autoRotateSpeed={0.8}
                  rotateSpeed={0.6}
                />
              </Canvas>
            )}
            
            {/* Ambient Background Radial Glow behind Globe */}
            <div className="absolute inset-0 -z-10 rounded-full bg-radial-gradient from-[#ff6b00]/8 to-transparent blur-[60px] pointer-events-none" />
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