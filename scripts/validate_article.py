#!/usr/bin/env python3
"""Valida un artículo JSON de prunex1.com. Uso: validate_article.py <file> [<file>...]"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
KMAP = json.loads((ROOT / "src/data/keyword_map.json").read_text())
PATHS = {k["path"] for k in KMAP} | {"/", "/comprar-prunex1/", "/sobre-el-distribuidor/", "/contacto/"}
SHOP = "https://carlos-lingan.site.fuxion.com/prunex1/"
FORBIDDEN = [
    (r"\b18\s?ml\b", "porción errónea (son 180 ml)"),
    (r"\bcura(r|n)?\b", "claim de curación"),
    (r"elimina(r|n)? (las |tus )?toxinas", "claim detox no respaldado"),
    (r"limpieza (profunda )?de colon", "tema/keyword de fuxion.site y claim no respaldado"),
    (r"garantizad[oa]s? (resultados|bajar|perder)", "promesa de resultados"),
    (r"pierde(s)? \d+ ?(kg|kilos)", "promesa de kilos"),
    (r"129[.,]50", "precio incorrecto: el precio de catálogo es S/ 76.00"),
    (r"durante \d+ (a|o) \d+ d[ií]as", "no dar protocolos de días (tema de fuxion.site)"),
    (r"\d+ d[ií]as seguidos", "no dar protocolos de días (tema de fuxion.site)"),
    (r"\d+([.,]\d+)? ?mg de (magnesio|yodo|sorbitol)", "cantidad no declarada en la etiqueta"),
    (r"fuxion\.site", None),
]
WARN_PATTERNS = [
    (r"\d+([.,]\d+)? ?g de (psyllium|inulina|guind[oó]n|mucílago)", "cantidad por stick no declarada: asegúrate de que sea una dosis de estudio/general, no del producto"),
    (r"antes de dormir", "cuidado: no convertir en protocolo de horario (fuxion.site)"),
]
OTHER_PRODUCTS = ["thermo t3", "beauty-in", "beauty in", "biopro", "vita xtra", "no stress", "nocarb", "golden flx", "youth elixir", "flora liv", "cafe cafe", "café café", "liquid fiber", "alpha balance", "matcha pep-t", "berry balance", "rexet", "probix"]
ALLOW_PRODUCTS = {
    "vs-liquid-fiber": ["liquid fiber"], "vs-flora-liv": ["flora liv"], "vs-alpha-balance": ["alpha balance"],
    "comparativas-prunex1": ["liquid fiber", "flora liv", "alpha balance"], "vs-probioticos": ["flora liv", "probix"],
    "packs-con-prunex1": OTHER_PRODUCTS, "quien-fabrica-prunex1": OTHER_PRODUCTS,
}

def words(s):
    return len(re.findall(r"\w+", s))

def check(path):
    errs, warns = [], []
    p = pathlib.Path(path)
    try:
        a = json.loads(p.read_text())
    except Exception as e:
        return [f"JSON inválido: {e}"], []
    entry = next((k for k in KMAP if k["slug"] == a.get("slug") and k["pillar"] == a.get("pillar")), None)
    if not entry:
        errs.append("slug/pillar no existe en keyword_map.json")
    else:
        if a.get("path") != entry["path"]:
            errs.append(f"path debe ser {entry['path']}")
        if a.get("primaryKeyword") != entry["primaryKeyword"]:
            errs.append("primaryKeyword no coincide con keyword_map")
    for f in ["title", "seoTitle", "metaDescription", "excerpt", "quickAnswer", "blocks", "faqs", "image", "related"]:
        if not a.get(f):
            errs.append(f"falta {f}")
    if errs:
        return errs, warns
    if len(a["title"]) > 75: errs.append(f"title {len(a['title'])} > 75")
    if len(a["seoTitle"]) > 62: errs.append(f"seoTitle {len(a['seoTitle'])} > 62")
    if not 120 <= len(a["metaDescription"]) <= 160: errs.append(f"metaDescription {len(a['metaDescription'])} fuera de 120–160")
    qa = words(a["quickAnswer"])
    if not 30 <= qa <= 75: warns.append(f"quickAnswer {qa} palabras")
    if not a["image"].get("prompt") or not a["image"].get("alt"): errs.append("image.prompt/alt")
    text_parts = [a["title"], a["quickAnswer"]]
    types = []
    for b in a["blocks"]:
        t = b.get("type"); types.append(t)
        if t in ("p", "h2", "h3"): text_parts.append(b.get("text", ""))
        elif t in ("ul", "ol"): text_parts += b.get("items", [])
        elif t == "table": text_parts += [" ".join(map(str, r)) for r in b.get("rows", [])] + b.get("headers", [])
        elif t == "callout": text_parts += [b.get("title", ""), b.get("text", "")]
        elif t == "steps": text_parts += [i.get("name", "") + " " + i.get("text", "") for i in b.get("items", [])]
        elif t == "cta": text_parts.append(b.get("text", ""))
        else: errs.append(f"bloque desconocido {t}")
    for f in a["faqs"]:
        text_parts += [f.get("q", ""), f.get("a", "")]
    full = "\n".join(text_parts)
    n = words(full)
    lo, hi = (1900, 3600) if a.get("isPillar") else (850, 1900)
    if not lo <= n <= hi: errs.append(f"{n} palabras (esperado {lo}–{hi})")
    if "cta" not in types: errs.append("falta bloque cta")
    if "callout" not in types: errs.append("falta callout")
    if types.count("h2") < 3: errs.append("menos de 3 H2")
    if not 3 <= len(a["faqs"]) <= 6: errs.append("FAQs deben ser 3–6")
    low = full.lower()
    for pat, msg in FORBIDDEN:
        if pat == r"fuxion\.site":
            if re.search(pat, low) and a["slug"] != "quien-fabrica-prunex1":
                errs.append("no enlazar/mencionar fuxion.site aquí")
            continue
        if re.search(pat, low): errs.append(f"prohibido: '{pat}' ({msg})")
    for op in OTHER_PRODUCTS:
        if op in low and op not in ALLOW_PRODUCTS.get(a["slug"], []): errs.append(f"menciona otro producto FuXion: {op}")
    for pat, msg in WARN_PATTERNS:
        if re.search(pat, low): warns.append(f"revisar '{pat}': {msg}")
    links = re.findall(r"\]\(([^)]+)\)", full)
    internal = [l for l in links if l.startswith("/")]
    for l in links:
        if l.startswith("/") and l not in PATHS: errs.append(f"enlace interno inexistente {l}")
        elif l.startswith("http") and "carlos-lingan.site.fuxion.com" in l and l != SHOP: errs.append(f"URL tienda incorrecta {l}")
    if len(set(internal)) < 3: errs.append(f"solo {len(set(internal))} enlaces internos (mín. 3)")
    if a["pillar"] != a["slug"] and f"/{a['pillar']}/" not in internal: errs.append("falta enlace al pilar")
    if "/comprar-prunex1/" not in internal: errs.append("falta enlace a /comprar-prunex1/")
    for r in a["related"]:
        if r not in PATHS: errs.append(f"related inexistente {r}")
    kw = a["primaryKeyword"].lower()
    core = [w for w in re.findall(r"\w+", kw) if len(w) > 3]
    if core and sum(w in a["title"].lower() for w in core) < max(1, len(core) - 1):
        warns.append("keyword poco presente en title")
    if a.get("isPillar"):
        kids = [k["path"] for k in KMAP if k["pillar"] == a["pillar"] and not k["isPillar"]]
        missing = [k for k in kids if k not in internal]
        if missing: errs.append(f"pilar no enlaza {len(missing)} artículos: {missing[:5]}")
    return errs, warns + [f"{n} palabras"]

ok_all = True
for f in sys.argv[1:]:
    e, w = check(f)
    if e:
        ok_all = False
        print(f"FAIL {f}"); [print("  -", x) for x in e]
    else:
        print(f"OK {f} ({'; '.join(w)})")
sys.exit(0 if ok_all else 1)
