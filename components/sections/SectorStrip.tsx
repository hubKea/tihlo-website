import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';

const ASSETS = [
  {
    label: 'Side tipper',
    description: 'Mining transport across long-haul corridors. Load verified at gate, route enforced to offload.',
    drawing: (
      <svg viewBox="0 0 160 90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        {/* Cab */}
        <path d="M6 56 L6 36 L24 36 L30 50 L48 50 L48 56" />
        <line x1="14" y1="44" x2="22" y2="44" />
        {/* Tractor frame */}
        <line x1="48" y1="56" x2="64" y2="56" />
        {/* Hitch */}
        <line x1="64" y1="56" x2="74" y2="50" />
        {/* Tipper bin */}
        <path d="M74 50 L74 26 L150 26 L150 50 Z" />
        <line x1="74" y1="38" x2="150" y2="38" />
        <line x1="100" y1="26" x2="100" y2="50" />
        <line x1="124" y1="26" x2="124" y2="50" />
        {/* Chassis under tipper */}
        <line x1="74" y1="56" x2="150" y2="56" />
        {/* Wheels */}
        <circle cx="20" cy="64" r="8" />
        <circle cx="86" cy="64" r="8" />
        <circle cx="108" cy="64" r="8" />
        <circle cx="138" cy="64" r="8" />
      </svg>
    ),
  },
  {
    label: 'Articulated dump truck',
    description: 'Yellow plant haulage in the pit. Utilisation, idle and harsh-event log per machine.',
    drawing: (
      <svg viewBox="0 0 160 90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        {/* Cab */}
        <path d="M8 58 L8 32 L34 32 L42 48 L52 48" />
        <line x1="14" y1="40" x2="28" y2="40" />
        {/* Articulation joint */}
        <circle cx="58" cy="50" r="3" />
        <line x1="52" y1="48" x2="55" y2="50" />
        <line x1="61" y1="50" x2="64" y2="48" />
        {/* Bin */}
        <path d="M64 48 L72 22 L150 22 L150 48 Z" />
        <line x1="100" y1="22" x2="100" y2="48" />
        <line x1="125" y1="22" x2="125" y2="48" />
        {/* Chassis */}
        <line x1="64" y1="58" x2="150" y2="58" />
        {/* Wheels */}
        <circle cx="22" cy="66" r="8" />
        <circle cx="80" cy="66" r="8" />
        <circle cx="100" cy="66" r="8" />
        <circle cx="138" cy="66" r="8" />
      </svg>
    ),
  },
  {
    label: 'Excavator',
    description: 'Loading at the face. Tonnage attributed to operator, shift and contractor.',
    drawing: (
      <svg viewBox="0 0 160 90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        {/* Tracks */}
        <path d="M24 70 L72 70 L78 76 L18 76 Z" />
        <line x1="32" y1="70" x2="32" y2="76" />
        <line x1="44" y1="70" x2="44" y2="76" />
        <line x1="56" y1="70" x2="56" y2="76" />
        <line x1="68" y1="70" x2="68" y2="76" />
        {/* Body */}
        <path d="M28 70 L28 50 L70 50 L74 60 L74 70" />
        {/* Cab */}
        <path d="M30 50 L30 36 L48 36 L52 50" />
        <line x1="34" y1="42" x2="44" y2="42" />
        {/* Boom */}
        <line x1="56" y1="50" x2="100" y2="22" />
        {/* Stick */}
        <line x1="100" y1="22" x2="134" y2="44" />
        {/* Bucket */}
        <path d="M134 44 L150 50 L146 60 L130 56 Z" />
        {/* Hydraulics */}
        <line x1="62" y1="44" x2="92" y2="32" />
      </svg>
    ),
  },
  {
    label: 'Weighbridge',
    description: 'The verification point. 3-point handshake before the gate opens.',
    drawing: (
      <svg viewBox="0 0 160 90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        {/* Truck on bridge */}
        <path d="M28 46 L28 30 L46 30 L52 40 L66 40 L66 46" />
        <line x1="34" y1="36" x2="42" y2="36" />
        <path d="M66 40 L66 28 L122 28 L122 46" />
        <line x1="80" y1="28" x2="80" y2="46" />
        <line x1="98" y1="28" x2="98" y2="46" />
        {/* Wheels */}
        <circle cx="40" cy="50" r="5" />
        <circle cx="80" cy="50" r="5" />
        <circle cx="108" cy="50" r="5" />
        {/* Weighbridge platform */}
        <path d="M14 60 L146 60 L146 68 L14 68 Z" />
        <line x1="14" y1="64" x2="146" y2="64" />
        {/* Pit lines */}
        <line x1="14" y1="68" x2="14" y2="76" />
        <line x1="146" y1="68" x2="146" y2="76" />
        <line x1="14" y1="76" x2="146" y2="76" />
        {/* Display console */}
        <rect x="124" y="34" width="22" height="14" />
        <line x1="128" y1="40" x2="142" y2="40" />
        <line x1="135" y1="48" x2="135" y2="60" />
      </svg>
    ),
  },
];

export default function SectorStrip() {
  return (
    <section className="bg-[var(--paper)] px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-site">
        <FadeUp className="mb-14 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Eyebrow className="mb-5">§ Asset classes</Eyebrow>
            <h2 className="font-display text-[clamp(36px,4.6vw,58px)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
              What we monitor.
            </h2>
          </div>
          <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-[var(--muted)] lg:mt-0">
            Four asset classes. One methodology. Independent of the manufacturer of the
            tracker, the operator of the fleet, or the system that reports it.
          </p>
        </FadeUp>

        <div className="grid grid-cols-2 gap-px border border-[var(--rule)] bg-[var(--rule)] lg:grid-cols-4">
          {ASSETS.map((asset, i) => (
            <FadeUp key={asset.label} delay={i * 0.06}>
              <div className="group relative h-full bg-[var(--paper)] px-7 py-9 transition-colors hover:bg-[var(--paper-2)]">
                <span className="mono-id absolute right-4 top-4 text-[var(--dim)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="h-20 w-full text-[var(--ink)]/55 transition-colors duration-300 group-hover:text-[var(--red)]">
                  {asset.drawing}
                </div>
                <h3 className="mt-7 font-display text-lg font-medium tracking-[-0.015em] text-[var(--ink)]">
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
