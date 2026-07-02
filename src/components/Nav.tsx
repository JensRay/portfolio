"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/config";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-bg/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12 lg:px-20">
          {/* Name / monogram */}
          <a
            href="#"
            className="font-display text-sm font-semibold tracking-wide text-text-primary transition-colors hover:text-accent"
          >
            {/* Replace with your initials or name */}
            {siteConfig.name.split(" ").map((w) => w[0]).join("")}
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-xs font-medium uppercase tracking-widest text-text-secondary transition-colors hover:text-text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-px w-5 bg-text-primary transition-all duration-300 ${
                mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-text-primary transition-all duration-300 ${
                mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-lg md:hidden"
          >
            <nav>
              <ul className="flex flex-col items-center gap-8">
                {siteConfig.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-2xl font-medium text-text-primary"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
