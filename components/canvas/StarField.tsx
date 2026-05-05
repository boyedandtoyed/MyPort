"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function StarField() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);
    const palette = [new THREE.Color("#ffffff"), new THREE.Color("#b8d8ff"), new THREE.Color("#ffd9a6")];

    for (let i = 0; i < 5000; i += 1) {
      const radius = 120 + Math.random() * 380;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const points = new THREE.BufferGeometry();
    points.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    points.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return points;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.006;
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.015;
      const mat = ref.current.material as THREE.PointsMaterial;
      mat.opacity = 0.8 + Math.sin(clock.elapsedTime * 0.55) * 0.18;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial vertexColors size={0.5} sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}
