"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { projects, sunProject, type PlanetProject } from "@/data/projects";
import type { SelectedPlanet } from "@/hooks/usePlanetClick";
import { CameraController } from "./CameraController";
import { CosmicBackdrop } from "./CosmicBackdrop";
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
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 2)]}
        shadows={false}
        onCreated={({ scene, gl }) => {
          scene.background = new THREE.Color("#03040b");
          gl.setClearColor("#03040b");
          scene.fog = new THREE.FogExp2("#03040b", 0.0012);

          const loader = new THREE.TextureLoader();
          loader.load("/images/milkyway.jpg", (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            scene.background = texture;
          });

          onReady();
        }}
      >
        <ambientLight color="#ffffff" intensity={1.2} />

        {/* Backdrop images each load independently — never blocks the main scene */}
        <CosmicBackdrop />

        {/* Main scene — particle systems and planets are synchronous */}
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
