'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Fragment, useRef } from 'react';
import FadeUp from '@/components/motion/FadeUp';
import { HOW_WE_OPERATE } from '@/lib/constants';
import { STAGE_ICONS } from './stage-icons';

const isDark = (i: number) => i % 2 === 1;

function StageSection({
  stage,
  index,
}: {
  stage: (typeof HOW_WE_OPERATE.stages)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const reduced = useReducedMotion();
  const dark = isDark(index);

  return (
    <section
      id={`stage-${index + 1}`}
      className={`relative scroll-mt-24 border-t px-6 py-16 lg:px-12 lg:py-20 ${
        dark
          ? 'border-white/10 bg-[var(--ink)]'
          : 'border-[var(--faint)] bg-[var(--white)]'
      }`}
    >
      <div ref={ref} className="mx-auto max-w-site">
        <div className="group relative grid grid-cols-1 gap-8 lg:grid-cols-[minmax(180px,220px)_1fr] lg:gap-14">
          {/* Left index column */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: reduced ? 0 : -16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reduced ? 0 : -16 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3">
              <span
                className={`font-mono text-[clamp(36px,3.6vw,52px)] font-medium tabular-nums leading-none tracking-[-0.03em] ${
                  dark ? 'text-white' : 'text-[var(--ink)]'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <motion.span
                className={`flex h-9 w-9 items-center justify-center border transition-colors duration-300 ${
                  dark
                    ? 'border-white/15 text-white group-hover:border-white'
                    : 'border-[var(--faint)] text-[var(--ink)] group-hover:border-[var(--ink)]'
                }`}
                whileHover={reduced ? undefined : { scale: 1.1, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              >
                {STAGE_ICONS[index]}
              </motion.span>
            </div>
            <p
              className={`mono-id mt-4 ${
                dark ? 'text-white/62' : 'text-[var(--dim)]'
              }`}
            >
              {stage.index}
            </p>
            <h3
              className={`mt-3 font-display text-[clamp(24px,2.4vw,30px)] font-medium leading-[1.04] tracking-[-0.025em] ${
                dark ? 'text-white' : 'text-[var(--ink)]'
              }`}
            >
              {stage.name}
            </h3>
            <p
              className={`mt-3 max-w-[26ch] text-[14px] leading-[1.5] ${
                dark ? 'text-white/74' : 'text-[var(--muted)]'
              }`}
            >
              {stage.tagline}
            </p>

            {/* Animated progress underline from heading */}
            <motion.span
              className={`mt-5 block h-px origin-left ${
                dark ? 'bg-white' : 'bg-[var(--ink)]'
              }`}
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
            <div
              className={`space-y-4 text-[15px] leading-[1.7] ${
                dark ? 'text-white/74' : 'text-[var(--muted)]'
              }`}
            >
              {stage.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div
              className={`border-l pl-5 ${
                dark ? 'border-white/10' : 'border-[var(--faint)]'
              }`}
            >
              <p
                className={`mono-label mb-3 ${
                  dark ? 'text-white/65' : 'text-[var(--dim)]'
                }`}
              >
                What we look for
              </p>
              <ul className="space-y-2">
                {stage.anomalies.map((a, j) => (
                  <motion.li
                    key={a}
                    className={`flex items-start gap-2.5 text-[13px] leading-[1.55] ${
                      dark ? 'text-white/72' : 'text-[var(--muted)]'
                    }`}
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
                    <span className="mt-[7px] block h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--red)]" />
                    {a}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function StagesTimeline() {
  return (
    <>
      {HOW_WE_OPERATE.stages.map((stage, i) => (
        <Fragment key={stage.name}>
          <StageSection stage={stage} index={i} />
          {i === 2 && (
            <section className="bg-[var(--red)] px-6 py-14 lg:px-12 lg:py-18">
              <div className="mx-auto max-w-site text-center">
                <FadeUp>
                  <p className="font-display text-[clamp(22px,3vw,36px)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                    Everything before this point is prevention.<br/>
                    <span className="text-white/82">Everything after is response.</span>
                  </p>
                </FadeUp>
              </div>
            </section>
          )}
        </Fragment>
      ))}

      {/* Closing seal */}
      <section className="border-t border-[var(--faint)] bg-[var(--white)] px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-[480px] text-center">
          <FadeUp>
            {/* TIHLO mark at 64px */}
            <svg viewBox="0 0 64 64" fill="none" className="mx-auto mb-6 h-16 w-16">
              <circle cx="32" cy="32" r="30" stroke="var(--ink)" strokeWidth="1.5" />
              <path d="M8 32 Q 32 16 56 32 Q 32 48 8 32 Z" fill="var(--white)" stroke="var(--ink)" strokeWidth="1.5" />
              <circle cx="32" cy="32" r="8" fill="var(--ink)" />
              <circle cx="32" cy="32" r="3" fill="var(--red)" />
            </svg>
            <p className="font-display text-[28px] font-medium tracking-[-0.02em] text-[var(--ink)]">
              Evidence chain sealed.
            </p>
            <p className="mono-id mt-3 text-[var(--dim)]">
              Six stages · one decision trail · audit-ready
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
