"use client";

import { motion } from "framer-motion";
import { Award, ShieldAlert, CloudLightning, CheckCircle2 } from "lucide-react";

const certifications = [
  {
    title: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services (AWS)",
    date: "2025",
    badge: "/portfolio1assests/aws_cert_img.png",
    skills: ["VPC Design", "EC2 & Auto-Scaling", "IAM & S3 security", "RDS & DynamoDB", "CloudFront CDN"],
    color: "#ff6b00",
    status: "Active"
  },
  {
    title: "Microsoft Certified: Azure Administrator Associate",
    issuer: "Microsoft Azure",
    date: "2025",
    badge: "/portfolio1assests/MK.png", // fallback placeholder/badge
    skills: ["Azure Active Directory", "Virtual Networks", "App Services", "Azure Key Vault", "ARM Templates"],
    color: "#ff6b00",
    status: "Active"
  },
  {
    title: "Cloud Learning & DevOps Foundations",
    issuer: "Linux & Terraform Specialization",
    date: "2024",
    badge: "/portfolio1assests/timeline-2024-linux-cloud.jpg",
    skills: ["Linux Mastery", "Terraform IaC Automation", "Docker Containers", "CI/CD Pipeline Design"],
    color: "#ff6b00",
    status: "Completed"
  }
];

export function Certifications() {
  return (
    <section id="certifications" className="py-28 w-full bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-radial-gradient from-[#ff6b00]/2 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#ff6b00]" />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#ff6b00] font-bold">04 — Credentials</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase text-white leading-none">
            Certifications & <span className="text-gradient-orange">Journey.</span>
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light max-w-xl font-mono mt-2">
            Verified industry credentials demonstrating core competencies in public cloud architecture and systems deployment.
          </p>
        </div>

        {/* Timeline representation */}
        <div className="relative border-l border-white/10 pl-6 md:pl-10 space-y-12 ml-4">
          
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#ff6b00] flex items-center justify-center z-20 shadow-[0_0_8px_#ff6b00]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] animate-ping" />
              </div>

              {/* Card Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 rounded-[2rem] bg-white/3 border border-white/5 hover:border-[#ff6b00]/30 hover:bg-white/5 transition-all duration-300 relative group overflow-hidden">
                
                {/* Backlighting glow */}
                <div className="absolute inset-0 bg-radial-gradient from-[#ff6b00]/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />

                {/* Left Side: Badge Logo */}
                <div className="lg:col-span-3 flex items-center justify-center lg:justify-start">
                  <div className="relative w-24 h-24 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden p-2 group-hover:border-[#ff6b00]/40 transition-colors duration-300">
                    <img 
                      src={cert.badge} 
                      alt={cert.title} 
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Right Side: Details */}
                <div className="lg:col-span-9 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest">
                        {cert.issuer}
                      </span>
                      <span className="h-3 w-px bg-white/10 hidden sm:inline" />
                      <span className="px-2 py-0.5 rounded bg-[#ff6b00]/10 border border-[#ff6b00]/20 text-[8px] font-mono font-black text-[#ff6b00] uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        {cert.status}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-heading font-black text-white group-hover:text-[#ff6b00] transition-colors duration-300 uppercase">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cert.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1.5 bg-[#0A0A0A] border border-white/5 rounded-lg text-[9px] font-mono text-white/60 uppercase tracking-wider"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-white/40 pt-4 border-t border-white/5">
                    <span>Issued Date: {cert.date}</span>
                    <span className="text-[#ff6b00] flex items-center gap-1 font-bold group-hover:underline">
                      <Award className="w-3.5 h-3.5" /> Credentials Verified
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
