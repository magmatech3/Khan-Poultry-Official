#!/usr/bin/env python3
"""One-off: download one Pexels photo per product slug into public/images/products/<slug>.jpg.

Run from frontend/:  PEXELS_API_KEY=xxxx python3 scripts/fetch-product-images.py
"""
from __future__ import annotations

import json
import os
import re
import shutil
import sqlite3
import time
import urllib.parse
import urllib.request

API_KEY = os.environ["PEXELS_API_KEY"]
OUT = "public/images/products"
DB = "data/dev.db"

# Ordered: specific proteins before generic terms. First match wins.
PROTEIN_QUERIES = [
    (r"shrimp|prawn", "raw shrimp seafood"),
    (r"squid", "fresh squid seafood"),
    (r"crab", "fresh crab seafood"),
    (r"herring", "smoked herring fish"),
    (r"lambie", "conch seafood fresh"),
    (r"shark", "raw fish fillet"),
    (r"marlin", "marlin fish steak"),
    (r"salmon", "fresh salmon fillet"),
    (r"tuna", "fresh tuna steak"),
    (r"mahi", "mahi mahi fish"),
    (r"carite", "mackerel fish fresh"),
    (r"king.?fish", "kingfish fresh whole"),
    (r"oxtail", "raw oxtail"),
    (r"cow heel", "beef bones soup"),
    (r"beef liver", "raw beef liver"),
    (r"soup bone", "beef bones"),
    (r"minced beef", "minced beef raw"),
    (r"minced lamb", "minced lamb raw"),
    (r"minced chicken", "minced chicken raw"),
    (r"beef", "raw beef steak"),
    (r"lamb rack", "rack of lamb raw"),
    (r"lamb leg", "leg of lamb raw"),
    (r"lamb shoulder", "lamb shoulder raw"),
    (r"lamb loin", "lamb loin raw"),
    (r"lamb stew", "lamb stew meat raw"),
    (r"lamb chop|lamb rib|stir fry lamb", "raw lamb chops"),
    (r"lamb", "raw lamb meat"),
    (r"goat", "raw goat meat"),
    (r"turkey", "raw turkey meat"),
    (r"duck", "raw duck meat"),
    (r"gizzard", "raw chicken gizzard"),
    (r"chicken feet", "raw chicken feet"),
    (r"chicken neck", "raw chicken neck"),
    (r"chicken liver", "raw chicken liver"),
    (r"tender", "raw chicken tenders"),
    (r"kebab", "chicken kebab skewer raw"),
    (r"wing", "raw chicken wings"),
    (r"drumstick", "raw chicken drumsticks"),
    (r"whole legs|whole leg", "raw chicken legs"),
    (r"thigh", "raw chicken thighs"),
    (r"mixed pack|cut.?up|quarters", "raw chicken pieces"),
    (r"breast|boneless", "raw chicken breast"),
    (r"whole chicken", "whole raw chicken"),
    (r"chicken", "raw chicken"),
]

PREP = [
    (r"jerk", "jerk seasoning"),
    (r"geera", "cumin spiced meat"),
    (r"spicy.*khan|khan.?s herb", "spicy herb marinade"),
    (r"mediterranean", "herb marinated"),
    (r"breaded", "breaded fried"),
    (r"seasoned", "marinated seasoned"),
]


def query_for(name: str) -> str:
    low = name.lower()
    base = "fresh raw meat"
    for pat, q in PROTEIN_QUERIES:
        if re.search(pat, low):
            base = q
            break
    for pat, suffix in PREP:
        if re.search(pat, low):
            return f"{base} {suffix}"
    return base


def search(query: str) -> list:
    url = (
        "https://api.pexels.com/v1/search?"
        + urllib.parse.urlencode(
            {"query": query, "per_page": 80, "orientation": "landscape"}
        )
    )
    req = urllib.request.Request(
        url, headers={"Authorization": API_KEY, "User-Agent": "Mozilla/5.0"}
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r).get("photos", [])


def download(url: str, dest: str):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as f:
        shutil.copyfileobj(r, f)


def main():
    os.makedirs(OUT, exist_ok=True)

    con = sqlite3.connect(DB)
    slugs = [
        r[0]
        for r in con.execute(
            "select slug from products where is_active=1"
        )
    ]
    # Clear previously downloaded slug files so duplicates get re-fetched.
    for s in slugs:
        f = os.path.join(OUT, f"{s}.jpg")
        if os.path.exists(f):
            os.remove(f)

    rows = con.execute(
        "select p.slug, p.name, c.slug from products p "
        "join categories c on c.id=p.category_id where p.is_active=1 order by p.name"
    ).fetchall()

    cache: dict[str, list] = {}
    used_ids: set = set()
    cat_fallback = {
        "poultry-fresh": "chicken-breast.jpg",
        "poultry-seasoned": "seasoned-chicken.jpg",
        "specialty-meats": "beef-steak.jpg",
        "seafood": "seafood.jpg",
    }

    def photos_for(q: str) -> list:
        if q not in cache:
            cache[q] = search(q)
            time.sleep(1.2)
        return cache[q]

    ok = failed = 0
    for slug, name, cat in rows:
        dest = os.path.join(OUT, f"{slug}.jpg")
        q = query_for(name)
        try:
            photos = photos_for(q)
            photo = next((p for p in photos if p["id"] not in used_ids), None)
            if photo is None:
                # Query pool exhausted (shared across variants) -> widen.
                base = q.split(" marinated")[0].split(" herb")[0].split(" spicy")[0]
                for alt in (base, "fresh raw meat"):
                    if alt == q:
                        continue
                    photo = next(
                        (p for p in photos_for(alt) if p["id"] not in used_ids), None
                    )
                    if photo is not None:
                        break
            if photo is None:
                raise ValueError("no unused photos")
            used_ids.add(photo["id"])
            download(photo["src"]["large"], dest)
            ok += 1
            print(f"OK   {slug}  [{photo['id']}]<- {q}")
        except Exception as e:  # noqa: BLE001
            failed += 1
            src = os.path.join(OUT, cat_fallback.get(cat, "seafood.jpg"))
            if os.path.exists(src):
                shutil.copyfile(src, dest)
            print(f"FALL {slug}  ({e})")

    print(f"\ndone: {ok} ok, {failed} fallback, {len(rows)} total")


if __name__ == "__main__":
    main()
