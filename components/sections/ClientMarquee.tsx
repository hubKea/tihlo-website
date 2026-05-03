import { ReactNode } from 'react';

export default function ClientMarquee() {
  const items = [
    'SECURING TIER-1 COAL CORRIDORS',
    'NATIONAL CHROME LOGISTICS',
    'CROSS-BORDER MANGANESE',
    'YELLOW PLANT OVERSIGHT',
    'AGRI-BULK VERIFICATION',
    'COPPER ROUTE INTEGRITY',
  ];

  return (
    <div className="relative flex overflow-hidden border-b border-[var(--faint)] bg-[var(--white)] py-3.5">
      {/* Gradient masks for smooth fade-in/fade-out at edges */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-[var(--white)] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-[var(--white)] to-transparent" />

      {/* The scrolling container */}
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {/* We duplicate the array twice to ensure seamless looping when it translates -50% */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {items.map((item, j) => (
              <span
                key={`${i}-${j}`}
                className="flex items-center font-mono text-[10.5px] font-semibold tracking-[0.22em] text-[var(--dim)]"
              >
                {item}
                <span className="mx-8 block h-[3px] w-[3px] rounded-full bg-[var(--faint)]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
