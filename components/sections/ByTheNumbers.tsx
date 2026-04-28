import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import NumberRoll from '@/components/ui/NumberRoll';
import { BY_THE_NUMBERS, STATS } from '@/lib/constants';

export default function ByTheNumbers() {
  return (
    <section className="bg-[var(--paper-2)] px-6 py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-site">
        <FadeUp className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow className="mb-5">{BY_THE_NUMBERS.eyebrow}</Eyebrow>
            <h2 className="font-display text-[clamp(34px,4.6vw,56px)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
              {BY_THE_NUMBERS.headline}
            </h2>
          </div>
          <p className="text-[15px] leading-[1.65] text-[var(--muted)]">{BY_THE_NUMBERS.lede}</p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-px border border-[var(--rule)] bg-[var(--rule)] lg:grid-cols-3">
          {STATS.map((stat, i) => {
            const hasPrefix = 'prefix' in stat && stat.prefix;
            const hasSuffix = 'suffix' in stat && stat.suffix;
            return (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="flex h-full flex-col justify-between bg-[var(--paper-2)] px-8 py-10">
                  <div>
                    <p className="mono-id mb-5 text-[var(--dim)]">§ 0{i + 1}</p>
                    <div className="tabular-nums font-display text-[clamp(48px,6vw,76px)] font-medium leading-none tracking-[-0.04em] text-[var(--ink)]">
                      {hasPrefix && (
                        <span className="text-[0.45em] text-[var(--muted)]">{stat.prefix}</span>
                      )}
                      <NumberRoll value={stat.value} suffix={hasSuffix ? stat.suffix : ''} />
                    </div>
                    <p className="mt-5 text-[16px] leading-[1.5] text-[var(--ink)]">{stat.label}</p>
                  </div>
                  <p className="mono-id mt-8 border-t border-[var(--rule)] pt-4 text-[var(--dim)]">
                    {stat.caveat}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
