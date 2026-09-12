'use client';

import { useMemo, useState } from 'react';
import { NumberField, SegmentedControl, ResultStat, formatINR } from './CalculatorFields';

interface MetalWeightCalculatorProps {
  metal: 'Gold' | 'Silver';
  /** Rate per gram for each purity option, e.g. { '24K': 15535, '22K': 14230 }. */
  ratesPerGram: Record<string, number>;
}

/**
 * A small client-side calculator that converts a weight (in grams) into an
 * estimated metal value at today's rate for the selected purity. This is a
 * pure client-side computation on the live rate already fetched on the
 * server for this page — it does not call any external API itself.
 */
export default function MetalWeightCalculator({ metal, ratesPerGram }: MetalWeightCalculatorProps) {
  const purityOptions = Object.keys(ratesPerGram);
  const [purity, setPurity] = useState(purityOptions[0]);
  const [grams, setGrams] = useState(10);

  const ratePerGram = ratesPerGram[purity] ?? 0;
  const value = useMemo(() => grams * ratePerGram, [grams, ratePerGram]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <p className="font-display text-lg font-bold text-ink-900">{metal} Value Calculator</p>
      <p className="mt-1 text-sm text-ink-500">
        Enter a weight to estimate its value at today&rsquo;s rate. This is the metal value only —
        it excludes making charges and GST.
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <NumberField label="Weight (grams)" value={grams} onChange={setGrams} min={1} max={1000} step={1} suffix="g" />
        {purityOptions.length > 1 && (
          <SegmentedControl
            label="Purity"
            value={purity}
            onChange={setPurity}
            options={purityOptions.map((p) => ({ label: p, value: p }))}
          />
        )}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-2">
        <ResultStat label={`Rate used (${purity} / gram)`} value={formatINR(ratePerGram)} />
        <ResultStat label="Estimated metal value" value={formatINR(value)} emphasis />
      </div>
    </div>
  );
}
