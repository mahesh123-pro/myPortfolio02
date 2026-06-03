"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import gsap from "gsap";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Experience", href: "#experience" },
  { name: "GitHub", href: "#github" },
  { name: "Contact", href: "#contact" }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Scroll detection for compact navbar state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for tracking current active section
  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "certifications", "experience", "github", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // focus on the middle/upper viewport
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Magnetic connect button effect
  const magneticRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const btn = magneticRef.current;
    if (!btn) return;
    
    const hoverBtn = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const leaveBtn = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[99] flex justify-center py-5 px-4 transition-all duration-300`}
    >
      <div 
        ref={navRef}
        className={`w-full max-w-5xl flex items-center justify-between p-2 rounded-full border transition-all duration-500 ease-out ${
          isScrolled 
            ? "bg-[#0A0A0A]/70 backdrop-blur-md border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
            : "bg-[#0A0A0A]/30 backdrop-blur-sm border-white/5 shadow-none"
        }`}
      >
        {/* Branding Logo */}
        <a href="#" className="flex items-center gap-3 group pl-4">
          <div className="w-9 h-9 rounded-full bg-[#ff6b00] flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
            <span className="text-black font-heading font-black text-sm">M.</span>
          </div>
          <div className="hidden sm:flex flex-col relative overflow-hidden h-8 justify-center">
            <span className="text-white font-heading font-black text-base leading-none transform group-hover:-translate-y-full transition-transform duration-300">Mahesh.</span>
            <span className="text-[#ff6b00] font-heading font-black text-base leading-none absolute top-full group-hover:top-1/2 group-hover:-translate-y-1/2 transition-all duration-300">Cloud & Full Stack</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5 relative">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase transition-colors duration-300 rounded-full ${
                activeSection === link.href.slice(1) 
                  ? "text-[#ff6b00]" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span className="relative z-10">{link.name}</span>
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="activeUnderline"
                  className="absolute inset-0 bg-white/5 rounded-full border-b border-[#ff6b00]"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Action Widgets */}
        <div className="hidden lg:flex items-center gap-3 pr-2">
          <ThemeToggle />
          <a 
            ref={magneticRef}
            href="#contact" 
            className="flex items-center gap-1.5 px-5 py-2.5 bg-white text-black hover:bg-[#ff6b00] hover:text-black text-[10px] font-mono font-black tracking-widest uppercase rounded-full transition-colors duration-300 group shadow-md"
          >
            Connect
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-3 pr-2">
          <ThemeToggle />
          <button 
            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <motion.span 
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-5 h-0.5 bg-white rounded-full block" 
            />
            <motion.span 
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-0.5 bg-white rounded-full block" 
            />
            <motion.span 
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-5 h-0.5 bg-white rounded-full block" 
            />
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(30px at 90% 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(1500px at 90% 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(30px at 90% 40px)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black/98 backdrop-blur-2xl z-40 lg:hidden flex flex-col justify-center items-center pointer-events-auto"
          >
            <div className="flex flex-col gap-6 w-full max-w-sm px-6 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  key={link.name}
                  href={link.href}
                  className={`text-4xl font-heading font-black tracking-tight uppercase flex items-center justify-center gap-2 group ${
                    activeSection === link.href.slice(1) ? "text-[#ff6b00]" : "text-white hover:text-[#ff6b00]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-[#ff6b00]" />
                </motion.a>
              ))}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full h-px bg-white/10 my-4 origin-center" 
              />
              <motion.a 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                href="#contact"
                className="w-full py-4 bg-white text-black font-mono font-black tracking-widest uppercase text-xs rounded-full text-center flex items-center justify-center gap-2 hover:bg-[#ff6b00] hover:text-black transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let&apos;s talk
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}