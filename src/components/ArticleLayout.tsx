import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs, { JsonLd } from "./Breadcrumbs";
import ArticleBody from "./ArticleBody";
import ArticleCard from "./ArticleCard";
import ProductCTA from "./ProductCTA";
import BuyLink from "./BuyLink";
import ClientEffects from "./ClientEffects";
import ReadingProgress from "./ReadingProgress";
import ReviewForm from "./ReviewForm";
import ApprovedReviews from "./ApprovedReviews";
import ManufacturerClaims from "./ManufacturerClaims";
import VideoFacade from "./VideoFacade";
import { slugify, stripMd } from "./Inline";
import type { Article, Block } from "@/lib/content";
import { SITE_URL, OG_DEFAULT, PRODUCT_PATH, LEGAL_OWNER, absolute, ambient, getArticlesIn, getByPath, getCategory, product } from "@/lib/content";

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });

export default function ArticleLayout({ a }: { a: Article }) {
  const cat = getCategory(a.pillar)!;
  const url = `${SITE_URL}${a.path}`;
  const h2s = a.blocks.filter((b) => b.type === "h2") as { type: "h2"; text: string }[];
  const steps = a.blocks.find((b) => b.type === "steps") as { type: "steps"; items: { name: string; text: string }[] } | undefined;
  const related = a.related.map((p) => getByPath(p)).filter(Boolean) as Article[];
  const children = a.isPillar ? getArticlesIn(a.pillar) : [];
  const crumbs = a.isPillar ? [{ name: cat.name, href: `/${cat.slug}/` }] : [{ name: cat.name, href: `/${cat.slug}/` }, { name: a.title, href: a.path }];
  const image = a.imageUrl ? absolute(a.imageUrl) : absolute(OG_DEFAULT());
  const isOpiniones = a.pillar === "opiniones-prunex1";
  const isPrep = a.pillar === "como-preparar-prunex1";
  // Video oficial: en el pilar y artículos de preparación. Se inserta tras el H2 que hable de "video";
  // si no hay, en el pilar antes del 2.º H2 y en los artículos al final del cuerpo.
  let videoAt = -1;
  if (isPrep) {
    const vid = a.blocks.findIndex((b) => b.type === "h2" && /video/i.test((b as { text: string }).text));
    if (vid >= 0) videoAt = vid + 1;
    else if (a.isPillar) {
      const h2idx = a.blocks.map((b, i) => (b.type === "h2" ? i : -1)).filter((i) => i >= 0);
      videoAt = h2idx.length > 1 ? h2idx[1] : a.blocks.length;
    } else videoAt = a.blocks.length;
  }
  const bodyA: Block[] = videoAt >= 0 ? a.blocks.slice(0, videoAt) : a.blocks;
  const bodyB: Block[] = videoAt >= 0 ? a.blocks.slice(videoAt) : [];
  const poster = ambient("preparacion-paso-3", product.images.pack28Cup);

  const graph: Record<string, unknown>[] = [
    {
      "@type": a.isPillar ? "CollectionPage" : "Article",
      "@id": `${url}#article`,
      ...(a.isPillar ? { name: a.title } : { headline: a.title }),
      description: a.metaDescription,
      image,
      inLanguage: "es-PE",
      datePublished: a.datePublished,
      dateModified: a.dateModified,
      author: { "@id": `${SITE_URL}/#carlos` },
      publisher: { "@id": `${SITE_URL}/#org` },
      mainEntityOfPage: url,
      about: { "@type": "Product", name: "Prunex1", brand: { "@type": "Brand", name: "FuXion" }, url: `${SITE_URL}${PRODUCT_PATH}` },
      ...(a.isPillar ? { hasPart: children.map((c) => ({ "@type": "Article", headline: c.title, url: `${SITE_URL}${c.path}` })) } : {}),
    },
  ];
  if (a.faqs?.length)
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: a.faqs.map((f) => ({ "@type": "Question", name: stripMd(f.q), acceptedAnswer: { "@type": "Answer", text: stripMd(f.a) } })),
    });
  if (steps)
    graph.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: a.title,
      image,
      totalTime: "PT2M",
      supply: [{ "@type": "HowToSupply", name: "1 stick de Prunex1 (5 g)" }, { "@type": "HowToSupply", name: "180 ml (1 taza) de agua caliente" }],
      tool: [{ "@type": "HowToTool", name: "Taza y cuchara" }],
      step: steps.items.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: stripMd(s.text) })),
    });

  return (
    <>
      <ReadingProgress />
      <Header />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      <main className="pt-[68px]">
        <section className="relative overflow-hidden bg-gradient-to-b from-fxsky via-white to-white">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-drink/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-fxblue/10 blur-3xl" />
          <div className="wrap relative pb-10 pt-10">
            <Breadcrumbs items={crumbs} />
            <div className={`mt-6 grid items-center gap-10 ${a.imageUrl ? "lg:grid-cols-[1.15fr_1fr]" : ""}`}>
              <div>
                <Link href={`/${cat.slug}/`} className="eyebrow hover:underline">
                  {a.isPillar ? "Guía principal" : cat.name}
                </Link>
                <h1 className="mt-3 text-[2.1rem] font-extrabold leading-[1.05] sm:text-5xl">{a.title}</h1>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
                  <span>
                    Revisado por <Link href="/sobre-el-distribuidor/" className="font-semibold text-fxink hover:text-fxblue">Carlos Lingan</Link>
                  </span>
                  <span aria-hidden>·</span>
                  <time dateTime={a.dateModified}>Actualizado el {fmt(a.dateModified)}</time>
                  <span aria-hidden>·</span>
                  <span>{a.readingMinutes || 6} min de lectura</span>
                </div>
                <div className="mt-6 rounded-2xl border-l-4 border-fxlime bg-white p-5 shadow-[0_10px_40px_-25px_rgba(0,80,130,0.5)]">
                  <p className="text-xs font-bold uppercase tracking-wider text-fxblue">Respuesta rápida</p>
                  <p className="mt-1.5 text-[1.05rem] leading-relaxed text-fxink">{stripMd(a.quickAnswer)}</p>
                </div>
              </div>
              {a.imageUrl && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src={a.imageUrl}
                    alt={a.image.alt}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="wrap grid grid-cols-1 gap-12 pb-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="min-w-0">
            {h2s.length > 2 && (
              <details className="toc mb-6 rounded-2xl border border-[var(--line)] p-4 text-sm lg:hidden">
                <summary className="cursor-pointer font-display font-bold text-fxink">En esta guía</summary>
                <ol className="mt-3 space-y-2">
                  {h2s.map((h) => (
                    <li key={h.text}>
                      <a href={`#${slugify(h.text)}`}>{stripMd(h.text)}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}
            <ArticleBody blocks={bodyA} source={a.slug} />
            {videoAt >= 0 && (
              <section aria-label="Video oficial de Prunex1">
                <VideoFacade poster={poster} />
              </section>
            )}
            {bodyB.length > 0 && <ArticleBody blocks={bodyB} source={`${a.slug}-b`} />}

            {a.isPillar && children.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-3xl font-extrabold" id="todas-las-guias">
                  Todas las guías de {cat.name.toLowerCase()}
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {children.map((c) => (
                    <ArticleCard key={c.path} a={c} />
                  ))}
                </div>
              </section>
            )}

            {isOpiniones && (
              <>
                <ApprovedReviews />
                <ManufacturerClaims />
                <ReviewForm compact={!a.isPillar && a.slug !== "testimonios-vs-afirmaciones-comerciales"} />
              </>
            )}

            {a.faqs?.length > 0 && (
              <section className="mt-14" aria-labelledby="faq">
                <h2 id="faq" className="font-display text-3xl font-extrabold">
                  Preguntas frecuentes
                </h2>
                <div className="mt-5 space-y-3">
                  {a.faqs.map((f) => (
                    <details key={f.q} className="card group p-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                        {stripMd(f.q)}
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxblue transition group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-[var(--muted)]">{stripMd(f.a)}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <ProductCTA source={`${a.slug}-final`} text="¿Listo para probarlo? Cómpralo original en la tienda oficial" />

            {a.sources && a.sources.length > 0 && (
              <section className="mt-10 rounded-2xl bg-fxsky/60 p-6 text-sm">
                <h2 className="font-display text-lg font-bold">Fuentes y referencias</h2>
                <ul className="mt-3 space-y-1.5">
                  <li>Etiqueta oficial de Prunex1 (información nutricional, ingredientes y modo de empleo), FuXion Perú.</li>
                  {a.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener nofollow" className="text-fxblue hover:underline">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-10 flex gap-5 rounded-3xl border border-[var(--line)] p-6">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-fxblue to-prune font-display text-xl font-extrabold text-white">CL</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-fxbluedeep">Revisión del contenido</p>
                <p className="font-display text-lg font-bold">{`Revisado por ${LEGAL_OWNER} – Distribuidor autorizado FuXion · Lima, Perú`}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Cada guía se contrasta con la etiqueta oficial de Prunex1 y con fuentes públicas. El distribuidor recibe una comisión por las compras
                  hechas desde este sitio (Ley N.º 29571). Prunex1 no es un medicamento; no diagnostica, trata, cura ni previene enfermedades. Este
                  contenido es informativo y no sustituye la consulta con un profesional de salud.{" "}
                  <Link href="/politica-editorial/" className="text-fxblue hover:underline">
                    Política editorial
                  </Link>
                </p>
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {h2s.length > 2 && (
                <nav className="toc rounded-2xl border border-[var(--line)] p-5 text-sm" aria-label="Contenido">
                  <p className="mb-3 font-display font-bold text-fxink">En esta guía</p>
                  <ol className="space-y-2">
                    {h2s.map((h) => (
                      <li key={h.text}>
                        <a href={`#${slugify(h.text)}`}>{stripMd(h.text)}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#0b1820] to-[#3d0d20] p-5 text-white">
                <Image src={product.images.hero} alt="Prunex1 de FuXion: doypack de 28 sticks y taza preparada" width={260} height={253} sizes="260px" className="mx-auto h-auto w-full" />
                <p className="mt-3 font-display text-lg font-bold">Prunex1 de FuXion</p>
                <p className="text-sm text-white/70">{product.presentation}</p>
                <p className="mt-2 font-display text-3xl font-extrabold text-fxlime">{product.formattedPrice}</p>
                <BuyLink source={`${a.slug}-sidebar`} className="btn btn-lime shine mt-4 w-full">
                  Comprar ahora
                </BuyLink>
                <Link href="/comprar-prunex1/" className="mt-2 block text-center text-xs text-white/60 hover:text-white">
                  Ver ficha completa
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="bg-fxsky py-16">
            <div className="wrap">
              <h2 className="font-display text-3xl font-extrabold">Sigue leyendo</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {related.slice(0, 4).map((r) => (
                  <ArticleCard key={r.path} a={r} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <ClientEffects stickySource={`${a.slug}-sticky`} />
    </>
  );
}
