import { useId } from "react";

/** Marca del sitio: X estilo FuXion (azul/lima) con gota color guindón. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0093DD" />
          <stop offset="1" stopColor="#4A0F24" />
        </linearGradient>
        <linearGradient id={`${id}x`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C9F08F" />
          <stop offset="1" stopColor="#8CC63F" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}bg)`} />
      <path d="M17 15h9l6 10 6-10h9L36.5 31.5 48 49h-9l-7-11-7 11h-9l11.5-17.5Z" fill={`url(#${id}x)`} />
      <circle cx="49" cy="15" r="5" fill="#E07A4F" />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
      <LogoMark />
      <span>
        Prunex<span className={dark ? "text-fxlime" : "text-fxblue"}>1</span>
        <span className={`ml-1.5 hidden text-xs font-semibold uppercase tracking-[0.18em] sm:inline ${dark ? "text-white/60" : "text-[var(--muted)]"}`}>Perú</span>
      </span>
    </span>
  );
}
