"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LogOut,
  Plus,
  Loader2,
  Pencil,
  Trash2,
  Star,
  ExternalLink,
  Film,
  Link2,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useAdminAuth } from "@/lib/use-admin-auth";
import {
  deleteVideo,
  fetchAllVideos,
  setFeatured,
} from "@/lib/supabase/admin-data";
import { autoThumbnail } from "@/lib/embed";
import type { VideoItem } from "@/lib/types";
import { VideoForm } from "@/components/admin/VideoForm";
import { Logo } from "@/components/Logo";

export default function AdminPage() {
  const router = useRouter();
  const { loading, isAdmin, user } = useAdminAuth();

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<VideoItem | null>(null);
  const [listError, setListError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setLoadingList(true);
      setListError(null);
      setVideos(await fetchAllVideos());
    } catch (e) {
      setListError(
        e instanceof Error ? e.message : "Could not load videos. Check your database schema."
      );
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin && isSupabaseConfigured) {
      router.replace("/admin/login");
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) reload();
  }, [isAdmin, reload]);

  async function signOut() {
    await getSupabaseBrowserClient()?.auth.signOut();
    router.replace("/admin/login");
  }

  async function onDelete(v: VideoItem) {
    if (!confirm(`Delete “${v.title}”? This can't be undone.`)) return;
    await deleteVideo(v.id);
    reload();
  }

  async function onFeature(v: VideoItem) {
    await setFeatured(v.id);
    reload();
  }

  // Not configured yet — friendly guidance.
  if (!isSupabaseConfigured) {
    return (
      <NotConfigured />
    );
  }

  if (loading || (!isAdmin && !user)) {
    return (
      <div className="bg-aurora grid min-h-screen place-items-center">
        <Loader2 className="animate-spin text-brand-400" size={28} />
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="bg-aurora grid min-h-screen place-items-center px-5 text-center">
        <div>
          <p className="text-slate-300">
            You&apos;re signed in as {user.email}, which isn&apos;t the admin
            account.
          </p>
          <button
            onClick={signOut}
            className="mt-4 rounded-full border border-brand-300/25 px-5 py-2 text-sm text-slate-200 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-aurora min-h-screen">
      <header className="glass sticky top-0 z-40 border-b border-brand-300/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-11 w-11" />
            <span className="text-sm font-semibold text-white">The Edit Circle</span>
            <span className="ml-1 rounded-full border border-gold-500/20 bg-gold-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold-300">
              Studio
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 text-sm text-slate-400 transition hover:text-white sm:inline-flex"
            >
              View site <ExternalLink size={14} />
            </Link>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-brand-300/20 px-4 py-2 text-sm text-slate-300 transition hover:text-white"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Your videos</h1>
            <p className="mt-1 text-sm text-slate-400">
              {videos.length} published · manage your portfolio
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 font-medium text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
            >
              <Plus size={18} /> Add video
            </button>
          )}
        </div>

        {showForm && (
          <div className="mt-6">
            <VideoForm
              editing={editing}
              onDone={() => {
                setShowForm(false);
                setEditing(null);
                reload();
              }}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
            />
          </div>
        )}

        <div className="mt-8 space-y-3">
          {loadingList ? (
            <div className="grid place-items-center py-16">
              <Loader2 className="animate-spin text-brand-400" size={24} />
            </div>
          ) : listError ? (
            <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-200">
              {listError}
              <p className="mt-2 text-amber-200/80">
                Run the SQL in <code>supabase/schema.sql</code> to create the
                table and storage buckets.
              </p>
            </div>
          ) : videos.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                <Film size={24} />
              </span>
              <p className="mt-4 font-medium text-white">No videos yet</p>
              <p className="mt-1 text-sm text-slate-400">
                Add your first edit to start building your portfolio.
              </p>
              <button
                onClick={() => {
                  setEditing(null);
                  setShowForm(true);
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-400"
              >
                <Plus size={16} /> Add video
              </button>
            </div>
          ) : (
            videos.map((v) => (
              <AdminRow
                key={v.id}
                video={v}
                onEdit={() => {
                  setEditing(v);
                  setShowForm(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onDelete={() => onDelete(v)}
                onFeature={() => onFeature(v)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function AdminRow({
  video,
  onEdit,
  onDelete,
  onFeature,
}: {
  video: VideoItem;
  onEdit: () => void;
  onDelete: () => void;
  onFeature: () => void;
}) {
  const poster =
    video.thumbnail_url ||
    (video.source === "embed" ? autoThumbnail(video.video_url) : null);
  return (
    <div className="glass glass-hover flex items-center gap-4 rounded-2xl p-3">
      <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-ink-800">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center text-brand-300/50">
            <Film size={18} />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-medium text-white">{video.title}</h3>
          {video.is_featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-300">
              <Star size={10} className="fill-amber-300" /> Showreel
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
          <span>{video.category}</span>
          <span className="inline-flex items-center gap-1">
            {video.source === "embed" ? (
              <>
                <Link2 size={11} /> Embed
              </>
            ) : (
              <>
                <Film size={11} /> Upload
              </>
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {!video.is_featured && (
          <button
            onClick={onFeature}
            title="Feature in showreel"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-ink-700/60 hover:text-amber-300"
          >
            <Star size={17} />
          </button>
        )}
        <button
          onClick={onEdit}
          title="Edit"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-ink-700/60 hover:text-brand-300"
        >
          <Pencil size={17} />
        </button>
        <button
          onClick={onDelete}
          title="Delete"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-ink-700/60 hover:text-red-400"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}

function NotConfigured() {
  return (
    <div className="bg-aurora grid min-h-screen place-items-center px-5">
      <div className="glass max-w-lg rounded-2xl p-8 text-center">
        <div className="flex justify-center">
          <Logo className="h-20 w-20" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-white">
          Connect Supabase to unlock the studio
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Add your <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to a{" "}
          <code>.env.local</code> file, run the SQL in{" "}
          <code>supabase/schema.sql</code>, then restart the dev server. Full
          steps are in the README.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full border border-brand-300/25 px-5 py-2.5 text-sm text-slate-200 transition hover:text-white"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
