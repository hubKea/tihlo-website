'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/motion/MagneticButton';
import { NAV_LINKS } from '@/lib/constants';

function normalizePath(href: string) {
  return href.split('#')[0] || '/';
}

// Pages whose hero section has a dark (--ink) background
const darkHeroRoutes = ['/field-notes', '/about'];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const pathname = usePathname();
  const hasDarkHero = darkHeroRoutes.includes(pathname);
  const navOverDark = hasDarkHero ? overDark || !scrolled : false;

  useEffect(() => {
    function syncHash() {
      setHash(window.location.hash);
    }

    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);

      if (darkHeroRoutes.includes(pathname)) {
        const heroEnd = window.innerHeight * 0.85;
        setOverDark(window.scrollY < heroEnd);
      } else {
        setOverDark(false);
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const isActive = (href: string) => {
    const [path, targetHash] = href.split('#');
    const normalizedPath = path || '/';

    if (targetHash) {
      return pathname === normalizedPath && hash === `#${targetHash}`;
    }

    return pathname === normalizePath(href) && !hash;
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        navOverDark
          ? scrolled
            ? 'border-b border-[rgba(250,250,248,0.1)] bg-[rgba(14,16,20,0.9)] backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.3)]'
            : 'border-b border-transparent bg-transparent'
          : scrolled
            ? 'border-b border-[var(--faint)] bg-[rgba(250,250,248,0.92)] backdrop-blur-xl shadow-[0_1px_12px_rgba(14,16,20,0.06)]'
            : 'border-b border-transparent bg-[rgba(250,250,248,0.92)] backdrop-blur-xl'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1400px] items-center gap-8 px-6 lg:px-12"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="TIHLO home"
        >
          {/* TODO: Replace invert filter with proper white logo asset when available */}
          <Image
            src="/images/tihlo_logo.png"
            alt="TIHLO"
            width={325}
            height={84}
            priority
            className={`h-7 w-auto transition-all duration-300 ${navOverDark ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative inline-flex py-2 text-[13.5px] font-medium transition-colors ${
                    active
                      ? navOverDark
                        ? 'text-white'
                        : 'text-[var(--ink)]'
                      : navOverDark
                        ? 'text-[rgba(250,250,248,0.6)] hover:text-white'
                        : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {active && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-px ${
                        navOverDark ? 'bg-white' : 'bg-[var(--ink)]'
                      }`}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex-1" />

        <div className="hidden lg:block">
          <MagneticButton>
            <Button
              variant={navOverDark ? 'white' : 'primary'}
              size="sm"
              href="/contact"
            >
              Request a briefing
            </Button>
          </MagneticButton>
        </div>

        <button
          type="button"
          className={`ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors lg:hidden ${
            navOverDark
              ? 'border-[rgba(250,250,248,0.2)] bg-transparent text-white hover:bg-[rgba(250,250,248,0.1)]'
              : 'border-[var(--faint)] bg-[var(--white)] text-[var(--ink)] hover:bg-[var(--white-3)]'
          }`}
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? (
            <X size={20} strokeWidth={1.5} />
          ) : (
            <Menu size={20} strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          className={`border-t px-6 py-6 lg:hidden ${
            navOverDark
              ? 'border-[rgba(250,250,248,0.1)] bg-[var(--ink)]'
              : 'border-[var(--faint)] bg-[var(--white)]'
          }`}
        >
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-xl px-3 py-3 text-[15px] font-medium transition-colors ${
                        active
                          ? navOverDark
                            ? 'bg-[rgba(250,250,248,0.1)] text-white'
                            : 'bg-[var(--white-3)] text-[var(--ink)]'
                          : navOverDark
                            ? 'text-[rgba(250,250,248,0.6)] hover:bg-[rgba(250,250,248,0.1)] hover:text-white'
                            : 'text-[var(--muted)] hover:bg-[var(--white-3)] hover:text-[var(--ink)]'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div
              className={`mt-5 border-t pt-5 ${
                navOverDark
                  ? 'border-[rgba(250,250,248,0.1)]'
                  : 'border-[var(--faint)]'
              }`}
            >
              <Button
                href="/contact"
                variant={navOverDark ? 'white' : 'primary'}
                className="w-full justify-center"
              >
                Request a briefing
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
