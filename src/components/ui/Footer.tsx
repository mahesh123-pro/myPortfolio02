"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink, Globe } from "lucide-react";

// Inline SVG Icons for Brands
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.4,80.21a105.73,105.73,0,0,0,32.17,16.15,77.7,77.7,0,0,0,6.89-11.11,68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c.45-23.66-4.12-47.58-19.34-72.14ZM42.45,65.69c-6.22,0-11.38-5.71-11.38-12.73S36.14,40.23,42.45,40.23s11.38,5.71,11.38,12.73S48.75,65.69,42.45,65.69Zm42.24,0c-6.22,0-11.38-5.71-11.38-12.73S78.38,40.23,84.69,40.23s11.38,5.71,11.38,12.73S91,65.69,84.69,65.69Z"/></svg>
);

const MediumIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="currentColor"><path d="M71.557 160.257l142.13 70.975v177.02l-142.13-71.025v-176.97zm160.038 88.948v175.765l140.403-70.165V249.205l-140.403 71.025zm160-88.948l-140.403 71.025 140.403 70.165v-141.19zM232.095 212.87l140.403-71.025-140.403-70.165L91.692 141.845l140.403 71.025z"/></svg>
);

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/mahesh123-pro",
    icon: <GithubIcon />,
    color: "hover:text-white"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/bakki-mahesh-b48686242/",
    icon: <LinkedinIcon />,
    color: "hover:text-blue-400"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/alpha_soul_11/",
    icon: <InstagramIcon />,
    color: "hover:text-pink-400"
  },
  {
    name: "Medium",
    url: "https://medium.com/@kolim5263",
    icon: <MediumIcon />,
    color: "hover:text-emerald-400"
  },
  {
    name: "Discord",
    url: "https://discord.gg/zknVjSuv",
    icon: <DiscordIcon />,
    color: "hover:text-indigo-400"
  }
];

export function Footer() {
  return (
    <footer className="w-full py-20 px-6 border-t border-white/5 bg-neutral-950/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-heading font-bold tracking-tight">Mahesh <span className="text-gradient">Portfolio</span></h2>
          <p className="text-neutral-400 max-w-md mx-auto font-sans font-light">
            Architecting scalable cloud solutions and crafting premium digital experiences with precision and passion.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-6">
          {socialLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.1 }}
              className={`p-3 rounded-2xl bg-white/5 border border-white/10 text-neutral-400 transition-all duration-300 ${link.color} hover:bg-white/10 hover:border-white/20 shadow-xl`}
              aria-label={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 pt-12 border-t border-white/5 w-full">
          <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-neutral-500 uppercase tracking-widest">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
          
          <p className="text-xs text-neutral-600 font-mono">
            © {new Date().getFullYear()} Mahesh. Built with <span className="text-white">Next.js</span> & <span className="text-white">Framer Motion</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
