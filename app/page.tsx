"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { AboutPanel } from "@/components/sections/AboutPanel";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { HeroOverlay } from "@/components/sections/HeroOverlay";
import { SkillsPanel } from "@/components/sections/SkillsPanel";
import { SolarSystem } from "@/components/canvas/SolarSystem";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { NavDots } from "@/components/ui/NavDots";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectSearch } from "@/components/ui/ProjectSearch";
import { allProjects, projects, type PlanetProject } from "@/data/projects";
import { usePlanetClick } from "@/hooks/usePlanetClick";
import { useScrollSection } from "@/hooks/useScrollSection";

function MobileSolarSystem({ onProjectClick }: { onProjectClick: (project: PlanetProject, position: THREE.Vector3) => void }) {
  const mobileProjects = useMemo(() => projects.slice(0, 8), []);

  return (
    <div className="mobile-system md:hidden" aria-label="Mobile solar system project view">
      <div className="mobile-sun">
        <span>Binod</span>
      </div>
      {mobileProjects.map((project, index) => (
        <div
          className="mobile-orbit"
          key={project.id}
          style={{
            width: `${84 + index * 34}px`,
            height: `${84 + index * 34}px`,
            animationDuration: `${10 + index * 2.8}s`
          }}
        >
          <button
            className="mobile-planet"
            style={{
              background: `radial-gradient(circle at 35% 30%, #fff8, ${project.color} 35%, ${project.secondaryColor})`,
              width: `${12 + project.radius * 6}px`,
              height: `${12 + project.radius * 6}px`
            }}
            onClick={() => onProjectClick(project, new THREE.Vector3(0, 0, 0))}
            aria-label={project.name}
          />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { selected, selectPlanet, closePlanet } = usePlanetClick();
  const { activeSection, travelTo } = useScrollSection();
  const [ready, setReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const planetPositions = useRef(new Map<string, THREE.Vector3>());

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-[420vh] overflow-x-hidden bg-[#03040b] text-white">
      <LoadingScreen visible={!ready} />
      <SolarSystem
        selected={selected}
        onPlanetClick={selectPlanet}
        onReady={() => setReady(true)}
        isPaused={isPaused}
        planetPositions={planetPositions}
      />
      <MobileSolarSystem onProjectClick={selectPlanet} />
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(3,4,11,0.12)_44%,rgba(3,4,11,0.74)_100%)]" />
      <HeroOverlay />
      <ProjectSearch
        projects={allProjects}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((value) => !value)}
        onSelect={(project) => {
          const position = planetPositions.current.get(project.id)?.clone() ?? new THREE.Vector3(0, 0, 0);
          selectPlanet(project, position);
        }}
      />
      <NavDots active={activeSection} onTravel={travelTo} />
      <ProjectCard selected={selected} onClose={closePlanet} />

      <div className="pointer-events-none relative z-10 pt-[105vh]">
        <div className="pointer-events-auto">
          <AboutPanel />
          <SkillsPanel />
          <ContactPanel />
        </div>
      </div>
    </main>
  );
}
