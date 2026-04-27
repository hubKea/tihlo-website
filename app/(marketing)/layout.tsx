// The (marketing) route group shares the top-level layout (Nav + Footer).
// No additional wrapper needed here — this file exists only to allow
// Next.js to recognise the route group.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
