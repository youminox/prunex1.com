"use client";

import { useState } from "react";
import BuyLink from "./BuyLink";

export type Presentation = {
  sku: string;
  name: string;
  price: number;
  formattedPrice: string;
  perStick: string;
  inStock: boolean;
  main: boolean;
  key: string;
  label: string;
};

/** Selector de presentación (28 / 7 / caja 7 agotada) con precio, costo por stick y CTA principal. */
export default function PurchasePanel({ presentations, verified }: { presentations: Presentation[]; verified: string }) {
  const [sel, setSel] = useState(presentations.find((p) => p.main)?.sku ?? presentations[0].sku);
  const cur = presentations.find((p) => p.sku === sel)!;
  const choose = (p: Presentation) => {
    if (!p.inStock) return;
    setSel(p.sku);
    window.dispatchEvent(new CustomEvent("px:presentation", { detail: p.key }));
  };
  return (
    <div>
      <fieldset>
        <legend className="text-sm font-semibold text-fxink">Elige la presentación</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {presentations.map((p) => {
            const on = p.sku === sel;
            return (
              <button
                key={p.sku}
                type="button"
                onClick={() => choose(p)}
                disabled={!p.inStock}
                aria-pressed={on}
                className={`relative rounded-2xl border-2 p-3 text-left transition ${
                  !p.inStock
                    ? "cursor-not-allowed border-dashed border-[var(--line)] bg-slate-50 opacity-70"
                    : on
                      ? "border-fxblue bg-fxsky shadow-[0_10px_30px_-18px_rgba(0,147,221,0.8)]"
                      : "border-[var(--line)] bg-white hover:border-fxblue/50"
                }`}
              >
                {p.main && p.inStock && (
                  <span className="absolute -top-2.5 right-3 rounded-full bg-fxlime px-2 py-0.5 text-[0.62rem] font-bold uppercase text-[#1f3105]">Más conveniente</span>
                )}
                <span className="block font-display font-bold leading-tight text-fxink">{p.label}</span>
                <span className="mt-1 block text-sm text-[var(--muted)]">
                  {p.inStock ? (
                    <>
                      {p.formattedPrice} · {p.perStick}/stick
                    </>
                  ) : (
                    <span className="font-semibold text-rose-600">Agotada</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-1">
        <p className="whitespace-nowrap font-display text-5xl font-extrabold text-fxink" aria-live="polite">
          {cur.formattedPrice}
        </p>
        <p className="pb-1.5 text-[var(--muted)]">
          <strong className="text-fxink">{cur.perStick}</strong> por stick · {cur.name}
        </p>
      </div>
      <p className="mt-1 text-xs text-[var(--muted)]">
        Precio de catálogo verificado el {verified} en la tienda oficial. El precio final y el costo de envío se confirman en el checkout.
      </p>

      <BuyLink source={`ficha-principal-${cur.sku}`} className="btn btn-buy shine mt-6 w-full text-lg" magnetic>
        Comprar {cur.label.toLowerCase()} en la tienda oficial →
      </BuyLink>
      <p className="mt-2 text-center text-xs text-[var(--muted)]">
        En la tienda oficial podrás elegir la presentación y la cantidad antes de pagar.
      </p>
    </div>
  );
}
