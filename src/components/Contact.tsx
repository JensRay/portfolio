"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/config";
import SectionContainer from "./SectionContainer";

export default function Contact() {
  const { contact } = siteConfig;

  return (
    <SectionContainer id="contact" className="py-32 md:py-40">
      <div className="flex flex-col items-start">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl"
        >
          {contact.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-base text-text-secondary md:text-lg"
        >
          {contact.subline}
        </motion.p>

        {/* Email */}
        <motion.a
          href={`mailto:${contact.email}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group mt-10 inline-flex items-center gap-2 font-display text-lg font-medium text-accent transition-colors hover:text-accent-hover md:text-xl"
        >
          {contact.email}
          <ArrowUpRight
            size={18}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </motion.a>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-6"
        >
          {contact.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
              <ArrowUpRight
                size={14}
                className="text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
