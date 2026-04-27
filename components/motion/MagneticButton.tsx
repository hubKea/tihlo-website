'use client';

import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.28,
  radius = 90,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    function move(e: PointerEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mx = rect.left + rect.width / 2;
      const my = rect.top + rect.height / 2;
      const dx = e.clientX - mx;
      const dy = e.clientY - my;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const f = (1 - dist / radius) * strength;
        tx = dx * f;
        ty = dy * f;
      } else {
        tx = 0;
        ty = 0;
      }
    }

    function leave() {
      tx = 0;
      ty = 0;
    }

    function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (el) el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', leave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      style={{ transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {children}
    </span>
  );
}
