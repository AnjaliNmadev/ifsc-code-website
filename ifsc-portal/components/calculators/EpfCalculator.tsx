'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

export default function EpfCalculator() {
  const [basicSalary, setBasicSalary] = useState(30000);
  const [currentAge, setCurrentAge] = useState(28);
  const [retirementAge, setRetirementAge] = useState(58);
  const [currentBalance, setCurrentBalance] = useState(200000);
  const [rate, setRate] = useState(8.25);

  const { maturityAmount, investedAmount, interestEarned } = useMemo(() => {
    const months = Math.max(0, (retirementAge - currentAge) * 12);
    const monthlyRate = rate / 12 / 100;
    // Employee 12% + employer 12% (of which 8.33% typically goes to EPS, simplified here
    // as the full 12%+12% flowing into the EPF corpus for estimation purposes).
    const monthlyContribution = basicSalary * 0.24;

    let corpus = currentBalance;
    let invested = currentBalance;
    for (let m = 0; m < months; m++) {
      corpus = corpus * (1 + monthlyRate) + monthlyContribution;
      invested += monthlyContribution;
    }

    return { maturityAmount: corpus, investedAmount: invested, interestEarned: corpus - invested };
  }, [basicSalary, currentAge, retirementAge, currentBalance, rate]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Basic salary + DA (monthly)"
          value={basicSalary}
          onChange={setBasicSalary}
          min={0}
          max={500000}
          step={1000}
          suffix="₹"
        />
        <NumberField
          label="Current EPF balance"
          value={currentBalance}
          onChange={setCurrentBalance}
          min={0}
          max={10000000}
          step={5000}
          suffix="₹"
        />
        <NumberField
          label="Current age"
          value={currentAge}
          onChange={setCurrentAge}
          min={18}
          max={57}
          step={1}
          suffix="years"
        />
        <NumberField
          label="Retirement age"
          value={retirementAge}
          onChange={setRetirementAge}
          min={45}
          max={60}
          step={1}
          suffix="years"
        />
        <NumberField
          label="Expected EPF interest rate"
          value={rate}
          onChange={setRate}
          min={5}
          max={12}
          step={0.05}
          suffix="%"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Corpus at retirement" value={formatINR(maturityAmount)} emphasis />
        <ResultStat label="Total contribution" value={formatINR(investedAmount)} />
        <ResultStat label="Interest earned" value={formatINR(interestEarned)} />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        Assumes a combined employee + employer contribution of 24% of basic salary + DA each
        month, compounded monthly. In practice, part of the employer&rsquo;s 12% is routed to the
        Employee Pension Scheme (EPS), so actual EPF-only growth may be lower.
      </p>
    </div>
  );
}
