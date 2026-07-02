"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * Generative dot-matrix portrait placeholder.
 *
 * When you have a real photo, replace the draw logic with a <canvas>-based
 * halftone renderer that samples pixel brightness and maps it to dot size,
 * or use CSS mix-blend-mode / SVG filter on a real <Image>.
 *
 * For now this creates an abstract dot field that suggests a head/shoulders
 * silhouette — enough to add visual identity without a real photograph.
 */

interface Props {
  className?: string;
  accent?: string;
}

export default function HalftonePortrait({
  className = "",
  accent = "#e8553a",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = wrapper.offsetWidth;
    const h = wrapper.offsetHeight;

    if (w === 0 || h === 0) return;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const gridSize = 7;
    const cols = Math.ceil(w / gridSize);
    const rows = Math.ceil(h / gridSize);

    // Silhouette geometry — head, neck, shoulders
    const headCx = w * 0.5;
    const headCy = h * 0.3;
    const headRx = w * 0.23;
    const headRy = h * 0.19;

    const shoulderCy = h * 0.75;
    const shoulderRx = w * 0.42;
    const shoulderRy = h * 0.3;

    const neckCy = h * 0.5;
    const neckRx = w * 0.1;
    const neckRy = h * 0.12;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * gridSize + gridSize / 2;
        const y = row * gridSize + gridSize / 2;

        const headDist = Math.sqrt(
          ((x - headCx) / headRx) ** 2 + ((y - headCy) / headRy) ** 2
        );
        const shoulderDist = Math.sqrt(
          ((x - headCx) / shoulderRx) ** 2 +
            ((y - shoulderCy) / shoulderRy) ** 2
        );
        const neckDist = Math.sqrt(
          ((x - headCx) / neckRx) ** 2 + ((y - neckCy) / neckRy) ** 2
        );

        const insideSilhouette =
          headDist < 1 || shoulderDist < 1 || neckDist < 1;
        const minDist = Math.min(headDist, shoulderDist, neckDist);
        const proximity = Math.max(0, 1 - minDist);

        // Deterministic pseudo-random per cell
        const seed = Math.sin(col * 127.1 + row * 311.7) * 43758.5453;
        const random = seed - Math.floor(seed);

        if (insideSilhouette) {
          const size = gridSize * 0.38 * (0.35 + proximity * 0.65);
          const isAccent = random > 0.91;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);

          if (isAccent) {
            ctx.fillStyle = accent;
            ctx.globalAlpha = 0.6 + proximity * 0.4;
          } else {
            const brightness = 120 + proximity * 120;
            ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
            ctx.globalAlpha = 0.12 + proximity * 0.7;
          }
          ctx.fill();
          ctx.globalAlpha = 1;
        } else if (minDist < 1.8 && random > 0.55) {
          // Ambient scatter outside silhouette
          const size = gridSize * 0.14;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = "#444";
          ctx.globalAlpha = 0.15 * Math.max(0, 1.8 - minDist);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    }
  }, [accent]);

  useEffect(() => {
    // Use ResizeObserver so we draw once the wrapper has actual layout dimensions
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ro = new ResizeObserver(() => {
      draw();
    });
    ro.observe(wrapper);

    return () => ro.disconnect();
  }, [draw]);

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className={`relative overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      {/* Vignette — blends edges into background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, var(--color-bg) 100%)",
        }}
      />
    </motion.div>
  );
}
