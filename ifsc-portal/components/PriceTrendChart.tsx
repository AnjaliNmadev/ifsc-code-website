interface PriceTrendChartProps {
  points: { date: string; value: number }[];
  color?: string;
  height?: number;
}

/**
 * A small, hand-rolled SVG line chart — no charting library dependency, so
 * there's nothing extra to install or that can go out of sync with the
 * Next.js version. Good enough for a simple "recent trend" sparkline; swap
 * for a full charting library later if you want zoom/tooltips.
 */
export default function PriceTrendChart({ points, color = '#1E4FD1', height = 160 }: PriceTrendChartProps) {
  if (points.length < 2) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border border-dashed border-ink-300 bg-ink-50 text-sm text-ink-400"
        style={{ height }}
      >
        Not enough history yet — check back after a few days.
      </div>
    );
  }

  const width = 600;
  const padding = 24;
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const xStep = (width - padding * 2) / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = padding + i * xStep;
    const y = padding + (height - padding * 2) * (1 - (p.value - min) / range);
    return { x, y };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${height - padding} L ${coords[0].x.toFixed(1)} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <path d={areaPath} fill={color} opacity={0.08} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {coords.map((c, i) => (
        <circle key={points[i].date} cx={c.x} cy={c.y} r={i === coords.length - 1 ? 4 : 2.5} fill={color} />
      ))}
    </svg>
  );
}
