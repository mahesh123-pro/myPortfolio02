"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import gsap from "gsap";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const headerY = useTransform(scrollYProgress, [0, 0.05], [0, 0]); // Can add hide-on-scroll down logic here

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic button effect for "Let's Talk"
  const magneticRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    const btn = magneticRef.current;
    if(!btn) return;
    
    const hoverBtn = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power2.out"
      });
    };
    
    const leaveBtn = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener("mousemove", hoverBtn);
    btn.addEventListener("mouseleave", leaveBtn);
    
    return () => {
      btn.removeEventListener("mousemove", hoverBtn);
      btn.removeEventListener("mouseleave", leaveBtn);
    };
  }, []);

  return (
    <motion.header 
      style={{ y: headerY }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center py-6 px-4`}
    >
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 origin-left z-50 mix-blend-difference"
      />

      <div 
        ref={navRef}
        className={`w-full max-w-5xl flex items-center justify-between p-2 rounded-full border transition-all duration-700 ease-out ${
          isScrolled 
            ? "bg-background/40 backdrop-blur-xl border-foreground/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]" 
            : "bg-transparent border-transparent"
        }`}
      >
        <a href="#" className="flex items-center gap-3 group pl-4 relative">
          <div className="w-10 h-10 rounded-full bg-foreground overflow-hidden flex items-center justify-center transition-transform duration-500">
             <img src="/portfolio1assests/MK.png" alt="MK Logo" className="w-8 h-8 object-contain brightness-0 invert dark:brightness-100 dark:invert-0 transform group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="hidden sm:flex flex-col relative overflow-hidden h-8 justify-center">
            <span className="text-foreground font-heading font-black text-lg leading-none transform group-hover:-translate-y-full transition-transform duration-300">Mahesh.</span>
            <span className="text-foreground font-heading font-black text-lg leading-none absolute top-full group-hover:top-1/2 group-hover:-translate-y-1/2 transition-all duration-300">Portfolio</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-foreground/5 rounded-full px-2 py-1 border border-foreground/5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-6 py-2 text-xs font-mono font-bold tracking-widest uppercase text-foreground/60 hover:text-foreground hover:bg-foreground/10 rounded-full transition-all duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 pr-2">
          <ThemeToggle />
          <a 
            ref={magneticRef}
            href="#contact" 
            className="flex items-center gap-2 px-6 py-3 bg-foreground text-background text-xs font-mono font-bold tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl group"
          >
            Connect
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2 pr-2">
          <ThemeToggle />
          <button 
            className="p-3 text-foreground rounded-full bg-foreground/5 border border-foreground/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, clipPath: "circle(150% at right top)" } : { opacity: 0, clipPath: "circle(0% at right top)" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed inset-0 bg-background/95 backdrop-blur-3xl z-40 md:hidden flex flex-col justify-center items-center pointer-events-none ${
          mobileMenuOpen ? "pointer-events-auto" : ""
        }`}
      >
        <div className="flex flex-col gap-8 w-full max-w-sm px-6">
          {navLinks.map((link, i) => (
            <motion.a
               initial={{ y: 50, opacity: 0 }}
               animate={mobileMenuOpen ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
               transition={{ delay: 0.1 * i, duration: 0.5, ease: "easeOut" }}
              key={link.name}
              href={link.href}
              className="text-5xl font-heading font-black text-foreground hover:text-accent-blue transition-colors flex items-center justify-between group"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
              <ArrowUpRight className="w-10 h-10 opacity-0 group-hover:opacity-100 transform -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-accent-blue" />
            </motion.a>
          ))}
          <motion.div 
            initial={{ opacity: 0 }} animate={mobileMenuOpen ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.4 }}
            className="w-full h-px bg-foreground/10 my-4" 
          />
          <motion.a 
            initial={{ y: 20, opacity: 0 }}
            animate={mobileMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: 0.5 }}
            href="#contact"
            className="w-full py-6 bg-foreground text-background font-mono font-bold tracking-widest uppercase text-sm rounded-full text-center flex items-center justify-center gap-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start a Project
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </div>
      </motion.div>
    </motion.header>
  );
}