import type { Metadata } from 'next';
import { Fuel, Truck, HardHat } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import MaskHeading from '@/components/motion/MaskHeading';
import LineSystem from '@/components/motion/LineSystem';
import MagneticButton from '@/components/motion/MagneticButton';
import FuelGaugeGraphic from '@/components/graphics/FuelGaugeGraphic';
import RouteGraphic from '@/components/graphics/RouteGraphic';
import PlantGraphic from '@/components/graphics/PlantGraphic';
import { SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services',
  description:
    "TIHLO's three operational lines: fuel and diesel security, transport monitoring, and yellow plant oversight.",
};

const SERVICE_ICONS = [
  <Fuel key="fuel" size={22} strokeWidth={1.5} />,
  <Truck key="truck" size={22} strokeWidth={1.5} />,
  <HardHat key="plant" size={22} strokeWidth={1.5} />,
];

const SERVICE_GRAPHICS = [FuelGaugeGraphic, RouteGraphic, PlantGraphic];

const SERVICE_STATS = [
  {
    value: '18',
    suffix: '%',
    label: 'diesel reclaimed · first 90 days',
  },
  {
    value: '38',
    suffix: 's',
    label: 'median controller response',
  },
  {
    value: '24',
    suffix: '/7',
    label: 'named controller on shift',
  },
] as const;

