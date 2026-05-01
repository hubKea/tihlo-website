'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import StackedGlowCard from '@/components/ui/StackedGlowCard';

interface Satellite {
  id: string;
  label: string;
  icon: ReactNode;
  orbit: 1 | 2 | 3;
  angle: number; // 0 to 360 degrees
}

interface OrbitalEcosystemProps {
  coreLabel: string;
  coreIcon: ReactNode;
  satellites: Satellite[];
  className?: string;
}

export default function OrbitalEcosystem({
  coreLabel,
  coreIcon,
  satellites,
  className = '',
}: OrbitalEcosystemProps) {
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

  // Define orbit sizes (percentages of container)
  const ORBIT_SIZES = {
    1: 40,
    2: 65,
    3: 88,
  };

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto flex aspect-square w-full max-w-[720px] items-center justify-center ${className}`}
    >
      {/* Subtle warm radial glow on light bg */}
      <div
        className="absolute inset-0 z-0 rounded-full transition-opacity duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          background:
            'radial-gradient(circle at center, rgba(180, 35, 24, 0.05) 0%, rgba(180, 35, 24, 0.02) 40%, transparent 70%)',
        }}
      />

      {/* Dot grid texture for depth */}
      <div
        className="absolute inset-0 z-0 rounded-full opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--ink) 0.5px, transparent 0.5px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Orbit Rings — crisp on white */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        {[1, 2, 3].map((orbit) => (
          <div
            key={orbit}
            className="absolute rounded-full transition-all duration-1000"
            style={{
              width: `${ORBIT_SIZES[orbit as 1 | 2 | 3]}%`,
              height: `${ORBIT_SIZES[orbit as 1 | 2 | 3]}%`,
              border: '1px solid var(--faint)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.85)',
              transitionDelay: `${orbit * 150}ms`,
            }}
          />
        ))}
        {/* Pulsing ring accent on the middle orbit */}
        <div
          className="absolute rounded-full"
          style={{
            width: `${ORBIT_SIZES[2]}%`,
            height: `${ORBIT_SIZES[2]}%`,
            border: '1px solid rgba(180, 35, 24, 0.08)',
            animation: 'pulseSignal 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Central Core Node */}
      <div
        className="relative z-20 flex flex-col items-center transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.8)',
        }}
      >
        <StackedGlowCard size={72} variant="light">
          {coreIcon}
        </StackedGlowCard>
        <p className="mt-4 font-display text-lg font-semibold tracking-[-0.02em] text-[var(--ink)]">
          {coreLabel}
        </p>
        <p className="mono-id mt-1 text-[var(--dim)]">METHODOLOGY · CORE</p>
      </div>

      {/* Satellite Nodes */}
      <div className="absolute inset-0 z-10">
        {satellites.map((sat, idx) => {
          const radiusPct = ORBIT_SIZES[sat.orbit] / 2;
          const rad = (sat.angle * Math.PI) / 180;
          const left = 50 + radiusPct * Math.cos(rad);
          const top = 50 + radiusPct * Math.sin(rad);

          return (
            <div
              key={sat.id}
              className="absolute flex flex-col items-center justify-center transition-all duration-700 ease-out hover:scale-110 hover:z-30"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: `translate(-50%, -50%) ${visible ? 'translateY(0)' : 'translateY(16px)'}`,
                opacity: visible ? 1 : 0,
                transitionDelay: `${300 + idx * 100}ms`,
                animation: visible
                  ? `floatSlow ${12 + idx * 2}s ease-in-out ${idx * 0.8}s infinite`
                  : 'none',
              }}
            >
              <StackedGlowCard size={48} variant="light">
                {sat.icon}
              </StackedGlowCard>
              <div className="absolute top-[calc(100%+6px)] w-max max-w-[110px] text-center">
                <span className="rounded border border-[var(--faint)] bg-[var(--white)] px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-[var(--muted)]">
                  {sat.label.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
