"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/data/capabilities";
import SectionContainer from "./SectionContainer";

export default function Capabilities() {
  return (
    <SectionContainer className="py-32 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          What I Do
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {capabilities.map((cap, i) => {
          /* Break visual uniformity: the first card (Design) gets a duotone
             pink tint so the pair doesn't read as a flat symmetric grid. */
          const isPinkTint = i === 0;
          return (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group rounded-xl border p-6 transition-colors md:p-8 ${
                isPinkTint
                  ? "border-accent/15 bg-[color-mix(in_oklab,var(--color-bg-card)_75%,var(--color-accent)_25%)] hover:border-accent/25"
                  : "border-border-subtle bg-bg-card hover:border-border hover:bg-bg-card-hover"
              }`}
            >
              <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
                {cap.title}
              </h3>

              <p className="mt-4 max-w-prose text-sm leading-relaxed text-text-secondary md:text-[15px]">
                {cap.description}
              </p>

              {/* Keywords — bullet-separated tag row */}
              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
                {cap.keywords.map((kw, idx) => (
                  <span
                    key={kw}
                    className="inline-flex items-center text-[11px] font-medium text-text-muted"
                  >
                    {kw}
                    {idx < cap.keywords.length - 1 && (
                      <span className="ml-3 text-border">·</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
