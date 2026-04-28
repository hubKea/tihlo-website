'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

/**
 * Magnetic hover wrapper.
 * Uses framer-motion motion values so transforms run outside React's render cycle —
 * no re-renders, no perf collapse on mobile.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.28,
  radius = 90,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const x = useSpring(dx, { stiffness: 220, damping: 22, mass: 0.6 });
  const y = useSpring(dy, { stiffness: 220, damping: 22, mass: 0.6 });
  // identity transforms keep TS happy + enable GPU compositor
  const tx = useTransform(x, (v) => v);
  const ty = useTransform(y, (v) => v);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    function move(e: PointerEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mx = rect.left + rect.width / 2;
      const my = rect.top + rect.height / 2;
      const ddx = e.clientX - mx;
      const ddy = e.clientY - my;
      const dist = Math.hypot(ddx, ddy);
      if (dist < radius) {
        const f = (1 - dist / radius) * strength;
        dx.set(ddx * f);
        dy.set(ddy * f);
      } else {
        dx.set(0);
        dy.set(0);
      }
    }

    function leave() {
      dx.set(0);
      dy.set(0);
    }

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', leave);
    };
  }, [strength, radius, dx, dy]);

  return (
    <motion.span ref={ref} className={`inline-block ${className}`} style={{ x: tx, y: ty }}>
      {children}
    </motion.span>
  );
}
