"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type GalleryImage = { src: string; alt: string; w: number; h: number; contain?: boolean; key?: string };

/** Galería de fotos reales del producto con zoom (hover en escritorio, toque en móvil). */
export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const cur = images[i];

  useEffect(() => {
    const on = (e: Event) => {
      const key = (e as CustomEvent<string>).detail;
      const idx = images.findIndex((im) => im.key === key);
      if (idx >= 0) {
        setI(idx);
        setZoom(false);
      }
    };
    window.addEventListener("px:presentation", on);
    return () => window.removeEventListener("px:presentation", on);
  }, [images]);

  const move = (e: React.PointerEvent) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--zx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--zy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div>
      <div
        ref={frame}
        className={`zoom-frame relative aspect-square overflow-hidden rounded-3xl border border-[var(--line)] bg-white ${zoom ? "zoomed" : ""}`}
        onPointerMove={move}
        onPointerEnter={(e) => e.pointerType === "mouse" && setZoom(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setZoom(false)}
        onClick={(e) => {
          move(e as unknown as React.PointerEvent);
          setZoom((z) => !z);
        }}
        role="img"
        aria-label={`${cur.alt}. Toca o pasa el cursor para ampliar.`}
      >
        <Image
          key={cur.src}
          src={cur.src}
          alt={cur.alt}
          fill
          priority={i === 0}
          sizes="(max-width:1024px) 100vw, 560px"
          className={cur.contain ? "object-contain p-4" : "object-cover"}
          style={{ animation: "wordup .4s ease both" }}
        />
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--muted)] shadow">
          🔍 {zoom ? "Ampliado" : "Ampliar"}
        </span>
      </div>
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
        {images.map((im, k) => (
          <button
            key={im.src}
            onClick={() => {
              setI(k);
              setZoom(false);
            }}
            className={`relative aspect-square w-[72px] shrink-0 overflow-hidden rounded-xl border-2 bg-white sm:w-[84px] ${k === i ? "border-fxblue" : "border-[var(--line)]"}`}
            aria-label={`Ver imagen ${k + 1}: ${im.alt}`}
            aria-pressed={k === i}
          >
            <Image src={im.src} alt="" fill sizes="84px" className={im.contain ? "object-contain p-1" : "object-cover"} />
          </button>
        ))}
      </div>
    </div>
  );
}
