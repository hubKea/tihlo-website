import Image from 'next/image';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';

const ASSETS = [
  {
    label: 'Side tipper',
    description: 'Mining transport across long-haul corridors. Load verified at gate, route enforced to offload.',
    imageSrc: '/images/side-tippers.jpg',
  },
  {
    label: 'Articulated dump truck',
    description: 'Yellow plant haulage in the pit. Utilisation, idle and harsh-event log per machine.',
    imageSrc: '/images/yellow-plant-machinery.jpg',
  },
  {
    label: 'Excavator',
    description: 'Loading at the face. Tonnage attributed to operator, shift and contractor.',
    imageSrc: '/images/manungu_coillier.jpg',
  },
  {
    label: 'Weighbridge',
    description: 'The verification point. 3-point handshake before the gate opens.',
    imageSrc: '/images/weighbridge.jpg',
  },
];

export default function SectorStrip() {
  return (
    <section className="bg-[var(--white)] px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-site">
        <FadeUp className="mb-14 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Eyebrow className="mb-5">Asset classes</Eyebrow>
            <h2 className="font-display text-[clamp(36px,4.6vw,58px)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
              What we monitor.
            </h2>
          </div>
          <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-[var(--muted)] lg:mt-0">
            Four asset classes. One methodology. Independent of the manufacturer of the
            tracker, the operator of the fleet, or the system that reports it.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-px border border-[var(--faint)] bg-[var(--faint)] md:grid-cols-2 lg:grid-cols-4">
          {ASSETS.map((asset, i) => (
            <FadeUp key={asset.label} delay={i * 0.06}>
              <div className="group relative flex h-full flex-col bg-[var(--white)] px-7 py-9 transition-colors hover:bg-[var(--white-2)]">
                
                <span className="mono-id absolute right-5 top-5 z-10 text-[var(--dim)] transition-colors duration-300 group-hover:text-[var(--ink)]">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Technical Image Container */}
                <div className="relative mb-8 h-32 w-full overflow-hidden bg-[var(--faint)]">
                  {/* Image with Industrial Mask Filter */}
                  <Image
                    src={asset.imageSrc}
                    alt={asset.label}
                    fill
                    className="object-cover grayscale contrast-[1.1] opacity-60 mix-blend-luminosity transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* Surveillance/Technical corner marks */}
                  <div className="absolute left-0 top-0 m-2 h-2 w-2 border-l border-t border-[var(--ink)]/40 z-10 transition-colors duration-300 group-hover:border-[var(--red)]" />
                  <div className="absolute right-0 bottom-0 m-2 h-2 w-2 border-b border-r border-[var(--ink)]/40 z-10 transition-colors duration-300 group-hover:border-[var(--red)]" />
                  
                  {/* Subtle scanline overlay */}
                  <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px]" />
                </div>

                <h3 className="font-display text-lg font-semibold tracking-[-0.015em] text-[var(--ink)]">
                  {asset.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {asset.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
