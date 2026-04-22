"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function MilkyWay() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 4200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color("#ffffff"), new THREE.Color("#8fb6ff"), new THREE.Color("#f0d7ff")];

    for (let i = 0; i < count; i += 1) {
      const spread = (Math.random() - 0.5) * 520;
      const depth = -220 + (Math.random() - 0.5) * 70;
      const band = (Math.random() - 0.5) * 28;
      positions[i * 3] = spread;
      positions[i * 3 + 1] = band + Math.sin(spread * 0.018) * 16;
      positions[i * 3 + 2] = depth + Math.cos(spread * 0.012) * 28;

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
      ref.current.rotation.z = -0.24 + Math.sin(clock.elapsedTime * 0.04) * 0.015;
      ref.current.rotation.y = 0.08;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial vertexColors size={0.48} sizeAttenuation transparent opacity={0.38} depthWrite={false} />
    </points>
  );
}
