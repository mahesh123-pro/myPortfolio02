"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin } from "lucide-react";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text for title
      if (titleRef.current) {
        const titleSplit = new SplitType(titleRef.current, { types: "words,chars" });
        gsap.fromTo(titleSplit.chars, 
          { opacity: 0, y: 50, rotateX: -90 },
          {
            opacity: 1, 
            y: 0, 
            rotateX: 0, 
            stagger: 0.02,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      }

      // Fade up info blocks
      gsap.fromTo(".contact-info", 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      // Form entrance
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="py-32 relative overflow-hidden bg-background min-h-screen flex items-center">
      
      {/* Cinematic Background Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10 w-full">
        
        {/* Left Content */}
        <div className="space-y-16">
          <div className="space-y-4">
             <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-foreground/20"></div>
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-foreground/50 font-bold">08 — Connection</span>
            </div>
            <h2 ref={titleRef} className="text-5xl md:text-7xl font-black font-heading tracking-tighter uppercase leading-[0.9]">
              Start a <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Dialogue.</span>
            </h2>
          </div>
          
          <div className="space-y-10">
            <p className="text-xl text-foreground/60 font-light leading-relaxed max-w-lg font-mono">
              Ready to architect something remarkable? Let's discuss your technical challenges and build a resilient solution.
            </p>

            <div className="pt-8 space-y-8 border-t border-foreground/10">
              <a href="mailto:maheshbakki.pro@gmail.com" className="contact-info flex items-center gap-6 group cursor-crosshair">
                <div className="w-16 h-16 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:bg-accent-blue group-hover:border-accent-blue transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-foreground/40 uppercase tracking-[0.2em] mb-1">Direct Line</p>
                  <p className="text-xl font-bold text-foreground group-hover:text-accent-blue transition-colors tracking-tight">maheshbakki.pro@gmail.com</p>
                </div>
              </a>

              <div className="contact-info flex items-center gap-6 group cursor-default">
                <div className="w-16 h-16 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:bg-accent-purple group-hover:border-accent-purple transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-foreground/40 uppercase tracking-[0.2em] mb-1">Coordinates</p>
                  <p className="text-xl font-bold text-foreground group-hover:text-accent-purple transition-colors tracking-tight">Hyderabad, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Form */}
        <div ref={formRef} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
          
          <div className="p-10 md:p-16 rounded-[3rem] bg-background/80 border border-foreground/10 backdrop-blur-3xl relative z-10 overflow-hidden">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3 group/input">
                  <label className="text-[10px] font-mono font-bold text-foreground/50 uppercase tracking-[0.2em] ml-2 group-focus-within/input:text-accent-blue transition-colors">Identification</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-foreground/5 border-b-2 border-foreground/10 px-4 py-4 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent-blue transition-all font-mono text-sm focus:bg-foreground/5 rounded-t-xl"
                  />
                </div>
                <div className="space-y-3 group/input">
                  <label className="text-[10px] font-mono font-bold text-foreground/50 uppercase tracking-[0.2em] ml-2 group-focus-within/input:text-accent-blue transition-colors">Return Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-foreground/5 border-b-2 border-foreground/10 px-4 py-4 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent-blue transition-all font-mono text-sm focus:bg-foreground/5 rounded-t-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-3 group/input">
                <label className="text-[10px] font-mono font-bold text-foreground/50 uppercase tracking-[0.2em] ml-2 group-focus-within/input:text-accent-blue transition-colors">Transmission Payload</label>
                <textarea 
                  rows={5} 
                  placeholder="Initiate connection protocol..." 
                  className="w-full bg-foreground/5 border-b-2 border-foreground/10 px-4 py-4 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent-blue transition-all font-mono text-sm resize-none focus:bg-foreground/5 rounded-t-xl"
                />
              </div>

              <button type="button" className="w-full relative overflow-hidden group/btn bg-foreground text-background font-black uppercase tracking-[0.3em] text-xs py-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative z-10 block group-hover/btn:text-white transition-colors duration-500">Transmit Data</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}