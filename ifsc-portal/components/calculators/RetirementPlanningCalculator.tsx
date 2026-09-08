'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

export default function RetirementPlanningCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentMonthlyExpense, setCurrentMonthlyExpense] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [preRetirementReturn, setPreRetirementReturn] = useState(12);
  const [postRetirementReturn, setPostRetirementReturn] = useState(7);

  const { futureMonthlyExpense, corpusNeeded, requiredMonthlySip } = useMemo(() => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const retirementYears = Math.max(1, lifeExpectancy - retirementAge);

    const futureExpense = currentMonthlyExpense * Math.pow(1 + inflation / 100, yearsToRetirement);
    const futureAnnualExpense = futureExpense * 12;

    const realRate = (1 + postRetirementReturn / 100) / (1 + inflation / 100) - 1;
    const corpus =
      Math.abs(realRate) < 0.0001
        ? futureAnnualExpense * retirementYears
        : (futureAnnualExpense * (1 - Math.pow(1 + realRate, -retirementYears))) / realRate;

    const monthlyRate = preRetirementReturn / 12 / 100;
    const months = yearsToRetirement * 12;
    const sip =
      months <= 0
        ? 0
        : monthlyRate === 0
        ? corpus / months
        : corpus / ((((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)));

    return { futureMonthlyExpense: futureExpense, corpusNeeded: corpus, requiredMonthlySip: sip };
  }, [
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentMonthlyExpense,
    inflation,
    preRetirementReturn,
    postRetirementReturn,
  ]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
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
          label="Retirement age"
          value={retirementAge}
          onChange={setRetirementAge}
          min={45}
          max={70}
          step={1}
          suffix="years"
        />
        <NumberField
          label="Life expectancy"
          value={lifeExpectancy}
          onChange={setLifeExpectancy}
          min={70}
          max={100}
          step={1}
          suffix="years"
        />
        <NumberField
          label="Current monthly expenses"
          value={currentMonthlyExpense}
          onChange={setCurrentMonthlyExpense}
          min={5000}
          max={1000000}
          step={1000}
          suffix="₹"
        />
        <NumberField
          label="Expected inflation"
          value={inflation}
          onChange={setInflation}
          min={2}
          max={12}
          step={0.5}
          suffix="%"
        />
        <NumberField
          label="Return before retirement"
          value={preRetirementReturn}
          onChange={setPreRetirementReturn}
          min={1}
          max={20}
          step={0.5}
          suffix="%"
        />
        <NumberField
          label="Return after retirement"
          value={postRetirementReturn}
          onChange={setPostRetirementReturn}
          min={1}
          max={15}
          step={0.5}
          suffix="%"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Retirement corpus needed" value={formatINR(corpusNeeded)} emphasis />
        <ResultStat label="Required monthly SIP" value={formatINR(requiredMonthlySip)} />
        <ResultStat label="Monthly expense at retirement" value={formatINR(futureMonthlyExpense)} />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        Inflates your current monthly expenses to retirement age, then estimates the corpus needed
        to sustain that (inflation-adjusted) expense through your expected retirement years, and
        the monthly SIP required to build that corpus by your retirement age.
      </p>
    </div>
  );
}
