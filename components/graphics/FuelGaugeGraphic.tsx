'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { DrawnPath, DrawnCircle, DrawnLineEl } from '@/components/motion/DrawnSVG';

/** Editorial fuel gauge line illustration. Ink stroke + one red accent (needle). */
export default function FuelGaugeGraphic({ className = '' }: { className?: string }) {
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

      {/* Gauge arc — outer */}
      <DrawnPath
        d="M70 158 A90 90 0 0 1 250 158"
        duration={1.4}
        delay={0.3}
      />
      {/* Gauge arc — inner */}
      <DrawnPath
        d="M90 158 A70 70 0 0 1 230 158"
        duration={1.4}
        delay={0.5}
        stroke="var(--dim)"
      />

      {/* Tick marks across the arc */}
      {Array.from({ length: 9 }).map((_, i) => {
        const angle = Math.PI + (i / 8) * Math.PI;
        const x1 = 160 + Math.cos(angle) * 90;
        const y1 = 158 + Math.sin(angle) * 90;
        const x2 = 160 + Math.cos(angle) * 80;
        const y2 = 158 + Math.sin(angle) * 80;
        return (
          <DrawnLineEl
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            duration={0.4}
            delay={0.7 + i * 0.05}
          />
        );
      })}

      {/* Calibration labels */}
      <text x="60" y="174" fontSize="9" fontFamily="var(--font-mono)" fill="var(--dim)" letterSpacing="0.16em">E</text>
      <text x="252" y="174" fontSize="9" fontFamily="var(--font-mono)" fill="var(--dim)" letterSpacing="0.16em">F</text>

      {/* Anomaly bracket above the needle */}
      <DrawnPath d="M180 50 L180 38 L240 38 L240 50" duration={0.8} delay={1.4} stroke="var(--dim)" strokeDasharray="3 3" />

      {/* Anomaly text */}
      <text x="184" y="32" fontSize="9" fontFamily="var(--font-mono)" fill="var(--dim)" letterSpacing="0.14em">
        ANOMALY · +212L
      </text>

      {/* Needle — the single red accent. Sweeps from low to anomaly position */}
      <motion.line
        x1="160"
        y1="158"
        x2="160"
        y2="158"
        stroke="var(--red)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ x2: 88, y2: 138 }}
        animate={
          reduced
            ? { x2: 218, y2: 92 }
            : inView
              ? { x2: 218, y2: 92 }
              : { x2: 88, y2: 138 }
        }
        transition={{ duration: 1.4, delay: 1.6, ease: [0.34, 1.2, 0.64, 1] }}
      />

      {/* Needle pivot dot */}
      <DrawnCircle cx="160" cy="158" r="4" fill="var(--ink)" stroke="none" delay={1.5} duration={0.6} />
      <motion.circle
        cx="160"
        cy="158"
        r="2"
        fill="var(--red)"
        initial={{ scale: 0 }}
        animate={inView || reduced ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 2.4, duration: 0.4 }}
      />
    </svg>
  );
}
