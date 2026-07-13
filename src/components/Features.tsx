import {
  AudioLines,
  Gauge,
  MessagesSquare,
  Palette,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SpotlightCard } from "./effects/SpotlightCard";

const icons: Record<string, LucideIcon> = {
  Palette,
  Sparkles,
  AudioLines,
  Zap,
  Gauge,
  MessagesSquare,
};

export function Features() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="What we do"
        title="Everything you need to stand out"
        subtitle="Full-service editing, from the first cut to the final export — crafted to make your content perform."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.features.map((f, i) => {
          const Icon = icons[f.icon] ?? Sparkles;
          return (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <SpotlightCard className="glass glass-hover h-full rounded-2xl p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold-500/20 bg-gold-500/10 text-gold-300">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {f.description}
                </p>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
