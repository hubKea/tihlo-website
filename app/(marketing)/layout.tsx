import ScrollRadar from '@/components/layout/ScrollRadar';
import TihloSeal from '@/components/ui/TihloSeal';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollRadar />
      {children}
      <TihloSeal />
    </>
  );
}
