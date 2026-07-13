import type { ReactNode } from "react";

/**
 * React Bits — StarBorder.
 * A pill with two glows that travel around its border.
 */
export function StarBorder({
  href,
  children,
  className = "",
  color = "#f2d98b",
  speed = "5s",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  color?: string;
  speed?: string;
}) {
  const glow = {
    background: `radial-gradient(circle, ${color}, transparent 10%)`,
    animationDuration: speed,
  };
  return (
    <a href={href} className={`star-border ${className}`}>
      <span className="star-border-bottom" style={glow} />
      <span className="star-border-top" style={glow} />
      <span className="star-border-inner">{children}</span>
    </a>
  );
}
