'use client';

import { useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789·';

interface Props {
  value: string;
  duration?: number;
  trigger?: 'inView' | 'always';
  className?: string;
  as?: 'span' | 'p' | 'div';
}

function rand() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export default function ScrambleText({
  value,
  duration = 600,
  trigger = 'inView',
  className = '',
  as: Tag = 'span',
}: Props) {
  const ref = useRef<HTMLSpanElement | HTMLParagraphElement | HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  const lastValue = useRef(value);
  const started = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    function run() {
      const target = value;
      const start = performance.now();
      let raf = 0;

      function tick(now: number) {
        const t = Math.min((now - start) / duration, 1);
        const revealed = Math.floor(t * target.length);
        let out = '';
        for (let i = 0; i < target.length; i++) {
          if (i < revealed) {
            out += target[i];
          } else if (target[i] === ' ' || target[i] === ' ') {
            out += target[i];
          } else {
            out += rand();
          }
        }
        setDisplay(out);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setDisplay(target);
      }

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }

    if (trigger === 'always' || lastValue.current !== value) {
      lastValue.current = value;
      const cleanup = run();
      return cleanup;
    }

    if (started.current) return;

    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value, duration, trigger]);

  // @ts-expect-error — polymorphic ref
  return <Tag ref={ref} className={className}>{display}</Tag>;
}
