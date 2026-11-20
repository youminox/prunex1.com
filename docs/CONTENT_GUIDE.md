# Guía editorial — prunex1.com

Sitio SEO de **un solo producto**: *Prunex1* de FuXion, para el mercado de **Perú** (español neutro-peruano, tuteo, moneda S/). Lo administra un distribuidor autorizado independiente: **CARLOS EDEN LINGAN BORJA (Lima, Perú)**. NO es el sitio oficial de FuXion.

## Fuente de verdad
- `src/data/product.json` → TODOS los datos. **Nunca inventes cifras** que no estén ahí. Resumen clave:
  - Denominación de la etiqueta: **"Bebida instantánea en polvo a base de fibras y extractos vegetales", sabor guindón**. El primer ingrediente es **tapioca en polvo**. FuXion lo llama comercialmente "té herbal": puedes mencionarlo como "lo que comunica la marca", pero la etiqueta manda.
  - Doypack **28 sticks x 5 g (140 g)**, precio de catálogo **S/ 76.00**, **S/ 2.71 por stick**, 10 puntos. Doypack 7 sticks **S/ 21.00** (S/ 3.00 por stick). Caja de 7 sticks agotada. Precio verificado el 19/11/2026.
  - Por porción (5 g en **180 ml**): **18 kcal**, 0 g grasa, 2.0 mg sodio, 4.5 g carbohidratos, **1.7 g fibra dietaria**, 0.2 g azúcares totales, **0 g azúcares añadidos**, 0 g proteína. Por 100 ml: 10 kcal, 2.5 g carbohidratos, 0.9 g fibra.
  - 16 ingredientes en este orden: tapioca, achicoria (inulina), psyllium (*Plantago ovata*), anís estrella, kelp, limón y guindón deshidratados, mucílago de linaza, sorbitol, saborizantes (guindón, ciruela, panela), cáscara de arroz, goma xantán, magnesio, estevia, color natural carmín, aceite esencial de anís estrella, lecitina de girasol.
  - Modo de empleo (etiqueta): "Disolver el contenido de un stick (5 g) en una taza (180 ml) de agua caliente, y revolver bien. Una vez preparado consumir en su totalidad. Conservar en un lugar fresco y seco."
  - Advertencias: elaborado en equipos que procesan leche y productos lácteos, huevos y soya. Ficha oficial FuXion: "No apto para embarazadas, madres en lactancia o personas con tránsito intestinal normal."
  - Sellos: No GMO, sin azúcares, sin gluten, bajo en sodio, Clean Label.
  - Fabricante: FuXion Biotech S.A.C., Lurín, Lima. Registro sanitario en el empaque vigente (7 sticks, 2025): P2963923N NAFXBO (recomendar verificar en el propio empaque).
  - **No declarado**: cantidad de cada fibra, de guindón, sorbitol, magnesio y yodo por stick. Nunca des esas cantidades como si fueran del producto.
  - Beneficios oficiales que comunica FuXion (siempre como "lo que comunica la marca"): adecuado tránsito intestinal; sentirte más liviano sin las molestias de la hinchazón abdominal; liberarte de desechos perjudiciales.
  - Video oficial: Vimeo 277172488 (lo inserta el sistema en las páginas de preparación).
- `src/data/keyword_map.json` → las 98 URLs, su keyword principal, qué cubrir (`cover`) y qué NO cubrir (`avoid`). Respeta tu intención; para lo que pertenece a otra URL, resume en 1 frase y **enlaza** a esa URL.

## Anti-canibalización con fuxion.site (OBLIGATORIO)
El propietario tiene otro sitio (fuxion.site) que ya posiciona estos temas. **No los desarrolles** en ningún artículo (como mucho una frase neutra):
- Protocolos de uso: horario nocturno detallado, dosis por fases, "medio stick las primeras noches", "5 a 7 días seguidos", "protocolo de 3 noches".
- 28 sticks vs 7 sticks en términos de "cuántos días tomar".
- Prunex1 en el embarazo o lactancia como tema (solo mención breve: la ficha oficial dice que no es apto; consultar al médico).
- Preparar con agua "bien caliente" para "potenciar el efecto nocturno".
- Laxantes químicos/irritantes vs fibras.
- Estreñimiento por viajes; aliviar estreñimiento severo en horas; "limpieza de colon".
- Guías genéricas de estreñimiento, hinchazón o colon sin relación directa con Prunex1.

