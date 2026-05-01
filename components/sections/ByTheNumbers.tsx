import Eyebrow from '@/components/ui/Eyebrow';
import FadeUp from '@/components/motion/FadeUp';
import NumberRoll from '@/components/ui/NumberRoll';
import { BY_THE_NUMBERS, STATS } from '@/lib/constants';

export default function ByTheNumbers() {
  return (
    <section className="border-t border-[var(--faint)] bg-[var(--white)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <FadeUp>
          <Eyebrow>By the numbers</Eyebrow>
          <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(36px,4.5vw,60px)] font-medium leading-[1.0] tracking-[-0.035em] text-[var(--ink)]">
            {BY_THE_NUMBERS.headline}
          </h2>
          <p className="mt-6 max-w-[60ch] text-[16px] leading-[1.62] text-[var(--muted)]">
            {BY_THE_NUMBERS.lede}
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-[var(--faint)] bg-[var(--faint)] md:grid-cols-3 lg:mt-20">
          {STATS.map((stat, i) => {
            const prefix =
              'prefix' in stat ? (stat.prefix as string | undefined) : undefined;
            const suffix =
              'suffix' in stat ? (stat.suffix as string | undefined) : undefined;
            const isLiveStat = i === 2; // single allowed red accent: dot beside last stat's label

            return (
              <FadeUp key={i} delay={i * 0.06}>
                <article className="flex h-full flex-col bg-[var(--white)] p-7 lg:p-10">
                  <div className="flex items-baseline gap-1 font-display text-[clamp(56px,7vw,96px)] font-medium leading-[0.92] tracking-[-0.04em] tabular-nums text-[var(--ink)]">
                    {prefix && (
                      <span className="text-[0.22em] font-medium uppercase tracking-[0.16em] text-[var(--dim)]">
                        {prefix.trim()}
                      </span>
                    )}
                    <NumberRoll value={stat.value} suffix={suffix ?? ''} />
                  </div>
                  <p className="mt-6 flex items-center gap-2 text-[14.5px] font-medium leading-[1.4] text-[var(--ink)]">
                    {isLiveStat && (
                      <span className="block h-1.5 w-1.5 rounded-full bg-[var(--red)] pulse-dot" />
                    )}
                    {stat.label}
                  </p>
                  <p className="mt-auto pt-6 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--dim)]">
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
