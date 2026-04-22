"use client";

import { motion } from "framer-motion";
import { ArrowRight, MousePointerClick } from "lucide-react";
import { sunProfile } from "@/data/projects";

export function HeroOverlay() {
  return (
    <motion.section
      className="pointer-events-none fixed bottom-6 left-5 z-20 max-w-[680px] md:bottom-10 md:left-10"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35 }}
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-white/65 backdrop-blur-xl">
        <MousePointerClick size={14} />
        Click a planet to explore
      </div>
      <h1 className="font-heading text-[clamp(3rem,8vw,7.8rem)] font-bold uppercase leading-[0.82] text-white">
        {sunProfile.name}
      </h1>
      <div className="mt-5 max-w-xl space-y-2 text-white/75">
        <p className="text-base md:text-xl">{sunProfile.school}</p>
        <p className="font-heading text-xl italic text-[#FDB813] md:text-2xl">{sunProfile.tagline}</p>
      </div>
      <div className="mt-6 flex items-center gap-3 font-heading text-sm uppercase tracking-[0.24em] text-white/55">
        Scroll through project orbits
        <motion.span animate={{ x: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowRight size={18} />
        </motion.span>
      </div>
    </motion.section>
  );
}
