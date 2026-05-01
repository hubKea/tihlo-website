import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';

const OPERATIONS = [
  { label: 'How we operate', href: '/how-we-operate' },
  { label: 'Services', href: '/services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Field Notes', href: '/field-notes' },
];

const FIRM_LINKS = [
  { label: 'About TIHLO', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Request a briefing', href: '/contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'POPIA', href: '/legal/popia' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--faint)] bg-[var(--white-2)]">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">


        {/* Columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/images/tihlo_footer_logo.png"
              alt="TIHLO"
              width={680}
              height={520}
              className="mb-7 h-auto w-36 sm:w-44"
            />
            <p className="max-w-xs text-[14px] leading-relaxed text-[var(--muted)]">
              The active monitoring layer for South African operations — mining,
              plant, fleet, and weighbridge.
            </p>
            <div className="mt-6 space-y-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-[var(--dim)]">
              <p>{BRAND.address}</p>
              <p>Tel: {BRAND.phone}</p>
              <p>{BRAND.email}</p>
            </div>
          </div>

          <div>
            <p className="mb-5 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--dim)]">
              Operations
            </p>
            <ul className="space-y-3">
              {OPERATIONS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-[var(--muted)] transition-colors hover:text-[var(--red)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--dim)]">
              Firm
            </p>
            <ul className="space-y-3">
              {FIRM_LINKS.map((l) => (
                <li key={`${l.href}-${l.label}`}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-[var(--muted)] transition-colors hover:text-[var(--red)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--dim)]">
              Legal
            </p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-[var(--muted)] transition-colors hover:text-[var(--red)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--faint)] pt-6 sm:flex-row sm:items-center">
          <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-[var(--dim)]">
            © TIHLO · A Thinkers Afrika company
          </span>
          <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-[var(--dim)]">
            Pretoria · South Africa
          </span>
        </div>
      </div>
    </footer>
  );
}
