import * as THREE from "three";

export function orbitPosition(
  elapsed: number,
  orbitRadius: number,
  orbitSpeed: number,
  orbitTilt = 0
) {
  const angle = elapsed * orbitSpeed;
  return new THREE.Vector3(
    orbitRadius * Math.cos(angle),
    orbitRadius * Math.sin(orbitTilt) * 0.9,
    orbitRadius * Math.sin(angle) * Math.cos(orbitTilt)
  );
}

export function createGlowMaterial(color: string, opacity = 0.35) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      c: { value: 0.42 },
      p: { value: 3.2 },
      glowColor: { value: new THREE.Color(color) },
      opacity: { value: opacity },
      time: { value: 0 }
    },
    vertexShader: `
      uniform float c;
      uniform float p;
      uniform float time;
      varying float intensity;
      void main() {
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vNormel = normalize(normalMatrix * cameraPosition);
        intensity = pow(c - dot(vNormal, vNormel), p) * (1.0 + sin(time * 2.0) * 0.14);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float opacity;
      varying float intensity;
      void main() {
        gl_FragColor = vec4(glowColor, intensity * opacity);
      }
    `
  });
}

export function makeRadialTexture(inner: string, outer = "rgba(0,0,0,0)") {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(0.42, inner.replace("0.85", "0.25"));
  gradient.addColorStop(1, outer);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
