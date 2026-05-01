import type { Metadata } from 'next';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import MaskHeading from '@/components/motion/MaskHeading';
import { SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services',
  description:
    "TIHLO's three operational lines: fuel and diesel security, transport monitoring, and yellow plant oversight.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--white)] px-6 pb-20 pt-24 lg:px-12 lg:py-32">
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp>
            <Eyebrow>Services</Eyebrow>
            <h1 className="mt-8 font-display text-[clamp(48px,7vw,92px)] font-medium leading-[0.94] tracking-[-0.045em] text-[var(--ink)]">
              <MaskHeading immediate>Three lines.</MaskHeading>
              <MaskHeading delay={0.12} immediate>
                One record.
              </MaskHeading>
            </h1>
            <p className="mt-8 max-w-xl text-[17px] leading-[1.65] text-[var(--muted)]">
              TIHLO operates across three operational disciplines - each
              producing evidence-grade output, each reviewed by a named
              controller.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Services */}
      {SERVICES.map((service, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={service.index}
            className={`relative isolate overflow-hidden border-t border-[var(--faint)] px-6 py-20 lg:px-12 lg:py-28 ${
              isEven ? 'bg-[var(--white)]' : 'bg-[var(--white-2)]'
            }`}
          >
            <div className="relative z-10 mx-auto max-w-site">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                <FadeUp>
                  <Eyebrow className="mb-5">{service.index}</Eyebrow>
                  <h2 className="mb-3 font-display text-[clamp(36px,4.6vw,62px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
                    {service.headline}
                  </h2>
                  <p className="mono-label mt-3 text-[var(--ink)]">
                    {service.name}
                  </p>
                </FadeUp>

                <FadeUp delay={0.12}>
                  <p className="mb-8 text-[17px] leading-[1.65] text-[var(--muted)]">
                    {service.body}
                  </p>
                  <ul className="bg-[var(--white)]/40 space-y-0 border border-[var(--faint)]">
                    {service.features.map((f, j) => (
                      <li
                        key={j}
                        className={`flex items-start gap-4 border-l-2 border-transparent px-6 py-4 transition-colors hover:border-[var(--dim)] hover:bg-[var(--white-3)] ${
                          j < service.features.length - 1
                            ? 'border-b border-[var(--faint)]'
                            : ''
                        }`}
                      >
                        <span className="mono-id mt-0.5 shrink-0 text-[var(--ink)]">
                          {String(j + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm leading-relaxed text-[var(--muted)]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </FadeUp>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-[var(--ink)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--white)]">
              One monitoring layer.
              <br />
              <em className="text-white/70 not-italic">Full coverage.</em>
            </h2>
            <div>
              <p className="text-white/65 mb-7 text-[17px] leading-[1.65]">
                TIHLO integrates with your existing fleet management and
                telematics systems. No hardware replacement. No system
                migration. We add the verification layer above what you already
                have.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="white" href="/contact">
                  Request a briefing
                </Button>
                <Button
                  variant="ghost"
                  href="/how-we-operate"
                  className="border-white/20 text-white hover:border-white"
                >
                  How we operate
                </Button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
