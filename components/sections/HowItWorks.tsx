import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Eyebrow from '@/components/ui/Eyebrow';
import Lede from '@/components/ui/Lede';
import FadeUp from '@/components/motion/FadeUp';
import { HOW_IT_WORKS } from '@/lib/constants';

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-[var(--faint)] bg-[var(--white)] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-end lg:gap-14">
          <FadeUp>
            <Eyebrow>How TIHLO works</Eyebrow>
            <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(30px,3.2vw,44px)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink)]">
              {HOW_IT_WORKS.headline}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Lede segments={HOW_IT_WORKS.ledeSegments} />
          </FadeUp>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-[var(--faint)] bg-[var(--faint)] md:grid-cols-3 lg:mt-12">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <FadeUp key={step.index} delay={i * 0.06}>
              <article className="flex h-full flex-col bg-[var(--white)] p-6 lg:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className="font-mono text-[18px] font-medium tabular-nums leading-none text-[var(--ink)]">
                    {step.index}
                  </span>
                  <span className="block h-px flex-1 bg-[var(--faint)]" />
                </div>
                <h3 className="font-display text-[20px] font-medium leading-[1.16] tracking-[-0.015em] text-[var(--ink)] lg:text-[22px]">
                  {step.name}.
                </h3>
                <p className="mt-3 text-[14px] leading-[1.64] text-[var(--muted)]">
                  {step.body}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-10">
          <Link
            href={HOW_IT_WORKS.cta.href}
            className="group inline-flex items-center gap-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--ink)] transition-colors hover:text-[var(--red)]"
          >
            <span className="block h-px w-5 bg-[var(--ink)]" />
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
