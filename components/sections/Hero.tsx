'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import MaskReveal from '@/components/motion/MaskReveal';
import MagneticButton from '@/components/motion/MagneticButton';
import ScrambleText from '@/components/motion/ScrambleText';
import LineIllustration from '@/components/drawings/LineIllustration';
import { HERO } from '@/lib/constants';
import { ease, durations } from '@/lib/motion';

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  // Lightweight rAF parallax for the still composition
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const img = imgRef.current;
    if (!img) return;

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!img) return;
        img.style.transform = `translate3d(0, ${window.scrollY * 0.2}px, 0)`;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden pt-28 lg:pt-32">
      {/* Background — abstract eye composition */}
      <div className="absolute inset-0 -z-10">
        <div ref={imgRef} className="absolute -inset-[6%] will-change-transform">
          <Image
            src={HERO.image.src}
            alt={HERO.image.alt}
            fill
            priority
            quality={90}
            className="object-cover object-right"
            sizes="100vw"
          />
        </div>

        {/* Left-fade dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />

        {/* Iris-instrument line ornament — establishes the line-visual system */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-6%] top-1/2 hidden aspect-square w-[58vmin] -translate-y-1/2 text-white/22 lg:block"
        >
          <LineIllustration variant="iris-instrument" className="h-full w-full" annotated />
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-site px-6 pb-16 lg:px-12 lg:pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: durations.short, ease: ease.soft }}
            className="mono-label mb-6 flex items-center gap-3 text-white/65"
          >
            <span className="block h-px w-6 bg-[var(--red)]" />
            {HERO.eyebrow}
          </motion.div>

          <div className="mb-8 overflow-hidden">
            <MaskReveal delay={0.1}>
              <h1 className="font-display text-[clamp(48px,7.5vw,108px)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--paper)]">
                {HERO.headline[0]}
              </h1>
            </MaskReveal>
            <MaskReveal delay={0.22}>
              <h1 className="font-display text-[clamp(48px,7.5vw,108px)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--paper)]">
                never misses<em className="not-italic text-[var(--red)]">.</em>
              </h1>
            </MaskReveal>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.long, ease: ease.cinematic, delay: 0.5 }}
            className="mb-9 max-w-[620px] text-[18px] leading-[1.6] text-white/80"
          >
            {HERO.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.long, ease: ease.cinematic, delay: 0.65 }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton>
              <Button variant="white" href="/contact">
                {HERO.cta_primary}
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.18}>
              <Button
                variant="ghost"
                href="/sectors"
                className="border-white/30 text-white hover:border-white"
              >
                {HERO.cta_secondary}
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom meta — neutral instrumentation, no sector specifics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: durations.long, ease: ease.cinematic, delay: 1.0 }}
          className="mt-14 flex items-end justify-between border-t border-white/15 pt-6"
        >
          <ScrambleText
            as="div"
            className="mono-id text-white/45"
            value={HERO.meta}
            duration={900}
          />
          <div className="flex flex-col items-center gap-2 text-white/45">
            <span className="mono-id">SCROLL</span>
            <span className="block h-8 w-px animate-scroll-cue bg-white/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
