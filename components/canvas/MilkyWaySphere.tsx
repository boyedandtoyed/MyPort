"use client";

import { Component, Suspense, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

class SphereBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function SkyboxMesh() {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useTexture("/images/milkyway.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.00008;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[400, 32, 32]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export function MilkyWaySphere() {
  return (
    <Suspense fallback={null}>
      <SphereBoundary>
        <SkyboxMesh />
      </SphereBoundary>
    </Suspense>
  );
}
