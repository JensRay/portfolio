"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import SectionContainer from "./SectionContainer";

export default function ProjectGrid() {
  return (
    <SectionContainer id="work" className="py-32 md:py-40">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 md:mb-20"
      >
        <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Selected Work
        </h2>
        <p className="mt-4 max-w-xl text-base text-text-secondary">
          A curated set of projects across frontend development, UX design, and
          product thinking. Most built for internal teams and real constraints.
        </p>
      </motion.div>

      {/* Project list */}
      <div>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        {/* Bottom border for last item */}
        <div className="border-t border-border" />
      </div>
    </SectionContainer>
  );
}
