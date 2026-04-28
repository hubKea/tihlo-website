import Link from 'next/link';
import TihloLogo from '@/components/ui/TihloLogo';
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
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[var(--ink)] text-white/65">
      <div className="mx-auto max-w-site px-6 py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <TihloLogo size={28} light />
              <span className="font-display text-[13px] font-semibold tracking-[0.22em] text-[var(--paper)]">
                TIHLO
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              The active monitoring layer for South African operations — mining, plant, fleet,
              and weighbridge.
            </p>
            <p className="mono-id mt-4 italic text-white/40">{BRAND.slogan}</p>
            <div className="mono-id mt-6 space-y-1 text-white/40">
              <p>{BRAND.address}</p>
              <p>Tel: {BRAND.phone}</p>
              <p>{BRAND.email}</p>
            </div>
          </div>

          {/* Operations */}
          <div>
            <p className="mono-label mb-5 text-white/45">Operations</p>
            <ul className="space-y-3">
              {OPERATIONS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/65 transition-colors hover:text-[var(--paper)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm */}
          <div>
            <p className="mono-label mb-5 text-white/45">Firm</p>
            <ul className="space-y-3">
              {FIRM_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/65 transition-colors hover:text-[var(--paper)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="mono-label mb-5 text-white/45">Legal</p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/65 transition-colors hover:text-[var(--paper)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="mono-id text-white/35">
            © {year} TIHLO. Independent. South Africa.
          </p>
          <p className="mono-id text-white/35">All corridors monitored. All records signed.</p>
        </div>
      </div>
    </footer>
  );
}
