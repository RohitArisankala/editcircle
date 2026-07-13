"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";
import type { VideoItem } from "@/lib/types";
import { autoThumbnail } from "@/lib/embed";

export function VideoCard({
  video,
  onOpen,
  index = 0,
}: {
  video: VideoItem;
  onOpen: (v: VideoItem) => void;
  index?: number;
}) {
  const poster =
    video.thumbnail_url ||
    (video.source === "embed" ? autoThumbnail(video.video_url) : null);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(video)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="glass glass-hover group relative block overflow-hidden rounded-2xl text-left"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-ink-800">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt={video.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid-lines flex h-full w-full items-center justify-center">
            <span className="text-sm text-brand-300/60">No preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-500/90 text-white shadow-lg shadow-brand-500/40">
            <Play size={22} className="ml-0.5 fill-white" />
          </span>
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-brand-300 backdrop-blur">
          {video.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 font-semibold text-white transition group-hover:text-brand-300">
          {video.title}
        </h3>
        {video.description && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-400">
            {video.description}
          </p>
        )}
      </div>
    </motion.button>
  );
}
