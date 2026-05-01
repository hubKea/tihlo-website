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
        url: '/images/tihlo_footer_logo.png',
        width: 680,
        height: 520,
        alt: 'TIHLO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/tihlo_footer_logo.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
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

