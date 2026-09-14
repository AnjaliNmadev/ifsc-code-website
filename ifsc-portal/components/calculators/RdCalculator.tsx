'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

export default function RdCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(6.5);
  const [tenureMonths, setTenureMonths] = useState(24);

  const { maturityAmount, totalDeposited, interestEarned } = useMemo(() => {
    if (monthlyDeposit <= 0 || tenureMonths <= 0) {
      return { maturityAmount: 0, totalDeposited: 0, interestEarned: 0 };
    }
    // Standard approximate RD formula (quarterly-compounded rate applied monthly):
    const i = rate / 400; // quarterly rate as a monthly-applicable fraction
    const n = tenureMonths;
    const maturity = monthlyDeposit * ((Math.pow(1 + i, n) - 1) / (1 - Math.pow(1 + i, -1 / 3)));
    const deposited = monthlyDeposit * n;
    return {
      maturityAmount: maturity,
      totalDeposited: deposited,
      interestEarned: maturity - deposited,
    };
  }, [monthlyDeposit, rate, tenureMonths]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Monthly deposit"
          value={monthlyDeposit}
          onChange={setMonthlyDeposit}
          min={100}
          max={200000}
          step={100}
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
          value={tenureMonths}
          onChange={setTenureMonths}
          min={3}
          max={120}
          step={1}
          suffix="months"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Maturity amount" value={formatINR(maturityAmount)} emphasis />
        <ResultStat label="Total deposited" value={formatINR(totalDeposited)} />
        <ResultStat label="Interest earned" value={formatINR(interestEarned)} />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        This is an approximate calculation assuming quarterly compounding, matching how most
        Indian banks calculate RD interest. Your bank&rsquo;s exact maturity value may differ
        slightly.
      </p>
    </div>
  );
}