const isDark = (i: number) => i === 1;

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--white)] px-6 pb-20 pt-32 lg:px-12 lg:pb-28 lg:pt-40">
        <LineSystem tone="light" density="quiet" anchor="right" />
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-end lg:gap-20">
            <div>
              <Eyebrow>Services</Eyebrow>
              <h1 className="mt-8 font-display text-[clamp(48px,7vw,92px)] font-medium leading-[0.94] tracking-[-0.045em] text-[var(--ink)]">
                <MaskHeading immediate>Three lines.</MaskHeading>
                <MaskHeading delay={0.12} immediate>
                  One record.
                </MaskHeading>
              </h1>
              <p className="mt-8 max-w-xl text-[17px] leading-[1.65] text-[var(--muted)]">
                TIHLO operates across three operational disciplines — each
                producing evidence-grade output, each reviewed by a named
                controller.
              </p>
            </div>

            {/* Right-side service index */}
            <div className="border-t border-[var(--faint)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="mono-label mb-5 text-[var(--dim)]">Service lines</p>
              <ul className="divide-y divide-[var(--faint)]">
                {SERVICES.map((service, i) => (
                  <li key={service.index}>
                    <a
                      href={`#service-${i + 1}`}
                      className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-[var(--ink)]"
                    >
                      <span className="flex items-center gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--faint)] text-[var(--ink)] transition-all duration-300 group-hover:border-[var(--ink)] group-hover:rotate-[3deg]">
                          {SERVICE_ICONS[i]}
                        </span>
                        <span className="flex flex-col">
                          <span className="font-display text-[15px] font-medium text-[var(--ink)]">
                            {service.name}
                          </span>
                          <span className="mono-id mt-1 text-[var(--dim)]">
                            {service.index}
                          </span>
                        </span>
                      </span>
                      <span className="mono-id text-[var(--dim)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--ink)]">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      <div
        className="h-[3px] w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--ink) 20%, var(--red) 50%, var(--ink) 80%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Service blocks — alternating white / white-2, editorial */}
      {SERVICES.map((service, i) => {
        const Graphic = SERVICE_GRAPHICS[i];
        const stat = SERVICE_STATS[i];
        return (
          <section
            key={service.index}
            id={`service-${i + 1}`}
            className={`relative isolate scroll-mt-24 overflow-hidden border-t px-6 py-20 lg:px-12 lg:py-28 ${
              isDark(i)
                ? 'border-white/10 bg-[var(--ink)]'
                : 'border-[var(--faint)] bg-[var(--white)]'
            }`}
          >
            <LineSystem
              tone={isDark(i) ? 'dark' : 'light'}
              density="quiet"
              anchor={i % 2 === 0 ? 'right' : 'left'}
            />
            <div className="relative z-10 mx-auto max-w-site">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-20">
                {/* Left — heading + body */}
                <FadeUp>
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-[clamp(48px,5vw,68px)] font-medium tabular-nums leading-none tracking-[-0.04em] ${
                        isDark(i) ? 'text-white/20' : 'text-[var(--ink)]'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex h-11 w-11 items-center justify-center border ${
                        isDark(i)
                          ? 'border-white/15 text-white'
                          : 'border-[var(--faint)] text-[var(--ink)]'
                      }`}
                    >
                      {SERVICE_ICONS[i]}
                    </span>
                  </div>
                  <p
                    className={`mono-id mt-6 ${
                      isDark(i) ? 'text-white/40' : 'text-[var(--dim)]'
                    }`}
                  >
                    {service.index}
                  </p>
                  <h2
                    className={`mt-3 font-display text-[clamp(36px,4.6vw,58px)] font-medium leading-[0.98] tracking-[-0.035em] ${
                      isDark(i) ? 'text-white' : 'text-[var(--ink)]'
                    }`}
                  >
                    <MaskHeading>{service.headline}</MaskHeading>
                  </h2>
                  <p
                    className={`mt-4 mono-label ${
                      isDark(i) ? 'text-white/50' : 'text-[var(--muted)]'
                    }`}
                  >
                    {service.name}
                  </p>
                  <p
                    className={`mt-7 max-w-[52ch] text-[16px] leading-[1.7] ${
                      isDark(i) ? 'text-white/65' : 'text-[var(--muted)]'
                    }`}
                  >
                    {service.body}
                  </p>
                  <div className="mt-8">
                    <span
                      className="font-display text-[clamp(56px,6vw,80px)] font-medium leading-none tracking-[-0.04em]"
                      style={{ color: isDark(i) ? 'white' : 'var(--ink)' }}
                    >
                      {stat.value}
                      <span className="text-[0.5em] text-[var(--red)]">
                        {stat.suffix}
                      </span>
                    </span>
                    <p
                      className="mono-id mt-2"
                      style={{
                        color: isDark(i)
                          ? 'rgba(255,255,255,0.4)'
                          : 'var(--dim)',
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </FadeUp>

                {/* Right — line illustration + features */}
                <FadeUp delay={0.1}>
                  <div className="flex flex-col gap-8">
                    {/* Drawn line illustration */}
                    <div
                      className={`relative aspect-[16/11] w-full border ${
                        isDark(i)
                          ? 'border-white/10 bg-[var(--ink-2)] [--dim:rgba(255,255,255,0.35)] [--ink:rgba(255,255,255,0.78)] [--white:var(--ink-2)]'
                          : 'border-[var(--faint)] bg-[var(--white)]'
                      }`}
                    >
                      <Graphic />
                    </div>

                    {/* Features list */}
                    <div
                      className={`border ${
                        isDark(i)
                          ? 'border-white/10 bg-[var(--ink-2)]'
                          : 'border-[var(--faint)] bg-[var(--white)]'
                      }`}
                    >
                      <p
                        className={`mono-label border-b px-6 py-4 ${
                          isDark(i)
                            ? 'border-white/10 text-white/40'
                            : 'border-[var(--faint)] text-[var(--dim)]'
                        }`}
                      >
                        What this includes
                      </p>
                      <ul>
                        {service.features.map((f, j) => (
                          <li
                            key={j}
                            className={`group/feat relative flex items-start gap-5 overflow-hidden px-6 py-5 transition-colors ${
                              isDark(i)
                                ? 'hover:bg-white/[0.04] hover:text-white'
                                : 'hover:bg-[var(--white-2)]'
                            } ${
                              j < service.features.length - 1
                                ? isDark(i)
                                  ? 'border-b border-white/10'
                                  : 'border-b border-[var(--faint)]'
                                : ''
                            }`}
                          >
                            {/* Sliding accent on hover */}
                            <span
                              className={`absolute inset-y-0 left-0 block w-px origin-top scale-y-0 transition-transform duration-400 group-hover/feat:scale-y-100 ${
                                isDark(i) ? 'bg-white' : 'bg-[var(--ink)]'
                              }`}
                            />
                            <span
                              className={`mono-id mt-1 shrink-0 transition-colors ${
                                isDark(i)
                                  ? 'text-white/40 group-hover/feat:text-white'
                                  : 'text-[var(--dim)] group-hover/feat:text-[var(--ink)]'
                              }`}
                            >
                              {String(j + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={`text-[14.5px] leading-[1.6] transition-colors ${
                                isDark(i)
                                  ? 'text-white/60 group-hover/feat:text-white'
                                  : 'text-[var(--muted)] group-hover/feat:text-[var(--ink)]'
                              }`}
                            >
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA — single dark moment as closing accent */}
      <section className="relative isolate overflow-hidden border-t border-[var(--faint)] bg-[var(--ink)] px-6 py-24 lg:px-12 lg:py-32">
        {/* Subtle dot grid on dark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 0.5px, transparent 0.5px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
            <div>
              <p className="mono-id mb-7 flex items-center gap-3 text-white/50">
                <span className="block h-px w-8 bg-white/40" />
                Engagement
              </p>
              <h2 className="font-display text-[clamp(40px,5.2vw,72px)] font-medium leading-[0.96] tracking-[-0.04em] text-white">
                <MaskHeading>One monitoring layer.</MaskHeading>
                <MaskHeading delay={0.12}>
                  <span className="text-white/55">Full coverage.</span>
                </MaskHeading>
              </h2>
            </div>
            <div>
              <p className="mb-8 text-[17px] leading-[1.7] text-white/70">
                TIHLO integrates with your existing fleet management and
                telematics systems. No hardware replacement. No system
                migration. We add the verification layer above what you already
                have.
              </p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <Button variant="white" href="/contact">
                    Request a briefing
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button
                    variant="ghost"
                    href="/how-we-operate"
                    className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/[0.04] hover:text-white"
                  >
                    How we operate
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
