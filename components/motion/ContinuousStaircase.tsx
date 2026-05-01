'use client';

import { ReactNode, useEffect, useRef, useState, Children } from 'react';

interface ContinuousStaircaseProps {
  children: ReactNode;
  className?: string;
  /** Width of each horizontal step in px */
  stepWidth?: number;
  /** Height of each vertical step in px */
  stepHeight?: number;
}

export default function ContinuousStaircase({
  children,
  className = '',
  stepWidth = 220,
  stepHeight = 160,
}: ContinuousStaircaseProps) {
  const [isDesktop, setIsDesktop] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [drawProgress, setDrawProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver to trigger initial visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll-driven line draw effect
  useEffect(() => {
    if (!visible || !isDesktop) return;
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Start drawing when top of container is at 80% of viewport,
      // finish when bottom is at 20% of viewport
      const start = viewH * 0.8;
      const end = viewH * 0.2;
      const totalTravel = rect.height + (start - end);
      const traveled = start - rect.top;
      const p = Math.max(0, Math.min(1, traveled / totalTravel));
      setDrawProgress(p);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible, isDesktop]);

  const items = Children.toArray(children);
  const totalItems = items.length;

  // ── Mobile: vertical stack with single red accent at top ──
  if (!isDesktop) {
    return (
      <div ref={containerRef} className={`relative flex flex-col gap-10 pl-8 ${className}`}>
        {/* Vertical connecting line — quiet ink */}
        <div
          className="absolute left-[18px] top-6 bottom-6 w-px"
          style={{
            background:
              'linear-gradient(to bottom, var(--red), rgba(14,16,20,0.18) 18%, rgba(14,16,20,0.10))',
          }}
        />

        {items.map((child, i) => (
          <div
            key={i}
            className="relative transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transitionDelay: `${i * 120}ms`,
            }}
          >
            {/* Step dot — first is the red accent, rest are ink */}
            <div
              className={`absolute -left-8 top-3 h-3 w-3 rounded-full border-2 bg-[var(--white)] ${
                i === 0
                  ? 'border-[var(--red)]'
                  : 'border-[var(--ink)]'
              }`}
              style={
                i === 0
                  ? { boxShadow: '0 0 0 4px rgba(180,35,24,0.08)' }
                  : undefined
              }
            />
            {child}
          </div>
        ))}
      </div>
    );
  }

  // ── Desktop: SVG ascending staircase ──
  const padding = { left: 40, top: 60, right: 320, bottom: 60 };
  const contentWidth = (totalItems - 1) * stepWidth;
  const contentHeight = (totalItems - 1) * stepHeight;
  const svgW = contentWidth + padding.left + padding.right;
  const svgH = contentHeight + padding.top + padding.bottom;

  // Build the stair-step path (ascending from bottom-left to top-right)
  const cornerR = 16; // corner radius for smooth curves
  const points: { x: number; y: number }[] = [];

  for (let i = 0; i < totalItems; i++) {
    const x = padding.left + i * stepWidth;
    const y = padding.top + contentHeight - i * stepHeight;
    points.push({ x, y });
  }

  // Build SVG path: horizontal → vertical → horizontal → vertical...
  let linePath = '';
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    if (i === 0) {
      linePath += `M ${p.x} ${p.y}`;
    } else {
      const prev = points[i - 1];
      // Horizontal line to the right, then vertical line up
      const midX = p.x;
      const midY = prev.y;

      // Draw: right to corner → curve → up to corner → curve
      if (cornerR > 0 && Math.abs(midY - p.y) > cornerR * 2) {
        // Horizontal to just before the corner
        linePath += ` L ${midX - cornerR} ${midY}`;
        // Curve down-right to up
        linePath += ` Q ${midX} ${midY} ${midX} ${midY - cornerR}`;
        // Vertical up to just before next corner
        linePath += ` L ${midX} ${p.y + cornerR}`;
        // If not last, add curve for the next horizontal segment
        if (i < points.length - 1) {
          linePath += ` Q ${midX} ${p.y} ${midX + cornerR} ${p.y}`;
        } else {
          linePath += ` Q ${midX} ${p.y} ${midX + cornerR} ${p.y}`;
        }
      } else {
        linePath += ` L ${midX} ${midY} L ${midX} ${p.y}`;
      }
    }
  }
  // Extend the last step horizontally
  const lastP = points[points.length - 1];
  linePath += ` L ${lastP.x + 200} ${lastP.y}`;

  // Build fill path (area beneath the stair line)
  const fillPath = `${linePath} L ${lastP.x + 200} ${svgH} L ${padding.left} ${svgH} Z`;

  // Estimate total path length for dash animation
  const estPathLen = contentWidth + contentHeight + totalItems * cornerR * 2 + 200;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-x-auto ${className}`}
      style={{ minHeight: svgH }}
    >
      {/* Background SVG Staircase */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="stairFillLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(180, 35, 24, 0.06)" />
            <stop offset="60%" stopColor="rgba(180, 35, 24, 0.03)" />
            <stop offset="100%" stopColor="rgba(180, 35, 24, 0.0)" />
          </linearGradient>
          <linearGradient id="stairLineGlow" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(180, 35, 24, 0.3)" />
            <stop offset="40%" stopColor="var(--red)" />
            <stop offset="100%" stopColor="rgba(180, 35, 24, 0.3)" />
          </linearGradient>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Filled area beneath the steps */}
        <path
          d={fillPath}
          fill="url(#stairFillLight)"
          className="transition-opacity duration-1000"
          style={{ opacity: visible ? 1 : 0 }}
        />

        {/* Glowing top-edge line */}
        <path
          d={linePath}
          stroke="url(#stairLineGlow)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#lineGlow)"
          style={{
            strokeDasharray: estPathLen,
            strokeDashoffset: estPathLen * (1 - drawProgress),
            transition: 'stroke-dashoffset 0.15s ease-out',
          }}
        />

        {/* Faint step grid lines for depth */}
        {points.map((p, i) => (
          <g key={`grid-${i}`} opacity={visible ? 0.08 : 0} style={{ transition: 'opacity 0.8s' }}>
            {/* Horizontal dashed line at each step level */}
            <line
              x1={padding.left}
              y1={p.y}
              x2={svgW}
              y2={p.y}
              stroke="var(--ink)"
              strokeWidth="0.5"
              strokeDasharray="4 8"
            />
          </g>
        ))}
      </svg>

      {/* Foreground Nodes — positioned at each step corner */}
      {items.map((child, i) => {
        const p = points[i];
        const itemVisible = drawProgress > (i / totalItems) * 0.8;

        return (
          <div
            key={i}
            className="absolute transition-all duration-700 ease-out"
            style={{
              left: p.x + 16,
              top: p.y - 24,
              transform: `translateY(${itemVisible && visible ? '0' : '24px'})`,
              opacity: itemVisible && visible ? 1 : 0,
              transitionDelay: `${100 + i * 80}ms`,
              width: Math.min(stepWidth - 32, 280),
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
