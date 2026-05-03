'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, inViewOptions } from '@/lib/motion';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  reveal?: boolean;
}

export default function FadeUp({
  children,
  delay = 0,
  className = '',
  reveal = true,
}: FadeUpProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    ...inViewOptions,
  });
  const revealClass = reveal ? `reveal ${inView ? 'is-visible' : ''}` : '';

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      className={`${revealClass} ${className}`}
    >
      {children}
    </motion.div>
  );
}
