import Link from "next/link";
import Image from "next/image";
import { getCategories, getArticlesIn, LEGAL_LINE, NOT_MEDICINE, product } from "@/lib/content";
import BuyLink from "./BuyLink";
import { LogoMark } from "./Logo";

export default function Footer() {
  const cats = getCategories();
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0b1820] text-white/80">
      <div className="pointer-events-none absolute -top-40 left-1/3 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-fxblue/25 blur-3xl" />
      <div className="pointer-events-none absolute -top-40 right-0 h-80 w-[30rem] rounded-full bg-prune/30 blur-3xl" />
      <div className="wrap relative grid gap-12 py-16 lg:grid-cols-[1.25fr_2fr]">
        <div>
          <p className="flex items-center gap-3 font-display text-2xl font-extrabold text-white">
            <LogoMark className="h-10 w-10" />
            <span>
              Prunex<span className="text-fxlime">1</span> Perú
            </span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Guía independiente sobre Prunex1 de FuXion: qué es, ingredientes, preparación, precio y opiniones verificables, con datos tomados de la
            etiqueta oficial.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BuyLink source="footer" className="btn btn-lime shine">
              Comprar en la tienda oficial
            </BuyLink>
            <Link href="/comprar-prunex1/" className="btn btn-glass">
              Ficha del producto
            </Link>
          </div>
          <Image src={product.images.seals} alt="Sellos de la etiqueta de Prunex1: No GMO, sin gluten, bajo en sodio, Clean Label" width={1000} height={104} className="mt-8 h-auto w-full max-w-sm opacity-90" />
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {cats.map((c) => (
            <div key={c.slug}>
              <Link href={`/${c.slug}/`} className="font-display font-bold text-white hover:text-fxlime">
                {c.name}
              </Link>
              <ul className="mt-3 space-y-1.5 text-sm">
                {getArticlesIn(c.slug)
                  .slice(0, 4)
                  .map((a) => (
                    <li key={a.path}>
                      <Link href={a.path} className="hover:text-white">
                        {a.title.length > 48 ? a.title.slice(0, 46) + "…" : a.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="wrap relative">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-xs leading-relaxed text-white/65">
          <p>
            <strong className="text-white/90">{LEGAL_LINE}.</strong> Este sitio no es la web corporativa de FuXion ni de FuXion Biotech S.A.C.; es
            un sitio informativo de un distribuidor independiente. Las compras se realizan en la tienda oficial FuXion del distribuidor.
          </p>
          <p className="mt-2">
            Divulgación comercial (Ley N.º 29571, Código de Protección y Defensa del Consumidor): el distribuidor recibe una comisión por las compras
            realizadas a través de los enlaces de este sitio, sin costo adicional para ti.
          </p>
          <p className="mt-2">
            Prunex1 {NOT_MEDICINE}. El contenido es informativo y no reemplaza la consulta con un profesional de salud.
          </p>
        </div>
      </div>
      <div className="mt-8 border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 prunex1.com · Prunex1 y FuXion son marcas de sus respectivos titulares.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
            <Link href="/sobre-el-distribuidor/" className="hover:text-white">Sobre el distribuidor</Link>
            <Link href="/contacto/" className="hover:text-white">Contacto</Link>
            <Link href="/envios-y-devoluciones/" className="hover:text-white">Envíos y devoluciones</Link>
            <Link href="/aviso-legal/" className="hover:text-white">Aviso legal</Link>
            <Link href="/politica-de-privacidad/" className="hover:text-white">Privacidad</Link>
            <Link href="/politica-de-cookies/" className="hover:text-white">Cookies</Link>
            <Link href="/politica-editorial/" className="hover:text-white">Política editorial</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
