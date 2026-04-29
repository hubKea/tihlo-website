'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TihloLogo from '@/components/ui/TihloLogo';
import { BRAND } from '@/lib/constants';

const OPERATIONS = [
  { label: 'How we operate', href: '/how-we-operate' },
  { label: 'Services', href: '/services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Field Notes', href: '/field-notes' },
];

const FIRM_LINKS = [
  { label: 'About TIHLO', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Request a briefing', href: '/contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'POPIA', href: '/legal/popia' },
];

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function useFooterTelemetry() {
  const [time, setTime] = useState('');
  const [loads, setLoads] = useState(3047);

  useEffect(() => {
    function tick() {
      const d = new Date();
      const sast = new Intl.DateTimeFormat('en-ZA', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Johannesburg',
        hour12: false,
      }).format(d);
      setTime(sast);
    }
    tick();
    const tid = setInterval(tick, 30_000);
    const lid = setInterval(() => {
      if (Math.random() > 0.35) setLoads((c) => c + 1);
    }, 2400);
    return () => {
      clearInterval(tid);
      clearInterval(lid);
    };
  }, []);

  return { time, loads };
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { time, loads } = useFooterTelemetry();

  return (
    <footer className="relative overflow-hidden bg-[var(--ink)] text-white/65">
      <div className="mx-auto max-w-site px-6 pb-0 pt-20 lg:px-12 lg:pt-28">
        {/* Slogan moment — the closing signature, finally at scale */}
        <div className="mb-20 border-b border-white/12 pb-16 lg:mb-24 lg:pb-20">
          <p className="mono-label mb-6 flex items-center gap-3 text-white/45">
            <span className="block h-px w-8 bg-[var(--red)]" />
            § Closing signature
          </p>
          <p className="font-display text-[clamp(48px,9vw,144px)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--paper)]">
            The eye that
            <br />
            never misses<span className="text-[var(--red)]">.</span>
          </p>
        </div>

        {/* Operating status panel + brand cluster */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + status */}
          <div>
            <div className="mb-6 flex items-center gap-2.5">
              <TihloLogo size={28} light />
              <span className="font-display text-[13px] font-semibold tracking-[0.22em] text-[var(--paper)]">
                TIHLO
              </span>
            </div>

            {/* Live operating panel — connects to the active-monitoring promise */}
            <div className="mb-6 border border-white/12 p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="block h-1.5 w-1.5 rounded-full bg-[var(--green)] pulse-dot-green" />
                <span className="mono-id text-white/60">SYSTEM ON</span>
              </div>
              <ul className="space-y-2 mono-id text-white/55">
                <li className="flex items-center justify-between gap-4">
                  <span>ALL CORRIDORS</span>
                  <span className="text-[var(--green)]">NOMINAL</span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span>PRETORIA</span>
                  <span className="tabular-nums text-white/70">{time || '—'} SAST</span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span>LOADS · 24H</span>
                  <span className="tabular-nums text-white/70">{loads.toLocaleString()}</span>
                </li>
              </ul>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              The active monitoring layer for South African operations — mining, plant, fleet, and
              weighbridge.
            </p>
            <div className="mono-id mt-6 space-y-1 text-white/40">
              <p>{BRAND.address}</p>
              <p>Tel: {BRAND.phone}</p>
              <p>{BRAND.email}</p>
            </div>
          </div>

          {/* Operations */}
          <div>
            <p className="mono-label mb-5 text-white/45">Operations</p>
            <ul className="space-y-3">
              {OPERATIONS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/65 transition-colors hover:text-[var(--red)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm */}
          <div>
            <p className="mono-label mb-5 text-white/45">Firm</p>
            <ul className="space-y-3">
              {FIRM_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/65 transition-colors hover:text-[var(--red)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="mono-label mb-5 text-white/45">Legal</p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/65 transition-colors hover:text-[var(--red)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center">
          <p className="mono-id text-white/35">© {year} TIHLO. Independent. South Africa.</p>
          <p className="mono-id text-white/35">All corridors monitored. All records signed.</p>
        </div>
      </div>

      {/* Final red horizontal accent — last visual on every page */}
      <div className="h-[2px] w-full bg-[var(--red)]" />
    </footer>
  );
}
