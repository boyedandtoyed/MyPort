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
  const outerCorona = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>>(null);
  const glowMaterial = useMemo(() => createGlowMaterial("#FDB813", 1.1), []);
  const outerGlowMaterial = useMemo(() => createGlowMaterial("#FFB820", 0.55), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (sun.current) {
      sun.current.rotation.y = t * 0.16;
      const pulse = 1 + Math.sin(t * 1.8) * 0.065;
      sun.current.scale.setScalar(pulse);
    }
    if (corona.current) {
      corona.current.material.uniforms.time.value = t;
      corona.current.rotation.y = -t * 0.05;
      const coronaPulse = 1 + Math.sin(t * 1.6 + 0.8) * 0.045;
      corona.current.scale.setScalar(1.62 * coronaPulse);
    }
    if (outerCorona.current) {
      outerCorona.current.material.uniforms.time.value = t;
      outerCorona.current.rotation.y = t * 0.03;
      const outerPulse = 1 + Math.sin(t * 1.2 + 1.5) * 0.04;
      outerCorona.current.scale.setScalar(2.3 * outerPulse);
    }
  });

  return (
    <group>
      <pointLight color="#FDB813" intensity={4.5} distance={120} decay={1.2} />
      <pointLight color="#FF8A00" intensity={1.8} distance={60} decay={2} />
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
        <meshBasicMaterial color="#FFD04A" />
      </mesh>
      <mesh ref={corona} scale={1.62}>
        <sphereGeometry args={[3, 64, 64]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
      <mesh ref={outerCorona} scale={2.3}>
        <sphereGeometry args={[3, 48, 48]} />
        <primitive object={outerGlowMaterial} attach="material" />
      </mesh>
    </group>
  );
}
