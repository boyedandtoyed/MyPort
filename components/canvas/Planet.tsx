"use client";

import { memo, useMemo, useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PlanetProject } from "@/data/projects";
import { orbitPosition } from "@/lib/three-utils";

type PlanetProps = {
  project: PlanetProject;
  parentPosition?: THREE.Vector3;
  onClick: (project: PlanetProject, position: THREE.Vector3) => void;
  isPaused: boolean;
  planetPositions: React.MutableRefObject<Map<string, THREE.Vector3>>;
};

function makePlanetTexture(project: PlanetProject) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const base = ctx.createLinearGradient(0, 0, 512, 256);
  base.addColorStop(0, project.secondaryColor);
  base.addColorStop(0.45, project.color);
  base.addColorStop(1, "#101424");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 512, 256);

  for (let i = 0; i < 26; i += 1) {
    ctx.globalAlpha = 0.08 + Math.random() * 0.2;
    ctx.fillStyle = i % 2 ? project.secondaryColor : "#ffffff";
    const y = Math.random() * 256;
    ctx.beginPath();
    ctx.ellipse(Math.random() * 512, y, 60 + Math.random() * 180, 4 + Math.random() * 18, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (project.id === "earth") {
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = "#2bd081";
    for (let i = 0; i < 11; i += 1) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * 512, Math.random() * 256, 18 + Math.random() * 52, 8 + Math.random() * 28, Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

const ORBIT_SPEED_SCALE = 0.42;

export const Planet = memo(function Planet({
  project,
  parentPosition,
  onClick,
  isPaused,
  planetPositions
}: PlanetProps) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const initialized = useRef(false);
  const simulationTime = useRef(0);
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => makePlanetTexture(project), [project]);
  const worldPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (!isPaused) {
      simulationTime.current += delta * ORBIT_SPEED_SCALE;
    }
    const t = simulationTime.current;
    const pos = orbitPosition(t, project.orbitRadius, project.orbitSpeed, project.orbitTilt);
    if (parentPosition) pos.add(parentPosition);

    if (group.current) {
      if (!initialized.current) {
        group.current.position.copy(pos);
        initialized.current = true;
      } else {
        group.current.position.lerp(pos, 0.24);
      }
      group.current.getWorldPosition(worldPosition);
      planetPositions.current.set(project.id, worldPosition.clone());
      const scale = hovered ? 1.18 : 1;
      group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.18);
    }
    if (mesh.current) {
      const rotationSpeed = isPaused ? 0 : 0.003 + project.orbitSpeed * 0.002;
      mesh.current.rotation.y += rotationSpeed;
      mesh.current.rotation.x = Math.sin(t * 0.25 + project.orbitRadius) * 0.05;
    }
    if (innerGlowRef.current) {
      const mat = innerGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity += ((hovered ? 0.28 : 0.09) - mat.opacity) * 0.14;
    }
    if (outerGlowRef.current) {
      const mat = outerGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity += ((hovered ? 0.08 : 0) - mat.opacity) * 0.1;
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onClick(project, worldPosition);
  };

  return (
    <group ref={group}>
      <mesh
        ref={mesh}
        onClick={handleClick}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[project.radius, 64, 64]} />
        <meshBasicMaterial map={texture} color={project.color} />
      </mesh>

      <mesh ref={innerGlowRef} scale={1.22}>
        <sphereGeometry args={[project.radius, 24, 24]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.09} depthWrite={false} />
      </mesh>

      <mesh ref={outerGlowRef} scale={1.75}>
        <sphereGeometry args={[project.radius, 16, 16]} />
        <meshBasicMaterial color={project.color} transparent opacity={0} depthWrite={false} />
      </mesh>

      {project.hasRing ? (
        <group rotation={[project.ringTilt ?? 0.35, 0.2, 0.15]}>
          <mesh>
            <torusGeometry args={[project.radius * 1.55, project.radius * 0.045, 16, 160]} />
            <meshBasicMaterial color={project.ringColor ?? project.color} transparent opacity={0.6} />
          </mesh>
          <mesh>
            <torusGeometry args={[project.radius * 1.95, project.radius * 0.025, 16, 160]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.26} />
          </mesh>
        </group>
      ) : null}

      {hovered ? (
        <Html center distanceFactor={12} position={[0, project.radius + 1.2, 0]}>
          <div className="section-label" style={{ borderColor: project.color, color: project.color }}>
            {project.planet} - {project.name}
          </div>
        </Html>
      ) : null}
    </group>
  );
});
