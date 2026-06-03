"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, FileText, CheckCircle2, Loader2 } from "lucide-react";
import SplitType from "split-type";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Character-by-character title entry reveal
      if (titleRef.current) {
        const titleSplit = new SplitType(titleRef.current, { types: "words,chars" });
        gsap.fromTo(titleSplit.chars, 
          { opacity: 0, y: 30, rotateX: -45 },
          {
            opacity: 1, 
            y: 0, 
            rotateX: 0, 
            stagger: 0.02,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      }

      // Slide in info items
      gsap.fromTo(".contact-info-item", 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Slide in the form card container
      if (formCardRef.current) {
        gsap.fromTo(formCardRef.current,
          { opacity: 0, y: 60, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
            }
          }
        );
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setFormState("submitting");
    
    // Simulate API pipeline transmission
    setTimeout(() => {
      setFormState("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  const socials = [
    { name: "GitHub", url: "https://github.com/mahesh123-pro", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.26c3-.3 6-1.5 6-6.44a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.15-3.8s-1.18-.38-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.72-1.78-3.9-1.4-3.9-1.4a5.5 5.5 0 0 0-.15 3.8 5.5 5.5 0 0 0-1.5 3.8c0 4.9 3 6.1 6 6.44a4.8 4.8 0 0 0-1 3.26v4"></path></svg> },
    { name: "LinkedIn", url: "https://linkedin.com/in/", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
    { name: "Email", url: "mailto:maheshbakki.pro@gmail.com", icon: <Mail size={20} /> },
    { name: "Resume", url: "/resume.pdf", icon: <FileText size={20} /> }
  ];

  return (
    <section id="contact" ref={containerRef} className="py-28 relative overflow-hidden bg-[#0A0A0A] min-h-screen flex items-center border-t border-white/5">
      
      {/* Background decoration grid */}
      <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#ff6b00]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 w-full">
        
        {/* Left Side: Copy and details */}
        <div className="space-y-12 flex flex-col justify-center">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#ff6b00]" />
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#ff6b00] font-bold">07 — Get in touch</span>
            </div>
            <h2 ref={titleRef} className="text-4xl md:text-6xl font-black font-heading tracking-tight uppercase leading-[1.05] text-white">
              Let&apos;s Build <br/>
              Something <span className="text-gradient-orange">Amazing.</span>
            </h2>
          </div>
          
          <div className="space-y-8">
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-md font-light">
              Have a complex technical challenge or a project requiring serverless architectures, automation scripting, or custom full-stack solutions? Let&apos;s discuss the coordinates and build a solution.
            </p>

            <div className="space-y-6 pt-6 border-t border-white/5">
              <a href="mailto:maheshbakki.pro@gmail.com" className="contact-info-item flex items-center gap-5 group cursor-pointer max-w-max">
                <div className="w-12 h-12 rounded-xl bg-white/3 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-[#ff6b00] group-hover:text-black group-hover:border-[#ff6b00] transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest mb-0.5">Direct Email</p>
                  <p className="text-sm font-bold text-white group-hover:text-[#ff6b00] transition-colors font-mono">maheshbakki.pro@gmail.com</p>
                </div>
              </a>

              <div className="contact-info-item flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-white/3 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-[#ff6b00] group-hover:text-black group-hover:border-[#ff6b00] transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest mb-0.5">Office Coordinates</p>
                  <p className="text-sm font-bold text-white group-hover:text-[#ff6b00] transition-colors font-mono">Hyderabad, India</p>
                </div>
              </div>
            </div>

            {/* Social handles with Magnetic effect */}
            <div className="contact-info-item flex items-center gap-4 pt-6">
              {socials.map((social) => (
                <Magnetic key={social.name}>
                  <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-white/3 border border-white/10 hover:border-[#ff6b00]/30 hover:bg-white/5 flex items-center justify-center text-white/70 hover:text-[#ff6b00] transition-all duration-300 shadow-md group relative"
                    title={social.name}
                  >
                    <div className="absolute inset-0 rounded-full bg-[#ff6b00]/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    {social.icon}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Form card with Glassmorphism */}
        <div ref={formCardRef} className="relative flex items-center">
          <div className="absolute -inset-1 bg-[#ff6b00]/10 rounded-[2.5rem] blur-2xl opacity-30 pointer-events-none" />
          
          <div className="w-full p-8 md:p-12 rounded-[2.5rem] bg-white/3 border border-white/5 backdrop-blur-3xl relative z-10 overflow-hidden shadow-2xl">
            {formState === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#ff6b00]/10 border border-[#ff6b00]/30 flex items-center justify-center text-[#ff6b00]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-black text-white uppercase">
                    Data Transmitted!
                  </h3>
                  <p className="text-xs font-mono text-white/50 max-w-xs">
                    Your packet has been successfully sent. I will inspect the coordinates and respond shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormState("idle")}
                  className="px-6 py-2.5 bg-white text-black font-mono font-black uppercase text-[10px] tracking-widest rounded-full hover:bg-[#ff6b00] transition-colors"
                >
                  Reset Form
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleTransmit} className="space-y-6">
                <div className="relative group/input">
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                    className="peer w-full bg-white/3 border-b border-white/10 px-4 py-4 text-white placeholder:text-transparent focus:outline-none focus:border-[#ff6b00] transition-all font-mono text-xs rounded-t-xl"
                  />
                  <label 
                    htmlFor="name"
                    className="absolute left-4 top-4 text-[10px] font-mono text-white/40 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[8px] peer-focus:text-[#ff6b00] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#ff6b00] uppercase tracking-wider"
                  >
                    Identification / Full Name
                  </label>
                </div>

                <div className="relative group/input">
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    className="peer w-full bg-white/3 border-b border-white/10 px-4 py-4 text-white placeholder:text-transparent focus:outline-none focus:border-[#ff6b00] transition-all font-mono text-xs rounded-t-xl"
                  />
                  <label 
                    htmlFor="email"
                    className="absolute left-4 top-4 text-[10px] font-mono text-white/40 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[8px] peer-focus:text-[#ff6b00] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#ff6b00] uppercase tracking-wider"
                  >
                    Return Address / Email
                  </label>
                </div>
                
                <div className="relative group/input">
                  <textarea 
                    id="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4} 
                    placeholder=" "
                    className="peer w-full bg-white/3 border-b border-white/10 px-4 py-4 text-white placeholder:text-transparent focus:outline-none focus:border-[#ff6b00] transition-all font-mono text-xs resize-none rounded-t-xl"
                  />
                  <label 
                    htmlFor="message"
                    className="absolute left-4 top-4 text-[10px] font-mono text-white/40 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[8px] peer-focus:text-[#ff6b00] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-[#ff6b00] uppercase tracking-wider"
                  >
                    Message Payload
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={formState === "submitting"}
                  className="w-full relative overflow-hidden bg-white text-black hover:bg-[#ff6b00] font-mono font-black uppercase tracking-[0.2em] text-[10px] py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formState === "submitting" ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Transmitting Data
                    </>
                  ) : (
                    "Transmit Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}