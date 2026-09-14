'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

const COMPOUNDING_OPTIONS = [
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
  { label: 'Half-yearly', value: 2 },
  { label: 'Yearly', value: 1 },
];

export default function FdCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [tenureYears, setTenureYears] = useState(3);
  const [compounding, setCompounding] = useState(4);

  const { maturityAmount, interestEarned } = useMemo(() => {
    if (principal <= 0 || tenureYears <= 0) return { maturityAmount: 0, interestEarned: 0 };
    const n = compounding;
    const r = rate / 100;
    const maturity = principal * Math.pow(1 + r / n, n * tenureYears);
    return { maturityAmount: maturity, interestEarned: maturity - principal };
  }, [principal, rate, tenureYears, compounding]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Deposit amount"
          value={principal}
          onChange={setPrincipal}
          min={1000}
          max={10000000}
          step={1000}
          suffix="₹"
        />
        <NumberField
          label="Interest rate (per year)"
          value={rate}
          onChange={setRate}
          min={1}
          max={12}
          step={0.1}
          suffix="%"
        />
        <NumberField
          label="Tenure"
          value={tenureYears}
          onChange={setTenureYears}
          min={1}
          max={10}
          step={1}
          suffix="years"
        />
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-ink-700">Compounding frequency</span>
          <select
            value={compounding}
            onChange={(e) => setCompounding(Number(e.target.value))}
            className="rounded-xl border border-ink-200 bg-ink-50 py-3 px-4 text-base font-semibold text-ink-900 outline-none transition focus:border-trust-500 focus:bg-white focus:ring-2 focus:ring-trust-100"
          >
            {COMPOUNDING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-2">
        <ResultStat label="Maturity amount" value={formatINR(maturityAmount)} emphasis />
        <ResultStat label="Interest earned" value={formatINR(interestEarned)} />
      </div>
    </div>
  );
}
