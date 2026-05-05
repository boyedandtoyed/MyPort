"use client";

import { Component, Suspense } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type BackdropObject = {
  name: string;
  src: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  opacity: number;
};

const distantObjects: BackdropObject[] = [
  {
    name: "milkyway",
    src: "/images/milkyway.jpg",
    position: [-54, 34, -178],
    rotation: [0, 0, -0.2],
    scale: [88, 34, 1],
    opacity: 0.2
  },
  {
    name: "andromeda",
    src: "/images/andormeda.jpg",
    position: [86, 26, -190],
    rotation: [0, 0, 0.18],
    scale: [34, 18, 1],
    opacity: 0.15
  },
  {
    name: "lmc",
    src: "/images/LMC.webp",
    position: [-96, -18, -184],
    rotation: [0, 0, -0.08],
    scale: [26, 20, 1],
    opacity: 0.13
  },
  {
    name: "clusters",
    src: "/images/clusters.webp",
    position: [82, -36, -178],
    rotation: [0, 0, -0.12],
    scale: [22, 14, 1],
    opacity: 0.12
  },
  {
    name: "horseshoe",
    src: "/images/horeshoe_nebula.jpg",
    position: [-86, 20, -188],
    rotation: [0, 0, 0.1],
    scale: [20, 14, 1],
    opacity: 0.12
  }
];

class ImageBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function DistantImage({ object }: { object: BackdropObject }) {
  const texture = useTexture(object.src);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return (
    <mesh
      position={object.position}
      rotation={object.rotation}
      scale={object.scale}
      renderOrder={-10}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={object.opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function CosmicBackdrop() {
  return (
    <group>
      {distantObjects.map((object) => (
        <Suspense key={object.name} fallback={null}>
          <ImageBoundary>
            <DistantImage object={object} />
          </ImageBoundary>
        </Suspense>
      ))}
    </group>
  );
}
