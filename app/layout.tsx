import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Nav from '@/components/layout/Nav';
import UtilBar from '@/components/layout/UtilBar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'TIHLO — The eye that never misses',
    template: '%s — TIHLO',
  },
  description:
    'TIHLO operates the active monitoring layer for mining fleets, yellow plant and weighbridges across South Africa. 24/7 human controllers. Audit-grade evidence.',
  openGraph: {
    type: 'website',
    siteName: 'TIHLO',
    title: 'TIHLO — The eye that never misses',
    description:
      'Active monitoring and verification for mining commodity movement across South Africa.',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#F4F1EA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <UtilBar />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
