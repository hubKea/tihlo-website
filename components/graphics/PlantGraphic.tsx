'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { DrawnPath, DrawnCircle, DrawnLineEl } from '@/components/motion/DrawnSVG';

/** Yellow plant excavator outline + utilisation bars. Ink stroke + one red accent (idle bar). */
export default function PlantGraphic({ className = '' }: { className?: string }) {
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

      {/* Excavator silhouette — chassis */}
      <DrawnPath
        d="M50 150 L100 150 L120 130 L160 130 L160 150 L150 150 L150 160 L60 160 Z"
        duration={1.6}
        delay={0.3}
      />
      {/* Excavator cab */}
      <DrawnPath d="M120 130 L120 110 L150 110 L160 130" duration={0.8} delay={0.7} />
      {/* Excavator boom */}
      <DrawnPath
        d="M150 120 L210 95 L240 110 L235 122"
        duration={1.2}
        delay={0.9}
      />
      {/* Bucket */}
      <DrawnPath
        d="M235 122 L242 134 L228 138 L224 128 Z"
        duration={0.6}
        delay={1.4}
      />

      {/* Tracks */}
      <DrawnPath d="M50 160 L150 160" duration={0.6} delay={1.5} />
      <DrawnCircle cx="68" cy="166" r="6" delay={1.6} duration={0.4} />
      <DrawnCircle cx="92" cy="166" r="6" delay={1.7} duration={0.4} />
      <DrawnCircle cx="116" cy="166" r="6" delay={1.8} duration={0.4} />
      <DrawnCircle cx="138" cy="166" r="6" delay={1.9} duration={0.4} />

      {/* Utilisation bars — right side. 4 bars representing shifts. The 3rd is the red accent (idle anomaly) */}
      <DrawnPath d="M210 188 L290 188" duration={0.6} delay={1.0} stroke="var(--dim)" />
      <text x="210" y="200" fontSize="8" fontFamily="var(--font-mono)" fill="var(--dim)" letterSpacing="0.14em">
        UTILISATION
      </text>

      {Array.from({ length: 4 }).map((_, i) => {
        const x = 220 + i * 18;
        const isAnomaly = i === 2;
        const targetH = [28, 36, 12, 32][i]; // bar 3 is short = idle anomaly
        return (
          <motion.rect
            key={i}
            x={x}
            y={180 - targetH}
            width="10"
            height={targetH}
            fill={isAnomaly ? 'var(--red)' : 'var(--ink)'}
            initial={{ scaleY: 0 }}
            animate={inView || reduced ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{
              duration: 0.7,
              delay: 2.0 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: `${x + 5}px 180px` }}
          />
        );
      })}

      {/* Anomaly bracket above the red bar */}
      <motion.path
        d="M250 144 L250 138 L262 138 L262 144"
        stroke="var(--dim)"
        strokeDasharray="2 3"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          inView || reduced
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{
          pathLength: { duration: 0.7, delay: 2.6 },
          opacity: { duration: 0.3, delay: 2.6 },
        }}
      />

      <motion.text
        x="240"
        y="132"
        fontSize="9"
        fontFamily="var(--font-mono)"
        fill="var(--dim)"
        letterSpacing="0.14em"
        initial={{ opacity: 0 }}
        animate={inView || reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 2.8 }}
      >
        IDLE · 78%
      </motion.text>
    </svg>
  );
}
