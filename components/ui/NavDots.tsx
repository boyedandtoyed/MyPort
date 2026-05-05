"use client";

import { ArrowUp, Circle, Contact, Orbit, Sparkles, UserRound } from "lucide-react";
import type { SpaceSection } from "@/hooks/useScrollSection";

const items: Array<{ id: SpaceSection; label: string; short: string; Icon: typeof Orbit }> = [
  { id: "solar", label: "Solar System", short: "Solar", Icon: Orbit },
  { id: "about", label: "About", short: "About", Icon: UserRound },
  { id: "skills", label: "Skills", short: "Skills", Icon: Sparkles },
  { id: "contact", label: "Contact", short: "Contact", Icon: Contact },
  { id: "top", label: "Top", short: "Top", Icon: ArrowUp }
];

type NavDotsProps = {
  active: SpaceSection;
  onTravel: (section: SpaceSection) => void;
};

export function NavDots({ active, onTravel }: NavDotsProps) {
  const isActive = (id: SpaceSection) => active === id || (id === "solar" && active === "top");

  return (
    <>
      {/* Desktop sidebar */}
      <div className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {items.map(({ id, label, Icon }) => (
          <button
            key={id}
            className="group relative grid size-9 place-items-center rounded-full border border-white/15 bg-white/[0.035] text-white/70 backdrop-blur-xl transition hover:border-white/45 hover:text-white"
            onClick={() => onTravel(id)}
            aria-label={label}
            title={label}
            type="button"
          >
            {isActive(id) ? <Icon size={14} fill="currentColor" /> : <Circle size={10} />}
            <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-full border border-white/10 bg-[#0d0d1f]/95 px-3 py-1 text-xs text-white opacity-0 shadow-cyan backdrop-blur-xl transition group-hover:opacity-100">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-white/10 bg-[#03040b]/90 pb-4 pt-2 backdrop-blur-xl md:hidden"
        aria-label="Site navigation"
      >
        {items.map(({ id, short, Icon }) => (
          <button
            key={`m-${id}`}
            className={`flex min-w-[48px] flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] uppercase tracking-wider transition-colors active:scale-95 ${
              isActive(id) ? "text-white" : "text-white/45"
            }`}
            onClick={() => onTravel(id)}
            aria-label={short}
            type="button"
          >
            <Icon size={16} fill={isActive(id) ? "currentColor" : "none"} />
            <span className="leading-none">{short}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
