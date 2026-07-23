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

-- 3) Contact messages -------------------------------------------
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Anyone (a website visitor) can submit the contact form.
drop policy if exists "Anyone can send a message" on public.messages;
create policy "Anyone can send a message"
  on public.messages for insert
  to anon, authenticated
  with check (true);

-- Only the signed-in admin can read / update / delete messages.
drop policy if exists "Authenticated can read messages" on public.messages;
create policy "Authenticated can read messages"
  on public.messages for select
  to authenticated using (true);

drop policy if exists "Authenticated can update messages" on public.messages;
create policy "Authenticated can update messages"
  on public.messages for update
  to authenticated using (true) with check (true);

drop policy if exists "Authenticated can delete messages" on public.messages;
create policy "Authenticated can delete messages"
  on public.messages for delete
  to authenticated using (true);

-- ✅ Done. Create your admin login under Dashboard → Authentication → Users.
--    Video files are uploaded to Cloudinary (see README) — no Storage buckets needed.
