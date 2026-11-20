import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import BuyLink from "@/components/BuyLink";
import { SITE_URL, LEGAL_LINE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Envíos y devoluciones de Prunex1 | prunex1.com",
  description: "Cómo funcionan los envíos de Prunex1 a Lima y provincias desde la tienda oficial FuXion, costo calculado en el checkout, cambios, devoluciones y Libro de Reclamaciones.",
  alternates: { canonical: `${SITE_URL}/envios-y-devoluciones/` },
};

export default function Page() {
  return (
    <SimplePage title="Envíos y devoluciones" crumb="Envíos y devoluciones" href="/envios-y-devoluciones/" intro="Última actualización: 19 de noviembre de 2026.">
      <p>
        <strong>{LEGAL_LINE}.</strong> Este sitio es informativo: los pedidos se realizan, pagan y despachan desde la tienda oficial FuXion del
        distribuidor (carlos-lingan.site.fuxion.com), según sus condiciones vigentes.
      </p>
      <h2>Zonas de envío</h2>
      <ul>
        <li>
          <strong>Lima Metropolitana y Callao:</strong> entrega a domicilio o recojo, según las opciones que muestre la tienda.
        </li>
        <li>
          <strong>Provincias:</strong> envío a todo el Perú mediante los operadores disponibles en el checkout.
        </li>
      </ul>
      <h2>Costo y plazo</h2>
      <p>
        <strong>El costo de envío se calcula en el checkout</strong> en función de tu dirección, el peso del pedido y el método elegido. El plazo
        estimado también se muestra antes de pagar. No publicamos tarifas fijas aquí porque pueden cambiar.
      </p>
      <h2>Al recibir tu pedido</h2>
      <ul>
        <li>Verifica que el doypack esté sellado y en buen estado.</li>
        <li>Revisa el lote, la fecha de vencimiento y el registro sanitario impreso en el reverso.</li>
        <li>Conserva el producto en un lugar fresco y seco, como indica la etiqueta.</li>
      </ul>
      <h2>Cambios y devoluciones</h2>
      <p>
        Si el producto llega dañado, incompleto o no corresponde a lo comprado, comunícalo cuanto antes a través de la tienda oficial, con fotos del
        empaque y tu número de pedido. Por tratarse de un alimento, solo se aceptan devoluciones de productos sin abrir, salvo defecto de origen. Tus
        derechos como consumidor están protegidos por la Ley N.º 29571, Código de Protección y Defensa del Consumidor, y puedes usar el Libro de
        Reclamaciones de la tienda.
      </p>
      <div className="not-prose my-6">
        <BuyLink source="envios">Ir a la tienda oficial</BuyLink>
      </div>
      <p>
        ¿Dudas sobre el precio o las presentaciones? Revisa la guía de <Link href="/precio-prunex1-peru/">precio de Prunex1 en Perú</Link>.
      </p>
    </SimplePage>
  );
}
