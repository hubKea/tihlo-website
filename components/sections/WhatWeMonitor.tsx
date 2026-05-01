import Eyebrow from '@/components/ui/Eyebrow';
import FadeUp from '@/components/motion/FadeUp';
import { WHAT_WE_MONITOR } from '@/lib/constants';

export default function WhatWeMonitor() {
  return (
    <section
      id="what-we-monitor"
      className="scroll-mt-20 border-t border-[var(--faint)] bg-[var(--white-2)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <FadeUp>
          <Eyebrow>What we monitor</Eyebrow>
          <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(36px,4.5vw,60px)] font-medium leading-[1.0] tracking-[-0.035em] text-[var(--ink)]">
            {WHAT_WE_MONITOR.headline}
          </h2>
          <p className="mt-6 max-w-[60ch] text-[16px] leading-[1.62] text-[var(--muted)]">
            {WHAT_WE_MONITOR.lede}
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-[var(--faint)] bg-[var(--faint)] md:grid-cols-2 lg:mt-20">
          {WHAT_WE_MONITOR.categories.map((cat, i) => (
            <FadeUp key={cat.label} delay={i * 0.05}>
              <article className="flex h-full flex-col bg-[var(--white)] p-7 transition-colors duration-300 hover:bg-[var(--white-2)] lg:p-9">
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[18px] font-medium tabular-nums leading-none text-[var(--ink)]">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--dim)]">
                    {cat.contexts}
                  </span>
                </div>
                <h3 className="font-display text-[20px] font-medium leading-[1.2] tracking-[-0.015em] text-[var(--ink)] lg:text-[22px]">
                  {cat.label}
                </h3>
                <p className="mt-4 max-w-[44ch] text-[14.5px] leading-[1.6] text-[var(--muted)]">
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
