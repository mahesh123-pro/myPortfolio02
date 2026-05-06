"use client";

import Link from "next/link";
import { MapPin, ArrowUpRight, Mail, Globe, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

// High-fidelity social icons
const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background pt-40 pb-16 px-6 overflow-hidden border-t border-foreground/5">
      
      {/* Premium Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section with Large CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 pb-32">
          <div className="max-w-2xl space-y-12">
            <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter leading-tight">
              Ready to architect <br /> 
              <span className="text-foreground/40 italic">the future?</span>
            </h2>
            
            <div className="flex flex-wrap gap-6">
              <Link href="mailto:bakki.mahesh5263@gmail.com" className="group flex items-center gap-4 text-2xl font-bold hover:text-accent-blue transition-colors">
                <div className="w-16 h-16 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent-blue/10 transition-all">
                  <Mail className="w-8 h-8" />
                </div>
                <span>Say Hello</span>
              </Link>
              <div className="h-16 w-px bg-foreground/10 hidden md:block" />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40 mb-1">Based in</span>
                <span className="text-lg font-bold flex items-center gap-2 italic">
                  <Globe className="w-4 h-4 text-accent-blue" />
                  Hyderabad, India
                </span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 w-full space-y-8">
            <div className="p-10 rounded-[3rem] bg-foreground/5 border border-foreground/10 backdrop-blur-xl space-y-8">
               <div className="space-y-2">
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-blue">The Vision</span>
                 <p className="text-xl text-foreground/70 font-light leading-relaxed">
                   I engineer resilient, high-performance systems that bridge the gap between human intuition and technical precision.
                 </p>
               </div>
               <div className="flex items-center gap-4 pt-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">Available for 2026 Projects</span>
               </div>
            </div>
          </div>
        </div>

        {/* Navigation & Branding */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 py-20 border-t border-foreground/5">
          
          <div className="space-y-8">
             <Link href="/" className="inline-block">
               <span className="text-3xl font-black text-foreground tracking-tighter">MB<span className="text-accent-blue">.</span></span>
             </Link>
             <p className="text-sm text-foreground/40 leading-relaxed font-medium">
               Technical Lead & Cloud Architect specializing in the design and deployment of large-scale digital ecosystems.
             </p>
             <div className="flex gap-4">
                {[
                  { icon: <GithubIcon />, url: "https://github.com/maheshbakki" },
                  { icon: <LinkedinIcon />, url: "https://linkedin.com/in/mahesh-bakki" },
                  { icon: <TwitterIcon />, url: "https://twitter.com/maheshbakki" }
                ].map((social, i) => (
                  <Magnetic key={i}>
                    <a 
                      href={social.url} 
                      target="_blank" 
                      className="w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 hover:text-accent-blue transition-all"
                    >
                      {social.icon}
                    </a>
                  </Magnetic>
                ))}
             </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30">Navigation</h4>
            <ul className="space-y-4">
              {['About', 'Projects', 'Services', 'Experience'].map(link => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase()}`} className="text-sm font-bold hover:text-accent-blue transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 h-px bg-accent-blue transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30">Case Studies</h4>
            <ul className="space-y-4">
              {['Manakrishi', 'Prolance', 'VisaEnsure', '3D Portfolio'].map(link => (
                <li key={link}>
                  <Link href="/projects" className="text-sm font-bold hover:text-accent-purple transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 h-px bg-accent-purple transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8 flex flex-col items-start lg:items-end">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30">Quick Actions</h4>
            <div className="flex flex-col gap-4 w-full">
              <button 
                onClick={scrollToTop}
                className="w-full py-4 px-8 rounded-2xl bg-foreground text-background font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Back to Top <ArrowUp size={16} />
              </button>
              <div className="p-6 rounded-2xl border border-foreground/5 bg-foreground/[0.02] text-center">
                 <span className="text-[10px] font-mono text-foreground/40 font-bold uppercase tracking-widest">System Status: v2.6.01 / Online</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legals */}
        <div className="pt-12 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30">
            &copy; {currentYear} Mahesh Bakki. Crafted with precision & intent.
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30 hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30 hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
