import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import LiveOpsMarquee from '@/components/sections/LiveOpsMarquee';
import WhatWeMonitor from '@/components/sections/WhatWeMonitor';
import SectorStrip from '@/components/sections/SectorStrip';
import HowItWorks from '@/components/sections/HowItWorks';
import WhyTihlo from '@/components/sections/WhyTihlo';
import Interstitial from '@/components/sections/Interstitial';
import ControlRoomStack from '@/components/sections/ControlRoomStack';
import ByTheNumbers from '@/components/sections/ByTheNumbers';
import FinalCTA from '@/components/sections/FinalCTA';
import GradientStrip from '@/components/ui/GradientStrip';

export const metadata: Metadata = {
  title: 'TIHLO — The eye that never misses',
  description:
    'TIHLO operates the active monitoring layer for South African operations. Detect fuel loss, asset misuse, commodity leakage, contractor risk and movement exceptions before they become accepted cost.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <GradientStrip />
      <LiveOpsMarquee />
      <WhatWeMonitor />
      <SectorStrip />
      <HowItWorks />
      <WhyTihlo />
      <Interstitial />
      <ControlRoomStack />
      <ByTheNumbers />
      <FinalCTA />
      <GradientStrip />
    </>
  );
}
