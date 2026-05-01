'use client';

import { ReactNode } from 'react';

interface DarkGlowSectionProps {
  children: ReactNode;
  className?: string;
  /** Position of the radial glow: 'center' | 'bottom-left' | 'top-right' | 'bottom-center' */
  glowPosition?: 'center' | 'bottom-left' | 'top-right' | 'bottom-center';
  /** Glow intensity 0–1, default 0.07 */
  glowIntensity?: number;
  /** Optional id for scroll anchoring */
  id?: string;
}

const POSITIONS = {
  center: '50% 50%',
  'bottom-left': '20% 85%',
  'top-right': '80% 15%',
  'bottom-center': '50% 90%',
} as const;

export default function DarkGlowSection({
  children,
  className = '',
  glowPosition = 'center',
  glowIntensity = 0.07,
  id,
}: DarkGlowSectionProps) {
  const pos = POSITIONS[glowPosition];

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden bg-[var(--ink)] ${className}`}
    >
      {/* Ambient red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at ${pos}, rgba(180, 35, 24, ${glowIntensity}), transparent 70%)`,
        }}
      />

      {/* Secondary softer, wider glow layer for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 100% 80% at ${pos}, rgba(180, 35, 24, ${glowIntensity * 0.4}), transparent 80%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
