import type { Metadata } from 'next';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import { SECTORS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sectors',
  description: 'TIHLO operates across coal, chrome, manganese, iron ore, copper and agri-bulk sectors across South Africa.',
};

const SECTOR_DETAILS = [
  {
    label: 'Coal',
    province: 'Mpumalanga',
    challenge: "High-value loads and long transport corridors create persistent diversion risk. Moisture variance at weighbridges creates disputes between mines and hauliers. TIHLO's weighbridge integration closes both gaps.",
    monitoring: ['Side-tipper verification at gate', 'Route integrity enforcement', 'Moisture-adjusted load reconciliation', 'Haulier performance ranking'],
  },
  {
    label: 'Chrome',
    province: 'Limpopo',
    challenge: 'Chrome operations typically involve multiple hauliers on shared corridors with minimal independent verification. Load substitution and short-loading are persistent risks that tracking alone cannot prevent.',
    monitoring: ['3-point load verification', 'Cross-haulier corridor monitoring', 'Load weight reconciliation', 'Sanction protocol enforcement'],
  },
  {
    label: 'Manganese',
    province: 'Northern Cape',
    challenge: 'Long-haul Northern Cape corridors involve extended periods where vehicles are beyond easy intervention range. Signal drop-off zones require baseline learning to distinguish equipment failure from deliberate blackout.',
    monitoring: ['Signal health monitoring with baseline comparison', 'Long-haul route integrity', 'Geofenced stop authorisation', 'End-to-end load reconciliation'],
  },
  {
    label: 'Iron Ore',
    province: 'Northern Cape',
    challenge: 'High-volume yellow plant operations create significant diesel security exposure. ADT and excavator idling in remote pit environments is difficult to validate without AI-assisted baseline monitoring.',
    monitoring: ['AI-assisted idle analysis per machine class', 'Diesel consumption anomaly detection', 'Contractor utilisation verification', 'Yellow plant performance ranking'],
  },
  {
    label: 'Copper',
    province: 'Multi-provincial',
    challenge: 'Cross-provincial copper logistics involves complex multi-haulier chains where verification gaps compound across handover points. Each handover is a potential diversion event without formal verification.',
    monitoring: ['Multi-handover chain verification', 'Cross-provincial route monitoring', 'Haulier documentation compliance', 'Full audit trail across chain'],
  },
  {
    label: 'Agri-bulk',
    province: 'Seasonal',
    challenge: "Seasonal peak logistics creates pressure to onboard new hauliers rapidly — often at the expense of verification rigour. TIHLO's onboarding process maintains standards regardless of volume pressure.",
    monitoring: ['Seasonal haulier onboarding protocol', 'Fleet list verification under pressure', 'Route allocation for variable routes', 'Seasonal performance benchmarking'],
  },
];

export default function SectorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--paper)] px-6 pb-16 pt-36 lg:px-12 lg:pt-48">
        <div className="mx-auto max-w-site">
          <FadeUp>
            <Eyebrow className="mb-6">§ Sectors</Eyebrow>
            <h1 className="mb-6 font-display text-[clamp(52px,8vw,108px)] font-medium leading-[0.92] tracking-[-0.05em] text-[var(--ink)]">
              Where we<br />
              <em className="not-italic text-[var(--red)]">operate.</em>
            </h1>
            <p className="max-w-xl text-[18px] leading-[1.65] text-[var(--muted)]">
              Six commodity sectors across three primary provinces. Same methodology.
              Same evidence standard. Same accountability.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Sector grid */}
      <section className="bg-[var(--paper)] px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-site">
          <div className="space-y-0 border border-[var(--rule)]">
            {SECTOR_DETAILS.map((sector, i) => (
              <FadeUp key={sector.label} delay={i * 0.05}>
                <div className={`grid grid-cols-1 gap-0 lg:grid-cols-[280px_1fr] ${i < SECTOR_DETAILS.length - 1 ? 'border-b border-[var(--rule)]' : ''}`}>
                  {/* Index column */}
                  <div className="border-b border-[var(--rule)] px-8 py-8 lg:border-b-0 lg:border-r">
                    <p className="mono-id mb-2 text-[var(--red)]">§ {String(i + 1).padStart(2, '0')}</p>
                    <h2 className="font-display text-3xl font-medium tracking-[-0.025em] text-[var(--ink)]">{sector.label}</h2>
                    <p className="mono-id mt-2 text-[var(--dim)]">{sector.province}</p>
                  </div>

                  {/* Detail column */}
                  <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                    <div className="border-b border-[var(--rule)] px-8 py-8 lg:border-b-0 lg:border-r">
                      <p className="mono-label mb-4 text-[var(--muted)]">Challenge</p>
                      <p className="text-sm leading-relaxed text-[var(--muted)]">{sector.challenge}</p>
                    </div>
                    <div className="px-8 py-8">
                      <p className="mono-label mb-4 text-[var(--muted)]">Monitoring scope</p>
                      <ul className="space-y-2">
                        {sector.monitoring.map((m) => (
                          <li key={m} className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
                            <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[var(--red)]" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--ink)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--paper)]">
              Your sector.<br />
              <em className="not-italic text-[var(--red)]">Our methodology.</em>
            </h2>
            <div>
              <p className="mb-7 text-[17px] leading-[1.65] text-white/65">
                Every engagement begins with a scoped briefing. We assess your specific sector
                context, identify the highest-risk control gaps, and confirm whether TIHLO is
                the right fit.
              </p>
              <Button variant="white" href="/contact">
                Request a briefing
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
