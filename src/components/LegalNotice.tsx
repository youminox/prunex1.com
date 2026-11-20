import { LEGAL_LINE, NOT_MEDICINE } from "@/lib/content";

/** Bloque legal obligatorio en todas las páginas legales/informativas. */
export default function LegalNotice() {
  return (
    <aside className="not-prose mt-12 rounded-2xl border border-[var(--line)] bg-fxsky/60 p-5 text-sm leading-relaxed text-[#1f3340]">
      <p className="font-display text-base font-bold text-fxink">Información legal</p>
      <p className="mt-2">
        <strong>{LEGAL_LINE}.</strong>
      </p>
      <p className="mt-2">
        Este sitio (prunex1.com) no es la web corporativa de FuXion ni de FuXion Biotech S.A.C.; es un sitio informativo independiente de un
        distribuidor autorizado.
      </p>
      <p className="mt-2">
        Divulgación comercial conforme a la Ley N.º 29571 (Código de Protección y Defensa del Consumidor): el distribuidor recibe una comisión por las
        compras realizadas a través de los enlaces de este sitio, sin costo adicional para el comprador.
      </p>
      <p className="mt-2">Prunex1 {NOT_MEDICINE}.</p>
    </aside>
  );
}
