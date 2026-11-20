import fs from "node:fs";
import path from "node:path";
import product from "@/data/product.json";
import categories from "@/data/categories.json";
import keywordMap from "@/data/keyword_map.json";

export const SITE_URL = "https://prunex1.com";
export const SITE_NAME = "Prunex1 Perú";
export const SHOP_URL = product.shopUrl;
export const LEGAL_OWNER = "CARLOS EDEN LINGAN BORJA";
export const LEGAL_LOCATION = "Lima, Perú";
/** Frase legal exacta exigida en el footer y en todas las páginas legales. */
export const LEGAL_LINE = "Distribuidor autorizado: CARLOS EDEN LINGAN BORJA, domiciliado en Lima, Perú";
export const NOT_MEDICINE = "no es un medicamento; no diagnostica, trata, cura ni previene enfermedades";
export const PUBLISHED = "2026-11-19";
export const PRICE_VERIFIED_LABEL = "19/11/2026";
export const CHAT_ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/prunex1-chat";
export const PRODUCT_PATH = "/comprar-prunex1/";

export { product };

export type Block =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "callout"; variant: "etiqueta" | "fabricante" | "aviso" | "tip"; title?: string; text: string }
  | { type: "steps"; items: { name: string; text: string }[] }
  | { type: "cta"; text: string };

export type Article = {
  slug: string;
  pillar: string;
  path: string;
  isPillar: boolean;
  primaryKeyword: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  quickAnswer: string;
  readingMinutes: number;
  image: { prompt: string; alt: string };
  blocks: Block[];
  faqs: { q: string; a: string }[];
  sources?: { label: string; url: string }[];
  related: string[];
  datePublished: string;
  dateModified: string;
  imageUrl: string | null;
};

export type Category = (typeof categories)[number];

const DIR = path.join(process.cwd(), "src/content/articles");
const PUBLIC = path.join(process.cwd(), "public");
let cache: Article[] | null = null;

function isValidArticle(a: Partial<Article>): a is Article {
  return Boolean(a && a.slug && a.pillar && a.path && a.title && Array.isArray(a.blocks));
}

export function getAllContent(): Article[] {
  if (cache) return cache;
  const order = keywordMap.map((k) => k.path);
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")) : [];
  const list: Article[] = [];
  const seen = new Set<string>();
  for (const f of files) {
    try {
      const a = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      if (!isValidArticle(a) || !order.includes(a.path) || seen.has(a.path)) continue;
      seen.add(a.path);
      const img = path.join(PUBLIC, "img/articulos", `${a.slug}.webp`);
      list.push({
        ...a,
        isPillar: Boolean(a.isPillar),
        image: a.image && a.image.alt ? a.image : { prompt: "", alt: a.title },
        faqs: Array.isArray(a.faqs) ? a.faqs : [],
        related: Array.isArray(a.related) ? a.related : [],
        quickAnswer: a.quickAnswer || a.excerpt || "",
        excerpt: a.excerpt || a.metaDescription || "",
        seoTitle: a.seoTitle || a.title,
        metaDescription: a.metaDescription || a.excerpt || "",
        datePublished: a.datePublished || PUBLISHED,
        dateModified: a.dateModified || PUBLISHED,
        imageUrl: fs.existsSync(img) ? `/img/articulos/${a.slug}.webp` : null,
      });
    } catch {
      // archivo inválido o a medio escribir: se ignora en build
    }
  }
  list.sort((x, y) => order.indexOf(x.path) - order.indexOf(y.path));
  cache = list;
  return list;
}

export const getCategories = (): Category[] => categories;
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getPillar = (slug: string) => getAllContent().find((a) => a.isPillar && a.pillar === slug);
export const getArticle = (pillar: string, slug: string) =>
  getAllContent().find((a) => !a.isPillar && a.pillar === pillar && a.slug === slug);
export const getArticlesIn = (pillar: string) => getAllContent().filter((a) => !a.isPillar && a.pillar === pillar);
export const getByPath = (p: string) => getAllContent().find((a) => a.path === p);

/**
 * Devuelve la ruta si el contenido existe en build; si no, cae al pilar o al inicio.
 * Evita enlaces internos rotos mientras los artículos se generan por partes.
 */
export function safeHref(p: string): string {
  const isContent = keywordMap.some((k) => k.path === p);
  if (!isContent) return p;
  if (getByPath(p)) return p;
  const pillar = p.split("/").filter(Boolean)[0];
  if (pillar && getPillar(pillar)) return `/${pillar}/`;
  return "/";
}

/** Imagen de ambiente (IA) con respaldo a una foto real si el archivo aún no existe. */
export function ambient(name: string, fallback = product.images.lifestyle): string {
  const rel = `/img/ambiente/${name}.webp`;
  return fs.existsSync(path.join(PUBLIC, rel)) ? rel : fallback;
}

export const hasAmbient = (name: string) => fs.existsSync(path.join(PUBLIC, `/img/ambiente/${name}.webp`));

export const OG_DEFAULT = () => ambient("og-default", product.images.lifestyle);

export function absolute(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function trimTitle(t: string) {
  return t.replace(/\s*\|\s*Prunex1( Perú)?\s*$/i, "");
}

export const organizationLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.svg`,
  founder: { "@id": `${SITE_URL}/#carlos` },
  areaServed: "PE",
  description: "Guía independiente sobre Prunex1 de FuXion gestionada por un distribuidor autorizado en Lima, Perú. No es el sitio corporativo de FuXion.",
};

export const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#carlos`,
  name: "Carlos Eden Lingan Borja",
  jobTitle: "Distribuidor autorizado independiente FuXion",
  address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
  url: `${SITE_URL}/sobre-el-distribuidor/`,
};

export function productLd() {
  const main = product.presentations.find((p) => p.main)!;
  return {
    "@type": "Product",
    "@id": `${SITE_URL}${PRODUCT_PATH}#product`,
    name: "Prunex1 FuXion – Doypack 28 sticks x 5 g",
    sku: main.sku,
    mpn: main.sku,
    brand: { "@type": "Brand", name: "FuXion" },
    manufacturer: { "@type": "Organization", name: product.manufacturer.name, address: product.manufacturer.address },
    image: [absolute(product.images.pack28), absolute(product.images.hero), absolute(product.images.pack28Cup), absolute(product.images.label)],
    description: `${product.tagline}. ${product.packDescription}. ${product.presentation} (${product.netWeight}).`,
    category: "Bebida instantánea en polvo",
    weight: { "@type": "QuantitativeValue", value: 140, unitCode: "GRM" },
    countryOfOrigin: "PE",
    url: `${SITE_URL}${PRODUCT_PATH}`,
    offers: {
      "@type": "Offer",
      url: SHOP_URL,
      price: main.price.toFixed(2),
      priceCurrency: "PEN",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: "2027-06-30",
      seller: { "@type": "Organization", name: "Tienda oficial FuXion de Carlos Lingan (distribuidor autorizado)", url: product.distributor.store },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "PE" },
      },
    },
  };
}
