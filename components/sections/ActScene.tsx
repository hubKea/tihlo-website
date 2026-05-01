import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import RegMarks from '@/components/ui/RegMarks';
import MonoStamp from '@/components/ui/MonoStamp';
import NumberRoll from '@/components/ui/NumberRoll';
import { ACTS } from '@/lib/constants';

type Act = (typeof ACTS)[number];

function ActBlock({ act, isLast }: { act: Act; isLast: boolean }) {
  return (
    <div
      className={`py-20 lg:py-28 ${isLast ? '' : 'border-b border-[var(--faint)]'}`}
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Image */}
        <div className={`relative ${act.flip ? 'lg:order-last' : ''}`}>
          <FadeUp delay={0} className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={act.image.src}
              alt={act.image.alt}
              fill
              quality={85}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Overlay */}
            <div className="bg-[var(--ink)]/10 absolute inset-0" />
            <RegMarks size={16} color="rgba(244,241,234,0.4)" />
            <MonoStamp
              label="ON RECORD"
              status="green"
              pulse
              className="absolute bottom-4 left-4"
            />
            <div className="mono-id text-white/40 absolute right-4 top-4">
              {act.index}
            </div>
          </FadeUp>
        </div>

        {/* Copy */}
        <div className={act.flip ? 'lg:order-first' : ''}>
          <FadeUp delay={0.1}>
            <Eyebrow className="mb-5">
              {act.index} — {act.label}
            </Eyebrow>
            <h2 className="mb-7 font-display text-[clamp(36px,4.6vw,58px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
              {act.headline.map((line, i) => (
                <span key={i}>
                  {line.split(act.accentWord).map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <em className="not-italic text-[var(--ink)]">
                          {act.accentWord}
                        </em>
                      )}
                    </span>
                  ))}
                  {i < act.headline.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <div className="mb-8 space-y-4 text-[16px] leading-[1.65] text-[var(--muted)]">
              {act.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 border-t border-[var(--faint)] pt-7">
              {act.stats.map((stat, i) => (
                <div key={i}>
                  <div className="font-display text-4xl font-semibold tabular-nums tracking-[-0.03em] text-[var(--ink)]">
                    <NumberRoll value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mono-id mt-1.5 text-[var(--muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

export default function ActScene() {
  return (
    <section className="bg-[var(--white-2)] px-6 lg:px-12">
      <div className="mx-auto max-w-site">
        {ACTS.map((act, i) => (
          <ActBlock key={act.index} act={act} isLast={i === ACTS.length - 1} />
        ))}
      </div>
    </section>
  );
}
