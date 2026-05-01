import Eyebrow from '@/components/ui/Eyebrow';
import FadeUp from '@/components/motion/FadeUp';
import NumberRoll from '@/components/ui/NumberRoll';
import { BY_THE_NUMBERS, STATS } from '@/lib/constants';

export default function ByTheNumbers() {
  return (
    <section className="border-t border-[var(--faint)] bg-[var(--white)] py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <FadeUp>
          <Eyebrow>{BY_THE_NUMBERS.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(30px,3.2vw,44px)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink)]">
            {BY_THE_NUMBERS.headline}
          </h2>
          <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.66] text-[var(--muted)]">
            {BY_THE_NUMBERS.lede}
          </p>
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-[var(--faint)] bg-[var(--faint)] md:grid-cols-3 lg:mt-12">
          {STATS.map((stat, i) => {
            const prefix =
              'prefix' in stat
                ? (stat.prefix as string | undefined)
                : undefined;
            const suffix =
              'suffix' in stat
                ? (stat.suffix as string | undefined)
                : undefined;
            const isLiveStat = i === 2; // single allowed red accent: dot beside last stat's label

            return (
              <FadeUp key={i} delay={i * 0.06}>
                <article className="flex h-full min-h-[220px] flex-col bg-[var(--white)] p-6 lg:p-7">
                  <div className="flex items-baseline gap-1 font-display text-[clamp(34px,4vw,52px)] font-medium tabular-nums leading-none tracking-[-0.025em] text-[var(--ink)]">
                    {prefix && (
                      <span className="text-[0.24em] font-medium uppercase tracking-[0.14em] text-[var(--dim)]">
                        {prefix.trim()}
                      </span>
                    )}
                    <NumberRoll value={stat.value} suffix={suffix ?? ''} />
                  </div>
                  <p className="mt-5 flex items-center gap-2 text-[14px] font-medium leading-[1.4] text-[var(--ink)]">
                    {isLiveStat && (
                      <span className="pulse-dot block h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
                    )}
                    {stat.label}
                  </p>
                  <p className="mt-auto pt-6 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--dim)]">
                    {stat.caveat}
                  </p>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
