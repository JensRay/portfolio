import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  /* Replace with your actual name and description */
  title: "Portfolio — Digital Product Designer & Frontend Developer",
  description:
    "Selected work by a cross-disciplinary frontend developer, UX designer, and product thinker.",
  // Keep the portfolio out of search engines until intentionally launched.
  // Next emits <meta name="robots" content="noindex, nofollow"> from this.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-bg">
      <body className="bg-bg text-text-primary">
        {/* Subtle grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
