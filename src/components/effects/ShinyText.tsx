/**
 * React Bits — ShinyText.
 * Text with a continuous gold shimmer sweeping across it.
 */
export function ShinyText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return <span className={`shiny-text ${className}`}>{text}</span>;
}
