'use client';

import { useMemo, useState } from 'react';
import { NumberField, SegmentedControl, ResultStat, formatINR } from './CalculatorFields';
import {
  CLARITY_GRADES,
  COLOR_GRADES,
  CUT_GRADES,
  DIAMOND_SHAPES,
  FLUORESCENCE_GRADES,
  POLISH_GRADES,
  SYMMETRY_GRADES,
  adjustedFluorescenceMultiplier,
  estimateDiamondPrice,
} from '@/lib/diamond-price';

interface DiamondPriceCalculatorProps {
  /** Optional local market index (e.g. from diamondIndexForCity) applied on
   * top of the national baseline estimate. Defaults to 1 (national average). */
  cityIndex?: number;
  cityName?: string;
  /** Live scale factor from lib/live-diamond-rates.ts, tracking the
   * OpenFacet Diamond Composite Index's 24h trend. Defaults to 1 (no
   * live adjustment) so this keeps working if a caller doesn't pass one. */
  liveScaleFactor?: number;
}

export default function DiamondPriceCalculator({
  cityIndex = 1,
  cityName,
  liveScaleFactor = 1,
}: DiamondPriceCalculatorProps) {
  const [carat, setCarat] = useState(1);
  const [shape, setShape] = useState<string>(DIAMOND_SHAPES[0].shape); // Round Brilliant
  const [clarity, setClarity] = useState<string>(CLARITY_GRADES[3].grade); // SI1-SI2
  const [color, setColor] = useState<string>(COLOR_GRADES[1].grade); // G-H
  const [cut, setCut] = useState<string>(CUT_GRADES[1].grade); // Very Good
  const [fluorescence, setFluorescence] = useState<string>(FLUORESCENCE_GRADES[0].grade); // None
  const [polish, setPolish] = useState<string>(POLISH_GRADES[1].grade); // Very Good
  const [symmetry, setSymmetry] = useState<string>(SYMMETRY_GRADES[1].grade); // Very Good

  const { result, fluorM } = useMemo(() => {
    const clarityM = CLARITY_GRADES.find((c) => c.grade === clarity)?.multiplier ?? 1;
    const colorM = COLOR_GRADES.find((c) => c.grade === color)?.multiplier ?? 1;
    const cutM = CUT_GRADES.find((c) => c.grade === cut)?.multiplier ?? 1;
    const shapeM = DIAMOND_SHAPES.find((s) => s.shape === shape)?.multiplier ?? 1;
    const rawFluorM = FLUORESCENCE_GRADES.find((f) => f.grade === fluorescence)?.multiplier ?? 1;
    // Fluorescence is priced differently depending on the colour grade it's
    // paired with, so resolve the interaction before feeding it in.
    const fluorM = adjustedFluorescenceMultiplier(rawFluorM, color);
    const polishM = POLISH_GRADES.find((p) => p.grade === polish)?.multiplier ?? 1;
    const symmetryM = SYMMETRY_GRADES.find((s) => s.grade === symmetry)?.multiplier ?? 1;
    return {
      fluorM,
      result: estimateDiamondPrice({
        carat,
        clarityMultiplier: clarityM,
        colorMultiplier: colorM,
        cutMultiplier: cutM,
        shapeMultiplier: shapeM,
        fluorescenceMultiplier: fluorM,
        polishMultiplier: polishM,
        symmetryMultiplier: symmetryM,
        cityIndex,
        liveScaleFactor,
      }),
    };
  }, [carat, clarity, color, cut, shape, fluorescence, polish, symmetry, cityIndex, liveScaleFactor]);

  // How much the three "beyond the 4Cs" factors are moving the estimate, so
  // the user can see their combined effect rather than guessing.
  const polishM = POLISH_GRADES.find((p) => p.grade === polish)?.multiplier ?? 1;
  const symmetryM = SYMMETRY_GRADES.find((s) => s.grade === symmetry)?.multiplier ?? 1;
  const extraFactorPct = Math.round((fluorM * polishM * symmetryM - 1) * 1000) / 10;

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

      <div className="mt-6 rounded-xl border border-ink-200 bg-ink-50/60 p-4">
        <p className="text-sm font-bold text-ink-900">Beyond the 4Cs</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-500">
          Your GIA/IGI report also grades these three, and they change the price you&rsquo;re quoted
          even when the 4Cs are identical. Leave them at the defaults if you don&rsquo;t have the
          report yet.
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <SegmentedControl
            label="Fluorescence"
            value={fluorescence}
            onChange={setFluorescence}
            options={FLUORESCENCE_GRADES.map((f) => ({ label: f.grade, value: f.grade }))}
          />
          <SegmentedControl
            label="Polish"
            value={polish}
            onChange={setPolish}
            options={POLISH_GRADES.map((p) => ({ label: p.grade, value: p.grade }))}
          />
          <SegmentedControl
            label="Symmetry"
            value={symmetry}
            onChange={setSymmetry}
            options={SYMMETRY_GRADES.map((s) => ({ label: s.grade, value: s.grade }))}
          />
        </div>
        <p className="mt-3 text-xs text-ink-600">
          Combined effect of these three on the estimate:{' '}
          <span
            className={`font-bold ${
              extraFactorPct > 0 ? 'text-green-700' : extraFactorPct < 0 ? 'text-red-600' : 'text-ink-700'
            }`}
          >
            {extraFactorPct > 0 ? '+' : ''}
            {extraFactorPct.toFixed(1)}%
          </span>
          {fluorescence !== 'None' && (color === 'D-F' || color === 'G-H') && (
            <span className="text-ink-500">
              {' '}
              — fluorescence is penalised more on higher colour grades like {color}.
            </span>
          )}
          {fluorescence !== 'None' && (color === 'I-J' || color === 'K-M') && (
            <span className="text-ink-500">
              {' '}
              — on a {color} stone, fluorescence partly masks the tint, so the discount is smaller.
            </span>
          )}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-ink-50 p-4 sm:grid-cols-3">
        <ResultStat label="Estimated low" value={formatINR(result.low)} />
        <ResultStat label="Indicative estimate" value={formatINR(result.mid)} emphasis />
        <ResultStat label="Estimated high" value={formatINR(result.high)} />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-500">
        This is a rough reference estimate from a simplified model, not a live market quote. Real
        prices still vary by certifier, individual stone characteristics, and jeweller margin —
        always get an actual quote and a GIA/IGI certificate before buying or selling.
      </p>
    </div>
  );
}
