import Eyebrow from '@/components/ui/Eyebrow';
import FadeUp from '@/components/motion/FadeUp';
import { WHY_TIHLO } from '@/lib/constants';

export default function WhyTihlo() {
  return (
    <section
      id="why-tihlo"
      className="scroll-mt-20 border-t border-[var(--faint)] bg-[var(--white-2)] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-end lg:gap-14">
          <FadeUp>
            <Eyebrow>Why TIHLO</Eyebrow>
            <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(30px,3.2vw,44px)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink)]">
              {WHY_TIHLO.headline}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[15px] leading-[1.66] text-[var(--muted)]">
              {WHY_TIHLO.lede}
            </p>
          </FadeUp>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-[var(--faint)] bg-[var(--faint)] md:grid-cols-2 lg:mt-12">
          {WHY_TIHLO.pillars.map((pillar, i) => (
            <FadeUp key={pillar.title} delay={i * 0.05}>
              <article className="flex h-full flex-col bg-[var(--white)] p-6 lg:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className="font-mono text-[16px] font-medium tabular-nums leading-none text-[var(--ink)]">
                    0{i + 1}
                  </span>
                  <span className="block h-px flex-1 bg-[var(--faint)]" />
                </div>
                <h3 className="font-display text-[19px] font-medium leading-[1.2] tracking-[-0.01em] text-[var(--ink)] lg:text-[21px]">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-[58ch] text-[14px] leading-[1.64] text-[var(--muted)]">
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
