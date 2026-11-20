import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuyLink from "@/components/BuyLink";
import ClientEffects from "@/components/ClientEffects";
import ArticleCard from "@/components/ArticleCard";
import ReadingProgress from "@/components/ReadingProgress";
import SplitHeading from "@/components/SplitHeading";
import ApprovedReviews from "@/components/ApprovedReviews";
import OpenChatButton from "@/components/OpenChatButton";
import { JsonLd } from "@/components/Breadcrumbs";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import FiberGel from "@/components/home/FiberGel";
import IngredientOrbit, { type OrbitItem } from "@/components/home/IngredientOrbit";
import NutritionCounters, { type NutriItem } from "@/components/home/NutritionCounters";
import DayNightSlider from "@/components/home/DayNightSlider";
import MomentsCarousel, { type Moment } from "@/components/home/MomentsCarousel";
import PriceBlock from "@/components/home/PriceBlock";
import {
  SITE_URL,
  OG_DEFAULT,
  PRICE_VERIFIED_LABEL,
  NOT_MEDICINE,
  ambient,
  getAllContent,
  getArticlesIn,
  getByPath,
  getCategories,
  product,
  safeHref,
  type Article,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Prunex1 de FuXion Perú: qué es, precio S/ 76 y cómo se prepara",
  description:
    "Prunex1 de FuXion explicado según su etiqueta: bebida instantánea de fibras (psyllium, inulina, linaza) y guindón. 18 kcal, 0 g de azúcares añadidos. Precio S/ 76.00 por 28 sticks y compra en la tienda oficial.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title: "Prunex1 de FuXion Perú: qué es, precio y cómo se prepara",
    description: "Guía independiente de Prunex1: ingredientes, preparación según la etiqueta, precio S/ 76.00 y opiniones verificables.",
    images: [{ url: OG_DEFAULT(), width: 1200, height: 675, alt: "Prunex1 de FuXion: taza caliente sabor guindón" }],
  },
};

const FAQ = [
  {
    q: "¿Qué es Prunex1?",
    a: "Es una bebida instantánea en polvo de FuXion a base de fibras y extractos vegetales, con base de tapioca y sabor guindón. Está enriquecida con fibra de psyllium, fibra de inulina de achicoria, guindón, kelp, anís estrella y mucílago de linaza. Cada stick de 5 g se disuelve en una taza (180 ml) de agua caliente.",
  },
  {
    q: "¿Cuánto cuesta Prunex1 en Perú?",
    a: `El precio de catálogo es S/ 76.00 por el doypack de 28 sticks, unos S/ 2.71 por stick. También existe el doypack de 7 sticks a S/ 21.00 (la caja de 7 sticks figura agotada). Precio verificado el ${PRICE_VERIFIED_LABEL} en la tienda oficial; el costo de envío se calcula al pagar.`,
  },
  {
    q: "¿Cómo se prepara?",
    a: "Según la etiqueta: disuelve el contenido de un stick (5 g) en una taza (180 ml) de agua caliente, revuelve bien y, una vez preparado, consúmelo en su totalidad. Conserva el empaque en un lugar fresco y seco.",
  },
  {
    q: "¿Prunex1 tiene azúcar?",
    a: "Según su tabla nutricional, cada porción de 180 ml aporta 0.2 g de azúcares totales y 0 g de azúcares añadidos, con 18 kcal. El sabor dulce viene de los saborizantes, el sorbitol y el edulcorante de estevia (glicósidos de esteviol).",
  },
  {
    q: "¿Es un medicamento o un laxante?",
    a: "No es un medicamento: no diagnostica, trata, cura ni previene enfermedades. Es una bebida con fibras y extractos vegetales. FuXion comunica que está pensado para un adecuado tránsito intestinal; esa es una afirmación comercial de la marca. Si tienes una condición digestiva o tomas medicación, consulta antes con un profesional de salud.",
  },
  {
    q: "¿Quién no debería tomarlo?",
    a: "Según la ficha oficial de FuXion, no es apto para embarazadas, madres en lactancia ni personas con tránsito intestinal normal. Además, se elabora en equipos donde se procesan leche y productos lácteos, huevos y soya.",
  },
  {
    q: "¿Dónde comprar Prunex1 original?",
    a: "En la tienda oficial FuXion del distribuidor autorizado Carlos Eden Lingan Borja (Lima). Así recibes producto sellado, con lote y fecha de vencimiento, al precio de catálogo y con envío a Lima y provincias.",
  },
];

