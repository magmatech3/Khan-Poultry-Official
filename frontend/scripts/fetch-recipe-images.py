import json
import os
import pathlib
import time
import urllib.parse
import urllib.request

KEY = os.environ["PEXELS_API_KEY"]
OUT = pathlib.Path(__file__).resolve().parent.parent / "public" / "images" / "recipes"
OUT.mkdir(parents=True, exist_ok=True)

QUERIES = {
    "creamy-chicken-mushroom": "creamy chicken mushroom skillet",
    "spicy-stir-fry-squid-rings": "spicy squid stir fry",
    "lobster-tails-garlic-lemon-butter": "lobster tails garlic butter",
    "tilapia-broccoli": "grilled tilapia broccoli",
    "orange-glazed-roast-duck": "roasted whole duck",
    "shrimp-kebabs": "shrimp skewers grilled",
    "oven-baked-chicken-breast-spinach-mozzarella": "stuffed chicken breast spinach mozzarella",
    "eggs-benedict-pink-salmon": "eggs benedict salmon",
    "steak-marinade": "marinated raw steak",
}

HDRS = {
    "Authorization": KEY,
    "User-Agent": "Mozilla/5.0",
}

for slug, query in QUERIES.items():
    dest = OUT / f"{slug}.jpg"
    if dest.exists():
        print(f"skip {slug}")
        continue
    url = "https://api.pexels.com/v1/search?" + urllib.parse.urlencode(
        {"query": query, "per_page": 40, "orientation": "landscape"}
    )
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=HDRS), timeout=30) as r:
            body = json.load(r)
        photo = body["photos"][0]
        img = photo["src"]["large2x"]
        with urllib.request.urlopen(urllib.request.Request(img, headers={"User-Agent": "Mozilla/5.0"}), timeout=60) as r:
            data = r.read()
        dest.write_bytes(data)
        print(f"ok {slug} {len(data)}b")
    except Exception as e:
        print(f"ERR {slug}: {e}")
    time.sleep(0.4)