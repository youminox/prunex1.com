"use client";

import Image from "next/image";
import { useState } from "react";

const VIMEO_ID = "277172488";
const TITLE = "Prunex1 de FuXion – video oficial";

/**
 * Fachada ligera del video oficial: no carga el reproductor de Vimeo hasta que el usuario hace clic.
 * Si el video está restringido por dominio, se ofrece abrirlo en Vimeo.
 */
export default function VideoFacade({ poster, className = "" }: { poster: string; className?: string }) {
  const [play, setPlay] = useState(false);
  return (
    <figure className={`not-prose my-8 ${className}`}>
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-[#0b1820] shadow-2xl">
        {play ? (
          <iframe
            src={`https://player.vimeo.com/video/${VIMEO_ID}?dnt=1&autoplay=1`}
            title={TITLE}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0 h-full w-full" aria-label={`Reproducir: ${TITLE}`}>
            <Image src={poster} alt="" fill sizes="(max-width: 1024px) 100vw, 760px" className="object-cover opacity-80 transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-[#0b1820]/85 via-[#0b1820]/20 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-prune shadow-2xl transition group-hover:scale-110">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/30" />
              <svg viewBox="0 0 24 24" className="relative ml-1 h-8 w-8" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-fxlime">Video oficial de FuXion</span>
              <span className="mt-1 block font-display text-xl font-extrabold">Cómo es Prunex1</span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-xs text-[var(--muted)]">
        {TITLE}. El reproductor de Vimeo solo se carga al hacer clic. Si no se reproduce en tu navegador,{" "}
        <a href={`https://vimeo.com/${VIMEO_ID}`} target="_blank" rel="noopener nofollow" className="font-semibold text-fxbluedeep underline">
          ábrelo en Vimeo
        </a>
        .
      </figcaption>
    </figure>
  );
}
