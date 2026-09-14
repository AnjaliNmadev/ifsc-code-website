'use client';

import { useMemo, useState } from 'react';
import { NumberField, SegmentedControl, ResultStat, formatINR } from './CalculatorFields';
import {
  CLARITY_GRADES,
  COLOR_GRADES,
  CUT_GRADES,
  DIAMOND_SHAPES,
  estimateDiamondPrice,
} from '@/lib/diamond-price';

interface DiamondPriceCalculatorProps {
  /** Optional local market index (e.g. from diamondIndexForCity) applied on
   * top of the national baseline estimate. Defaults to 1 (national average). */
  cityIndex?: number;
  cityName?: string;
}

export default function DiamondPriceCalculator({ cityIndex = 1, cityName }: DiamondPriceCalculatorProps) {
  const [carat, setCarat] = useState(1);
  const [shape, setShape] = useState(DIAMOND_SHAPES[0].shape); // Round Brilliant
  const [clarity, setClarity] = useState(CLARITY_GRADES[3].grade); // SI1-SI2
  const [color, setColor] = useState(COLOR_GRADES[1].grade); // G-H
  const [cut, setCut] = useState(CUT_GRADES[1].grade); // Very Good

  const result = useMemo(() => {
    const clarityM = CLARITY_GRADES.find((c) => c.grade === clarity)?.multiplier ?? 1;
    const colorM = COLOR_GRADES.find((c) => c.grade === color)?.multiplier ?? 1;
    const cutM = CUT_GRADES.find((c) => c.grade === cut)?.multiplier ?? 1;
    const shapeM = DIAMOND_SHAPES.find((s) => s.shape === shape)?.multiplier ?? 1;
    return estimateDiamondPrice({
      carat,
      clarityMultiplier: clarityM,
      colorMultiplier: colorM,
      cutMultiplier: cutM,
      shapeMultiplier: shapeM,
      cityIndex,
    });
  }, [carat, clarity, color, cut, shape, cityIndex]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <p className="font-display text-lg font-bold text-ink-900">
        Diamond Price Estimator{cityName ? ` — ${cityName}` : ''}
      </p>
      <p className="mt-1 text-sm text-ink-500">
        A rough, indicative estimate based on carat weight, shape, and the 4Cs — not a live or
        guaranteed price. See the disclaimer below.
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <NumberField label="Carat weight" value={carat} onChange={setCarat} min={0.1} max={5} step={0.1} suffix="ct" />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-ink-700">Shape / type</span>
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="rounded-xl border border-ink-200 bg-ink-50 px-3 py-3 text-base font-semibold text-ink-900 outline-none focus:border-trust-500 focus:bg-white focus:ring-2 focus:ring-trust-100"
          >
            {DIAMOND_SHAPES.map((s) => (
              <option key={s.shape} value={s.shape}>
                {s.shape}
              </option>
            ))}
          </select>
        </div>
        <SegmentedControl
          label="Cut"
          value={cut}
          onChange={setCut}
          options={CUT_GRADES.map((c) => ({ label: c.grade, value: c.grade }))}
        />
        <SegmentedControl
          label="Colour"
          value={color}
          onChange={setColor}
          options={COLOR_GRADES.map((c) => ({ label: c.grade, value: c.grade }))}
        />
        <SegmentedControl
          label="Clarity"
          value={clarity}
          onChange={setClarity}
          options={CLARITY_GRADES.map((c) => ({ label: c.grade, value: c.grade }))}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Estimated low" value={formatINR(result.low)} />
        <ResultStat label="Indicative estimate" value={formatINR(result.mid)} emphasis />
        <ResultStat label="Estimated high" value={formatINR(result.high)} />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-500">
        This is a rough reference estimate from a simplified model, not a live market quote. Real
        prices vary by certifier, fluorescence, polish/symmetry, and jeweller margin — always get an
        actual quote and a GIA/IGI certificate before buying or selling.
      </p>
    </div>
  );
}
