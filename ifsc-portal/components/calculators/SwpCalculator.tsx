'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

export default function SwpCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(2000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(15000);
  const [rate, setRate] = useState(8);
  const [tenureYears, setTenureYears] = useState(10);

  const { finalBalance, totalWithdrawn, exhaustedAtMonth } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = tenureYears * 12;
    let balance = initialInvestment;
    let withdrawn = 0;
    let exhaustedAt: number | null = null;

    for (let m = 1; m <= months; m++) {
      balance = balance * (1 + monthlyRate) - monthlyWithdrawal;
      withdrawn += monthlyWithdrawal;
      if (balance <= 0) {
        exhaustedAt = m;
        balance = 0;
        break;
      }
    }

    return { finalBalance: balance, totalWithdrawn: withdrawn, exhaustedAtMonth: exhaustedAt };
  }, [initialInvestment, monthlyWithdrawal, rate, tenureYears]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Initial investment"
          value={initialInvestment}
          onChange={setInitialInvestment}
          min={10000}
          max={100000000}
          step={10000}
          suffix="₹"
        />
        <NumberField
          label="Monthly withdrawal"
          value={monthlyWithdrawal}
          onChange={setMonthlyWithdrawal}
          min={500}
          max={1000000}
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
          label="Withdrawal period"
          value={tenureYears}
          onChange={setTenureYears}
          min={1}
          max={40}
          step={1}
          suffix="years"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-2">
        <ResultStat
          label={exhaustedAtMonth ? 'Balance (fund exhausted)' : 'Balance at end of period'}
          value={formatINR(finalBalance)}
          emphasis
        />
        <ResultStat label="Total withdrawn" value={formatINR(totalWithdrawn)} />
      </div>
      {exhaustedAtMonth && (
        <p className="mt-4 rounded-lg bg-trust-50 p-3 text-sm text-trust-800">
          At this withdrawal rate, your investment would run out after about{' '}
          {Math.ceil(exhaustedAtMonth / 12)} year{Math.ceil(exhaustedAtMonth / 12) === 1 ? '' : 's'}
          , before the full {tenureYears}-year period you selected.
        </p>
      )}
      <p className="mt-4 text-sm text-ink-400">
        Assumes your remaining balance continues to grow at a constant monthly-compounded rate
        while you withdraw a fixed amount every month. Actual mutual fund returns fluctuate and
        are not guaranteed.
      </p>
    </div>
  );
}
