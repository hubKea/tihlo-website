interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export default function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--muted)] ${className}`}
    >
      <span className="block h-px w-5 bg-[var(--ink)]" />
      {children}
    </span>
  );
}
