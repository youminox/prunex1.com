import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_LINE, NOT_MEDICINE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política editorial | prunex1.com",
  description: "Cómo se escriben y revisan las guías de prunex1.com: etiqueta oficial como fuente, afirmaciones comerciales marcadas, sin testimonios inventados.",
  alternates: { canonical: `${SITE_URL}/politica-editorial/` },
};

export default function Page() {
  return (
    <SimplePage title="Política editorial" crumb="Política editorial" href="/politica-editorial/" intro="Cómo trabajamos cada guía sobre Prunex1.">
      <p>
        <strong>{LEGAL_LINE}.</strong> Es quien revisa el contenido del sitio. Como distribuidor recibe una comisión por las compras hechas desde
        aquí (Ley N.º 29571); por eso aplicamos estas reglas para que la información sea útil y no solo comercial.
      </p>
      <h2>1. La etiqueta manda</h2>
      <p>
        Los datos de composición, tabla nutricional, modo de empleo y advertencias se copian de la etiqueta oficial peruana de Prunex1 y de la ficha
        de FuXion. Si algo no está declarado (por ejemplo, la cantidad de cada fibra por stick), lo decimos en lugar de suponerlo.
      </p>
      <h2>2. Afirmaciones comerciales, siempre marcadas</h2>
      <p>
        Lo que comunica FuXion sobre beneficios se presenta como «lo que comunica la marca» o «afirmación comercial», separado de la información
        verificable.
      </p>
      <h2>3. Sin promesas de salud</h2>
      <p>
        Prunex1 {NOT_MEDICINE}. No publicamos protocolos de dosis, horarios ni duraciones distintas a lo que indica la etiqueta, ni comparaciones con
        laxantes químicos. Los temas sensibles (embarazo, enfermedades, medicación, niños) se tratan con prudencia y remitiendo a un profesional de
        salud.
      </p>
      <h2>4. Opiniones reales o ninguna</h2>
      <p>
        No inventamos testimonios ni puntuaciones. Las opiniones se publican con consentimiento y una insignia visible: «Compra verificada» u «Opinión
        no verificada». Sin opiniones aprobadas, no mostramos valoraciones.
      </p>
      <h2>5. Fuentes y actualización</h2>
      <p>
        Cuando citamos ciencia general sobre fibras usamos fuentes públicas y lo aclaramos: no son estudios del producto. Revisamos precios y
        presentaciones periódicamente e indicamos la fecha de verificación.
      </p>
      <h2>6. Correcciones</h2>
      <p>
        Si encuentras un error, avísanos desde <Link href="/contacto/">contacto</Link>. Corregimos y actualizamos la fecha de la guía.
      </p>
    </SimplePage>
  );
}
