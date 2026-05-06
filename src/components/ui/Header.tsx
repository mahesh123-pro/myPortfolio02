"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
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
            ? "bg-background/60 backdrop-blur-2xl border-foreground/10 shadow-lg" 
            : "bg-transparent border-transparent"
        }`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group pl-4">
            <div className="w-10 h-10 rounded-xl bg-foreground p-1.5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
              <img src="/portfolio1assests/MK.png" alt="MK Logo" className="w-full h-full object-contain brightness-0 invert dark:brightness-100 dark:invert-0" />
            </div>
            <div className="hidden sm:block">
              <p className="text-foreground font-heading font-bold leading-none">Mahesh.</p>
              <p className="text-foreground/60 text-xs uppercase tracking-[0.2em] mt-1 font-mono">Portfolio</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-5 py-2 text-sm font-medium text-foreground/60 hover:text-foreground rounded-full hover:bg-foreground/5 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="w-px h-6 bg-foreground/10 mx-4"></div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a 
                href="#contact" 
                className="px-6 py-2 bg-foreground text-background text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                Let's Talk
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button 
              className="p-3 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
        <div className="bg-background/95 backdrop-blur-3xl border border-foreground/10 rounded-[32px] p-8 shadow-2xl flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl font-heading font-bold text-foreground/60 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="w-full py-4 bg-foreground text-background font-bold rounded-2xl text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start a Project
          </a>
        </div>
      </motion.div>
    </header>
  );
}
