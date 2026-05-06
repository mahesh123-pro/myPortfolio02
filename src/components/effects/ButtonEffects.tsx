"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 19. Material Ripple
export const MaterialRippleButton = ({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) => {
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick();
  };

  return (
    <button 
      onClick={handleClick}
      className={`relative overflow-hidden px-6 py-3 bg-zinc-800 text-white rounded-lg font-medium transition-colors hover:bg-zinc-700 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ top: ripple.y, left: ripple.x, width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 300, height: 300, opacity: 0, top: ripple.y - 150, left: ripple.x - 150 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-white/30 pointer-events-none"
          />
        ))}
      </AnimatePresence>
    </button>
  );
};

// 20. Slide Fill
export const SlideFillButton = ({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) => {
  return (
    <button 
      onClick={onClick}
      className={`group relative overflow-hidden px-6 py-3 border border-zinc-700 rounded-lg text-white font-medium ${className}`}
    >
      <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full"></div>
      <span className="relative z-10 mix-blend-difference">{children}</span>
    </button>
  );
};

// 21. Shockwave Pulse Ring
export const ShockwaveButton = ({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) => {
  return (
    <button 
      onClick={onClick}
      className={`relative px-6 py-3 bg-blue-600 text-white rounded-lg font-medium group ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-lg border-2 border-blue-500 opacity-0 group-hover:animate-shockwave pointer-events-none"></div>
    </button>
  );
};
