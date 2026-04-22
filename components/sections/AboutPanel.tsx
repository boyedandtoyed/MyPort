"use client";

import { motion } from "framer-motion";

export function AboutPanel() {
  return (
    <motion.section
      id="about"
      className="relative z-10 min-h-screen px-5 py-28 md:px-10"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.28 }}
      transition={{ duration: 0.65 }}
    >
      <div className="glass-panel max-w-xl p-7 md:p-9">
        <div className="mb-7 flex items-center gap-5">
          <div className="profile-orb">
            <span>BT</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#7DE8E8]">About the sun</p>
            <h2 className="font-heading text-3xl font-semibold text-white md:text-4xl">Binod Tiwari</h2>
            <p className="mt-1 text-white/60">Computer Science student and AI/ML portfolio builder</p>
          </div>
        </div>
        <p className="leading-8 text-white/78">
          I build AI systems and ship production-grade projects. Currently working on a 10-project AI/ML
          portfolio organized as 8 planets and 2 moons, spanning RAG engines, computer vision, NLP, DevOps agents,
          post-quantum security, and MLOps.
        </p>
        <div className="mt-7 grid grid-cols-3 gap-3 text-center">
          {[
            ["10", "AI/ML projects"],
            ["CS", "Student"],
            ["P40", "Local AI server"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <p className="font-heading text-2xl text-white">{value}</p>
              <p className="mt-1 text-xs text-white/52">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
