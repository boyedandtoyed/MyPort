"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { makeRadialTexture } from "@/lib/three-utils";

const nebulae = [
  { color: "rgba(45,27,105,0.85)", position: [-70, 18, -110], scale: [80, 54, 1] },
  { color: "rgba(27,58,105,0.85)", position: [65, -14, -125], scale: [92, 60, 1] },
  { color: "rgba(105,27,74,0.85)", position: [14, 44, -150], scale: [70, 46, 1] },
  { color: "rgba(20,98,92,0.75)", position: [-24, -42, -135], scale: [58, 40, 1] }
] as const;

export function Nebula() {
  const textures = useMemo(() => nebulae.map((nebula) => makeRadialTexture(nebula.color)), []);

  return (
    <group>
      {nebulae.map((nebula, index) => (
        <sprite key={nebula.color} position={nebula.position} scale={nebula.scale}>
          <spriteMaterial
            map={textures[index]}
            transparent
            opacity={0.2}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}
