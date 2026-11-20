import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_LINE, NOT_MEDICINE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Aviso legal | prunex1.com",
  description: "Aviso legal de prunex1.com: titular, distribuidor autorizado FuXion en Lima, Perú, naturaleza del sitio, comisiones y condiciones de uso.",
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function Page() {
  return (
    <SimplePage title="Aviso legal" crumb="Aviso legal" href="/aviso-legal/" intro="Última actualización: 19 de noviembre de 2026.">
      <h2>1. Titular del sitio</h2>
      <p>
        <strong>{LEGAL_LINE}.</strong> Es el responsable del sitio web prunex1.com (en adelante, «el sitio») y actúa como distribuidor independiente
        autorizado de productos FuXion.
      </p>
      <h2>2. Naturaleza del sitio</h2>
      <p>
        El sitio es una guía informativa especializada en el producto Prunex1 de FuXion. <strong>No es la web corporativa de FuXion</strong> ni de
        FuXion Biotech S.A.C. o sus empresas vinculadas. Las marcas FuXion® y Prunex1 pertenecen a sus respectivos titulares y se mencionan solo con
        fines descriptivos.
      </p>
      <h2>3. Compras y comisiones</h2>
      <p>
        En el sitio no se venden productos directamente. Los botones de compra dirigen a la tienda oficial FuXion del distribuidor
        (carlos-lingan.site.fuxion.com), donde se gestionan precio, pago, comprobante, envío y atención posventa según las condiciones de esa
        plataforma. Conforme al deber de información de la Ley N.º 29571, Código de Protección y Defensa del Consumidor, te informamos que{" "}
        <strong>el distribuidor recibe una comisión por las compras realizadas a través de esos enlaces</strong>, sin costo adicional para ti.
      </p>
      <h2>4. Información de salud</h2>
      <p>
        El contenido es informativo y se basa en la etiqueta oficial del producto, en la ficha de FuXion y en fuentes públicas. No constituye consejo
        médico, diagnóstico ni tratamiento. Prunex1 {NOT_MEDICINE}. Según FuXion, no es apto para embarazadas, madres en lactancia ni personas con
        tránsito intestinal normal. Consulta a un profesional de salud si tienes alguna condición o tomas medicación.
      </p>
      <h2>5. Precios</h2>
      <p>
        Los precios mostrados (S/ 76.00 el doypack de 28 sticks y S/ 21.00 el de 7 sticks) son referenciales y corresponden al catálogo verificado el
        19/11/2026. El precio final y el costo de envío son los que figuran en la tienda oficial al momento de la compra.
      </p>
      <h2>6. Propiedad intelectual</h2>
      <p>
        Los textos y las imágenes de ambiente de este sitio son originales. Las fotografías del empaque y la etiqueta pertenecen a FuXion y se usan
        para identificar el producto. No se permite su reproducción sin autorización.
      </p>
      <h2>7. Responsabilidad</h2>
      <p>
        El titular procura que la información sea exacta y esté actualizada, pero no garantiza la ausencia de errores. Si detectas uno, escríbenos
        desde <Link href="/contacto/">contacto</Link>. No nos responsabilizamos del contenido de sitios de terceros enlazados.
      </p>
      <h2>8. Legislación aplicable</h2>
      <p>
        Este aviso se rige por las leyes de la República del Perú, incluida la Ley N.º 29571. Para cualquier controversia serán competentes los jueces
        y tribunales de Lima, sin perjuicio de los derechos que la ley reconoce al consumidor.
      </p>
      <p>
        Consulta también la <Link href="/politica-de-privacidad/">política de privacidad</Link>, la{" "}
        <Link href="/politica-de-cookies/">política de cookies</Link> y la <Link href="/politica-editorial/">política editorial</Link>.
      </p>
    </SimplePage>
  );
}
