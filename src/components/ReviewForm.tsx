"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CHAT_ENDPOINT_PUBLIC } from "@/lib/client-constants";

/** Formulario para que clientes reales dejen su opinión. Se modera en el panel antes de publicarse. */
export default function ReviewForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");
  const [rating, setRating] = useState(5);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      const r = await fetch(CHAT_ENDPOINT_PUBLIC, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          mode: "submit_review",
          name: f.get("name"),
          city: f.get("city"),
          email: f.get("email"),
          order_reference: f.get("order"),
          comment: f.get("comment"),
          rating,
          consent: f.get("consent") === "on",
          website: f.get("website"),
          page_url: location.href,
        }),
      });
      const d = await r.json();
      if (d.ok) setState("ok");
      else {
        setErr(d.error || "No se pudo enviar.");
        setState("error");
      }
    } catch {
      setErr("No se pudo enviar. Intenta de nuevo.");
      setState("error");
    }
  };
  if (state === "ok")
    return (
      <div id="deja-tu-opinion" className="not-prose mt-12 rounded-3xl border border-fxlime/50 bg-fxcream/50 p-8 text-center">
        <p className="font-display text-2xl font-extrabold">¡Gracias por tu opinión!</p>
        <p className="mt-2 text-[var(--muted)]">La revisaremos y, si podemos verificar la compra, la publicaremos con tu nombre y ciudad.</p>
      </div>
    );
  const form = (
    <section id="deja-tu-opinion" className="not-prose mt-12 rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8">
      <h2 className="font-display text-3xl font-extrabold">¿Ya probaste Prunex1? Cuéntanos</h2>
      <p className="mt-2 text-[var(--muted)]">
        Solo publicamos opiniones de clientes reales, con su consentimiento y tras verificar la compra. No editamos el sentido de tu comentario, sea
        positivo o negativo. Por favor, no incluyas datos de salud sensibles ni diagnósticos.
      </p>
      <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
        <label className="grid gap-1 text-sm font-semibold">
          Nombre y apellido*
          <input name="name" required maxLength={80} className="rounded-xl border border-[var(--line)] px-4 py-3 font-normal outline-none focus:border-fxblue" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Ciudad
          <input name="city" maxLength={80} placeholder="Ej. Lima, Arequipa" className="rounded-xl border border-[var(--line)] px-4 py-3 font-normal outline-none focus:border-fxblue" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Correo (no se publica)
          <input name="email" type="email" maxLength={120} className="rounded-xl border border-[var(--line)] px-4 py-3 font-normal outline-none focus:border-fxblue" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          N.º de pedido (para verificar)
          <input name="order" maxLength={80} className="rounded-xl border border-[var(--line)] px-4 py-3 font-normal outline-none focus:border-fxblue" />
        </label>
        <div className="sm:col-span-2">
          <p className="text-sm font-semibold">Tu valoración</p>
          <div className="mt-1 flex gap-1" role="radiogroup" aria-label="Valoración">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                role="radio"
                aria-checked={rating === n}
                onClick={() => setRating(n)}
                className={`text-3xl transition ${n <= rating ? "text-amber-400" : "text-slate-300"}`}
                aria-label={`${n} de 5`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <label className="grid gap-1 text-sm font-semibold sm:col-span-2">
          Tu experiencia*
          <textarea name="comment" required minLength={20} maxLength={2000} rows={5} placeholder="¿Cómo lo preparas, qué te pareció el sabor y la textura, cómo fue tu experiencia de compra?" className="rounded-xl border border-[var(--line)] px-4 py-3 font-normal outline-none focus:border-fxblue" />
        </label>
        <label className="flex items-start gap-3 text-sm sm:col-span-2">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#0093DD]" />
          <span>Autorizo publicar mi comentario con mi nombre y ciudad en prunex1.com, conforme a la <Link href="/politica-de-privacidad/" className="text-fxblue underline">política de privacidad</Link>.</span>
        </label>
        {state === "error" && <p className="text-sm text-rose-600 sm:col-span-2">{err}</p>}
        <button disabled={state === "sending"} className="btn btn-buy sm:col-span-2 disabled:opacity-60">
          {state === "sending" ? "Enviando…" : "Enviar mi opinión"}
        </button>
      </form>
    </section>
  );
  if (!compact) return form;
  return (
    <details className="not-prose card card-static mt-12 p-5">
      <summary className="cursor-pointer list-none font-display text-lg font-bold text-fxink">
        ✍️ ¿Compraste Prunex1? Deja tu opinión (moderada) <span className="text-fxbluedeep">→</span>
      </summary>
      {form}
    </details>
  );
}
