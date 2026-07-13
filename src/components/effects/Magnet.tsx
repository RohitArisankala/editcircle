"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * React Bits — Magnet.
 * Gently pulls its children toward the cursor while hovered.
 */
export function Magnet({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        setOffset({ x: x * strength, y: y * strength });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={`inline-flex ${className}`}
    >
      {children}
    </div>
  );
}
