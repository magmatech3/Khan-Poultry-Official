# Khan Poultry — Frontend

Static Next.js site for Khan Poultry. There is no backend: the cart, checkout, and admin panel are client-side demos that persist to `localStorage`.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Checks

```bash
npm run lint    # eslint
npm test        # pricing tests (node --test + tsx)
npm run build   # static export → out/
```

## Admin demo

- `/admin` — client-side login gate (any credentials; hint shown on the page).
- Orders, products, customers, analytics, and settings are rendered from a deterministic seed (`src/lib/admin/seed.ts`) stored in `localStorage` (`khans_admin_db_v1`). Mutations update the demo store only. "Reset demo data" re-seeds from scratch.
- The standalone, dependency-free seed lives at the **repo root** (`seed.ts`) so it can be reused outside the Next build (e.g. an n8n Code node).

## Deploy (GitHub Pages)

`.github/workflows/pages.yml` builds `frontend/out` and deploys via the official Pages action. It sets `NEXT_PUBLIC_BASE_PATH` to `/<repo-name>` so assets resolve under the repository's Pages path. GitHub Pages serves `.html` files for extensionless URLs, so the static export works as-is.

If you ever serve the site from a subpath locally, build with:

```bash
NEXT_PUBLIC_BASE_PATH=/some-path npm run build
```