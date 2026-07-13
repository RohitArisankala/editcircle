"use client";

import { getSupabaseBrowserClient } from "./client";
import type { NewVideoInput, VideoItem } from "../types";

function client() {
  const c = getSupabaseBrowserClient();
  if (!c) throw new Error("Supabase is not configured.");
  return c;
}

export async function fetchAllVideos(): Promise<VideoItem[]> {
  const { data, error } = await client()
    .from("videos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as VideoItem[];
}

export async function createVideo(input: NewVideoInput): Promise<VideoItem> {
  const { data, error } = await client()
    .from("videos")
    .insert({
      title: input.title,
      description: input.description ?? null,
      category: input.category,
      video_url: input.video_url,
      thumbnail_url: input.thumbnail_url ?? null,
      source: input.source,
      is_featured: input.is_featured ?? false,
      sort_order: input.sort_order ?? 0,
    })
    .select()
    .single();
  if (error) throw error;
  return data as VideoItem;
}

export async function updateVideo(
  id: string,
  patch: Partial<NewVideoInput>
): Promise<void> {
  const { error } = await client().from("videos").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteVideo(id: string): Promise<void> {
  const { error } = await client().from("videos").delete().eq("id", id);
  if (error) throw error;
}

/** Ensures only one video is flagged as the featured showreel. */
export async function setFeatured(id: string): Promise<void> {
  const supabase = client();
  const { error: clearErr } = await supabase
    .from("videos")
    .update({ is_featured: false })
    .neq("id", id);
  if (clearErr) throw clearErr;
  const { error } = await supabase
    .from("videos")
    .update({ is_featured: true })
    .eq("id", id);
  if (error) throw error;
}
