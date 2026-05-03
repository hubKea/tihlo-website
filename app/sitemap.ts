import type { MetadataRoute } from 'next';
import { getAllFieldNotes } from '@/lib/field-notes';

const BASE_URL = 'https://tihlo.co.za';
const SITE_LAST_MODIFIED = new Date('2026-05-03');
const MONTHS: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

function noteDate(date: string) {
  const [month, year] = date.split(' ');
  const monthIndex = MONTHS[month];

  if (monthIndex === undefined || !year) return SITE_LAST_MODIFIED;

  return new Date(Date.UTC(Number(year), monthIndex, 1));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getAllFieldNotes();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/how-we-operate`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/sectors`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/field-notes`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: SITE_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.9 },
  ];

  const noteRoutes: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${BASE_URL}/field-notes/${note.slug}`,
    lastModified: noteDate(note.date),
    changeFrequency: 'never' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...noteRoutes];
}
