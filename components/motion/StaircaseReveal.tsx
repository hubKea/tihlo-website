'use client';

import { useRef, useEffect, useState, ReactNode, Children } from 'react';

interface StaircaseRevealProps {
  children: ReactNode;
  /** Horizontal offset per step in px */
  stepOffsetX?: number;
  /** Vertical offset per step in px */
  stepOffsetY?: number;
  className?: string;
}

export default function StaircaseReveal({
  children,
  stepOffsetX = 80,
  stepOffsetY = 0,
  className = '',
}: StaircaseRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = Children.toArray(children);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {items.map((child, i) => (
        <div
          key={i}
          className="transition-all duration-700 ease-out"
          style={{
            marginLeft: i * stepOffsetX,
            marginTop: i === 0 ? 0 : stepOffsetY,
            opacity: visible ? 1 : 0,
            transform: visible
              ? 'translateY(0)'
              : 'translateY(32px)',
            transitionDelay: `${i * 120}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
