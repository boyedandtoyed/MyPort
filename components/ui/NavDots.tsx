"use client";

import { ArrowUp, Circle, Contact, Orbit, Sparkles, UserRound } from "lucide-react";
import type { SpaceSection } from "@/hooks/useScrollSection";

const items: Array<{ id: SpaceSection; label: string; Icon: typeof Orbit }> = [
  { id: "solar", label: "Solar System", Icon: Orbit },
  { id: "about", label: "About", Icon: UserRound },
  { id: "skills", label: "Skills", Icon: Sparkles },
  { id: "contact", label: "Contact", Icon: Contact },
  { id: "top", label: "Top", Icon: ArrowUp }
];

type NavDotsProps = {
  active: SpaceSection;
  onTravel: (section: SpaceSection) => void;
};

export function NavDots({ active, onTravel }: NavDotsProps) {
  return (
    <div className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {items.map(({ id, label, Icon }) => (
        <button
          key={id}
          className="group relative grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.035] text-white/70 backdrop-blur-xl transition hover:border-white/45 hover:text-white"
          onClick={() => onTravel(id)}
          aria-label={label}
          title={label}
        >
          {active === id || (id === "solar" && active === "top") ? (
            <Icon size={17} fill="currentColor" />
          ) : (
            <Circle size={15} />
          )}
          <span className="pointer-events-none absolute right-12 rounded-full border border-white/10 bg-[#0d0d1f]/95 px-3 py-1 text-xs text-white opacity-0 shadow-cyan backdrop-blur-xl transition group-hover:opacity-100">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