const CLAIMS = ["Sin gluten", "No GMO", "Bajo en sodio", "Clean Label", "Sin azúcares añadidos", "28 sticks × 5 g", "Sabor guindón", "Hecho en Perú"];
const CLAIMS_2 = ["Fibra de psyllium", "Inulina de achicoria", "Mucílago de linaza", "Guindón", "Anís estrella", "Kelp", "18 kcal por taza", "1.7 g de fibra"];

const ICONS: Record<string, string> = { leaf: "🌿", tag: "🏷️", flask: "🧪", cup: "☕", chat: "💬", atom: "⚖️" };

function ingredientRole(slug: string) {
  return product.ingredients.find((i) => i.slug === slug)?.role ?? "";
}

export default function Home() {
  const cats = getCategories();
  const all = getAllContent();
  const img = (f: string) => `/img/producto/ingredientes/${f}.webp`;

  const orbit: OrbitItem[] = [
    { k: "psyllium", name: "Psyllium", img: img("psyllium"), role: ingredientRole("psyllium"), d: "Fibra de la cáscara de Plantago ovata. En contacto con el agua se hidrata y forma un gel: por eso la textura de la taza es ligeramente espesa.", href: safeHref("/ingredientes-prunex1/psyllium/") },
    { k: "inulina", name: "Inulina de achicoria", img: img("inulina-achicoria"), role: ingredientRole("inulina-de-achicoria"), d: "Fibra soluble de la raíz de achicoria (segundo ingrediente de la lista). Es una fibra fermentable, conocida como prebiótica.", href: safeHref("/ingredientes-prunex1/inulina-de-achicoria/") },
    { k: "guindon", name: "Guindón", img: img("guindon"), role: "Fruta deshidratada que da nombre y sabor", d: "La ciruela pasa de toda la vida. Aparece como fruta deshidratada (junto al limón) y también en los saborizantes.", href: safeHref("/ingredientes-prunex1/guindon/") },
    { k: "anis", name: "Anís estrella", img: img("anis-estrella"), role: "Extracto vegetal aromático", d: "Aporta el aroma especiado. Figura en polvo y también como aceite esencial al final de la lista.", href: safeHref("/ingredientes-prunex1/anis-estrella/") },
    { k: "kelp", name: "Kelp", img: img("kelp"), role: "Alga marina deshidratada", d: "Alga que aporta alginatos y minerales de forma natural, incluido el yodo (la cantidad no está declarada en la tabla).", href: safeHref("/ingredientes-prunex1/kelp/") },
    { k: "linaza", name: "Mucílago de linaza", img: img("mucilago-linaza"), role: ingredientRole("mucilago-de-linaza"), d: "La parte viscosa de la semilla de linaza: suma cuerpo a la bebida y forma parte del mix de fibras.", href: safeHref("/ingredientes-prunex1/mucilago-de-linaza/") },
    { k: "limon", name: "Limón", img: null, icon: "🍋", role: "Fruta deshidratada y sabor", d: "El limón deshidratado acompaña al guindón; los saborizantes (guindón, ciruela, panela) completan el perfil dulce-frutal.", href: safeHref("/ingredientes-prunex1/limon-y-saborizantes/") },
    { k: "tapioca", name: "Tapioca", img: null, icon: "tapioca", role: ingredientRole("tapioca"), d: "Es el primer ingrediente: el almidón en polvo que sirve de base para que la mezcla se disuelva y se dosifique en sticks de 5 g.", href: safeHref("/ingredientes-prunex1/tapioca/") },
  ];

  const n = product.nutrition.perServing;
  const dv = product.nutrition.dailyValuePct;
  const nutri: NutriItem[] = [
    { v: n.kcal, dec: 0, u: "kcal", l: "Energía", pct: dv.kcal },
    { v: n.fiber, dec: 1, u: "g", l: "Fibra dietaria", pct: dv.fiber },
    { v: n.carbs, dec: 1, u: "g", l: "Carbohidratos", pct: dv.carbs },
    { v: n.sugars, dec: 1, u: "g", l: "Azúcares totales", pct: null },
    { v: n.addedSugars, dec: 0, u: "g", l: "Azúcares añadidos", pct: dv.addedSugars },
    { v: n.sodiumMg, dec: 0, u: "mg", l: "Sodio", pct: dv.sodium },
  ];

  const moments: Moment[] = [
    { img: ambient("home-manana-liviana", product.images.pack28Cup), t: "Mañanas livianas", d: "Qué significa “sentirse liviano” y qué no promete una bebida con fibra.", href: safeHref("/que-es-prunex1/hinchazon-abdominal/"), alt: "Mañana luminosa con una taza caliente de Prunex1" },
    { img: ambient("home-oficina", product.images.pack7Cup), t: "En la oficina", d: "Un stick en la mochila, agua caliente del dispensador y una taza.", href: safeHref("/como-preparar-prunex1/en-la-oficina/"), alt: "Escritorio de oficina con una taza caliente" },
    { img: ambient("home-invierno-garua", product.images.pack28Cup), t: "Garúa de invierno", d: "Cuánto es exactamente 180 ml y cómo medirlo sin vaso medidor.", href: safeHref("/como-preparar-prunex1/cuanto-es-180-ml/"), alt: "Ventana con garúa limeña y una taza humeante" },
    { img: ambient("home-cocina-guindones", product.images.lifestyle), t: "Agua de guindones", d: "La receta de la abuela frente a Prunex1: diferencias reales.", href: safeHref("/comparativas-prunex1/vs-agua-de-guindones/"), alt: "Cocina con guindones y una jarra de agua" },
    { img: ambient("home-verano", product.images.pack7), t: "Verano y agua", d: "La fibra necesita líquido: cuánta agua tomar en el día.", href: safeHref("/como-preparar-prunex1/cuanta-agua-tomar/"), alt: "Escena de verano con agua y fruta" },
    { img: ambient("home-mercado", product.images.pack28), t: "¿En el mercado?", d: "¿Se vende en farmacias o supermercados? Dónde comprarlo original.", href: safeHref("/precio-prunex1-peru/farmacias-y-supermercados/"), alt: "Puesto de mercado peruano con frutas" },
    { img: ambient("home-ritual-noche", product.images.pack28Cup), t: "Ritual de taza caliente", d: "Cómo sabe y qué textura tiene: guindón, anís y un toque cítrico.", href: safeHref("/que-es-prunex1/sabor-y-textura/"), alt: "Taza caliente en una mesa de noche con luz cálida" },
  ];

  const POPULAR = [
    "/precio-prunex1-peru/precio-por-stick/",
    "/que-es-prunex1/es-laxante/",
    "/ingredientes-prunex1/tiene-azucar/",
    "/opiniones-prunex1/contraindicaciones/",
    "/opiniones-prunex1/efectos-secundarios/",
    "/comparativas-prunex1/vs-psyllium-generico/",
  ];
  const popular: Article[] = POPULAR.map((p) => getByPath(p)).filter(Boolean) as Article[];
  for (const a of all) {
    if (popular.length >= 6) break;
    if (!a.isPillar && !popular.includes(a)) popular.push(a);
  }

  const priceOptions = [
    { key: "28", label: "28 sticks", size: 28, price: 76, img: product.images.pack28, alt: "Doypack de Prunex1 FuXion con 28 sticks", inStock: true },
    { key: "7", label: "7 sticks", size: 7, price: 21, img: product.images.pack7, alt: "Doypack de Prunex1 FuXion con 7 sticks", inStock: true },
    { key: "caja7", label: "Caja de 7", size: 7, price: 21, img: product.images.pack7, alt: "Caja de 7 sticks de Prunex1", inStock: false },
  ];

  return (
    <>
      <ReadingProgress />
      <Header variant="dark" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/#webpage`,
              url: `${SITE_URL}/`,
              name: "Prunex1 de FuXion Perú",
              inLanguage: "es-PE",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              about: { "@id": `${SITE_URL}/comprar-prunex1/#product` },
              primaryImageOfPage: `${SITE_URL}${product.images.hero}`,
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }}
      />
      <main>
        {/* 1–2. Hero */}
        <Hero />

        {/* 3. Cinta de claims de la etiqueta */}
        <div className="relative border-b border-[var(--line)] bg-white py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div key={k} className="marquee-track font-display text-lg font-bold text-fxink/80" aria-hidden={k === 1}>
                {CLAIMS.map((t) => (
                  <span key={t} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-fxlime to-fxblue" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3" aria-hidden>
            {[0, 1].map((k) => (
              <div key={k} className="marquee-track text-sm font-semibold uppercase tracking-[0.14em] text-prune/70">
                {CLAIMS_2.map((t) => (
                  <span key={t} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="h-1.5 w-1.5 rounded-full bg-drinklight" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Qué es */}
        <section id="que-es" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Qué es Prunex1
              </span>
              <SplitHeading text="Una bebida de fibras con sabor a guindón," accent={{ text: "según su etiqueta", className: "text-prune" }} className="section-title mt-3" />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Prunex1 es una <strong className="text-fxink">bebida instantánea en polvo a base de fibras y extractos vegetales</strong> (base de
                tapioca), enriquecida con fibra de psyllium, fibra de inulina de achicoria, guindón, kelp, anís estrella y mucílago de linaza. Viene
                en doypack de 28 sticks de 5 g y la fabrica FuXion Biotech en Lurín, Lima.
              </p>
              <div className="mt-6 rounded-2xl border border-amber-300/60 bg-amber-50/70 p-5" data-reveal>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">📣 Lo que comunica la marca</p>
                <ul className="mt-2 space-y-1.5 text-[0.97rem] text-fxink">
                  {product.officialBenefits.map((b) => (
                    <li key={b} className="relative pl-4">
                      <span className="absolute left-0 top-0 text-amber-600">“</span>
                      {b.replace(/\.$/, "")}
                      <span className="text-amber-600">”</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-[#5b4a1f]">
                  Son afirmaciones comerciales de FuXion, no resultados verificados por este sitio. Prunex1 {NOT_MEDICINE}.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link href="/que-es-prunex1/" className="btn btn-ghost" data-magnetic>
                  Guía completa: qué es y para qué sirve
                </Link>
                <Link href={safeHref("/que-es-prunex1/etiqueta-explicada/")} className="btn btn-ghost" data-magnetic>
                  La etiqueta explicada
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-3xl shadow-[0_30px_60px_-35px_rgba(11,24,32,0.6)]" data-reveal>
                <Image
                  src={product.images.lifestyle}
                  alt="Doypack de Prunex1 de FuXion en una cocina, junto a una taza preparada"
                  fill
                  sizes="(max-width:1024px) 100vw, 600px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-fxink">Foto real del producto</span>
              </div>
              {[
                ["🥤", "Bebida instantánea", "Polvo que se disuelve en agua caliente: sin licuadora ni remojo."],
                ["🌾", "Mix de fibras solubles", "Psyllium, inulina de achicoria y mucílago de linaza en una sola taza."],
                ["🫐", "Sabor guindón", "Guindón y limón deshidratados, anís estrella y saborizantes."],
                ["✨", "18 kcal · 0 g añadidos", "Por porción de 180 ml, según la tabla nutricional peruana."],
              ].map(([e, t, d], i) => (
                <div key={t} className="card spot p-5" data-reveal data-reveal-delay={String(i)}>
                  <p className="text-2xl" aria-hidden>
                    {e}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">{t}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Historia fijada: del stick a tu taza */}
        <ScrollStory />

        {/* 6. Cómo actúa la fibra soluble */}
        <section className="relative isolate overflow-hidden bg-[#0b1820] py-24 text-white">
          <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-fxblue/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-prune/40 blur-3xl" />
          <div className="hero-grid opacity-50" />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                La ciencia, sin humo
              </span>
              <SplitHeading text="Cómo actúa la" accent={{ text: "fibra soluble", className: "text-gradient" }} className="section-title mt-3" />
              <p className="mt-5 text-lg text-white/75" data-reveal>
                La fibra soluble, como la del <strong className="text-white">psyllium</strong> y el <strong className="text-white">mucílago de linaza</strong>,
                atrae agua y forma un gel viscoso. La <strong className="text-white">inulina de achicoria</strong> es una fibra fermentable que sirve de
                alimento a bacterias del intestino (por eso se la llama prebiótica). Por eso la fibra siempre va acompañada de líquido.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3" data-reveal>
                {[
                  ["💧", "Absorbe agua"],
                  ["🫧", "Forma gel"],
                  ["🌱", "Fermentable"],
                ].map(([e, t]) => (
                  <div key={t} className="glass p-4 text-center">
                    <p className="text-2xl" aria-hidden>
                      {e}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{t}</p>
                  </div>
                ))}
              </div>
              <div className="glass mt-6 p-5 text-sm text-white/75" data-reveal>
                <strong className="text-white">Para ser claros:</strong> esto describe cómo se comportan estas fibras en general, no un efecto garantizado
                del producto. Prunex1 aporta {n.fiber} g de fibra dietaria por porción y la etiqueta no declara cuánto hay de cada fibra. Prunex1{" "}
                {NOT_MEDICINE}. Si tienes una condición digestiva o tomas medicación, consulta a un profesional de salud.
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link href={safeHref("/que-es-prunex1/fibra-y-transito-intestinal/")} className="btn btn-glass" data-magnetic>
                  Fibra y tránsito intestinal
                </Link>
                <Link href={safeHref("/ingredientes-prunex1/fibra-soluble-e-insoluble/")} className="btn btn-glass" data-magnetic>
                  Soluble vs insoluble
                </Link>
              </div>
            </div>
            <div data-reveal>
              <FiberGel />
            </div>
          </div>
        </section>

        {/* 7. Órbita de ingredientes */}
        <section className="wrap py-24">
          <IngredientOrbit items={orbit} center="/img/producto/prunex1-fuxion-doypack-sticks-taza-transparente-400.webp" />
          <p className="mt-10 text-center text-sm text-[var(--muted)]">
            Lista completa según la etiqueta: {product.ingredientsText}{" "}
            <Link href="/ingredientes-prunex1/" className="font-semibold text-fxbluedeep underline">
              Ver los 16 ingredientes
            </Link>
          </p>
        </section>

        {/* 8. Etiqueta y contadores */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#06324d] via-[#0b1820] to-[#3d0d20] py-24 text-white">
          <div className="hero-aurora opacity-40" />
          <div className="wrap relative grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Información nutricional real
              </span>
              <SplitHeading text="Lo que dice la etiqueta," accent={{ text: "cifra por cifra", className: "text-gradient" }} className="section-title mt-3" />
              <p className="mt-4 max-w-xl text-white/70" data-reveal>
                Por porción: 1 stick (5 g) disuelto en 180 ml de agua. Sin redondeos de marketing: copiamos los valores tal como aparecen en la tabla
                nutricional peruana de FuXion.
              </p>
              <div className="mt-8">
                <NutritionCounters data={nutri} />
              </div>
              <p className="mt-4 text-xs text-white/50">*{product.nutrition.dvBasis}.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={safeHref("/ingredientes-prunex1/tabla-nutricional/")} className="btn btn-glass" data-magnetic>
                  Cómo leer la tabla nutricional
                </Link>
                <Link href={safeHref("/ingredientes-prunex1/calorias/")} className="btn btn-glass" data-magnetic>
                  ¿Cuántas calorías tiene?
                </Link>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-[420px] rounded-3xl bg-white p-3 shadow-2xl" data-reveal>
              <Image
                src={product.images.label}
                alt="Etiqueta de información nutricional e ingredientes de Prunex1 (FuXion Perú)"
                width={659}
                height={1244}
                sizes="(max-width:1024px) 90vw, 420px"
                className="h-auto w-full rounded-2xl"
              />
              <figcaption className="px-2 pt-2 text-center text-xs text-[var(--muted)]">Etiqueta oficial de Prunex1 · {product.nutrition.labelVersion}</figcaption>
            </figure>
          </div>
        </section>

        {/* 9. Día ↔ noche */}
        <section className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Un ritual simple
              </span>
              <SplitHeading text="De día o de noche," accent={{ text: "la taza es la misma", className: "text-prune" }} className="section-title mt-3" />
            </div>
            <p className="text-lg text-[var(--muted)]" data-reveal>
              Arrastra la escena. Cambia el cielo, pero la preparación de la etiqueta no: <strong className="text-fxink">1 stick + 180 ml de agua
              caliente</strong>, revolver bien y tomarla completa. La etiqueta no indica un horario; si tienes dudas sobre cómo encaja en tu rutina,
              consulta a un profesional de salud.
            </p>
          </div>
          <div data-reveal>
            <DayNightSlider />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["180 ml", "una taza de agua caliente", ambient("preparacion-paso-1", product.images.pack28Cup)],
              ["1 stick", "5 g, todo el contenido", ambient("preparacion-paso-2", product.images.hero)],
              ["Revuelve", "y consúmela completa", ambient("preparacion-paso-3", product.images.pack7Cup)],
            ].map(([t, d, src], i) => (
              <div key={t} className="card spot overflow-hidden" data-reveal data-reveal-delay={String(i)}>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={src} alt={`Paso ${i + 1} de la preparación de Prunex1: ${t}, ${d}`} fill sizes="(max-width:640px) 100vw, 380px" className="object-cover" />
                </div>
                <div className="flex items-center gap-4 p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-fxblue to-prune font-display font-extrabold text-white">{i + 1}</span>
                  <div>
                    <p className="font-display text-lg font-bold leading-tight">{t}</p>
                    <p className="text-sm text-[var(--muted)]">{d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/como-preparar-prunex1/" className="btn btn-ghost" data-magnetic>
              Guía de preparación con video oficial
            </Link>
            <Link href={safeHref("/como-preparar-prunex1/sin-grumos/")} className="btn btn-ghost" data-magnetic>
              Cómo prepararlo sin grumos
            </Link>
          </div>
        </section>

        {/* 10. Momentos */}
        <section className="overflow-hidden bg-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Prunex1 en tu día a día
              </span>
              <SplitHeading text="Momentos y" accent={{ text: "dudas reales", className: "text-fxbluedeep" }} className="section-title mt-3" />
            </div>
            <MomentsCarousel items={moments} />
          </div>
        </section>

        {/* 11. Precio */}
        <section id="precio" className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Precio de catálogo en Perú
              </span>
              <SplitHeading text="S/ 76.00 por 28 sticks." accent={{ text: "S/ 2.71 por taza.", className: "text-prune" }} className="section-title mt-3" />
            </div>
            <ul className="grid gap-2 text-[var(--muted)]" data-reveal>
              {["Producto original y sellado, con lote y vencimiento", "Pago seguro en la tienda oficial FuXion", "Envíos a Lima y provincias (costo en el checkout)", "Atención del distribuidor autorizado en Lima"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-fxlime/20 text-sm text-[#3b630c]">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <PriceBlock options={priceOptions} verified={PRICE_VERIFIED_LABEL} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/precio-prunex1-peru/" className="btn btn-ghost" data-magnetic>
              Precio, envíos y formas de pago
            </Link>
            <Link href="/comprar-prunex1/" className="btn btn-ghost" data-magnetic>
              Ficha técnica del producto
            </Link>
          </div>
        </section>

        {/* 12. Bento de categorías + lo más consultado */}
        <section className="bg-gradient-to-b from-white to-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Guías especializadas
              </span>
              <SplitHeading text="Todo sobre Prunex1," accent={{ text: "ordenado por tema", className: "text-fxbluedeep" }} className="section-title mt-3" />
            </div>
            <div className="grid auto-rows-[minmax(190px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
              {cats.map((c, i) => {
                const count = getArticlesIn(c.slug).length;
                const big = i === 0;
                const wide = i === 1 || i === 4 || i === 5;
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className={`card spot group flex flex-col p-7 ${big ? "spot-dark border-transparent bg-gradient-to-br from-fxblue via-[#0a4f7a] to-prune text-white md:col-span-2 lg:row-span-2" : ""} ${wide ? "lg:col-span-2" : ""}`}
                    data-reveal
                    data-reveal-delay={String(i % 4)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${big ? "bg-white/15" : "bg-fxsky"}`} aria-hidden>
                        {ICONS[c.icon] || "•"}
                      </span>
                      {count > 0 && <span className={`text-xs font-bold uppercase tracking-wider ${big ? "text-fxlime" : "text-fxbluedeep"}`}>{count} guías</span>}
                    </div>
                    <h3 className={`mt-5 font-display font-extrabold ${big ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{c.name}</h3>
                    <p className={`mt-2 ${big ? "text-white/80" : "text-[var(--muted)]"}`}>{c.description}</p>
                    {big && (
                      <ul className="mt-6 space-y-2 text-sm text-white/85">
                        {getArticlesIn(c.slug)
                          .slice(0, 6)
                          .map((a) => (
                            <li key={a.path}>→ {a.title}</li>
                          ))}
                      </ul>
                    )}
                    {i === 1 && (
                      <p className="mt-4 font-display text-4xl font-extrabold text-prune">
                        S/ 76.00 <span className="text-base font-bold text-[var(--muted)]">· 28 sticks</span>
                      </p>
                    )}
                    <span className={`mt-auto pt-5 font-semibold ${big ? "text-white" : "text-fxbluedeep"}`}>Explorar →</span>
                  </Link>
                );
              })}
            </div>
            {popular.length > 0 && (
              <div className="mt-16">
                <h3 className="font-display text-2xl font-extrabold sm:text-3xl" data-reveal>
                  Lo más consultado
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {popular.slice(0, 6).map((a) => (
                    <div key={a.path} data-reveal>
                      <ArticleCard a={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 13. Opiniones */}
        <section className="wrap py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Opiniones sobre Prunex1
              </span>
              <SplitHeading text="Testimonios verificables," accent={{ text: "no promesas", className: "text-prune" }} className="section-title mt-3" />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                En internet abundan los “me funcionó en 3 días”. Aquí separamos lo que cuenta un cliente real (con compra verificada) de lo que
                comunica la marca. No inventamos testimonios ni puntuaciones.
              </p>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link href="/opiniones-prunex1/" className="btn btn-ghost" data-magnetic>
                  Ver opiniones y preguntas
                </Link>
                <Link href={safeHref("/opiniones-prunex1/testimonios-vs-afirmaciones-comerciales/")} className="btn btn-ghost" data-magnetic>
                  Cómo distinguirlas
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card spot p-6" data-reveal>
                <span className="inline-flex rounded-full bg-fxlime/20 px-3 py-1 text-xs font-bold text-[#3b630c]">✓ Testimonio verificable</span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Persona real, con nombre y ciudad</li>
                  <li>• Compra confirmada con su pedido</li>
                  <li>• Publicado con su consentimiento</li>
                  <li>• Sin editar su sentido, sea bueno o malo</li>
                </ul>
              </div>
              <div className="card spot p-6" data-reveal data-reveal-delay="1">
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">📣 Afirmación comercial</span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Lo que dice la marca o un vendedor</li>
                  <li>• Busca convencerte de comprar</li>
                  <li>• No es un resultado medido en ti</li>
                  <li>• Aquí siempre la marcamos como tal</li>
                </ul>
              </div>
              <div className="sm:col-span-2">
                <ApprovedReviews hideIfEmpty limit={4} title="Lo que dicen clientes reales" />
              </div>
            </div>
          </div>
        </section>

        {/* 14. FAQ */}
        <section className="wrap pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Preguntas frecuentes
              </span>
              <SplitHeading text="Respuestas rápidas" className="section-title mt-3" />
              <p className="mt-4 text-[var(--muted)]" data-reveal>
                ¿Te queda alguna duda? El asesor virtual responde al instante con la información de la etiqueta.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-reveal>
                <OpenChatButton label="Preguntar al asesor" className="btn btn-buy" />
                <Link href={safeHref("/opiniones-prunex1/preguntas-frecuentes/")} className="btn btn-ghost">
                  Más preguntas
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details key={f.q} className="card card-static group p-5 open:shadow-lg" data-reveal>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxbluedeep transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15. CTA final */}
        <section className="wrap pb-6">
          <div className="relative isolate overflow-hidden rounded-[36px] bg-gradient-to-br from-fxblue via-[#0a4f7a] to-prune px-6 py-14 text-white sm:px-14 sm:py-20">
            <Image src={ambient("home-hero-ambiente", product.images.lifestyle)} alt="" fill sizes="1200px" className="-z-[2] object-cover opacity-20 mix-blend-luminosity" />
            <div className="hero-grid opacity-60" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-drinklight/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-fxlime/25 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div className="text-center lg:text-left">
                <SplitHeading text="Tu taza de Prunex1," accent={{ text: "original y al precio de catálogo", className: "text-fxlime" }} className="text-4xl font-extrabold sm:text-5xl" />
                <p className="mt-4 text-lg text-white/85">
                  Doypack de 28 sticks a S/ 76.00 (S/ 2.71 por stick) en la tienda oficial FuXion del distribuidor autorizado, con envío a todo el Perú.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <BuyLink source="home-final" className="btn btn-lime shine text-base" magnetic>
                    Comprar Prunex1 ahora
                  </BuyLink>
                  <Link href="/comprar-prunex1/" className="btn btn-glass" data-magnetic>
                    Ver ficha del producto
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[360px]">
                <div className="absolute inset-[12%] rounded-full bg-white/20 blur-3xl" />
                <Image
                  src="/img/producto/prunex1-fuxion-doypack-sticks-taza-transparente-400.webp"
                  alt="Prunex1 de FuXion: doypack de 28 sticks con taza preparada"
                  width={400}
                  height={390}
                  sizes="360px"
                  className="float-y relative h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ClientEffects stickySource="home-sticky" />
    </>
  );
}
