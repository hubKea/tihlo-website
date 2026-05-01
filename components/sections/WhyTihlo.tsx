import Eyebrow from '@/components/ui/Eyebrow';
import FadeUp from '@/components/motion/FadeUp';
import { WHY_TIHLO } from '@/lib/constants';

export default function WhyTihlo() {
  return (
    <section className="border-t border-[var(--faint)] bg-[var(--white-2)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-end lg:gap-14">
          <FadeUp>
            <Eyebrow>Why TIHLO</Eyebrow>
            <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(36px,4.5vw,60px)] font-medium leading-[1.0] tracking-[-0.035em] text-[var(--ink)]">
              {WHY_TIHLO.headline}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[15.5px] leading-[1.62] text-[var(--muted)]">
              {WHY_TIHLO.lede}
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-[var(--faint)] bg-[var(--faint)] md:grid-cols-2 lg:mt-20">
          {WHY_TIHLO.pillars.map((pillar, i) => (
            <FadeUp key={pillar.title} delay={i * 0.05}>
              <article className="flex h-full flex-col bg-[var(--white)] p-7 lg:p-9">
                <div className="mb-6 flex items-center gap-3">
                  <span className="font-mono text-[16px] font-medium tabular-nums leading-none text-[var(--ink)]">
                    0{i + 1}
                  </span>
                  <span className="block h-px flex-1 bg-[var(--faint)]" />
                </div>
                <h3 className="font-display text-[20px] font-medium leading-[1.18] tracking-[-0.015em] text-[var(--ink)] lg:text-[22px]">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-[58ch] text-[14.5px] leading-[1.62] text-[var(--muted)]">
                  {pillar.body}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
