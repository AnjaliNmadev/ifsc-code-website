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

export default function SalaryCalculator() {
  const [annualCtc, setAnnualCtc] = useState(1200000);
  const [basicPercent, setBasicPercent] = useState(40);
  const [professionalTax, setProfessionalTax] = useState(2400);
  const [regime, setRegime] = useState<Regime>('new');
  const [oldRegimeDeductions, setOldRegimeDeductions] = useState(150000);

  const result = useMemo(() => {
    const basic = (annualCtc * basicPercent) / 100;
    const employerPf = basic * 0.12;
    const employeePf = basic * 0.12;
    const grossSalary = annualCtc - employerPf;

    const stdDeduction =
      regime === 'new' ? NEW_REGIME_STANDARD_DEDUCTION : OLD_REGIME_STANDARD_DEDUCTION;
    const otherDeductions = regime === 'old' ? oldRegimeDeductions : 0;
    const taxableIncome = Math.max(0, grossSalary - stdDeduction - otherDeductions);
    const incomeTax = regime === 'new' ? computeNewRegimeTax(taxableIncome) : computeOldRegimeTax(taxableIncome);

    const takeHomeAnnual = grossSalary - employeePf - professionalTax - incomeTax;

    return {
      grossSalary,
      employeePf,
      incomeTax,
      takeHomeAnnual,
      takeHomeMonthly: takeHomeAnnual / 12,
    };
  }, [annualCtc, basicPercent, professionalTax, regime, oldRegimeDeductions]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Annual CTC"
          value={annualCtc}
          onChange={setAnnualCtc}
          min={200000}
          max={10000000}
          step={10000}
          suffix="₹"
        />
        <NumberField
          label="Basic salary (% of CTC)"
          value={basicPercent}
          onChange={setBasicPercent}
          min={30}
          max={60}
          step={1}
          suffix="%"
        />
        <NumberField
          label="Professional tax (annual)"
          value={professionalTax}
          onChange={setProfessionalTax}
          min={0}
          max={5000}
          step={100}
          suffix="₹"
        />
        <SegmentedControl
          label="Tax regime"
          value={regime}
          onChange={setRegime}
          options={[
            { label: 'New regime', value: 'new' },
            { label: 'Old regime', value: 'old' },
          ]}
        />
        {regime === 'old' && (
          <NumberField
            label="Deductions (80C, 80D, HRA, etc.)"
            value={oldRegimeDeductions}
            onChange={setOldRegimeDeductions}
            min={0}
            max={500000}
            step={5000}
            suffix="₹"
          />
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-2">
        <ResultStat label="Take-home (monthly)" value={formatINR(result.takeHomeMonthly)} emphasis />
        <ResultStat label="Take-home (annual)" value={formatINR(result.takeHomeAnnual)} />
        <ResultStat label="Employee PF (annual)" value={formatINR(result.employeePf)} />
        <ResultStat label="Income tax (annual)" value={formatINR(result.incomeTax)} />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        Assumes employer and employee each contribute 12% of basic salary to EPF, and that basic
        salary is a fixed percentage of CTC. Actual in-hand salary depends on your company&rsquo;s
        exact salary structure and any variable pay or perks.
      </p>
    </div>
  );
}
