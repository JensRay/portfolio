/**
 * Site-wide configuration — replace all placeholder values.
 */
export const siteConfig = {
  /* Replace with your name */
  name: "Jedrzej Lagodzinski",
  /* Replace with your tagline */
  headline: "I design and build thoughtful digital products.",
  subline:
    "Frontend development, UX design, product thinking, and visual direction.",
  /* Metadata line shown in the hero */
  meta: {
    location: "Based in Copenhagen, Denmark",
    status: "Open to opportunities",
    focus: "Product & interface work",
  },
  /* About section */
  about: {
    paragraphs: [
      "I work across frontend development, UX design, and product thinking — usually in the space where these disciplines overlap. My background is cross-disciplinary by nature, not by accident.",
      "Most of my work has been on internal products, tools, and systems where clarity and usability matter more than surface polish. I care about structure, hierarchy, and making complex things feel simple.",
      "I'm drawn to projects where the challenge is real and the craft matters — whether that means building a better admin flow, shaping a product's visual identity, or prototyping an interaction pattern from scratch.",
    ],
    facts: [
      { label: "Based in", value: "Copenhagen, Denmark" },
      { label: "Working across", value: "Frontend, UX, Product, Visual" },
      {
        label: "Interested in",
        value: "Product teams, studios, selected freelance",
      },
      { label: "Available for", value: "Roles, collaborations, consulting" },
    ],
  },
  /* Music background reference */
  musicNote:
    "Before digital product work, years of professional music shaped my sense of timing, structure, listening, and performance. That background still informs how I think about rhythm, pacing, and composition in everything I design and build.",
  /* Contact */
  contact: {
    heading: "Open to selected opportunities.",
    subline: "For roles, collaborations, or portfolio conversations.",
    email: "jedrzejlagodzinski@gmail.com",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/jedrzejlagodzinski" },
      { label: "GitHub", url: "https://github.com/JensRay" },
      { label: "CV", url: "/cv.pdf" },
    ],
  },
  /* Nav items */
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};
