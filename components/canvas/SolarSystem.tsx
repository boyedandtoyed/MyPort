"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { projects, sunProject, type PlanetProject } from "@/data/projects";
import type { SelectedPlanet } from "@/hooks/usePlanetClick";
import { CameraController } from "./CameraController";
import { Nebula } from "./Nebula";
import { MilkyWay } from "./MilkyWay";
import { OortCloud } from "./OortCloud";
import { OrbitRing } from "./OrbitRing";
import { Planet } from "./Planet";
import { StarField } from "./StarField";
import { Sun } from "./Sun";

type SolarSystemProps = {
  selected: SelectedPlanet | null;
  onPlanetClick: (project: PlanetProject, position: THREE.Vector3) => void;
  onReady: () => void;
  isPaused: boolean;
  planetPositions: React.MutableRefObject<Map<string, THREE.Vector3>>;
};

export function SolarSystem({ selected, onPlanetClick, onReady, isPaused, planetPositions }: SolarSystemProps) {
  return (
    <div className="fixed inset-0 hidden md:block">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows={false}
        onCreated={() => {
          onReady();
        }}
      >
        <Suspense fallback={null}>
          <ambientLight color="#ffffff" intensity={1.2} />
          <MilkyWay />
          <StarField />
          <Nebula />
          <Sun project={sunProject} onClick={onPlanetClick} />
          <OortCloud />
          {projects.map((project) => (
            <OrbitRing key={`${project.id}-orbit`} radius={project.orbitRadius} tilt={project.orbitTilt} />
          ))}
          {projects.map((project) => (
            <Planet
              key={project.id}
              project={project}
              onClick={onPlanetClick}
              isPaused={isPaused}
              planetPositions={planetPositions}
            />
          ))}
          <CameraController selected={selected} />
        </Suspense>
      </Canvas>
    </div>
  );
}
