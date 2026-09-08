'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

export default function SavingsCalculator() {
  const [initialAmount, setInitialAmount] = useState(50000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(7);
  const [tenureYears, setTenureYears] = useState(10);

  const { totalValue, totalInvested, returns } = useMemo(() => {
    const months = tenureYears * 12;
    const monthlyRate = rate / 12 / 100;
    if (months <= 0) return { totalValue: 0, totalInvested: 0, returns: 0 };

    const lumpsumFV =
      monthlyRate === 0 ? initialAmount : initialAmount * Math.pow(1 + monthlyRate, months);
    const depositsFV =
      monthlyRate === 0
        ? monthlyDeposit * months
        : monthlyDeposit * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    const total = lumpsumFV + depositsFV;
    const invested = initialAmount + monthlyDeposit * months;
    return { totalValue: total, totalInvested: invested, returns: total - invested };
  }, [initialAmount, monthlyDeposit, rate, tenureYears]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Initial savings"
          value={initialAmount}
          onChange={setInitialAmount}
          min={0}
          max={10000000}
          step={1000}
          suffix="₹"
        />
        <NumberField
          label="Monthly savings"
          value={monthlyDeposit}
          onChange={setMonthlyDeposit}
          min={0}
          max={500000}
          step={500}
          suffix="₹"
        />
        <NumberField
          label="Expected annual return"
          value={rate}
          onChange={setRate}
          min={1}
          max={20}
          step={0.5}
          suffix="%"
        />
        <NumberField
          label="Time period"
          value={tenureYears}
          onChange={setTenureYears}
          min={1}
          max={40}
          step={1}
          suffix="years"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Future value" value={formatINR(totalValue)} emphasis />
        <ResultStat label="Total saved" value={formatINR(totalInvested)} />
        <ResultStat label="Est. growth" value={formatINR(returns)} />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        Combines your initial savings with regular monthly deposits, compounded monthly at a
        constant assumed rate of return.
      </p>
    </div>
  );
}
