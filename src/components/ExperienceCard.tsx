"use client";

import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type {
  ProjectEntry,
  RoleEntry,
  ExperienceTag,
} from "@/data/experience";
import { projectImages } from "@/data/projectImages";
import ProjectImageRow from "./ProjectImageRow";

/* ——— Color helpers ——— */

function normalizeHex(hex: string): string {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) {
    h = h.split("").map((c) => c + c).join("");
  } else if (h.length === 4) {
    h =
      h.slice(0, 3).split("").map((c) => c + c).join("") +
      h.slice(3).split("").map((c) => c + c).join("");
  }
  return h;
}

function getRelativeLuminance(hex: string): number {
  const h = normalizeHex(hex);
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const t = (v: number) =>
    v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return 0.2126 * t(r) + 0.7152 * t(g) + 0.0722 * t(b);
}

function withAlpha(hex: string, alpha: number): string {
  const h = normalizeHex(hex);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ——— Card surface derivation ———
 *
 * Every card's background goes through the same pipeline:
 *
 *   1. Pull toward a deep plum (PLUM_ANCHOR) so all cards live in the same
 *      pink/purple temperature family as the hero halftone. Darker brand
 *      colors keep more brand; brighter brands get more plum (so the surface
 *      stays dark enough for white text).
 *   2. Darken 15% — multiply every sRGB channel by 0.85.
 *   3. Desaturate 15% — pull each channel 15% toward the per-color neutral
 *      gray (the mean of R, G, B). Cards that were already muted shift less,
 *      which is the desired uniform-rule behavior.
 *
 * Computed in JS (not CSS color-mix) because the per-color avg-of-channels
 * gray reference can't be expressed inside a CSS color-mix expression.
 *
 * White text remains readable across the row because step 1 already controls
 * luminance for bright brands; steps 2–3 reinforce that.
 */
const PLUM_ANCHOR = "#261028";

type RGB = { r: number; g: number; b: number };

function plumPercent(lum: number): number {
  if (lum > 0.5) return 65;
  if (lum > 0.2) return 50;
  return 30;
}

function parseHex(hex: string): RGB {
  const h = normalizeHex(hex);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Linear sRGB mix. `weightA` is the proportion of `a` (0–1). */
function mixRgb(a: RGB, b: RGB, weightA: number): RGB {
  const wB = 1 - weightA;
  return {
    r: a.r * weightA + b.r * wB,
    g: a.g * weightA + b.g * wB,
    b: a.b * weightA + b.b * wB,
  };
}

/** Multiply every channel by `factor`. factor=0.85 ⇒ 15% darker. */
function darken(c: RGB, factor: number): RGB {
  return { r: c.r * factor, g: c.g * factor, b: c.b * factor };
}

/** Pull each channel by `amount` toward the per-color neutral gray
 *  (the mean of R, G, B). amount=0.15 ⇒ 15% desaturation. */
function desaturate(c: RGB, amount: number): RGB {
  const avg = (c.r + c.g + c.b) / 3;
  return {
    r: c.r + amount * (avg - c.r),
    g: c.g + amount * (avg - c.g),
    b: c.b + amount * (avg - c.b),
  };
}

/** Derive the final solid card surface for a brand color. */
function deriveCardBg(brand: string): string {
  const brandRgb = parseHex(brand);
  const plumRgb = parseHex(PLUM_ANCHOR);
  const lum = getRelativeLuminance(brand);
  const p = plumPercent(lum) / 100;
  const mixed = mixRgb(brandRgb, plumRgb, 1 - p);
  const darkened = darken(mixed, 0.85);
  const desaturated = desaturate(darkened, 0.15);
  return rgbToHex(desaturated);
}

/** Card background — solid color only. The halftone dot overlay was
 *  removed in this iteration; the surface is the deriveCardBg result. */
function deriveCardBackground(brand: string): string {
  return deriveCardBg(brand);
}

/**
 * Ink palette — always white, with a single shared opacity ladder. The
 * adaptive duotone shift in deriveCardBg keeps the underlying card surface
 * dark enough that full-contrast white text reads everywhere.
 */
const ink = {
  ink: "rgb(245, 245, 245)",
  ink90: "rgba(245, 245, 245, 0.9)",
  ink85: "rgba(245, 245, 245, 0.85)",
  ink70: "rgba(245, 245, 245, 0.7)",
  ink55: "rgba(245, 245, 245, 0.55)",
  ink25: "rgba(245, 245, 245, 0.25)",
  ink15: "rgba(245, 245, 245, 0.15)",
  ink08: "rgba(245, 245, 245, 0.08)",
} as const;

/** Logos render monochrome white on every card. */
const LOGO_FILTER = "brightness(0) invert(1)";

type InkPalette = typeof ink;

/* ——— Shared atoms ——— */

interface MetaItem {
  text: string;
  /** Render the bullet separator before this item (skip on the first). */
  bullet?: boolean;
}

function MetaRow({ items, color }: { items: MetaItem[]; color: string }) {
  return (
    <div
      style={{ color }}
      className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs"
    >
      {items.map((m, i) => (
        <span key={i} className="inline-flex items-baseline gap-2">
          {m.bullet !== false && i > 0 && (
            <span aria-hidden style={{ opacity: 0.5 }}>
              ·
            </span>
          )}
          <span>{m.text}</span>
        </span>
      ))}
    </div>
  );
}

function Eyebrow({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return (
    <span
      style={{ color }}
      className="text-[10px] font-semibold uppercase tracking-[0.25em]"
    >
      {children}
    </span>
  );
}

function Tags({
  tags,
  ink,
}: {
  tags: ExperienceTag[];
  ink: InkPalette;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            backgroundColor: ink.ink08,
            borderColor: ink.ink15,
            color: ink.ink70,
          }}
          className="rounded-full border px-3 py-1 text-[11px] font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function Summary({
  text,
  ink,
  size = "base",
}: {
  text: string;
  ink: InkPalette;
  size?: "base" | "sm";
}) {
  const isTodo = text.trim().toUpperCase().startsWith("TODO:");
  if (isTodo) {
    return (
      <div className="mt-3 inline-block max-w-3xl rounded-md border-2 border-dashed border-amber-300/80 bg-amber-300/10 px-3 py-2">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-amber-200">
          {text}
        </p>
      </div>
    );
  }
  return (
    <p
      style={{ color: ink.ink85 }}
      className={
        size === "sm"
          ? "mt-3 max-w-3xl text-[13px] leading-relaxed md:text-sm"
          : "mt-4 max-w-3xl text-sm leading-relaxed md:text-[15px]"
      }
    >
      {text}
    </p>
  );
}

/**
 * Inline logo — small monochrome mark sized to roughly the title's cap-height.
 * Sits left of the title, vertically centered with it.
 */
function InlineLogo({
  src,
  filter,
  size = "md",
}: {
  src: string;
  filter: string;
  size?: "md" | "sm";
}) {
  const sizeCls = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt=""
      aria-hidden
      className={`${sizeCls} shrink-0 object-contain`}
      style={{ filter }}
    />
  );
}

