"use client";

import { motion } from "framer-motion";

const skills = {
  Languages: ["Python", "TypeScript", "Java", "Kotlin"],
  "AI/ML": ["PyTorch", "LangChain", "LangGraph", "RAG", "Fine-tuning"],
  Backend: ["FastAPI", "Node.js", "PostgreSQL", "SQLite", "Docker"],
  Mobile: ["Android", "Jetpack Compose", "Kotlin"],
  Tools: ["Git", "Linux", "VS Code", "Claude Code"]
};

export function SkillsPanel() {
  return (
    <motion.section
      id="skills"
      className="relative z-10 flex min-h-screen justify-end px-5 py-28 md:px-10"
      initial={{ opacity: 0, x: 42 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.28 }}
      transition={{ duration: 0.65 }}
    >
      <div className="glass-panel w-full max-w-2xl p-7 md:p-9">
        <p className="text-xs uppercase tracking-[0.28em] text-[#FDB813]">Skills constellation</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold text-white md:text-4xl">What powers the orbit</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <h3 className="font-heading text-lg text-white">{category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
