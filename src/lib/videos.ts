import type { VideoItem } from "./types";
import { DEMO_VIDEOS } from "./demo-data";
import { getSupabaseServerClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/config";

/**
 * Fetches the portfolio for public pages (server-side).
 * Falls back to demo data when Supabase isn't configured or errors out,
 * so the site always renders something.
 */
export async function getVideos(): Promise<{
  videos: VideoItem[];
  usingDemo: boolean;
}> {
  if (!isSupabaseConfigured) {
    return { videos: DEMO_VIDEOS, usingDemo: true };
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) return { videos: DEMO_VIDEOS, usingDemo: true };

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    // Empty table or an error → keep demo content visible.
    return { videos: DEMO_VIDEOS, usingDemo: true };
  }

  return { videos: data as VideoItem[], usingDemo: false };
}
