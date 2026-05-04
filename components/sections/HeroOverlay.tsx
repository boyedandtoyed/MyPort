"use client";

import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { sunProfile } from "@/data/projects";

export function HeroOverlay() {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-6 top-6 z-20"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
      >
        <h1
          className="font-heading font-bold text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]"
          style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)" }}
        >
          {sunProfile.name}
        </h1>
        <p
          className="mt-1 font-heading italic text-white/45"
          style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.88rem)" }}
        >
          {sunProfile.tagline}
        </p>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed bottom-8 left-1/2 z-20 hidden -translate-x-1/2 md:flex"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-white/65 backdrop-blur-xl">
          <MousePointerClick size={14} />
          Click a planet to explore
        </div>
      </motion.div>
    </>
  );
}
