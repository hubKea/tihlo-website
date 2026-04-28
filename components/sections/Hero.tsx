'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import NumberRoll from '@/components/ui/NumberRoll';
import MaskReveal from '@/components/motion/MaskReveal';
import MagneticButton from '@/components/motion/MagneticButton';
import ScrambleText from '@/components/motion/ScrambleText';
import { HERO, STATS } from '@/lib/constants';
import { ease, durations } from '@/lib/motion';

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  // Lightweight rAF parallax for the background image
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const img = imgRef.current;
    if (!img) return;

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!img) return;
        img.style.transform = `translate3d(0, ${window.scrollY * 0.22}px, 0)`;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden pt-28 lg:pt-32">
      {/* Background image — abstract eye composition */}
      <div className="absolute inset-0 -z-10">
        <div
          ref={imgRef}
          className="absolute -inset-[6%] will-change-transform"
        >
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        {/* Subtle bottom anchor */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-site px-6 pb-16 lg:px-12 lg:pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          {/* Left — copy */}
          <div className="will-change-transform">
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
                <h1 className="font-display text-[clamp(56px,9vw,128px)] font-medium leading-[0.9] tracking-[-0.05em] text-[var(--paper)]">
                  {HERO.headline[0]}
                </h1>
              </MaskReveal>
              <MaskReveal delay={0.22}>
                <h1 className="font-display text-[clamp(56px,9vw,128px)] font-medium leading-[0.9] tracking-[-0.05em] text-[var(--paper)]">
                  never misses<em className="not-italic text-[var(--red)]">.</em>
                </h1>
              </MaskReveal>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durations.long, ease: ease.cinematic, delay: 0.5 }}
              className="mb-8 max-w-[520px] text-[17px] leading-[1.65] text-white/75"
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

          {/* Right — stats strip (preserves brief's right-rail credibility cluster) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: durations.long, ease: ease.cinematic, delay: 0.8 }}
            className="hidden lg:block"
          >
            <div className="border border-white/15 bg-black/25 backdrop-blur-md">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className={`px-8 py-7 ${i < STATS.length - 1 ? 'border-b border-white/12' : ''}`}
                >
                  <div className="tabular-nums font-display text-[clamp(36px,4vw,52px)] font-medium leading-none tracking-[-0.04em] text-[var(--paper)]">
                    {'prefix' in stat && stat.prefix && (
                      <span className="text-[0.55em] text-white/65">{stat.prefix}</span>
                    )}
                    <NumberRoll value={stat.value} suffix={'suffix' in stat ? stat.suffix : ''} />
                  </div>
                  <p className="mono-id mt-2.5 text-white/55">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: durations.long, ease: ease.cinematic, delay: 1.0 }}
          className="mt-10 flex items-end justify-between border-t border-white/15 pt-6"
        >
          <ScrambleText
            as="div"
            className="mono-id text-white/45"
            value={`REC § ${new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()} · OBS FRAME 001 · SECTOR COAL-MPU`}
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
