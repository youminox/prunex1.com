import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import BuyLink from "@/components/BuyLink";
import { SITE_URL, LEGAL_LINE, product } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre el distribuidor autorizado de Prunex1 | prunex1.com",
  description: "Quién está detrás de prunex1.com: Carlos Eden Lingan Borja, distribuidor autorizado independiente de FuXion en Lima, Perú.",
  alternates: { canonical: `${SITE_URL}/sobre-el-distribuidor/` },
};

export default function Page() {
  return (
    <SimplePage title="Sobre el distribuidor" crumb="Sobre el distribuidor" href="/sobre-el-distribuidor/" intro="Quién escribe y revisa esta guía, y por qué.">
      <p>
        <strong>{LEGAL_LINE}.</strong> Carlos es distribuidor autorizado independiente de FuXion y gestiona la tienda oficial FuXion desde la que se
        compran los productos enlazados en este sitio.
      </p>
      <h2>Por qué existe prunex1.com</h2>
      <p>
        Prunex1 genera muchas preguntas —qué es, si tiene azúcar, cómo se prepara, cuánto cuesta, quién no debería tomarlo— y las respuestas en
        internet suelen mezclar testimonios sin respaldo con promesas exageradas. Este sitio reúne la información de la etiqueta oficial y la explica
        con claridad, separando lo verificable de lo comercial.
      </p>
      <h2>Lo que este sitio no es</h2>
      <ul>
        <li>No es la web corporativa de FuXion ni de FuXion Biotech S.A.C.</li>
        <li>No es un servicio médico ni sustituye la consulta con un profesional de salud.</li>
        <li>No publica testimonios inventados ni valoraciones falsas.</li>
      </ul>
      <h2>Fabricante del producto</h2>
      <p>
        Prunex1 es fabricado por {product.manufacturer.name} ({product.manufacturer.address}). FuXion opera desde {product.manufacturer.since} y está
        presente en {product.manufacturer.countries}.
      </p>
      <h2>Transparencia comercial</h2>
      <p>
        Carlos recibe una comisión por las compras realizadas desde los enlaces de este sitio, sin costo adicional para ti (Ley N.º 29571). Consulta la{" "}
        <Link href="/politica-editorial/">política editorial</Link> para ver cómo se revisa cada guía.
      </p>
      <div className="not-prose my-6">
        <BuyLink source="sobre-distribuidor">Visitar la tienda oficial</BuyLink>
      </div>
    </SimplePage>
  );
}
