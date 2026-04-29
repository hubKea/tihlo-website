import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import { getAllFieldNotes } from '@/lib/field-notes';

export const metadata: Metadata = {
  title: 'Field Notes',
  description: 'Operational intelligence from active monitoring across South African mining corridors.',
};

export default function FieldNotesPage() {
  const notes = getAllFieldNotes();

  return (
    <>
      {/* Hero — editorial masthead */}
      <section className="border-b border-[var(--ink)] bg-[var(--paper)] px-6 pb-10 pt-32 lg:px-12 lg:pt-40">
        <div className="mx-auto max-w-site">
          <FadeUp>
            <p className="mono-label mb-8 flex items-center gap-3 text-[var(--red)]">
              <span className="block h-px w-10 bg-[var(--red)]" />
              § A TIHLO publication
            </p>
            <h1 className="font-display font-medium leading-[0.82] tracking-[-0.06em] text-[var(--ink)]" style={{ fontSize: 'clamp(72px, 16vw, 280px)' }}>
              FIELD NOTES<span className="text-[var(--red)]">.</span>
            </h1>
          </FadeUp>
        </div>
        <div className="mx-auto mt-10 max-w-site border-t border-[var(--ink)] pt-6">
          <FadeUp delay={0.1} className="flex flex-wrap items-baseline justify-between gap-6">
            <p className="mono-id text-[var(--ink)]">
              VOLUME 01 · {new Date().getFullYear()} · {notes.length.toString().padStart(2, '0')} ENTRIES
            </p>
            <p className="max-w-xl text-[16px] leading-[1.6] text-[var(--dim)]">
              Operational intelligence from active monitoring across South African logistics
              corridors. No product news. No opinion pieces. What the data shows.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Notes grid */}
      <section className="bg-[var(--paper)] px-6 pb-24 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-site">
          <div className="grid grid-cols-1 gap-px bg-[var(--rule)] border border-[var(--rule)] lg:grid-cols-2">
            {notes.map((note, i) => (
              <FadeUp key={note.slug} delay={i * 0.06}>
                <Link
                  href={`/field-notes/${note.slug}`}
                  className="group block bg-[var(--paper)] px-8 py-10 transition-colors hover:bg-[var(--paper-2)]"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="mono-id text-[var(--red)]">{note.index}</span>
                    <div className="flex items-center gap-4">
                      <span className="mono-id text-[var(--dim)]">{note.readingTime}</span>
                      <span className="mono-id text-[var(--dim)]">{note.date}</span>
                    </div>
                  </div>
                  <h2 className="mb-3 font-display text-2xl font-medium leading-[1.15] tracking-[-0.025em] text-[var(--ink)]">
                    {note.title}
                  </h2>
                  <p className="mb-3 mono-label text-[var(--muted)]">{note.subtitle}</p>
                  <p className="mb-8 text-sm leading-relaxed text-[var(--muted)]">{note.excerpt}</p>
                  <div className="flex items-center gap-2 mono-label text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
                    Read note
                    <ArrowRight size={12} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
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
