import { product } from "@/lib/content";

/** Bloque separado con las afirmaciones oficiales de FuXion, marcadas como comerciales (no testimonios). */
export default function ManufacturerClaims() {
  return (
    <section className="not-prose mt-12 rounded-3xl border border-amber-300/60 bg-amber-50/70 p-6 sm:p-7" aria-labelledby="afirmaciones-fabricante">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">📣 Comunicación comercial</p>
      <h2 id="afirmaciones-fabricante" className="mt-1 font-display text-2xl font-extrabold">
        Afirmaciones del fabricante (comerciales)
      </h2>
      <p className="mt-2 text-sm text-[#5b4a1f]">
        Esto es lo que FuXion comunica sobre Prunex1 en su ficha oficial. No son opiniones de clientes ni resultados verificados por este sitio:
        las mostramos aparte para que puedas distinguirlas.
      </p>
      <ul className="mt-4 grid gap-2">
        {product.officialBenefits.map((b) => (
          <li key={b} className="flex gap-3 rounded-xl bg-white/80 px-4 py-3 text-[0.97rem] text-fxink">
            <span className="mt-0.5 shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[0.65rem] font-bold uppercase text-amber-800">FuXion dice</span>
            {b}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-[#5b4a1f]">
        Descripción oficial: “{product.officialDescription}” · Restricciones según FuXion: {product.officialRestrictions}
      </p>
    </section>
  );
}
