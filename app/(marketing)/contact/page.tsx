import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Request a briefing with TIHLO. Engagements begin with a 30-minute scoped conversation — no fee. We assess your operation and identify the highest-risk control gaps.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
