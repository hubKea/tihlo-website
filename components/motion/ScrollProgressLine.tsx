'use client';

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

interface ScrollProgressLineProps {
  /** Optional className applied to the absolute-positioned wrapper. */
  className?: string;
  /** Color of the progress fill — accepts any CSS color. */
  color?: string;
  /** Color of the unfilled track. */
  trackColor?: string;
  /** Stroke width in px. */
  width?: number;
  /** Indices that should appear as ticks along the line (0..1 fractions). */
  ticks?: number[];
}

/**
 * Vertical progress line. Place inside a `relative` parent — fills as the user
 * scrolls through that parent. Uses scroll Y in the parent's frame.
 */
export default function ScrollProgressLine({
  className = '',
  color = 'var(--ink)',
  trackColor = 'var(--faint)',
  width = 1,
  ticks = [],
}: ScrollProgressLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });

  const heightPct = useTransform(smooth, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 ${className}`}
    >
      {/* Track */}
      <span
        className="absolute inset-y-0 left-0 block"
        style={{ width, background: trackColor }}
      />

      {/* Filled progress — scroll-driven */}
      <motion.span
        className="absolute left-0 top-0 block origin-top"
        style={{
          width,
          background: color,
          height: reduced ? '100%' : heightPct,
        }}
      />

      {/* Tick marks */}
      {ticks.map((t, i) => (
        <span
          key={i}
          className="absolute -translate-y-1/2 -translate-x-[3px] block h-[7px] w-[7px] rounded-full border"
          style={{
            top: `${t * 100}%`,
            borderColor: color,
            background: 'var(--white)',
          }}
        />
      ))}
    </div>
  );
}
