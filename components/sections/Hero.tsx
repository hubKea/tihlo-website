'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Stat from '@/components/ui/Stat';
import RegMarks from '@/components/ui/RegMarks';
import MaskHeading from '@/components/motion/MaskHeading';
import { HERO } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative isolate bg-[var(--white)]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[55%_45%] lg:gap-16">
          {/* Left column */}
          <div className="order-2 flex flex-col justify-center pb-10 pt-6 lg:order-1 lg:py-40">
            <Eyebrow animate={false}>Active monitoring · 24 / 7</Eyebrow>

            <h1 className="mt-8 font-display text-[clamp(48px,6.5vw,96px)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--ink)]">
              <MaskHeading delay={0.1} immediate>
                The eye that
              </MaskHeading>
              <MaskHeading delay={0.25} immediate>
                <span>
                  never misses<span className="text-[var(--red)]">.</span>
                </span>
              </MaskHeading>
            </h1>

            <p className="mt-8 max-w-[48ch] text-[17px] leading-[1.6] text-[var(--muted)]">
              {HERO.lede}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" href="/contact">
                Request a briefing
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="/how-we-operate"
                arrow={false}
              >
                How we operate
              </Button>
            </div>

            <div className="mt-14 flex flex-wrap gap-x-12 gap-y-8 border-t border-[var(--faint)] pt-8">
              <Stat label="Diesel reclaimed" value="up to 18%" />
              <Stat label="Controller response" value="38s" />
              <Stat label="Loads monitored · 24h" value="3,047" />
            </div>
          </div>

          {/* Right column — single contained photograph */}
          <div className="relative order-1 pt-24 lg:order-2 lg:flex lg:items-center lg:justify-end lg:py-24">
            <div className="relative mx-auto aspect-[16/10] w-full max-w-[720px] overflow-hidden lg:aspect-[3/4] lg:max-w-[520px]">
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

              {/* Bottom caption strip */}
              <div className="bg-[var(--ink)]/85 absolute bottom-0 left-0 right-0 px-5 py-3.5 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/72 font-mono text-[9.5px] font-medium uppercase tracking-[0.18em]">
                    Active corridor · Mpumalanga
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
                    <span className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--green)]">
                      On-record
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
