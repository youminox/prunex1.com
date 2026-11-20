"use client";

import { useEffect, useState } from "react";
import { CHAT_ENDPOINT_PUBLIC } from "@/lib/client-constants";

type R = { id: string; name: string; city: string | null; rating: number | null; comment: string; verified_purchase: boolean; created_at: string };

/**
 * Opiniones reales aprobadas en el panel, con insignia visible de "Compra verificada" u "Opinión no verificada".
 * `hideIfEmpty`: no renderiza nada si no hay opiniones aprobadas (uso en la home).
 */
export default function ApprovedReviews({ hideIfEmpty = false, limit, title = "Opiniones de clientes" }: { hideIfEmpty?: boolean; limit?: number; title?: string }) {
  const [list, setList] = useState<R[] | null>(null);
  useEffect(() => {
    fetch(CHAT_ENDPOINT_PUBLIC, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ mode: "reviews" }) })
      .then((r) => r.json())
      .then((d) => setList(Array.isArray(d.reviews) ? d.reviews : []))
      .catch(() => setList([]));
  }, []);
  if (hideIfEmpty && (!list || list.length === 0)) return null;
  const shown = limit && list ? list.slice(0, limit) : list;
  return (
    <section className="not-prose mt-12" aria-labelledby="opiniones-clientes">
      <h2 id="opiniones-clientes" className="font-display text-3xl font-extrabold">
        {title}
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Publicamos opiniones de personas reales con su consentimiento. Cada una lleva una insignia: <strong>Compra verificada</strong> (confirmamos el
        pedido) u <strong>Opinión no verificada</strong> (no pudimos confirmarlo).
      </p>
      {shown === null ? (
        <p className="mt-3 text-[var(--muted)]">Cargando opiniones…</p>
      ) : shown.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-[var(--line)] p-6 text-[var(--muted)]">
          Todavía no hay opiniones publicadas. Preferimos mostrar cero a mostrar testimonios inventados: las primeras aparecerán aquí cuando las
          revisemos. <a href="#deja-tu-opinion" className="font-semibold text-fxbluedeep underline">Sé de los primeros en opinar</a>.
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {shown.map((r) => (
            <figure key={r.id} className="card card-static p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                {r.rating ? (
                  <p className="text-amber-400" aria-label={`${r.rating} de 5`}>
                    {"★".repeat(r.rating)}
                    <span className="text-slate-300">{"★".repeat(5 - r.rating)}</span>
                  </p>
                ) : (
                  <span />
                )}
                {r.verified_purchase ? (
                  <span className="rounded-full bg-fxlime/20 px-2.5 py-1 text-xs font-bold text-[#3b630c]">✓ Compra verificada</span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">Opinión no verificada</span>
                )}
              </div>
              <blockquote className="mt-2 text-[0.98rem] leading-relaxed text-fxink">“{r.comment}”</blockquote>
              <figcaption className="mt-3 text-sm text-[var(--muted)]">
                <strong className="text-fxink">{r.name}</strong>
                {r.city ? ` · ${r.city}` : ""} · {new Date(r.created_at).toLocaleDateString("es-PE", { month: "long", year: "numeric" })}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
