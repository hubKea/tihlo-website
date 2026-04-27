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
      {/* Hero */}
      <section className="bg-[var(--paper)] px-6 pb-16 pt-36 lg:px-12 lg:pt-48">
        <div className="mx-auto max-w-site">
          <FadeUp>
            <Eyebrow className="mb-6">§ Field Notes</Eyebrow>
            <h1 className="mb-6 font-display text-[clamp(52px,8vw,108px)] font-medium leading-[0.92] tracking-[-0.05em] text-[var(--ink)]">
              From the<br />
              <em className="not-italic text-[var(--red)]">corridors.</em>
            </h1>
            <p className="max-w-xl text-[18px] leading-[1.65] text-[var(--muted)]">
              Operational intelligence from active monitoring across South African mining
              logistics. No product news. No opinion pieces. What the data shows.
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
