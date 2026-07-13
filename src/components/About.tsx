import { MapPin, Zap } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

const tools = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Final Cut Pro",
  "Photoshop",
  "CapCut",
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="glass relative aspect-square overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80"
              alt={`${site.brand} studio`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
            <div className="glass absolute bottom-4 left-4 flex items-center gap-3 rounded-xl px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-gold-500/20 bg-gold-500/10 text-gold-300">
                <Zap size={18} />
              </span>
              <div>
                <div className="text-sm font-semibold text-white">
                  Fast turnaround
                </div>
                <div className="text-xs text-slate-400">Usually within 48h</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              Our story
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              We&apos;re {site.brand}
            </h2>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={15} className="text-gold-300" />
              {site.location}
            </div>
            <p className="mt-5 leading-relaxed text-slate-400">
              The Edit Circle is a tight-knit studio of editors, motion designers
              and sound people who love the craft. We help creators, founders and
              brands tell better stories through the edit — obsessing over pacing,
              emotion and the tiny details that keep viewers watching.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              Whether it&apos;s a punchy 30-second Reel or a full podcast episode,
              we treat every project like it&apos;s our own. Cut. Create. Connect.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8">
              <div className="text-sm font-medium text-slate-300">
                Tools we work with
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-gold-500/15 bg-ink-800/50 px-3 py-1.5 text-sm text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
