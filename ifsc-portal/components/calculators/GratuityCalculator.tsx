'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

const GRATUITY_EXEMPTION_LIMIT = 2000000;

export default function GratuityCalculator() {
  const [lastDrawnSalary, setLastDrawnSalary] = useState(50000);
  const [yearsOfService, setYearsOfService] = useState(8);

  const { gratuityAmount, exceedsExemptionLimit } = useMemo(() => {
    if (lastDrawnSalary <= 0 || yearsOfService <= 0) {
      return { gratuityAmount: 0, exceedsExemptionLimit: false };
    }
    const roundedYears = Math.round(yearsOfService);
    const amount = (lastDrawnSalary / 26) * 15 * roundedYears;
    return { gratuityAmount: amount, exceedsExemptionLimit: amount > GRATUITY_EXEMPTION_LIMIT };
  }, [lastDrawnSalary, yearsOfService]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Last drawn basic salary + DA (monthly)"
          value={lastDrawnSalary}
          onChange={setLastDrawnSalary}
          min={0}
          max={1000000}
          step={1000}
          suffix="₹"
        />
        <NumberField
          label="Years of service"
          value={yearsOfService}
          onChange={setYearsOfService}
          min={1}
          max={45}
          step={1}
          suffix="years"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-1">
        <ResultStat label="Gratuity payable" value={formatINR(Math.min(gratuityAmount, GRATUITY_EXEMPTION_LIMIT))} emphasis />
      </div>
      {exceedsExemptionLimit && (
        <p className="mt-4 rounded-lg bg-trust-50 p-3 text-sm text-trust-800">
          This amount exceeds the ₹20,00,000 tax exemption limit for gratuity — only up to
          ₹20,00,000 is tax-free; any excess is taxable as salary income.
        </p>
      )}
      <p className="mt-4 text-sm text-ink-400">
        Uses the standard formula for employees covered under the Payment of Gratuity Act:
        (Last drawn salary ÷ 26) × 15 × years of service. Applicable only after completing at
        least 5 years of continuous service with the employer.
      </p>
    </div>
  );
}
