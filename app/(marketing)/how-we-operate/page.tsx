import type { Metadata } from 'next';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import MaskHeading from '@/components/motion/MaskHeading';
import AssuranceLoopV2 from '@/components/sections/AssuranceLoopV2';
import { HOW_WE_OPERATE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How We Operate',
  description:
    "TIHLO's six-stage methodology for active monitoring and verification of mining commodity movement across South Africa.",
};

function StageBlock({
  stage,
  index,
}: {
  stage: (typeof HOW_WE_OPERATE.stages)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      data-stage={index}
      className={`border-b border-l-2 border-[var(--faint)] border-l-transparent py-16 transition-colors hover:border-l-[var(--dim)] hover:bg-[var(--white-3)] lg:py-20 ${index === 0 ? 'border-t' : ''}`}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        {/* Stage header */}
        <FadeUp className={isEven ? '' : 'lg:order-last'}>
          <div className="sticky top-28">
            <span className="mb-4 block font-mono text-[clamp(40px,4.4vw,64px)] font-semibold tabular-nums leading-none tracking-[-0.02em] text-[var(--ink)]">
              0{index + 1}
            </span>
            <h2 className="font-display text-[clamp(40px,5.6vw,68px)] font-semibold leading-[0.96] tracking-[-0.04em] text-[var(--ink)]">
              {stage.name}
            </h2>
            <p className="mt-4 text-[17px] leading-[1.55] text-[var(--muted)]">
              {stage.tagline}
            </p>

            {/* Anomaly watch list */}
            <div className="mt-8 border border-[var(--faint)] p-6">
              <p className="mono-label mb-4 text-[var(--muted)]">
                What we look for
              </p>
              <ul className="space-y-2.5">
                {stage.anomalies.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-3 text-sm text-[var(--muted)]"
                  >
                    <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-[var(--ink)]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* Stage body */}
        <FadeUp delay={0.12} className={isEven ? '' : 'lg:order-first'}>
          <div className="space-y-5 text-[17px] leading-[1.65] text-[var(--muted)]">
            {stage.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

export default function HowWeOperatePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--white)] px-6 pb-20 pt-24 lg:px-12 lg:py-32">
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow>{HOW_WE_OPERATE.eyebrow}</Eyebrow>
              <h1 className="mt-8 font-display text-[clamp(48px,7vw,92px)] font-medium leading-[0.94] tracking-[-0.045em] text-[var(--ink)]">
                <MaskHeading immediate>How we</MaskHeading>
                <MaskHeading delay={0.12} immediate>
                  operate.
                </MaskHeading>
              </h1>
              <p className="mt-8 max-w-xl text-[17px] leading-[1.65] text-[var(--muted)]">
                {HOW_WE_OPERATE.lede}
              </p>
            </div>
            <div>
              <div className="border border-[var(--faint)] p-5 lg:p-8">
                <AssuranceLoopV2 stagesSelector="[data-stage]" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stages */}
      <section className="relative isolate overflow-hidden bg-[var(--white)] px-6 lg:px-12">
        <div className="relative z-10 mx-auto max-w-site">
          {HOW_WE_OPERATE.stages.map((stage, i) => (
            <StageBlock key={stage.name} stage={stage} index={i} />
          ))}
        </div>
      </section>

      {/* Cross-stage principles */}
      <section className="relative isolate overflow-hidden bg-[var(--ink)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="mb-12">
            <Eyebrow className="text-white/50 mb-5">
              <span className="bg-white/10 -ml-3" />
              Principles
            </Eyebrow>
            <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--white)]">
              Across every stage.
            </h2>
          </FadeUp>

          <div className="border-white/10 bg-white/10 grid grid-cols-1 gap-px border lg:grid-cols-3">
            {HOW_WE_OPERATE.principles.map((p, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-[var(--ink)] px-8 py-10">
                  <p className="mono-id mb-4 text-[var(--ink)]">0{i + 1}</p>
                  <p className="font-display text-lg font-semibold leading-[1.3] text-[var(--white)]">
                    {p}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--white)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow className="mb-5">Engage</Eyebrow>
              <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
                Ready to initiate.
              </h2>
            </div>
            <div>
              <p className="mb-7 text-[17px] leading-[1.65] text-[var(--muted)]">
                Engagements begin with a 30-minute briefing. We assess your
                current process, identify the highest-risk control gaps, and
                tell you whether TIHLO is the right partner.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact">Request a briefing</Button>
                <Button variant="ghost" href="/about" arrow={false}>
                  About the firm
                </Button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
