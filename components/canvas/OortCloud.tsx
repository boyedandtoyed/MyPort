"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function OortCloud() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color("#d8c39a"), new THREE.Color("#9ca3af"), new THREE.Color("#f5d28b")];

    for (let i = 0; i < count; i += 1) {
      const radius = 20.2 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const wobble = (Math.random() - 0.5) * 0.9;
      positions[i * 3] = radius * Math.cos(theta);
      positions[i * 3 + 1] = wobble;
      positions[i * 3 + 2] = radius * Math.sin(theta);

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

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.018;
    }
  });

  return (
    <points ref={ref} geometry={geometry} rotation={[0.04, 0, -0.03]}>
      <pointsMaterial vertexColors size={0.1} sizeAttenuation transparent opacity={0.58} />
    </points>
  );
}
