"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense } from "react";
import * as THREE from "three";
import { projects, type PlanetProject } from "@/data/projects";
import type { SelectedPlanet } from "@/hooks/usePlanetClick";
import { CameraController } from "./CameraController";
import { Nebula } from "./Nebula";
import { OrbitRing } from "./OrbitRing";
import { Planet } from "./Planet";
import { StarField } from "./StarField";
import { Sun } from "./Sun";

type SolarSystemProps = {
  selected: SelectedPlanet | null;
  onPlanetClick: (project: PlanetProject, position: THREE.Vector3) => void;
  onReady: () => void;
};

export function SolarSystem({ selected, onPlanetClick, onReady }: SolarSystemProps) {
  return (
    <div className="fixed inset-0 hidden md:block">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        shadows={false}
        onCreated={({ gl }) => {
          gl.setClearColor("#03040b");
          onReady();
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#03040b"]} />
          <ambientLight color="#8aa5ff" intensity={0.26} />
          <StarField />
          <Nebula />
          <Sun />
          {projects.map((project) => (
            <OrbitRing key={`${project.id}-orbit`} radius={project.orbitRadius} tilt={project.orbitTilt} />
          ))}
          {projects.map((project) => (
            <Planet key={project.id} project={project} onClick={onPlanetClick} />
          ))}
          <CameraController selected={selected} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.3} intensity={0.8} mipmapBlur />
            <Vignette eskil={false} offset={0.18} darkness={0.78} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
