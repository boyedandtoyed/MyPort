"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Lock, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { SelectedPlanet } from "@/hooks/usePlanetClick";

const statusStyle = {
  Live: "border-emerald-400/50 bg-emerald-400/12 text-emerald-300",
  Building: "border-amber-400/50 bg-amber-400/12 text-amber-300",
  Queued: "border-slate-400/40 bg-slate-400/10 text-slate-300"
};

const statusDot = {
  Live: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]",
  Building: "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)] animate-pulse",
  Queued: "bg-slate-400"
};

export function ProjectCard({ selected, onClose }: { selected: SelectedPlanet | null; onClose: () => void }) {
  const project = selected?.project;
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const cardInitial = isDesktop ? { opacity: 0, x: 100, y: "-50%" } : { opacity: 0, y: 40 };
  const cardAnimate = isDesktop ? { opacity: 1, x: 0, y: "-50%" } : { opacity: 1, y: 0 };
  const cardExit = isDesktop ? { opacity: 0, x: 100, y: "-50%" } : { opacity: 0, y: 40 };

  return (
    <AnimatePresence>
      {project ? (
        <motion.aside
          className="fixed z-40 flex flex-col border border-white/12 bg-[#0d0d1f]/95 shadow-2xl backdrop-blur-2xl
            bottom-0 left-0 right-0 max-h-[55vh] rounded-t-2xl
            md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:max-h-[calc(100vh-80px)] md:rounded-lg md:w-[clamp(260px,38vw,340px)]
            lg:w-[clamp(280px,30vw,400px)]"
          style={{ borderTopColor: project.color, borderTopWidth: 4 }}
          initial={cardInitial}
          animate={cardAnimate}
          exit={cardExit}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
        >
          <button
            className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-white/10 text-white/65 transition hover:border-white/35 hover:text-white"
            onClick={onClose}
            aria-label="Close project panel"
            title="Close"
          >
            <X size={15} />
          </button>

          <div
            className="overflow-y-auto p-4"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}
          >
            <div className="pr-8">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="grid size-9 flex-shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-lg">
                  {project.categoryIcon}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">{project.planet}</p>
                  <h2 className="font-heading text-sm font-bold text-white">{project.name}</h2>
                </div>
              </div>
              <p className="text-xs text-white/62">{project.subtitle}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusStyle[project.status]}`}>
                <span className={`size-1.5 rounded-full ${statusDot[project.status]}`} />
                {project.status}
              </span>
              {project.liveUrl ? (
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/55">
                  {project.liveUrl.replace("https://", "")}
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-white/78">{project.description}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border bg-white/[0.035] px-2 py-0.5 text-[10px] text-white/78"
                  style={{ borderColor: `${project.color}66` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.github ? (
                <a
                  className="button-primary"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{ padding: "0.375rem 0.75rem", minHeight: "unset", fontSize: "0.75rem" }}
                >
                  <Github size={14} />
                  GitHub
                </a>
              ) : (
                <span
                  className="button-muted"
                  style={{ padding: "0.375rem 0.75rem", minHeight: "unset", fontSize: "0.75rem" }}
                >
                  <Lock size={14} />
                  Repository soon
                </span>
              )}
              {project.status === "Live" && project.liveUrl ? (
                <a
                  className="button-muted"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ padding: "0.375rem 0.75rem", minHeight: "unset", fontSize: "0.75rem" }}
                >
                  <ExternalLink size={14} />
                  Open
                </a>
              ) : (
                <span
                  className="button-muted"
                  style={{ padding: "0.375rem 0.75rem", minHeight: "unset", fontSize: "0.75rem" }}
                >
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
