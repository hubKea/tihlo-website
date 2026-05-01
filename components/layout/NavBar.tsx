'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/constants';

function normalizePath(href: string) {
  return href.split('#')[0] || '/';
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState('');
  const pathname = usePathname();

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

  const isActive = (href: string) => {
    const [path, targetHash] = href.split('#');
    const normalizedPath = path || '/';

    if (targetHash) {
      return pathname === normalizedPath && hash === `#${targetHash}`;
    }

    return pathname === normalizePath(href) && !hash;
  };

  return (
    <header className="bg-[var(--white)]/90 fixed left-0 right-0 top-0 z-50 border-b border-[var(--faint)] backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-[1400px] items-center gap-8 px-6 lg:px-12"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="TIHLO home"
        >
          <Image
            src="/images/tihlo_logo.png"
            alt="TIHLO"
            width={325}
            height={84}
            priority
            className="h-7 w-auto"
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
                      ? 'text-[var(--ink)]'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--ink)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex-1" />

        <div className="hidden lg:block">
          <Button variant="primary" size="sm" href="/contact">
            Request a briefing
          </Button>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl text-[var(--ink)] transition-colors hover:bg-[var(--white-3)] lg:hidden"
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
          className="border-t border-[var(--faint)] bg-[var(--white)] px-6 py-6 lg:hidden"
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
                          ? 'bg-[var(--white-3)] text-[var(--ink)]'
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

            <div className="mt-5 border-t border-[var(--faint)] pt-5">
              <Button href="/contact" className="w-full justify-center">
                Request a briefing
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
