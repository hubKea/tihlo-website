import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getFieldNote, getAllFieldNotes } from '@/lib/field-notes';
import FadeUp from '@/components/motion/FadeUp';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const notes = getAllFieldNotes();
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getFieldNote(params.slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.excerpt,
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-12 mb-5 font-display text-2xl font-medium leading-[1.2] tracking-[-0.025em] text-[var(--ink)]" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 mb-4 font-display text-xl font-medium leading-[1.2] tracking-[-0.02em] text-[var(--ink)]" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 text-[17px] leading-[1.7] text-[var(--muted)]" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-6 space-y-2 pl-0" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex items-start gap-3 text-[16px] leading-[1.65] text-[var(--muted)]">
      <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-[var(--red)]" />
      <span {...props} />
    </li>
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-8 border-l-2 border-[var(--red)] pl-6 font-display text-xl font-medium leading-[1.3] tracking-[-0.02em] text-[var(--ink)]"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-[var(--rule)]" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-[var(--ink)]" {...props} />
  ),
};

export default function FieldNotePage({ params }: Props) {
  const note = getFieldNote(params.slug);
  if (!note) notFound();

  const allNotes = getAllFieldNotes();
  const currentIndex = allNotes.findIndex((n) => n.slug === params.slug);
  const prev = allNotes[currentIndex + 1] ?? null;
  const next = allNotes[currentIndex - 1] ?? null;

  return (
    <>
      {/* Header */}
      <section className="bg-[var(--paper)] px-6 pb-0 pt-36 lg:px-12 lg:pt-48">
        <div className="mx-auto max-w-site">
          <FadeUp>
            <Link
              href="/field-notes"
              className="mono-label mb-10 flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            >
              <ArrowLeft size={12} strokeWidth={1.5} />
              All field notes
            </Link>

            <div className="mb-6 flex items-center gap-5">
              <span className="mono-id text-[var(--red)]">{note.index}</span>
              <span className="mono-id text-[var(--dim)]">{note.date}</span>
              <span className="mono-id text-[var(--dim)]">{note.readingTime}</span>
            </div>

            <h1 className="mb-4 font-display text-[clamp(36px,5.6vw,72px)] font-medium leading-[0.96] tracking-[-0.04em] text-[var(--ink)]">
              {note.title}
            </h1>
            <p className="max-w-2xl text-[18px] leading-[1.55] text-[var(--muted)]">{note.subtitle}</p>
          </FadeUp>
        </div>
      </section>

      {/* Hero image */}
      <div className="relative mx-auto mt-12 max-w-site px-6 lg:px-12">
        <div className="relative aspect-[16/7] overflow-hidden">
          <Image
            src={note.heroImage}
            alt={note.title}
            fill
            quality={85}
            priority
            className="object-cover"
            sizes="(max-width: 1360px) 100vw, 1360px"
          />
          <div className="absolute inset-0 bg-[var(--ink)]/15" />
        </div>
      </div>

      {/* Article body */}
      <article className="mx-auto max-w-[72ch] px-6 py-16 lg:px-0 lg:py-20">
        <MDXRemote source={note.content} components={mdxComponents} />

        {/* Published-document tail */}
        <div className="mt-16">
          <span className="block h-[2px] w-full bg-[var(--red)]" />
          <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="space-y-4">
              <div>
                <p className="mono-label mb-2 text-[var(--muted)]">Filed under</p>
                <div className="flex flex-wrap gap-2">
                  {['Active monitoring', 'Field operations', 'Evidence-grade'].map((t) => (
                    <span
                      key={t}
                      className="mono-id border border-[var(--rule-2)] px-3 py-1.5 text-[var(--ink)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mono-label mb-2 text-[var(--muted)]">Written by</p>
                <p className="mono-id text-[var(--ink)]">
                  TIHLO FIELD OPERATIONS · MPUMALANGA
                </p>
              </div>
            </div>
            <p className="mono-id text-right text-[var(--red)]">§ END</p>
          </div>
        </div>
      </article>

      {/* Navigation */}
      <section className="border-t border-[var(--rule)] bg-[var(--paper-2)] px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-site">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {prev && (
              <Link href={`/field-notes/${prev.slug}`} className="group flex flex-col gap-2 border border-[var(--rule)] p-6 hover:border-[var(--ink)] transition-colors">
                <div className="flex items-center gap-2 mono-id text-[var(--muted)]">
                  <ArrowLeft size={11} strokeWidth={1.5} />
                  Previous note
                </div>
                <p className="font-display font-medium text-[var(--ink)] leading-tight">{prev.title}</p>
              </Link>
            )}
            {next && (
              <Link href={`/field-notes/${next.slug}`} className="group flex flex-col items-end gap-2 border border-[var(--rule)] p-6 hover:border-[var(--ink)] transition-colors lg:col-start-2">
                <div className="flex items-center gap-2 mono-id text-[var(--muted)]">
                  Next note
                  <ArrowRight size={11} strokeWidth={1.5} />
                </div>
                <p className="font-display font-medium text-[var(--ink)] text-right leading-tight">{next.title}</p>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--ink)] px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-site">
          <FadeUp className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-display text-2xl font-medium leading-tight text-[var(--paper)] max-w-md">
              Recognise patterns from your operation?
            </p>
            <Button variant="white" href="/contact">
              Request a briefing
            </Button>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
