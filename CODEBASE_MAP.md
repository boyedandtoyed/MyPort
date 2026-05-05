# Codebase Map — binodtiwari.com

## File Tree

```
app/
  globals.css          — Global CSS: Tailwind base + custom classes (glass-panel, buttons, fields, mobile-system, loader)
  layout.tsx           — Root layout: Inter + Space Grotesk fonts, <head> metadata, wraps all pages
  page.tsx             — Main page: wires hooks, mounts SolarSystem, HeroOverlay, panels, ProjectCard, ProjectSearch, NavDots

components/
  canvas/
    CameraController.tsx  — PerspectiveCamera + OrbitControls; GSAP-animates camera to selected planet and back
    CosmicBackdrop.tsx    — Five distant galaxy/nebula images rendered as additive-blended 3D planes far behind the scene
    MilkyWay.tsx          — 4 200-point particle band simulating a Milky Way strip; slow rotation
    MilkyWaySphere.tsx    — Radius-400 textured skybox sphere (inside-out); Milky Way image wraps entire scene; rotates at 0.00008 rad/frame
    Nebula.tsx            — Four radial-gradient sprite clouds for ambient color depth
    OortCloud.tsx         — 1 200-point dust ring (~20 units out) that slowly rotates; marks outer system boundary
    OrbitRing.tsx         — Thin torus ring mesh drawn at each planet's orbitRadius; memoized
    Planet.tsx            — Animated planet: canvas texture, ring mesh, hover glow, click handler, HTML label on hover
    SolarSystem.tsx       — `<Canvas>` wrapper; composes all canvas children; visible xs:block (≥480px); touchAction:none
    StarField.tsx         — 5 000-point starfield sphere with vertex colours; drifts slowly
    Sun.tsx               — Animated sun mesh with two shader-based corona layers and two point lights

  sections/
    AboutPanel.tsx        — About section: profile orb, bio paragraph, three stat tiles
    ContactPanel.tsx      — Contact section: GitHub/LinkedIn links, mailto form
    HeroOverlay.tsx       — Top-left name + tagline overlay; bottom-center "click a planet" hint (desktop only)
    SkillsPanel.tsx       — Skills section: categorised skill pills in a grid

  ui/
    LoadingScreen.tsx     — Full-screen overlay with spinner and animated progress bar; fades out when ready
    NavDots.tsx           — Fixed right sidebar icon buttons (desktop) + bottom tab bar (mobile) for section travel
    ProjectCard.tsx       — Slide-in right panel showing full project detail when a planet is clicked
    ProjectSearch.tsx     — Centred top search bar with orbit pause/play toggle and dropdown results
    SectionLabel.tsx      — Tiny pill label rendered via Three.js Html above hovered planet

data/
  projects.ts            — sunProfile, sunProject, and the projects[] array (all 10 planet configs + type definitions)

hooks/
  usePlanetClick.ts      — State for the currently selected planet; exposes selectPlanet / closePlanet
  useScrollSection.ts    — Tracks active section (solar/about/skills/contact) from scroll ratio; exposes travelTo

lib/
  three-utils.ts         — orbitPosition(), createGlowMaterial(), makeRadialTexture() shared Three.js helpers

docker-compose.yml       — Single `portfolio` service: builds image, maps 127.0.0.1:3000 → container port 80
Dockerfile               — Multi-stage: deps → builder (npm run build) → nginx:alpine runner serving /out
nginx.conf               — Nginx config inside the container: gzip, long-cache for _next/static, SPA fallback
package.json             — Scripts (dev/build/start/lint) + all npm dependencies
tailwind.config.ts       — Tailwind: custom font-heading/body aliases, space colour tokens, glow/cyan box shadows
tsconfig.json            — TypeScript config with @/* path alias pointing to project root
README.md                — Setup, Docker, Nginx reverse-proxy, and planned subdomains documentation
CODEBASE_MAP.md          — This file
```

---

## Components

### `components/canvas/CameraController.tsx`
- **Purpose:** Controls the Three.js camera position; animates smoothly to a selected planet and back to default.
- **Props:** `selected: SelectedPlanet | null`
- **Key functions/hooks:** `useThree`, `useLayoutEffect`, `useEffect`, `gsap.to`
- **What it renders:** `<PerspectiveCamera>` + `<OrbitControls>` with explicit `enableRotate={true}` and `touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}` for touch support
- **Dependencies:** `@react-three/drei`, `@react-three/fiber`, `gsap`, `three`, `hooks/usePlanetClick` (type only)

