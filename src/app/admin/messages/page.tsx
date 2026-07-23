"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  Trash2,
  Mail,
  ArrowLeft,
  Inbox,
  Check,
  ExternalLink,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useAdminAuth } from "@/lib/use-admin-auth";
import {
  fetchMessages,
  deleteMessage,
  markMessageRead,
  type ContactMessage,
} from "@/lib/supabase/messages";
import { Logo } from "@/components/Logo";

export default function MessagesPage() {
  const router = useRouter();
  const { loading, isAdmin, user } = useAdminAuth();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setLoadingList(true);
      setListError(null);
      setMessages(await fetchMessages());
    } catch (e) {
      setListError(
        e instanceof Error
          ? e.message
          : "Could not load messages. Run the SQL in supabase/schema.sql."
      );
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin && isSupabaseConfigured) {
      router.replace("/admin/login");
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) reload();
  }, [isAdmin, reload]);

  async function onDelete(m: ContactMessage) {
    if (!confirm(`Delete the message from ${m.name}?`)) return;
    await deleteMessage(m.id);
    reload();
  }

  async function toggleRead(m: ContactMessage) {
    await markMessageRead(m.id, !m.is_read);
    reload();
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="bg-aurora grid min-h-screen place-items-center px-5">
        <div className="glass max-w-lg rounded-2xl p-8 text-center">
          <div className="flex justify-center">
            <Logo className="h-20 w-20" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-white">
            Connect Supabase to see messages
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Add your Supabase keys to <code>.env.local</code> and run the SQL in{" "}
            <code>supabase/schema.sql</code>.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full border border-gold-500/25 px-5 py-2.5 text-sm text-slate-200 hover:text-white"
          >
            ← Back to site
          </Link>
        </div>
      </div>
    );
  }

  if (loading || (!isAdmin && !user)) {
    return (
      <div className="bg-aurora grid min-h-screen place-items-center">
        <Loader2 className="animate-spin text-brand-400" size={28} />
      </div>
    );
  }

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="bg-aurora min-h-screen">
      <header className="glass sticky top-0 z-40 border-b border-gold-500/10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo className="h-10 w-10" />
            <span className="text-sm font-semibold text-white">
              The Edit Circle
            </span>
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 px-4 py-2 text-sm text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={15} /> Videos
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <p className="mt-1 text-sm text-slate-400">
              {messages.length} total · {unread} unread
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {loadingList ? (
            <div className="grid place-items-center py-16">
              <Loader2 className="animate-spin text-brand-400" size={24} />
            </div>
          ) : listError ? (
            <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-200">
              {listError}
            </div>
          ) : messages.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500/10 text-gold-300">
                <Inbox size={24} />
              </span>
              <p className="mt-4 font-medium text-white">No messages yet</p>
              <p className="mt-1 text-sm text-slate-400">
                Contact-form submissions will show up here.
              </p>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`glass rounded-2xl p-5 ${
                  m.is_read ? "opacity-70" : "border-gold-500/25"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{m.name}</h3>
                      {!m.is_read && (
                        <span className="rounded-full bg-gold-500/15 px-2 py-0.5 text-[10px] font-medium text-gold-300">
                          New
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${m.email}`}
                      className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-brand-300 transition hover:text-brand-200"
                    >
                      <Mail size={13} /> {m.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="mr-2 text-xs text-slate-500">
                      {new Date(m.created_at).toLocaleDateString()}
                    </span>
                    <a
                      href={`mailto:${m.email}?subject=${encodeURIComponent(
                        "Re: your enquiry — The Edit Circle"
                      )}`}
                      title="Reply"
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-ink-700/60 hover:text-brand-300"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <button
                      onClick={() => toggleRead(m)}
                      title={m.is_read ? "Mark unread" : "Mark read"}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-ink-700/60 hover:text-emerald-300"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(m)}
                      title="Delete"
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-ink-700/60 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                  {m.message}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
