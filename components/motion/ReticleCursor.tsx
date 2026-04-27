'use client';

import { useEffect, useRef, useState } from 'react';

export default function ReticleCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add('cursor-none');

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    const label = labelRef.current!;
    if (!ring || !dot || !label) return;

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let dx = rx;
    let dy = ry;
    let raf = 0;

    function move(e: PointerEvent) {
      dx = e.clientX;
      dy = e.clientY;
      label.textContent = `X${Math.round(dx).toString().padStart(4, '0')} · Y${Math.round(dy).toString().padStart(4, '0')}`;
    }

    function loop() {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      label.style.transform = `translate3d(${rx + 22}px, ${ry + 22}px, 0)`;
      raf = requestAnimationFrame(loop);
    }

    function over(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest('a, button, input, textarea, select, [data-cursor="hover"]');
      setHovering(!!interactive);
    }

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('mouseover', over);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mouseover', over);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cursor-none');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center"
        style={{
          width: hovering ? 56 : 28,
          height: hovering ? 56 : 28,
          border: `1px solid ${hovering ? 'var(--red)' : 'var(--ink)'}`,
          mixBlendMode: 'difference',
          transition: 'width 0.22s cubic-bezier(0.4,0,0.2,1), height 0.22s cubic-bezier(0.4,0,0.2,1), border-color 0.18s',
          willChange: 'transform',
        }}
      >
        {/* Crosshair ticks */}
        <span className="absolute left-0 top-1/2 h-px w-1.5 bg-current opacity-70" />
        <span className="absolute right-0 top-1/2 h-px w-1.5 bg-current opacity-70" />
        <span className="absolute left-1/2 top-0 h-1.5 w-px bg-current opacity-70" />
        <span className="absolute left-1/2 bottom-0 h-1.5 w-px bg-current opacity-70" />
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full"
        style={{
          width: 4,
          height: 4,
          background: hovering ? 'var(--red)' : 'var(--ink)',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      <div
        ref={labelRef}
        className="mono-id pointer-events-none fixed left-0 top-0 z-[100] tracking-[0.16em]"
        style={{
          color: 'var(--paper)',
          mixBlendMode: 'difference',
          fontSize: 9,
          willChange: 'transform',
          opacity: hovering ? 0 : 0.55,
          transition: 'opacity 0.18s',
        }}
      />
    </>
  );
}
