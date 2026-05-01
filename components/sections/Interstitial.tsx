import Image from 'next/image';
import FadeUp from '@/components/motion/FadeUp';
import { INTERSTITIAL } from '@/lib/constants';

export default function Interstitial() {
  const { quote, accentWord, attribution, image } = INTERSTITIAL;
  const parts = quote.split(accentWord);

  return (
    <section className="relative overflow-hidden py-32 lg:py-48">
      {/* Dark image */}
      <div className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          quality={85}
          className="object-cover contrast-[1.1] grayscale-[0.3]"
          sizes="100vw"
          style={{ opacity: 0.55 }}
        />
        <div className="bg-[var(--ink)]/65 absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-site px-6 lg:px-12">
        <FadeUp className="max-w-3xl">
          <blockquote>
            <p className="font-display text-[clamp(28px,4.2vw,56px)] font-semibold leading-[1.12] tracking-[-0.035em] text-[var(--white)]">
              &ldquo;{parts[0]}
              <em className="not-italic text-[var(--ink)]">{accentWord}</em>
              {parts[1]}&rdquo;
            </p>
            <footer className="mono-id text-white/50 mt-8">
              {attribution}
            </footer>
          </blockquote>
        </FadeUp>
      </div>
    </section>
  );
}
