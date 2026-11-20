"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Escena arrastrable día ↔ noche: cambia el cielo, pero el ritual de la etiqueta es siempre el mismo. */
export default function DayNightSlider() {
  const [v, setV] = useState(18);
  const [touched, setTouched] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const t = v / 100;
  const dusk = clamp(1 - Math.abs(t - 0.5) * 2.4);
  const night = clamp((t - 0.45) / 0.45);
  const stars = clamp((t - 0.62) / 0.3);
  const sunX = 110 + t * 520;
  const sunY = 95 + Math.pow(t, 1.6) * 330;
  const sunO = 1 - clamp((t - 0.55) / 0.2);
  const moonY = 420 - clamp((t - 0.5) / 0.5) * 320;
  const hour = 7 + t * 15;
  const hh = Math.floor(hour);
  const mm = Math.round((hour - hh) * 60 / 15) * 15;
  const time = `${String(hh + (mm === 60 ? 1 : 0)).padStart(2, "0")}:${String(mm === 60 ? 0 : mm).padStart(2, "0")}`;
  const phase = t < 0.34 ? "Mañana" : t < 0.67 ? "Tarde" : "Noche";

  const fromPointer = useCallback((clientX: number) => {
    const el = scene.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.round(clamp((clientX - r.left) / r.width) * 100));
    setTouched(true);
  }, []);

  return (
    <div className="daynight bg-[#0b1820] shadow-[0_40px_80px_-40px_rgba(11,24,32,0.7)]">
      <div
        ref={scene}
        className="relative aspect-[4/5] cursor-ew-resize select-none sm:aspect-[16/9]"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") {
            if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) fromPointer(e.clientX);
          }
        }}
      >
        <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="dn-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7cc8f2" />
              <stop offset="1" stopColor="#e9f7ff" />
            </linearGradient>
            <linearGradient id="dn-dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5b3a78" />
              <stop offset="0.55" stopColor="#e07a4f" />
              <stop offset="1" stopColor="#ffd08a" />
            </linearGradient>
            <linearGradient id="dn-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#060f16" />
              <stop offset="0.7" stopColor="#1a1030" />
              <stop offset="1" stopColor="#4a0f24" />
            </linearGradient>
            <linearGradient id="dn-drink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E07A4F" />
              <stop offset="1" stopColor="#7A1F3D" />
            </linearGradient>
            <radialGradient id="dn-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#fff7d1" />
              <stop offset="0.5" stopColor="#ffd166" />
              <stop offset="1" stopColor="#ffd166" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dn-lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#ffcf8a" stopOpacity="0.55" />
              <stop offset="1" stopColor="#ffcf8a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#dn-day)" />
          <rect width="800" height="450" fill="url(#dn-dusk)" opacity={dusk} />
          <rect width="800" height="450" fill="url(#dn-night)" opacity={night} />
          <g opacity={stars} fill="#fff">
            {[
              [60, 40, 1.6],
              [140, 90, 1.1],
              [230, 30, 1.4],
              [320, 70, 1],
              [410, 25, 1.5],
              [500, 85, 1.1],
              [590, 35, 1.3],
              [690, 70, 1],
              [760, 30, 1.4],
              [100, 160, 1],
              [380, 140, 0.9],
              [720, 150, 1.2],
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} />
            ))}
          </g>
          <g opacity={sunO}>
            <circle cx={sunX} cy={sunY} r="90" fill="url(#dn-sun)" />
            <circle cx={sunX} cy={sunY} r="30" fill="#ffe08a" />
          </g>
          <g transform={`translate(640 ${moonY})`} opacity={clamp((t - 0.5) / 0.25)}>
            <circle r="30" fill="#fdf3d8" />
            <circle cx="12" cy="-8" r="26" fill="#120d22" opacity={0.9 * night + 0.1} />
          </g>
          {/* Cerros y ciudad */}
          <path d="M0 330 C120 290 210 300 300 320 C400 280 520 290 620 315 C700 300 760 305 800 310 L800 450 L0 450 Z" fill={night > 0.5 ? "#16222c" : "#8fb7cc"} opacity="0.9" />
          <path d="M0 330 C120 290 210 300 300 320 C400 280 520 290 620 315 C700 300 760 305 800 310 L800 450 L0 450 Z" fill="#16222c" opacity={night} />
          <g fill={t > 0.5 ? "#0f1a22" : "#6f97ad"}>
            {[
              [40, 300, 40, 150],
              [90, 270, 36, 180],
              [135, 310, 50, 140],
              [520, 285, 40, 165],
              [565, 255, 46, 195],
              [618, 300, 36, 150],
              [660, 275, 44, 175],
              [712, 305, 48, 145],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="3" />
            ))}
          </g>
          <g fill="#ffd27a" opacity={night}>
            {[
              [100, 285],
              [112, 310],
              [100, 335],
              [150, 325],
              [530, 300],
              [578, 270],
              [590, 300],
              [578, 330],
              [672, 290],
              [684, 320],
              [725, 318],
            ].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="7" height="9" rx="1" />
            ))}
          </g>
          {/* Mesa, lámpara y taza */}
          <circle cx="400" cy="330" r="190" fill="url(#dn-lamp)" opacity={night} />
          <rect x="0" y="392" width="800" height="58" fill={night > 0.5 ? "#3b2418" : "#c9a27e"} />
          <rect x="0" y="392" width="800" height="58" fill="#2a170f" opacity={night * 0.7} />
          <rect x="0" y="388" width="800" height="8" fill="#ffffff" opacity="0.18" />
          <ellipse cx="400" cy="396" rx="95" ry="12" fill="#ffffff" opacity="0.92" />
          <path d="M335 300 L465 300 L455 375 Q452 392 432 392 L368 392 Q348 392 345 375 Z" fill="#ffffff" />
          <path d="M342 306 L458 306 L450 372 Q447 386 430 386 L370 386 Q353 386 350 372 Z" fill="url(#dn-drink)" />
          <ellipse cx="400" cy="306" rx="58" ry="7" fill="#f09a72" opacity="0.8" />
          <path d="M462 318 C500 318 500 365 455 368" fill="none" stroke="#ffffff" strokeWidth="11" strokeLinecap="round" />
          <g className="steam" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.85">
            <path d="M375 290 C362 268 388 252 375 226" />
            <path d="M400 288 C387 262 413 246 400 214" />
            <path d="M425 290 C412 268 438 252 425 226" />
          </g>
          {/* Stick junto a la taza */}
          <g transform="translate(474 386) rotate(-8) scale(0.78)">
            <rect x="0" y="-12" width="110" height="24" rx="5" fill="#ffffff" />
            <rect x="0" y="-12" width="20" height="24" rx="5" fill="#7A1F3D" />
            <rect x="74" y="-12" width="36" height="24" fill="#8CC63F" />
            <text x="26" y="5" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="11" fill="#7A1F3D">
              PRUNEX1
            </text>
          </g>
        </svg>
        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/30 bg-black/25 px-4 py-2 text-white backdrop-blur-md sm:left-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">{phase}</p>
          <p className="font-display text-3xl font-extrabold tabular-nums">{time}</p>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 max-w-[52%] rounded-2xl border border-white/30 bg-black/25 px-4 py-3 text-right text-white backdrop-blur-md sm:right-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-fxlime">El ritual no cambia</p>
          <p className="font-display text-sm font-bold leading-snug sm:text-lg">1 stick (5 g) + 180 ml de agua caliente</p>
        </div>
        {!touched && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-fxink shadow-lg sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm">
            ← Arrastra para pasar del día a la noche →
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-[#0b1820] px-5 py-4 text-white sm:px-7">
        <span aria-hidden>☀️</span>
        <label className="sr-only" htmlFor="dn-range">
          Hora del día en la escena
        </label>
        <input
          id="dn-range"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => {
            setV(Number(e.target.value));
            setTouched(true);
          }}
          aria-valuetext={`${phase}, ${time}`}
        />
        <span aria-hidden>🌙</span>
      </div>
    </div>
  );
}