### `components/canvas/MilkyWaySphere.tsx`
- **Purpose:** Rotating milky way skybox — radius-400 sphere textured on the inside (`THREE.BackSide`), wrapping the entire scene. Rotates at 0.00008 rad/frame. Loads independently via its own `<Suspense>` + `SphereBoundary` error boundary.
- **Props:** none
- **Key functions/hooks:** `useTexture`, `useFrame`, `useRef`
- **What it renders:** `<mesh>` sphere with `meshBasicMaterial map={texture} side={BackSide} opacity={0.35}`
- **Dependencies:** `@react-three/drei`, `@react-three/fiber`, `three`

### `components/canvas/CosmicBackdrop.tsx`
- **Purpose:** Places four distant galaxy images (Andromeda, LMC, clusters, horseshoe) as soft additive-blended accent planes. Milky Way is handled separately as `scene.background` in SolarSystem.
- **Props:** none
- **Key functions/hooks:** `useTexture`, `useMemo`; per-image `<Suspense fallback={null}>` + class-based `ImageBoundary` error boundary; ShaderMaterial with `smoothstep(0.0, 0.35, edge)` for gradual edge fade
- **What it renders:** Four `<mesh>` planes at z ≈ −180–190; opacity 0.06–0.08; scales 1.4× larger than original so edges are far from centre
- **Dependencies:** `@react-three/drei`, `three`

### `components/canvas/MilkyWay.tsx`
- **Purpose:** Renders a particle-based Milky Way band with a sine-wave height distribution.
- **Props:** none
- **Key functions/hooks:** `useMemo`, `useFrame`
- **What it renders:** `<points>` with `<pointsMaterial vertexColors>`
- **Dependencies:** `@react-three/fiber`, `three`

### `components/canvas/Nebula.tsx`
- **Purpose:** Four large radial-gradient sprites for ambient purple/blue/red/teal depth.
- **Props:** none
- **Key functions/hooks:** `useMemo`, `makeRadialTexture` from `lib/three-utils`
- **What it renders:** Four `<sprite>` elements with additive `<spriteMaterial>`
- **Dependencies:** `three`, `lib/three-utils`

### `components/canvas/OortCloud.tsx`
- **Purpose:** Slowly rotating ring of 1 200 dust particles at ~20 units radius, marking the outer system edge.
- **Props:** none
- **Key functions/hooks:** `useMemo`, `useFrame`
- **What it renders:** `<points>` ring
- **Dependencies:** `@react-three/fiber`, `three`

### `components/canvas/OrbitRing.tsx`
- **Purpose:** Draws a faint ring at a planet's orbital radius to visualise its path.
- **Props:** `radius: number`, `tilt: number`
- **Key functions/hooks:** `memo`
- **What it renders:** `<mesh>` with `<ringGeometry>` + transparent `<meshBasicMaterial>`
- **Dependencies:** none (pure Three.js JSX)

### `components/canvas/Planet.tsx`
- **Purpose:** Renders one planet sphere with procedural canvas texture, optional ring, hover glow, orbit animation, and click/hover handlers.
- **Props:** `project: PlanetProject`, `parentPosition?: THREE.Vector3`, `onClick`, `isPaused: boolean`, `planetPositions: MutableRefObject<Map<string, THREE.Vector3>>`
- **Key functions/hooks:** `memo`, `useRef`, `useState`, `useMemo`, `useFrame`; `orbitPosition` from lib
- **What it renders:** `<group>` with sphere mesh, inner/outer glow spheres, optional torus ring, Html hover label
- **Dependencies:** `@react-three/drei` (Html), `@react-three/fiber`, `three`, `data/projects`, `lib/three-utils`

### `components/canvas/SolarSystem.tsx`
- **Purpose:** The `<Canvas>` root; composes all Three.js children. No postprocessing.
- **Props:** `selected`, `onPlanetClick`, `onReady`, `isPaused`, `planetPositions`
- **Key functions/hooks:** `Suspense`
- **What it renders:** `<Canvas>` (alpha=false, powerPreference=high-performance) → ambient light, `MilkyWaySphere` (skybox, own Suspense), `CosmicBackdrop` (own Suspense), then main scene Suspense; no Bloom
- **onCreated:** sets solid dark `scene.background`, `gl.setClearColor`, `scene.fog = FogExp2(0.0012)`; calls `onReady()` immediately
- **Canvas wrapper:** `fixed inset-0 hidden xs:block` — visible at **≥480px** (tablets + desktop); `style={{ touchAction:'none' }}` so OrbitControls receives touch events
- **Dependencies:** All canvas sub-components (no @react-three/postprocessing)

### `components/canvas/StarField.tsx`
- **Purpose:** 5 000 coloured stars distributed in a sphere; slow Y-rotation and opacity pulse.
- **Props:** none
- **Key functions/hooks:** `useMemo`, `useFrame`
- **What it renders:** `<points>` with vertex colours; size=0.5, opacity pulses 0.62–0.98 (brighter than original)
- **Dependencies:** `@react-three/fiber`, `three`

