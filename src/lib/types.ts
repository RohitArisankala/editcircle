export type VideoSource = "upload" | "embed";

export interface VideoItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  /** For "upload": public URL of the file in Supabase Storage.
   *  For "embed": the YouTube/Vimeo watch or share URL. */
  video_url: string;
  /** Public URL of a poster/thumbnail image. Optional. */
  thumbnail_url: string | null;
  source: VideoSource;
  /** Featured videos appear in the hero showreel. */
  is_featured: boolean;
  /** Lower numbers appear first. */
  sort_order: number;
  created_at: string;
}

export interface NewVideoInput {
  title: string;
  description?: string;
  category: string;
  video_url: string;
  thumbnail_url?: string | null;
  source: VideoSource;
  is_featured?: boolean;
  sort_order?: number;
}

export const VIDEO_CATEGORIES = [
  "Motion Graphics",
  "Reels / Shorts",
  "Finance",
  "Podcast",
] as const;
