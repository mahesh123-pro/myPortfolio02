"use client";

import { motion } from "framer-motion";
import { BlurReveal, FadeUp } from "../effects/EnterAnimations";
import { GradientText } from "../effects/TextEffects";

interface SectionHeadingProps {
  number?: string;
  badge: string;
  title: string;
  gradientPart?: string;
  description?: string;
  centered?: boolean;
}

export const SectionHeading = ({
  number,
  badge,
  title,
  gradientPart,
  description,
  centered = true,
}: SectionHeadingProps) => {
  return (
    <div className={`space-y-6 ${centered ? "text-center mx-auto" : "text-left"} max-w-4xl`}>
      <BlurReveal>
        <div className={`flex items-center gap-4 ${centered ? "justify-center" : "justify-start"} mb-4`}>
          {number && (
            <span className="text-xs font-mono text-foreground/20 tracking-tighter">
              {number}
            </span>
          )}
          <motion.div
            className="px-4 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20"
          >
            <span className="text-xs font-bold text-accent-blue uppercase tracking-[0.3em]">
              {badge}
            </span>
          </motion.div>
        </div>
      </BlurReveal>

      <FadeUp delay={0.2}>
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-foreground leading-[1.1]">
          {title}{" "}
          {gradientPart && <GradientText text={gradientPart} />}
        </h2>
      </FadeUp>

      {description && (
        <FadeUp delay={0.3}>
          <p className={`text-foreground/60 font-light text-lg leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""}`}>
            {description}
          </p>
        </FadeUp>
      )}
    </div>
  );
};
