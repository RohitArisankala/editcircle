"use client";

import DarkVeil from "./DarkVeil";

/**
 * Fixed, full-page animated background.
 * The DarkVeil shader is recolored to dark blue + purple via a
 * mix-blend `color` overlay, then darkened for text legibility.
 */
export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
    >
      <DarkVeil
        hueShift={210}
        speed={0.4}
        warpAmount={1.6}
        scanlineIntensity={0.06}
        scanlineFrequency={2.2}
        noiseIntensity={0.03}
        resolutionScale={0.6}
      />

      {/* Recolor the veil to a blue → purple palette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1b3aa6 0%, #3b1e8f 50%, #7c3aed 100%)",
          mixBlendMode: "color",
          opacity: 0.92,
        }}
      />

      {/* Darken for contrast so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/60 to-ink-950/80" />

      {/* Soft vignette to focus the center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 65% at 50% 40%, transparent 0%, rgba(5,7,15,0.55) 100%)",
        }}
      />
    </div>
  );
}
