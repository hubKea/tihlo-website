import Link from 'next/link';
import TihloLogo from '@/components/ui/TihloLogo';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--paper)] px-6 text-center">
      <TihloLogo size={48} className="mb-8 opacity-30" />
      <p className="mono-id mb-4 text-[var(--red)]">§ 404</p>
      <h1 className="mb-4 font-display text-5xl font-medium tracking-[-0.04em] text-[var(--ink)] lg:text-7xl">
        Not found.
      </h1>
      <p className="mb-8 text-[17px] text-[var(--muted)]">
        This corridor does not exist in our records.
      </p>
      <Link
        href="/"
        className="mono-label text-[var(--muted)] underline-offset-4 hover:text-[var(--ink)] hover:underline transition-colors"
      >
        Return to base
      </Link>
    </div>
  );
}