### `components/canvas/Sun.tsx`
- **Purpose:** Animated sun with two glow corona layers built from a custom glow shader; acts as a clickable planet for the sun-core project.
- **Props:** `project: PlanetProject`, `onClick`
- **Key functions/hooks:** `useMemo`, `useRef`, `useFrame`; `createGlowMaterial` from lib
- **What it renders:** `<group>` with two point lights, sun sphere (`meshStandardMaterial` emissive="#FDB813" emissiveIntensity=3.0 so it glows without Bloom), two shader corona glow meshes
- **Dependencies:** `@react-three/fiber`, `three`, `lib/three-utils`

### `components/sections/AboutPanel.tsx`
- **Purpose:** Scroll-animated about panel: profile orb with initials, bio text, and three stat tiles.
- **Props:** none
- **Key functions/hooks:** `motion` (framer-motion), `whileInView`
- **What it renders:** Glass panel section with profile orb, paragraph, and 3-column stat grid
- **Dependencies:** `framer-motion`

### `components/sections/ContactPanel.tsx`
- **Purpose:** Contact section with GitHub/LinkedIn icon links and a mailto form.
- **Props:** none
- **Key functions/hooks:** `motion` (framer-motion), `whileInView`
- **What it renders:** Glass panel with heading, social icon buttons, name/email/message form
- **Dependencies:** `framer-motion`, `lucide-react`

### `components/sections/HeroOverlay.tsx`
- **Purpose:** Top-left name + tagline fixed overlay; separate bottom-centre "click a planet" hint (desktop only).
- **Props:** none
- **Key functions/hooks:** `motion` (framer-motion)
- **What it renders:** Two `motion.div`s — one `fixed top-6 left-6`, one `fixed bottom-8 left-1/2 hidden md:flex`
- **Dependencies:** `framer-motion`, `lucide-react`, `data/projects` (sunProfile)

### `components/sections/SkillsPanel.tsx`
- **Purpose:** Scroll-animated skills panel: categorised skill pills in a two-column grid.
- **Props:** none
- **Key functions/hooks:** `motion` (framer-motion), `whileInView`
- **What it renders:** Glass panel with skill category cards; skills defined as a local constant
- **Dependencies:** `framer-motion`

### `components/ui/LoadingScreen.tsx`
- **Purpose:** Full-screen dark overlay shown while the Three.js canvas initialises; fades out on exit.
- **Props:** `visible: boolean`
- **Key functions/hooks:** `AnimatePresence`, `motion` (framer-motion)
- **What it renders:** Overlay with `loader-system` spinner + animated gradient progress bar
- **Dependencies:** `framer-motion`

### `components/ui/NavDots.tsx`
- **Purpose:** Section navigation — right sidebar icon buttons on desktop, bottom tab bar on mobile.
- **Props:** `active: SpaceSection`, `onTravel: (section: SpaceSection) => void`
- **Key functions/hooks:** none (pure render)
- **What it renders:** Fixed sidebar `div` (md+) with `size-9` buttons, active icon `size={14}`, inactive Circle `size={10}`; fixed bottom `<nav>` (mobile) with icons `size={16}`
- **Dependencies:** `lucide-react`, `hooks/useScrollSection` (type only)

### `components/ui/ProjectCard.tsx`
- **Purpose:** Slide-in right panel revealing full project details when a planet is clicked.
- **Props:** `selected: SelectedPlanet | null`, `onClose: () => void`
- **Key functions/hooks:** `AnimatePresence`, `motion` (framer-motion)
- **What it renders:** `flex flex-col` aside; close button absolute-positioned; inner `overflow-y-auto` div scrolls content. Width: `md:w-[340px] xl:w-[420px]`. Max-height: `max-h-[82vh]` mobile, `md:max-h-[calc(100vh-48px)]` desktop. Padding: `p-5 md:p-4 xl:p-6`
- **Dependencies:** `framer-motion`, `lucide-react`, `hooks/usePlanetClick` (type only)

### `components/ui/ProjectSearch.tsx`
- **Purpose:** Top-centre search bar filtering all projects; also contains orbit pause/play toggle.
- **Props:** `projects: PlanetProject[]`, `isPaused: boolean`, `onTogglePause`, `onSelect`
- **Key functions/hooks:** `useState`, `useMemo`, `useEffect`, `useRef`
- **What it renders:** Fixed input bar + dropdown results list
- **Dependencies:** `lucide-react`, `data/projects` (type only)

### `components/ui/SectionLabel.tsx`
- **Purpose:** Tiny pill label used in Three.js Html for hovered planet names.
- **Props:** `children: React.ReactNode`
- **Key functions/hooks:** none
- **What it renders:** `<div className="section-label">`
- **Dependencies:** none

