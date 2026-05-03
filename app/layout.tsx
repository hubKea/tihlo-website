import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import PageTransitionScan from '@/components/motion/PageTransitionScan';
import ReticleCursor from '@/components/motion/ReticleCursor';

export const metadata: Metadata = {
  metadataBase: new URL('https://tihlo.co.za'),
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
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TIHLO — The eye that never misses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0e1014',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <NavBar />
        <PageTransitionScan />
        <main className="w-full max-w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <ReticleCursor />
        <Analytics />
      </body>
    </html>
  );
}
