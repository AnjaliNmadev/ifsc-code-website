'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, SegmentedControl, formatINR } from './CalculatorFields';

type CityType = 'metro' | 'non-metro';

export default function HraCalculator() {
  const [basicSalary, setBasicSalary] = useState(40000);
  const [hraReceived, setHraReceived] = useState(20000);
  const [rentPaid, setRentPaid] = useState(18000);
  const [cityType, setCityType] = useState<CityType>('metro');

  const { exemptHra, taxableHra } = useMemo(() => {
    const rentMinusTenPercent = Math.max(0, rentPaid - 0.1 * basicSalary);
    const cityLimit = (cityType === 'metro' ? 0.5 : 0.4) * basicSalary;
    const exemption = Math.max(0, Math.min(hraReceived, rentMinusTenPercent, cityLimit));
    return { exemptHra: exemption, taxableHra: Math.max(0, hraReceived - exemption) };
  }, [basicSalary, hraReceived, rentPaid, cityType]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Basic salary (monthly)"
          value={basicSalary}
          onChange={setBasicSalary}
          min={0}
          max={1000000}
          step={1000}
          suffix="₹"
        />
        <NumberField
          label="HRA received (monthly)"
          value={hraReceived}
          onChange={setHraReceived}
          min={0}
          max={500000}
          step={500}
          suffix="₹"
        />
        <NumberField
          label="Rent paid (monthly)"
          value={rentPaid}
          onChange={setRentPaid}
          min={0}
          max={500000}
          step={500}
          suffix="₹"
        />
        <SegmentedControl
          label="City type"
          value={cityType}
          onChange={setCityType}
          options={[
            { label: 'Metro', value: 'metro' },
            { label: 'Non-metro', value: 'non-metro' },
          ]}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-2">
        <ResultStat label="HRA exempt (monthly)" value={formatINR(exemptHra)} emphasis />
        <ResultStat label="Taxable HRA (monthly)" value={formatINR(taxableHra)} />
        <ResultStat label="HRA exempt (annual)" value={formatINR(exemptHra * 12)} />
        <ResultStat label="Taxable HRA (annual)" value={formatINR(taxableHra * 12)} />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        HRA exemption is the lowest of: actual HRA received, rent paid minus 10% of basic salary,
        or 50% of basic salary (metro cities) / 40% of basic salary (non-metro cities).
      </p>
    </div>
  );
}
