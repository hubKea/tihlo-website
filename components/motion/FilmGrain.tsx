'use client';

import { useEffect, useRef } from 'react';

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const SIZE = 220;
    canvas.width = SIZE;
    canvas.height = SIZE;

    let raf = 0;
    let last = 0;
    const fps = 24;
    const frameMs = 1000 / fps;

    function draw(now: number) {
      if (now - last >= frameMs) {
        last = now;
        const img = ctx!.createImageData(SIZE, SIZE);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          d[i] = v;
          d[i + 1] = v;
          d[i + 2] = v;
          d[i + 3] = 255;
        }
        ctx!.putImageData(img, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    }

    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] h-full w-full"
      style={{
        opacity: 0.045,
        mixBlendMode: 'multiply',
        imageRendering: 'pixelated',
        objectFit: 'cover',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
