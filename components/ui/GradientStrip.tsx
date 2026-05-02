export default function GradientStrip({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-[3px] w-full ${className}`}
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, var(--ink) 20%, var(--red) 50%, var(--ink) 80%, transparent 100%)',
      }}
      aria-hidden="true"
    />
  );
}
