export type LedeSegment =
  | string
  | { kind: 'claim'; text: string }
  | { kind: 'stance'; text: string };

type Tone = 'light' | 'dark' | 'red';

interface LedeProps {
  segments: readonly LedeSegment[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  tone?: Tone;
}

const SIZES = {
  sm: 'text-[14px] leading-[1.62]',
  md: 'text-[15px] leading-[1.65]',
  lg: 'text-[17px] leading-[1.65]',
};

const BASE: Record<Tone, string> = {
  light: 'text-[var(--muted)]',
  dark: 'text-white/75',
  red: 'text-white/75',
};

const CLAIM: Record<Tone, string> = {
  light: 'font-medium text-[var(--ink)]',
  dark: 'font-medium text-white',
  red: 'font-medium text-white',
};

const STANCE: Record<Tone, string> = {
  light: 'text-[var(--red)]',
  dark: 'text-[var(--red)]',
  red: 'text-white font-medium underline decoration-white/40 underline-offset-4',
};

export default function Lede({
  segments,
  className = '',
  size = 'md',
  tone = 'light',
}: LedeProps) {
  return (
    <p className={`${SIZES[size]} ${BASE[tone]} ${className}`}>
      {segments.map((seg, i) => {
        if (typeof seg === 'string') {
          return <span key={i}>{seg}</span>;
        }
        if (seg.kind === 'claim') {
          return (
            <span key={i} className={CLAIM[tone]}>
              {seg.text}
            </span>
          );
        }
        if (seg.kind === 'stance') {
          return (
            <span key={i} className={STANCE[tone]}>
              {seg.text}
            </span>
          );
        }
        return null;
      })}
    </p>
  );
}
