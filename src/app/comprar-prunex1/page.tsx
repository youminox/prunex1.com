import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs, { JsonLd } from "@/components/Breadcrumbs";
import BuyLink from "@/components/BuyLink";
import ClientEffects from "@/components/ClientEffects";
import ProductGallery, { type GalleryImage } from "@/components/ProductGallery";
import PurchasePanel, { type Presentation } from "@/components/PurchasePanel";
import VideoFacade from "@/components/VideoFacade";
import LegalNotice from "@/components/LegalNotice";
import { SITE_URL, LEGAL_LINE, NOT_MEDICINE, PRICE_VERIFIED_LABEL, PRODUCT_PATH, ambient, product, productLd, safeHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Comprar Prunex1 FuXion original | S/ 76.00 (28 sticks) en Perú",
  description:
    "Compra Prunex1 de FuXion original: doypack de 28 sticks x 5 g a S/ 76.00 (S/ 2.71 por stick) o 7 sticks a S/ 21.00 en la tienda oficial. Ingredientes, tabla nutricional, modo de empleo, registro sanitario y envíos.",
  alternates: { canonical: `${SITE_URL}${PRODUCT_PATH}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PRODUCT_PATH}`,
    title: "Comprar Prunex1 FuXion original en Perú – S/ 76.00",
    images: [{ url: product.images.pack28, width: 800, height: 800, alt: "Prunex1 FuXion doypack de 28 sticks" }],
  },
};

const n = product.nutrition;
const ROWS: [string, string, string, string][] = [
  ["Energía", `${n.per100ml.kcal.toFixed(1)} kcal / ${n.per100ml.kj} kJ`, `${n.perServing.kcal.toFixed(1)} kcal / ${n.perServing.kj} kJ`, `${n.dailyValuePct.kcal}%`],
  ["Grasa total", `${n.per100ml.fat.toFixed(1)} g`, `${n.perServing.fat.toFixed(1)} g`, `${n.dailyValuePct.fat.toFixed(1)}%`],
  ["Grasa saturada", `${n.per100ml.satFat.toFixed(1)} g`, `${n.perServing.satFat.toFixed(1)} g`, `${n.dailyValuePct.satFat.toFixed(1)}%`],
  ["Grasa trans", `${n.per100ml.transFat.toFixed(1)} g`, `${n.perServing.transFat.toFixed(1)} g`, "—"],
  ["Colesterol", `${n.per100ml.cholesterolMg.toFixed(1)} mg`, `${n.perServing.cholesterolMg.toFixed(1)} mg`, `${n.dailyValuePct.cholesterol.toFixed(1)}%`],
  ["Sodio", `${n.per100ml.sodiumMg} mg`, `${n.perServing.sodiumMg.toFixed(1)} mg`, `${n.dailyValuePct.sodium}%`],
  ["Carbohidratos totales", `${n.per100ml.carbs} g`, `${n.perServing.carbs} g`, `${n.dailyValuePct.carbs}%`],
  ["Fibra dietaria", `${n.per100ml.fiber} g`, `${n.perServing.fiber} g`, `${n.dailyValuePct.fiber.toFixed(1)}%`],
  ["Azúcares totales", `${n.per100ml.sugars} g`, `${n.perServing.sugars} g`, "—"],
  ["Azúcares añadidos", `${n.per100ml.addedSugars.toFixed(1)} g`, `${n.perServing.addedSugars.toFixed(1)} g`, `${n.dailyValuePct.addedSugars.toFixed(1)}%`],
  ["Proteínas", `${n.per100ml.protein.toFixed(1)} g`, `${n.perServing.protein.toFixed(1)} g`, `${n.dailyValuePct.protein.toFixed(1)}%`],
];

