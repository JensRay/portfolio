"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expanded]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group border-t border-border"
    >
      {/* Clickable header row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full cursor-pointer items-start gap-4 py-8 text-left transition-colors md:items-center md:gap-8 md:py-10"
        aria-expanded={expanded}
      >
        {/* Project number */}
        <span className="mt-1 shrink-0 font-display text-xs font-medium text-text-muted md:mt-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
            <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-2xl">
              {project.name}
            </h3>
            <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
              {project.role}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-base">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-subtle bg-bg-elevated px-3 py-1 text-[11px] font-medium text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Year + toggle */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className="text-xs text-text-muted">{project.year}</span>
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-secondary transition-colors group-hover:border-accent group-hover:text-accent"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
      </button>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: contentHeight || "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="pb-12 pl-0 md:pl-11">
              <ExpandedContent project={project} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function ExpandedContent({ project }: { project: Project }) {
  return (
    <div className="space-y-10">
      {/* Divider */}
      <div className="h-px w-full bg-border" />

      {/* Overview */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
          Overview
        </h4>
        <p className="max-w-3xl text-sm leading-relaxed text-text-secondary md:text-base">
          {project.overview}
        </p>
      </div>

      {/* What I did */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
          What I did
        </h4>
        <ul className="flex flex-wrap gap-2">
          {project.whatIDid.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border bg-bg-card px-4 py-1.5 text-sm text-text-primary"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Key decisions */}
      <div>
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
          Key decisions
        </h4>
        <div className="grid gap-4 md:grid-cols-3">
          {project.keyDecisions.map((decision) => (
            <div
              key={decision.title}
              className="rounded-lg border border-border-subtle bg-bg-card p-5"
            >
              <h5 className="mb-2 font-display text-sm font-semibold text-text-primary">
                {decision.title}
              </h5>
              <p className="text-sm leading-relaxed text-text-secondary">
                {decision.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
          Outcome
        </h4>
        <p className="max-w-3xl text-sm leading-relaxed text-text-secondary md:text-base">
          {project.outcome}
        </p>
      </div>

      {/* Image placeholders */}
      <div>
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
          Gallery
        </h4>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.images.map((label) => (
            <div
              key={label}
              className="flex aspect-[4/3] items-center justify-center rounded-lg border border-border-subtle bg-bg-elevated"
            >
              {/* Replace with real <Image> components later */}
              <span className="text-xs tracking-wide text-text-muted">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
