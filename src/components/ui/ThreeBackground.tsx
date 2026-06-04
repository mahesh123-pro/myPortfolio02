"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";

function ParticleField() {
  const { theme } = useTheme();
  const ref = useRef<THREE.Points>(null);
  
  // Generate particles
  const [positions] = useState(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={theme === "dark" ? "#3b82f6" : "#2563eb"}
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={theme === "dark" ? 0.4 : 0.2}
        />
      </Points>
    </group>
  );
}

export function ThreeBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (!mounted) return <div className="fixed inset-0 -z-10 bg-background" />;

  return (
    <div className="fixed inset-0 -z-10 bg-background transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5 pointer-events-none" />
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: true }}>
        <ambientLight intensity={theme === "dark" ? 0.5 : 0.8} />
        <pointLight position={[10, 10, 10]} />
        <ParticleField />
      </Canvas>
      {/* Overlay vignette */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
        theme === "dark" 
          ? "shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] opacity-100" 
          : "shadow-[inset_0_0_150px_rgba(0,0,0,0.05)] opacity-50"
      }`} />
    </div>
  );
}
