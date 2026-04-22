"use client";

import { memo, useMemo, useRef, useState } from "react";
import { Html, Trail } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PlanetProject } from "@/data/projects";
import { orbitPosition } from "@/lib/three-utils";

type PlanetProps = {
  project: PlanetProject;
  parentPosition?: THREE.Vector3;
  onClick: (project: PlanetProject, position: THREE.Vector3) => void;
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

export const Planet = memo(function Planet({ project, parentPosition, onClick }: PlanetProps) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => makePlanetTexture(project), [project]);
  const worldPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pos = orbitPosition(t, project.orbitRadius, project.orbitSpeed, project.orbitTilt);
    if (parentPosition) pos.add(parentPosition);

    if (group.current) {
      group.current.position.lerp(pos, 0.24);
      group.current.getWorldPosition(worldPosition);
      const scale = hovered ? 1.18 : 1;
      group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.18);
    }
    if (mesh.current) {
      mesh.current.rotation.y += 0.006 + project.orbitSpeed * 0.004;
      mesh.current.rotation.x = Math.sin(t * 0.25 + project.orbitRadius) * 0.05;
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onClick(project, worldPosition);
  };

  return (
    <group ref={group}>
      <Trail width={0.38} length={20} color={project.color} attenuation={(t) => t * t} decay={1.8}>
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
          <meshStandardMaterial
            map={texture}
            color={project.color}
            roughness={0.8}
            metalness={0.1}
            emissive={project.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Trail>

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
            {project.planet} · {project.name}
          </div>
        </Html>
      ) : null}

      {project.moons?.map((moon) => (
        <Planet key={moon.id} project={moon} parentPosition={worldPosition} onClick={onClick} />
      ))}
    </group>
  );
});
