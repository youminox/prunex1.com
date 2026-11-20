#!/usr/bin/env python3
"""Envía todas las URLs del sitemap a IndexNow (Bing, Yandex, Seznam...). Uso: python3 scripts/indexnow.py"""
import json, re, pathlib, urllib.request
ROOT = pathlib.Path(__file__).resolve().parent.parent
key = next(p.stem for p in (ROOT / "public").glob("*.txt") if re.fullmatch(r"[0-9a-f]{32}", p.stem))
xml = urllib.request.urlopen("https://prunex1.com/sitemap.xml").read().decode()
urls = re.findall(r"<loc>([^<]+)</loc>", xml)
body = json.dumps({"host": "prunex1.com", "key": key, "keyLocation": f"https://prunex1.com/{key}.txt", "urlList": urls}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body, headers={"Content-Type": "application/json; charset=utf-8"})
with urllib.request.urlopen(req) as r:
    print(r.status, len(urls), "URLs enviadas")
