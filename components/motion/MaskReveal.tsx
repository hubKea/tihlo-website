'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { maskReveal } from '@/lib/motion';

interface MaskRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function MaskReveal({ children, delay = 0, duration = 1.0, className = '' }: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        variants={maskReveal}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        custom={delay}
      >
        {children}
      </motion.div>
    </div>
  );
}
