'use client';

import { ReactNode } from 'react';

interface StackedGlowCardProps {
  children: ReactNode;
  /** Accent color for glow, default var(--red) */
  accent?: string;
  className?: string;
  size?: number | string;
  /** 'light' renders on white bg, 'dark' preserves original dark-bg style */
  variant?: 'light' | 'dark';
}

export default function StackedGlowCard({
  children,
  accent = 'var(--red)',
  className = '',
  size = 56,
  variant = 'light',
}: StackedGlowCardProps) {
  const isLight = variant === 'light';

  return (
    <div
      className={`stacked-glow-card group/stacked relative inline-flex shrink-0 items-center justify-center rounded-2xl transition-[box-shadow,transform] duration-500 hover:-translate-y-1 ${className}`}
      data-variant={variant}
      style={{
        width: size,
        height: size,
        border: isLight ? '1px solid var(--faint)' : '1px solid rgba(255,255,255,0.05)',
        background: isLight ? 'var(--white)' : 'var(--ink-2)',
      }}
    >
      {/* Top glowing edge */}
      <div 
        className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-40 transition-opacity duration-500 group-hover/stacked:opacity-80"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />
      
      {/* Inner radial glow behind icon */}
      <div
        className="absolute inset-0 rounded-2xl opacity-20 transition-opacity duration-500 group-hover/stacked:opacity-40"
        style={{
          background: isLight
            ? `radial-gradient(circle at center, rgba(180, 35, 24, 0.12) 0%, transparent 70%)`
            : `radial-gradient(circle at center, rgba(180, 35, 24, 0.3) 0%, transparent 70%)`,
        }}
      />
      
      {/* Content */}
      <div
        className={`relative z-10 transition-colors duration-300 ${
          isLight
            ? 'text-[var(--ink)] group-hover/stacked:text-[var(--red)]'
            : 'text-white/80 group-hover/stacked:text-white'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
