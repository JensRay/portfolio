import { type ReactNode } from "react";

interface Props {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Full-bleed removes horizontal padding */
  fullBleed?: boolean;
}

export default function SectionContainer({
  id,
  children,
  className = "",
  fullBleed = false,
}: Props) {
  return (
    <section
      id={id}
      className={`relative ${fullBleed ? "" : "mx-auto max-w-7xl px-6 md:px-12 lg:px-20"} ${className}`}
    >
      {children}
    </section>
  );
}
