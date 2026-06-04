"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ThreeJS Particle Field for Layer 2
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const pos = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.01;
      ref.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ff6b00"
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
        />
      </Points>
    </group>
  );
}

export function BackgroundSystem() {
  const [mounted, setMounted] = useState(false);
  
  // Track mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse tracking with springs
  const springX = useSpring(mouseX, { stiffness: 40, damping: 15, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 15, mass: 0.5 });

  // Map spring mouse coordinates to offsets for parallax depths
  const layerMeshX = useTransform(springX, [-800, 800], [-15, 15]);
  const layerMeshY = useTransform(springY, [-800, 800], [-15, 15]);

  const layerParticlesX = useTransform(springX, [-800, 800], [-25, 25]);
  const layerParticlesY = useTransform(springY, [-800, 800], [-25, 25]);

  const layerGlowX = useTransform(springX, [-800, 800], [-45, 45]);
  const layerGlowY = useTransform(springY, [-800, 800], [-45, 45]);

  const layerGridX = useTransform(springX, [-800, 800], [-8, 8]);
  const layerGridY = useTransform(springY, [-800, 800], [-8, 8]);

  useEffect(() => {
    // Avoid synchronous state update in effect to satisfy strict linting
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
    });

    const handleMouseMove = (event: MouseEvent) => {
      // Get offset from center of window
      const x = event.clientX - window.innerWidth / 2;
      const y = event.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) {
    return <div className="fixed inset-0 -z-20 bg-[#0A0A0A]" />;
  }

  return (
    <div className="fixed inset-0 -z-20 bg-[#0A0A0A] overflow-hidden select-none pointer-events-none">
      
      {/* Layer 1: Gradient Mesh (deep base lighting) */}
      <motion.div 
        className="absolute inset-[-10%] opacity-40 mix-blend-screen"
        style={{
          x: layerMeshX,
          y: layerMeshY,
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(255, 107, 0, 0.06) 0%, transparent 40%),
            radial-gradient(circle at 75% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 35%)
          `
        }}
      />

      {/* Layer 3: Floating Orange Glow Blobs (ambient glows) */}
      <motion.div
        style={{ x: layerGlowX, y: layerGlowY }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[#ff6b00]/8 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#ff6b00]/5 rounded-full blur-[140px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </motion.div>

      {/* Layer 2: Canvas Particles Field */}
      <motion.div 
        style={{ x: layerParticlesX, y: layerParticlesY }}
        className="absolute inset-[-5%] z-0 opacity-80"
      >
        <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: true }}>
          <ambientLight intensity={0.4} />
          <ParticleField />
        </Canvas>
      </motion.div>

      {/* Layer 4: Subtle Grid Pattern */}
      <motion.div 
        className="absolute inset-[-5%] opacity-[0.015] dark:opacity-[0.03]"
        style={{
          x: layerGridX,
          y: layerGridY,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* Layer 5: Noise overlay (rendered via global css `.noise-overlay`) */}
      <div className="noise-overlay" />
      
    </div>
  );
}
