"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * React Bits — TiltedCard.
 * Tilts its children in 3D toward the cursor on hover.
 */
export function Tilt({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)"
  );

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * max * 2;
        const ry = (px - 0.5) * max * 2;
        setTransform(
          `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`
        );
      }}
      onMouseLeave={() =>
        setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)")
      }
      style={{ transform, transition: "transform 0.2s ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
}
