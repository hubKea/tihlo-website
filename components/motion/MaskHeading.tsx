'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

interface MaskHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  immediate?: boolean;
}

export default function MaskHeading({
  children,
  className = '',
  delay = 0,
  duration = 1.0,
  immediate = false,
}: MaskHeadingProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const shouldAnimate = immediate || inView;

  if (reduceMotion) {
    return <span className={`block ${className}`}>{children}</span>;
  }

  return (
    <span
      ref={ref}
      className={`block overflow-hidden ${className}`}
      style={{ paddingBottom: '0.05em' }}
    >
      <motion.span
        initial={{ y: '110%' }}
        animate={shouldAnimate ? { y: 0 } : { y: '110%' }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
