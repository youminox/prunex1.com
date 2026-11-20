#!/usr/bin/env python3
"""Control de calidad SEO de prunex1.com:
1) Canibalización interna: títulos/keywords demasiado parecidos y similitud de contenido entre URLs.
2) Similitud con fuxion.site (texto de artículos y productos) para garantizar textos 100 % distintos.
Uso: python3 scripts/seo_quality_check.py [--strict]
"""
import json, re, sys, pathlib, itertools

ROOT = pathlib.Path(__file__).resolve().parent.parent
FX = ROOT.parent / "fuxion.site/src/data"
STOP = set("de la el en y a los las un una que con por para del se es su al lo como más o sin sus le ya muy si sobre este esta tu te mi pero son entre cuando todo también hay qué cómo cuál fue ser tiene puede".split())

def text_of(a):
    parts = [a.get("title", ""), a.get("quickAnswer", "")]
    for b in a.get("blocks", []):
        for k in ("text", "title"):
            if b.get(k): parts.append(b[k])
        for it in b.get("items", []):
            parts.append(it if isinstance(it, str) else f"{it.get('name','')} {it.get('text','')}")
        for r in b.get("rows", []): parts.append(" ".join(map(str, r)))
    for f in a.get("faqs", []): parts += [f["q"], f["a"]]
    return " ".join(parts)

def toks(s):
    s = re.sub(r"\]\([^)]*\)", "]", s.lower())
    return [w for w in re.findall(r"[a-záéíóúñü0-9]+", s)]

def shingles(ws, n=6):
    return {" ".join(ws[i:i + n]) for i in range(len(ws) - n + 1)}

def jacc(a, b):
    return len(a & b) / max(1, min(len(a), len(b)))

arts = [json.loads(p.read_text()) for p in sorted((ROOT / "src/content/articles").glob("*.json"))]
sh = {a["path"]: shingles(toks(text_of(a))) for a in arts}
issues = 0

print("== Canibalización interna ==")
for x, y in itertools.combinations(arts, 2):
    tx = set(toks(x["title"])) - STOP; ty = set(toks(y["title"])) - STOP
    tsim = len(tx & ty) / max(1, min(len(tx), len(ty)))
    csim = jacc(sh[x["path"]], sh[y["path"]])
    if tsim >= 0.8 or csim >= 0.12:
        issues += 1
        print(f"  ! {x['path']}  <->  {y['path']}  título {tsim:.2f}  contenido {csim:.2f}")

print("== Similitud con fuxion.site ==")
fx_texts = []
if FX.exists():
    data = json.loads((FX / "articles.json").read_text())
    items = data if isinstance(data, list) else data.get("articles", [])
    for it in items:
        fx_texts.append((it.get("slug"), json.dumps(it, ensure_ascii=False)))
    for p in json.loads((FX / "products.json").read_text()):
        if p.get("slug") == "prunex1":
            fx_texts.append(("producto:prunex1", json.dumps(p, ensure_ascii=False)))
fx_sh = [(s, shingles(toks(t))) for s, t in fx_texts]
# Los datos literales de la etiqueta (lista de ingredientes) son hechos, no texto editorial: se excluyen.
LABEL = shingles(toks(json.loads((ROOT / "src/data/product.json").read_text())["ingredientsText"]))
fx_sh = [(s, fs - LABEL) for s, fs in fx_sh]
for a in arts:
    best = max(((jacc(sh[a["path"]], fs), s) for s, fs in fx_sh), default=(0, None))
    flag = best[0] >= 0.05
    if flag: issues += 1
    if flag or "--verbose" in sys.argv:
        print(f"  {'!' if flag else ' '} {a['path']}  máx. {best[0]:.3f} vs {best[1]}")
print("== Keywords contra fuxion.site ==")
if FX.exists():
    fxk = {}
    for it in items:
        for k in [it.get("primaryKeyword"), it.get("title"), it.get("seoTitle")]:
            if k: fxk[k.lower().strip()] = it.get("slug")
    km = json.loads((FX / "keyword_map.json").read_text()) if (FX / "keyword_map.json").exists() else []
    for it in (km if isinstance(km, list) else []):
        k = (it.get("primaryKeyword") or it.get("keyword") or "").lower().strip()
        if k: fxk[k] = it.get("slug")
    for a in arts:
        k = a["primaryKeyword"].lower().strip()
        if k in fxk:
            issues += 1
            print(f"  ! keyword '{k}' ya usada en fuxion.site ({fxk[k]})")
print(f"Revisadas {len(arts)} URLs · incidencias: {issues}")
sys.exit(1 if issues and "--strict" in sys.argv else 0)
