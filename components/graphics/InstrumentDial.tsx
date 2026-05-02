'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

interface InstrumentDialProps {
  value: number;
  min?: number;
  max?: number;
  label: string;
  suffix?: string;
  prefix?: string;
  animateOnView?: boolean;
  className?: string;
}

const CENTER = 100;
const ARC_RADIUS = 70;
const START_ANGLE = 135;
const SWEEP_ANGLE = 270;
const ARC_LENGTH = ARC_RADIUS * (SWEEP_ANGLE * Math.PI / 180);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function pointOnCircle(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: CENTER + Math.cos(radians) * radius,
    y: CENTER + Math.sin(radians) * radius,
  };
}

function arcPath(radius: number) {
  const start = pointOnCircle(START_ANGLE, radius);
  const end = pointOnCircle(START_ANGLE + SWEEP_ANGLE, radius);

  return [
    `M ${start.x.toFixed(3)} ${start.y.toFixed(3)}`,
    `A ${radius} ${radius} 0 1 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)}`,
  ].join(' ');
}

export default function InstrumentDial({
  value,
  min = 0,
  max = 100,
  label,
  suffix = '',
  prefix = '',
  animateOnView = true,
  className = '',
}: InstrumentDialProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(() =>
    animateOnView && !reducedMotion ? 0 : clamp((value - min) / (max - min), 0, 1)
  );
  const [displayValue, setDisplayValue] = useState(() =>
    animateOnView && !reducedMotion ? 0 : value
  );

  const targetProgress = useMemo(() => {
    if (max === min) return 0;
    return clamp((value - min) / (max - min), 0, 1);
  }, [max, min, value]);

  const arc = useMemo(() => arcPath(ARC_RADIUS), []);
  const currentAngle = START_ANGLE + SWEEP_ANGLE * progress;
  const needle = pointOnCircle(currentAngle, 54);

  useEffect(() => {
    if (!animateOnView || reducedMotion) {
      setProgress(targetProgress);
      setDisplayValue(value);
      return;
    }

    if (!inView) return;

    const controls = animate(0, targetProgress, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setProgress(latest);
        setDisplayValue(
          targetProgress === 0 ? value : value * (latest / targetProgress)
        );
      },
    });

    return () => controls.stop();
  }, [animateOnView, inView, reducedMotion, targetProgress, value]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      className={`h-auto w-full ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="var(--faint)"
        strokeWidth="1.5"
      />
      <path
        d={arc}
        stroke="var(--white-3)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d={arc}
        stroke="var(--ink)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={ARC_LENGTH}
        strokeDashoffset={ARC_LENGTH * (1 - progress)}
      />

      {Array.from({ length: 12 }).map((_, index) => {
        const angle = START_ANGLE + (SWEEP_ANGLE / 11) * index;
        const outer = pointOnCircle(angle, 84);
        const inner = pointOnCircle(angle, 78);

        return (
          <line
            key={angle}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="var(--dim)"
            strokeWidth="1"
          />
        );
      })}

      <line
        x1="100"
        y1="100"
        x2={needle.x}
        y2={needle.y}
        stroke="var(--red)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="4" fill="var(--ink)" />

      {prefix && (
        <text
          x="100"
          y="76"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.18em"
          fill="var(--dim)"
        >
          {prefix.trim().toUpperCase()}
        </text>
      )}
      <text
        x="100"
        y={prefix ? 106 : 100}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-mono)"
        fontSize="28"
        fill="var(--ink)"
      >
        {Math.round(displayValue)}
        {suffix}
      </text>
      <text
        x="100"
        y="132"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.18em"
        fill="var(--dim)"
      >
        {label.toUpperCase()}
      </text>
    </svg>
  );
}
