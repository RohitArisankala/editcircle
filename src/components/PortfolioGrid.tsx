"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { VideoItem } from "@/lib/types";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";
import { SectionHeading } from "./SectionHeading";

export function PortfolioGrid({ videos }: { videos: VideoItem[] }) {
  const [active, setActive] = useState<string>("All");
  const [selected, setSelected] = useState<VideoItem | null>(null);

  const categories = useMemo(() => {
    const set = new Set(videos.map((v) => v.category));
    return ["All", ...Array.from(set)];
  }, [videos]);

  const filtered = useMemo(
    () => (active === "All" ? videos : videos.filter((v) => v.category === active)),
    [videos, active]
  );

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="Selected Work"
        title="Edits that earn attention"
        subtitle="Recent motion graphics, reels, finance videos and podcasts."
      />

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === c
                ? "btn-gold shadow-lg"
                : "border border-gold-500/15 text-slate-300 hover:border-gold-500/40 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((v, i) => (
          <VideoCard key={v.id} video={v} index={i} onOpen={setSelected} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-slate-500">
          No videos in this category yet.
        </p>
      )}

      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
