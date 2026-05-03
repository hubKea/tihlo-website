import Eyebrow from '@/components/ui/Eyebrow';
import Lede from '@/components/ui/Lede';
import FadeUp from '@/components/motion/FadeUp';
import { WHAT_WE_MONITOR } from '@/lib/constants';

export default function WhatWeMonitor() {
  return (
    <section
      id="what-we-monitor"
      className="scroll-mt-20 border-t border-[var(--faint)] bg-[var(--white-2)] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <FadeUp>
          <Eyebrow>What we monitor</Eyebrow>
          <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(30px,3.2vw,44px)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink)]">
            {WHAT_WE_MONITOR.headline}
          </h2>
          <Lede
            segments={WHAT_WE_MONITOR.ledeSegments}
            className="mt-5 max-w-[58ch]"
          />
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-[var(--faint)] bg-[var(--faint)] md:grid-cols-2 lg:mt-12">
          {WHAT_WE_MONITOR.categories.map((cat, i) => (
            <FadeUp key={cat.label} delay={i * 0.05}>
              <article className="flex h-full flex-col bg-[var(--white)] p-6 transition-colors duration-300 hover:bg-[var(--white-2)] lg:p-7">
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[18px] font-medium tabular-nums leading-none text-[var(--ink)]">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--dim)]">
                    {cat.contexts}
                  </span>
                </div>
                <h3 className="font-display text-[19px] font-medium leading-[1.2] tracking-[-0.01em] text-[var(--ink)] lg:text-[21px]">
                  {cat.label}
                </h3>
                <p className="mt-3 max-w-[44ch] text-[14px] leading-[1.62] text-[var(--muted)]">
                  {cat.body}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
