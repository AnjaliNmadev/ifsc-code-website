'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

export default function PpfCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [tenureYears, setTenureYears] = useState(15);

  const { maturityAmount, investedAmount, interestEarned } = useMemo(() => {
    if (yearlyInvestment <= 0 || tenureYears <= 0) {
      return { maturityAmount: 0, investedAmount: 0, interestEarned: 0 };
    }
    let corpus = 0;
    for (let year = 0; year < tenureYears; year++) {
      corpus = (corpus + yearlyInvestment) * (1 + rate / 100);
    }
    const invested = yearlyInvestment * tenureYears;
    return { maturityAmount: corpus, investedAmount: invested, interestEarned: corpus - invested };
  }, [yearlyInvestment, rate, tenureYears]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Yearly investment"
          value={yearlyInvestment}
          onChange={setYearlyInvestment}
          min={500}
          max={150000}
          step={500}
          suffix="₹"
        />
        <NumberField
          label="Interest rate (per year)"
          value={rate}
          onChange={setRate}
          min={1}
          max={10}
          step={0.1}
          suffix="%"
        />
        <NumberField
          label="Tenure"
          value={tenureYears}
          onChange={setTenureYears}
          min={15}
          max={50}
          step={1}
          suffix="years"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Maturity value" value={formatINR(maturityAmount)} emphasis />
        <ResultStat label="Total invested" value={formatINR(investedAmount)} />
        <ResultStat label="Interest earned" value={formatINR(interestEarned)} />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        PPF has a minimum lock-in of 15 years (extendable in blocks of 5) and a maximum yearly
        contribution limit of ₹1,50,000. Interest is compounded annually and is fully tax-free.
        The current rate is set by the government every quarter.
      </p>
    </div>
  );
}
