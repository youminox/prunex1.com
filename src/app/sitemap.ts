import type { MetadataRoute } from "next";
import { SITE_URL, getAllContent, absolute, ambient, hasAmbient, product } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-19");
  const content = getAllContent().map((a) => ({
    url: `${SITE_URL}${a.path}`,
    lastModified: new Date(a.dateModified),
    changeFrequency: (a.isPillar ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: a.isPillar ? 0.9 : 0.7,
    images: a.imageUrl ? [absolute(a.imageUrl)] : undefined,
  }));
  const homeAmbient = ["home-hero-ambiente", "home-ritual-noche", "home-cocina-guindones", "home-oficina", "home-invierno-garua", "home-manana-liviana"]
    .filter(hasAmbient)
    .map((n) => absolute(ambient(n)));
  const fixed = [
    { path: "/", p: 1, f: "weekly" as const, img: [absolute(product.images.hero), absolute(product.images.lifestyle), absolute(product.images.label), ...homeAmbient] },
    {
      path: "/comprar-prunex1/",
      p: 0.95,
      f: "weekly" as const,
      img: [product.images.pack28, product.images.pack28Cup, product.images.pack7, product.images.back28, product.images.label].map(absolute),
    },
    { path: "/sobre-el-distribuidor/", p: 0.5, f: "yearly" as const },
    { path: "/politica-editorial/", p: 0.4, f: "yearly" as const },
    { path: "/contacto/", p: 0.4, f: "yearly" as const },
    { path: "/envios-y-devoluciones/", p: 0.4, f: "yearly" as const },
    { path: "/aviso-legal/", p: 0.2, f: "yearly" as const },
    { path: "/politica-de-privacidad/", p: 0.2, f: "yearly" as const },
    { path: "/politica-de-cookies/", p: 0.2, f: "yearly" as const },
  ].map((r) => ({ url: `${SITE_URL}${r.path}`, lastModified: now, changeFrequency: r.f, priority: r.p, images: "img" in r ? r.img : undefined }));
  return [...fixed, ...content];
}
