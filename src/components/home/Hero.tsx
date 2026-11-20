"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import BuyLink from "../BuyLink";
import { PRICE, PRICE_PER_STICK } from "@/lib/client-constants";

/** Partículas en canvas (ciruela / lima / azul) que el puntero repele. Arrancan en idle. */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let running = false;
    let w = 0,
      h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const COLORS = ["224,122,79", "180,71,47", "140,198,63", "92,200,255", "0,147,221", "196,60,100"];
    const N = w < 700 ? 42 : 105;
    const ps = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.3 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.05,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      a: Math.random() * 0.55 + 0.25,
    }));
    let mx = -999,
      my = -999;
    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const dx = p.x - mx,
          dy = p.y - my,
          d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const f = (16000 - d2) / 16000;
          p.vx += (dx / 4000) * f;
          p.vy += (dy / 4000) * f;
        }
        p.vx *= 0.975;
        p.vy = p.vy * 0.975 - 0.006;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const play = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    // Solo anima mientras el hero es visible
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause()));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ric = (window as any).requestIdleCallback || ((f: () => void) => setTimeout(f, 300));
    ric(() => io.observe(c));
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      pause();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 -z-[1] h-full w-full" aria-hidden />;
}

export default function Hero() {
  const card = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = card.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `rotateY(${cx}deg) rotateX(${cy}deg)`;
      if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = (e.clientX / window.innerWidth - 0.5) * 22;
      ty = -(e.clientY / window.innerHeight - 0.5) * 16;
      kick();
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tx = Math.max(-16, Math.min(16, e.gamma / 2));
      ty = Math.max(-12, Math.min(12, (e.beta - 45) / 3));
      kick();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onOrient, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  const words = ["Prunex1", "de", "FuXion"];
  return (
    <section className="hero min-h-[100svh] pt-[68px]">
      <div className="hero-aurora" />
      <div className="hero-grid" />
      <Particles />
      <div className="wrap grid min-h-[calc(100svh-68px)] items-center gap-8 py-12 lg:grid-cols-[1.08fr_1fr] lg:gap-10 lg:py-0">
        <div className="relative z-10">
          <span className="chip">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fxlime" /> FuXion Perú · Fibras + extractos vegetales · Sabor guindón
          </span>
          <h1 className="hero-title mt-6">
            <span className="block">
              {words.map((w, i) => (
                <span key={w}>
                  <span className="hw" style={{ animationDelay: `${0.08 + i * 0.12}s, ${-i * 1.2}s` }}>
                    {w}
                  </span>
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </span>{" "}
            <span className="mt-4 block text-[0.4em] font-bold leading-[1.22] tracking-[-0.02em] text-white/90">
              {["La", "bebida", "de", "fibras", "sabor", "guindón,"].map((w, i) => (
                <Fragment key={w + i}>
                  <span className="reveal-word">
                    <span style={{ animationDelay: `${0.42 + i * 0.06}s` }}>{w}</span>
                  </span>{" "}
                </Fragment>
              ))}
              <span className="reveal-word">
                <span style={{ animationDelay: "0.8s" }} className="text-[#ffb08a]">
                  explicada sin humo
                </span>
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Bebida instantánea en polvo con <strong className="text-white">fibra de psyllium, inulina de achicoria, guindón, kelp, anís estrella y
            mucílago de linaza</strong>. Según la etiqueta: 1 stick de 5 g en 180 ml de agua caliente, y listo.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BuyLink source="hero" className="btn btn-lime shine text-base" magnetic>
              Comprar en tienda oficial · {PRICE}
            </BuyLink>
            <Link href="/como-preparar-prunex1/" className="btn btn-glass" data-magnetic>
              Cómo se prepara →
            </Link>
          </div>
          <ul className="mt-10 grid max-w-lg grid-cols-3 gap-2.5 sm:gap-3" aria-label="Datos por porción según la etiqueta">
            {[
              ["18", "kcal", "por taza"],
              ["1.7 g", "", "de fibra"],
              ["0 g", "", "azúcares añadidos"],
            ].map(([v, u, l], i) => (
              <li key={l} className="glass px-3 py-3 sm:px-4" style={{ animation: `fadeup .8s ${0.85 + i * 0.1}s cubic-bezier(.2,.8,.2,1) both` }}>
                <p className="font-display text-xl font-extrabold text-white sm:text-2xl">
                  {v}
                  {u && <span className="ml-1 text-sm font-bold text-white/70">{u}</span>}
                </p>
                <p className="text-[0.72rem] leading-tight text-white/70 sm:text-xs">{l}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="tilt-stage relative z-10 mx-auto w-full max-w-[580px]">
          <div ref={card} className="tilt-card relative">
            <div className="tilt-glow" />
            <div className="halo-ring" />
            <div className="relative" style={{ transform: "translateZ(50px)" }}>
              <div className="float-y">
                <Image
                  src="/img/producto/prunex1-fuxion-doypack-sticks-taza-transparente.webp"
                  alt="Prunex1 de FuXion: doypack de 28 sticks sabor guindón, un stick, guindones, limón, anís estrella y una taza preparada"
                  width={660}
                  height={643}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 70vw, 560px"
                  className="h-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
            <div className="price-badge right-0 top-0 sm:right-2 sm:top-4" aria-label={`Precio de catálogo ${PRICE}, ${PRICE_PER_STICK} por stick`}>
              <svg viewBox="0 0 124 124" aria-hidden>
                <defs>
                  <path id="pb-circle" d="M62,62 m-49,0 a49,49 0 1,1 98,0 a49,49 0 1,1 -98,0" />
                </defs>
                <text fontSize="9" fontWeight="700" fill="#1d2f06" fontFamily="Outfit, sans-serif">
                  <textPath href="#pb-circle" textLength="300" lengthAdjust="spacing">PRECIO DE CATÁLOGO · TIENDA OFICIAL · 28 STICKS ·</textPath>
                </text>
              </svg>
              <div className="relative">
                <p className="font-display text-[1.7rem] font-extrabold leading-none">S/ 76</p>
                <p className="mt-0.5 text-[0.62rem] font-bold">{PRICE_PER_STICK} / stick</p>
              </div>
            </div>
            <div
              className="absolute -left-1 bottom-6 hidden rounded-2xl border border-white/15 bg-[#0b1820]/85 px-4 py-3 shadow-xl backdrop-blur sm:block"
              style={{ transform: "translateZ(80px)" }}
            >
              <p className="text-[0.68rem] uppercase tracking-wider text-white/60">Contenido</p>
              <p className="font-display font-bold">28 sticks × 5 g</p>
            </div>
            <div
              className="absolute bottom-[38%] right-[-4px] hidden rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur md:block"
              style={{ transform: "translateZ(120px)" }}
            >
              🌿 Sin gluten · No GMO
            </div>
          </div>
        </div>
      </div>
      <a href="#que-es" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/50 lg:flex" aria-label="Bajar a qué es Prunex1">
        <span className="h-10 w-6 rounded-full border border-white/30 p-1">
          <span className="block h-2 w-full animate-bounce rounded-full bg-fxlime" />
        </span>
      </a>
    </section>
  );
}
