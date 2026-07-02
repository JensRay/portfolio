import type { CardImage } from "@/components/ProjectImageRow";

/**
 * Image manifest, keyed by RoleEntry.id or ProjectEntry.id.
 *
 * Widths/heights are the file's INTRINSIC pixel dimensions (read with `sips`).
 * They must be correct so the browser reserves the right aspect ratio and the
 * thumbnail row has zero layout shift.
 *
 * Files live in /public/projects/ and are referenced with absolute paths so
 * the static export resolves them under any basePath.
 */
export const projectImages: Record<string, CardImage[]> = {
  genbrugsguiden: [
    { src: "/projects/gbs-01-welcome.webp", alt: "Genbrugsguiden welcome screen", width: 978, height: 2000 },
    { src: "/projects/gbs-02-scan.webp", alt: "Genbrugsguiden scan view", width: 978, height: 2000 },
    { src: "/projects/gbs-03-choose-type.webp", alt: "Genbrugsguiden choose-type picker", width: 978, height: 2000 },
    { src: "/projects/gbs-04-drawer.webp", alt: "Genbrugsguiden sorting drawer", width: 978, height: 2000 },
    { src: "/projects/gbs-05-home.webp", alt: "Genbrugsguiden home screen", width: 978, height: 2000 },
  ],
  modstrom: [
    { src: "/projects/modstrom-01-afgraensning.webp", alt: "Modstrøm afgrænsning view", width: 1500, height: 2000 },
    { src: "/projects/modstrom-02-nogletal.webp", alt: "Modstrøm nøgletal dashboard", width: 2000, height: 1568 },
    { src: "/projects/modstrom-03-opret-kunde.webp", alt: "Modstrøm opret kunde form", width: 2000, height: 1298 },
    { src: "/projects/modstrom-04-kundekartotek.webp", alt: "Modstrøm kundekartotek list", width: 2000, height: 1298 },
  ],
  collaboration: [
    { src: "/projects/collaboration-01-admin.webp", alt: "Collaboration admin overview", width: 1694, height: 2000 },
    { src: "/projects/collaboration-02-timer.webp", alt: "Collaboration time tracker", width: 1952, height: 2000 },
    { src: "/projects/collaboration-03-timesheet.webp", alt: "Collaboration timesheet view", width: 1887, height: 2000 },
    { src: "/projects/collaboration-04-chart.webp", alt: "Collaboration performance chart", width: 1887, height: 2000 },
  ],
  trekanten: [
    { src: "/projects/trekanten-01-kioskflag.webp", alt: "Trekanten kiosk flag", width: 1322, height: 2000 },
    { src: "/projects/trekanten-02-bracelets.webp", alt: "Trekanten festival bracelets", width: 2000, height: 378 },
  ],
  "wielokulturowe-liceum": [
    { src: "/projects/wlh-01-card-front.webp", alt: "WLH digital library card — front", width: 1599, height: 1065 },
    { src: "/projects/wlh-02-card-back.webp", alt: "WLH digital library card — back", width: 1599, height: 1065 },
  ],
};
