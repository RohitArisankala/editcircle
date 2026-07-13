# EditCircle — Video Editor Portfolio + Admin Studio

A cinematic, dark-blue portfolio for a freelance video editor, with a
password-protected **admin studio** to upload and manage edited videos.

- **Public site:** hero + showreel, filterable portfolio grid, services,
  pricing, about, and a contact form.
- **Admin studio (`/admin`):** drag-and-drop video upload to Supabase Storage
  (or paste a YouTube/Vimeo link), edit/delete, and pick the hero showreel.
- Runs on built-in **demo content** until you connect Supabase — so it looks
  finished from the first `npm run dev`.

## Tech

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
Supabase (Auth + Postgres for metadata) · Cloudinary (video/image files).

---

## 1. Install & run

```bash
npm install
npm run dev
```

Open http://localhost:3000. The site works immediately with demo videos.

---

## 2. Connect the backend (to make it yours)

Two free services: **Supabase** stores the video *metadata* + your admin login,
**Cloudinary** stores the actual video/image *files*.

### a) Supabase (database + login)

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → paste all of `supabase/schema.sql` → **Run**.
   This creates the `videos` table and its security policies.
3. **Authentication → Users → Add user** → create your admin email + password.
4. **Project Settings → API** → copy the **Project URL** and **anon public** key.

### b) Cloudinary (video files — free tier)

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. Note your **Cloud name** (Dashboard → Settings).
3. **Settings → Upload → Upload presets → Add upload preset**, set
   **Signing Mode = Unsigned**, save, and copy its **name**.

### c) Fill in `.env.local`

Copy `.env.local.example` to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-anon-key
NEXT_PUBLIC_ADMIN_EMAIL=you@example.com   # optional: locks admin to this email

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=YOUR-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=YOUR-unsigned-preset
```

Restart `npm run dev`, go to **http://localhost:3000/admin**, sign in, and start
uploading. As soon as you add a real video, the demo content disappears.

> Uploads are capped at 100 MB (Cloudinary free-tier per-file limit). For long
> videos, use the **Embed link** tab (YouTube/Vimeo) instead — no size limit,
> and it's how most editors showcase reels anyway.

---

## 3. Make it your brand

Edit `src/lib/site.ts` — name, tagline, services, pricing, socials, and stats
all live there. Swap the About photo URL in `src/components/About.tsx`.

Colors live as design tokens at the top of `src/app/globals.css`
(`--color-brand-*`, `--color-ink-*`).

---

## 4. Deploy

Deploy to Vercel (recommended). Add the same `NEXT_PUBLIC_*` environment
variables in the Vercel project settings, then deploy.

## Project structure

```
src/
  app/
    page.tsx            Public portfolio
    admin/page.tsx      Admin dashboard (upload/manage)
    admin/login/page.tsx
  components/           Hero, PortfolioGrid, Services, Pricing, …
    admin/VideoForm.tsx Drag-and-drop uploader
  lib/
    site.ts             ← edit your branding here
    videos.ts           Public data fetch (demo fallback)
    supabase/           Client, server, and admin CRUD helpers
supabase/schema.sql     Run once in Supabase
```
