import type { Metadata } from 'next';
import Image from 'next/image';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import MaskHeading from '@/components/motion/MaskHeading';
import RegMarks from '@/components/ui/RegMarks';
import LineSystem from '@/components/motion/LineSystem';
import MagneticButton from '@/components/motion/MagneticButton';
import StagesTimeline from './StagesTimeline';
import { HOW_WE_OPERATE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How We Operate',
  description:
    "TIHLO's six-stage methodology for active monitoring and verification of mining commodity movement across South Africa.",
};

export default function HowWeOperatePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--white)] px-6 pb-20 pt-32 lg:px-12 lg:pb-28 lg:pt-40">
        <LineSystem tone="light" density="quiet" anchor="left" />
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
              <div className="relative aspect-[5/4] overflow-hidden border border-[var(--faint)] bg-[var(--white-2)] lg:aspect-[4/5]">
                <RegMarks color="var(--dim)" size={14} />
                {/* TODO: Compress hero-operations.png to <500KB (currently 1.77MB) */}
                <Image
                  src="/images/hero-operations.png"
                  alt="Aerial open-pit operation at golden hour — continuous oversight in a single frame"
                  fill
                  priority
                  quality={90}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="scan-lines absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(14,16,20,0.85)] via-[rgba(14,16,20,0.55)] to-transparent px-6 pb-4 pt-12">
                  <span className="mono-id text-white/70">
                    FIELD · CORRIDOR ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Methodology intro */}
      <section className="relative isolate overflow-hidden border-t border-[var(--faint)] bg-[var(--white-2)] px-6 py-20 lg:px-12 lg:py-28">
        <LineSystem tone="light" density="quiet" />
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-end lg:gap-16">
            <div>
              <Eyebrow className="mb-5">Six-stage methodology</Eyebrow>
              <h2 className="font-display text-[clamp(36px,4.6vw,58px)] font-medium leading-[0.98] tracking-[-0.035em] text-[var(--ink)]">
                <MaskHeading>One loop.</MaskHeading>
                <MaskHeading delay={0.12}>Every corridor.</MaskHeading>
              </h2>
            </div>
            <div>
              <p className="text-[16px] leading-[1.7] text-[var(--muted)]">
                Six stages, in sequence. The same procedure runs in Mpumalanga as in
                Limpopo, on yellow plant as on transport, by day as by night. Each
                stage produces a signed record. The next stage cannot begin until
                the previous one closes.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
                {HOW_WE_OPERATE.stages.map((stage, i) => (
                  <a
                    key={stage.name}
                    href={`#stage-${i + 1}`}
                    className="mono-id text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    {String(i + 1).padStart(2, '0')} · {stage.name.replace('.', '')}
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stages — Vertical narrative timeline with scroll progress */}
      <StagesTimeline />

      {/* Cross-stage principles */}
      <section className="relative isolate overflow-hidden border-t border-[var(--faint)] bg-[var(--white-2)] px-6 py-20 lg:px-12 lg:py-28">
        <LineSystem tone="light" density="quiet" anchor="right" />
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-end">
            <div>
              <Eyebrow className="mb-5">Principles</Eyebrow>
              <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-medium leading-[0.98] tracking-[-0.035em] text-[var(--ink)]">
                <MaskHeading>Across every stage.</MaskHeading>
              </h2>
            </div>
            <p className="text-[15px] leading-[1.7] text-[var(--muted)]">
              The methodology runs on three non-negotiable principles. They are how
              we close the gap between what fleet systems report and what is actually
              happening on the ground.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 gap-px border border-[var(--faint)] bg-[var(--faint)] md:grid-cols-3">
            {HOW_WE_OPERATE.principles.map((p, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="group relative flex h-full flex-col overflow-hidden bg-[var(--white)] px-7 py-10 transition-all duration-300 hover:bg-[var(--white-2)] lg:px-8">
                  {/* Animated top rule on hover */}
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--ink)] transition-transform duration-500 group-hover:scale-x-100" />
                  <span
                    className="pointer-events-none absolute right-5 top-5 font-mono text-[72px] font-medium tabular-nums leading-none tracking-[-0.04em] text-[var(--ghost)] transition-all duration-500 group-hover:text-[var(--faint)] group-hover:translate-x-[-4px]"
                    aria-hidden
                  >
                    0{i + 1}
                  </span>
                  <p className="mono-id relative z-10 mb-5 text-[var(--dim)]">
                    Principle 0{i + 1}
                  </p>
                  <p className="relative z-10 max-w-[28ch] font-display text-[19px] font-medium leading-[1.32] tracking-[-0.01em] text-[var(--ink)] lg:text-[20px]">
                    {p}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden border-t border-[var(--faint)] bg-[var(--white)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow className="mb-5">Engage</Eyebrow>
              <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-medium leading-[0.98] tracking-[-0.035em] text-[var(--ink)]">
                <MaskHeading>Ready to initiate.</MaskHeading>
              </h2>
            </div>
            <div>
              <p className="mb-7 text-[17px] leading-[1.65] text-[var(--muted)]">
                Engagements begin with a 30-minute briefing. We assess your
                current process, identify the highest-risk control gaps, and
                tell you whether TIHLO is the right partner.
              </p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <Button href="/contact">Request a briefing</Button>
                </MagneticButton>
                <MagneticButton>
                  <Button variant="ghost" href="/about" arrow={false}>
                    About the firm
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
