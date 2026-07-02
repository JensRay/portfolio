export type ExperienceTag = "Frontend" | "UX" | "Full-stack" | "Graphic";

/**
 * Two-tier model:
 *   - Top-level entries are ROLES (jobs, freelance umbrella, standalone roles).
 *   - Each role can optionally hold a `projects` array of child PROJECT cards
 *     that render nested under the parent in the UI.
 *
 *   Brand color rule:
 *     - Use the company's actual brand color when known.
 *     - Use #FFF as a deliberate "missing" sentinel so unfilled colors stand
 *       out. Studio 1506 and Auctionet both legitimately use #FFF — that's a
 *       coincidence with the missing sentinel, not a bug.
 *
 *   Date rule: years only, never months. e.g. "2023–2025", "2025–Present".
 */
export interface RoleEntry {
  id: string;
  kind: "role";
  title: string;
  /** Path to the company/project logo in /public/logos/. Renders monochrome
   *  (white on dark cards, black on light cards) inline next to the title. */
  logo?: string;
  /** Job title — what was being done in the role. */
  role: string;
  /** Year-only, e.g. "2023–2025" or "2025–Present". */
  years: string;
  location?: string;
  /** "Full-time" | "Part-time" | "Contract" etc. */
  employmentType?: string;
  /** External link — company site. Omit (or set "#") to render plain text. */
  url?: string;
  summary: string;
  tags: ExperienceTag[];
  brandColor: string;
  /** Child project cards rendered nested under this role. */
  projects?: ProjectEntry[];
}

export interface ProjectEntry {
  id: string;
  kind: "project";
  title: string;
  logo?: string;
  /** Job title on this project — "Lead Frontend Developer & UX Designer". */
  role: string;
  /** Short positioning line, e.g. "SaaS, Sustainability". */
  subtitle?: string;
  /** Single year or year range, e.g. "2026" or "2023–2025". */
  years: string;
  url?: string;
  summary: string;
  tags: ExperienceTag[];
  brandColor: string;
}

export type Experience = RoleEntry | ProjectEntry;

/** Loyal IT company — Enablment was renamed to Loyal. Spelling is "Enablment"
 *  (no 'e' between l and m) per Jedrzej. */
const LOYAL_URL = "https://loyalsolutions.eu";
const LOYAL_LABEL = "Enablment (now Loyal)";
/** Filename in /public/logos/ matches the company spelling: enablment.svg. */
const ENABLMENT_LOGO = "/logos/enablment.svg";

/** Missing brand-color sentinel — also legitimately used by Auctionet and
 *  Studio 1506 as their real brand color. */
const MISSING_COLOR = "#FFFFFF";

/**
 * Order: Genbrugsguiden → Layerise → Enablment (+ projects) → Freelance
 * (+ projects) → Motionshift → Auctionet → Twentyfour → Bomae.
 */
