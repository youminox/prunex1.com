"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  { n: "01", t: "180 ml de agua caliente", d: "Una taza. Es la medida exacta que indica la etiqueta para cada stick." },
  { n: "02", t: "1 stick de 5 g", d: "Vierte todo el contenido: la mezcla de fibras y extractos vegetales con sabor guindón." },
  { n: "03", t: "Revuelve y tómala completa", d: "Revuelve bien hasta disolver y consume la preparación en su totalidad, como indica el empaque." },
];

/** Escena fijada con GSAP ScrollTrigger: la taza se llena, cae el polvo, se mezcla y aparece el vapor y la noche. */
export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;
    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".water"), { attr: { y: 205, height: 185 } });
          gsap.set(q(".drink"), { opacity: 1 });
          gsap.set(q(".steam-g, .night, .moon, .stars"), { opacity: 1 });
          gsap.set(q(".step"), { opacity: 1 });
          gsap.set(q(".bar"), { scaleX: 1 });
          return;
        }
        gsap.set(q(".powder"), { opacity: 0 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: "+=2000", scrub: 0.7, pin: q(".pin")[0], anticipatePin: 1 },
        });
        tl.to(q(".step-0"), { opacity: 1, duration: 0.2 }, 0)
          .to(q(".step-0 .dot"), { backgroundColor: "#0093DD", color: "#fff", duration: 0.2 }, 0)
          .to(q(".water"), { attr: { y: 205, height: 185 }, duration: 1 }, 0)
          .to(q(".pour"), { opacity: 1, duration: 0.15 }, 0)
          .to(q(".pour"), { opacity: 0, duration: 0.15 }, 0.9)
          .to(q(".step-0"), { opacity: 0.45, duration: 0.2 }, 1.05)
          .fromTo(q(".stick"), { opacity: 0, x: 120, y: -80, rotate: -10 }, { opacity: 1, x: 0, y: 0, rotate: -38, transformOrigin: "50% 50%", duration: 0.45, ease: "power2.out" }, 1)
          .to(q(".step-1"), { opacity: 1, duration: 0.2 }, 1)
          .to(q(".step-1 .dot"), { backgroundColor: "#7A1F3D", color: "#fff", duration: 0.2 }, 1)
          .fromTo(q(".powder"), { y: 0, opacity: 0 }, { y: 150, opacity: 1, stagger: 0.025, duration: 0.5, ease: "power1.in" }, 1.35)
          .to(q(".powder"), { opacity: 0, duration: 0.15, stagger: 0.025 }, 1.75)
          .to(q(".drink"), { opacity: 1, duration: 0.7 }, 1.6)
          .to(q(".stick"), { opacity: 0, y: -60, duration: 0.3 }, 2.1)
          .to(q(".step-1"), { opacity: 0.45, duration: 0.2 }, 2.2)
          .to(q(".step-2"), { opacity: 1, duration: 0.2 }, 2.2)
          .to(q(".step-2 .dot"), { backgroundColor: "#8CC63F", color: "#1f3105", duration: 0.2 }, 2.2)
          .to(q(".swirl"), { opacity: 0.9, duration: 0.2 }, 2.2)
          .to(q(".swirl"), { rotate: 900, svgOrigin: "200 300", duration: 1 }, 2.2)
          .to(q(".swirl"), { opacity: 0, duration: 0.3 }, 3)
          .to(q(".steam-g"), { opacity: 1, duration: 0.4 }, 2.8)
          .to(q(".night"), { opacity: 1, duration: 0.6 }, 2.9)
          .fromTo(q(".moon"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 3)
          .to(q(".stars"), { opacity: 1, duration: 0.5 }, 3.1)
          .to(q(".done"), { opacity: 1, y: 0, duration: 0.4 }, 3.2)
          .to(q(".bar"), { scaleX: 1, duration: 3.6 }, 0);
      }, el);
    };
    // Carga GSAP solo cuando la sección se acerca al viewport
    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section id="del-stick-a-tu-taza" ref={root} className="relative bg-gradient-to-b from-white via-fxsky to-white">
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-14">
        <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">Del stick a tu taza</span>
            <h2 className="section-title mt-3">
              Tres pasos. <span className="text-prune">Una taza caliente.</span>
            </h2>
            <div className="mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-fxblue via-drinklight to-prune" />
            </div>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-5">
              {STEPS.map((s, i) => (
                <li key={s.n} className={`step step-${i} flex gap-4`} style={{ opacity: 0.45 }}>
                  <span className="dot grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white font-display font-extrabold text-fxink shadow-md">{s.n}</span>
                  <div>
                    <p className="font-display text-lg font-bold sm:text-xl">{s.t}</p>
                    <p className="text-sm text-[var(--muted)] sm:text-base">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="done mt-6 hidden text-sm text-[var(--muted)] sm:block" style={{ opacity: 0, transform: "translateY(10px)" }}>
              Modo de empleo según la etiqueta: “Disolver el contenido de un stick (5 g) en una taza (180 ml) de agua caliente, y revolver bien.”
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[230px] sm:max-w-[340px] lg:max-w-[420px]">
            <svg viewBox="0 0 400 440" className="relative w-full drop-shadow-[0_30px_50px_rgba(10,40,70,0.25)]" role="img" aria-label="Animación: una taza se llena de agua caliente, se añade un stick de Prunex1, se revuelve y sale vapor">
              <defs>
                <linearGradient id="ss-day" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#bfe6fb" />
                  <stop offset="1" stopColor="#fff6e8" />
                </linearGradient>
                <linearGradient id="ss-night" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0b1820" />
                  <stop offset="0.65" stopColor="#2a0c1b" />
                  <stop offset="1" stopColor="#5a1a2c" />
                </linearGradient>
                <linearGradient id="ss-drink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#E07A4F" />
                  <stop offset="0.5" stopColor="#B4472F" />
                  <stop offset="1" stopColor="#7A1F3D" />
                </linearGradient>
                <clipPath id="ss-cup">
                  <path d="M110 190 L290 190 L276 362 Q273 390 246 390 L154 390 Q127 390 124 362 Z" />
                </clipPath>
                <clipPath id="ss-panel">
                  <rect x="0" y="0" width="400" height="440" rx="36" />
                </clipPath>
              </defs>
              <g clipPath="url(#ss-panel)">
                <rect width="400" height="440" fill="url(#ss-day)" />
                <circle cx="330" cy="70" r="26" fill="#FFD166" opacity="0.8" />
                <rect className="night" width="400" height="440" fill="url(#ss-night)" opacity="0" />
                <g className="stars" opacity="0" fill="#fff">
                  {[
                    [40, 40, 1.6],
                    [90, 90, 1.1],
                    [150, 30, 1.4],
                    [220, 70, 1],
                    [60, 150, 1.2],
                    [260, 30, 1.5],
                    [370, 150, 1.1],
                    [190, 120, 0.9],
                    [30, 230, 1],
                    [370, 240, 1.3],
                  ].map(([x, y, r], i) => (
                    <circle key={i} cx={x} cy={y} r={r} />
                  ))}
                </g>
                <g className="moon" opacity="0">
                  <circle cx="320" cy="78" r="28" fill="#fdf3d8" />
                  <circle cx="333" cy="70" r="24" fill="#1a1222" />
                </g>
                {/* Plato */}
                <ellipse cx="200" cy="402" rx="150" ry="20" fill="#ffffff" opacity="0.95" />
                <ellipse cx="200" cy="398" rx="110" ry="11" fill="#e6eef3" />
                {/* Chorro de agua */}
                <rect className="pour" x="196" y="0" width="8" height="300" rx="4" fill="#cfeefc" opacity="0" />
                {/* Líquido */}
                <g clipPath="url(#ss-cup)">
                  <rect x="100" y="190" width="200" height="210" fill="#ffffff" opacity="0.35" />
                  <rect className="water" x="100" y="390" width="200" height="0" fill="#cfeefc" opacity="0.9" />
                  <rect className="drink" x="100" y="205" width="200" height="195" fill="url(#ss-drink)" opacity="0" />
                  <g className="swirl" opacity="0">
                    <path d="M200 300 m-60 0 a60 22 0 1 0 120 0 a60 22 0 1 0 -120 0" fill="none" stroke="#ffb08a" strokeWidth="5" strokeDasharray="40 30" strokeLinecap="round" />
                    <path d="M200 300 m-32 0 a32 12 0 1 0 64 0 a32 12 0 1 0 -64 0" fill="none" stroke="#ffd2bb" strokeWidth="4" strokeDasharray="22 18" strokeLinecap="round" />
                  </g>
                </g>
                {/* Taza */}
                <path d="M110 190 L290 190 L276 362 Q273 390 246 390 L154 390 Q127 390 124 362 Z" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinejoin="round" />
                <path d="M110 190 L290 190 L276 362 Q273 390 246 390 L154 390 Q127 390 124 362 Z" fill="none" stroke="#9cc7de" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M286 222 C340 222 345 318 278 330" fill="none" stroke="#ffffff" strokeWidth="13" strokeLinecap="round" />
                <path d="M286 222 C340 222 345 318 278 330" fill="none" stroke="#9cc7de" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M128 205 L140 360" stroke="#ffffff" strokeWidth="6" opacity="0.55" strokeLinecap="round" />
                {/* Vapor */}
                <g className="steam-g steam" opacity="0" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round">
                  <path d="M165 175 C150 150 180 135 165 105" />
                  <path d="M200 172 C185 145 215 128 200 92" />
                  <path d="M235 175 C220 150 250 135 235 105" />
                </g>
                {/* Stick */}
                <g className="stick" opacity="0">
                  <g transform="translate(250 40)">
                    <rect x="-70" y="-17" width="140" height="34" rx="6" fill="#ffffff" stroke="#d9e7ef" />
                    <rect x="-70" y="-17" width="26" height="34" rx="6" fill="#7A1F3D" />
                    <rect x="22" y="-17" width="48" height="34" fill="#8CC63F" opacity="0.85" />
                    <text x="-38" y="5" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="13" fill="#7A1F3D">
                      PRUNEX1
                    </text>
                  </g>
                </g>
                {/* Polvo */}
                {Array.from({ length: 18 }).map((_, i) => (
                  <circle key={i} className="powder" cx={180 + ((i * 23) % 44)} cy={96 + (i % 5) * 9} r={2.4 + (i % 3)} fill={i % 3 === 0 ? "#7A1F3D" : i % 3 === 1 ? "#B4472F" : "#E07A4F"} opacity="0" />
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
