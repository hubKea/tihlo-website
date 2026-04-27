import FadeUp from '@/components/motion/FadeUp';
import Button from '@/components/ui/Button';
import { FINAL_CTA } from '@/lib/constants';

export default function FinalCTA() {
  return (
    <section className="bg-[var(--ink)] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-site">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end">
          <FadeUp>
            <p className="mono-label mb-6 flex items-center gap-3 text-white/50">
              <span className="block h-px w-6 bg-[var(--red)]" />
              {FINAL_CTA.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(40px,5.6vw,72px)] font-medium leading-[0.96] tracking-[-0.04em] text-[var(--paper)]">
              {FINAL_CTA.headline[0]}
              <br />
              <em className="not-italic text-[var(--red)]">{FINAL_CTA.headline[1]}</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="mb-8 text-[17px] leading-[1.65] text-white/65">{FINAL_CTA.body}</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="white" href="/contact">
                {FINAL_CTA.cta_primary}
              </Button>
              <Button
                variant="ghost"
                href="/field-notes"
                className="border-white/20 text-white hover:border-white"
              >
                {FINAL_CTA.cta_secondary}
              </Button>
            </div>
          </FadeUp>
        </div>

        {/* Decorative separator */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
            <p className="mono-id text-white/30">TIHLO · Independent · Pretoria, South Africa</p>
            <p className="mono-id text-white/30">The eye that never misses.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