---

## Data Layer

### `data/projects.ts`

**sunProfile** — site owner info used in HeroOverlay and AboutPanel:
```
name: "Binod Tiwari"
title: "Computer Science Student - AI/ML Engineer"
tagline: "Building intelligent systems from scratch"
color: "#FDB813"
```

**sunProject** — the sun-core project card (id: mlpipelinex):
- MLPipelineX · MLflow / Airflow / Evidently AI · End-to-end MLOps pipeline · Queued

**projects[]** — 10 PlanetProject entries:

| id | planet | name | orbit | status |
|----|--------|------|-------|--------|
| neuralforge | Mercury | NeuralForge Academy | r=8 | Live |
| documind | Venus | DocuMind | r=11.5 | Building |
| pipelineguard | Earth | PipelineGuard | r=15 | Queued |
| researchcrew | Mars | ResearchCrew | r=18.7 | Queued |
| dataflowagent | Jupiter | DataFlowAgent | r=24 | Queued |
| defectscope | Saturn | DefectScope | r=30.2 | Queued |
| contractlens | Uranus | ContractLens | r=36 | Queued |
| quantumshield | Neptune | QuantumShield | r=41.5 | Queued |
| modelforge | Pluto | ModelForge | r=48.5 | Queued |

**PlanetProject type fields:**
`id`, `planet`, `name`, `subtitle`, `categoryIcon`, `color`, `secondaryColor`, `radius`, `orbitRadius`, `orbitSpeed`, `orbitTilt`, `hasRing?`, `ringColor?`, `ringTilt?`, `tags[]`, `description`, `status`, `github?`, `liveUrl?`

---

## State & Hooks

### `hooks/usePlanetClick.ts`
- **Purpose:** Manages which planet is currently selected (clicked).
- **Parameters:** none
- **Returns:** `{ selected: SelectedPlanet | null, selectPlanet(project, position), closePlanet() }`
- **Used by:** `app/page.tsx` — feeds `selected` to ProjectCard and CameraController; `selectPlanet` passed to SolarSystem, MobileSolarSystem, ProjectSearch

### `hooks/useScrollSection.ts`
- **Purpose:** Tracks active section (solar/about/skills/contact) from the window scroll ratio; provides programmatic scroll-to.
- **Parameters:** none
- **Returns:** `{ activeSection: SpaceSection, travelTo(section), setActiveSection }`
- **Used by:** `app/page.tsx` — `activeSection` → NavDots; `travelTo` → NavDots click handler

---

## Key Connections

```
app/page.tsx
  → SolarSystem          (selected, onPlanetClick, isPaused, planetPositions)
  → HeroOverlay          (no props — reads sunProfile from data/)
  → ProjectSearch        (projects, isPaused, onTogglePause, onSelect→selectPlanet)
  → NavDots              (active, onTravel)
  → ProjectCard          (selected, onClose)
  → AboutPanel           (no props)
  → SkillsPanel          (no props)
  → ContactPanel         (no props)
  → MobileSolarSystem    (onProjectClick)

SolarSystem
  → CameraController     (selected)
  → MilkyWaySphere       () — skybox, own Suspense
  → CosmicBackdrop       () — accent images, own Suspense per image
  → MilkyWay             ()
  → StarField            ()
  → Nebula               ()
  → Sun                  (project=sunProject, onClick)
  → OortCloud            ()
  → OrbitRing[]          (radius, tilt) — one per project
  → Planet[]             (project, onClick, isPaused, planetPositions)

Planet
  → Html (drei)          hover label above planet

usePlanetClick
  → selected  → ProjectCard, CameraController
  → selectPlanet → SolarSystem, MobileSolarSystem, ProjectSearch

useScrollSection
  → activeSection → NavDots
  → travelTo → NavDots
```

---

## Build & Deploy

```bash
# Local development
npm run dev          # → http://localhost:3000 (hot reload)

# Production static export
npm run build        # → /out/  (Next.js static export)

# Docker container (static site behind Nginx)
docker compose up --build -d   # builds image, serves on 127.0.0.1:3000

# Nginx on host proxies public traffic:
#   binodtiwari.com → 127.0.0.1:3000
```

**Dockerfile stages:**
1. `deps` — `node:20-alpine`, runs `npm ci`
2. `builder` — copies deps + source, runs `npm run build` → produces `/app/out`
3. `runner` — `nginx:1.27-alpine`, copies `nginx.conf` and `/out` into the container; exposes port 80

**nginx.conf (container internal):**
- `gzip` compression enabled
- `_next/static/` → 1-year immutable cache headers
- All other routes → SPA fallback (`try_files $uri $uri/ /index.html`)
