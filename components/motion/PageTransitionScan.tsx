'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransitionScan() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <motion.span
      key={pathname}
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-[var(--red)]"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
