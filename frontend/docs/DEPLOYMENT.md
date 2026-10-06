# Deployment Guide

## Prerequisites
- Node.js 22+
- pnpm or npm
- SQLite (dev) — no external database server required

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

**Required:**
- `SESSION_SECRET` — random string, e.g. `openssl rand -hex 32`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` — first admin account

**Optional:**
- `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` — enables order emails
- `NOTIFICATIONS_TO` — internal review address for order notifications
- `WIPAY_*` — WiPay online payments (currently disabled; checkout supports cash/manual only)

## Database Setup

The app uses SQLite via `better-sqlite3` + Drizzle. The database file is created at `data/dev.db` on first request.

```bash
# Generate a new migration after schema changes
npm run db:generate

# Open the Drizzle studio GUI
npm run db:studio
```

> `data/` and `drizzle/` are gitignored. Migrations live in `drizzle/meta/`.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub.
2. Connect the repo in the Vercel dashboard.
3. Set environment variables (see above).
4. Deploy automatically on push to `main`.

### Self-hosted

```bash
npm run build
npm start
```

Use PM2 for process management:

```bash
pm2 start npm --name "khans-poultry" -- start
```

### Docker

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t khans-poultry .
docker run -p 3000:3000 --env-file .env.local khans-poultry
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests (Node test runner) |
| `npm run db:generate` | Generate a Drizzle migration |
| `npm run db:studio` | Open Drizzle studio |

## Monitoring

### Health Check
- Endpoint: `GET /api/health`
- Returns: `{ status: "ok", timestamp: "2024-01-01T00:00:00Z" }`

### Logging
- Logs written to stdout/stderr
- Use `LOG_LEVEL=debug` for verbose logging

### Error Tracking
- Configure Sentry via `NEXT_PUBLIC_SENTRY_DSN`

## Security Checklist

- [ ] `SESSION_SECRET` is set and secure
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Admin credentials changed from defaults
- [ ] `.env` files not committed to git

## Backup Strategy

### Database Backups (SQLite)
```bash
cp data/dev.db backup_$(date +%Y%m%d).sql
```

### Automated Backups
- Set up daily cron job
- Store backups offsite (S3, Backblaze, etc.)
- Test restore procedure monthly

## Scaling Considerations

- SQLite is single-connection; switch to PostgreSQL for multi-instance deployments
- Enable CDN for static assets
- Consider Redis for session storage at scale

## Troubleshooting

### "Database is locked" (SQLite)
- Only one connection allowed
- Ensure no other process holds the DB open
- For production multi-user deployments, switch to PostgreSQL

### "Session not found"
- Check `SESSION_SECRET` matches across instances
- Verify cookie settings

### "Build failed"
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### "Admin login fails"
- Verify admin user exists in database
- Check password meets requirements
- Ensure session cookies are enabled