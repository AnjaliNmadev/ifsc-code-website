'use client';

import { useMemo, useState } from 'react';
import { NumberField, ResultStat, SegmentedControl, formatINR } from './CalculatorFields';

type AssetType = 'equity' | 'other';

const EQUITY_LTCG_EXEMPTION = 125000;
const EQUITY_LTCG_RATE = 0.125;
const EQUITY_STCG_RATE = 0.2;
const OTHER_LTCG_RATE = 0.125;

export default function CapitalGainsCalculator() {
  const [assetType, setAssetType] = useState<AssetType>('equity');
  const [purchasePrice, setPurchasePrice] = useState(100000);
  const [salePrice, setSalePrice] = useState(150000);
  const [holdingMonths, setHoldingMonths] = useState(18);
  const [slabRate, setSlabRate] = useState(30);

  const { gain, isLongTerm, taxRate, taxAmount, netGain } = useMemo(() => {
    const totalGain = salePrice - purchasePrice;
    const ltcgThresholdMonths = assetType === 'equity' ? 12 : 24;
    const longTerm = holdingMonths >= ltcgThresholdMonths;

    let rate = 0;
    let tax = 0;

    if (totalGain > 0) {
      if (assetType === 'equity') {
        if (longTerm) {
          rate = EQUITY_LTCG_RATE;
          tax = Math.max(0, totalGain - EQUITY_LTCG_EXEMPTION) * rate;
        } else {
          rate = EQUITY_STCG_RATE;
          tax = totalGain * rate;
        }
      } else {
        if (longTerm) {
          rate = OTHER_LTCG_RATE;
          tax = totalGain * rate;
        } else {
          rate = slabRate / 100;
          tax = totalGain * rate;
        }
      }
    }

    return { gain: totalGain, isLongTerm: longTerm, taxRate: rate, taxAmount: tax, netGain: totalGain - tax };
  }, [assetType, purchasePrice, salePrice, holdingMonths, slabRate]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <SegmentedControl
          label="Asset type"
          value={assetType}
          onChange={setAssetType}
          options={[
            { label: 'Listed equity / equity funds', value: 'equity' },
            { label: 'Other (property, gold, debt)', value: 'other' },
          ]}
        />
        <NumberField
          label="Holding period"
          value={holdingMonths}
          onChange={setHoldingMonths}
          min={1}
          max={480}
          step={1}
          suffix="months"
        />
        <NumberField
          label="Purchase price"
          value={purchasePrice}
          onChange={setPurchasePrice}
          min={0}
          max={100000000}
          step={1000}
          suffix="₹"
        />
        <NumberField
          label="Sale price"
          value={salePrice}
          onChange={setSalePrice}
          min={0}
          max={100000000}
          step={1000}
          suffix="₹"
        />
        {assetType === 'other' && !isLongTerm && (
          <NumberField
            label="Your income tax slab rate"
            value={slabRate}
            onChange={setSlabRate}
            min={0}
            max={30}
            step={5}
            suffix="%"
          />
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Net gain after tax" value={formatINR(Math.max(0, netGain))} emphasis />
        <ResultStat label="Capital gain" value={formatINR(gain)} />
        <ResultStat
          label={`Tax (${isLongTerm ? 'LTCG' : 'STCG'} @ ${(taxRate * 100).toFixed(1)}%)`}
          value={formatINR(Math.max(0, taxAmount))}
        />
      </div>
      <p className="mt-4 text-sm text-ink-400">
        Listed equity: 12-month LTCG threshold, 12.5% tax above a ₹1,25,000 annual exemption, 20%
        STCG. Other assets (property, gold, debt): 24-month LTCG threshold, 12.5% flat (no
        indexation), STCG taxed at your income slab rate. Ignores transaction costs and
        indexation benefits for assets acquired before 2001.
      </p>
    </div>
  );
}
