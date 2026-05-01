interface MonoStampProps {
  label: string;
  status?: 'red' | 'green' | 'amber';
  pulse?: boolean;
  light?: boolean;
  className?: string;
}

const statusColors = {
  red: {
    bg: 'bg-[var(--ink)]',
    text: 'text-[var(--white)]',
    dot: 'bg-[var(--ink)]',
  },
  green: {
    bg: 'bg-[var(--green)]',
    text: 'text-[var(--white)]',
    dot: 'bg-[var(--green)] pulse-dot-green',
  },
  amber: {
    bg: 'bg-[var(--amber)]',
    text: 'text-[var(--white)]',
    dot: 'bg-[var(--amber)]',
  },
};

export default function MonoStamp({
  label,
  status = 'red',
  pulse = true,
  light = false,
  className = '',
}: MonoStampProps) {
  const colors = statusColors[status];

  return (
    <div
      className={`mono-id inline-flex items-center gap-2 px-2.5 py-1.5 ${
        light
          ? 'text-white/70 bg-black/30 backdrop-blur-sm'
          : 'bg-[var(--ink)] text-[var(--white)]'
      } ${className}`}
    >
      <span
        className={`block h-1.5 w-1.5 rounded-full ${
          light ? 'bg-white/70' : colors.dot
        } ${pulse ? (status === 'green' ? 'pulse-dot-green' : 'pulse-dot') : ''}`}
      />
      {label}
    </div>
  );
}
