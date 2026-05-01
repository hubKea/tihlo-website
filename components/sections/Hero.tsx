'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import RegMarks from '@/components/ui/RegMarks';
import MaskHeading from '@/components/motion/MaskHeading';
import { HERO } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative isolate bg-[var(--white)]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[55%_45%] lg:gap-16">
          <div className="order-2 flex flex-col justify-center pb-12 pt-6 lg:order-1 lg:py-28">
            <Eyebrow animate={false}>{HERO.eyebrow}</Eyebrow>

            <h1 className="mt-7 font-display text-[clamp(42px,5.4vw,76px)] font-medium leading-[0.96] tracking-[-0.035em] text-[var(--ink)]">
              <MaskHeading delay={0.1} immediate>
                The eye that
              </MaskHeading>
              <MaskHeading delay={0.25} immediate>
                <span>
                  never misses<span className="text-[var(--red)]">.</span>
                </span>
              </MaskHeading>
            </h1>

            <p className="mt-7 max-w-[50ch] text-[16px] leading-[1.65] text-[var(--muted)]">
              {HERO.lede}
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                className="justify-center sm:justify-start"
              >
                Request a briefing
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="#what-we-monitor"
                arrow={false}
                className="justify-center sm:justify-start"
              >
                What we monitor
              </Button>
            </div>
          </div>

          <div className="relative order-1 pt-10 lg:order-2 lg:flex lg:items-center lg:justify-end lg:py-20">
            <div className="relative mx-auto aspect-[16/10] w-full max-w-[720px] overflow-hidden border border-[var(--faint)] bg-[var(--white-2)] lg:aspect-[3/4] lg:max-w-[520px]">
              <RegMarks color="var(--dim)" size={14} />

              <Image
                src={HERO.image.src}
                alt={HERO.image.alt}
                fill
                priority
                quality={90}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
