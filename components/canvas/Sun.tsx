"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";
import type { PlanetProject } from "@/data/projects";
import { createGlowMaterial } from "@/lib/three-utils";

type SunProps = {
  project: PlanetProject;
  onClick: (project: PlanetProject, position: THREE.Vector3) => void;
};

export function Sun({ project, onClick }: SunProps) {
  const sun = useRef<THREE.Mesh>(null);
  const corona = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>>(null);
  const glowMaterial = useMemo(() => createGlowMaterial("#FDB813", 0.8), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (sun.current) {
      sun.current.rotation.y = t * 0.16;
      const pulse = 1 + Math.sin(t * 1.8) * 0.025;
      sun.current.scale.setScalar(pulse);
    }
    if (corona.current) {
      corona.current.material.uniforms.time.value = t;
      corona.current.rotation.y = -t * 0.05;
    }
  });

  return (
    <group>
      <pointLight color="#FDB813" intensity={3} distance={100} decay={1.4} />
      <mesh
        ref={sun}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation();
          onClick(project, new THREE.Vector3(0, 0, 0));
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[3, 96, 96]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      <mesh ref={corona} scale={1.62}>
        <sphereGeometry args={[3, 96, 96]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
    </group>
  );
}
