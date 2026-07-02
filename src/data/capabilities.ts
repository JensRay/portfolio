export interface Capability {
  title: string;
  description: string;
  keywords: string[];
}

/**
 * Two-card model: Design and Build. First-person voice, 2–3 sentences each.
 * Keywords listed underneath as a tag row.
 */
export const capabilities: Capability[] = [
  {
    title: "Design",
    description:
      "I work on flows, layouts, and how interfaces feel to use. Most of my time goes into figuring out what to put on the screen and why — wireframes, prototypes, the small decisions that decide whether the product earns trust. I spend the rest finishing things visually so they ship looking like someone cared.",
    keywords: [
      "Figma",
      "Flows",
      "Prototyping",
      "User research",
      "Typography",
      "Layout",
      "Brand",
      "Testing",
    ],
  },
  {
    title: "Build",
    description:
      "I write the code that makes the design real, mostly in React and Next.js. I'm comfortable across the stack — APIs, data models, build tooling — and I default to writing what the design needs rather than what's clever. The goal is for the implementation and the design to look like they came from the same person.",
    keywords: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "APIs",
      "Architecture",
      "CSS",
      "Performance",
    ],
  },
];
