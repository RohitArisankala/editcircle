import { User } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute right-1/2 top-10 -z-10 h-64 w-[38rem] translate-x-1/2 rounded-full bg-brand-600/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="The circle"
          title="Meet the team"
          subtitle="A small crew of editors and designers who make your footage sing."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.team.map((m, i) => (
            <Reveal key={i} delay={(i % 4) * 0.08}>
              <div className="glass glass-hover h-full overflow-hidden rounded-2xl">
                <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-ink-700 to-ink-850">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gold-500/10 to-transparent" />
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-gold-500/25 bg-ink-900/60 text-gold-300">
                    <User size={26} />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white">{m.name}</h3>
                  <p className="mt-0.5 text-sm text-gold-300">{m.role}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {m.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
