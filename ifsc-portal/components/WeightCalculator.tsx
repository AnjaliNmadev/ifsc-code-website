'use client';

import { useState } from 'react';
import { Scale } from 'lucide-react';

interface WeightCalculatorProps {
  rates: Record<string, number>; // e.g. { "24K": 8145, "22K": 7461, "18K": 6109 }
  unit?: string; // defaults to "gram"
}

export default function WeightCalculator({ rates, unit = 'gram' }: WeightCalculatorProps) {
  const purityOptions = Object.keys(rates);
  const [weight, setWeight] = useState(10);
  const [purity, setPurity] = useState(purityOptions[0]);

  const ratePerUnit = rates[purity] ?? 0;
  const total = ratePerUnit * weight;

  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5">
      <div className="flex items-center gap-2 text-ink-700">
        <Scale size={18} className="text-trust-600" />
        <h3 className="font-display text-base font-bold">Weight Calculator</h3>
      </div>
      <p className="mt-1 text-sm text-ink-500">
        Enter a weight to estimate the base metal value (before GST and making charges).
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Weight ({unit}s)
          </span>
          <input
            type="number"
            min={0}
            step={0.1}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value) || 0)}
            className="rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 text-base font-semibold text-ink-900 outline-none focus:border-trust-500 focus:bg-white focus:ring-2 focus:ring-trust-100"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">Purity</span>
          <select
            value={purity}
            onChange={(e) => setPurity(e.target.value)}
            className="rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 text-base font-semibold text-ink-900 outline-none focus:border-trust-500 focus:bg-white focus:ring-2 focus:ring-trust-100"
          >
            {purityOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 rounded-lg bg-trust-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-trust-700">
          Estimated value
        </p>
        <p className="mt-1 font-display text-xl font-extrabold text-ink-900">
          ₹{Math.round(total).toLocaleString('en-IN')}
        </p>
        <p className="mt-1 text-xs text-ink-500">
          {weight} {unit}{weight === 1 ? '' : 's'} × ₹{ratePerUnit.toLocaleString('en-IN')}/{unit} ({purity})
        </p>
      </div>
    </div>
  );
}
