'use client';

import { useEffect, useRef } from 'react';
import AmbientCursor from '@/components/motion/AmbientCursor';

const WORDS =
  'A TIHLO controller does not watch a dashboard. They build a signed operational record from every signal, stop, route deviation, refuel event, weighbridge gap, and contractor response.';

const STACK = [
  {
    code: 'THI003',
    title: 'Route exception opened',
    body: 'A side-tipper stopped outside the authorised corridor. Controller notes, GPS trace, and call outcome were attached to the record.',
  },
  {
    code: 'THI017',
    title: 'Fuel variance escalated',
    body: 'Consumption drift crossed the learned baseline. The event was compared with shift context before escalation.',
  },
  {
    code: 'THI028',
    title: 'Handshake reconciled',
    body: 'Dispatch, weighbridge, and offload records aligned. The load closed with a signed evidence trail.',
  },
];

export default function ControlRoomStack() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduced) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const root = rootRef.current;
      if (!root) return;

      const words = gsap.utils.toArray<HTMLElement>('[data-reveal-word]', root);
      const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]', root);
      const triggers: Array<{ kill: () => void } | undefined> = [];

      gsap.set(words, { opacity: 0.16 });
      const wordTween = gsap.to(words, {
        opacity: 1,
        stagger: 0.045,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top 70%',
          end: 'center 35%',
          scrub: 0.7,
        },
      });
      triggers.push(wordTween.scrollTrigger);

      cards.forEach((card, index) => {
        const cardTween = gsap.fromTo(
          card,
          {
            y: 96 + index * 28,
            scale: 0.9,
            opacity: 0.35,
          },
          {
            y: index * -18,
            scale: 1 - index * 0.035,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 38%',
              scrub: 0.75,
            },
          }
        );
        triggers.push(cardTween.scrollTrigger);
      });

      cleanup = () => triggers.forEach((trigger) => trigger?.kill());
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-[var(--ink)] px-6 py-32 text-[var(--white)] md:py-44 lg:px-12"
    >
      <AmbientCursor />
      <div className="relative z-10 mx-auto grid max-w-site grid-cols-1 gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <p className="mono-label mb-7 flex items-center gap-3 text-white/65">
            <span className="block h-px w-10 bg-white/30" />
            Control room record
          </p>
          <h2 className="max-w-5xl font-display text-[clamp(42px,6vw,86px)] font-semibold leading-[0.92] tracking-[-0.05em]">
            {WORDS.split(' ').map((word, index) => (
              <span
                key={`${word}-${index}`}
                data-reveal-word
                className="inline-block pr-[0.22em]"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        <div className="relative min-h-[560px]">
          {STACK.map((item, index) => (
            <article
              key={item.code}
              data-stack-card
              className="border-white/10 group sticky top-28 mb-8 overflow-hidden border bg-[var(--ink-2)] p-7"
              style={{ marginLeft: `${index * 28}px` }}
            >
              <div className="mb-16 flex items-center justify-between gap-6">
                <p className="mono-id text-white/60">{item.code}</p>
              </div>
              <h3 className="font-display text-[clamp(28px,3vw,44px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--white)]">
                {item.title}
              </h3>
              <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-white/72">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
