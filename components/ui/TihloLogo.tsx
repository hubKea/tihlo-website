interface TihloLogoProps {
  size?: number;
  light?: boolean;
  className?: string;
}

export default function TihloLogo({ size = 28, light = false, className = '' }: TihloLogoProps) {
  const bg = light ? '#F4F1EA' : '#0E1014';
  const fg = light ? '#0E1014' : '#F4F1EA';

  return (
    <svg
      width={size}
      height={size}
      viewBox="-170 -160 340 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle r="150" fill={bg} />
      {/* Top iris arc */}
      <path
        d="M-166,0C-102,-62-45,-82 0,-82 45,-82 102,-62 166,0 102,-26 45,-38 0,-38-45,-38-102,-26-166,0Z"
        fill={fg}
      />
      {/* Bottom iris arc */}
      <path
        d="M-166,0C-102,62-45,82 0,82 45,82 102,62 166,0 102,26 45,38 0,38-45,38-102,26-166,0Z"
        fill={fg}
      />
      {/* Pupil */}
      <circle r="56" fill={light ? '#ECE7DC' : '#F4F1EA'} />
      {/* Pupil dot */}
      <circle r="4.5" fill={bg} />
      {/* Red mark */}
      <path
        d="M0,-7C-2.8,-7-4.5,-4.6-4.5,-2.3-4.5,1.2 0,7 0,7 0,7 4.5,1.2 4.5,-2.3 4.5,-4.6 2.8,-7 0,-7Z"
        fill="#B42318"
      />
    </svg>
  );
}
