# Dhawal Khatri: Portfolio + Me-API

Personal portfolio for Dhawal Khatri (IIT Madras), with its own "Me-API" for the content.
The site and its JSON API live in one Next.js app deployed on Vercel.

- **Portfolio**: experience, projects (with case-study pages), live websites, decks with an in-page viewer,
  research, leadership, achievements, skills and contact.
- **Me-API**: REST endpoints over Postgres (Prisma) that serve the same content; try them at `/playground`.
- **Interactions**: kynq-style yarn cursor trail, ⌘K command palette, cursor-spotlight glass cards,
  magnetic buttons, tilt previews and scroll reveals. All motion respects `prefers-reduced-motion`.

## Stack

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · framer-motion · cmdk · Prisma 6 · Neon Postgres · Vercel

## Content

All content lives in `data/*.ts` and is typed by `lib/types.ts`.

- With `DATABASE_URL` set, pages and the API read from Postgres.
- Without it, or if the database is unreachable or empty, they fall back to the bundled data.

`npm run db:seed` rebuilds the database from `data/`, so `data/` stays the single source of truth.
On Vercel, each build reseeds only when `data/` has changed (tracked by a content hash), so edits made
through the API survive redeploys that don't touch `data/`.

Deck slides are pre-rendered images in `public/decks/<slug>/NN.webp`, with `cover.webp` and a downloadable PDF.
Site previews are in `public/sites/<slug>.webp`.

## API

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api` | Endpoint index |
| GET | `/api/profile` | Profile and skills |
| GET | `/api/search?q=&type=` | Search across all content |
| GET | `/api/{projects,experiences,pors,decks,sites,achievements,publications}` | `?skill=`, `?category=`, `?featured=` |
| GET | `/api/:resource/:id` | Database mode only |
| POST / PUT / DELETE | `/api/:resource[/:id]` | Requires `Authorization: Bearer $API_KEY` |

## Local development

```bash
npm install
cp .env.example .env    # optional: DATABASE_URL, DATABASE_URL_UNPOOLED, API_KEY
npm run dev
```

With a database:

```bash
npm run db:migrate && npm run db:seed
```

## Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Pooled Postgres connection (Neon integration sets it) |
| `DATABASE_URL_UNPOOLED` | Direct connection used by migrations |
| `API_KEY` | Bearer token for write endpoints |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata (defaults to `https://dhawal-khatri.vercel.app`) |