const FAQ = [
  {
    q: "¿Dónde se compra Prunex1 original?",
    a: "En la tienda oficial FuXion del distribuidor autorizado. Al hacer clic en «Comprar» llegas directamente a la página de Prunex1 en carlos-lingan.site.fuxion.com, donde eliges la presentación, pagas y coordinas la entrega.",
  },
  {
    q: "¿Cuánto cuesta y cuántos sticks trae?",
    a: `El doypack de 28 sticks de 5 g cuesta S/ 76.00 (S/ 2.71 por stick). El doypack de 7 sticks cuesta S/ 21.00 (S/ 3.00 por stick). La caja de 7 sticks figura agotada. Precios de catálogo verificados el ${PRICE_VERIFIED_LABEL}.`,
  },
  {
    q: "¿Hacen envíos a provincias?",
    a: "Sí. La tienda oficial despacha a Lima y a provincias. El costo y el plazo exactos se calculan en el checkout según tu dirección.",
  },
  {
    q: "¿Necesito ser socio de FuXion para comprar?",
    a: "No. Puedes comprar como cliente al precio de catálogo. Si te interesa afiliarte para acceder a precio de socio, el distribuidor puede orientarte.",
  },
  {
    q: "¿Cómo verifico que es original?",
    a: `Revisa que el empaque esté sellado, con lote y fecha de vencimiento, y compara el registro sanitario impreso en el reverso (en el empaque vigente figura ${product.registroSanitario.value}). Comprar en la tienda oficial evita productos de origen dudoso.`,
  },
];

const GALLERY: GalleryImage[] = [
  { key: "28", src: product.images.pack28, alt: "Prunex1 FuXion: doypack de 28 sticks x 5 g sabor guindón", w: 800, h: 800, contain: true },
  { src: product.images.pack28Cup, alt: "Doypack de Prunex1 con una taza preparada y guindones", w: 900, h: 900, contain: true },
  { src: product.images.hero, alt: "Prunex1 con stick, guindones, limón, anís estrella y taza", w: 660, h: 643, contain: true },
  { key: "7", src: product.images.pack7, alt: "Prunex1 FuXion: doypack de 7 sticks x 5 g", w: 800, h: 800, contain: true },
  { src: product.images.pack7Cup, alt: "Doypack de 7 sticks de Prunex1 con taza preparada", w: 900, h: 900, contain: true },
  { src: product.images.back28, alt: "Reverso de la etiqueta del doypack de 28 sticks de Prunex1", w: 1024, h: 1024, contain: true },
  { src: product.images.back7, alt: "Reverso de la etiqueta del doypack de 7 sticks de Prunex1", w: 1024, h: 1024, contain: true },
  { src: product.images.label, alt: "Información nutricional e ingredientes de Prunex1", w: 659, h: 1244, contain: true },
  { src: product.images.lifestyle, alt: "Doypack de Prunex1 en una cocina", w: 1600, h: 679 },
];

const PRESENTATIONS: Presentation[] = product.presentations.map((p) => ({
  ...p,
  key: p.main ? "28" : p.inStock ? "7" : "caja7",
  label: p.main ? "Doypack 28 sticks" : p.inStock ? "Doypack 7 sticks" : "Caja 7 sticks",
}));