export const experience: RoleEntry[] = [
  // ─────────────────────────────────────────────────────────────────────
  // GENBRUGSGUIDEN — active
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "genbrugsguiden",
    kind: "role",
    title: "Genbrugsguiden",
    logo: "/logos/genbrugsguiden.svg",
    role: "Product Identity & Front-end Lead",
    years: "2025–Present",
    location: "Copenhagen",
    employmentType: "Part-time",
    url: "https://genbrugsguiden.dk",
    summary:
      "Co-founder. I shaped how the product looks and how it works — the brand, the app, and the frontend that runs it. Designed the visual identity from the ground up — the logo, the colour system, the website and the UX of the worker app. It's a sorting tool that has to work in a few seconds, one-handed, and stay readable outdoors at the station, so most of the design came from getting that real-world moment right: testing with the people actually doing the sorting and reworking the core interaction until it read instantly. Built the frontend in Next.js and Tailwind. Grounded in the field, not just the Figma file — research and interviews at recycling stations, in partnership with the station and the municipality, plus the data work behind the app that keeps its sorting guidance accurate.",
    tags: ["Frontend", "UX", "Graphic"],
    brandColor: "#00592E",
  },

  // ─────────────────────────────────────────────────────────────────────
  // LAYERISE — 2025
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "layerise",
    kind: "role",
    title: "Layerise",
    logo: "/logos/layerise.svg",
    role: "UX Designer & Frontend Developer",
    years: "2025",
    location: "Copenhagen",
    employmentType: "Full-time",
    url: "https://layerise.com",
    summary:
      "Designed the UX for Layerise's AI assistant — and the product logic that keeps registrations and warranties clear. UX across the platform, customer side and admin side. The largest piece was the AI Assistant: bringing product search, generative answers, follow-up questions, and handoff to a person into one conversation that feels natural to use. A lot of the work lived in the logic underneath — multiple owners per serial number, warranty and eligibility rules, age-restricted registration — designing flows that turn complicated business rules into something clear for the user and buildable for the developer. I also took the marketing site end to end: UX, frontend, and graphic design. Live with brands like Smeg, Moncler, Nidecker, and BeSafe.",
    tags: ["Frontend", "UX", "Graphic"],
    brandColor: "#0C1222",
  },

  // ─────────────────────────────────────────────────────────────────────
  // ENABLMENT (now Loyal) — 2023–2025, with project cluster
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "enablment",
    kind: "role",
    title: "Enablment (now Loyal)",
    logo: ENABLMENT_LOGO,
    role: "Frontend Developer & UX Designer",
    years: "2023–2025",
    location: "Copenhagen",
    employmentType: "Full-time",
    url: LOYAL_URL,
    summary:
      "The frontend architecture and UX design in one person, across the agency's client work. Joined to write frontend and grew into owning both design and code on the products that needed it. Sustainability SaaS, fintech marketplaces, internal tools — the through-line was making data-heavy interfaces feel clear and trustworthy, and closing the gap between the Figma file and what actually shipped. Projects below.",
    tags: ["Frontend", "UX", "Full-stack"],
    brandColor: "#e72419",
    projects: [
      {
        id: "modstrom",
        kind: "project",
        title: "Modstrøm",
        logo: "/logos/modstrom.svg",
        role: "Lead Frontend Developer & UX Designer",
        subtitle: "SaaS, Sustainability — CO₂ tracking platform",
        years: "2025",
        url: "https://www.modstroem.dk/",
        summary:
          "Sole designer and frontend developer on a CO₂ tracking platform, built end to end. Designed every flow in Figma and built it in Next.js and TypeScript: authentication, CRUD, external API integrations, dynamic forms, reporting, and PDF generation for clients. The real work was making a sprawling sustainability data model legible — working closely with energy-domain experts to find the hierarchy and states that kept it clear as the product grew.",
        tags: ["Frontend", "UX"],
        brandColor: "#00c800",
      },
      {
        id: "collaboration",
        kind: "project",
        title: "Collaboration",
        // Per spec: Collaboration uses the Enablment logo (it's an internal tool).
        logo: ENABLMENT_LOGO,
        role: "Lead Frontend Developer & UX Designer",
        subtitle: "Internal SaaS — Project management & time tracking",
        years: "2025",
        summary:
          "Led design and frontend on Enablment's own project-management tool — used across the company every day. From blank Figma file to shipped app: project dashboards, time tracking, client and user management, performance reporting with data visualisation. An internal tool only works if it stays out of the way, so the bar for restraint was higher than client work — every element had to earn its place.",
        tags: ["Frontend", "UX"],
        brandColor: "#4f8ab5",
      },
      {
        id: "mindmymind",
        kind: "project",
        title: "MindMyMind",
        logo: "/logos/mindmymind.svg",
        role: "Frontend Developer",
        subtitle: "AI Therapy — Digital therapeutics startup",
        years: "2024",
        url: "https://www.mindmymind.com/",
        summary:
          "A landing page for a personality and self-discovery app in the mental-health space. Built in Webflow, with the emphasis on clear, honest messaging and engagement — careful tone for a sensitive product category.",
        tags: ["Frontend"],
        brandColor: "#EEACC3",
      },
      {
        id: "klaret",
        kind: "project",
        title: "Klaret",
        // klaret.svg is a wide wordmark — illegible at small mono size.
        role: "Frontend Developer",
        subtitle: "Service App — React Native + admin platform",
        years: "2024",
        url: "https://www.klaret.dk/",
        summary:
          "Both sides of a service marketplace — the worker's mobile app and the company's admin platform. Built the mobile app in React Native (time tracking, photo uploads, in-app chat) and a Next.js admin for scheduling and workforce management. The same booking logic seen from two directions, made to feel right whether you're the worker or the client.",
        tags: ["Frontend"],
        brandColor: "#1326E4",
      },
      {
        id: "brolokke",
        kind: "project",
        title: "Broløkke",
        logo: "/logos/broloekke.svg",
        role: "Frontend Developer",
        subtitle: "Hospitality — eCommerce site for a historic estate",
        years: "2024",
        summary:
          "An e-commerce storefront for a historic Danish estate that needed to feel hand-tended, not off-the-shelf. Built in WordPress with custom theming so the digital surface matched the estate's place-specific brand. The booking and product flow had to read as curated rather than templated.",
        tags: ["Frontend"],
        brandColor: "#2F4E5E",
      },
      {
        id: "bam-universe",
        kind: "project",
        title: "B:A:M Universe",
        // Filename has colons + space; URL-encode for safe serving.
        logo: "/logos/B%3AA%3AM%20universe.svg",
        role: "Frontend Developer",
        subtitle: "Video, Subscription Wellness Platform",
        years: "2023",
        url: "https://body-mind.dk/",
        summary:
          "A subscription wellness platform where the job was to let the content lead. Frontend for the website and mobile app in Next.js and React Native — brand surfaces, subscription flow, and the video experience itself. Layout and motion kept calm and fast so nothing competed with the content.",
        tags: ["Frontend"],
        brandColor: "#684145",
      },
      {
        id: "enorra",
        kind: "project",
        title: "ENORRA_",
        logo: "/logos/enorra_.svg",
        role: "Frontend Developer",
        subtitle: "FinTech — SaaS marketplace",
        years: "2023",
        summary:
          "Built the frontend for a fintech marketplace in the automotive and mobility space. Next.js, with authentication and Formik-driven form handling across listing and transaction flows. Worked on the discovery-to-conversion path so a genuinely complex marketplace stayed easy to move through.",
        tags: ["Frontend"],
        brandColor: "#8a4cc4",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // FREELANCE — 2024–Present, umbrella + commissions
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "freelance",
    kind: "role",
    title: "Freelance",
    role: "Identity, Web & Design — selected commissions",
    years: "2024–Present",
    location: "Copenhagen",
    // No URL; no logo — Freelance is an umbrella, not a company.
    summary:
      "Identity, web, and design commissions for variety of clients. Each one tends to start broad and ends as a small, focused product or identity system the client can run on their own: a visual direction for an risk managementinstitute's portfolio companies, a fencing-club identity, a digital library card for a Warsaw high school, an interior-architecture studio site.",
    tags: ["Frontend", "UX", "Graphic"],
    brandColor: MISSING_COLOR,
    projects: [
      {
        id: "trekanten",
        kind: "project",
        title: "Trekanten",
        logo: "/logos/trekanten.svg",
        role: "Identity & Asset Design",
        subtitle: "Fencing club — Identity & Production",
        years: "2026",
        url: "https://trekanten.org/",
        summary:
          "Identity and production for a Copenhagen fencing club, built to feel native to the sport without leaning on medieval clichés. Designed and produced the club's visible materials: kiosk flag, festival bracelets, posters, and supporting print, all consistent across tournaments, club events, and member-facing settings.",
        tags: ["Graphic"],
        brandColor: "#0f6b99",
      },
      {
        id: "black-swan-institute",
        kind: "project",
        title: "Black Swan Institute",
        logo: "/logos/black_swan_institute.svg",
        role: "UX & Graphic Designer (Commission)",
        subtitle: "Brand commission — Color & visual direction",
        years: "2026",
        url: "https://www.blackswaninstitute.dk/",
        summary:
          "Visual direction for a company the institute was advising. Most of the work lived in colour: palettes matched to each company's tone, with enough surrounding rules — type pairings, layout rhythm, image treatment — that each brand could grow consistently from a shared starting point.",
        tags: ["UX", "Graphic"],
        brandColor: "#000000",
      },
      {
        id: "wielokulturowe-liceum",
        kind: "project",
        title: "Wielokulturowe Liceum Humanistyczne im. Jacka Kuronia",
        logo: "/logos/wielokulturowe_liceum_humanistyczne.svg",
        role: "Designer & Developer",
        subtitle: "Education — Digital library card",
        years: "2025",
        url: "https://www.wlh.edu.pl/",
        summary:
          "A digital library card for a multicultural humanist high school in Warsaw. Borrowed the visual language of an old paper library card — ruled lines, stamped dates, typewriter type — and translated it into a small product students use. The metaphor carried the design; the work was keeping it considered rather than nostalgic.",
        tags: ["Graphic"],
        brandColor: "#F5C846",
      },
      {
        id: "studio-1506",
        kind: "project",
        title: "Studio 1506",
        logo: "/logos/studio1506.svg",
        role: "Web Designer & Developer",
        subtitle: "Interior architecture — Studio website",
        years: "2024",
        url: "https://studio1506.com/",
        summary:
          "An image-led portfolio site for an interior-architecture and furniture studio. Built on Cargo, structured so the project documentation leads and the interface stays quietly in the background.",
        tags: ["Frontend"],
        brandColor: "#FFFFFF",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // EARLIER ROLES — 2022 and prior
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "motionshift",
    kind: "role",
    title: "Motionshift",
    logo: "/logos/motionshift.svg",
    role: "Frontend Developer",
    years: "2022–2023",
    location: "Copenhagen",
    employmentType: "Full-time",
    url: "https://motionshift.com",
    summary:
      "Made three social platforms' ad libraries searchable inside an AI video editor. Integrated the Facebook, Instagram, and Pinterest APIs into an AI-powered ad and video tool in Next.js and TypeScript — building the search and retrieval that feeds the app tailored ad content, while keeping the API complexity out of the interface.",
    tags: ["Frontend"],
    brandColor: "#1B245F",
  },

  {
    id: "auctionet",
    kind: "role",
    title: "Auctionet",
    // auctionet.svg is a wide wordmark — illegible at small monochrome size.
    role: "Full-Stack Developer",
    years: "2021–2022",
    location: "Remote",
    employmentType: "Full-time",
    url: "https://auctionet.com",
    summary:
      "Full-stack on an auction platform serving European auction houses — React on top, Rails underneath. Built bidding, item display, and editing flows across the marketplace, along with the translation (i18n) and item-management surfaces that kept it usable for buyers and sellers across several languages.",
    tags: ["Full-stack"],
    brandColor: "#FFF",
  },

  {
    id: "twentyfour",
    kind: "role",
    title: "Twentyfour",
    logo: "/logos/twentyfour.svg",
    role: "Junior Web Developer",
    years: "2021",
    location: "Copenhagen",
    employmentType: "Full-time",
    url: "https://twentyfour.dk/en/",
    summary:
      "An agency WordPress work. Delivering custom WordPress builds across a range of industries — early, fast exposure to client work on deadline and switching between projects.",
    tags: ["Frontend"],
    brandColor: "#E33C54",
  },

  {
    id: "bomae",
    kind: "role",
    title: "Bomae",
    // bomae.svg is a wide wordmark — illegible at small monochrome size.
    role: "Full-Stack Developer",
    years: "2021",
    location: "Copenhagen",
    employmentType: "Full-time",
    url: "https://bomae.dk",
    summary:
      "Internal tools for a real-estate buyer-advisory firm — Rails and React, domain-heavy. Built document handling, legal-process tracking, and communication flows for the team. The work was making genuinely complicated legal processes feel like ordinary, easy software for the non-technical staff using them every day.",
    tags: ["Full-stack"],
    brandColor: "#2240A4",
  },
];
