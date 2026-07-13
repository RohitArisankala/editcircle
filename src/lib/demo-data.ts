import type { VideoItem } from "./types";

/**
 * Demo portfolio shown before Supabase is connected (or if a fetch fails),
 * so the site always looks complete. Sample clips are Google's public
 * test videos; posters are from Unsplash. Replace these by uploading your
 * own videos from /admin.
 */
export const DEMO_VIDEOS: VideoItem[] = [
  {
    id: "demo-1",
    title: "Kinetic Type — Motion Reel",
    description: "Text animation, brand visuals and transitions for a product reveal.",
    category: "Motion Graphics",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail_url:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    source: "upload",
    is_featured: true,
    sort_order: 1,
    created_at: "2026-01-05T10:00:00Z",
  },
  {
    id: "demo-2",
    title: "Launch Day — Short",
    description: "Fast-paced vertical short with hooks, captions and effects.",
    category: "Reels / Shorts",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail_url:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    source: "upload",
    is_featured: false,
    sort_order: 2,
    created_at: "2026-01-04T10:00:00Z",
  },
  {
    id: "demo-3",
    title: "Markets Explained — Finance",
    description: "Charts, stock visuals and text animation for an educational video.",
    category: "Finance",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail_url:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    source: "upload",
    is_featured: false,
    sort_order: 3,
    created_at: "2026-01-03T10:00:00Z",
  },
  {
    id: "demo-4",
    title: "The Deep Dive — Podcast",
    description: "Long-form podcast edit with graphics, captions and sound design.",
    category: "Podcast",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail_url:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
    source: "upload",
    is_featured: false,
    sort_order: 4,
    created_at: "2026-01-02T10:00:00Z",
  },
];
