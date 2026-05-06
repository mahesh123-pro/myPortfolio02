"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { BlurReveal, FadeUp } from "../effects/EnterAnimations";
import { GradientText } from "../effects/TextEffects";
import { ShockwaveButton } from "../effects/ButtonEffects";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-background">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-2/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-1/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        
        {/* Left Content */}
        <div className="space-y-12">
          <SectionHeading 
            number="06 /"
            badge="Inquiries"
            title="Start a"
            gradientPart="Conversation"
            centered={false}
          />
          
          <div className="space-y-8">
            <BlurReveal delay={0.2}>
              <h3 className="text-3xl md:text-4xl font-bold font-heading text-foreground leading-tight">
                Engineering <GradientText text="Excellence" /> starts with a single message.
              </h3>
            </BlurReveal>
            
            <BlurReveal delay={0.4}>
              <p className="text-lg text-foreground/60 font-light leading-relaxed max-w-lg">
                Whether you're looking to architect a scalable cloud solution, develop a high-performance application, or discuss technical strategy—I'm ready to bring your vision to life.
              </p>
            </BlurReveal>

            <div className="pt-8 space-y-6">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-accent-blue group-hover:scale-110 group-hover:bg-accent-blue group-hover:text-background transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-1">Direct Email</p>
                  <p className="text-xl font-bold text-foreground group-hover:text-accent-blue transition-colors">maheshbakki.pro@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-accent-purple group-hover:scale-110 group-hover:bg-accent-purple group-hover:text-background transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-1">Primary Location</p>
                  <p className="text-xl font-bold text-foreground group-hover:text-accent-purple transition-colors">Hyderabad, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Form */}
        <FadeUp delay={0.6}>
          <div className="p-10 md:p-16 rounded-[3rem] bg-foreground/5 border border-foreground/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <form className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent-blue/50 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent-blue/50 transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Inquiry Details</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell me about your project or technical challenge..." 
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-3xl px-6 py-5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"
                />
              </div>

              <ShockwaveButton className="w-full bg-foreground text-background font-black uppercase tracking-[0.3em] text-xs py-6 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl">
                Transmit Message
              </ShockwaveButton>
            </form>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
