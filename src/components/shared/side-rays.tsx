"use client";

import React, { useRef, useEffect } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

type Origin = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface SideRaysProps {
  speed?: number;
  rayColor1?: string;
  rayColor2?: string;
  intensity?: number;
  spread?: number;
  origin?: Origin;
  tilt?: number;
  saturation?: number;
  blend?: number;
  falloff?: number;
  opacity?: number;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

export const SideRays: React.FC<SideRaysProps> = ({
  speed = 1.4,
  rayColor1 = "#FFFBEB",
  rayColor2 = "#BAE6FD",
  intensity = 1.8,
  spread = 1.2,
  origin = "top-left",
  tilt = 0,
  saturation = 1.2,
  blend = 0.5,
  falloff = 1.0,
  opacity = 0.85,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Record<string, { value: unknown }> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer | null = null;
    let animationFrameId = 0;
    let isCleanedUp = false;

    const rendererInstance = new Renderer({
      dpr: Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2),
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer = rendererInstance;

    const gl = rendererInstance.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(gl.canvas);

    const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

    const frag = `precision highp float;

varying vec2 vUv;
uniform float iTime;
uniform vec2  iResolution;
uniform float iSpeed;
uniform vec3  iRayColor1;
uniform vec3  iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iOriginType;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float smoothNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;

  // 1. Single Light Source & Target Vector
  vec2 rayOrigin;
  vec2 rayTarget;

  if (iOriginType < 0.5) {
    // top-left -> center bottom
    rayOrigin = vec2(0.20, 1.12);
    rayTarget = vec2(0.56, 0.05);
  } else if (iOriginType < 1.5) {
    // top-right -> center bottom
    rayOrigin = vec2(0.80, 1.12);
    rayTarget = vec2(0.44, 0.05);
  } else if (iOriginType < 2.5) {
    // bottom-left -> center top
    rayOrigin = vec2(0.20, -0.12);
    rayTarget = vec2(0.56, 0.95);
  } else {
    // bottom-right -> center top
    rayOrigin = vec2(0.80, -0.12);
    rayTarget = vec2(0.44, 0.95);
  }

  // Aspect ratio correction for accurate geometry
  float aspect = iResolution.x / iResolution.y;

  vec2 toFrag = uv - rayOrigin;
  toFrag.x *= aspect;

  vec2 beamAxis = rayTarget - rayOrigin;
  beamAxis.x *= aspect;
  vec2 normBeamAxis = normalize(beamAxis);

  // Tilt rotation
  float tiltRad = iTilt * 0.0174532925;
  mat2 rot = mat2(cos(tiltRad), -sin(tiltRad), sin(tiltRad), cos(tiltRad));
  normBeamAxis = rot * normBeamAxis;

  float projDist = dot(toFrag, normBeamAxis);
  float perpDist = length(toFrag - projDist * normBeamAxis);
  float totalDist = length(toFrag);

  if (projDist <= -0.05) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // 2. Single Volumetric Spotlight Beam Cone Profile
  float coneWidth = (0.16 + max(0.0, projDist) * 0.38) * iSpread;
  float beamProfile = exp(-pow(perpDist / max(coneWidth, 0.01), 1.85));

  // 3. Subtle Organic Shimmer (Warm dust particles in sunlight)
  float shimmer = smoothNoise(vec2(projDist * 4.0 - iTime * iSpeed * 0.35, perpDist * 8.0 + iTime * iSpeed * 0.15));
  shimmer = 0.88 + 0.24 * shimmer;

  // 4. Smooth Distance Falloff & Controlled Brightness (Prevents white washout)
  float distFalloff = 1.0 / (1.0 + pow(totalDist * 0.9, iFalloff));
  float totalLight = beamProfile * shimmer * distFalloff * iIntensity;
  totalLight = min(totalLight, 1.25); // Cap to prevent blinding overexposure

  // 5. Dual-Tone Luminous Beam Color (Soft warm sunlight & atmospheric sky)
  vec3 col = mix(iRayColor2, iRayColor1, pow(beamProfile, 0.6)) * totalLight;

  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(lum), col, iSaturation);

  float alpha = clamp(lum * iOpacity, 0.0, 0.85);

  gl_FragColor = vec4(col, alpha);
}
`;

    const getOriginCode = (o: Origin): number => {
      switch (o) {
        case "top-left":
          return 0;
        case "top-right":
          return 1;
        case "bottom-left":
          return 2;
        case "bottom-right":
          return 3;
        default:
          return 0;
      }
    };

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [container.clientWidth || 720, container.clientHeight || 224] },
      iSpeed: { value: speed },
      iRayColor1: { value: hexToRgb(rayColor1) },
      iRayColor2: { value: hexToRgb(rayColor2) },
      iIntensity: { value: intensity },
      iSpread: { value: spread },
      iOriginType: { value: getOriginCode(origin) },
      iTilt: { value: tilt },
      iSaturation: { value: saturation },
      iBlend: { value: blend },
      iFalloff: { value: falloff },
      iOpacity: { value: opacity },
    };
    uniformsRef.current = uniforms as unknown as Record<string, { value: unknown }>;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms,
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry, program });

    const updateSize = () => {
      if (!container || !renderer || isCleanedUp) return;
      const w = container.clientWidth || 720;
      const h = container.clientHeight || 224;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setSize(w, h);
      uniforms.iResolution.value = [w * dpr, h * dpr];
    };

    let startTime = performance.now();
    const loop = (now: number) => {
      if (isCleanedUp || !renderer) return;
      uniforms.iTime.value = (now - startTime) * 0.001;
      try {
        renderer.render({ scene: mesh });
        animationFrameId = requestAnimationFrame(loop);
      } catch {
        // Safe fail
      }
    };

    const ro = new ResizeObserver(updateSize);
    ro.observe(container);
    window.addEventListener("resize", updateSize);

    updateSize();
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      isCleanedUp = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateSize);
      ro.disconnect();
      if (renderer) {
        try {
          const loseCtx = renderer.gl.getExtension("WEBGL_lose_context");
          if (loseCtx) loseCtx.loseContext();
          if (renderer.gl.canvas.parentNode) {
            renderer.gl.canvas.parentNode.removeChild(renderer.gl.canvas);
          }
        } catch {
          // ignore
        }
      }
      renderer = null;
    };
  }, [
    speed,
    rayColor1,
    rayColor2,
    intensity,
    spread,
    origin,
    tilt,
    saturation,
    blend,
    falloff,
    opacity,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full overflow-hidden ${className}`.trim()}
    />
  );
};

export default SideRays;
