"use client";

import { useCallback, useState } from "react";
import type * as THREE from "three";
import type { PlanetProject } from "@/data/projects";

export type SelectedPlanet = {
  project: PlanetProject;
  position: THREE.Vector3;
};

export function usePlanetClick() {
  const [selected, setSelected] = useState<SelectedPlanet | null>(null);

  const selectPlanet = useCallback((project: PlanetProject, position: THREE.Vector3) => {
    setSelected({ project, position: position.clone() });
  }, []);

  const closePlanet = useCallback(() => setSelected(null), []);

  return { selected, selectPlanet, closePlanet };
}
