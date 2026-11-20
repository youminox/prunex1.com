"use client";

import Image from "next/image";
import { useState } from "react";
import BuyLink from "../BuyLink";

type P = { key: string; label: string; size: number; price: number; img: string; alt: string; inStock: boolean };

const WEEKS_PER_MONTH = 4.33;
const money = (n: number) => `S/ ${n.toFixed(2)}`;

/**
 * Bloque de precio: alterna presentación 28 / 7 y calcula un presupuesto mensual según
 * cuántas tazas preparas a la semana. Es una calculadora de costo, no una recomendación de consumo.
 */
export default function PriceBlock({ options, verified }: { options: P[]; verified: string }) {
  const [k, setK] = useState(options[0].key);
  const [perWeek, setPerWeek] = useState(4);
  const p = options.find((o) => o.key === k)!;
  const perStick = p.price / p.size;
  const sticks = Math.ceil(perWeek * WEEKS_PER_MONTH);
  const packs = Math.max(1, Math.ceil(sticks / p.size));
  const cost = packs * p.price;
  const sold = options.filter((o) => !o.inStock);

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="card card-static spot relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-drink/10 blur-3xl" />
        <div className="relative">
          <div className="inline-flex rounded-full bg-fxsky p-1" role="tablist" aria-label="Presentación">
            {options
              .filter((o) => o.inStock)
              .map((o) => (
                <button
                  key={o.key}
                  role="tab"
                  type="button"
                  aria-selected={o.key === k}
                  onClick={() => setK(o.key)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${o.key === k ? "bg-white text-fxbluedeep shadow" : "text-[var(--muted)] hover:text-fxink"}`}
                >
                  {o.label}
                </button>
              ))}
          </div>
          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_1.1fr]">
            <div className="relative mx-auto aspect-square w-full max-w-[240px]">
              <Image key={p.img} src={p.img} alt={p.alt} fill sizes="240px" className="object-contain" style={{ animation: "fadeup .45s ease both" }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--muted)]">Doypack de {p.size} sticks × 5 g</p>
              <p className="font-display text-6xl font-extrabold tracking-tight text-fxink" aria-live="polite">
                {money(p.price)}
              </p>
              <p className="mt-1 text-lg">
                <strong className="text-prune">{money(perStick)}</strong> <span className="text-[var(--muted)]">por stick</span>
              </p>
              <p className="mt-3 text-xs text-[var(--muted)]">Precio de catálogo verificado el {verified}. El envío se calcula en el checkout.</p>
              {sold.length > 0 && (
                <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                  {sold.map((s) => s.label).join(", ")}: agotada
                </p>
              )}
            </div>
          </div>
          <BuyLink source={`home-precio-${p.key}`} className="btn btn-buy shine mt-7 w-full" magnetic>
            Comprar {p.label.toLowerCase()} · {money(p.price)}
          </BuyLink>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#06324d] via-[#0b1820] to-[#3d0d20] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fxlime/15 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-fxlime">Calculadora de presupuesto</p>
        <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">¿Cuánto gastarías al mes?</h3>
        <p className="mt-2 text-sm text-white/65">
          Mueve el control según cuántas veces por semana preparas una taza. Solo calcula el costo: no es una recomendación de consumo; sigue la
          etiqueta y consulta a un profesional si tienes dudas.
        </p>
        <label htmlFor="px-week" className="mt-6 flex items-center justify-between text-sm font-semibold">
          <span>Tazas por semana</span>
          <span className="rounded-full bg-white/10 px-3 py-1 font-display text-lg">{perWeek}</span>
        </label>
        <input
          id="px-week"
          type="range"
          min={1}
          max={7}
          step={1}
          value={perWeek}
          onChange={(e) => setPerWeek(Number(e.target.value))}
          className="mt-3 w-full accent-[#8CC63F]"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-white/45">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            ["Sticks / mes", String(sticks)],
            [`Doypacks de ${p.size}`, String(packs)],
            ["Costo mensual", money(cost)],
          ].map(([l, val], i) => (
            <div key={l} className={`glass flex flex-col-reverse p-3 ${i === 2 ? "border-fxlime/50 bg-fxlime/10" : ""}`}>
              <dt className="mt-1 text-[0.7rem] leading-tight text-white/60">{l}</dt>
              <dd className={`font-display font-extrabold ${i === 2 ? "text-xl text-fxlime sm:text-2xl" : "text-2xl sm:text-3xl"}`}>{val}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-white/50">
          Estimación: {perWeek} × 4.33 semanas = {sticks} sticks. Con la presentación de {p.size} sticks necesitarías {packs}{" "}
          {packs === 1 ? "doypack" : "doypacks"}
          {packs * p.size > sticks ? ` (te sobrarían ${packs * p.size - sticks} sticks para el mes siguiente)` : ""}.
        </p>
      </div>
    </div>
  );
}
