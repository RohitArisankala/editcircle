/**
 * The Edit Circle logo (public/logo.png) — a self-contained circular badge
 * that already includes the wordmark and "Cut • Create • Connect" tagline.
 * Size it with Tailwind height/width classes via `className`
 * (e.g. "h-20 w-20"), or fall back to the default.
 */
export function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="The Edit Circle"
      className={`inline-block select-none object-contain ${className}`}
    />
  );
}
