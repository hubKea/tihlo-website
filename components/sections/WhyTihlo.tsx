import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import { WHY_TIHLO } from '@/lib/constants';

export default function WhyTihlo() {
  return (
    <section className="bg-[var(--paper)] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-site">
        <FadeUp className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow className="mb-5">{WHY_TIHLO.eyebrow}</Eyebrow>
            <h2 className="font-display text-[clamp(40px,5.6vw,72px)] font-medium leading-[0.96] tracking-[-0.04em] text-[var(--ink)]">
              {WHY_TIHLO.headline}
            </h2>
          </div>
          <p className="text-[17px] leading-[1.65] text-[var(--muted)]">{WHY_TIHLO.lede}</p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-px border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
          {WHY_TIHLO.pillars.map((pillar, i) => (
            <FadeUp key={pillar.title} delay={i * 0.06}>
              <div className="flex h-full gap-6 bg-[var(--paper)] px-8 py-10">
                <span className="font-mono text-[clamp(36px,3.6vw,48px)] font-medium leading-none tracking-[-0.02em] text-[var(--red)] tabular-nums">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="mb-4 font-display text-[24px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--ink)]">
                    {pillar.title}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-[var(--muted)]">{pillar.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
