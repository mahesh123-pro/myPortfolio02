"use client";

import { motion } from "framer-motion";
import { GlowBorder, Tilt3D } from "../effects/HoverEffects";
import { GradientText, Typewriter } from "../effects/TextEffects";
import { FadeUp, BlurReveal } from "../effects/EnterAnimations";
import { Quote } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "CTO at TechNova",
    content: "Mahesh is an exceptional engineer. He completely transformed our AWS infrastructure, cutting costs by 40% while improving performance and reliability.",
    image: "/portfolio1assests/profile1.jpg" // We'll use placeholders or gradients if not available
  },
  {
    name: "Sarah Williams",
    role: "Product Manager at GKLT",
    content: "Working with Mahesh on the Manakrishi app has been incredible. His ability to bridge complex backend logic with smooth frontend experiences is rare.",
    image: "/portfolio1assests/profile2.jpg"
  },
  {
    name: "David Chen",
    role: "Founder of Prolance",
    content: "We needed a scalable platform built fast. Mahesh delivered beyond expectations, providing not just code, but solid architectural guidance.",
    image: "/portfolio1assests/profile3.jpg"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 flex flex-col items-center justify-center relative">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full space-y-20 relative z-10">
        <SectionHeading 
          number="06 /"
          badge="Social Proof"
          title="Words of"
          gradientPart="Appreciation"
          description="Direct feedback from clients and partners I've collaborated with on flagship projects."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Tilt3D key={i} className="w-full h-full">
              <div className="bg-neutral-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-between relative overflow-hidden group">
                <Quote className="absolute top-6 right-6 text-white/5 w-24 h-24 rotate-12 group-hover:scale-110 group-hover:text-pink-500/10 transition-all duration-500" />
                
                <div className="space-y-6 relative z-10">
                  <div className="flex text-pink-500 mb-4">
                     {[...Array(5)].map((_, idx) => (
                        <svg key={idx} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                     ))}
                  </div>
                  <p className="text-neutral-300 font-light text-lg leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl overflow-hidden border-2 border-white/10">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-pink-400 transition-colors">{testimonial.name}</h4>
                    <p className="text-xs text-muted uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  );
}
