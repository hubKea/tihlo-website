interface StatProps {
  label: string;
  value: string;
  className?: string;
}

export default function Stat({ label, value, className = '' }: StatProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="font-display text-[28px] font-medium leading-none tracking-[-0.03em] text-[var(--ink)]">
        {value}
      </span>
      <span className="mt-2 font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-[var(--dim)]">
        {label}
      </span>
    </div>
  );
}
