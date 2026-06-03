"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, FileText, ArrowUp } from "lucide-react";
import Magnetic from "./Magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socialLinks = [
  { name: "GitHub", url: "https://github.com/mahesh123-pro", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.26c3-.3 6-1.5 6-6.44a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.15-3.8s-1.18-.38-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.72-1.78-3.9-1.4-3.9-1.4a5.5 5.5 0 0 0-.15 3.8 5.5 5.5 0 0 0-1.5 3.8c0 4.9 3 6.1 6 6.44a4.8 4.8 0 0 0-1 3.26v4"></path></svg> },
  { name: "LinkedIn", url: "https://linkedin.com/in/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
  { name: "Email", url: "mailto:maheshbakki.pro@gmail.com", icon: <Mail size={18} /> },
  { name: "Resume", url: "/resume.pdf", icon: <FileText size={18} /> },
];

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animations
      gsap.fromTo(".footer-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={containerRef} className="relative bg-[#0A0A0A] pt-24 pb-12 border-t border-white/5 overflow-hidden">
      
      {/* Background shadow glow */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-[#ff6b00]/1 blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand/Summary column */}
          <div className="footer-item space-y-6 lg:col-span-2">
            <h3 className="text-2xl font-black font-heading tracking-tighter uppercase text-white">
              Mahesh.<span className="text-[#ff6b00]">Cloud</span>
            </h3>
            <p className="text-white/50 font-mono text-xs max-w-sm leading-relaxed">
              Cloud Engineer & Full-Stack Developer creating scalable microservices architectures and high-fidelity user experiences. Translating complex system requirements into clean, automated deployments.
            </p>
            <div className="text-[10px] font-mono text-white/35 flex flex-col gap-1">
              <span>Coordinates: Hyderabad, India</span>
              <span>Availability: Open for consultation</span>
            </div>
          </div>

          {/* Social connection handles */}
          <div className="footer-item space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-[0.2em] uppercase text-white/40">Connect</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group flex items-center gap-3 text-white/60 hover:text-[#ff6b00] transition-colors font-mono text-xs max-w-max"
                  >
                    <span className="p-2 rounded-lg bg-white/3 border border-white/5 group-hover:bg-[#ff6b00]/10 group-hover:border-[#ff6b00]/30 transition-colors">
                      {link.icon}
                    </span>
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 -translate-y-1 -translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-350" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Site map links */}
          <div className="footer-item space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-[0.2em] uppercase text-white/40">Sitemap</h4>
            <ul className="space-y-2.5 font-mono text-[11px] uppercase tracking-wider">
              {['About', 'Skills', 'Projects', 'Certifications', 'Experience', 'GitHub', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-white/60 hover:text-[#ff6b00] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer bottom details */}
        <div className="footer-item w-full border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest text-center sm:text-left">
            © {new Date().getFullYear()} Mahesh. All systems operational.
          </p>
          
          <Magnetic>
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#ff6b00]/30 bg-white/3 hover:bg-white/5 flex items-center justify-center text-white/50 hover:text-[#ff6b00] transition-all shadow-md group"
              title="Return to top"
              aria-label="Back to top"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}