"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socialLinks = [
  { name: "GitHub", url: "https://github.com/mahesh123-pro", icon: <Github size={20} /> },
  { name: "LinkedIn", url: "https://linkedin.com/in/", icon: <Linkedin size={20} /> },
  { name: "Twitter", url: "https://twitter.com/", icon: <Twitter size={20} /> },
  { name: "Email", url: "mailto:maheshbakki.pro@gmail.com", icon: <Mail size={20} /> },
];

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-reveal",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
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
    <footer ref={containerRef} className="relative bg-background pt-32 pb-10 px-6 border-t border-foreground/10 overflow-hidden">
      
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
           style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(59,130,246,0.15) 0%, transparent 50%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Col */}
          <div className="footer-reveal space-y-6 lg:col-span-2">
            <h3 className="text-4xl font-black font-heading tracking-tighter uppercase">
              Mahesh.<span className="text-accent-blue">Pro</span>
            </h3>
            <p className="text-foreground/50 font-mono text-sm max-w-sm leading-relaxed">
              Engineering premium digital experiences. Bridging the gap between robust architecture and seamless user interface.
            </p>
          </div>

          {/* Social */}
          <div className="footer-reveal space-y-6">
            <h4 className="text-sm font-bold font-mono tracking-[0.2em] uppercase text-foreground/40">Connect</h4>
            <ul className="space-y-4">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-foreground/70 hover:text-accent-blue transition-colors font-mono text-sm max-w-max">
                    <span className="p-2 rounded-lg bg-foreground/5 border border-foreground/10 group-hover:bg-accent-blue/10 group-hover:border-accent-blue/30 transition-colors">
                      {link.icon}
                    </span>
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-2 -translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="footer-reveal space-y-6">
            <h4 className="text-sm font-bold font-mono tracking-[0.2em] uppercase text-foreground/40">Sitemap</h4>
            <ul className="space-y-4 font-mono text-sm">
              {['Services', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-foreground/70 hover:text-foreground transition-colors uppercase tracking-widest text-xs">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Big Text */}
        <div className="footer-reveal w-full border-t border-foreground/10 pt-16 flex flex-col items-center">
          <h2 className="text-[12vw] leading-none font-black font-heading tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/10 select-none text-center mix-blend-difference mb-10 w-full whitespace-nowrap overflow-hidden">
            Developer
          </h2>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-foreground/40 font-mono text-xs uppercase tracking-widest pt-8 border-t border-foreground/10">
            <p>Â© {new Date().getFullYear()} Mahesh. All systems nominal.</p>
            
            <button 
              onClick={scrollToTop}
              className="hover:text-accent-blue transition-colors flex items-center gap-2 group p-2 rounded-full border border-transparent hover:border-accent-blue/20 bg-foreground/5 opacity-50 hover:opacity-100"
            >
              Return to Top 
              <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}