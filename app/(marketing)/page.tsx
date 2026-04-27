import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import LiveOpsMarquee from '@/components/sections/LiveOpsMarquee';
import FrameIntro from '@/components/sections/FrameIntro';
import ActScene from '@/components/sections/ActScene';
import Interstitial from '@/components/sections/Interstitial';
import SectorStrip from '@/components/sections/SectorStrip';
import FieldNotesPreview from '@/components/sections/FieldNotesPreview';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'TIHLO — The eye that never misses',
  description:
    'TIHLO operates the active monitoring layer for mining fleets, yellow plant and weighbridges. 24/7 human controllers. Audit-grade evidence.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LiveOpsMarquee />
      <FrameIntro />
      <ActScene />
      <Interstitial />
      <SectorStrip />
      <FieldNotesPreview />
      <FinalCTA />
    </>
  );
}
