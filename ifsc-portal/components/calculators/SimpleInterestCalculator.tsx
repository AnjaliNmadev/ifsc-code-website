'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(2);

  const { interest, total } = useMemo(() => {
    if (principal <= 0 || years <= 0) return { interest: 0, total: 0 };
    const simpleInterest = (principal * rate * years) / 100;
    return { interest: simpleInterest, total: principal + simpleInterest };
  }, [principal, rate, years]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <NumberField
          label="Principal amount"
          value={principal}
          onChange={setPrincipal}
          min={1000}
          max={10000000}
          step={1000}
          suffix="₹"
        />
        <NumberField
          label="Interest rate (per year)"
          value={rate}
          onChange={setRate}
          min={1}
          max={20}
          step={0.1}
          suffix="%"
        />
        <NumberField
          label="Time period"
          value={years}
          onChange={setYears}
          min={1}
          max={30}
          step={1}
          suffix="years"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-2">
        <ResultStat label="Interest earned" value={formatINR(interest)} emphasis />
        <ResultStat label="Total amount" value={formatINR(total)} />
      </div>
    </div>
  );
}
