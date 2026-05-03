import type { Metadata } from 'next';
import Image from 'next/image';
import { Fragment } from 'react';
import { Mountain, Truck, ShieldCheck } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import MaskHeading from '@/components/motion/MaskHeading';
import LineSystem from '@/components/motion/LineSystem';
import MagneticButton from '@/components/motion/MagneticButton';
import DarkGlowSection from '@/components/sections/DarkGlowSection';
import OrbitalEcosystem from '@/components/sections/OrbitalEcosystem';

export const metadata: Metadata = {
  title: 'Sectors',
  description:
    'TIHLO operates across coal, chrome, manganese, iron ore, copper and agri-bulk sectors across South Africa.',
};

const SATELLITES = [
  { id: 'coal', label: 'Coal', icon: <Mountain size={20} strokeWidth={1.5} />, orbit: 1 as const, angle: 30 },
  { id: 'chrome', label: 'Chrome', icon: <Mountain size={20} strokeWidth={1.5} />, orbit: 2 as const, angle: 150 },
  { id: 'manganese', label: 'Manganese', icon: <Mountain size={20} strokeWidth={1.5} />, orbit: 3 as const, angle: 270 },
  { id: 'iron-ore', label: 'Iron Ore', icon: <Mountain size={20} strokeWidth={1.5} />, orbit: 2 as const, angle: 330 },
  { id: 'copper', label: 'Copper', icon: <Mountain size={20} strokeWidth={1.5} />, orbit: 1 as const, angle: 210 },
  { id: 'agri-bulk', label: 'Agri-bulk', icon: <Truck size={20} strokeWidth={1.5} />, orbit: 3 as const, angle: 90 },
];

const SECTOR_DETAILS = [
  {
    label: 'Coal',
    province: 'Mpumalanga',
    image: '/images/side-tippers.jpg',
    challenge:
      "High-value loads and long transport corridors create persistent diversion risk. Moisture variance at weighbridges creates disputes between mines and hauliers. TIHLO's weighbridge integration closes both gaps.",
    monitoring: [
      'Side-tipper verification at gate',
      'Route integrity enforcement',
      'Moisture-adjusted load reconciliation',
      'Haulier performance ranking',
    ],
  },
  {
    label: 'Chrome',
    province: 'Limpopo',
    image: '/images/side-tippers.jpg',
    challenge:
      'Chrome operations typically involve multiple hauliers on shared corridors with minimal independent verification. Load substitution and short-loading are persistent risks that tracking alone cannot prevent.',
    monitoring: [
      '3-point load verification',
      'Cross-haulier corridor monitoring',
      'Load weight reconciliation',
      'Sanction protocol enforcement',
    ],
  },
  {
    label: 'Manganese',
    province: 'Northern Cape',
    image: '/images/side-tippers.jpg',
    challenge:
      'Long-haul Northern Cape corridors involve extended periods where vehicles are beyond easy intervention range. Signal drop-off zones require baseline learning to distinguish equipment failure from deliberate blackout.',
    monitoring: [
      'Signal health monitoring with baseline comparison',
      'Long-haul route integrity',
      'Geofenced stop authorisation',
      'End-to-end load reconciliation',
    ],
  },
  {
    label: 'Iron Ore',
    province: 'Northern Cape',
    image: '/images/yellow-plant-machinery.jpg',
    challenge:
      'High-volume yellow plant operations create significant diesel security exposure. ADT and excavator idling in remote pit environments is difficult to validate without AI-assisted baseline monitoring.',
    monitoring: [
      'AI-assisted idle analysis per machine class',
      'Diesel consumption anomaly detection',
      'Contractor utilisation verification',
      'Yellow plant performance ranking',
    ],
  },
  {
    label: 'Copper',
    province: 'Multi-provincial',
    image: '/images/hero-operations.jpg',
    challenge:
      'Cross-provincial copper logistics involves complex multi-haulier chains where verification gaps compound across handover points. Each handover is a potential diversion event without formal verification.',
    monitoring: [
      'Multi-handover chain verification',
      'Cross-provincial route monitoring',
      'Haulier documentation compliance',
      'Full audit trail across chain',
    ],
  },
  {
    label: 'Agri-bulk',
    province: 'Seasonal',
    image: '/images/weighbridge.jpg',
    challenge:
      "Seasonal peak logistics creates pressure to onboard new hauliers rapidly — often at the expense of verification rigour. TIHLO's onboarding process maintains standards regardless of volume pressure.",
    monitoring: [
      'Seasonal haulier onboarding protocol',
      'Fleet list verification under pressure',
      'Route allocation for variable routes',
      'Seasonal performance benchmarking',
    ],
  },
];

