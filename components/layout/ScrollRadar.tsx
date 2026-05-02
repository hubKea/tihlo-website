'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

function getScrollProgress() {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  if (maxScroll <= 0) return 0;

  return Math.min(1, Math.max(0, window.scrollY / maxScroll));
}

export default function ScrollRadar() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setProgress(getScrollProgress());
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden w-[3px] lg:block"
      aria-hidden="true"
      data-scroll-radar
    >
      <div className="absolute inset-y-0 right-0 w-px bg-[var(--faint)]" />
      {[25, 50, 75].map((top) => (
        <span
          key={top}
          className="absolute right-0 h-px w-1.5 bg-[var(--faint)]"
          style={{ top: `${top}%` }}
          data-scroll-radar-tick
        />
      ))}
      <div
        className="absolute right-0 top-0 w-[2px]"
        style={{ height: `${progress * 100}%` }}
        data-scroll-radar-fill
      >
        <div className="h-full w-full bg-[var(--red)] opacity-60" />
        <motion.span
          className="absolute bottom-0 left-1/2 block h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[var(--red)] shadow-[0_0_8px_rgba(180,35,24,0.4)]"
          data-scroll-radar-pip
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      </div>
    </div>
  );
}
