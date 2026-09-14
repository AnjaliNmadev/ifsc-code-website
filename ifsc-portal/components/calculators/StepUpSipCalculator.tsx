'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

export default function StepUpSipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [stepUp, setStepUp] = useState(10);
  const [rate, setRate] = useState(12);
  const [tenureYears, setTenureYears] = useState(10);

  const { maturityAmount, investedAmount, returns } = useMemo(() => {
    if (monthlyInvestment <= 0 || tenureYears <= 0) {
      return { maturityAmount: 0, investedAmount: 0, returns: 0 };
    }
    const monthlyRate = rate / 12 / 100;
    let corpus = 0;
    let invested = 0;
    let currentMonthly = monthlyInvestment;

    for (let year = 0; year < tenureYears; year++) {
      for (let month = 0; month < 12; month++) {
        corpus = corpus * (1 + monthlyRate) + currentMonthly;
        invested += currentMonthly;
      }
      currentMonthly = currentMonthly * (1 + stepUp / 100);
    }

    return { maturityAmount: corpus, investedAmount: invested, returns: corpus - invested };
  }, [monthlyInvestment, stepUp, rate, tenureYears]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Starting monthly investment"
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          min={500}
          max={500000}
          step={500}
          suffix="₹"
        />
        <NumberField
          label="Annual step-up"
          value={stepUp}
          onChange={setStepUp}
          min={0}
          max={50}
          step={1}
          suffix="%"
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
        Your monthly investment increases by the step-up percentage at the start of every year.
        Assumes returns compound monthly at a constant rate.
      </p>
    </div>
  );
}