const isDark = (i: number) => i % 2 === 1;

export default function SectorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--white)] px-6 pb-20 pt-32 lg:px-12 lg:pb-28 lg:pt-40">
        <LineSystem tone="light" density="quiet" anchor="right" />
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-end lg:gap-20">
            <div>
              <Eyebrow>Sectors</Eyebrow>
              <h1 className="mt-8 font-display text-[clamp(48px,7vw,92px)] font-medium leading-[0.94] tracking-[-0.045em] text-[var(--ink)]">
                <MaskHeading immediate>Where we</MaskHeading>
                <MaskHeading delay={0.12} immediate>
                  operate.
                </MaskHeading>
              </h1>
              <p className="mt-8 max-w-xl text-[17px] leading-[1.65] text-[var(--muted)]">
                Six commodity sectors across three primary provinces. Same
                methodology, same evidence standard, same accountability —
                regardless of what you ship.
              </p>
            </div>

            {/* Right-side index — quiet sector list */}
            <div className="border-t border-[var(--faint)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="mono-label mb-5 text-[var(--dim)]">Sector index</p>
              <ul className="divide-y divide-[var(--faint)]">
                {SECTOR_DETAILS.map((s, i) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] tabular-nums text-[var(--dim)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-[15px] font-medium text-[var(--ink)]">
                        {s.label}
                      </span>
                    </span>
                    <span className="mono-id text-[var(--dim)]">{s.province}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Orbital Ecosystem — Dark mode */}
      <DarkGlowSection
        glowPosition="center"
        glowIntensity={0.07}
        className="border-t border-white/10 px-6 py-28 lg:px-12 lg:py-36"
      >
        <LineSystem tone="dark" density="quiet" />
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="mb-12 text-center">
            <Eyebrow className="mb-4 justify-center text-white/65">Monitoring coverage</Eyebrow>
            <h2 className="font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.08] tracking-[-0.025em] text-white">
              <MaskHeading>One methodology. Six sectors.</MaskHeading>
            </h2>
          </FadeUp>
          <OrbitalEcosystem
            coreLabel="TIHLO CORE"
            coreIcon={<ShieldCheck size={28} className="text-white/80" strokeWidth={1.5} />}
            variant="dark"
            satellites={SATELLITES}
          />
        </div>
      </DarkGlowSection>

      {/* Sector detail heading */}
      <section className="relative isolate overflow-hidden border-t border-[var(--faint)] bg-[var(--white)] px-6 py-16 lg:px-12 lg:py-20">
        <LineSystem tone="light" density="quiet" anchor="left" />
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp>
            <Eyebrow className="mb-5">Sector detail</Eyebrow>
            <h2 className="font-display text-[clamp(30px,3.2vw,44px)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink)]">
              <MaskHeading>What we monitor, per sector.</MaskHeading>
            </h2>
          </FadeUp>
        </div>
      </section>

      {SECTOR_DETAILS.map((sector, i) => {
        const dark = isDark(i);

        return (
          <Fragment key={sector.label}>
            <section
              className={`relative isolate overflow-hidden border-t px-6 lg:px-12 ${
                dark
                  ? 'border-white/10 bg-[var(--ink)]'
                  : 'border-[var(--faint)] bg-[var(--white)]'
              }`}
            >
              <LineSystem
                tone={dark ? 'dark' : 'light'}
                density="quiet"
                anchor={dark ? 'right' : 'left'}
              />
              <div className="relative z-10 mx-auto max-w-site">
                <FadeUp delay={i * 0.05}>
                  <div
                    className={`group relative grid grid-cols-1 gap-0 overflow-hidden border border-l-2 transition-all duration-300 lg:grid-cols-[280px_1fr] ${
                      dark
                        ? 'border-white/10 bg-[var(--ink)] hover:bg-[var(--ink-2)]'
                        : 'border-[var(--faint)] bg-[var(--white)] hover:bg-[var(--white-2)] hover:shadow-[0_8px_32px_var(--shadow-red)]'
                    }`}
                  >
                    <Image
                      src={sector.image}
                      alt=""
                      fill={true}
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 1200px"
                      className="absolute inset-0 z-0 scale-105 object-cover opacity-0 transition-[opacity,transform] duration-700 group-hover:scale-100 group-hover:opacity-[0.15]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: dark
                          ? 'linear-gradient(to bottom, transparent, rgba(14, 16, 20, 0.28))'
                          : 'linear-gradient(to bottom, transparent, rgba(14, 16, 20, 0.03))',
                      }}
                    />
                    {/* Index column */}
                    <div
                      className={`relative z-10 flex items-baseline gap-5 border-b px-8 py-8 lg:border-b-0 lg:border-r ${
                        dark ? 'border-white/10' : 'border-[var(--faint)]'
                      }`}
                    >
                      {/* Watermark on hover */}
                      <span
                        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[80px] font-bold tabular-nums leading-none tracking-[-0.04em] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04] lg:text-[100px] ${
                          dark ? 'text-white' : 'text-[var(--ink)]'
                        }`}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                    <span
                      className={`font-mono text-[clamp(40px,4vw,56px)] font-semibold tabular-nums leading-none tracking-[-0.02em] transition-colors duration-300 ${
                        dark ? 'text-white/20' : 'text-[var(--ink)]'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h2
                        className={`font-display text-2xl font-semibold tracking-[-0.025em] transition-colors duration-300 ${
                          dark ? 'text-white' : 'text-[var(--ink)]'
                        }`}
                      >
                        {sector.label}
                      </h2>
                      <p
                        className={`mono-id mt-2 transition-colors duration-300 ${
                          dark ? 'text-white/62' : 'text-[var(--dim)]'
                        }`}
                      >
                        {sector.province}
                      </p>
                    </div>
                  </div>

                  {/* Detail column */}
                  <div className="relative z-10 grid grid-cols-1 gap-0 xl:grid-cols-2">
                    <div
                      className={`border-b px-8 py-8 xl:border-b-0 xl:border-r ${
                        dark ? 'border-white/10' : 'border-[var(--faint)]'
                      }`}
                    >
                      <p
                        className={`mono-label mb-4 transition-colors duration-300 ${
                          dark ? 'text-white/68' : 'text-[var(--muted)]'
                        }`}
                      >
                        Challenge
                      </p>
                      <p
                        className={`text-sm leading-relaxed transition-colors duration-300 ${
                          dark ? 'text-white/72' : 'text-[var(--muted)]'
                        }`}
                      >
                        {sector.challenge}
                      </p>
                    </div>
                    <div className="px-8 py-8">
                      <p
                        className={`mono-label mb-4 transition-colors duration-300 ${
                          dark ? 'text-white/68' : 'text-[var(--muted)]'
                        }`}
                      >
                        Monitoring scope
                      </p>
                      <ul className="space-y-2">
                        {sector.monitoring.map((m) => (
                          <li
                            key={m}
                            className={`flex items-start gap-2.5 text-sm transition-colors duration-300 ${
                              dark
                                ? 'text-white/70 hover:text-white'
                                : 'text-[var(--muted)] hover:text-[var(--ink)]'
                            }`}
                          >
                            <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[var(--red)] transition-colors duration-300" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeUp>
              </div>
            </section>

            {i === 2 && (
              <section className="bg-[var(--red)] border-y border-white/15 px-6 py-16 lg:px-12 lg:py-20">
                <div className="mx-auto max-w-site">
                  <FadeUp>
                    <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                      <div>
                        <span className="font-display text-[48px] font-medium leading-none text-white">6</span>
                        <p className="mono-id mt-2 text-white/60">Commodities covered</p>
                      </div>
                      <div>
                        <span className="font-display text-[48px] font-medium leading-none text-white">4</span>
                        <p className="mono-id mt-2 text-white/60">Provinces active</p>
                      </div>
                      <div>
                        <span className="font-display text-[48px] font-medium leading-none text-white">24/7</span>
                        <p className="mono-id mt-2 text-white/60">Named controller</p>
                      </div>
                    </div>
                  </FadeUp>
                </div>
              </section>
            )}
          </Fragment>
        );
      })}

      {/* CTA — Light mode */}
      <section className="relative isolate overflow-hidden border-t border-[var(--faint)] bg-[var(--white-2)] px-6 py-20 lg:px-12 lg:py-28">
        <LineSystem tone="light" density="quiet" anchor="right" />
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <h2 className="font-display text-[clamp(40px,5vw,64px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
              <MaskHeading>Your sector.</MaskHeading>
              <MaskHeading delay={0.12}>
                <em className="not-italic text-[var(--dim)]">Our methodology.</em>
              </MaskHeading>
            </h2>
            <div>
              <p className="text-[var(--muted)] mb-7 text-[17px] leading-[1.65]">
                Every engagement begins with a scoped briefing. We assess your
                specific sector context, identify the highest-risk control gaps,
                and confirm whether TIHLO is the right fit.
              </p>
              <MagneticButton>
                <Button href="/contact">Request a briefing</Button>
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
