"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createGlowMaterial } from "@/lib/three-utils";

export function Sun() {
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
      <mesh ref={sun}>
        <sphereGeometry args={[3, 96, 96]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={2.15}
          roughness={0.35}
          metalness={0}
        />
      </mesh>
      <mesh ref={corona} scale={1.62}>
        <sphereGeometry args={[3, 96, 96]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
    </group>
  );
}
