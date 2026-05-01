import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import MaskHeading from '@/components/motion/MaskHeading';
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
      <section className="relative isolate overflow-hidden border-b border-[var(--faint)] bg-[var(--white)] px-6 pb-20 pt-24 lg:px-12 lg:py-32">
        <div className="relative z-10 mx-auto max-w-site">
          <FadeUp className="max-w-3xl">
            <Eyebrow>A TIHLO publication</Eyebrow>
            <h1 className="mt-8 font-display text-[clamp(48px,7vw,92px)] font-medium leading-[0.94] tracking-[-0.045em] text-[var(--ink)]">
              <MaskHeading immediate>Field Notes.</MaskHeading>
            </h1>
            <p className="mt-8 max-w-xl text-[17px] leading-[1.65] text-[var(--muted)]">
              Operational intelligence from active monitoring across South
              African logistics corridors. No product news. No opinion pieces.
              What the data shows.
            </p>
            <p className="mono-id mt-8 border-t border-[var(--faint)] pt-5 text-[var(--dim)]">
              VOLUME 01 · {new Date().getFullYear()} ·{' '}
              {notes.length.toString().padStart(2, '0')} ENTRIES
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Notes grid */}
      <section className="relative isolate overflow-hidden bg-[var(--white)] px-6 pb-24 lg:px-12 lg:pb-32">
        <div className="relative z-10 mx-auto max-w-site">
          <div className="grid grid-cols-1 gap-px border border-[var(--faint)] bg-[var(--faint)] lg:grid-cols-2">
            {notes.map((note, i) => (
              <FadeUp key={note.slug} delay={i * 0.06}>
                <Link
                  href={`/field-notes/${note.slug}`}
                  className="group block border-l-2 border-transparent bg-[var(--white)] px-8 py-10 transition-colors hover:border-[var(--dim)] hover:bg-[var(--white-2)]"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="mono-id text-[var(--ink)]">
                      {note.index}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="mono-id text-[var(--dim)]">
                        {note.readingTime}
                      </span>
                      <span className="mono-id text-[var(--dim)]">
                        {note.date}
                      </span>
                    </div>
                  </div>
                  <h2 className="mb-3 font-display text-2xl font-semibold leading-[1.15] tracking-[-0.025em] text-[var(--ink)]">
                    {note.title}
                  </h2>
                  <p className="mono-label mb-3 text-[var(--muted)]">
                    {note.subtitle}
                  </p>
                  <p className="mb-8 text-sm leading-relaxed text-[var(--muted)]">
                    {note.excerpt}
                  </p>
                  <div className="mono-label flex items-center gap-2 text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
                    Read note
                    <ArrowRight
                      size={12}
                      strokeWidth={1.5}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
