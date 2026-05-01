import { ReactNode } from 'react';

interface GlowBadgeProps {
  children: ReactNode;
  /** Size in px, default 52 */
  size?: number;
  /** Accent color for glow, default --red */
  accent?: string;
  className?: string;
}

export default function GlowBadge({
  children,
  size = 52,
  accent = 'var(--red)',
  className = '',
}: GlowBadgeProps) {
  return (
    <div
      className={`group/badge relative inline-flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[var(--ink-2)] transition-all duration-300 hover:border-[color:var(--_accent)]/30 hover:shadow-[0_0_24px_var(--_accent-glow)] ${className}`}
      style={{
        width: size,
        height: size,
        ['--_accent' as string]: accent,
        ['--_accent-glow' as string]: accent.replace(')', ', 0.15)').replace('var(', 'rgba(180,35,24,'),
      }}
    >
      {/* Inner glow ring */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover/badge:opacity-100"
        style={{
          background: `radial-gradient(circle at center, rgba(180,35,24,0.08) 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-10 text-white/70 transition-colors duration-300 group-hover/badge:text-white">
        {children}
      </div>
    </div>
  );
}
