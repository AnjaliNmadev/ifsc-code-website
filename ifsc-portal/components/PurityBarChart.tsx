interface PurityChartProps {
  data: { label: string; value: number }[];
  color?: string;
}

export default function PurityBarChart({ data, color = '#1E4FD1' }: PurityChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-semibold text-ink-800">{item.label}</span>
            <span className="font-mono text-ink-600">₹{item.value.toLocaleString('en-IN')}</span>
          </div>
          <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.max((item.value / max) * 100, 4)}%`, backgroundColor: color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
