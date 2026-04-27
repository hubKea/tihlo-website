'use client';

import { useState } from 'react';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import { CONTACT, BRAND } from '@/lib/constants';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <>
      {/* Hero strip — dark, full-width */}
      <section className="bg-[var(--ink)] px-6 pb-16 pt-36 lg:px-12 lg:pt-48">
        <div className="mx-auto max-w-site">
          <FadeUp>
            <Eyebrow className="mb-6 text-white/40">§ Initiate</Eyebrow>
            <h1 className="mb-6 font-display text-[clamp(64px,10vw,140px)] font-medium leading-[0.88] tracking-[-0.05em] text-[var(--paper)]">
              Initiate.
            </h1>
            <p className="max-w-xl text-[18px] leading-[1.65] text-white/60">
              {CONTACT.sub}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="bg-[var(--paper)] px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-site">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">

            {/* Left column */}
            <div className="space-y-12">
              {/* Engagement tiers */}
              <FadeUp>
                <Eyebrow className="mb-7">§ How engagements work</Eyebrow>
                <div className="space-y-0 border border-[var(--rule)]">
                  {CONTACT.tiers.map((tier, i) => (
                    <div
                      key={tier.index}
                      className={`px-7 py-7 ${i < CONTACT.tiers.length - 1 ? 'border-b border-[var(--rule)]' : ''}`}
                    >
                      <p className="mono-id mb-2 text-[var(--red)]">{tier.index}</p>
                      <h3 className="mb-2 font-display text-lg font-medium tracking-[-0.015em] text-[var(--ink)]">
                        {tier.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--muted)]">{tier.body}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>

              {/* Address card */}
              <FadeUp delay={0.08}>
                <div className="border border-[var(--rule)] px-7 py-7">
                  <p className="mono-label mb-4 text-[var(--muted)]">TIHLO · Pretoria</p>
                  <div className="mono-id space-y-1.5 text-[var(--ink)]">
                    <p>{BRAND.address}</p>
                    <p>Tel: {BRAND.phone}</p>
                    <p>{BRAND.email}</p>
                  </div>
                </div>
              </FadeUp>

              {/* FAQ */}
              <FadeUp delay={0.12}>
                <Eyebrow className="mb-6">§ Common questions</Eyebrow>
                <div className="space-y-6">
                  {CONTACT.faq.map((item, i) => (
                    <div key={i} className={`pb-6 ${i < CONTACT.faq.length - 1 ? 'border-b border-[var(--rule)]' : ''}`}>
                      <p className="mono-label mb-2 text-[var(--ink)]">{item.q}</p>
                      <p className="text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right column — form */}
            <FadeUp delay={0.1}>
              <ContactForm />
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
