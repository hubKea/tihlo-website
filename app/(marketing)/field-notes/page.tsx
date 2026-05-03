import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import MaskHeading from '@/components/motion/MaskHeading';
import LineSystem from '@/components/motion/LineSystem';
import { getAllFieldNotes } from '@/lib/field-notes';

export const metadata: Metadata = {
  title: 'Field Notes',
  description:
    'Operational intelligence from active monitoring across South African mining corridors.',
};

export default function FieldNotesPage() {
  const notes = getAllFieldNotes();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--ink)] px-6 pb-20 pt-32 lg:px-12 lg:pb-28 lg:pt-40">
        <LineSystem tone="dark" density="standard" anchor="right" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="max-w-3xl">
            <Eyebrow className="text-white/65">A TIHLO publication</Eyebrow>
            <h1 className="mt-8 font-display text-[clamp(48px,7vw,92px)] font-medium leading-[0.94] tracking-[-0.045em] text-white">
              <MaskHeading immediate>Field Notes.</MaskHeading>
            </h1>
            <p className="mt-8 max-w-xl text-[17px] leading-[1.65] text-white/72">
              Operational intelligence from active monitoring across South
              African logistics corridors. No product news. No opinion pieces.
              What the data shows.
            </p>
            <p className="mono-id mt-8 border-t border-white/15 pt-5 text-white/55">
              VOLUME 01 · {new Date().getFullYear()} ·{' '}
              {notes.length.toString().padStart(2, '0')} ENTRIES
            </p>
          </FadeUp>
        </div>
      </section>

      <div
        className="w-full h-[3px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--ink) 20%, var(--red) 50%, var(--ink) 80%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Notes grid */}
      <section className="relative isolate overflow-hidden bg-[var(--white)] px-6 pb-24 pt-20 lg:px-12 lg:pb-32 lg:pt-28">
        <div className="relative z-10 mx-auto max-w-site">
          <div className="grid grid-cols-1 gap-px border border-[var(--faint)] bg-[var(--faint)]">
            {/* Featured first note — full width */}
            {notes.length > 0 && (
              <FadeUp>
                <Link
                  href={`/field-notes/${notes[0].slug}`}
                  className="group relative flex flex-col overflow-hidden bg-[var(--white)] p-10 lg:flex-row lg:items-center lg:gap-16 lg:p-14 transition-colors hover:bg-[var(--white-2)]"
                >
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--ink)] transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex-1">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="mono-id text-[var(--ink)]">{notes[0].index}</span>
                      <span className="mono-id text-[var(--dim)]">{notes[0].readingTime}</span>
                    </div>
                    <h2 className="mb-3 font-display text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--ink)]">
                      {notes[0].title}
                    </h2>
                    <p className="mono-label mb-3 text-[var(--muted)]">{notes[0].subtitle}</p>
                    <p className="max-w-[56ch] text-[15px] leading-relaxed text-[var(--muted)]">
                      {notes[0].excerpt}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[var(--faint)] pt-5 lg:mt-0 lg:flex-col lg:items-end lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                    <span className="mono-id text-[var(--dim)]">{notes[0].date}</span>
                    <span className="font-display text-[64px] font-medium leading-none tracking-[-0.04em] text-[var(--ink)]/8">01</span>
                  </div>
                </Link>
              </FadeUp>
            )}

            {/* Remaining notes */}
            <div className="grid grid-cols-1 gap-px bg-[var(--faint)] md:grid-cols-2">
              {notes.slice(1).map((note, i) => (
                <FadeUp key={note.slug} delay={(i + 1) * 0.06}>
                  <Link
                    href={`/field-notes/${note.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden bg-[var(--white)] px-8 py-10 transition-colors hover:bg-[var(--white-2)]"
                  >
                    {/* Animated top rule on hover */}
                    <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--ink)] transition-transform duration-500 group-hover:scale-x-100" />
                    <div className="mb-8 flex items-center justify-between">
                      <span className="mono-id text-[var(--ink)]">
                        {note.index}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="mono-id text-[var(--dim)]">
                          {note.readingTime}
                        </span>
                      </div>
                    </div>
                    <h2 className="mb-3 font-display text-[22px] font-semibold leading-[1.18] tracking-[-0.025em] text-[var(--ink)]">
                      {note.title}
                    </h2>
                    <p className="mono-label mb-3 text-[var(--muted)]">
                      {note.subtitle}
                    </p>
                    <p className="mb-8 text-sm leading-relaxed text-[var(--muted)]">
                      {note.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-[var(--faint)] pt-5">
                      <span className="mono-id text-[var(--dim)]">
                        {note.date}
                      </span>
                      <span className="mono-label flex items-center gap-2 text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
                        Read note
                        <ArrowRight
                          size={12}
                          strokeWidth={1.5}
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
