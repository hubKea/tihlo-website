import Eyebrow from '@/components/ui/Eyebrow';
import FadeUp from '@/components/motion/FadeUp';
import Button from '@/components/ui/Button';
import { FINAL_CTA } from '@/lib/constants';

export default function FinalCTA() {
  return (
    <section className="border-t border-white/10 bg-[var(--ink)] py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
          <FadeUp>
            <Eyebrow className="text-white/40">The eye that never misses</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(34px,4vw,56px)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
              The eye that
              <br />
              never misses
              <span className="text-[var(--red)]">.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="max-w-[52ch] text-[15px] leading-[1.66] text-white/55">
              {FINAL_CTA.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="white" size="lg" href="/contact">
                {FINAL_CTA.cta_primary}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="/field-notes"
                arrow={false}
                className="border-white/20 text-white hover:border-white"
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
