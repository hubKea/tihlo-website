import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import WhatWeMonitor from '@/components/sections/WhatWeMonitor';
import HowItWorks from '@/components/sections/HowItWorks';
import WhyTihlo from '@/components/sections/WhyTihlo';
import ByTheNumbers from '@/components/sections/ByTheNumbers';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'TIHLO — The eye that never misses',
  description:
    'TIHLO operates the active monitoring layer for South African operations. Detect fuel loss, asset misuse, commodity leakage, contractor risk and movement exceptions before they become accepted cost.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeMonitor />
      <HowItWorks />
      <WhyTihlo />
      <ByTheNumbers />
      <FinalCTA />
    </>
  );
}
