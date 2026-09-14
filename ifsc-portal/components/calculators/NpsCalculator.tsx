'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

export default function NpsCalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [currentAge, setCurrentAge] = useState(30);
  const [rate, setRate] = useState(10);
  const [annuityPercent, setAnnuityPercent] = useState(40);
  const [annuityRate, setAnnuityRate] = useState(6);

  const { corpus, investedAmount, lumpSum, annuityCorpus, monthlyPension } = useMemo(() => {
    const retirementAge = 60;
    const months = Math.max(0, (retirementAge - currentAge) * 12);
    const monthlyRate = rate / 12 / 100;

    const totalCorpus =
      monthlyRate === 0
        ? monthlyContribution * months
        : monthlyContribution *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);
    const invested = monthlyContribution * months;
    const annuityAmount = totalCorpus * (annuityPercent / 100);
    const lump = totalCorpus - annuityAmount;
    const pension = (annuityAmount * (annuityRate / 100)) / 12;

    return {
      corpus: totalCorpus,
      investedAmount: invested,
      lumpSum: lump,
      annuityCorpus: annuityAmount,
      monthlyPension: pension,
    };
  }, [monthlyContribution, currentAge, rate, annuityPercent, annuityRate]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Monthly contribution"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          min={500}
          max={500000}
          step={500}
          suffix="₹"
        />
        <NumberField
          label="Current age"
          value={currentAge}
          onChange={setCurrentAge}
          min={18}
          max={59}
          step={1}
          suffix="years"
        />
        <NumberField
          label="Expected return (till age 60)"
          value={rate}
          onChange={setRate}
          min={1}
          max={15}
          step={0.5}
          suffix="%"
        />
        <NumberField
          label="Annuity purchase"
          value={annuityPercent}
          onChange={setAnnuityPercent}
          min={40}
          max={100}
          step={5}
          suffix="%"
        />
        <NumberField
          label="Expected annuity rate"
          value={annuityRate}
          onChange={setAnnuityRate}
          min={3}
          max={10}
          step={0.25}
          suffix="%"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Corpus at 60" value={formatINR(corpus)} emphasis />
        <ResultStat label="Lump sum withdrawal" value={formatINR(lumpSum)} />
        <ResultStat label="Monthly pension" value={formatINR(monthlyPension)} />
        <ResultStat label="Total invested" value={formatINR(investedAmount)} />
        <ResultStat label="Annuity corpus" value={formatINR(annuityCorpus)} />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        At least 40% of your NPS corpus must be used to purchase an annuity at retirement (age
        60); the rest can be withdrawn as a lump sum. The monthly pension depends on the annuity
        rate offered by the insurer at that time, which this calculator lets you estimate.
      </p>
    </div>
  );
}
