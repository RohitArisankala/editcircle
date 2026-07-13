-- ═══════════════════════════════════════════════════════════════
-- EditCircle — Supabase schema (database + auth only)
-- Video FILES live on Cloudinary; Supabase just stores the metadata.
-- Run this in your Supabase project: Dashboard → SQL Editor → New query
-- ═══════════════════════════════════════════════════════════════

-- 1) Videos table ------------------------------------------------
create table if not exists public.videos (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  category      text not null default 'Motion Graphics',
  video_url     text not null,
  thumbnail_url text,
  source        text not null default 'upload' check (source in ('upload', 'embed')),
  is_featured   boolean not null default false,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists videos_sort_idx on public.videos (sort_order, created_at desc);

-- 2) Row Level Security -----------------------------------------
alter table public.videos enable row level security;

-- Anyone can read the portfolio (public site).
drop policy if exists "Public can read videos" on public.videos;
create policy "Public can read videos"
  on public.videos for select
  using (true);

-- Only signed-in users (your admin) can create/update/delete.
drop policy if exists "Authenticated can insert videos" on public.videos;
create policy "Authenticated can insert videos"
  on public.videos for insert
  to authenticated with check (true);

drop policy if exists "Authenticated can update videos" on public.videos;
create policy "Authenticated can update videos"
  on public.videos for update
  to authenticated using (true) with check (true);

drop policy if exists "Authenticated can delete videos" on public.videos;
create policy "Authenticated can delete videos"
  on public.videos for delete
  to authenticated using (true);

-- ✅ Done. Create your admin login under Dashboard → Authentication → Users.
--    Video files are uploaded to Cloudinary (see README) — no Storage buckets needed.
