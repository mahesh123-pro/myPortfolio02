"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ value, suffix = "", duration = 1.8 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function Statistics() {
  const metrics = [
    { value: 10, suffix: "+", label: "Production Projects", desc: "Designed, built and shipped" },
    { value: 3, suffix: "+", label: "Cloud Certifications", desc: "AWS and Azure credentials" },
    { value: 500, suffix: "+", label: "Learning Hours", desc: "Deep architectural research" },
    { value: 100, suffix: "+", label: "GitHub Contributions", desc: "In the last year alone" }
  ];

  return (
    <section className="w-full py-16 bg-[#0A0A0A]/90 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-[#ff6b00]/2 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-[2rem] bg-white/3 border border-white/5 hover:border-[#ff6b00]/25 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between text-center lg:text-left"
            >
              {/* Glow spots */}
              <div className="absolute inset-0 bg-radial-gradient from-[#ff6b00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />

              <div className="space-y-1 relative z-10">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white group-hover:text-[#ff6b00] transition-colors duration-300">
                  <Counter value={item.value} suffix={item.suffix} />
                </span>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/80 pt-2">
                  {item.label}
                </h3>
              </div>
              <p className="text-[10px] font-mono text-white/40 pt-4 leading-relaxed relative z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
