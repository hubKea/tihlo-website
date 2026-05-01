'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/constants';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="pointer-events-none sticky top-3 z-50 w-full px-4 lg:px-8">
        <div
          className={`bg-white/90 pointer-events-auto mx-auto flex h-16 max-w-[1400px] items-center gap-8 rounded-full border border-[var(--faint)] px-5 backdrop-blur-xl transition-shadow duration-300 lg:px-7 ${
            scrolled
              ? 'shadow-[0_4px_24px_rgba(14,16,20,0.10)]'
              : 'shadow-[0_2px_16px_rgba(14,16,20,0.06)]'
          }`}
        >
          {/* Brand */}
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

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`relative inline-block px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                      isActive
                        ? 'text-[var(--ink)]'
                        : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-px bg-[var(--ink)]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex-1" />

          {/* CTA — desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="primary" size="sm" href="/contact">
              Request a briefing
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="ml-auto flex h-9 w-9 items-center justify-center text-[var(--ink)] lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[var(--white)] pt-20 lg:hidden">
          <div className="flex flex-col px-8 py-8">
            <ul className="flex flex-col gap-6 border-t border-[var(--faint)] pt-8">
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
            <div className="mt-12 flex flex-col gap-3 border-t border-[var(--faint)] pt-8">
              <Button
                variant="ghost"
                href="/how-we-operate"
                arrow={false}
                className="justify-center"
              >
                How we operate
              </Button>
              <Button
                variant="primary"
                href="/contact"
                className="justify-center"
              >
                Request a briefing
              </Button>
            </div>
            <div className="mt-8 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              TIHLO · Independent · Pretoria
            </div>
          </div>
        </div>
      )}
    </>
  );
}
