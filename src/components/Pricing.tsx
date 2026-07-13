import {
  LineChart,
  Mic,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const icons: Record<string, LucideIcon> = {
  Sparkles,
  Smartphone,
  LineChart,
  Mic,
};

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          subtitle="Clear rates for the work we do most. Custom projects welcome — just reach out."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {site.packages.map((p, i) => {
            const Icon = icons[p.icon] ?? Sparkles;
            return (
              <Reveal key={p.name} delay={(i % 2) * 0.08}>
                <div className="glass glass-hover flex h-full flex-col rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/20 bg-gold-500/10 text-gold-300">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{p.name}</h3>
                      <p className="text-xs text-slate-400">{p.tagline}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {p.tiers.map((t) => (
                      <div
                        key={t.label}
                        className="flex items-baseline justify-between gap-3 border-b border-brand-300/10 pb-2.5 last:border-0"
                      >
                        <span className="text-sm text-slate-300">{t.label}</span>
                        <span className="shrink-0 font-semibold text-white">
                          {t.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    Extra revisions: {p.revision}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 text-center">
            <a
              href="#contact"
              className="btn-gold inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold"
            >
              Get a quote
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
