"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "नमस्ते",
  "Mahesh",
];

export const Preloader = () => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    
    // Lock scroll
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            // Unlock scroll
            document.body.style.overflow = "";
          }, 1000);
          return 100;
        }
        // Random increments for a more "realistic" loading feel
        const increment = Math.floor(Math.random() * 5) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;
    const timeout = setTimeout(
      () => {
        setIndex(index + 1);
      },
      index === 0 ? 1000 : 150
    );
    return () => clearTimeout(timeout);
  }, [index]);

  const opacity = {
    initial: { opacity: 0 },
    enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
  };

  const slideUp = {
    initial: { top: 0 },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.2 },
    },
  };

  const pathVariants = {
    initial: {
      d: `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`,
    },
    exit: {
      d: `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as any, delay: 0.3 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        >
          {dimension.width > 0 && (
            <>
              <motion.div
                variants={opacity}
                initial="initial"
                animate="enter"
                className="absolute flex flex-col items-center gap-4 z-10"
              >
                <div className="flex items-center gap-3">
                  <motion.span 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="block w-3 h-3 bg-accent-blue rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  ></motion.span>
                  <p className="text-foreground text-5xl md:text-7xl font-outfit font-bold tracking-tight">
                    {words[index]}
                  </p>
                </div>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>
              </motion.div>
              
              <div className="absolute bottom-12 left-12 flex flex-col z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-foreground/10 text-9xl font-black tracking-tighter tabular-nums leading-none select-none">
                    {progress}
                  </span>
                  <span className="text-accent-blue/50 text-2xl font-bold font-mono">%</span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-12 h-[1px] bg-foreground/10"></div>
                  <span className="text-foreground/30 text-xs font-mono uppercase tracking-[0.4em]">
                    Initialising Core Architecture
                  </span>
                </div>
              </div>

              <div className="absolute top-12 right-12 z-10 flex flex-col items-end opacity-20">
                 <span className="text-foreground text-xs font-mono uppercase tracking-widest">Mahesh Portfolio</span>
                 <span className="text-foreground/50 text-xs font-mono">v3.4.0</span>
              </div>

              <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
                <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain"></div>
              </div>

              <svg className="absolute top-0 w-full h-[calc(100%+300px)] fill-current text-background">
                <motion.path
                  variants={pathVariants}
                  initial="initial"
                  exit="exit"
                ></motion.path>
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
