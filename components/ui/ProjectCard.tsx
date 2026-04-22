"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Lock, X } from "lucide-react";
import type { SelectedPlanet } from "@/hooks/usePlanetClick";

const statusStyle = {
  Live: "border-emerald-300/40 bg-emerald-400/10 text-emerald-200",
  Building: "border-amber-300/40 bg-amber-400/10 text-amber-200",
  Queued: "border-slate-300/35 bg-slate-300/10 text-slate-200"
};

const statusIcon = {
  Live: "✓",
  Building: "↻",
  Queued: "⌛"
};

export function ProjectCard({ selected, onClose }: { selected: SelectedPlanet | null; onClose: () => void }) {
  const project = selected?.project;

  return (
    <AnimatePresence>
      {project ? (
        <motion.aside
          className="fixed inset-x-3 bottom-3 z-40 max-h-[82vh] overflow-y-auto rounded-lg border border-white/12 bg-[#0d0d1f]/95 p-6 shadow-2xl backdrop-blur-2xl md:inset-x-auto md:bottom-auto md:right-5 md:top-1/2 md:w-[420px] md:-translate-y-1/2"
          style={{ borderTopColor: project.color, borderTopWidth: 4 }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
        >
          <button
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/10 text-white/65 transition hover:border-white/35 hover:text-white"
            onClick={onClose}
            aria-label="Close project panel"
            title="Close"
          >
            <X size={18} />
          </button>

          <div className="pr-10">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 text-xl">
                {project.categoryIcon}
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">{project.planet}</p>
                <h2 className="font-heading text-2xl font-semibold text-white">{project.name}</h2>
              </div>
            </div>
            <p className="text-sm text-white/62">{project.subtitle}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs ${statusStyle[project.status]}`}>
              {statusIcon[project.status]} {project.status}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
              {project.liveUrl?.replace("https://", "")}
            </span>
          </div>

          <p className="mt-5 leading-7 text-white/78">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border bg-white/[0.035] px-3 py-1.5 text-xs text-white/78"
                style={{ borderColor: `${project.color}66` }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.github ? (
              <a className="button-primary" href={project.github} target="_blank" rel="noreferrer">
                <Github size={17} />
                GitHub
              </a>
            ) : (
              <span className="button-muted">
                <Lock size={17} />
                Repository soon
              </span>
            )}
            {project.status === "Live" && project.liveUrl ? (
              <a className="button-muted" href={project.liveUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={17} />
                Open
              </a>
            ) : (
              <span className="button-muted">Coming Soon</span>
            )}
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
