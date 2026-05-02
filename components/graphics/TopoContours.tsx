'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface TopoContoursProps {
  className?: string;
  opacity?: number;
  parallaxSpeed?: number;
}

const contours = [
  {
    d: 'M -80 82 Q 220 54 520 88 T 1120 78 T 1880 106',
    opacity: 0.035,
    dashed: false,
    label: { x: 255, y: 61, value: '1240' },
  },
  {
    d: 'M -100 132 Q 280 118 610 142 T 1280 124 T 1900 151',
    opacity: 0.028,
    dashed: true,
  },
  {
    d: 'M -60 191 Q 360 166 760 194 T 1450 181 T 1860 205',
    opacity: 0.045,
    dashed: false,
  },
  {
    d: 'M -120 236 Q 230 226 560 246 T 1140 235 T 1900 262',
    opacity: 0.032,
    dashed: true,
    label: { x: 760, y: 226, value: '1210' },
  },
  {
    d: 'M -90 304 Q 310 284 690 311 T 1320 297 T 1890 322',
    opacity: 0.05,
    dashed: false,
  },
  {
    d: 'M -70 348 Q 160 338 390 352 T 860 346 T 1370 359 T 1880 351',
    opacity: 0.026,
    dashed: true,
  },
  {
    d: 'M -100 416 Q 330 396 710 424 T 1260 407 T 1880 438',
    opacity: 0.04,
    dashed: false,
    label: { x: 1160, y: 398, value: '1180' },
  },
  {
    d: 'M -80 492 Q 250 468 590 497 T 1190 482 T 1880 512',
    opacity: 0.03,
    dashed: true,
  },
  {
    d: 'M -110 542 Q 180 526 480 548 T 1060 538 T 1510 555 T 1900 541',
    opacity: 0.047,
    dashed: false,
  },
  {
    d: 'M -90 615 Q 350 590 780 619 T 1420 603 T 1880 632',
    opacity: 0.034,
    dashed: true,
    label: { x: 1485, y: 596, value: '1150' },
  },
  {
    d: 'M -60 690 Q 220 676 500 697 T 1030 688 T 1880 716',
    opacity: 0.025,
    dashed: false,
  },
] as const;

export default function TopoContours({
  className = '',
  opacity = 1,
  parallaxSpeed = 0,
}: TopoContoursProps) {
  const ref = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || parallaxSpeed <= 0 || reducedMotion) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      if (ref.current) {
        const sectionTop = ref.current.getBoundingClientRect().top + window.scrollY;
        const y = (window.scrollY - sectionTop) * parallaxSpeed;
        ref.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [parallaxSpeed, reducedMotion]);

  return (
    <svg
      ref={ref}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${
        parallaxSpeed > 0 && !reducedMotion ? 'will-change-transform' : ''
      } ${className}`}
      viewBox="0 0 1800 760"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <g>
        {contours.map((line, index) => (
          <path
            key={index}
            d={line.d}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1"
            strokeDasharray={line.dashed ? '4,6' : undefined}
            opacity={line.opacity}
          />
        ))}
        {contours.map((line, index) =>
          'label' in line ? (
            <text
              key={`label-${index}`}
              x={line.label.x}
              y={line.label.y}
              fill="var(--ink)"
              fontFamily="var(--font-mono)"
              fontSize="7"
              letterSpacing="0.16em"
              opacity="0.04"
            >
              {line.label.value}
            </text>
          ) : null
        )}
      </g>
    </svg>
  );
}
