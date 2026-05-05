"use client";

import { Component, Suspense, useMemo } from "react";
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

// Milky Way is handled as scene.background in SolarSystem onCreated.
// These four are soft galaxy accents floating in deep space.
const distantObjects: BackdropObject[] = [
  {
    name: "andromeda",
    src: "/images/andormeda.jpg",
    position: [86, 26, -190],
    rotation: [0, 0, 0.18],
    scale: [48, 25, 1],
    opacity: 0.08
  },
  {
    name: "lmc",
    src: "/images/LMC.webp",
    position: [-96, -18, -184],
    rotation: [0, 0, -0.08],
    scale: [36, 28, 1],
    opacity: 0.07
  },
  {
    name: "clusters",
    src: "/images/clusters.webp",
    position: [82, -36, -178],
    rotation: [0, 0, -0.12],
    scale: [31, 20, 1],
    opacity: 0.06
  },
  {
    name: "horseshoe",
    src: "/images/horeshoe_nebula.jpg",
    position: [-86, 20, -188],
    rotation: [0, 0, 0.1],
    scale: [28, 20, 1],
    opacity: 0.06
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

  const material = useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        map: { value: texture },
        opacity: { value: object.opacity }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float opacity;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D(map, vUv);
          float edge = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
          float fade = smoothstep(0.0, 0.35, edge);
          gl_FragColor = vec4(texel.rgb, texel.a * opacity * fade);
        }
      `
    });
  }, [texture, object.opacity]);

  return (
    <mesh
      position={object.position}
      rotation={object.rotation}
      scale={object.scale}
      renderOrder={-10}
    >
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
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
