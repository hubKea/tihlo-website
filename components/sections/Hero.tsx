'use client';

import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import MaskHeading from '@/components/motion/MaskHeading';
import HeroTerrain from '@/components/3d/HeroTerrain';
import ScrambleText from '@/components/motion/ScrambleText';
import MeshGradient from '@/components/motion/MeshGradient';
import TopoContours from '@/components/graphics/TopoContours';
import { HERO } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--white)]">
      <MeshGradient />
      {/* 3D terrain background */}
      <HeroTerrain />
      <TopoContours opacity={0.6} />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col items-center pb-24 pt-32 text-center lg:pb-36 lg:pt-44">
          <Eyebrow animate={false}>
            <ScrambleText value={HERO.eyebrow} duration={800} />
          </Eyebrow>

          <h1 className="mt-7 font-display text-[clamp(48px,7vw,96px)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--ink)]">
            <MaskHeading delay={0.1} immediate>
              The <span className="hero-eye-word">eye</span> that
            </MaskHeading>
            <MaskHeading delay={0.25} immediate>
              <span>
                never misses<span className="text-[var(--red)]">.</span>
              </span>
            </MaskHeading>
          </h1>

          <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.65] text-[var(--muted)]">
            {HERO.lede}
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
            >
              Request a briefing
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="#what-we-monitor"
              arrow={false}
            >
              What we monitor
            </Button>
          </div>

          {/* Meta line */}
          <p className="mono-id mt-14 text-[var(--dim)]">
            <ScrambleText value={HERO.meta} duration={1200} />
          </p>
        </div>
      </div>
    </section>
  );
}
