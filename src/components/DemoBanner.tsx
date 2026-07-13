"use client";

import { Info } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div className="glass pointer-events-auto flex items-center gap-2 rounded-full border border-gold-500/20 px-4 py-2 text-center text-xs text-slate-300 shadow-xl shadow-black/40">
        <Info size={13} className="shrink-0 text-gold-400" />
        <span>
          Demo content — connect Supabase and add videos from{" "}
          <a href="/admin" className="font-semibold text-gold-300 underline">
            /admin
          </a>
          .
        </span>
      </div>
    </div>
  );
}
