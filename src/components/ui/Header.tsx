"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX }} 
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue origin-left z-50"
      />

      <div className="max-w-7xl mx-auto px-6">
        <nav className={`relative z-10 flex items-center justify-between p-2 rounded-full border transition-all duration-500 ${
          isScrolled 
            ? "bg-neutral-900/40 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
            : "bg-transparent border-transparent"
        }`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group pl-4">
            <div className="w-10 h-10 rounded-xl bg-white text-black font-bold flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              MK
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-heading font-bold leading-none">Mahesh.</p>
              <p className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] mt-1 font-mono">Portfolio</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-5 py-2 text-sm font-medium text-neutral-400 hover:text-white rounded-full hover:bg-white/5 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="w-px h-6 bg-white/10 mx-4"></div>
            <a 
              href="#contact" 
              className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-3 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={`absolute top-full left-0 right-0 p-6 md:hidden pointer-events-none ${
          mobileMenuOpen ? "pointer-events-auto" : ""
        }`}
      >
        <div className="bg-neutral-900/90 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 shadow-2xl flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl font-heading font-bold text-neutral-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="w-full py-4 bg-white text-black font-bold rounded-2xl text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start a Project
          </a>
        </div>
      </motion.div>
    </header>
  );
}
