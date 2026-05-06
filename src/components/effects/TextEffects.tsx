"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 7. Gradient Text
export const GradientText = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x ${className}`}>
      {text}
    </span>
  );
};

// 8. Typewriter
export const Typewriter = ({ text, delay = 0, speed = 0.05, className = "" }: { text: string, delay?: number, speed?: number, className?: string }) => {
  const characters = text.split("");
  
  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: delay + index * speed }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// 10. Letter Wave
export const LetterWave = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const characters = text.split("");
  
  return (
    <span className={`flex ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            repeatDelay: 2,
            delay: delay + index * 0.1 
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};
