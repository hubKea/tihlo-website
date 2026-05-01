/**
 * LineIllustration — the landing-page line-visual system.
 *
 * Architectural drafting style: single-weight strokes (1.25–1.5px), no fills,
 * square line caps, mono annotations. Each illustration is information-bearing
 * (depicts the actual concept) — never decorative-only.
 *
 * Server-safe (no client hooks). Accepts className for sizing and an optional
 * accent prop to flip the highlight stroke from ink to red.
 */

type Variant =
  | 'fuel-energy'
  | 'asset-utilisation'
  | 'movement-routing'
  | 'contractor-evidence'
  | 'verify'
  | 'monitor'
  | 'resolve'
  | 'iris-instrument';

interface Props {
  variant: Variant;
  className?: string;
  accent?: 'ink' | 'red';
  annotated?: boolean;
}

const STROKE = 'currentColor';

export default function LineIllustration({
  variant,
  className = '',
  accent = 'ink',
  annotated = true,
}: Props) {
  const accentColor = accent === 'red' ? 'var(--red)' : 'currentColor';
  const dim = 'var(--dim)';

  const drawings: Record<Variant, React.ReactNode> = {
    'fuel-energy': (
      <svg viewBox="0 0 240 160" fill="none" stroke={STROKE} strokeWidth="1.4" strokeLinecap="square" className="h-full w-full">
        {/* Storage tank */}
        <rect x="22" y="44" width="84" height="92" />
        <line x1="22" y1="64" x2="106" y2="64" />
        <line x1="22" y1="116" x2="106" y2="116" />
        {/* Gauge */}
        <circle cx="64" cy="92" r="14" />
        <line x1="64" y1="92" x2="72" y2="84" stroke={accentColor} strokeWidth="1.6" />
        <line x1="58" y1="98" x2="58" y2="100" />
        <line x1="70" y1="98" x2="70" y2="100" />
        {/* Pipe to dispenser */}
        <path d="M106 90 L122 90 L122 70 L138 70" />
        <circle cx="138" cy="70" r="2" fill={accentColor} stroke="none" />
        {/* Dispenser */}
        <rect x="138" y="50" width="32" height="86" />
        <line x1="138" y1="68" x2="170" y2="68" />
        <rect x="146" y="78" width="16" height="22" stroke={dim} />
        <text x="148" y="92" fontSize="8" fontFamily="var(--font-mono)" fill={accentColor} letterSpacing="0.08em">FL-01</text>
        {/* Hose to truck */}
        <path d="M170 96 Q188 96 188 116 L210 116" stroke={dim} />
        <rect x="180" y="116" width="40" height="20" stroke={dim} />
        <circle cx="188" cy="140" r="4" stroke={dim} />
        <circle cx="212" cy="140" r="4" stroke={dim} />
        {/* Annotations */}
        {annotated && (
          <>
            <line x1="64" y1="34" x2="64" y2="44" />
            <text x="64" y="28" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.16em">BASELINE</text>
            <line x1="154" y1="36" x2="154" y2="50" />
            <text x="154" y="30" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.16em">METER</text>
          </>
        )}
      </svg>
    ),

    'asset-utilisation': (
      <svg viewBox="0 0 240 160" fill="none" stroke={STROKE} strokeWidth="1.4" strokeLinecap="square" className="h-full w-full">
        {/* Excavator base */}
        <path d="M30 122 L82 122 L88 130 L24 130 Z" />
        <line x1="36" y1="122" x2="36" y2="130" />
        <line x1="48" y1="122" x2="48" y2="130" />
        <line x1="62" y1="122" x2="62" y2="130" />
        <line x1="76" y1="122" x2="76" y2="130" />
        {/* Body */}
        <path d="M34 122 L34 96 L82 96 L88 110 L88 122" />
        {/* Cab */}
        <path d="M40 96 L40 76 L62 76 L66 96" />
        <line x1="44" y1="84" x2="58" y2="84" />
        {/* Boom + stick + bucket */}
        <line x1="74" y1="96" x2="138" y2="56" stroke={accentColor} strokeWidth="1.6" />
        <line x1="138" y1="56" x2="186" y2="84" stroke={accentColor} strokeWidth="1.6" />
        <path d="M186 84 L210 92 L204 108 L182 100 Z" stroke={accentColor} strokeWidth="1.6" />
        {/* Hydraulic */}
        <line x1="84" y1="86" x2="124" y2="70" />
        {/* Telemetry pulse */}
        <circle cx="50" cy="80" r="3" fill={accentColor} stroke="none" />
        <circle cx="50" cy="80" r="8" stroke={accentColor} strokeWidth="0.8" />
        {annotated && (
          <>
            <line x1="50" y1="60" x2="50" y2="72" />
            <text x="50" y="54" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.16em">TELEMETRY</text>
            <line x1="196" y1="100" x2="196" y2="120" />
            <text x="196" y="132" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.16em">UTILISATION</text>
          </>
        )}
      </svg>
    ),

    'movement-routing': (
      <svg viewBox="0 0 240 160" fill="none" stroke={STROKE} strokeWidth="1.4" strokeLinecap="square" className="h-full w-full">
        {/* Origin */}
        <rect x="20" y="118" width="22" height="22" />
        <line x1="22" y1="124" x2="40" y2="124" />
        <text x="31" y="152" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.16em">GATE</text>
        {/* Route */}
        <path d="M42 130 Q70 130 80 100 T140 70 T210 50" stroke={accentColor} strokeWidth="1.6" />
        {/* Geofence corridor */}
        <path d="M42 124 Q70 124 80 94 T140 64 T210 44" stroke={dim} strokeDasharray="2 3" />
        <path d="M42 136 Q70 136 80 106 T140 76 T210 56" stroke={dim} strokeDasharray="2 3" />
        {/* Truck on route */}
        <g transform="translate(112,76) rotate(-18)">
          <rect x="-12" y="-6" width="24" height="12" />
          <rect x="-22" y="-2" width="10" height="8" />
          <circle cx="-16" cy="9" r="2.5" />
          <circle cx="-4" cy="9" r="2.5" />
          <circle cx="8" cy="9" r="2.5" />
        </g>
        {/* Destination */}
        <circle cx="210" cy="50" r="5" fill={accentColor} stroke="none" />
        <circle cx="210" cy="50" r="11" stroke={accentColor} strokeWidth="0.8" />
        {annotated && (
          <>
            <text x="210" y="34" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.16em">DEST</text>
            <line x1="172" y1="60" x2="172" y2="46" stroke={dim} />
            <text x="172" y="40" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.14em">GEOFENCE</text>
          </>
        )}
      </svg>
    ),

    'contractor-evidence': (
      <svg viewBox="0 0 240 160" fill="none" stroke={STROKE} strokeWidth="1.4" strokeLinecap="square" className="h-full w-full">
        {/* Stack of evidence pages */}
        <rect x="36" y="32" width="100" height="120" />
        <rect x="44" y="24" width="100" height="120" stroke={dim} />
        <rect x="52" y="16" width="100" height="120" stroke={dim} strokeWidth="1" />
        {/* Page rules */}
        <line x1="44" y1="44" x2="128" y2="44" />
        <line x1="44" y1="56" x2="120" y2="56" />
        <line x1="44" y1="68" x2="124" y2="68" />
        <line x1="44" y1="80" x2="116" y2="80" />
        {/* Performance bars */}
        <rect x="44" y="92" width="14" height="44" stroke={dim} />
        <rect x="62" y="100" width="14" height="36" stroke={dim} />
        <rect x="80" y="86" width="14" height="50" stroke={accentColor} strokeWidth="1.6" />
        <rect x="98" y="108" width="14" height="28" stroke={dim} />
        {/* Signature stamp */}
        <circle cx="184" cy="76" r="32" />
        <circle cx="184" cy="76" r="22" stroke={dim} />
        <path d="M170 76 L180 86 L198 66" stroke={accentColor} strokeWidth="1.6" />
        {annotated && (
          <>
            <text x="184" y="120" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.16em">SIGNED</text>
            <line x1="86" y1="80" x2="86" y2="86" stroke={accentColor} />
            <text x="86" y="148" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.14em">RANK</text>
          </>
        )}
      </svg>
    ),

    verify: (
      <svg viewBox="0 0 200 120" fill="none" stroke={STROKE} strokeWidth="1.4" strokeLinecap="square" className="h-full w-full">
        {/* Three input nodes converging */}
        <circle cx="20" cy="20" r="6" />
        <circle cx="20" cy="60" r="6" />
        <circle cx="20" cy="100" r="6" />
        <text x="32" y="22" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.14em">FLEET</text>
        <text x="32" y="62" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.14em">TRACKER</text>
        <text x="32" y="102" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.14em">AUTH</text>
        <line x1="60" y1="20" x2="116" y2="60" />
        <line x1="60" y1="60" x2="116" y2="60" />
        <line x1="60" y1="100" x2="116" y2="60" />
        {/* Junction */}
        <circle cx="120" cy="60" r="10" stroke={accentColor} strokeWidth="1.6" />
        <line x1="116" y1="60" x2="124" y2="60" stroke={accentColor} />
        {/* Output: clearance */}
        <line x1="130" y1="60" x2="170" y2="60" />
        <path d="M170 60 L164 56 M170 60 L164 64" />
        <text x="186" y="62" textAnchor="end" fontSize="7" fontFamily="var(--font-mono)" fill={accentColor} letterSpacing="0.16em">CLEAR</text>
      </svg>
    ),

    monitor: (
      <svg viewBox="0 0 200 120" fill="none" stroke={STROKE} strokeWidth="1.4" strokeLinecap="square" className="h-full w-full">
        {/* Baseline waveform */}
        <path d="M10 80 L40 80 L46 60 L52 80 L82 80 L88 50 L94 80 L124 80 L130 70 L136 80 L190 80" />
        {/* Anomaly spike */}
        <path d="M82 80 L88 22 L94 80" stroke={accentColor} strokeWidth="1.8" />
        <circle cx="88" cy="22" r="3" fill={accentColor} stroke="none" />
        {/* Dashed reference */}
        <line x1="10" y1="80" x2="190" y2="80" stroke={dim} strokeDasharray="2 3" />
        <line x1="10" y1="40" x2="190" y2="40" stroke={dim} strokeDasharray="2 3" />
        {/* Annotation */}
        <line x1="88" y1="14" x2="88" y2="6" stroke={accentColor} />
        <text x="88" y="6" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill={accentColor} letterSpacing="0.16em">VARIANCE</text>
        <text x="14" y="100" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.14em">BASELINE</text>
      </svg>
    ),

    resolve: (
      <svg viewBox="0 0 200 120" fill="none" stroke={STROKE} strokeWidth="1.4" strokeLinecap="square" className="h-full w-full">
        {/* Decision diamond */}
        <path d="M40 60 L70 30 L100 60 L70 90 Z" />
        <text x="70" y="64" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.14em">REVIEW</text>
        {/* Outputs */}
        <line x1="100" y1="60" x2="130" y2="60" />
        <rect x="130" y="36" width="56" height="22" stroke={dim} />
        <rect x="130" y="64" width="56" height="22" stroke={accentColor} strokeWidth="1.6" />
        <text x="158" y="50" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.14em">WARNING</text>
        <text x="158" y="78" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fill={accentColor} letterSpacing="0.14em">SUSPEND</text>
        {/* Controller signature */}
        <line x1="40" y1="60" x2="14" y2="60" />
        <circle cx="10" cy="60" r="4" stroke={accentColor} strokeWidth="1.4" />
        <text x="10" y="80" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.14em">CTRL</text>
      </svg>
    ),

    'iris-instrument': (
      <svg viewBox="0 0 320 320" fill="none" stroke={STROKE} strokeWidth="1.2" strokeLinecap="square" className="h-full w-full">
        {/* Outer reticle ticks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const x1 = 160 + Math.cos(a) * 152;
          const y1 = 160 + Math.sin(a) * 152;
          const x2 = 160 + Math.cos(a) * (i % 6 === 0 ? 142 : 148);
          const y2 = 160 + Math.sin(a) * (i % 6 === 0 ? 142 : 148);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={dim} />;
        })}
        {/* Concentric instrument rings */}
        <circle cx="160" cy="160" r="138" stroke={dim} strokeDasharray="1 3" />
        <circle cx="160" cy="160" r="118" />
        <circle cx="160" cy="160" r="94" />
        <circle cx="160" cy="160" r="68" stroke={dim} />
        {/* Pupil */}
        <circle cx="160" cy="160" r="36" stroke={accentColor} strokeWidth="1.6" />
        <circle cx="160" cy="160" r="6" fill={accentColor} stroke="none" />
        {/* Crosshair */}
        <line x1="22" y1="160" x2="124" y2="160" stroke={dim} />
        <line x1="196" y1="160" x2="298" y2="160" stroke={dim} />
        <line x1="160" y1="22" x2="160" y2="124" stroke={dim} />
        <line x1="160" y1="196" x2="160" y2="298" stroke={dim} />
        {/* Annotations */}
        {annotated && (
          <>
            <text x="160" y="18" textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.2em">N</text>
            <text x="306" y="164" textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.2em">E</text>
            <text x="160" y="306" textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.2em">S</text>
            <text x="14" y="164" textAnchor="start" fontSize="8" fontFamily="var(--font-mono)" fill={STROKE} letterSpacing="0.2em">W</text>
            <text x="160" y="240" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill={accentColor} letterSpacing="0.16em">FOCUS</text>
          </>
        )}
      </svg>
    ),
  };

  return (
    <div className={`text-[var(--ink)] ${className}`} aria-hidden>
      {drawings[variant]}
    </div>
  );
}
