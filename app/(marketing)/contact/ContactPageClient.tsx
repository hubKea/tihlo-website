'use client';

import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import MaskHeading from '@/components/motion/MaskHeading';
import LineSystem from '@/components/motion/LineSystem';
import Button from '@/components/ui/Button';
import { CONTACT, BRAND } from '@/lib/constants';
import ContactForm from './ContactForm';

export default function ContactPageClient() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--white)] px-6 pb-20 pt-32 lg:px-12 lg:pb-28 lg:pt-40">
        <LineSystem tone="light" density="quiet" anchor="left" />
        <div className="relative z-10 mx-auto max-w-site">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            {/* Left column */}
            <div className="space-y-12">
              <FadeUp>
                <div className="bg-[var(--ink)] p-8 lg:p-10">
                  <p className="mb-6 inline-flex items-center gap-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/68">
                    <span className="block h-px w-5 bg-[var(--red)]" />
                    Initiate
                  </p>
                  <h1 className="font-display text-[clamp(40px,5vw,64px)] font-medium leading-[0.94] tracking-[-0.04em] text-white">
                    <MaskHeading immediate>Initiate<span className="text-[var(--red)]">.</span></MaskHeading>
                  </h1>
                  <p className="mt-6 max-w-md text-[15px] leading-[1.65] text-white/76">
                    {CONTACT.sub}
                  </p>
                  <div className="mt-8 h-[2px] w-16 bg-[var(--red)]" />
                </div>

                {/* Mobile-only: Jump to form button */}
                <div className="mt-4 lg:hidden">
                  <Button
                    variant="primary"
                    href="#contact-form"
                    className="w-full justify-center"
                  >
                    Go to form
                  </Button>
                </div>
              </FadeUp>

              {/* Engagement tiers */}
              <FadeUp>
                <Eyebrow className="mb-7">How engagements work</Eyebrow>
                <div className="space-y-0 border border-[var(--faint)]">
                  {CONTACT.tiers.map((tier, i) => (
                    <div
                      key={tier.index}
                      className={`flex gap-6 px-7 py-7 transition-colors hover:bg-[var(--white-3)] ${i < CONTACT.tiers.length - 1 ? 'border-b border-[var(--faint)]' : ''}`}
                    >
                      <span className="font-mono text-[clamp(34px,3.6vw,44px)] font-semibold tabular-nums leading-none tracking-[-0.02em] text-[var(--ink)]">
                        0{i + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="mb-2 font-display text-[20px] font-semibold tracking-[-0.015em] text-[var(--ink)]">
                          {tier.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--muted)]">
                          {tier.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              {/* Address card */}
              <FadeUp delay={0.08}>
                <div className="border border-[var(--faint)] px-7 py-7">
                  <p className="mono-label mb-4 text-[var(--muted)]">
                    TIHLO · Pretoria
                  </p>
                  <div className="mono-id space-y-1.5 text-[var(--ink)]">
                    <p>{BRAND.address}</p>
                    <p>Tel: {BRAND.phone}</p>
                    <p>{BRAND.email}</p>
                  </div>
                </div>
              </FadeUp>

              {/* FAQ */}
              <FadeUp delay={0.12}>
                <Eyebrow className="mb-6">Common questions</Eyebrow>
                <div className="space-y-6">
                  {CONTACT.faq.map((item, i) => (
                    <div
                      key={i}
                      className={`pb-6 ${i < CONTACT.faq.length - 1 ? 'border-b border-[var(--faint)]' : ''}`}
                    >
                      <p className="mono-label mb-2 text-[var(--ink)]">
                        {item.q}
                      </p>
                      <p className="text-sm leading-relaxed text-[var(--muted)]">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right column — form */}
            <FadeUp delay={0.1}>
              <div
                id="contact-form"
                className="scroll-mt-20 space-y-6 lg:sticky lg:top-24"
              >
                {/* Fast track */}
                <div className="border border-[var(--faint)] bg-[var(--white-2)] p-6 lg:p-8">
                  <Eyebrow className="mb-4">Fast Track</Eyebrow>
                  <p className="mb-5 text-[15px] leading-relaxed text-[var(--muted)]">
                    Don&apos;t want to fill out the form? Book a 15-minute
                    scoping call directly with our operations team.
                  </p>
                  <Button variant="secondary" href="#book-call" className="w-full justify-center">
                    Book a Call
                  </Button>
                </div>

                <div className="border border-[var(--faint)] bg-[var(--white)] p-6 lg:p-8">
                  <ContactForm />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
