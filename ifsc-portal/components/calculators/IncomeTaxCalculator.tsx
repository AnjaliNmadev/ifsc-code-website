'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, SegmentedControl, formatINR } from './CalculatorFields';
import {
  computeNewRegimeTax,
  computeOldRegimeTax,
  NEW_REGIME_STANDARD_DEDUCTION,
  OLD_REGIME_STANDARD_DEDUCTION,
} from '@/lib/calculators';

type Regime = 'new' | 'old';

export default function IncomeTaxCalculator() {
  const [regime, setRegime] = useState<Regime>('new');
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000);

  const { taxableIncome, tax, takeHome, standardDeduction } = useMemo(() => {
    const stdDeduction =
      regime === 'new' ? NEW_REGIME_STANDARD_DEDUCTION : OLD_REGIME_STANDARD_DEDUCTION;
    const otherDeductions = regime === 'old' ? deductions : 0;
    const taxable = Math.max(0, annualIncome - stdDeduction - otherDeductions);
    const taxAmount = regime === 'new' ? computeNewRegimeTax(taxable) : computeOldRegimeTax(taxable);
    return {
      taxableIncome: taxable,
      tax: taxAmount,
      takeHome: annualIncome - taxAmount,
      standardDeduction: stdDeduction,
    };
  }, [regime, annualIncome, deductions]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <SegmentedControl
          label="Tax regime"
          value={regime}
          onChange={setRegime}
          options={[
            { label: 'New regime', value: 'new' },
            { label: 'Old regime', value: 'old' },
          ]}
        />
        <NumberField
          label="Annual income (gross)"
          value={annualIncome}
          onChange={setAnnualIncome}
          min={0}
          max={10000000}
          step={10000}
          suffix="₹"
        />
        {regime === 'old' && (
          <NumberField
            label="Deductions (80C, 80D, HRA, etc.)"
            value={deductions}
            onChange={setDeductions}
            min={0}
            max={500000}
            step={5000}
            suffix="₹"
          />
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Tax payable (incl. cess)" value={formatINR(tax)} emphasis />
        <ResultStat label="Taxable income" value={formatINR(taxableIncome)} />
        <ResultStat label="Income after tax" value={formatINR(takeHome)} />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        Assumes a flat standard deduction of {formatINR(standardDeduction)} and includes 4% health
        &amp; education cess. Uses FY 2024-25 slab rates for individuals below 60; excludes
        surcharge and marginal relief. Verify against the latest rates before filing.
      </p>
    </div>
  );
}
