'use client';

import { useEffect, useState } from 'react';
import { UTIL_BAR } from '@/lib/constants';

function useSASTTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString('en-ZA', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Africa/Johannesburg',
        })
      );
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useDriftingCounter(base: number, intervalMs = 2400) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      // drift +1 randomly
      if (Math.random() > 0.3) setCount((c) => c + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [base, intervalMs]);
  return count;
}

export default function UtilBar() {
  const time = useSASTTime();
  const loads = useDriftingCounter(3047);

  return (
    <div className="hidden border-b border-[var(--rule)] bg-[var(--paper-2)] lg:block">
      <div className="mx-auto flex max-w-site items-center justify-between px-12 py-2">
        <div className="mono-id flex items-center gap-6 text-[var(--muted)]">
          <span className="flex items-center gap-2">
            <span className="block h-1.5 w-1.5 rounded-full bg-[var(--green)] pulse-dot-green" />
            {UTIL_BAR.left.status}
          </span>
          <span className="text-[var(--dim)]">·</span>
          <span>{UTIL_BAR.left.corridors}</span>
          <span className="text-[var(--dim)]">·</span>
          <span>{UTIL_BAR.left.location}</span>
          {time && (
            <>
              <span className="text-[var(--dim)]">·</span>
              <span className="tabular-nums">{time} SAST</span>
            </>
          )}
        </div>
        <div className="mono-id flex items-center gap-6 text-[var(--muted)]">
          <span className="tabular-nums">{loads.toLocaleString()} {UTIL_BAR.right.loadsLabel}</span>
          <span className="text-[var(--dim)]">·</span>
          <span>{UTIL_BAR.right.provinces}</span>
        </div>
      </div>
    </div>
  );
}
