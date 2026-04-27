import type { Metadata } from 'next';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import { SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services',
  description: "TIHLO's three operational lines: fuel and diesel security, transport monitoring, and yellow plant oversight.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--paper)] px-6 pb-16 pt-36 lg:px-12 lg:pt-48">
        <div className="mx-auto max-w-site">
          <FadeUp>
            <Eyebrow className="mb-6">§ Services</Eyebrow>
            <h1 className="mb-6 font-display text-[clamp(52px,8vw,108px)] font-medium leading-[0.92] tracking-[-0.05em] text-[var(--ink)]">
              Three lines.<br />
              <em className="not-italic text-[var(--red)]">One record.</em>
            </h1>
            <p className="max-w-xl text-[18px] leading-[1.65] text-[var(--muted)]">
              TIHLO operates across three operational disciplines — each producing evidence-grade
              output, each reviewed by a named controller.
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
            className={`px-6 py-20 lg:px-12 lg:py-28 border-t border-[var(--rule)] ${
              isEven ? 'bg-[var(--paper)]' : 'bg-[var(--paper-2)]'
            }`}
          >
            <div className="mx-auto max-w-site">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                <FadeUp>
                  <Eyebrow className="mb-5">{service.index}</Eyebrow>
                  <h2 className="mb-3 font-display text-[clamp(36px,4.6vw,62px)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
                    {service.headline}
                  </h2>
                  <p className="mono-label mt-3 text-[var(--red)]">{service.name}</p>
                </FadeUp>

                <FadeUp delay={0.12}>
                  <p className="mb-8 text-[17px] leading-[1.65] text-[var(--muted)]">{service.body}</p>
                  <ul className="space-y-0 border border-[var(--rule)]">
                    {service.features.map((f, j) => (
                      <li
                        key={j}
                        className={`flex items-start gap-4 px-6 py-4 ${
                          j < service.features.length - 1 ? 'border-b border-[var(--rule)]' : ''
                        }`}
                      >
                        <span className="mono-id mt-0.5 shrink-0 text-[var(--red)]">§ {String(j + 1).padStart(2, '0')}</span>
                        <span className="text-sm leading-relaxed text-[var(--muted)]">{f}</span>
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
      <section className="bg-[var(--ink)] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-site">
          <FadeUp className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--paper)]">
              One monitoring layer.<br />
              <em className="not-italic text-[var(--red)]">Full coverage.</em>
            </h2>
            <div>
              <p className="mb-7 text-[17px] leading-[1.65] text-white/65">
                TIHLO integrates with your existing fleet management and telematics systems.
                No hardware replacement. No system migration. We add the verification layer above
                what you already have.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="white" href="/contact">Request a briefing</Button>
                <Button variant="ghost" href="/how-we-operate" className="border-white/20 text-white hover:border-white">
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
