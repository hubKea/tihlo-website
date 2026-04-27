interface RegMarksProps {
  size?: number;
  color?: string;
  className?: string;
}

// Registration corner marks — used on photo frames and section markers
export default function RegMarks({ size = 14, color = 'currentColor', className = '' }: RegMarksProps) {
  const s = size;
  const t = 1.5; // stroke thickness

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* Top-left */}
      <svg
        className="absolute left-0 top-0"
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        fill="none"
      >
        <path d={`M${s} ${t/2}H${t/2}V${s}`} stroke={color} strokeWidth={t} />
      </svg>
      {/* Top-right */}
      <svg
        className="absolute right-0 top-0"
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        fill="none"
      >
        <path d={`M0 ${t/2}H${s - t/2}V${s}`} stroke={color} strokeWidth={t} />
      </svg>
      {/* Bottom-left */}
      <svg
        className="absolute bottom-0 left-0"
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        fill="none"
      >
        <path d={`M${s} ${s - t/2}H${t/2}V0`} stroke={color} strokeWidth={t} />
      </svg>
      {/* Bottom-right */}
      <svg
        className="absolute bottom-0 right-0"
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        fill="none"
      >
        <path d={`M0 ${s - t/2}H${s - t/2}V0`} stroke={color} strokeWidth={t} />
      </svg>
    </div>
  );
}
