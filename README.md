# prunex1.com

Sitio SEO de un solo producto: **Prunex1 de FuXion** (Perú). Todas las llamadas a la acción envían a la tienda oficial del distribuidor:
https://carlos-lingan.site.fuxion.com/prunex1/

Distribuidor autorizado: **CARLOS EDEN LINGAN BORJA**, domiciliado en Lima, Perú. No es el sitio corporativo de FuXion.

## Stack
- Next.js 16 (App Router, SSG, `trailingSlash`) + React 19 + TypeScript + Tailwind CSS v4, desplegado en Vercel.
- GSAP 3 + ScrollTrigger (escena fijada "Del stick a tu taza") y Lenis (scroll suave global, sincronizado con ScrollTrigger), ambos con import dinámico y desactivados con `prefers-reduced-motion`.
- Efectos de la home: canvas de partículas (ciruela/lima/azul) repelidas por el puntero, bodegón 3D con tilt (puntero + giroscopio), aurora + grilla, precio giratorio, marquee doble, tarjetas con spotlight, títulos split-text, botones magnéticos, gel de fibra en SVG, órbita de ingredientes, contadores nutricionales, escena arrastrable día↔noche, carrusel con snap, calculadora de presupuesto, bento de categorías.
- Supabase (proyecto `ehwjvuhbimqakvzqbvvg`): edge function `prunex1-chat` (asesor IA, registro de clics `track_click` con `source` único por ubicación, opiniones `submit_review`/`reviews`).

## Estructura
- `src/app/page.tsx` — home (secciones en `src/components/home/*`).
- `src/app/comprar-prunex1/` — ficha de producto (galería con zoom, selector 28/7/caja 7, video oficial con fachada click-to-load, JSON-LD Product+Offer+FAQPage+BreadcrumbList; sin aggregateRating).
- `src/app/[categoria]/` y `src/app/[categoria]/[slug]/` — pilares y artículos desde `src/content/articles/*.json` (`src/lib/content.ts`).
- Páginas legales: sobre-el-distribuidor, contacto, envios-y-devoluciones, aviso-legal, politica-de-privacidad (Ley 29733), politica-de-cookies, politica-editorial. Todas incluyen `LegalNotice`.
- `src/data/product.json` — fuente única de verdad (etiqueta oficial, precios verificados el 19/11/2026).
- `src/data/keyword_map.json` — 98 URLs de contenido (1 URL = 1 intención). `src/data/categories.json` — 6 pilares.
- Imágenes: `public/img/producto/` (solo fotos reales del producto), `public/img/ambiente/` (ambientes IA, con respaldo automático a fotos reales si faltan: `ambient()` en `content.ts`), `public/img/articulos/<slug>.webp` (portadas).
- `safeHref()` evita enlaces internos rotos si un artículo aún no existe en el build (cae al pilar).

## Reglas de contenido
- Sin afirmaciones médicas: Prunex1 no es un medicamento; no diagnostica, trata, cura ni previene enfermedades.
- Beneficios oficiales de FuXion siempre marcados como "lo que comunica la marca" / afirmación comercial.
- Sin protocolos de dosis: solo el modo de empleo de la etiqueta (1 stick + 180 ml de agua caliente).
- Sin testimonios inventados ni ratings; opiniones con insignia "Compra verificada" / "Opinión no verificada".

## Desarrollo
```bash
npm install
npm run dev
npm run build
npm run lint
```
