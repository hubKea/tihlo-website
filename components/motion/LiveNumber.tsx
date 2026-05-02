'use client';

import { useEffect, useRef, useState } from 'react';

interface LiveNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  fluctuation?: number;
  className?: string;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatValue(value: number, fluctuating: boolean) {
  return fluctuating ? value.toFixed(1) : String(Math.round(value));
}

export default function LiveNumber({
  value,
  suffix = '',
  prefix = '',
  fluctuation = 0.3,
  className = '',
}: LiveNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const displayRef = useRef(value);
  const targetRef = useRef(value);
  const activeRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const settleRef = useRef<number | null>(null);
  const [display, setDisplay] = useState(value);
  const [fluctuating, setFluctuating] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (coarse || reduced) {
      setDisplay(value);
      setFluctuating(false);
      return;
    }

    const pickTarget = () => {
      const deviation = (Math.random() * 2 - 1) * fluctuation;
      targetRef.current = value + deviation;
    };

    const startFluctuation = () => {
      if (activeRef.current) return;
      activeRef.current = true;
      setFluctuating(true);

      if (settleRef.current) {
        window.cancelAnimationFrame(settleRef.current);
        settleRef.current = null;
      }

      pickTarget();
      intervalRef.current = window.setInterval(pickTarget, 400);
    };

    const stopFluctuation = () => {
      if (!activeRef.current) return;
      activeRef.current = false;
      setFluctuating(false);
      targetRef.current = value;

      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const from = displayRef.current;
      const start = performance.now();
      const duration = 300;

      if (settleRef.current) window.cancelAnimationFrame(settleRef.current);

      const settle = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const next = from + (value - from) * easeOutCubic(progress);
        displayRef.current = next;
        setDisplay(next);

        if (progress < 1) {
          settleRef.current = window.requestAnimationFrame(settle);
        } else {
          displayRef.current = value;
          setDisplay(value);
          settleRef.current = null;
        }
      };

      settleRef.current = window.requestAnimationFrame(settle);
    };

    const onMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - x, e.clientY - y);

      if (distance <= 200) startFluctuation();
      else stopFluctuation();
    };

    let frame = 0;
    const tick = () => {
      if (activeRef.current) {
        displayRef.current += (targetRef.current - displayRef.current) * 0.18;
        setDisplay(displayRef.current);
      }

      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.cancelAnimationFrame(frame);

      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (settleRef.current) window.cancelAnimationFrame(settleRef.current);
    };
  }, [fluctuation, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix && (
        <span className="text-[0.24em] font-medium uppercase tracking-[0.14em] text-[var(--dim)]">
          {prefix.trim()}
        </span>
      )}
      {formatValue(display, fluctuating)}
      {suffix}
    </span>
  );
}
