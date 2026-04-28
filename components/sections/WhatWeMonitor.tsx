import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import LineIllustration from '@/components/drawings/LineIllustration';
import { WHAT_WE_MONITOR } from '@/lib/constants';

const VARIANTS = [
  'fuel-energy',
  'asset-utilisation',
  'movement-routing',
  'contractor-evidence',
] as const;

export default function WhatWeMonitor() {
  return (
    <section className="bg-[var(--paper)] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-site">
        <FadeUp className="mb-16 grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow className="mb-5">{WHAT_WE_MONITOR.eyebrow}</Eyebrow>
            <h2 className="font-display text-[clamp(36px,5vw,68px)] font-medium leading-[0.96] tracking-[-0.04em] text-[var(--ink)]">
              {WHAT_WE_MONITOR.headline}
            </h2>
          </div>
          <p className="col-span-12 self-end text-[16px] leading-[1.65] text-[var(--muted)] lg:col-span-4 lg:col-start-9">
            {WHAT_WE_MONITOR.lede}
          </p>
        </FadeUp>

        <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
          {WHAT_WE_MONITOR.categories.map((cat, i) => (
            <FadeUp key={cat.label} delay={i * 0.07}>
              <li className="group grid grid-cols-12 items-center gap-x-6 py-10 transition-colors hover:bg-[var(--paper-2)] lg:py-14">
                <span className="col-span-2 mono-id text-[var(--dim)] lg:col-span-1">
                  § 0{i + 1}
                </span>

                <div className="col-span-10 lg:col-span-4">
                  <h3 className="font-display text-[28px] font-medium leading-[1.05] tracking-[-0.025em] text-[var(--ink)] lg:text-[36px]">
                    {cat.label}
                  </h3>
                  <p className="mono-id mt-3 text-[var(--muted)]">{cat.contexts}</p>
                </div>

                <p className="col-span-12 mt-4 text-[15px] leading-[1.65] text-[var(--muted)] lg:col-span-4 lg:col-start-6 lg:mt-0">
                  {cat.body}
                </p>

                <div className="col-span-12 mt-6 h-28 text-[var(--ink)]/70 transition-colors duration-300 group-hover:text-[var(--red)] lg:col-span-3 lg:col-start-10 lg:mt-0">
                  <LineIllustration variant={VARIANTS[i]} className="h-full w-full" annotated={false} />
                </div>
              </li>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  );
}
