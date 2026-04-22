"use client";

import { memo } from "react";

type OrbitRingProps = {
  radius: number;
  tilt: number;
};

export const OrbitRing = memo(function OrbitRing({ radius, tilt }: OrbitRingProps) {
  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <ringGeometry args={[radius - 0.012, radius + 0.012, 192]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.085} depthWrite={false} />
    </mesh>
  );
});
