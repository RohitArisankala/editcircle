"use client";

import { useRef, useState } from "react";
import {
  Loader2,
  UploadCloud,
  Link2,
  Film,
  ImagePlus,
  X,
  CheckCircle2,
} from "lucide-react";
import { VIDEO_CATEGORIES, type VideoItem, type VideoSource } from "@/lib/types";
import { createVideo, updateVideo } from "@/lib/supabase/admin-data";
import {
  uploadCloudinaryVideo,
  uploadCloudinaryImage,
  cloudinaryVideoPoster,
  isCloudinaryConfigured,
} from "@/lib/cloudinary";
import { toEmbedUrl } from "@/lib/embed";

const MAX_VIDEO_MB = 100;

export function VideoForm({
  editing,
  onDone,
  onCancel,
}: {
  editing?: VideoItem | null;
  onDone: () => void;
  onCancel?: () => void;
}) {
  const [source, setSource] = useState<VideoSource>(editing?.source ?? "upload");
  const [title, setTitle] = useState(editing?.title ?? "");
  const [description, setDescription] = useState(editing?.description ?? "");
  const [category, setCategory] = useState<string>(
    editing?.category ?? VIDEO_CATEGORIES[0]
  );
  const [embedUrl, setEmbedUrl] = useState(
    editing?.source === "embed" ? editing.video_url : ""
  );
  const [isFeatured, setIsFeatured] = useState(editing?.is_featured ?? false);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [existingVideoUrl] = useState(
    editing?.source === "upload" ? editing.video_url : ""
  );
  const [existingThumb, setExistingThumb] = useState(editing?.thumbnail_url ?? "");

  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);

  function pickVideo(f: File | null) {
    setError(null);
    if (!f) return;
    if (!f.type.startsWith("video/")) {
      setError("Please choose a video file.");
      return;
    }
    if (f.size > MAX_VIDEO_MB * 1024 * 1024) {
      setError(`Video must be under ${MAX_VIDEO_MB} MB.`);
      return;
    }
    setVideoFile(f);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) return setError("Add a title.");

    try {
      setBusy(true);
      let videoUrl = existingVideoUrl;
      let thumbUrl: string | null = existingThumb || null;

      if (source === "embed") {
        if (!embedUrl.trim()) throw new Error("Paste a YouTube or Vimeo link.");
        if (!toEmbedUrl(embedUrl.trim()))
          throw new Error("That doesn't look like a YouTube or Vimeo URL.");
        videoUrl = embedUrl.trim();
      } else {
        if (videoFile) {
          if (!isCloudinaryConfigured)
            throw new Error(
              "Cloudinary isn't connected yet. Add your Cloudinary keys to .env.local (see README)."
            );
          setProgress(0);
          const res = await uploadCloudinaryVideo(videoFile, setProgress);
          videoUrl = res.url;
          setProgress(null);
          // Auto-poster from the video's first frame if none was provided.
          if (!thumbFile && !thumbUrl) {
            thumbUrl = cloudinaryVideoPoster(res.url);
          }
        }
        if (!videoUrl) throw new Error("Upload a video file.");
      }

      if (thumbFile) {
        const res = await uploadCloudinaryImage(thumbFile);
        thumbUrl = res.url;
      }

      const payload = {
        title: title.trim(),
        description: description.trim(),
        category,
        video_url: videoUrl,
        thumbnail_url: thumbUrl,
        source,
        is_featured: isFeatured,
      };

      if (editing) {
        await updateVideo(editing.id, payload);
      } else {
        await createVideo(payload);
      }
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setProgress(null);
    } finally {
      setBusy(false);
    }
  }

  const input =
    "w-full rounded-xl border border-brand-300/15 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-brand-400/60 focus:ring-2 focus:ring-brand-500/20";

  return (
    <form onSubmit={onSubmit} className="glass rounded-2xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {editing ? "Edit video" : "Add a video"}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-ink-700/60 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Source toggle */}
      <div className="mb-5 inline-flex rounded-xl border border-brand-300/15 bg-ink-900/50 p-1">
        <button
          type="button"
          onClick={() => setSource("upload")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            source === "upload"
              ? "bg-brand-500 text-white"
              : "text-slate-300 hover:text-white"
          }`}
        >
          <UploadCloud size={16} /> Upload file
        </button>
        <button
          type="button"
          onClick={() => setSource("embed")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            source === "embed"
              ? "bg-brand-500 text-white"
              : "text-slate-300 hover:text-white"
          }`}
        >
          <Link2 size={16} /> Embed link
        </button>
      </div>

      {/* Video input */}
      {source === "upload" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pickVideo(e.dataTransfer.files?.[0] ?? null);
          }}
          onClick={() => fileRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition ${
            dragging
              ? "border-brand-400 bg-brand-500/10"
              : "border-brand-300/20 hover:border-brand-300/40 hover:bg-ink-800/40"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => pickVideo(e.target.files?.[0] ?? null)}
          />
          {videoFile ? (
            <div className="flex items-center gap-3 text-brand-200">
              <CheckCircle2 size={20} className="text-emerald-400" />
              <span className="text-sm font-medium">{videoFile.name}</span>
            </div>
          ) : existingVideoUrl ? (
            <div className="flex items-center gap-3 text-slate-300">
              <Film size={20} className="text-brand-300" />
              <span className="text-sm">Current video kept — drop a new file to replace</span>
            </div>
          ) : (
            <>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                <UploadCloud size={22} />
              </span>
              <p className="mt-3 text-sm font-medium text-white">
                Drag &amp; drop your video, or click to browse
              </p>
              <p className="mt-1 text-xs text-slate-500">
                MP4, MOV, WebM · up to {MAX_VIDEO_MB} MB
              </p>
            </>
          )}
        </div>
      ) : (
        <div>
          <label className="mb-1.5 block text-sm text-slate-300">
            YouTube or Vimeo URL
          </label>
          <input
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=…"
            className={input}
          />
        </div>
      )}

      {progress !== null && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-slate-400">
            <span>Uploading…</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-ink-700">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Details */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-slate-300">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Neon Nights — Brand Film"
            className={input}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-300">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={input}
          >
            {VIDEO_CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-ink-900">
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-brand-300/15 bg-ink-900/40 px-4 py-3">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 accent-brand-500"
            />
            <span className="text-sm text-slate-300">
              Feature in hero showreel
            </span>
          </label>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-slate-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="What was the brief and what did you do?"
            className={`${input} resize-none`}
          />
        </div>

        {/* Thumbnail */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-slate-300">
            Thumbnail{" "}
            <span className="text-slate-500">
              (optional{source === "embed" ? " — auto-pulled from YouTube" : ""})
            </span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => thumbRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl border border-brand-300/15 px-4 py-2.5 text-sm text-slate-300 transition hover:border-brand-300/40 hover:text-white"
            >
              <ImagePlus size={16} />
              {thumbFile || existingThumb ? "Change image" : "Add image"}
            </button>
            <input
              ref={thumbRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setThumbFile(f);
                if (f) setExistingThumb("");
              }}
            />
            {(thumbFile || existingThumb) && (
              <span className="truncate text-xs text-slate-400">
                {thumbFile ? thumbFile.name : "Current thumbnail kept"}
              </span>
            )}
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-medium text-white transition hover:bg-brand-400 disabled:opacity-60"
        >
          {busy && <Loader2 size={16} className="animate-spin" />}
          {editing ? "Save changes" : "Publish video"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-brand-300/20 px-6 py-3 font-medium text-slate-300 transition hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
