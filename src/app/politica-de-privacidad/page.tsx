import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_LINE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidad | prunex1.com",
  description: "Cómo prunex1.com trata tus datos personales conforme a la Ley N.º 29733 de Protección de Datos Personales del Perú y su reglamento.",
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function Page() {
  return (
    <SimplePage title="Política de privacidad" crumb="Privacidad" href="/politica-de-privacidad/" intro="Última actualización: 19 de noviembre de 2026.">
      <h2>Responsable del tratamiento</h2>
      <p>
        <strong>{LEGAL_LINE}.</strong> Tratamos tus datos conforme a la Ley N.º 29733, Ley de Protección de Datos Personales, y su reglamento vigente.
      </p>
      <h2>Qué datos recogemos</h2>
      <ul>
        <li>
          <strong>Asesor virtual (chat):</strong> los mensajes que escribes, un identificador anónimo del navegador, la página desde la que escribes y
          datos técnicos básicos. No necesitas dar datos personales para usarlo; te pedimos no compartir información sensible de salud.
        </li>
        <li>
          <strong>Formulario de opiniones:</strong> nombre, ciudad, correo (opcional), número de pedido (opcional, para verificar la compra),
          valoración y comentario.
        </li>
        <li>
          <strong>Clics en enlaces de compra:</strong> registramos de forma anónima desde qué página y botón se hizo clic, para medir qué contenidos
          son útiles.
        </li>
      </ul>
      <h2>Para qué los usamos</h2>
      <ul>
        <li>Responder tus consultas sobre Prunex1 mediante un sistema de inteligencia artificial.</li>
        <li>Verificar y, con tu consentimiento expreso, publicar tu opinión con tu nombre y ciudad (nunca tu correo ni tu número de pedido).</li>
        <li>Mejorar el contenido y medir el uso del sitio de forma agregada.</li>
      </ul>
      <h2>Base legal</h2>
      <p>Tu consentimiento (formulario y chat) y nuestro interés legítimo en medir de forma anónima el uso del sitio.</p>
      <h2>Encargados y transferencias</h2>
      <p>
        Los datos se alojan en Supabase y Vercel, y los mensajes del chat se procesan con un proveedor de inteligencia artificial para generar
        respuestas. Estos proveedores pueden estar ubicados fuera del Perú (flujo transfronterizo) y actúan como encargados del tratamiento.
      </p>
      <h2>Conservación</h2>
      <p>Conservamos las conversaciones hasta 12 meses y las opiniones mientras estén publicadas o hasta que solicites su eliminación.</p>
      <h2>Tus derechos (ARCO)</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición escribiendo a través del asesor virtual o de la tienda oficial,
        indicando «Protección de datos». Si consideras que no hemos atendido tu solicitud, puedes acudir a la Autoridad Nacional de Protección de
        Datos Personales del Ministerio de Justicia y Derechos Humanos.
      </p>
      <h2>Datos en tu navegador</h2>
      <p>
        El chat guarda en el almacenamiento local de tu navegador (localStorage) tu conversación y un identificador anónimo (claves
        px_chat_messages, px_chat_session y px_visitor). Puedes borrarlos con el botón «Reiniciar» del chat o desde la configuración de tu navegador.
      </p>
      <h2>Compras</h2>
      <p>
        Los datos de compra, pago y envío se gestionan en la tienda oficial FuXion (carlos-lingan.site.fuxion.com) bajo su propia política de
        privacidad.
      </p>
    </SimplePage>
  );
}
