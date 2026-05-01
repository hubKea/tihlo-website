import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--white)] px-6 text-center">
      <Image
        src="/images/tihlo_logo.png"
        alt="TIHLO"
        width={325}
        height={84}
        className="mb-10 h-auto w-36 opacity-70"
      />
      <p className="mono-id mb-4 text-[var(--ink)]">404</p>
      <h1 className="mb-4 font-display text-5xl font-semibold tracking-[-0.04em] text-[var(--ink)] lg:text-7xl">
        Not found.
      </h1>
      <p className="mb-8 text-[17px] text-[var(--muted)]">
        This corridor does not exist in our records.
      </p>
      <Link
        href="/"
        className="mono-label text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--ink)] hover:underline"
      >
        Return to base
      </Link>
    </div>
  );
}
