"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/config";
import { assetPath } from "@/lib/basePath";
import SectionContainer from "./SectionContainer";

export default function About() {
  const { about, musicNote } = siteConfig;

  return (
    <SectionContainer id="about" className="py-32 md:py-40">
      <div className="grid gap-16 lg:grid-cols-[1fr_340px] lg:gap-20">
        {/* Left — text */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl"
          >
            About
          </motion.h2>

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="max-w-2xl text-base leading-relaxed text-text-secondary"
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Music note — subtle, editorial */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 border-l-2 border-accent/40 pl-5"
          >
            <p className="text-sm italic leading-relaxed text-text-muted">
              {musicNote}
            </p>
          </motion.blockquote>
        </div>

        {/* Right — portrait + facts */}
        <div>
          {/* Portrait — same halftone photo used as the intro identity image. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath("/intro/ja.png")}
              alt="Portrait of Jedrzej Lagodzinski"
              className="aspect-[3/4] w-full rounded-xl object-cover"
            />
          </motion.div>

          {/* Facts */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {about.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <dt className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-text-secondary">
                  {fact.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </SectionContainer>
  );
}
