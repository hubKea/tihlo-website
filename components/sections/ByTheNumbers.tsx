import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import NumberRoll from '@/components/ui/NumberRoll';
import { BY_THE_NUMBERS, STATS } from '@/lib/constants';

export default function ByTheNumbers() {
  const [marquee, ...supporting] = STATS;
  const marqueePrefix = 'prefix' in marquee ? (marquee.prefix as string | undefined) : undefined;
  const marqueeSuffix = 'suffix' in marquee ? (marquee.suffix as string | undefined) : undefined;

  return (
    <section className="bg-[var(--paper-2)] px-6 py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-site">
        <FadeUp className="mb-16 grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow className="mb-5">{BY_THE_NUMBERS.eyebrow}</Eyebrow>
            <h2 className="font-display text-[clamp(36px,5vw,68px)] font-medium leading-[0.96] tracking-[-0.04em] text-[var(--ink)]">
              {BY_THE_NUMBERS.headline}
            </h2>
          </div>
          <p className="col-span-12 self-end text-[16px] leading-[1.65] text-[var(--dim)] lg:col-span-4 lg:col-start-9">
            {BY_THE_NUMBERS.lede}
          </p>
        </FadeUp>

        {/* Marquee number — single largest red moment on the home */}
        <FadeUp className="mb-20 grid grid-cols-12 gap-x-8 border-y border-[var(--rule)] py-14 lg:py-20">
          <div className="col-span-12 lg:col-span-8">
            <div className="tabular-nums font-display text-[clamp(120px,18vw,256px)] font-medium leading-[0.85] tracking-[-0.055em] text-[var(--red)]">
              {marqueePrefix && (
                <span className="mr-3 align-top text-[0.32em] tracking-normal text-[var(--ink)]/85">
                  {marqueePrefix.trim()}
                </span>
              )}
              <NumberRoll value={marquee.value} suffix={marqueeSuffix ?? ''} duration={1.6} />
            </div>
          </div>
          <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <p className="font-display text-[20px] leading-[1.35] tracking-[-0.015em] text-[var(--ink)]">
              {marquee.label}
            </p>
            <p className="mono-id mt-4 border-t border-[var(--rule)] pt-3 text-[var(--dim)]">
              {marquee.caveat}
            </p>
          </div>
        </FadeUp>

        {/* Supporting stats */}
        <div className="grid grid-cols-1 gap-px border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
          {supporting.map((stat, i) => {
            const prefix = 'prefix' in stat ? (stat.prefix as string | undefined) : undefined;
            const suffix = 'suffix' in stat ? (stat.suffix as string | undefined) : undefined;
            return (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="flex h-full flex-col justify-between gap-10 bg-[var(--paper-2)] px-8 py-12">
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-[clamp(28px,2.8vw,36px)] font-medium leading-none text-[var(--red)] tabular-nums">
                      0{i + 2}
                    </span>
                    <div className="tabular-nums font-display text-[clamp(56px,7vw,96px)] font-medium leading-none tracking-[-0.04em] text-[var(--ink)]">
                      {prefix && (
                        <span className="text-[0.4em] text-[var(--muted)]">{prefix}</span>
                      )}
                      <NumberRoll value={stat.value} suffix={suffix ?? ''} />
                    </div>
                  </div>
                  <div>
                    <p className="text-[16px] leading-[1.4] text-[var(--ink)]">{stat.label}</p>
                    <p className="mono-id mt-4 border-t border-[var(--rule)] pt-3 text-[var(--dim)]">
                      {stat.caveat}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
