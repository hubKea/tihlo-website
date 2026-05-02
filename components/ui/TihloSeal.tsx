'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function formatSastTime() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Johannesburg',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());
}

export default function TihloSeal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduceMotion = useReducedMotion();
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(formatSastTime());

    const id = window.setInterval(() => {
      setTime(formatSastTime());
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.section
      ref={ref}
      className="border-t border-[var(--faint)] bg-white px-6 py-16"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 12 }
      }
      transition={reduceMotion ? undefined : { duration: 0.7, ease }}
    >
      <div className="mx-auto flex max-w-site flex-col items-center text-center">
        <svg
          viewBox="0 0 64 64"
          className="mx-auto block w-16 overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          {!reduceMotion && (
            <motion.circle
              cx="32"
              cy="32"
              r="20"
              fill="none"
              stroke="var(--red)"
              strokeWidth="1"
              initial={{ r: 20, opacity: 0 }}
              animate={inView ? { r: 48, opacity: [0.4, 0] } : { r: 20, opacity: 0 }}
              transition={{ delay: 1, duration: 0.8, ease }}
            />
          )}
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <circle
            cx="32"
            cy="32"
            r="10"
            stroke="var(--ink)"
            strokeWidth="1"
            strokeDasharray="2.5 3"
            opacity="0.35"
          />
          <circle
            cx="32"
            cy="32"
            r="16"
            stroke="var(--ink)"
            strokeWidth="1"
            strokeDasharray="3 4"
            opacity="0.28"
          />
          <path
            d="M16 32 C22 22 42 22 48 32 C42 42 22 42 16 32Z"
            fill="white"
          />
          <path
            d="M16 32 C22 22 42 22 48 32"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 32 C22 42 42 42 48 32"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="32" r="3" fill="var(--red)" />
        </svg>
        <p
          className="mt-5 font-mono text-[9.5px] font-medium uppercase tracking-[0.22em] text-[var(--dim)]"
          suppressHydrationWarning
        >
          VERIFIED · TIHLO · {time || '--:--:--'} SAST
        </p>
      </div>
    </motion.section>
  );
}
