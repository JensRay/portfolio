"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/config";
import HalftonePortrait from "./HalftonePortrait";

export default function Hero() {
  const meta = siteConfig.meta;

  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 md:px-12 lg:px-20">
      <div className="mx-auto w-full max-w-7xl">
        {/* Two-column: text left, portrait right */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_320px] lg:gap-16 xl:grid-cols-[1fr_380px]">
          {/* Left — identity */}
          <div>
            {/* Name — the biggest, most prominent element */}
            <motion.p
              className="text-xs font-medium uppercase tracking-[0.25em] text-text-muted"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Portfolio
            </motion.p>

            <motion.h1
              className="mt-4 font-display text-[clamp(2.2rem,6vw,4.8rem)] font-bold leading-[1.02] tracking-tight text-text-primary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
              }}
            >
              {siteConfig.name.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </motion.h1>

            {/* Thin accent divider */}
            <motion.div
              className="mt-6 h-px w-16 bg-accent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />

            {/* Tagline */}
            <motion.p
              className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {siteConfig.headline}
            </motion.p>

            {/* Subline */}
            <motion.p
              className="mt-3 max-w-md text-sm leading-relaxed text-text-muted"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              {siteConfig.subline}
            </motion.p>

            {/* Metadata */}
            <motion.div
              className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-widest text-text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <span>{meta.location}</span>
              <span className="text-border">—</span>
              <span>{meta.status}</span>
              <span className="text-border">—</span>
              <span>{meta.focus}</span>
            </motion.div>
          </div>

          {/* Right — halftone portrait */}
          <div className="hidden lg:block">
            <HalftonePortrait className="aspect-[3/4] w-full rounded-xl" />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-text-muted to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
