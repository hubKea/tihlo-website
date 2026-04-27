import type { MetadataRoute } from 'next';
import { getAllFieldNotes } from '@/lib/field-notes';

const BASE_URL = 'https://tihlo.co.za';

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getAllFieldNotes();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/how-we-operate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/sectors`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/field-notes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.9 },
  ];

  const noteRoutes: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${BASE_URL}/field-notes/${note.slug}`,
    lastModified: new Date(),
    changeFrequency: 'never' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...noteRoutes];
}
