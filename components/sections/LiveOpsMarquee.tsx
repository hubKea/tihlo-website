'use client';

import { useEffect, useState } from 'react';

const PROVINCES = ['MPU', 'LIM', 'NCP', 'GAU', 'NWP'];
const SECTORS = ['COAL', 'CHR', 'MNG', 'IRO', 'CPR', 'AGR'];
const STATES = [
  'LOAD VERIFIED',
  'ROUTE OK',
  'GATE CLEARED',
  '3PT HANDSHAKE',
  'OFFLOAD CONFIRMED',
  'GEOFENCE OK',
  'BASELINE OK',
  'EXCEPTION',
] as const;

type Item = {
  id: string;
  province: string;
  sector: string;
  state: (typeof STATES)[number];
  ts: string;
};

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function buildItems(seedSeconds: number): Item[] {
  const items: Item[] = [];
  for (let i = 0; i < 18; i++) {
    const province = PROVINCES[i % PROVINCES.length];
    const sector = SECTORS[(i * 3) % SECTORS.length];
    const state = i % 11 === 0 ? 'EXCEPTION' : STATES[(i * 5) % (STATES.length - 1)];
    const total = Math.max(0, seedSeconds - i * 17);
    const h = Math.floor(total / 3600) % 24;
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    items.push({
      id: `THI${String(3 + i * 2).padStart(3, '0')}`,
      province,
      sector,
      state,
      ts: `${pad(h)}:${pad(m)}:${pad(s)}`,
    });
  }
  return items;
}

// Deterministic SSR seed so hydration matches; live seed kicks in after mount.
const SSR_SEED_SECONDS = 14 * 3600 + 38 * 60 + 22; // 14:38:22 — purely cosmetic placeholder

export default function LiveOpsMarquee() {
  const [items, setItems] = useState<Item[]>(() => buildItems(SSR_SEED_SECONDS));

  useEffect(() => {
    function tick() {
      const now = new Date();
      const seedSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      setItems(buildItems(seedSeconds));
    }
    tick();
    const id = setInterval(tick, 4000);
    return () => clearInterval(id);
  }, []);

  const doubled = [...items, ...items];

  return (
    <section
      aria-label="Live operations feed"
      className="relative overflow-hidden border-y border-[var(--faint)] bg-[var(--ink)] py-3"
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[var(--ink)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[var(--ink)] to-transparent" />

      {/* Status pip */}
      <div className="pointer-events-none absolute left-4 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2">
        <span className="block h-1.5 w-1.5 rounded-full bg-[var(--green)] pulse-dot-green" />
        <span className="mono-id text-white/75">LIVE OPS</span>
      </div>

      <div className="flex w-max animate-marquee gap-10 pl-44">
        {doubled.map((item, i) => {
          const isException = item.state === 'EXCEPTION';
          return (
            <div
              key={`${item.id}-${i}`}
              className="mono-id flex shrink-0 items-center gap-3 text-white/75"
            >
              <span className="text-white/40"></span>
              <span className="tabular-nums text-white/90">{item.id}</span>
              <span className="text-white/30">·</span>
              <span className="text-white/70">{item.sector}</span>
              <span className="text-white/30">·</span>
              <span
                className={`flex items-center gap-1.5 ${
                  isException ? 'text-[var(--amber)]' : 'text-white/70'
                }`}
              >
                <span
                  className={`block h-1 w-1 rounded-full ${
                    isException ? 'bg-[var(--amber)]' : 'bg-[var(--green)]'
                  }`}
                />
                {item.state}
              </span>
              <span className="text-white/30">·</span>
              <span className="tabular-nums text-white/60">{item.ts}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
