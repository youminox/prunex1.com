import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_LINE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de cookies | prunex1.com",
  description: "Qué cookies y almacenamiento local usa prunex1.com, para qué sirven y cómo desactivarlos.",
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function Page() {
  return (
    <SimplePage title="Política de cookies" crumb="Cookies" href="/politica-de-cookies/" intro="Última actualización: 19 de noviembre de 2026.">
      <p>
        <strong>{LEGAL_LINE}.</strong> En prunex1.com usamos el mínimo de tecnologías de almacenamiento necesarias para que el sitio funcione.
      </p>
      <h2>Qué usamos</h2>
      <ul>
        <li>
          <strong>Almacenamiento local del chat</strong> (px_chat_messages, px_chat_session, px_visitor): guarda tu conversación con el asesor
          virtual y un identificador anónimo para que no la pierdas al cambiar de página.
        </li>
        <li>
          <strong>Almacenamiento de sesión</strong> (px_teaser): recuerda que ya viste el aviso del asesor para no repetirlo.
        </li>
        <li>
          <strong>Medición anónima de clics</strong> en los botones de compra, sin cookies de publicidad ni perfiles personales.
        </li>
      </ul>
      <h2>Terceros</h2>
      <p>
        El video oficial de FuXion se carga desde Vimeo solo si haces clic en reproducir (modo «dnt=1», sin seguimiento). La tienda oficial FuXion, a
        la que te llevan los botones de compra, usa sus propias cookies bajo su política.
      </p>
      <h2>Cómo desactivarlas</h2>
      <p>
        Puedes borrar o bloquear el almacenamiento local y las cookies desde la configuración de tu navegador. El sitio seguirá funcionando, aunque el
        chat no recordará tu conversación.
      </p>
      <p>
        Más detalles en la <Link href="/politica-de-privacidad/">política de privacidad</Link>.
      </p>
    </SimplePage>
  );
}
