'use client';

import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Lede from '@/components/ui/Lede';
import MaskHeading from '@/components/motion/MaskHeading';
import HeroTerrain from '@/components/3d/HeroTerrain';
import ScrambleText from '@/components/motion/ScrambleText';
import MeshGradient from '@/components/motion/MeshGradient';
import TopoContours from '@/components/graphics/TopoContours';
import MagneticButton from '@/components/motion/MagneticButton';
import { HERO } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--white)]">
      <MeshGradient />
      {/* 3D terrain background */}
      <HeroTerrain />
      <TopoContours opacity={0.6} />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col items-center pb-20 pt-24 text-center lg:pb-28 lg:pt-32">
          <Eyebrow animate={false}>
            <ScrambleText value={HERO.eyebrow} duration={800} />
          </Eyebrow>

          <h1 className="mt-7 font-display text-[clamp(56px,8.2vw,120px)] font-medium leading-[0.9] tracking-[-0.05em] text-[var(--ink)]">
            <MaskHeading delay={0.1} immediate>
              The <span className="hero-eye-word">eye</span> that
            </MaskHeading>
            <MaskHeading delay={0.25} immediate>
              <span>
                never misses<span className="text-[var(--red)]">.</span>
              </span>
            </MaskHeading>
          </h1>

          <Lede
            segments={HERO.ledeSegments}
            size="lg"
            className="mt-7 max-w-[54ch]"
          />

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <MagneticButton>
              <Button
                variant="primary"
                size="lg"
                href="/contact"
              >
                Request a briefing
              </Button>
            </MagneticButton>
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
          <p className="mono-id mt-10 text-[var(--dim)]">
            <ScrambleText value={HERO.meta} duration={1200} />
          </p>
        </div>
      </div>
    </section>
  );
}
