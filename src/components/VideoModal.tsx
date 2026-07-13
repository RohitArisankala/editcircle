"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { VideoItem } from "@/lib/types";
import { toEmbedUrl } from "@/lib/embed";

export function VideoModal({
  video,
  onClose,
}: {
  video: VideoItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (video) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  const embedUrl = video && video.source === "embed" ? toEmbedUrl(video.video_url) : null;

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-ink-950/85 backdrop-blur-sm" />
          <motion.div
            className="glass glow-ring relative w-full max-w-5xl overflow-hidden rounded-2xl"
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-ink-900/80 p-2 text-brand-300 transition hover:bg-brand-600 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="aspect-video w-full bg-black">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={video.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={video.video_url}
                  poster={video.thumbnail_url ?? undefined}
                  controls
                  autoPlay
                  className="h-full w-full"
                />
              )}
            </div>

            <div className="p-5 sm:p-6">
              <span className="text-xs font-medium uppercase tracking-widest text-brand-400">
                {video.category}
              </span>
              <h3 className="mt-1 text-xl font-semibold text-white">
                {video.title}
              </h3>
              {video.description && (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                  {video.description}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
