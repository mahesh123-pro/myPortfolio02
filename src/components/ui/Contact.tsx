"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="contact" className="py-32 px-6 flex items-center justify-center min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent-purple/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-900/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-2xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Let's <span className="italic text-gradient">Connect</span></h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Ready to elevate your digital presence or need a cloud architecture consultation? My inbox is always open.
            </p>
          </div>

          <form className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-sm text-neutral-400 group-focus-within:text-accent-blue transition-colors ml-2 font-mono uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-blue/50 focus:bg-white/5 transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-sm text-neutral-400 group-focus-within:text-accent-blue transition-colors ml-2 font-mono uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-blue/50 focus:bg-white/5 transition-all focus:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-sm text-neutral-400 group-focus-within:text-accent-purple transition-colors ml-2 font-mono uppercase tracking-widest">Message</label>
              <textarea 
                rows={4}
                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-purple/50 focus:bg-white/5 transition-all focus:shadow-[0_0_15px_rgba(139,92,246,0.1)] resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <motion.button 
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 mt-8 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-purple opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <span className="relative z-10">Send Message</span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0, y: isHovered ? -5 : 0 }}
                className="relative z-10"
              >
                <Send size={18} />
              </motion.div>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
