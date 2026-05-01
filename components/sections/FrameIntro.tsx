import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';

export default function FrameIntro() {
  return (
    <section className="bg-[var(--white)] px-6 py-32 lg:px-12 lg:py-48">
      <div className="mx-auto max-w-site">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <FadeUp>
            <Eyebrow className="mb-6">01 — What we do</Eyebrow>
            <h2 className="font-display text-[clamp(40px,5.6vw,72px)] font-semibold leading-[0.96] tracking-[-0.04em] text-[var(--ink)]">
              We don&apos;t watch screens. We{' '}
              <em className="not-italic text-[var(--ink)]">act on</em> what they
              show.
            </h2>
          </FadeUp>

          {/* Right */}
          <FadeUp delay={0.15}>
            <div className="space-y-5 pt-2 text-[17px] leading-[1.65] text-[var(--muted)] lg:pt-16">
              <p>
                TIHLO operates the verification layer that sits above existing
                fleet management and telematics systems. We do not replace what
                you have. We confirm whether what it reports is true — and we
                intervene immediately when it is not.
              </p>
              <p>
                Three operational lines: fuel and diesel security, asset
                oversight, and contractor accountability. One control room. One
                decision trail. One evidence pack at month-end — audit-grade,
                dispute-defensible, and signed by a named controller.
              </p>
              <p>
                We succeed when your operation succeeds. That is not a
                positioning statement. It is the structure of our engagement.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
