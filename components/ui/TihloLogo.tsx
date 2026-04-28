/**
 * TihloLogo — official iris mark.
 *
 * Paths copied verbatim from public/images/tihlo_logo_web.svg (mark portion,
 * 0-84 viewBox). The `light` prop swaps base + iris fills for use over dark
 * surfaces. The red sighting dot keeps its brand colour in both modes.
 */

interface TihloLogoProps {
  size?: number;
  light?: boolean;
  className?: string;
}

export default function TihloLogo({ size = 28, light = false, className = '' }: TihloLogoProps) {
  // Base disc + iris-pupil tones flip between light and dark backgrounds.
  const disc = light ? '#F4F1EA' : '#1F2023';
  const sclera = light ? '#1F2023' : '#FFFFFF';
  const pupilFill = light ? '#1F2023' : '#F5F5F5';
  const pupilDot = light ? '#F5F5F5' : '#1F2023';
  const dotInner = light ? '#1F2023' : '#F5F5F5';
  const detail = light ? 'rgba(244,241,234,0.55)' : 'rgba(17,17,17,0.55)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Base disc */}
      <path
        d="M42 84C65.196 84 84 65.196 84 42C84 18.804 65.196 0 42 0C18.804 0 0 18.804 0 42C0 65.196 18.804 84 42 84Z"
        fill={disc}
      />
      {/* Top + bottom sclera arcs */}
      <path
        d="M0 42C16.1928 24.64 30.6145 19.04 42 19.04C53.3855 19.04 67.8072 24.64 84 42C67.8072 34.72 53.3855 31.36 42 31.36C30.6145 31.36 16.1928 34.72 0 42Z"
        fill={sclera}
      />
      <path
        d="M0 42C16.1928 59.36 30.6145 64.96 42 64.96C53.3855 64.96 67.8072 59.36 84 42C67.8072 49.28 53.3855 52.64 42 52.64C30.6145 52.64 16.1928 49.28 0 42Z"
        fill={sclera}
      />
      {/* Pupil clipping mask */}
      <mask id="tihlo-iris-mask" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="25" y="25" width="34" height="34">
        <path
          d="M42 58.8C50.9691 58.8 58.24 51.2784 58.24 42C58.24 32.7216 50.9691 25.2 42 25.2C33.0309 25.2 25.76 32.7216 25.76 42C25.76 51.2784 33.0309 58.8 42 58.8Z"
          fill="white"
        />
      </mask>
      <g mask="url(#tihlo-iris-mask)">
        <path
          d="M42 58.8C50.9691 58.8 58.24 51.2784 58.24 42C58.24 32.7216 50.9691 25.2 42 25.2C33.0309 25.2 25.76 32.7216 25.76 42C25.76 51.2784 33.0309 58.8 42 58.8Z"
          fill={pupilFill}
        />
        {/* Concentric brand rings */}
        <circle cx="42" cy="42" r="14.5" stroke={detail} strokeWidth="0.7" fill="none" />
        <circle cx="42" cy="42" r="11.4" stroke={detail} strokeWidth="0.7" fill="none" />
        <circle cx="42" cy="42" r="7.0" stroke={detail} strokeWidth="0.5" fill="none" />
        {/* Crosshair */}
        <line x1="26.34" y1="42" x2="57.66" y2="42" stroke={detail} strokeWidth="0.4" />
        <line x1="42" y1="25.8" x2="42" y2="58.2" stroke={detail} strokeWidth="0.4" />
        {/* Red sighting wedge */}
        <path d="M42 42V27C44.5452 27 47.0456 27.6932 49.2498 29.0097C51.454 30.3262 53.2844 32.2198 54.557 34.5L42 42Z" fill="#C0272D" opacity="0.18" />
        <path d="M42 42V30.6C43.934 30.6 45.8338 31.1275 47.5085 32.128C49.1833 33.1285 50.574 34.5674 51.541 36.3L42 42Z" fill="#C0272D" opacity="0.32" />
        <path d="M42 42V34.8C43.2225 34.8 44.4236 35.1315 45.4825 35.7635C46.5414 36.3955 47.4208 37.3048 48.032 38.4L42 42Z" fill="#C0272D" opacity="0.45" />
        <line x1="42" y1="42" x2="54.557" y2="34.5" stroke="#C0272D" strokeWidth="1.3" opacity="0.85" />
        {/* Centre pupil */}
        <circle cx="42" cy="42" r="1.6" fill={pupilDot} />
        <circle cx="42" cy="42" r="0.7" fill={dotInner} />
        {/* Red drop */}
        <path
          d="M42 39.9C41.188 39.9 40.695 40.62 40.695 41.31C40.695 42.36 42 44.1 42 44.1C42 44.1 43.305 42.36 43.305 41.31C43.305 40.62 42.812 39.9 42 39.9Z"
          fill="#C0272D"
        />
      </g>
    </svg>
  );
}
