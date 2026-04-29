'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import TihloLogo from '@/components/ui/TihloLogo';
import Button from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/constants';

// Routes whose hero is dark (light-on-dark surface) — nav inverts here
// while still in the hero region.
const DARK_HERO_ROUTES = ['/', '/contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 80);
      if (DARK_HERO_ROUTES.includes(pathname)) {
        const heroEnd = window.innerHeight * (pathname === '/' ? 0.85 : 0.45);
        setOverDark(y < heroEnd);
      } else {
        setOverDark(false);
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkInactive = overDark ? 'text-white/65' : 'text-[var(--muted)]';
  const linkActive = overDark ? 'text-[var(--paper)]' : 'text-[var(--ink)]';
  const linkHover = overDark ? 'hover:text-[var(--paper)]' : 'hover:text-[var(--ink)]';
  const liveLabel = overDark ? 'text-white/65' : 'text-[var(--muted)]';
  const wordmark = overDark ? 'text-[var(--paper)]' : 'text-[var(--ink)]';

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 flex justify-center ${scrolled ? 'top-3' : 'top-6'}`}
        style={{ transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <nav
          className={`mx-4 flex w-full max-w-site items-center gap-8 border px-6 py-3.5 backdrop-blur-md transition-colors duration-300 lg:mx-8 ${
            overDark
              ? 'border-white/15 bg-[var(--ink)]/72'
              : 'border-[var(--rule-2)] bg-[var(--paper)]/85'
          }`}
          style={{
            boxShadow: overDark ? '0 2px 28px rgba(0,0,0,0.42)' : '0 2px 24px rgba(14,16,20,0.08)',
          }}
        >
          {/* Brand */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="TIHLO home">
            <TihloLogo size={26} light={overDark} />
            <span className={`font-display text-[13px] font-semibold tracking-[0.22em] transition-colors ${wordmark}`}>
              TIHLO
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`mono-label transition-colors ${linkHover} ${isActive ? linkActive : linkInactive} relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-[var(--red)] after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                      isActive ? 'after:scale-x-100' : 'after:scale-x-0'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex-1" />

          {/* Live indicator */}
          <div className="hidden items-center gap-2 lg:flex">
            <span className="block h-1.5 w-1.5 rounded-full bg-[var(--red)] pulse-dot" />
            <span className={`mono-id transition-colors ${liveLabel}`}>LIVE</span>
          </div>

          {/* CTAs — desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="ghost"
              size="sm"
              href="/how-we-operate"
              arrow={false}
              className={overDark ? 'border-white/30 text-white hover:border-[var(--red)] hover:text-[var(--red)]' : ''}
            >
              How we operate
            </Button>
            <Button variant="primary" size="sm" href="/contact">
              Request a briefing
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`ml-auto flex h-9 w-9 items-center justify-center lg:hidden ${overDark ? 'text-[var(--paper)]' : 'text-[var(--ink)]'}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[var(--paper)] pt-24 lg:hidden">
          <div className="flex flex-col px-8 py-8">
            <ul className="flex flex-col gap-6 border-t border-[var(--rule)] pt-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-3xl font-medium tracking-tight text-[var(--ink)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-col gap-3 border-t border-[var(--rule)] pt-8">
              <Button variant="ghost" href="/how-we-operate" arrow={false} className="justify-center">
                How we operate
              </Button>
              <Button variant="primary" href="/contact" className="justify-center">
                Request a briefing
              </Button>
            </div>
            <div className="mono-id mt-8 text-[var(--muted)]">TIHLO · Independent · Pretoria</div>
          </div>
        </div>
      )}
    </>
  );
}
