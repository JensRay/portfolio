"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type CardImage = {
  src: string;
  alt: string;
  /** Intrinsic pixel width — required to reserve aspect ratio (zero CLS). */
  width: number;
  /** Intrinsic pixel height — required to reserve aspect ratio (zero CLS). */
  height: number;
};

interface ProjectImageRowProps {
  images: CardImage[];
}

export default function ProjectImageRow({ images }: ProjectImageRowProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const open = useCallback((i: number) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);

  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-5 flex flex-wrap items-end gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            ref={(el) => {
              triggerRefs.current[i] = el;
            }}
            type="button"
            onClick={() => open(i)}
            aria-label={`View ${img.alt} larger`}
            className="group/thumb h-[150px] w-auto cursor-zoom-in overflow-hidden rounded-lg border border-white/10 bg-black/20 transition-[transform,filter] duration-150 ease-out hover:scale-[1.02] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:h-[200px]"
            style={{ borderWidth: "0.5px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading="lazy"
              decoding="async"
              className="h-[150px] w-auto object-cover md:h-[200px]"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => {
            const trigger = triggerRefs.current[openIndex];
            close();
            // Restore focus after the portal unmounts.
            requestAnimationFrame(() => trigger?.focus());
          }}
        />
      )}
    </>
  );
}

/* ——— Lightbox (portal) ——— */

interface LightboxProps {
  images: CardImage[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}

function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const current = images[index];
  const count = images.length;

  const goPrev = useCallback(
    () => onIndexChange((index - 1 + count) % count),
    [index, count, onIndexChange],
  );
  const goNext = useCallback(
    () => onIndexChange((index + 1) % count),
    [index, count, onIndexChange],
  );

  // Mount flag — portal target only exists on the client.
  useEffect(() => {
    setMounted(true);
  }, []);

  // After the portal mounts: fade in, lock body scroll, focus the close button.
  useEffect(() => {
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => {
      setVisible(true);
      closeBtnRef.current?.focus();
    });
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted]);

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  if (!mounted) return null;

  const stop = (e: ReactKeyboardEvent | React.MouseEvent) => e.stopPropagation();

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/80 transition-opacity duration-150 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Close button */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={(e) => {
          stop(e);
          onClose();
        }}
        aria-label="Close"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <X size={20} />
      </button>

      {/* Prev / Next */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              stop(e);
              goPrev();
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:left-6"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              stop(e);
              goNext();
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:right-6"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Image + caption — clicks here do NOT close. */}
      <figure
        onClick={stop}
        className="flex max-h-[90vh] max-w-[90vw] flex-col items-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          decoding="async"
          className="h-auto max-h-[85vh] w-auto max-w-[90vw] object-contain"
        />
        <figcaption
          id={titleId}
          className="mt-3 max-w-[90vw] text-center text-sm text-white/80"
        >
          {current.alt}
          {count > 1 && (
            <span className="ml-2 text-white/50">
              {index + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );

  return createPortal(overlay, document.body);
}
