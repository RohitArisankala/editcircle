"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";
import { site } from "@/lib/site";
import type { VideoItem } from "@/lib/types";
import { autoThumbnail } from "@/lib/embed";
import { VideoModal } from "./VideoModal";
import { Magnet } from "./effects/Magnet";

export function Hero({ featured }: { featured: VideoItem | null }) {
  const [open, setOpen] = useState(false);
  const poster =
    featured?.thumbnail_url ||
    (featured?.source === "embed" ? autoThumbnail(featured.video_url) : null);

  return (
    <section
      id="top"
      className="relative flex min-h-[86vh] items-center overflow-hidden pt-28 pb-12"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* Copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-ink-800/50 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold-300"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold-400" />
            {site.slogan}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            {site.tagline.split(" ").slice(0, 4).join(" ")}{" "}
            <span className="text-gold">
              {site.tagline.split(" ").slice(4).join(" ")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400"
          >
            {site.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnet>
              <a
                href="#work"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
              >
                View work
              </a>
            </Magnet>
            {featured && (
              <Magnet>
                <button
                  onClick={() => setOpen(true)}
                  className="group inline-flex items-center gap-3 rounded-full border border-brand-300/25 px-6 py-3 font-medium text-slate-200 transition hover:border-brand-300/60 hover:text-white"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-500/80 transition group-hover:bg-brand-500">
                    <Play size={16} className="ml-0.5 fill-white" />
                  </span>
                  Watch showreel
                </button>
              </Magnet>
            )}
          </motion.div>
        </div>

        {/* Showreel preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="glass glow-ring relative aspect-video overflow-hidden rounded-2xl">
            {poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={poster}
                alt={featured?.title ?? "Showreel"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid-lines h-full w-full" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
            {featured && (
              <button
                onClick={() => setOpen(true)}
                aria-label="Play showreel"
                className="absolute inset-0 grid place-items-center"
              >
                <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-500/90 text-white shadow-xl shadow-brand-500/50 transition hover:scale-105">
                  <Play size={30} className="ml-1 fill-white" />
                </span>
              </button>
            )}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="rounded-full bg-ink-950/70 px-3 py-1 text-xs font-medium text-gold-300 backdrop-blur">
                Showreel 2026
              </span>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 -z-10 h-44 w-44 rounded-full bg-brand-500/25 blur-3xl" />
        </motion.div>
      </div>

      <a
        href="#work"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-slate-500 md:flex"
      >
        <span>Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>

      <VideoModal video={open ? featured : null} onClose={() => setOpen(false)} />
    </section>
  );
}
