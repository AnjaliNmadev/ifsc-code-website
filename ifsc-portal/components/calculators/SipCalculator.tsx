'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [rate, setRate] = useState(12);
  const [tenureYears, setTenureYears] = useState(10);

  const { maturityAmount, investedAmount, returns } = useMemo(() => {
    const months = tenureYears * 12;
    const monthlyRate = rate / 12 / 100;
    if (monthlyInvestment <= 0 || months <= 0) {
      return { maturityAmount: 0, investedAmount: 0, returns: 0 };
    }
    const maturity =
      monthlyRate === 0
        ? monthlyInvestment * months
        : monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const invested = monthlyInvestment * months;
    return { maturityAmount: maturity, investedAmount: invested, returns: maturity - invested };
  }, [monthlyInvestment, rate, tenureYears]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Monthly investment"
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          min={500}
          max={500000}
          step={500}
          suffix="₹"
        />
        <NumberField
          label="Expected annual return"
          value={rate}
          onChange={setRate}
          min={1}
          max={30}
          step={0.5}
          suffix="%"
        />
        <NumberField
          label="Investment period"
          value={tenureYears}
          onChange={setTenureYears}
          min={1}
          max={40}
          step={1}
          suffix="years"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Maturity value" value={formatINR(maturityAmount)} emphasis />
        <ResultStat label="Invested amount" value={formatINR(investedAmount)} />
        <ResultStat label="Est. returns" value={formatINR(returns)} />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        Assumes returns compound monthly at a constant rate. Actual mutual fund returns vary and
        are not guaranteed.
      </p>
    </div>
  );
}
