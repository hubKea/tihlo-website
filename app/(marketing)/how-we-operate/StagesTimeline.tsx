'use client';

import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { HOW_WE_OPERATE } from '@/lib/constants';
import { STAGE_ICONS } from './stage-icons';

function StageRow({
  stage,
  index,
  isLast,
}: {
  stage: (typeof HOW_WE_OPERATE.stages)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      id={`stage-${index + 1}`}
      className={`group relative scroll-mt-24 grid grid-cols-1 gap-8 px-0 py-10 lg:grid-cols-[minmax(180px,220px)_1fr] lg:gap-14 lg:py-16 ${
        !isLast ? 'border-b border-[var(--faint)]' : ''
      }`}
    >
      {/* Active marker on the left rail (positioned by parent's progress line) */}
      <span
        aria-hidden
        className="absolute -left-[5px] top-12 hidden h-2.5 w-2.5 rounded-full border border-[var(--ink)] bg-[var(--white)] transition-all duration-500 lg:block"
        style={{
          background: inView ? 'var(--ink)' : 'var(--white)',
          transform: inView ? 'scale(1.15)' : 'scale(1)',
        }}
      />

      {/* Left index column */}
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, x: reduced ? 0 : -16 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reduced ? 0 : -16 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[clamp(36px,3.6vw,52px)] font-medium tabular-nums leading-none tracking-[-0.03em] text-[var(--ink)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <motion.span
            className="flex h-9 w-9 items-center justify-center border border-[var(--faint)] text-[var(--ink)] transition-colors duration-300 group-hover:border-[var(--ink)]"
            whileHover={reduced ? undefined : { scale: 1.1, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            {STAGE_ICONS[index]}
          </motion.span>
        </div>
        <p className="mono-id mt-4 text-[var(--dim)]">{stage.index}</p>
        <h3 className="mt-3 font-display text-[clamp(24px,2.4vw,30px)] font-medium leading-[1.04] tracking-[-0.025em] text-[var(--ink)]">
          {stage.name}
        </h3>
        <p className="mt-3 max-w-[26ch] text-[14px] leading-[1.5] text-[var(--muted)]">
          {stage.tagline}
        </p>

        {/* Animated progress underline from heading */}
        <motion.span
          className="mt-5 block h-px origin-left bg-[var(--ink)]"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '60%' }}
        />
      </motion.div>

      {/* Right content column */}
      <motion.div
        className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(220px,300px)] lg:gap-12"
        initial={{ opacity: 0, y: reduced ? 0 : 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 16 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="space-y-4 text-[15px] leading-[1.7] text-[var(--muted)]">
          {stage.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="border-l border-[var(--faint)] pl-5">
          <p className="mono-label mb-3 text-[var(--dim)]">What we look for</p>
          <ul className="space-y-2">
            {stage.anomalies.map((a, j) => (
              <motion.li
                key={a}
                className="flex items-start gap-2.5 text-[13px] leading-[1.55] text-[var(--muted)]"
                initial={{ opacity: 0, x: reduced ? 0 : -8 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: reduced ? 0 : -8 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.4 + j * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="mt-[7px] block h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--ink)]" />
                {a}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function StagesTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 40%'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.4,
  });

  const fillHeight = useTransform(smooth, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`);

  return (
    <section className="relative border-t border-[var(--faint)] bg-[var(--white)] px-6 lg:px-12">
      <div ref={containerRef} className="relative mx-auto max-w-site">
        {/* Vertical progress rail — desktop only */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 hidden h-full w-px lg:block"
        >
          <span className="absolute inset-y-0 left-0 block w-px bg-[var(--faint)]" />
          <motion.span
            className="absolute left-0 top-0 block w-px origin-top bg-[var(--ink)]"
            style={{ height: reduced ? '100%' : fillHeight }}
          />
        </div>

        <div className="lg:pl-10">
          {HOW_WE_OPERATE.stages.map((stage, i) => (
            <StageRow
              key={stage.name}
              stage={stage}
              index={i}
              isLast={i === HOW_WE_OPERATE.stages.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
