'use client';

import { motion } from 'framer-motion';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  red?: boolean;
}

export default function Eyebrow({ children, className = '', animate = true, red = false }: EyebrowProps) {
  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
  };

  return (
    <div className={`mono-label flex items-center gap-3 ${red ? 'text-[var(--red)]' : 'text-[var(--muted)]'} ${className}`}>
      {animate ? (
        <motion.span
          variants={lineVariants}
          className="block h-px w-6 origin-left bg-current"
        />
      ) : (
        <span className="block h-px w-6 bg-current" />
      )}
      {children}
    </div>
  );
}
