# Effable — waitlist

A standalone pre-launch landing page for [Effable](https://effable.me) — bottle the way you think — capturing creators who want early access.

This repo deploys independently of the main Effable app, but writes signups to the same Supabase project.

## Tech

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (Postgres + service-role insert)
- Inter + JetBrains Mono via `next/font/google`

## Develop

```bash
cp .env.example .env.local   # then fill in the three Supabase + site values
pnpm install
pnpm dev                      # http://localhost:5000
```

The form posts to `POST /api/waitlist` which inserts into the `waitlist_signups` table using the service-role key (so RLS doesn't get in the way).

### Required env

| Variable | Where it goes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL — bundled into the client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable key — bundled into the client |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only.** Bypasses RLS for the waitlist insert. Never commit. |
| `NEXT_PUBLIC_SITE_URL` | Origin (no trailing slash) for canonical/OG tags |

## Deploy

Any Next-friendly host works (Vercel, Cloudflare Pages, Railway). Set the four env vars above in the host's env config. No custom build step beyond `pnpm build`.

## Schema expectation

The `/api/waitlist` route assumes a `waitlist_signups` table in the shared Supabase project with at minimum:

- `email` (text, unique)
- `source` (text, nullable)
- `user_agent` (text, nullable)
- `referer` (text, nullable)
- `created_at` (timestamptz, default `now()`)

If the unique constraint fires (duplicate email) the route treats it as a successful signup (`{ ok: true, deduped: true }`).

---

An Effable product, by Wish-Machine.
