"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from "framer-motion";

// 1. Magnetic Lift
export const MagneticLift = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

// 2. Glow Border
export const GlowBorder = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`group relative w-fit rounded-xl ${className}`}>
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur transition duration-500 group-hover:opacity-100 animate-tilt"></div>
      <div className="relative bg-zinc-950 rounded-xl h-full w-full overflow-hidden">{children}</div>
    </div>
  );
};

// 3. 3D Tilt
export const Tilt3D = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-fit ${className}`}
    >
      {children}
    </motion.div>
  );
};

// 4. Color Reveal
export const ColorReveal = ({ children, color = "bg-blue-500", className = "" }: { children: React.ReactNode, color?: string, className?: string }) => {
  return (
    <div className={`relative overflow-hidden group w-fit ${className}`}>
      <div className={`absolute inset-0 ${color} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0`}></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// 6. Blob Expand
export const BlobExpand = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative overflow-hidden group w-fit rounded-full ${className}`}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-purple-500/30 rounded-full group-hover:w-[300%] group-hover:h-[300%] transition-all duration-700 ease-out z-0"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