## Reglas obligatorias
1. **Solo se habla de Prunex1.** No menciones ni recomiendes otros productos FuXion (excepto en las comparativas asignadas y en el artículo de packs). Alimentos y fibras genéricas (psyllium, linaza, chía, guindones, avena) solo como comparación o contexto.
2. **Exactitud de etiqueta**: porción = 1 stick (5 g) en **180 ml** de agua caliente. Puedes decir "0 g de azúcares añadidos" y "sello sin azúcares", aclarando que contiene 0.2 g de azúcares totales, sorbitol y estevia.
3. **YMYL / salud**: es un alimento, no un medicamento; no cura, no trata, no previene enfermedades; no prometas plazos ni resultados. Señala cuándo consultar a un médico (dolor intenso, sangre en heces, pérdida de peso inexplicada, cambios bruscos del hábito intestinal, obstrucción, medicación, enfermedades crónicas). La evidencia de ingredientes (psyllium, inulina, guindón) es **del ingrediente en estudios**, con dosis propias, no del producto.
4. **Sin testimonios inventados**, sin nombres ficticios de clientes, sin calificaciones/estrellas, sin "miles de personas ya lo usan". Las afirmaciones de FuXion se presentan como "lo que comunica la marca" (callout `fabricante`).
5. **Texto 100 % original.** No copies ni parafrasees de cerca fuxion.site ni otras webs. Cada artículo debe tener una introducción distinta, ejemplos propios con contexto peruano (Lima, garúa, menú del día, combi, oficina en Miraflores o San Isidro, mercado, cebiche, pan con chicharrón, invierno húmedo, verano) y evitar frases plantilla repetidas entre artículos.
6. **Intención única**: la keyword principal aparece en el H1 (`title`), en `seoTitle`, en la primera frase de `quickAnswer` o del primer párrafo, y en al menos un H2, de forma natural.
7. **Enlazado interno**: 3–6 enlaces internos en el texto usando paths de `keyword_map.json` (formato `[ancla descriptiva](/pilar/slug/)`), siempre incluyendo el pilar de tu categoría y la página de compra `/comprar-prunex1/` al menos una vez. Anclas variadas y descriptivas.
8. Enlace a la tienda: si lo pones en el texto, usa exactamente `https://carlos-lingan.site.fuxion.com/prunex1/`. El componente añade además tarjetas de compra automáticamente.
9. Estilo: claro, cercano y experto; párrafos cortos (2–4 frases); listas y tablas cuando ayuden; respuestas directas. Nada de emojis.

## Extensión
- Artículos: **900–1,500 palabras** (contando bloques y FAQs).
- Pilares: **2,000–3,000 palabras**, con una sección que liste y enlace TODOS los artículos de su categoría con 1 frase cada uno.

## Formato del archivo
Escribe un JSON por URL en `src/content/articles/<slug>.json` (para pilares el slug es el del pilar). UTF-8, JSON válido:

```json
{
  "slug": "sin-grumos",
  "pillar": "como-preparar-prunex1",
  "path": "/como-preparar-prunex1/sin-grumos/",
  "isPillar": false,
  "primaryKeyword": "Prunex1 sin grumos",
  "title": "H1 (máx. 70 caracteres)",
  "seoTitle": "Title tag (máx. 60 caracteres)",
  "metaDescription": "140–155 caracteres, con la keyword y un beneficio",
  "excerpt": "1–2 frases para tarjetas",
  "quickAnswer": "Respuesta directa de 40–60 palabras (para fragmento destacado)",
  "readingMinutes": 6,
  "image": {
    "prompt": "English prompt for an AMBIENT photo, e.g. 'A steaming ceramic cup of reddish-amber infusion on a light wood table next to a small bowl of dried prunes and star anise, soft evening light in a cozy Lima apartment, minimal style'. NO packaging, NO sachets, NO text, NO logos, NO visible faces.",
    "alt": "Texto alternativo en español, descriptivo y único"
  },
  "blocks": [
    { "type": "p", "text": "Párrafo con **negritas**, *cursivas* y [enlaces](/ingredientes-prunex1/)." },
    { "type": "h2", "text": "Subtítulo en forma de pregunta o beneficio" },
    { "type": "h3", "text": "Subtítulo opcional" },
    { "type": "ul", "items": ["…", "…"] },
    { "type": "ol", "items": ["…", "…"] },
    { "type": "table", "caption": "…", "headers": ["…", "…"], "rows": [["…", "…"]] },
    { "type": "callout", "variant": "etiqueta | fabricante | aviso | tip", "title": "…", "text": "…" },
    { "type": "steps", "items": [{ "name": "Paso", "text": "…" }] },
    { "type": "cta", "text": "Frase corta que invita a ver el precio o comprar" }
  ],
  "faqs": [{ "q": "Pregunta", "a": "Respuesta de 2–4 frases" }],
  "sources": [{ "label": "Nombre de la fuente", "url": "https://…" }],
  "related": ["/ingredientes-prunex1/calorias/", "/…/"]
}
```
- Incluye 1 bloque `cta` hacia la mitad del artículo.
- Incluye al menos 1 `callout` (`etiqueta` para datos de la etiqueta, `fabricante` para lo que comunica FuXion, `aviso` para salud).
- En recetas/preparación usa un bloque `steps` (se marca como HowTo).
- 3–5 FAQs que NO repitan los H2. `related`: 3–4 paths existentes y cercanos.
- `sources`: solo URLs reales y estables (p. ej. efsa.europa.eu, pubmed.ncbi.nlm.nih.gov, ods.od.nih.gov, niddk.nih.gov, fda.gov, who.int, digesa.minsa.gob.pe, fuxion.com). Si no estás seguro de una URL exacta, usa la página principal del organismo.
- La imagen de ambiente nunca muestra empaques ni sticks (las fotos reales del producto las añade el sitio). El color de la bebida preparada es rojizo/ámbar (guindón), no verde.
- NO incluyas fechas; las añade el sistema.

## Validación
Tras escribir cada archivo ejecuta: `python3 scripts/validate_article.py src/content/articles/<slug>.json` y corrige hasta que diga OK.
