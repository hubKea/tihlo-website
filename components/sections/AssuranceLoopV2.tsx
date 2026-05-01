'use client';

import { useEffect, useRef, useState } from 'react';

const STAGES = ['Onboard', 'Verify', 'Move', 'Detect', 'Resolve', 'Prove'] as const;

interface Props {
  stagesSelector?: string;
  className?: string;
}

export default function AssuranceLoopV2({
  stagesSelector = '[data-stage]',
  className = '',
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const arcsRef = useRef<(SVGPathElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const cx = 150;
  const cy = 150;
  const r = 100;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const stages = Array.from(document.querySelectorAll<HTMLElement>(stagesSelector));
      if (!stages.length) return;

      // Set up dash arrays for each arc
      arcsRef.current.forEach((arc) => {
        if (!arc) return;
        const len = arc.getTotalLength();
        arc.style.strokeDasharray = `${len}`;
        arc.style.strokeDashoffset = `${len}`;
      });

      const triggers: ScrollTrigger[] = [];

      // Master scrub: progress 0..1 across the whole stage block
      const first = stages[0];
      const last = stages[stages.length - 1];
      const master = ScrollTrigger.create({
        trigger: first,
        start: 'top center',
        endTrigger: last,
        end: 'bottom center',
        scrub: reduced ? false : 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          arcsRef.current.forEach((arc, i) => {
            if (!arc) return;
            const len = arc.getTotalLength();
            const segP = Math.min(1, Math.max(0, p * STAGES.length - i));
            arc.style.strokeDashoffset = `${len * (1 - segP)}`;
          });
        },
      });
      triggers.push(master);

      // Active stage tracker
      stages.forEach((stage, i) => {
        const t = ScrollTrigger.create({
          trigger: stage,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
        triggers.push(t);
      });

      cleanup = () => {
        triggers.forEach((t) => t.kill());
      };
    })();

    return () => {
      cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, [stagesSelector]);

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 300 300"
        className="mx-auto w-full max-w-sm"
        aria-hidden
      >
        {/* Outer guide ring */}
        <circle cx={cx} cy={cy} r={r + 14} fill="none" stroke="var(--faint)" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle cx={cx} cy={cy} r={r - 14} fill="none" stroke="var(--faint)" strokeWidth="0.5" strokeDasharray="2 4" />

        {/* Inactive arcs (background) */}
        {STAGES.map((_, i) => {
          const a1 = (i / STAGES.length) * 2 * Math.PI - Math.PI / 2;
          const a2 = ((i + 1) / STAGES.length) * 2 * Math.PI - Math.PI / 2;
          const x1 = cx + r * Math.cos(a1);
          const y1 = cy + r * Math.sin(a1);
          const x2 = cx + r * Math.cos(a2);
          const y2 = cy + r * Math.sin(a2);
          return (
            <path
              key={`bg-${i}`}
              d={`M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke="var(--faint)"
              strokeWidth="1"
            />
          );
        })}

        {/* Active arcs (drawn by scroll) */}
        {STAGES.map((_, i) => {
          const a1 = (i / STAGES.length) * 2 * Math.PI - Math.PI / 2;
          const a2 = ((i + 1) / STAGES.length) * 2 * Math.PI - Math.PI / 2;
          const x1 = cx + r * Math.cos(a1);
          const y1 = cy + r * Math.sin(a1);
          const x2 = cx + r * Math.cos(a2);
          const y2 = cy + r * Math.sin(a2);
          return (
            <path
              key={`fg-${i}`}
              ref={(el) => { arcsRef.current[i] = el; }}
              d={`M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={i === active ? 'var(--red)' : 'var(--ink)'}
              strokeWidth={i === active ? 2 : 1.5}
              strokeLinecap="square"
            />
          );
        })}

        {/* Stage dots & labels */}
        {STAGES.map((label, i) => {
          const a = (i / STAGES.length) * 2 * Math.PI - Math.PI / 2;
          const x = cx + r * Math.cos(a);
          const y = cy + r * Math.sin(a);
          const lx = cx + (r + 28) * Math.cos(a);
          const ly = cy + (r + 28) * Math.sin(a);
          const anchor = lx > cx + 5 ? 'start' : lx < cx - 5 ? 'end' : 'middle';
          const isActive = i === active;
          const isReached = i <= active;
          return (
            <g key={label}>
              <circle
                cx={x}
                cy={y}
                r={isActive ? 6 : 4}
                fill={isActive ? 'var(--red)' : isReached ? 'var(--ink)' : 'var(--dim)'}
                style={{ transition: 'r 0.4s cubic-bezier(0.16,1,0.3,1), fill 0.3s' }}
              />
              {isActive && (
                <circle
                  cx={x}
                  cy={y}
                  r="11"
                  fill="none"
                  stroke="var(--red)"
                  strokeWidth="1"
                  opacity="0.5"
                >
                  <animate attributeName="r" values="6;14;6" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite" />
                </circle>
              )}
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize="9"
                fontFamily="var(--font-mono)"
                fill={isActive ? 'var(--ink)' : 'var(--muted)'}
                letterSpacing="0.14em"
                style={{ transition: 'fill 0.3s' }}
              >
                {`0${i + 1} ${label.toUpperCase()}`}
              </text>
            </g>
          );
        })}

        {/* Centre marks */}
        <circle cx={cx} cy={cy} r="22" fill="none" stroke="var(--faint)" strokeWidth="0.5" />
        <circle cx={cx} cy={cy} r="3" fill="var(--red)" />
        <text
          x={cx}
          y={cy + 38}
          textAnchor="middle"
          fontSize="8"
          fontFamily="var(--font-mono)"
          fill="var(--muted)"
          letterSpacing="0.2em"
        >
          {`PROGRESS · ${Math.round(progress * 100)}%`}
        </text>
      </svg>
    </div>
  );
}
