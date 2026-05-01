import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import LiveOpsMarquee from '@/components/sections/LiveOpsMarquee';
import WhatWeMonitor from '@/components/sections/WhatWeMonitor';
import SectorStrip from '@/components/sections/SectorStrip';
import HowItWorks from '@/components/sections/HowItWorks';
import WhyTihlo from '@/components/sections/WhyTihlo';
import ControlRoomStack from '@/components/sections/ControlRoomStack';
import ByTheNumbers from '@/components/sections/ByTheNumbers';

export const metadata: Metadata = {
  title: 'TIHLO — The eye that never misses',
  description:
    'TIHLO operates the active monitoring layer for South African operations. Detect fuel loss, asset misuse, commodity leakage, contractor risk and movement exceptions before they become accepted cost.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LiveOpsMarquee />
      <WhatWeMonitor />
      <SectorStrip />
      <HowItWorks />
      <WhyTihlo />
      <ControlRoomStack />
      <ByTheNumbers />
    </>
  );
}