/* ——— ROLE CARD (parent, visually dominant) ——— */

export function RoleCard({ role: r }: { role: RoleEntry }) {
  const hasUrl = r.url && r.url !== "#";

  const cardVars: CSSProperties = {
    background: deriveCardBackground(r.brandColor),
    color: ink.ink,
    border: `1px solid ${ink.ink15}`,
    "--shadow-base": "0 8px 28px -12px rgba(0,0,0,0.55)",
    "--shadow-hover": `0 18px 40px -14px ${withAlpha(r.brandColor, 0.55)}, 0 0 0 1px ${ink.ink25}`,
    boxShadow: "var(--shadow-base)",
  } as CSSProperties;

  const meta: MetaItem[] = [{ text: r.years }];
  if (r.location) meta.push({ text: r.location });
  if (r.employmentType) meta.push({ text: r.employmentType });

  const titleNode = (
    <span className="inline-flex items-center gap-2.5">
      {r.logo && <InlineLogo src={r.logo} filter={LOGO_FILTER} />}
      <span>{r.title}</span>
    </span>
  );

  return (
    <article
      style={cardVars}
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-hover)]"
    >
      <div className="relative p-6 md:p-8">
        <div className="mb-3">
          <Eyebrow color={ink.ink55}>Role</Eyebrow>
        </div>

        {/* Headline row — logo + name on left, meta on right */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          {hasUrl ? (
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: ink.ink }}
              className="group/link inline-flex items-baseline gap-1.5 font-display text-xl font-semibold tracking-tight transition-opacity hover:opacity-80 md:text-2xl"
            >
              {titleNode}
              <ArrowUpRight
                size={14}
                style={{ color: ink.ink70 }}
                className="translate-y-0.5 transition-transform group-hover/link:-translate-y-0 group-hover/link:translate-x-0.5"
              />
            </a>
          ) : (
            <span
              style={{ color: ink.ink }}
              className="inline-flex items-baseline font-display text-xl font-semibold tracking-tight md:text-2xl"
            >
              {titleNode}
            </span>
          )}
          <MetaRow items={meta} color={ink.ink55} />
        </div>

        {/* Position title below the headline */}
        <p
          style={{ color: ink.ink70 }}
          className="mt-1 text-xs font-medium uppercase tracking-widest"
        >
          {r.role}
        </p>

        <Summary text={r.summary} ink={ink} />
        {projectImages[r.id] && <ProjectImageRow images={projectImages[r.id]} />}
        <Tags tags={r.tags} ink={ink} />
      </div>
    </article>
  );
}

