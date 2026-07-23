"use client";

import { getSupabaseBrowserClient } from "./client";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NewMessage {
  name: string;
  email: string;
  message: string;
}

/** Public contact-form submit. Returns true if stored in Supabase. */
export async function sendMessage(input: NewMessage): Promise<boolean> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return false;
  const { error } = await supabase.from("messages").insert({
    name: input.name,
    email: input.email,
    message: input.message,
  });
  if (error) throw error;
  return true;
}

/** Admin: list all messages, newest first. */
export async function fetchMessages(): Promise<ContactMessage[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ContactMessage[];
}

export async function markMessageRead(id: string, isRead: boolean): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from("messages")
    .update({ is_read: isRead })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteMessage(id: string): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) throw error;
}
