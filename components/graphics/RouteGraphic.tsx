'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { DrawnPath, DrawnCircle, DrawnLineEl } from '@/components/motion/DrawnSVG';

/** Route corridor with deviation. Ink stroke + one red accent (the deviation path). */
export default function RouteGraphic({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 220"
      fill="none"
      stroke="var(--ink)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-full w-full ${className}`}
      aria-hidden
    >
      {/* Frame */}
      <DrawnPath d="M16 16 L304 16 L304 204 L16 204 Z" duration={1.6} />

      {/* Reg corners */}
      <DrawnPath d="M16 16 L36 16 M16 16 L16 36" duration={0.6} delay={0.1} stroke="var(--dim)" />
      <DrawnPath d="M304 204 L284 204 M304 204 L304 184" duration={0.6} delay={0.1} stroke="var(--dim)" />

      {/* Authorised corridor — base path */}
      <DrawnPath
        d="M40 130 Q90 80 150 100 Q210 120 280 80"
        duration={1.8}
        delay={0.3}
      />

      {/* Corridor band — geofence (dim parallel) */}
      <DrawnPath
        d="M40 142 Q90 92 150 112 Q210 132 280 92"
        duration={1.6}
        delay={0.5}
        stroke="var(--dim)"
        strokeDasharray="3 4"
      />
      <DrawnPath
        d="M40 118 Q90 68 150 88 Q210 108 280 68"
        duration={1.6}
        delay={0.5}
        stroke="var(--dim)"
        strokeDasharray="3 4"
      />

      {/* Origin and destination nodes */}
      <DrawnCircle cx="40" cy="130" r="5" fill="var(--white)" stroke="var(--ink)" strokeWidth="1.4" delay={0.4} duration={0.5} />
      <DrawnCircle cx="280" cy="80" r="5" fill="var(--white)" stroke="var(--ink)" strokeWidth="1.4" delay={2.0} duration={0.5} />

      {/* Origin / destination labels */}
      <text x="34" y="156" fontSize="9" fontFamily="var(--font-mono)" fill="var(--dim)" letterSpacing="0.14em">GATE</text>
      <text x="246" y="62" fontSize="9" fontFamily="var(--font-mono)" fill="var(--dim)" letterSpacing="0.14em">OFFLOAD</text>

      {/* Deviation path — red accent */}
      <motion.path
        d="M150 100 Q200 170 240 180"
        stroke="var(--red)"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView || reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{
          pathLength: { duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.3, delay: 1.4 },
        }}
      />

      {/* Deviation marker — red dot at endpoint */}
      <motion.circle
        cx="240"
        cy="180"
        r="5"
        fill="var(--red)"
        initial={{ scale: 0 }}
        animate={inView || reduced ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 2.4, duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
      />
      {/* pulse halo */}
      <motion.circle
        cx="240"
        cy="180"
        r="5"
        fill="none"
        stroke="var(--red)"
        strokeWidth="1"
        initial={{ scale: 1, opacity: 0 }}
        animate={
          inView || reduced
            ? { scale: [1, 2.2, 2.2], opacity: [0.6, 0, 0] }
            : { scale: 1, opacity: 0 }
        }
        transition={{ delay: 2.6, duration: 1.6, repeat: Infinity, repeatDelay: 0.4 }}
      />

      {/* Annotation */}
      <DrawnPath d="M240 180 L260 200" duration={0.5} delay={2.6} stroke="var(--dim)" strokeDasharray="2 3" />
      <text x="262" y="206" fontSize="9" fontFamily="var(--font-mono)" fill="var(--dim)" letterSpacing="0.14em">
        DEVIATION
      </text>
    </svg>
  );
}
