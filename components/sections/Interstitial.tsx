'use client';

import AmbientCursor from '@/components/motion/AmbientCursor';
import FadeUp from '@/components/motion/FadeUp';

export default function Interstitial() {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] px-6 py-32 lg:px-12 lg:py-44">
      <AmbientCursor />
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,35,24,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[900px] text-center">
        <FadeUp>
          <p className="mb-8 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/65">
            Operating principle
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <blockquote className="font-display text-[clamp(28px,4.5vw,56px)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
            Commodity loss is rarely a single event.
            <br />
            It is a sequence of{' '}
            <em className="not-italic text-[var(--red)]">
              unverified handovers.
            </em>
          </blockquote>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mt-10 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
            TIHLO · Field Notes No. 01
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
