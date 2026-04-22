"use client";

import { Pause, Play, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { PlanetProject } from "@/data/projects";

type ProjectSearchProps = {
  projects: PlanetProject[];
  isPaused: boolean;
  onTogglePause: () => void;
  onSelect: (project: PlanetProject) => void;
};

export function ProjectSearch({ projects, isPaused, onTogglePause, onSelect }: ProjectSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects;

    return projects.filter((project) => {
      const haystack = [
        project.name,
        project.planet,
        project.subtitle,
        project.status,
        ...project.tags
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [projects, query]);

  return (
    <div className="fixed left-1/2 top-4 z-40 w-[min(560px,calc(100vw-1.5rem))] -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-lg border border-white/12 bg-[#080a18]/88 p-2 shadow-2xl backdrop-blur-2xl">
        <div className="grid size-9 flex-none place-items-center text-white/55">
          <Search size={18} />
        </div>
        <input
          className="h-10 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/36"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search projects or planets"
        />
        <button
          className="grid size-10 flex-none place-items-center rounded-md border border-white/10 bg-white/[0.045] text-white/72 transition hover:border-white/30 hover:text-white"
          onClick={onTogglePause}
          aria-label={isPaused ? "Start orbits" : "Pause orbits"}
          title={isPaused ? "Start orbits" : "Pause orbits"}
          type="button"
        >
          {isPaused ? <Play size={18} /> : <Pause size={18} />}
        </button>
      </div>

      {open ? (
        <div className="mt-2 max-h-80 overflow-y-auto rounded-lg border border-white/10 bg-[#080a18]/94 p-2 shadow-2xl backdrop-blur-2xl">
          {results.length ? (
            results.map((project) => (
              <button
                key={project.id}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition hover:bg-white/[0.075]"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onSelect(project);
                  setQuery(project.name);
                  setOpen(false);
                }}
                type="button"
              >
                <span
                  className="grid size-9 flex-none place-items-center rounded-full border text-[0.68rem] font-semibold"
                  style={{ borderColor: `${project.color}88`, color: project.color }}
                >
                  {project.categoryIcon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-heading text-sm text-white">{project.name}</span>
                  <span className="block truncate text-xs text-white/48">
                    {project.planet} - {project.status}
                  </span>
                </span>
              </button>
            ))
          ) : (
            <div className="px-3 py-5 text-center text-sm text-white/48">No matching project found</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
