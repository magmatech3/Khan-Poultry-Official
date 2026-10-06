# Khan's Poultry & Meats

A modern, fast static website for Khan's Poultry & Meats — Trinidad's trusted source for fresh halal poultry, specialty meats, and seafood.

## Tech Stack

- **Framework**: Next.js 16.3.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP
- **Deployment**: GitHub Pages (static export)
- **Build Output**: 217 static HTML pages, ~147MB total

## Project Structure

```
Khan Poultry/
├── frontend/              # Next.js application
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   │   ├── (site)/   # Public pages (home, menu, about, etc.)
│   │   │   └── admin/    # Admin dashboard (client-side demo)
│   │   ├── components/   # React components
│   │   └── lib/          # Business logic, utilities, data
│   ├── public/           # Static assets
│   │   ├── images/       # Product images (WebP), social, recipes
│   │   │   └── products/ # 147 product images (1200×900, WebP)
│   │   ├── videos/       # Video assets (~90MB)
│   │   └── PHOTOCREDITS.md
│   ├── docs/             # Additional documentation
│   ├── package.json
│   └── next.config.ts    # Static export config
├── .github/workflows/    # CI/CD for GitHub Pages
├── graphify-out/         # Code graph analysis (gitignored)
└── README.md             # This file
```

## Local Development

### Prerequisites
- Node.js 22.x
- npm

### Setup
```bash
cd frontend
npm install
npm run dev
```

The site will be available at `http://localhost:3000`

### Available Scripts
```bash
npm run dev        # Start development server
npm run build      # Build static export to frontend/out/
npm run lint       # Run ESLint
npm test           # Run unit tests
```

## Building for Production

```bash
cd frontend
npm run build
```

Static files are generated in `frontend/out/` and can be served from any static host.

## GitHub Pages Deployment

### Automatic Deployment (Recommended)
Push to the `main` branch — GitHub Actions automatically builds and deploys.

The workflow (`.github/workflows/deploy.yml`):
1. Installs dependencies
2. Runs lint and tests
3. Builds static export with `NEXT_PUBLIC_BASE_PATH=/<repo-name>`
4. Deploys to GitHub Pages

### Manual Deployment
If deploying manually or to a different host:

```bash
cd frontend
NEXT_PUBLIC_BASE_PATH=/<repo-name> npm run build
# Upload contents of frontend/out/ to your host
```

**Important**: Set `NEXT_PUBLIC_BASE_PATH` to your repository name if deploying to `https://username.github.io/repo-name/`. Leave empty if deploying to a root domain.

### GitHub Pages Configuration
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will auto-deploy on push to `main`

## Features

### Public Site
- **Homepage**: Hero, categories, stats, testimonials, locations
- **Menu**: 115 products across 4 categories with search, filters, pagination
- **Product Images**: All 147 images optimized to WebP (35% size reduction)
- **Cart**: Client-side localStorage cart with demo checkout
- **Recipes**: 9 featured recipes with detailed instructions
- **Contact/Directions**: Store locations with embedded maps
- **Responsive**: Mobile-first design, works on all screen sizes

### Admin Dashboard (Demo)
- Analytics dashboard
- Product management (CRUD)
- Order tracking
- Customer management
- **Note**: Admin uses client-side localStorage — no backend

## Performance Optimizations

- **WebP Images**: All 147 product images converted from JPEG to WebP (34MB → 22MB)
- **Lazy Loading**: Images beyond the first 4 use `loading="lazy"`
- **Static Export**: Zero server-side rendering overhead
- **Optimized Build**: ~1.9MB JavaScript bundle

## Credits

- Product images: See `frontend/public/PHOTOCREDITS.md` for attribution
- Icons: Custom SVGs
- Fonts: System font stack

## License

Proprietary - © Khan's Poultry & Meats

## Contributing

This is a client project. External contributions are not accepted.

## Support

For technical issues or questions, contact the development team.
