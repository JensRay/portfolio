"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { siteConfig } from "@/data/config";
import { assetPath } from "@/lib/basePath";

/**
 * IntroSequence — the entire opening of the page.
 *
 * Panel 1 IS the hero: name + tagline. From there, vertical scroll input
 * drives a horizontal slider through 3 more facets of identity.
 *
 * The portrait is fixed on the right and stays clear across all panels —
 * only the text and one symbolic element change per panel.
 */

interface Panel {
  /** Hero panel uses h1 + tagline; other panels use a single display line */
  hero?: boolean;
  text?: string;
  /** Path to symbolic image. null = no element (hero panel). */
  symbol: string | null;
  symbolAlt: string;
}

/*
 * Screens, in the new order:
 *   1. Identity        — hero (name + tagline)
 *   2. The thread      — frontend + UX + social-science chapters bound together
 *   3. Music           — master's in music as the precursor to design
 *   4. Place + values  — Polish-born, Copenhagen-made, what work he picks
 *
 * Images: only saxophone (screen 3) and portrait (others, placeholder).
 * Screens 2 and 4 will get their own assets later — for now they reuse
 * the portrait so the right slot is never empty.
 */

const panels: Panel[] = [
  {
    hero: true,
    symbol: assetPath("/intro/ja.png"),
    symbolAlt: "Halftone portrait of Jedrzej.",
  },
  {
    text: "Frontend, UX, and a background in social science. Different chapters, one question — how people actually use the things we make.",
    symbol: assetPath("/intro/desired_path.png"),
    symbolAlt: "Halftone desired path.",
  },
  {
    text: "Before code, a master's in music. Same goal then as now: make something people respond to.",
    symbol: assetPath("/intro/sax.png"),
    symbolAlt: "Halftone saxophone.",
  },
  {
    text: "Polish-born. Copenhagen-made. Most drawn to products that help people or the planet.",
    symbol: assetPath("/intro/stork.png"),
    symbolAlt: "Stark",
  },
];

const N = panels.length;

export default function IntroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal slider — panels finish moving by 85% of scroll, leaving a
  // dwell on panel 4 before the seam into the Experience section.
  const x = useTransform(
    scrollYProgress,
    [0, 0.85],
    ["0vw", `-${(N - 1) * 100}vw`]
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-bg"
      style={{ height: `${N * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Symbolic image slot — pinned to the right edge of a centered
            max-w-7xl frame instead of the viewport edge. This keeps the
            gap between text and image consistent across viewport sizes
            (otherwise large laptop screens stretch the gap dramatically). */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="relative mx-auto h-full max-w-7xl px-6 md:px-12 lg:px-20">
            <div className="absolute right-6 top-1/2 flex h-[78vh] w-[36vw] max-w-[560px] -translate-y-1/2 items-center justify-center md:right-12 lg:right-20">
              {panels.map((panel, i) =>
                panel.symbol ? (
                  <SymbolicElement
                    key={i}
                    index={i}
                    src={panel.symbol}
                    alt={panel.symbolAlt}
                    progress={scrollYProgress}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* Horizontal slider — content wrapped in the same max-w-7xl frame
            as the image slot, so text and image scale together. */}
        <motion.div className="flex h-full" style={{ x }}>
          {panels.map((panel, i) => (
            <div
              key={i}
              className="flex h-full w-screen flex-shrink-0 items-center"
            >
              <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
                <div className="w-full lg:max-w-xl">
                {panel.hero ? <HeroPanel /> : (
                  <p className="font-display text-[clamp(1.5rem,4.2vw,3.4rem)] font-semibold leading-[1.15] tracking-tight text-text-primary">
                    {panel.text}
                  </p>
                )}

                {/* Mobile-only inline symbolic element — primary visual
                    on small screens (no separate right-side slot). */}
                {panel.symbol && (
                  <div className="mt-10 h-[46vh] lg:hidden" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={panel.symbol}
                      alt=""
                      className="h-full w-auto object-contain"
                    />
                  </div>
                )}

                {/* Panel indicator — soft rounded bars in the duotone pink.
                    Inactive bars stay visible (pink at 30% opacity) so they
                    read as inactive states, not hidden ones. */}
                <div className="mt-12 flex items-center gap-2">
                  {panels.map((_, j) => (
                    <div
                      key={j}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        j === i ? "w-8 bg-accent" : "w-3 bg-accent/30"
                      }`}
                    />
                  ))}
                </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll-right cue — only meaningful on the first panel.
            Fades out as soon as the user starts scrolling. */}
        <ScrollRightCue progress={scrollYProgress} />
      </div>
    </section>
  );
}

function HeroPanel() {
  const lineVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.15 + i * 0.12,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <>
      <motion.h1
        initial="hidden"
        animate="visible"
        className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tight text-text-primary"
      >
        {siteConfig.name.split(" ").map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={lineVariants}
            className="block"
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Tagline matches the size + weight of the other panel headlines so
          it reads as part of the same sequence. The name above stays larger
          to keep identity dominant. */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="mt-8 font-display text-[clamp(1.5rem,4.2vw,3.4rem)] font-semibold leading-[1.15] tracking-tight text-text-primary"
      >
        Designer who builds. Developer who designs.
      </motion.p>
    </>
  );
}

/**
 * Single symbolic image whose opacity peaks while its panel is active.
 * Sits in a fixed slot — same position every panel — so elements feel
 * like they appear in "the same drawer."
 */
function SymbolicElement({
  index,
  src,
  alt,
  progress,
}: {
  index: number;
  src: string;
  alt: string;
  progress: MotionValue<number>;
}) {
  // Panels finish moving by 0.85 of progress; map symbol timing into that range.
  const completeAt = 0.85;
  const center = (index / (N - 1)) * completeAt;
  const half = (completeAt / (N - 1)) / 2;
  const isLast = index === N - 1;

  // The last panel fades in and stays — it dwells while we approach Experience.
  const opacity = useTransform(
    progress,
    isLast
      ? [
          Math.max(0, center - half * 1.1),
          Math.max(0, center - half * 0.35),
          1,
        ]
      : [
          Math.max(0, center - half * 1.1),
          Math.max(0, center - half * 0.35),
          Math.min(1, center + half * 0.35),
          Math.min(1, center + half * 1.1),
        ],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-auto max-w-full object-contain"
      />
    </motion.div>
  );
}

/** Subtle "scroll →" cue, visible only while we're on panel 1. */
function ScrollRightCue({ progress }: { progress: MotionValue<number> }) {
  // Visible during first half of panel 1, then fade out.
  const cueOpacity = useTransform(progress, [0, 0.05, 0.12], [1, 1, 0]);

  return (
    <motion.div
      style={{ opacity: cueOpacity }}
      className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:right-12 lg:translate-x-0"
    >
      <motion.div
        className="flex items-center gap-3"
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">
          Scroll
        </span>
        <svg width="32" height="8" viewBox="0 0 32 8" fill="none" aria-hidden>
          <path
            d="M0 4h28m0 0L24 1m4 3l-4 3"
            stroke="currentColor"
            strokeWidth="1"
            className="text-text-muted"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
