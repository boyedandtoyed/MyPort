"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { projects, sunProject, type PlanetProject } from "@/data/projects";
import type { SelectedPlanet } from "@/hooks/usePlanetClick";
import { CameraController } from "./CameraController";
import { CosmicBackdrop } from "./CosmicBackdrop";
import { MilkyWaySphere } from "./MilkyWaySphere";
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
    <div className="fixed inset-0 hidden xs:block" style={{ touchAction: "none" }}>
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 2)]}
        shadows={false}
        onCreated={({ scene, gl }) => {
          scene.background = new THREE.Color("#03040b");
          gl.setClearColor("#03040b");
          scene.fog = new THREE.FogExp2("#03040b", 0.0012);
          onReady();
        }}
      >
        <ambientLight color="#ffffff" intensity={1.2} />

        {/* Rotating milky way skybox — loads independently, never blocks scene */}
        <MilkyWaySphere />

        {/* Backdrop accent images — each loads independently */}
        <CosmicBackdrop />

        {/* Main scene — all synchronous, Suspense is a safety net */}
        <Suspense fallback={null}>
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
