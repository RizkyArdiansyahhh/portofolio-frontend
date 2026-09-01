"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SideRays from "./side-rays";

interface AsciiBannerProps {
  src?: string;
  alt?: string;
  className?: string;
  cellWidth?: number;
  cellHeight?: number;
  speed?: number;
  scanlines?: boolean;
  spotlight?: boolean;
  spotlightOriginX?: number; // 0..1 (default 0.28)
  spotlightTargetX?: number; // 0..1 (default 0.52)
  spotlightWidth?: number; // 0..1 (default 0.22)
  minLuminance?: number;
}

const ASCII_CHARS = [
  "·",
  ":",
  "0",
  "1",
  "3",
  "5",
  "8",
  "9",
  "X",
  "B",
  "#",
  "0x",
  "88",
  "00",
  "8888",
];

export function AsciiBanner({
  src = "/images/banner.jpeg",
  alt = "Profile Banner",
  className = "",
  cellWidth = 7,
  cellHeight = 10,
  speed = 0.4,
  scanlines = true,
  spotlight = true,
  spotlightOriginX = 0.26,
  spotlightTargetX = 0.54,
  spotlightWidth = 0.26,
  minLuminance = 85,
}: AsciiBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    let isDisposed = false;
    let animFrameId = 0;
    let lastTime = performance.now();
    let animProgress = 0;
    let isIntersecting = true;

    let cols = 0;
    let rows = 0;
    let containerWidth = 0;
    let containerHeight = 0;
    let dpr = 1;
    let pixelData: Uint8ClampedArray | null = null;

    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    const sampleImage = () => {
      if (!offscreenCtx || cols <= 0 || rows <= 0 || !img.naturalWidth) return;
      try {
        offscreenCanvas.width = cols;
        offscreenCanvas.height = rows;

        const imgAspect = img.naturalWidth / img.naturalHeight;
        const containerAspect = (containerWidth || 720) / (containerHeight || 224);

        let drawWidth = cols;
        let drawHeight = rows;
        let drawX = 0;
        let drawY = 0;

        if (imgAspect > containerAspect) {
          drawWidth = rows * imgAspect;
          drawX = -(drawWidth - cols) / 2;
        } else {
          drawHeight = cols / imgAspect;
          drawY = -(0.4 * (drawHeight - rows));
        }

        offscreenCtx.clearRect(0, 0, cols, rows);
        offscreenCtx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        pixelData = offscreenCtx.getImageData(0, 0, cols, rows).data;
        setIsReady(true);
      } catch {
        pixelData = null;
      }
    };

    const resize = () => {
      if (!container || !canvas) return;
      containerWidth = container.clientWidth || 720;
      containerHeight = container.clientHeight || 224;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(containerWidth * dpr);
      canvas.height = Math.floor(containerHeight * dpr);
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      cols = Math.ceil(containerWidth / cellWidth);
      rows = Math.ceil(containerHeight / cellHeight);

      if (img.complete && img.naturalWidth > 0) {
        sampleImage();
      }
    };

    const renderFrame = (timestamp: number) => {
      if (!ctx || !pixelData || cols <= 0 || rows <= 0) return;

      const delta = Math.min(timestamp - lastTime, 50) / 1000;
      lastTime = timestamp;
      animProgress += delta * speed;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, containerWidth, containerHeight);
      ctx.font =
        '600 7.5px var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const dataLen = pixelData.length;
      const t = animProgress;

      for (let r = 0; r < rows; r++) {
        const normY = r / Math.max(rows, 1);
        const yPos = Math.round(r * cellHeight + cellHeight / 2);

        // Hitung garis tengah dan lebar sorot cahaya (Spotlight Beam Cone)
        const beamCenter =
          spotlightOriginX + (spotlightTargetX - spotlightOriginX) * normY;
        const currentBeamWidth = spotlightWidth * (0.65 + normY * 0.85);

        for (let c = 0; c < cols; c++) {
          const normX = c / Math.max(cols, 1);

          // 1. Spotlight Beam Masking (hanya area yang terkena sorot cahaya)
          let beamIntensity = 1.0;
          if (spotlight) {
            const distFromBeamCenter =
              Math.abs(normX - beamCenter) / Math.max(currentBeamWidth, 0.05);

            if (distFromBeamCenter >= 1.0) continue; // Di luar sorotan cahaya -> lewati!
            beamIntensity = Math.pow(
              Math.max(0, 1 - distFromBeamCenter * distFromBeamCenter),
              1.4
            );
          }

          const idx = (r * cols + c) * 4;
          if (idx + 3 >= dataLen) continue;

          const red = pixelData[idx] ?? 0;
          const green = pixelData[idx + 1] ?? 0;
          const blue = pixelData[idx + 2] ?? 0;
          const alpha = pixelData[idx + 3] ?? 0;

          if (alpha === 0) continue;

          // 2. Hitung luminance (kecerahan)
          const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;
          if (luminance < minLuminance) continue;

          // Wave math untuk variasi shimmer
          const wave =
            1.5 * Math.sin(0.12 * c + 1.5 * t) +
            1.5 * Math.cos(0.25 * r - 1.2 * t);

          const brightnessFactor =
            Math.min(1, Math.max(0, (luminance - minLuminance) / 160)) *
            beamIntensity;

          if (brightnessFactor <= 0.02) continue;

          const charIndex =
            Math.abs(Math.floor(3 * c + 7 * r + wave + 4 * t)) %
            (Math.min(
              ASCII_CHARS.length - 1,
              Math.floor(brightnessFactor * ASCII_CHARS.length)
            ) +
              1);

          const char = ASCII_CHARS[charIndex] ?? "0";
          const xPos = Math.round(c * cellWidth + cellWidth / 2);

          const isWarm = red > 120 && green > 110 && blue < 155;
          const isSky = blue > red + 10;
          const boost = Math.min(1.35, luminance / 150 + 0.3);

          const outR = Math.min(
            255,
            Math.floor(red * boost + (isWarm ? 35 : 20 * (!isSky ? 1 : 0)))
          );
          const outG = Math.min(
            255,
            Math.floor(green * boost + (isWarm || isSky ? 30 : 20))
          );
          const outB = Math.min(
            255,
            Math.floor(blue * boost + (isWarm ? 5 : isSky ? 40 : 20))
          );
          const outA = Math.min(
            0.92,
            (0.65 * brightnessFactor + 0.25) * beamIntensity
          );

          ctx.fillStyle = `rgba(${outR}, ${outG}, ${outB}, ${outA})`;
          ctx.fillText(char, xPos, yPos);
        }
      }

      ctx.restore();
    };

    const loop = (timestamp: number) => {
      animFrameId = 0;
      if (isIntersecting && !document.hidden) {
        renderFrame(timestamp);
        animFrameId = requestAnimationFrame(loop);
      }
    };

    const startAnim = () => {
      if (
        !animFrameId &&
        isIntersecting &&
        !document.hidden &&
        !prefersReducedMotion
      ) {
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(loop);
      }
    };

    const stopAnim = () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = 0;
      }
    };

    const onImageLoaded = () => {
      if (isDisposed) return;
      resize();
      sampleImage();
      if (prefersReducedMotion) {
        renderFrame(0);
      } else {
        startAnim();
      }
    };

    img.onload = onImageLoaded;
    if (img.complete && img.naturalWidth > 0) {
      onImageLoaded();
    }

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) {
        renderFrame(performance.now());
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isIntersecting = entry?.isIntersecting ?? false;
      if (isIntersecting) {
        startAnim();
      } else {
        stopAnim();
      }
    });
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopAnim();
      } else {
        startAnim();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      isDisposed = true;
      stopAnim();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [
    src,
    cellWidth,
    cellHeight,
    speed,
    spotlight,
    spotlightOriginX,
    spotlightTargetX,
    spotlightWidth,
    minLuminance,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative size-full overflow-hidden bg-black select-none ${className}`}
    >
      {/* 1. Underlying Base Image with Cinematic Contrast */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 768px) 720px, 100vw"
        className="object-cover object-[center_40%] brightness-85 contrast-110"
      />

      {/* 2. Soft Atmospheric Shadow at Edges */}
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-3 bg-[radial-gradient(ellipse_80%_90%_at_45%_20%,transparent_50%,rgba(0,0,0,0.35)_100%)]"
        />
      )}

      {/* 3. Soft Balanced Single Volumetric Sunlight Beam */}
      {spotlight && (
        <SideRays
          speed={0.9}
          rayColor1="#FFE5A3"
          rayColor2="#93C5FD"
          intensity={0.85}
          spread={1.1}
          origin="top-left"
          tilt={0}
          saturation={1.1}
          blend={0.6}
          falloff={1.1}
          opacity={0.65}
          className="z-4 mix-blend-screen"
        />
      )}

      {/* 4. Interactive Animated ASCII Canvas (Filtered strictly inside spotlight beam) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-6 size-full transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 5. CRT Scanline Grid Overlay (Contained strictly inside banner) */}
      {scanlines && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-size-[100%_3px] opacity-35 mix-blend-overlay"
        />
      )}
    </div>
  );
}

export default AsciiBanner;
