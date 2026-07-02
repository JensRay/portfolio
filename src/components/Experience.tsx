"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { RoleCard, ProjectCard } from "./ExperienceCard";
import SectionContainer from "./SectionContainer";

/**
 * Experience — chronological list of roles, each followed by its nested
 * project cards. No filters or tabs: order comes from data/experience.ts.
 */
export default function Experience() {
  return (
    <SectionContainer id="work" className="scroll-mt-16 pb-32 md:pb-40">
      {/* Section header — sticky below the global nav. */}
      <div className="sticky top-[64px] z-30 -mx-6 bg-bg/85 px-6 py-5 backdrop-blur-md md:-mx-12 md:px-12 lg:-mx-20 lg:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl"
        >
          Work
        </motion.h2>
      </div>

      <div className="space-y-8 pt-6 md:pt-8">
        {experience.map((role) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-3"
          >
            <RoleCard role={role} />

            {/* Nested project cards — indented and visually subordinate. */}
            {role.projects && role.projects.length > 0 && (
              <div className="space-y-3 pl-4 md:pl-10">
                {role.projects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    parentTitle={role.title}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
