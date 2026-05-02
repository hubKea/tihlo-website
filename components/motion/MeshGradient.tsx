export default function MeshGradient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <style>
        {`
          @keyframes mesh-drift-1 {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(30px, -20px); }
            50% { transform: translate(-10px, -40px); }
            75% { transform: translate(-30px, 10px); }
          }

          @keyframes mesh-drift-2 {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(-25px, 20px); }
            66% { transform: translate(20px, -15px); }
          }

          @keyframes mesh-drift-3 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, -10px); }
          }

          @media (prefers-reduced-motion: reduce) {
            .mesh-gradient-blob {
              animation: none !important;
            }
          }
        `}
      </style>
      <div
        className="mesh-gradient-blob absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 25% 35%, rgba(180,35,24,0.03), transparent 70%)',
          animation: 'mesh-drift-1 30s ease-in-out infinite',
        }}
      />
      <div
        className="mesh-gradient-blob absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 500px 500px at 70% 60%, rgba(14,16,20,0.03), transparent 70%)',
          animation: 'mesh-drift-2 45s ease-in-out infinite',
        }}
      />
      <div
        className="mesh-gradient-blob absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 700px 350px at 50% 80%, rgba(180,35,24,0.02), transparent 70%)',
          animation: 'mesh-drift-3 60s ease-in-out infinite',
        }}
      />
    </div>
  );
}