export default function ComprarPage() {
  const poster = ambient("preparacion-paso-3", product.images.pack28Cup);
  return (
    <>
      <Header />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            productLd(),
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}${PRODUCT_PATH}#faq`,
              mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }}
      />
      <main className="pt-[68px]">
        <section className="relative overflow-hidden bg-gradient-to-b from-fxsky to-white">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-drink/15 blur-3xl" />
          <div className="wrap relative pb-16 pt-8">
            <Breadcrumbs items={[{ name: "Comprar Prunex1", href: PRODUCT_PATH }]} />
            <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-12">
              <ProductGallery images={GALLERY} />
              <div>
                <p className="eyebrow">FuXion · {product.line}</p>
                <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Comprar Prunex1 de FuXion original</h1>
                <p className="mt-3 text-lg text-[var(--muted)]">
                  {product.tagline}. {product.presentation} ({product.netWeight}).
                </p>
                <div className="mt-6">
                  <PurchasePanel presentations={PRESENTATIONS} verified={PRICE_VERIFIED_LABEL} />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  {[
                    ["Contenido", "28 sticks"],
                    ["Peso neto", product.netWeight],
                    ["Por stick", "5 g"],
                    ["Por taza", "180 ml"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl border border-[var(--line)] bg-white p-3 text-center">
                      <p className="text-xs text-[var(--muted)]">{k}</p>
                      <p className="font-display font-bold">{v}</p>
                    </div>
                  ))}
                </div>
                <ul className="mt-5 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
                  {["Producto original y sellado", "Envío a Lima y provincias", "Pago seguro en tienda oficial", "Distribuidor autorizado en Lima"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="text-[#5f9a22]">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="wrap grid grid-cols-1 gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="prose-fx min-w-0">
            <h2 id="que-dice-la-etiqueta">Lo que dice la etiqueta</h2>
            <p>
              En el frente del doypack se lee: <strong>“{product.tagline}”</strong>. Debajo, el empaque indica que está enriquecido con:
            </p>
            <ul>
              {product.packClaims.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p>Sellos declarados en el empaque: {product.seals.join(" · ")}.</p>
            <aside className="my-6 rounded-2xl border border-amber-300/60 bg-amber-50 p-5">
              <p className="!mb-1 text-xs font-bold uppercase tracking-wider text-amber-700">📣 Lo que comunica FuXion (afirmación comercial)</p>
              <ul className="!mb-0">
                {product.officialBenefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="!mb-0 mt-2 text-sm">
                Son mensajes de la marca, no resultados verificados por este sitio. Prunex1 {NOT_MEDICINE}.
              </p>
            </aside>

            <h2 id="ingredientes">Ingredientes (16)</h2>
            <p>Lista completa, en el orden de la etiqueta:</p>
            <figure className="my-6 overflow-x-auto rounded-2xl border border-[var(--line)]">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ingrediente</th>
                    <th>Función en la fórmula</th>
                  </tr>
                </thead>
                <tbody>
                  {product.ingredients.map((ing, i) => (
                    <tr key={ing.slug}>
                      <td>{i + 1}</td>
                      <td>
                        <strong>{ing.name}</strong>
                      </td>
                      <td>{ing.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <figcaption className="px-4 py-2 text-xs text-[var(--muted)]">Texto de la etiqueta: {product.ingredientsText}</figcaption>
            </figure>
            <p>
              ¿Qué hace cada uno? Lo explicamos en la <Link href="/ingredientes-prunex1/">guía de ingredientes y composición</Link>.
            </p>

            <h2 id="tabla-nutricional">Información nutricional</h2>
            <figure className="my-6 overflow-x-auto rounded-2xl border border-[var(--line)]">
              <table className="nowrap-table">
                <thead>
                  <tr>
                    <th>Nutriente</th>
                    <th>Por 100 ml</th>
                    <th>Por porción (180 ml)</th>
                    <th>% VD*</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r[0]}>
                      {r.map((c, i) => (
                        <td key={i}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <figcaption className="px-4 py-2 text-xs text-[var(--muted)]">
                Tamaño por ración: {n.servingSize}. {n.servingsPerPack} raciones por empaque. Fusión Prunex1: {n.fusionGrams.toFixed(1)} g. *{n.dvBasis}.
                Fuente: {n.labelVersion}.
              </figcaption>
            </figure>
            <ul>
              {product.notDeclared.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <h2 id="modo-de-empleo">Modo de empleo</h2>
            <ol>
              {product.preparation.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p>
              Texto de la etiqueta: <em>“{product.preparation.labelText}”</em> Más trucos (sin grumos, utensilios, conservación) en la{" "}
              <Link href="/como-preparar-prunex1/">guía de preparación</Link>.
            </p>

            <h2 id="video-oficial">Video oficial</h2>
            <VideoFacade poster={poster} />

            <h2 id="advertencias">Advertencias y registro sanitario</h2>
            <aside className="my-6 rounded-2xl border border-rose-300/60 bg-rose-50 p-5">
              <p className="!mb-1 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">⚕ Advertencias del empaque y de FuXion</p>
              <ul className="!mb-0">
                {product.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <p className="!mb-0 mt-2 text-sm">
                Si tienes una condición digestiva, tomas medicación o tienes dudas, consulta antes con un profesional de salud. Revisa las{" "}
                <Link href={safeHref("/opiniones-prunex1/contraindicaciones/")}>contraindicaciones</Link>.
              </p>
            </aside>
            <p>
              <strong>Registro sanitario:</strong> {product.registroSanitario.value} ({product.registroSanitario.source}).{" "}
              <strong>Verifica en tu empaque</strong>: {product.registroSanitario.note}
            </p>

            <h2 id="envios">Envíos</h2>
            <p>
              La tienda oficial FuXion despacha a Lima Metropolitana y a provincias. <strong>El costo de envío se calcula en el checkout</strong> según
              tu dirección y el método de entrega disponible; ahí también verás el plazo estimado antes de pagar. Más detalles en{" "}
              <Link href="/envios-y-devoluciones/">envíos y devoluciones</Link> y en la guía de{" "}
              <Link href={safeHref("/precio-prunex1-peru/envio-a-provincias/")}>envío a provincias</Link>.
            </p>

            <h2 id="como-comprar">Cómo comprar en 4 pasos</h2>
            <ol>
              <li>Haz clic en «Comprar en la tienda oficial».</li>
              <li>En la página de Prunex1 elige la presentación y la cantidad, y agrégalo al carrito.</li>
              <li>Ingresa tus datos y la dirección de entrega en Lima o provincias.</li>
              <li>Revisa el costo de envío, paga con el medio que prefieras y espera tu pedido.</li>
            </ol>

            <h2 id="confianza">¿Quién está detrás?</h2>
            <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
              <div className="card card-static p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-fxbluedeep">Distribuidor</p>
                <p className="mt-1 font-display text-lg font-bold">{LEGAL_LINE}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{product.distributor.role}. Atiende pedidos desde la tienda oficial FuXion.</p>
                <Link href="/sobre-el-distribuidor/" className="mt-2 inline-block text-sm font-semibold text-fxbluedeep hover:underline">
                  Sobre el distribuidor →
                </Link>
              </div>
              <div className="card card-static p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-fxbluedeep">Fabricante</p>
                <p className="mt-1 font-display text-lg font-bold">{product.manufacturer.name}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{product.manufacturer.address}.</p>
              </div>
              <div className="card card-static flex flex-col items-center justify-center gap-3 p-5 sm:col-span-2 sm:flex-row sm:justify-between">
                <Image src={product.images.seals} alt="Sellos del empaque de Prunex1" width={1000} height={104} className="h-auto w-full max-w-md" />
                <Image src="/img/producto/sello-calidad-garantizada.webp" alt="Sello de calidad garantizada FuXion" width={240} height={324} className="h-20 w-auto" />
              </div>
            </div>

            <h2 id="preguntas">Preguntas frecuentes de compra</h2>
            {FAQ.map((f) => (
              <details key={f.q} className="card card-static group mb-3 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxbluedeep transition group-open:rotate-45">+</span>
                </summary>
                <p className="!mb-0 mt-3 text-[var(--muted)]">{f.a}</p>
              </details>
            ))}
            <LegalNotice />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 overflow-hidden rounded-3xl bg-gradient-to-b from-[#0b1820] to-[#3d0d20] p-6 text-white">
              <Image src={product.images.hero} alt="Prunex1 de FuXion" width={300} height={292} sizes="300px" className="mx-auto h-auto w-full" />
              <p className="mt-3 font-display text-xl font-bold">Prunex1 · 28 sticks</p>
              <p className="mt-1 font-display text-4xl font-extrabold text-fxlime">{product.formattedPrice}</p>
              <p className="text-sm text-white/65">{product.formattedPricePerSachet} por stick · verificado el {PRICE_VERIFIED_LABEL}</p>
              <BuyLink source="ficha-sidebar" className="btn btn-lime shine mt-5 w-full" magnetic>
                Comprar ahora
              </BuyLink>
              <p className="mt-4 text-xs text-white/60">Serás dirigido a la tienda oficial FuXion de Carlos Lingan (carlos-lingan.site.fuxion.com).</p>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
      <ClientEffects stickySource="ficha-sticky" />
    </>
  );
}