/* ——— PROJECT CARD (child, nested under parent) ——— */

export function ProjectCard({
  project: p,
  parentTitle,
}: {
  project: ProjectEntry;
  parentTitle: string;
}) {
  const hasUrl = p.url && p.url !== "#";

  const cardVars: CSSProperties = {
    background: deriveCardBackground(p.brandColor),
    color: ink.ink,
    border: `1px solid ${ink.ink15}`,
    "--shadow-base": "0 4px 18px -10px rgba(0,0,0,0.55)",
    "--shadow-hover": `0 12px 30px -12px ${withAlpha(p.brandColor, 0.55)}, 0 0 0 1px ${ink.ink25}`,
    boxShadow: "var(--shadow-base)",
  } as CSSProperties;

  const meta: MetaItem[] = [
    { text: p.years },
    { text: `via ${parentTitle}` },
  ];

  const titleNode = (
    <span className="inline-flex items-center gap-2">
      {p.logo && <InlineLogo src={p.logo} filter={LOGO_FILTER} size="sm" />}
      <span>{p.title}</span>
    </span>
  );

  return (
    <article
      style={cardVars}
      className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-hover)]"
    >
      <div className="relative p-5 md:p-6">
        <div className="mb-2">
          <Eyebrow color={ink.ink55}>Project</Eyebrow>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
          {hasUrl ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: ink.ink }}
              className="group/link inline-flex items-baseline gap-1.5 font-display text-lg font-semibold tracking-tight transition-opacity hover:opacity-80 md:text-xl"
            >
              {titleNode}
              <ArrowUpRight
                size={13}
                style={{ color: ink.ink70 }}
                className="translate-y-0.5 transition-transform group-hover/link:-translate-y-0 group-hover/link:translate-x-0.5"
              />
            </a>
          ) : (
            <span
              style={{ color: ink.ink }}
              className="inline-flex items-baseline font-display text-lg font-semibold tracking-tight md:text-xl"
            >
              {titleNode}
            </span>
          )}
          <MetaRow items={meta} color={ink.ink55} />
        </div>

        {p.subtitle && (
          <p
            style={{ color: ink.ink70 }}
            className="mt-1 text-[11px] font-medium uppercase tracking-widest"
          >
            {p.subtitle}
          </p>
        )}

        <Summary text={p.summary} ink={ink} size="sm" />
        {projectImages[p.id] && <ProjectImageRow images={projectImages[p.id]} />}
        <Tags tags={p.tags} ink={ink} />
      </div>
    </article>
  );
}
