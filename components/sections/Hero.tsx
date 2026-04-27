'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import NumberRoll from '@/components/ui/NumberRoll';
import MaskReveal from '@/components/motion/MaskReveal';
import MagneticButton from '@/components/motion/MagneticButton';
import ScrambleText from '@/components/motion/ScrambleText';
import { HERO, STATS } from '@/lib/constants';
import { ease, durations } from '@/lib/motion';

const HeroTerrain = dynamic(() => import('@/components/3d/HeroTerrain'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  // Lightweight rAF parallax — no pin, no choreography lock-in
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const img = imgRef.current;
    if (!img) return;

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!img) return;
        img.style.transform = `translate3d(0, ${window.scrollY * 0.28}px, 0)`;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="relative flex min-h-screen flex-col justify-end overflow-hidden pt-28 lg:pt-32"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          ref={imgRef}
          className="absolute -inset-[8%] will-change-transform"
          style={{ marginTop: '-8%', marginBottom: '-8%' }}
        >
          <div
            className="absolute inset-0"
            style={{ animation: 'ken-burns 24s ease-in-out infinite alternate' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1509390836518-c3a0d09f3d0d?auto=format&fit=crop&w=2400&q=85"
              alt="Aerial view of mining haul truck on corridor"
              fill
              priority
              quality={85}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/70 to-[var(--ink)]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/60 via-transparent to-transparent" />

        {/* 3D wireframe terrain — institutional WebGL moment */}
        <HeroTerrain />
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
              className="mono-label mb-6 flex items-center gap-3 text-white/60"
            >
              <span className="block h-px w-6 bg-[var(--red)]" />
              {HERO.eyebrow}
            </motion.div>

            <div className="mb-8 overflow-hidden">
              <MaskReveal delay={0.1}>
                <h1 className="font-display text-[clamp(64px,11vw,152px)] font-medium leading-[0.88] tracking-[-0.055em] text-[var(--paper)]">
                  {HERO.headline[0]}
                </h1>
              </MaskReveal>
              <MaskReveal delay={0.22}>
                <h1 className="font-display text-[clamp(64px,11vw,152px)] font-medium leading-[0.88] tracking-[-0.055em] text-[var(--paper)]">
                  monitored<em className="not-italic text-[var(--red)]">.</em>
                </h1>
              </MaskReveal>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durations.long, ease: ease.cinematic, delay: 0.5 }}
              className="mb-8 max-w-[480px] text-[17px] leading-[1.65] text-white/70"
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
                  href="/how-we-operate"
                  className="border-white/30 text-white hover:border-white"
                >
                  {HERO.cta_secondary}
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: durations.long, ease: ease.cinematic, delay: 0.8 }}
            className="hidden lg:block"
          >
            <div className="border border-white/12 bg-white/5 backdrop-blur-sm">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className={`px-8 py-7 ${i < STATS.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <div className="tabular-nums font-display text-[clamp(36px,4vw,52px)] font-medium leading-none tracking-[-0.04em] text-[var(--paper)]">
                    {'prefix' in stat && stat.prefix && (
                      <span className="text-[0.55em] text-white/60">{stat.prefix}</span>
                    )}
                    <NumberRoll value={stat.value} suffix={'suffix' in stat ? stat.suffix : ''} />
                  </div>
                  <p className="mono-id mt-2.5 text-white/50">{stat.label}</p>
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
          className="mt-10 flex items-end justify-between border-t border-white/12 pt-6"
        >
          <ScrambleText
            as="div"
            className="mono-id text-white/40"
            value={`REC § ${new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()} · OBS FRAME 001 · SECTOR COAL-MPU`}
            duration={900}
          />
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="mono-id">SCROLL</span>
            <span className="block h-8 w-px animate-scroll-cue bg-white/30" />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes ken-burns {
          from { transform: scale(1.02) translateY(0); }
          to   { transform: scale(1.10) translateY(-2%); }
        }
      `}</style>
    </section>
  );
}
