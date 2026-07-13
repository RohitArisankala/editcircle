import { Reveal } from "./Reveal";
import { ShinyText } from "./effects/ShinyText";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <ShinyText
        text={eyebrow}
        className="text-xs font-semibold uppercase tracking-[0.25em]"
      />
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-slate-400 ${
            center ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
