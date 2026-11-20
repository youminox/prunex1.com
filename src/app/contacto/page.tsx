import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import BuyLink from "@/components/BuyLink";
import OpenChatButton from "@/components/OpenChatButton";
import { SITE_URL, LEGAL_LINE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto | prunex1.com",
  description: "Contacta con el distribuidor autorizado de Prunex1 en Lima: dudas sobre el producto, pedidos en la tienda oficial y correcciones de contenido.",
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function Page() {
  return (
    <SimplePage title="Contacto" crumb="Contacto" href="/contacto/" intro="¿Tienes una duda sobre Prunex1 o sobre tu pedido? Estas son las vías más rápidas.">
      <p>
        <strong>{LEGAL_LINE}.</strong>
      </p>
      <h2>Dudas sobre el producto</h2>
      <p>El asesor virtual responde al instante preguntas sobre precio, preparación según la etiqueta, ingredientes y envíos.</p>
      <div className="not-prose my-5">
        <OpenChatButton />
      </div>
      <h2>Pedidos, pagos y envíos</h2>
      <p>
        Las compras se gestionan en la tienda oficial FuXion del distribuidor. Desde ahí puedes ver el estado de tu pedido y contactar con atención
        al cliente.
      </p>
      <div className="not-prose my-5">
        <BuyLink source="contacto">Ir a la tienda oficial</BuyLink>
      </div>
      <h2>Correcciones y protección de datos</h2>
      <p>
        Si encuentras un error en una guía o quieres ejercer tus derechos ARCO (Ley N.º 29733), escríbenos mediante el asesor virtual indicando
        «Corrección» o «Protección de datos» y tus datos de contacto. Respondemos en un plazo razonable. Más información en la{" "}
        <Link href="/politica-de-privacidad/">política de privacidad</Link>.
      </p>
      <h2>Consultas de salud</h2>
      <p>
        No podemos dar consejo médico personalizado. Si tienes síntomas digestivos persistentes, una enfermedad o tomas medicación, consulta a un
        profesional de salud antes de consumir cualquier producto con fibra.
      </p>
    </SimplePage>
  );
}
