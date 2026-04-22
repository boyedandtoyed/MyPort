"use client";

import { useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import type { SelectedPlanet } from "@/hooks/usePlanetClick";

const DEFAULT_POSITION = new THREE.Vector3(0, 30, 80);

export function CameraController({ selected }: { selected: SelectedPlanet | null }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  useEffect(() => {
    const activeCamera = cameraRef.current ?? camera;
    const target = selected
      ? new THREE.Vector3(selected.position.x + 8, selected.position.y + 4, selected.position.z + 8)
      : DEFAULT_POSITION.clone();
    const lookAt = selected ? selected.position.clone() : new THREE.Vector3(0, 0, 0);

    gsap.to(activeCamera.position, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 1.2,
      ease: "power3.inOut",
      onUpdate: () => {
        activeCamera.lookAt(lookAt);
        if (controlsRef.current) {
          controlsRef.current.target.lerp(lookAt, 0.18);
          controlsRef.current.update();
        }
      }
    });
  }, [camera, selected]);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 30, 80]} fov={45} near={0.1} far={900} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        enablePan={false}
        minDistance={18}
        maxDistance={118}
        minPolarAngle={0.18}
        maxPolarAngle={Math.PI / 2.08}
      />
    </>
  );
}
