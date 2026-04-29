import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import LineIllustration from '@/components/drawings/LineIllustration';
import { HOW_IT_WORKS } from '@/lib/constants';

const VARIANTS = ['verify', 'monitor', 'resolve'] as const;

export default function HowItWorks() {
  return (
    <section className="bg-[var(--paper-2)] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-site">
        <FadeUp className="mb-16 grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow className="mb-5">{HOW_IT_WORKS.eyebrow}</Eyebrow>
            <h2 className="font-display text-[clamp(36px,5vw,68px)] font-medium leading-[0.96] tracking-[-0.04em] text-[var(--ink)]">
              {HOW_IT_WORKS.headline}
            </h2>
          </div>
          <p className="col-span-12 self-end text-[16px] leading-[1.65] text-[var(--muted)] lg:col-span-4 lg:col-start-9">
            {HOW_IT_WORKS.lede}
          </p>
        </FadeUp>

        {/* Line-flow diagram */}
        <div className="relative">
          {/* Connecting line — horizontal on lg+, vertical on mobile */}
          <svg
            className="pointer-events-none absolute left-0 top-[58px] hidden h-[1px] w-full lg:block"
            viewBox="0 0 1000 1"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="var(--rule-3)" strokeDasharray="2 4" />
          </svg>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
            {HOW_IT_WORKS.steps.map((step, i) => (
              <FadeUp key={step.index} delay={i * 0.1}>
                <div className="relative">
                  {/* Node marker */}
                  <div className="mb-8 flex items-baseline gap-4">
                    <span className="relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center self-center bg-[var(--paper-2)]">
                      <span className="block h-2 w-2 bg-[var(--red)]" />
                      <span className="absolute inset-0 border border-[var(--ink)]" />
                    </span>
                    <span className="font-mono text-[clamp(34px,3.2vw,44px)] font-medium leading-none tracking-[-0.02em] text-[var(--red)] tabular-nums">
                      {step.index}
                    </span>
                    <span className="mono-label text-[var(--muted)]">Movement</span>
                  </div>

                  {/* Illustration */}
                  <div className="mb-7 h-28 text-[var(--ink)]/75">
                    <LineIllustration variant={VARIANTS[i]} className="h-full w-full" />
                  </div>

                  <h3 className="mb-3 font-display text-[32px] font-medium tracking-[-0.025em] text-[var(--ink)]">
                    {step.name}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-[var(--muted)]">
                    {step.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <FadeUp delay={0.35} className="mt-14">
          <Link
            href={HOW_IT_WORKS.cta.href}
            className="group inline-flex items-center gap-3 mono-label text-[var(--ink)] transition-colors hover:text-[var(--red)]"
          >
            <span className="block h-px w-6 bg-[var(--red)]" />
            {HOW_IT_WORKS.cta.label}
            <ArrowRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
