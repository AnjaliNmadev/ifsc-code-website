'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

const SCHEDULE = [
  { label: 'On or before 15 June', cumulativePercent: 15 },
  { label: 'On or before 15 September', cumulativePercent: 45 },
  { label: 'On or before 15 December', cumulativePercent: 75 },
  { label: 'On or before 15 March', cumulativePercent: 100 },
];

export default function AdvanceTaxCalculator() {
  const [estimatedTax, setEstimatedTax] = useState(100000);

  const installments = useMemo(() => {
    let previousCumulative = 0;
    return SCHEDULE.map((slab) => {
      const cumulativeAmount = (estimatedTax * slab.cumulativePercent) / 100;
      const installmentAmount = cumulativeAmount - previousCumulative;
      previousCumulative = cumulativeAmount;
      return { ...slab, cumulativeAmount, installmentAmount };
    });
  }, [estimatedTax]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Estimated annual tax liability"
          value={estimatedTax}
          onChange={setEstimatedTax}
          min={10000}
          max={5000000}
          step={5000}
          suffix="₹"
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-ink-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-4 py-3">Due date</th>
              <th className="px-4 py-3">Cumulative %</th>
              <th className="px-4 py-3">Installment</th>
              <th className="px-4 py-3">Cumulative amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {installments.map((row) => (
              <tr key={row.label}>
                <td className="px-4 py-3 font-medium text-ink-900">{row.label}</td>
                <td className="px-4 py-3 text-ink-600">{row.cumulativePercent}%</td>
                <td className="px-4 py-3 font-semibold text-ink-900">
                  {formatINR(row.installmentAmount)}
                </td>
                <td className="px-4 py-3 text-ink-600">{formatINR(row.cumulativeAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <ResultStat label="Total advance tax for the year" value={formatINR(estimatedTax)} emphasis />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        Applies to taxpayers whose total tax liability for the year exceeds ₹10,000. Senior
        citizens without business income are exempt from paying advance tax.
      </p>
    </div>
  );
}
