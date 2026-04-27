import Link from 'next/link';
import TihloLogo from '@/components/ui/TihloLogo';
import { BRAND, NAV_LINKS } from '@/lib/constants';

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
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--paper-2)]">
      <div className="mx-auto max-w-site px-6 py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <TihloLogo size={24} />
              <span className="font-display text-[13px] font-semibold tracking-[0.22em] text-[var(--ink)]">
                TIHLO
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--muted)] max-w-xs">
              The active monitoring layer for mining fleets, yellow plant and weighbridges across South Africa.
            </p>
            <p className="mt-4 mono-id text-[var(--dim)] italic">
              {BRAND.slogan}
            </p>
            <div className="mt-6 mono-id text-[var(--dim)] space-y-1">
              <p>{BRAND.address}</p>
              <p>Tel: {BRAND.phone}</p>
              <p>{BRAND.email}</p>
            </div>
          </div>

          {/* Operations */}
          <div>
            <p className="mono-label text-[var(--muted)] mb-5">Operations</p>
            <ul className="space-y-3">
              {OPERATIONS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm */}
          <div>
            <p className="mono-label text-[var(--muted)] mb-5">Firm</p>
            <ul className="space-y-3">
              {FIRM_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="mono-label text-[var(--muted)] mb-5">Legal</p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--rule)] pt-8 sm:flex-row sm:items-center">
          <p className="mono-id text-[var(--dim)]">
            © {year} TIHLO. Independent. South Africa.
          </p>
          <p className="mono-id text-[var(--dim)]">
            All corridors monitored. All records signed.
          </p>
        </div>
      </div>
    </footer>
  );
}
