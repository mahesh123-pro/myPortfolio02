"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
// @ts-expect-error maath types missing
import * as random from "maath/random/dist/maath-random.esm";

// 22. Floating Particles
// This uses React Three Fiber. Make sure it's wrapped in a <Canvas> in the parent component
// Or we can provide a simple Canvas wrapper here
import { Canvas } from "@react-three/fiber";

const ParticlesCore = ({ count = 500, color = "#ff6b00" }) => {
  const ref = useRef<THREE.Points>(null);
  
  // Create sphere positions
  const sphere = random.inSphere(new Float32Array(count * 3), { radius: 1.5 });
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const FloatingParticles = ({ className = "", count = 2000, color = "#8b5cf6" }: { className?: string, count?: number, color?: string }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticlesCore count={count} color={color} />
      </Canvas>
    </div>
  );
};
