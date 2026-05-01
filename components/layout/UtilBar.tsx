import Link from 'next/link';
import { BRAND } from '@/lib/constants';

export default function UtilBar() {
  return (
    <div className="hidden bg-[var(--ink)] text-white/72 lg:block">
      <div className="mx-auto flex max-w-site items-center justify-between px-10 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em]">
        <div className="flex items-center gap-5">
          <span>Pretoria, South Africa</span>
          <span className="text-white/30">·</span>
          <span>Active monitoring across South Africa</span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href={`tel:${BRAND.phone}`}
            className="tabular-nums transition-colors hover:text-white"
          >
            {BRAND.phone}
          </Link>
          <span className="text-white/30">·</span>
          <Link
            href={`mailto:${BRAND.email}`}
            className="transition-colors hover:text-white"
          >
            {BRAND.email}
          </Link>
        </div>
      </div>
    </div>
  );
}
