#!/usr/bin/env python3
"""Genera imágenes de ambiente vía la edge function prunex1-images (Supabase charlielingan → OpenAI)
y las convierte a WebP ligeros en public/img/.

Uso:
  python3 scripts/gen_images.py articles        # una imagen destacada por artículo (image.prompt)
  python3 scripts/gen_images.py home            # imágenes de la home / producto (HOME_PROMPTS)
  python3 scripts/gen_images.py one <slug> "<prompt>"
Tamaños de salida: <slug>.webp (1200x675, ≤70 KB), <slug>-800.webp, <slug>-400.webp
"""
import json, sys, io, pathlib, urllib.request, concurrent.futures as cf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/prunex1-images"
TOKEN = (ROOT / "scripts/.cache/image_token").read_text().strip()
RAW = ROOT / "scripts/.cache/raw"; RAW.mkdir(parents=True, exist_ok=True)

HOME_PROMPTS = {
    "home-hero-ambiente": "A steaming ceramic cup of hot reddish-amber herbal infusion on a warm wooden kitchen counter in a bright Lima apartment, a small bowl of dried prunes, a couple of star anise pods and a lemon half beside it, soft morning light through a window, calm and light atmosphere, generous negative space on the left",
    "home-ritual-noche": "A cup of hot reddish-amber herbal infusion on a bedside table next to a warm lamp, an open book and a folded knit blanket, calm evening ritual at home in Lima, soft warm lamplight, cozy and relaxed",
    "home-cocina-guindones": "Close-up of a rustic ceramic bowl full of glossy dark dried prunes (guindones) on a wooden kitchen table, a few star anise pods and lemon slices nearby, a cup of hot reddish-amber infusion softly out of focus in the background, warm natural light",
    "home-ingredientes": "Flat lay of natural ingredients on light wood: dark dried prunes, star anise pods, golden flaxseeds in a wooden scoop, pale psyllium husk in a small ceramic bowl, roasted chicory root pieces, a strip of dried kelp seaweed and a halved lemon, minimalist editorial composition, warm daylight",
    "home-oficina": "A ceramic mug of hot reddish-amber herbal infusion on a modern office desk next to a laptop, a notebook and a small plant, view of the San Isidro skyline in Lima through the window, soft daylight, calm productive mood",
    "home-invierno-garua": "A steaming cup of reddish-amber herbal infusion held on a windowsill, grey drizzly garua sky over Lima rooftops outside the window, warm wool blanket and soft indoor light, cozy winter afternoon",
    "home-verano": "A glass cup of warm reddish-amber herbal infusion on a sunny terrace table overlooking the Pacific ocean cliffs of Miraflores, Lima, summer late afternoon light, light linen tablecloth, lemon slices on a small plate",
    "home-mercado": "A colorful Peruvian market stall in Lima with wooden crates of dried prunes, lemons, star anise and seeds in burlap sacks, warm natural light, vibrant but natural colors, no people visible",
    "home-manana-liviana": "A light healthy breakfast table by a sunny window in Lima: a cup of hot reddish-amber herbal infusion, a bowl of fresh fruit and a glass of water, airy linen curtains, morning light, fresh and light feeling",
    "og-default": "A single steaming ceramic cup of reddish-amber herbal infusion centered on a warm terracotta and cream gradient background, a few dried prunes and a star anise pod beside it, minimalist editorial still life, soft studio light",
    "preparacion-paso-1": "A kettle pouring hot steaming water into an empty ceramic cup on a wooden kitchen counter, close-up, minimal composition, soft warm light",
    "preparacion-paso-2": "Close-up of fine reddish-brown powder falling from above into a cup of hot water, creating a soft swirling cloud as it dissolves, wooden counter, high speed macro photography, warm light",
    "preparacion-paso-3": "A spoon stirring a hot reddish-amber herbal infusion in a ceramic cup, gentle swirl and light steam, close-up, wooden counter, warm natural light",
    "producto-taza-caliente": "A steaming hot reddish-amber herbal infusion in an elegant glass cup on a saucer, dried prunes, star anise and a lemon slice arranged around it, warm cream background, refined still life",
}

def call(slug, prompt):
    data = json.dumps({"slug": slug, "prompt": prompt}).encode()
    req = urllib.request.Request(ENDPOINT, data=data, headers={"Content-Type": "application/json", "x-prunex1-token": TOKEN})
    with urllib.request.urlopen(req, timeout=240) as r:
        res = json.loads(r.read())
    if not res.get("ok"):
        raise RuntimeError(res.get("error"))
    with urllib.request.urlopen(res["url"] + "?v=1", timeout=120) as r:
        return r.read()

def save_variants(slug, raw_bytes, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    # recorte 16:9
    w, h = im.size; target = 16 / 9
    if w / h > target:
        nw = int(h * target); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    sizes = {"": 1200, "-800": 800, "-400": 400}
    limits = {"": 70_000, "-800": 42_000, "-400": 16_000}
    out = {}
    for suf, width in sizes.items():
        r = im.resize((width, round(width * 9 / 16)), Image.LANCZOS)
        q = 78
        while True:
            buf = io.BytesIO(); r.save(buf, "WEBP", quality=q, method=6)
            if buf.tell() <= limits[suf] or q <= 45: break
            q -= 6
        p = outdir / f"{slug}{suf}.webp"; p.write_bytes(buf.getvalue()); out[suf] = buf.tell()
    return out

def job(slug, prompt, outdir):
    final = outdir / f"{slug}.webp"
    if final.exists():
        return slug, "skip"
    rawp = RAW / f"{slug}.webp"
    if rawp.exists():
        b = rawp.read_bytes()
    else:
        last = None
        for _ in range(3):
            try:
                b = call(slug, prompt); break
            except Exception as e:
                last = e
        else:
            return slug, f"ERROR {last}"
        rawp.write_bytes(b)
    sizes = save_variants(slug, b, outdir)
    return slug, f"ok {sizes['']//1024}KB"

def main():
    mode = sys.argv[1]
    tasks = []
    if mode == "home":
        for s, p in HOME_PROMPTS.items():
            tasks.append((s, p, ROOT / "public/img/ambiente"))
    elif mode == "articles":
        for f in sorted((ROOT / "src/content/articles").glob("*.json")):
            a = json.loads(f.read_text())
            tasks.append((a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos"))
    elif mode == "one":
        tasks.append((sys.argv[2], sys.argv[3], ROOT / "public/img/ambiente"))
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for slug, status in ex.map(lambda t: job(*t), tasks):
            print(slug, status, flush=True)

if __name__ == "__main__":
    main()
