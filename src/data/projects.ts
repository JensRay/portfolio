export interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  tags: string[];
  year: string;
  /* Expanded case-study content */
  overview: string;
  whatIDid: string[];
  keyDecisions: { title: string; detail: string }[];
  outcome: string;
  /* Image labels — replace with real paths later */
  images: string[];
}

export const projects: Project[] = [
  {
    id: "layerise",
    name: "Layerise — AI Assistant & Product Surfaces",
    role: "UI/UX Designer & Front-end Developer",
    description:
      "Worked across product UI, frontend implementation, and marketing-facing visuals in a fast-moving startup environment, helping shape clearer and more consistent digital experiences.",
    tags: ["UI/UX", "Frontend", "AI", "Marketing surfaces", "Startup"],
    year: "2025",
    overview:
      "At Layerise, I worked in a hybrid design and frontend role across product and go-to-market surfaces. My work combined UI thinking, layout decisions, implementation support, and visual communication for product features. The strongest part of this experience was operating between design intent and shipped interface, while keeping hierarchy, clarity, and consistency across different touchpoints.",
    whatIDid: [
      "UI design",
      "Frontend implementation",
      "Feature visuals",
      "Sales decks",
      "Diagrams",
      "Design QA",
      "Cross-team collaboration",
    ],
    keyDecisions: [
      {
        title: "Keep product and marketing visually aligned",
        detail:
          "I approached product screens and marketing materials as part of the same system, using shared hierarchy, spacing, and visual rules instead of treating them as separate worlds.",
      },
      {
        title: "Design for clarity, not decoration",
        detail:
          "The focus was on helping users and stakeholders understand features quickly through cleaner structure, stronger emphasis, and more readable layouts.",
      },
      {
        title: "Work fast without losing consistency",
        detail:
          "In a startup setting, I leaned on reusable patterns and straightforward frontend decisions so ideas could move from concept to implementation without unnecessary friction.",
      },
    ],
    outcome:
      "This role strengthened my ability to work across UX, interface design, and frontend execution at the same time. It pushed me to think more like a product designer-developer rather than treating design and code as separate phases.",
    images: [
      "AI assistant / search view",
      "Feature callout or deck slide",
      "Product UI detail",
    ],
  },
  {
    id: "genbrugsguiden",
    name: "Genbrugsguiden — Product Identity & Front-end Lead",
    role: "Product Identity & Front-end Lead",
    description:
      "Defined the visual direction of the product across interface and communication, connecting brand consistency, product storytelling, and frontend execution.",
    tags: [
      "Product identity",
      "Frontend",
      "Visual system",
      "UX",
      "Presentation",
    ],
    year: "2025–Present",
    overview:
      "In Genbrugsguiden, I owned the visual and structural direction across product and marketing surfaces. The work was not only about making things look coherent, but about defining how the product should communicate: through typography, spacing, layout rhythm, and consistent decision-making. I also contributed on the frontend side, which helped keep the visual rules grounded in implementation reality.",
    whatIDid: [
      "Visual identity",
      "Layout system",
      "Typography rules",
      "Product visuals",
      "Marketing sections",
      "Presentation materials",
      "Frontend direction",
    ],
    keyDecisions: [
      {
        title: "Create one system for product and marketing",
        detail:
          "Instead of designing the interface and external communication separately, I treated them as parts of one product identity with shared rules for type, spacing, and composition.",
      },
      {
        title: "Prioritize clarity over visual noise",
        detail:
          "The visual direction focused on legibility, hierarchy, and trust so the product would feel understandable and credible rather than overly styled.",
      },
      {
        title: "Make the design implementable",
        detail:
          "Because I also worked close to frontend, the system was shaped to be realistic to build, maintain, and evolve rather than staying at a purely conceptual level.",
      },
    ],
    outcome:
      "This project deepened my interest in the space between product design, identity, and implementation. It showed how much stronger a product becomes when the visual language is intentional across both UI and communication.",
    images: ["Product screen", "Marketing section", "Presentation / diagram"],
  },
  {
    id: "modstrom",
    name: "Modstrøm — Energy Management Platform",
    role: "Sole Frontend Developer & UX Designer",
    description:
      "Designed and built a data-heavy energy platform with a strong focus on usability, structure, and implementation quality.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Charts", "UX"],
    year: "2023–2025",
    overview:
      "At Enablement, one of the strongest product cases was Modstrøm, where I worked as sole frontend developer and UX designer. The product required balancing data presentation, practical workflows, and maintainable implementation. I designed mockups, built the interface, and handled functionality that had to feel clear even when the content and logic were more complex.",
    whatIDid: [
      "UX design",
      "Figma mockups",
      "Next.js frontend",
      "Tailwind UI",
      "Charts",
      "Authentication",
      "CRUD flows",
      "PDF generation",
    ],
    keyDecisions: [
      {
        title: "Make complex information readable",
        detail:
          "The platform included data-heavy views, so I focused on visual hierarchy and simpler patterns that made the information easier to scan and act on.",
      },
      {
        title: "Bridge design and production",
        detail:
          "I used the same mindset in mockups and implementation, which reduced disconnect between what was designed and what was actually built.",
      },
      {
        title: "Build practical product flows",
        detail:
          "Rather than chasing novelty, I prioritized flows that were reliable, understandable, and maintainable for real use.",
      },
    ],
    outcome:
      "This was one of the clearest examples of me owning both the UX and the frontend of a product area. It reinforced my ability to design and ship interfaces that combine structure, real functionality, and visual clarity.",
    images: ["Dashboard", "Chart / reporting view", "CRUD / form flow"],
  },
  {
    id: "motionshift",
    name: "Motionshift — AI Video Editor Integrations",
    role: "Frontend Developer",
    description:
      "Built frontend features and external integrations for an AI-powered video and ad editor, working within growth-focused product constraints.",
    tags: ["Next.js", "TypeScript", "APIs", "AI product", "Growth"],
    year: "2022–2023",
    overview:
      "At Motionshift, I worked on an AI-powered video and advertising editor with integrations to social platforms like Facebook, Instagram, and Pinterest. It was a useful experience in designing and building within real product constraints: external APIs, marketing-oriented workflows, and interfaces that had to support creation and distribution.",
    whatIDid: [
      "Frontend development",
      "API integration",
      "Next.js",
      "TypeScript",
      "Growth-facing features",
    ],
    keyDecisions: [
      {
        title: "Work within platform constraints",
        detail:
          "A big part of the work was making external API requirements feel manageable inside the product instead of leaking complexity into the user experience.",
      },
      {
        title: "Support content workflows clearly",
        detail:
          "Because the product touched advertising and publishing workflows, structure and predictability mattered more than flashy interaction.",
      },
      {
        title: "Learn from constrained design systems",
        detail:
          "This role sharpened my understanding of how layout and asset limitations affect real interface decisions.",
      },
    ],
    outcome:
      "The project gave me practical experience in integrating third-party systems into a frontend product and strengthened my ability to design around technical limitations without making the UX feel chaotic.",
    images: [
      "Editor view",
      "Integration settings",
      "Publishing / workflow screen",
    ],
  },
];
