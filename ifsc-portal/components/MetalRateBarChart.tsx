'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface BarDatum {
  label: string;
  value: number;
}

/**
 * A simple bar chart built entirely from real, already-computed rate data
 * passed in as props (purity breakdown or city comparison) — it does not
 * fabricate any historical time series, since no live day-by-day history is
 * available from the underlying rate feed.
 */
export default function MetalRateBarChart({
  data,
  color = '#0f6e5c',
  valuePrefix = '₹',
}: {
  data: BarDatum[];
  color?: string;
  valuePrefix?: string;
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${valuePrefix}${v.toLocaleString('en-IN')}`}
            width={70}
          />
          <Tooltip
            formatter={(value: number) => [`${valuePrefix}${value.toLocaleString('en-IN')}`, 'Rate']}
            contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
          />
          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
