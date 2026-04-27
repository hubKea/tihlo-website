import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_DIR = path.join(process.cwd(), 'content/field-notes');

export interface FieldNote {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  excerpt: string;
  heroImage: string;
  readingTime: string;
  index: string;
  content: string;
}

export function getAllFieldNotes(): FieldNote[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
      const { data, content } = matter(raw);
      const rt = readingTime(content);

      return {
        slug,
        title: data.title as string,
        subtitle: data.subtitle as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        heroImage: data.heroImage as string,
        readingTime: rt.text,
        index: data.index as string,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFieldNote(slug: string): FieldNote | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: data.title as string,
    subtitle: data.subtitle as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    heroImage: data.heroImage as string,
    readingTime: rt.text,
    index: data.index as string,
    content,
  };
}
