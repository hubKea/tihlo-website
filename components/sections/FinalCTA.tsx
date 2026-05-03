'use client';

import Button from '@/components/ui/Button';
import Lede from '@/components/ui/Lede';
import MaskHeading from '@/components/motion/MaskHeading';
import FadeUp from '@/components/motion/FadeUp';
import { FINAL_CTA } from '@/lib/constants';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--red)] px-6 pb-28 pt-36 lg:px-12 lg:pb-40 lg:pt-44">
      {/* Subtle texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[800px] text-center">
        <FadeUp>
          <p className="mb-6 inline-flex items-center gap-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/82">
            <span className="block h-px w-5 bg-white/70" />
            The eye that never misses
          </p>
        </FadeUp>

        <h2 className="font-display text-[clamp(40px,6vw,80px)] font-medium leading-[0.94] tracking-[-0.04em] text-white">
          <MaskHeading delay={0.1}>Movement,</MaskHeading>
          <MaskHeading delay={0.22}>on the record.</MaskHeading>
        </h2>

        <FadeUp delay={0.3}>
          <Lede
            segments={FINAL_CTA.bodySegments}
            size="lg"
            tone="red"
            className="mx-auto mt-8 max-w-[48ch]"
          />
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="white" size="lg" href="/contact">
              Request a briefing
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/how-we-operate"
              className="border-white/30 text-white hover:border-white hover:text-white"
              arrow={false}
            >
              How we operate
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
