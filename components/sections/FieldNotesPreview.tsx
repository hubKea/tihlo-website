import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import { FIELD_NOTES_PREVIEW } from '@/lib/constants';

export default function FieldNotesPreview() {
  return (
    <section className="bg-[var(--paper-2)] px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-site">
        <FadeUp className="mb-12 flex items-end justify-between">
          <div>
            <Eyebrow className="mb-5">§ Field Notes</Eyebrow>
            <h2 className="font-display text-[clamp(36px,4.6vw,58px)] font-medium leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
              From the corridors.
            </h2>
          </div>
          <Link
            href="/field-notes"
            className="hidden items-center gap-2 mono-label text-[var(--muted)] hover:text-[var(--ink)] transition-colors lg:flex"
          >
            All field notes <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </FadeUp>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] border border-[var(--rule)] lg:grid-cols-3">
          {FIELD_NOTES_PREVIEW.map((note, i) => (
            <FadeUp key={note.href} delay={i * 0.08}>
              <Link
                href={note.href}
                className="group block bg-[var(--paper-2)] px-8 py-10 transition-colors hover:bg-[var(--paper)]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="mono-id text-[var(--red)]">{note.index}</span>
                  <span className="mono-id text-[var(--dim)]">{note.date}</span>
                </div>
                <h3 className="mb-3 font-display text-xl font-medium leading-[1.15] tracking-[-0.025em] text-[var(--ink)]">
                  {note.headline}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-[var(--muted)]">{note.subtitle}</p>
                <div className="flex items-center gap-2 mono-label text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
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

        <div className="mt-6 lg:hidden">
          <Link
            href="/field-notes"
            className="flex items-center gap-2 mono-label text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            All field notes <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
