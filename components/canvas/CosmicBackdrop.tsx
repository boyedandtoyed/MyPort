"use client";

import { useTexture } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

type BackdropObject = {
  name: string;
  src: string;
  position: ThreeElements["mesh"]["position"];
  rotation: ThreeElements["mesh"]["rotation"];
  scale: ThreeElements["mesh"]["scale"];
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
          float fade = smoothstep(0.0, 0.18, edge);
          vec3 color = texel.rgb * 0.85;
          gl_FragColor = vec4(color, texel.a * opacity * fade);
        }
      `
    });
  }, [object.opacity, texture]);

  return (
    <mesh position={object.position} rotation={object.rotation} scale={object.scale} renderOrder={-10}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export function CosmicBackdrop() {
  return (
    <group>
      {distantObjects.map((object) => (
        <DistantImage key={object.name} object={object} />
      ))}
    </group>
  );
}
