'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, formatINR } from './CalculatorFields';

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(9);
  const [tenureYears, setTenureYears] = useState(5);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = tenureYears * 12;
    if (monthlyRate === 0 || months === 0 || principal <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0 };
    }
    const factor = Math.pow(1 + monthlyRate, months);
    const emiValue = (principal * monthlyRate * factor) / (factor - 1);
    const totalPaymentValue = emiValue * months;
    return {
      emi: emiValue,
      totalInterest: totalPaymentValue - principal,
      totalPayment: totalPaymentValue,
    };
  }, [principal, rate, tenureYears]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Loan amount"
          value={principal}
          onChange={setPrincipal}
          min={10000}
          max={20000000}
          step={10000}
          suffix="₹"
        />
        <NumberField
          label="Interest rate (per year)"
          value={rate}
          onChange={setRate}
          min={1}
          max={25}
          step={0.1}
          suffix="%"
        />
        <NumberField
          label="Loan tenure"
          value={tenureYears}
          onChange={setTenureYears}
          min={1}
          max={30}
          step={1}
          suffix="years"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Monthly EMI" value={formatINR(emi)} emphasis />
        <ResultStat label="Total interest payable" value={formatINR(totalInterest)} />
        <ResultStat label="Total amount payable" value={formatINR(totalPayment)} />
      </div>
    </div>
  );
}
