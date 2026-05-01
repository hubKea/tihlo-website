import Eyebrow from '@/components/ui/Eyebrow';
import FadeUp from '@/components/motion/FadeUp';
import Button from '@/components/ui/Button';
import { FINAL_CTA } from '@/lib/constants';

export default function FinalCTA() {
  return (
    <section className="border-t border-[var(--faint)] bg-[var(--white-2)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
          <FadeUp>
            <Eyebrow>The eye that never misses</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(40px,5.6vw,80px)] font-medium leading-[0.94] tracking-[-0.04em] text-[var(--ink)]">
              The eye that
              <br />
              never misses
              <span className="text-[var(--red)]">.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="max-w-[52ch] text-[16px] leading-[1.62] text-[var(--muted)]">
              {FINAL_CTA.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/contact">
                {FINAL_CTA.cta_primary}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="/field-notes"
                arrow={false}
              >
                {FINAL_CTA.cta_secondary}
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
