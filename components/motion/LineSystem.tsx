'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

type Tone = 'light' | 'dark';
type Density = 'quiet' | 'standard' | 'dense';
type Anchor = 'left' | 'right' | 'full';

interface LineSystemProps {
  tone?: Tone;
  density?: Density;
  anchor?: Anchor;
  className?: string;
}

const densityMap: Record<
  Density,
  { opacity: string; rows: number; columns: string }
> = {
  quiet: { opacity: 'opacity-[0.28]', rows: 2, columns: 'grid-cols-3' },
  standard: { opacity: 'opacity-[0.42]', rows: 3, columns: 'grid-cols-4' },
  dense: { opacity: 'opacity-[0.55]', rows: 4, columns: 'grid-cols-6' },
};

export default function LineSystem({
  tone = 'light',
  density = 'standard',
  anchor = 'full',
  className = '',
}: LineSystemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-18% 0px -18% 0px' });
  const reducedMotion = useReducedMotion();
  const config = densityMap[density];
  const line = tone === 'dark' ? 'bg-white/12' : 'bg-[var(--faint)]';
  const rule = tone === 'dark' ? 'bg-white/18' : 'bg-[var(--dim)]';
  const sideInset =
    anchor === 'left'
      ? 'right-[28%]'
      : anchor === 'right'
        ? 'left-[28%]'
        : 'inset-x-0';

  const draw = reducedMotion
    ? { opacity: inView ? 1 : 0 }
    : { opacity: inView ? 1 : 0, scaleX: inView ? 1 : 0 };

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${config.opacity} ${className}`}
    >
      <div className={`absolute inset-y-0 ${sideInset}`}>
        <div className={`grid h-full ${config.columns}`}>
          {Array.from({
            length: Number(config.columns.replace('grid-cols-', '')),
          }).map((_, i) => (
            <motion.span
              key={`col-${i}`}
              className={`block h-full w-px ${line}`}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={
                reducedMotion
                  ? { opacity: inView ? 1 : 0 }
                  : { opacity: inView ? 1 : 0, scaleY: inView ? 1 : 0 }
              }
              transition={{
                duration: 0.9,
                delay: 0.08 + i * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: 'top' }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 top-0">
        <motion.span
          className={`block h-px origin-left ${rule}`}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={draw}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <motion.span
          className={`block h-px origin-right ${rule}`}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={draw}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {Array.from({ length: config.rows }).map((_, i) => (
        <motion.span
          key={`row-${i}`}
          className={`absolute left-0 h-px w-full origin-left ${line}`}
          style={{ top: `${((i + 1) / (config.rows + 1)) * 100}%` }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            reducedMotion
              ? { opacity: inView ? 1 : 0 }
              : { opacity: inView ? 1 : 0.85, scaleX: inView ? 1 : 0 }
          }
          transition={{
            duration: 0.85,
            delay: 0.16 + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      <div className="absolute left-4 top-4 h-8 w-8 border-l border-t border-[var(--dim)]" />
      <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-[var(--dim)]" />
    </div>
  );
}
