"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { StarBorder } from "./effects/StarBorder";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-2 sm:px-6">
        {/* Big logo, top-left corner */}
        <Link href="#top" aria-label={site.brand} className="shrink-0">
          <Logo className="h-16 w-16 drop-shadow-lg sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
        </Link>

        {/* Floating glass links pill */}
        <nav className="glass hidden items-center gap-7 rounded-full border border-white/10 px-6 py-2.5 shadow-xl shadow-black/40 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <StarBorder href="#contact">Get started</StarBorder>
        </nav>

        {/* Mobile toggle */}
        <button
          className="glass rounded-full border border-white/10 p-2.5 text-slate-200 shadow-xl shadow-black/40 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="glass ml-auto mr-4 mt-2 w-[calc(100%-2rem)] max-w-xs rounded-2xl border border-white/10 p-3 shadow-xl shadow-black/40 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-slate-200 transition hover:bg-ink-700/60"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-gold mt-1 rounded-full px-5 py-2.5 text-center text-sm font-semibold"
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
