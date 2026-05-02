import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TIHLO — The eye that never misses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
          width: '100%',
          height: '100%',
          backgroundColor: '#0E1014',
          color: '#FFFFFF',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 24,
          }}
        >
          TIHLO
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          The eye that
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          never misses<span style={{ color: '#B42318' }}>.</span>
        </div>
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.55)',
            marginTop: 32,
            maxWidth: 600,
          }}
        >
          Active monitoring for fleets, plant, and operations across South
          Africa.
        </div>
      </div>
    ),
    { ...size }
  );
}
