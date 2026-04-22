# binodtiwari.com

3D interactive portfolio for Saujan Parajuli, built as a solar system where every planet represents an AI/ML project.

## What Was Built

- Next.js 14 App Router + TypeScript single-page portfolio
- React Three Fiber / Three.js solar system scene with animated sun, stars, nebula, orbit rings, planets, moons, bloom, and camera transitions
- Project data layer for 10 portfolio projects and their future subdomains
- Glass UI project detail cards, loading screen, nav dots, hero overlay, about, skills, and contact panels
- Mobile fallback using a lightweight CSS orbital system
- Static export configuration for serving from Nginx
- Docker + Docker Compose setup for running the exported site behind the home-server reverse proxy

## Project Stack

- Framework: Next.js 14, React, TypeScript
- 3D: Three.js, React Three Fiber, Drei, postprocessing bloom
- Animation: Framer Motion, GSAP
- Styling: Tailwind CSS and custom CSS effects
- Icons: Lucide React
- Hosting target: Ubuntu server on Dell T5810, Nginx, Docker

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Static Build

```bash
npm run build
```

Next.js exports the production site to:

```text
out/
```

That folder can be served directly by Nginx.

## Docker

Build and run the portfolio container:

```bash
docker compose up -d --build
```

The compose file exposes the static Nginx container on localhost only:

```text
127.0.0.1:3000 -> container port 80
```

That keeps the app private to the server and lets the main Nginx reverse proxy handle public traffic, SSL, and domains.

## Suggested Host Nginx Route

For `binodtiwari.com`, proxy public traffic to the portfolio container:

```nginx
server {
  listen 80;
  server_name binodtiwari.com www.binodtiwari.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

When SSL is configured, Certbot or Cloudflare can manage certificates for `binodtiwari.com` and wildcard subdomains.

## Planned Subdomains

```text
binodtiwari.com                    -> portfolio solar system
documind.binodtiwari.com           -> DocuMind
pipelineguard.binodtiwari.com      -> PipelineGuard
researchcrew.binodtiwari.com       -> ResearchCrew
dataflowagent.binodtiwari.com      -> DataFlowAgent
defectscope.binodtiwari.com        -> DefectScope
contractlens.binodtiwari.com       -> ContractLens
quantumshield.binodtiwari.com      -> QuantumShield
modelforge.binodtiwari.com         -> ModelForge
mlpipelinex.binodtiwari.com        -> MLPipelineX
neuralforge.binodtiwari.com        -> NeuralForge Academy
```

Each project can run in its own container on a local-only port. The host Nginx reverse proxy maps the subdomain to the right localhost port.

## Useful Commands

```bash
npm run build
docker compose up -d --build
docker compose logs -f portfolio
docker compose down
```

## License

MIT
