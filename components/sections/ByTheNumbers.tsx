import Eyebrow from '@/components/ui/Eyebrow';
import FadeUp from '@/components/motion/FadeUp';
import TopoContours from '@/components/graphics/TopoContours';
import InstrumentDial from '@/components/graphics/InstrumentDial';
import { BY_THE_NUMBERS } from '@/lib/constants';

const DIALS = [
  {
    value: 18,
    max: 30,
    label: 'Diesel reclaimed',
    suffix: '%',
    prefix: 'up to ',
  },
  {
    value: 38,
    max: 120,
    label: 'Controller response',
    suffix: 's',
  },
  {
    value: 3047,
    min: 0,
    max: 5000,
    label: 'Loads monitored · 24h',
  },
] as const;

export default function ByTheNumbers() {
  return (
    <section className="relative isolate overflow-hidden border-t border-[var(--faint)] bg-[var(--white)] py-16 lg:py-24">
      <TopoContours opacity={0.5} parallaxSpeed={0.15} />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <FadeUp>
          <Eyebrow>{BY_THE_NUMBERS.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(30px,3.2vw,44px)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink)]">
            {BY_THE_NUMBERS.headline}
          </h2>
          <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.66] text-[var(--muted)]">
            {BY_THE_NUMBERS.lede}
          </p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3 lg:mt-16">
          {DIALS.map((dial, i) => (
            <FadeUp key={dial.label} delay={i * 0.06}>
              <div className="mx-auto max-w-[220px]">
                <InstrumentDial {...dial} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
