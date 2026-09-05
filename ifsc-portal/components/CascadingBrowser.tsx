'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, MapPinned } from 'lucide-react';
import {
  getAllBanks,
  getStatesForBank,
  getDistrictsForState,
  getBranchesForDistrict,
} from '@/lib/data';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  placeholder: string;
}

function SelectField({ label, value, onChange, options, disabled, placeholder }: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</span>
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-ink-200 bg-ink-50 py-3 pl-4 pr-10 text-sm font-medium text-ink-900 outline-none transition focus:border-trust-500 focus:bg-white focus:ring-2 focus:ring-trust-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
        />
      </div>
    </label>
  );
}

export default function CascadingBrowser() {
  const router = useRouter();
  const [bankSlug, setBankSlug] = useState('');
  const [stateSlug, setStateSlug] = useState('');
  const [districtSlug, setDistrictSlug] = useState('');
  const [branchSlug, setBranchSlug] = useState('');

  const banks = useMemo(() => getAllBanks(), []);
  const states = useMemo(() => (bankSlug ? getStatesForBank(bankSlug) : []), [bankSlug]);
  const districts = useMemo(
    () => (bankSlug && stateSlug ? getDistrictsForState(bankSlug, stateSlug) : []),
    [bankSlug, stateSlug]
  );
  const branchesList = useMemo(
    () =>
      bankSlug && stateSlug && districtSlug
        ? getBranchesForDistrict(bankSlug, stateSlug, districtSlug)
        : [],
    [bankSlug, stateSlug, districtSlug]
  );

  function handleBankChange(value: string) {
    setBankSlug(value);
    setStateSlug('');
    setDistrictSlug('');
    setBranchSlug('');
  }

  function handleStateChange(value: string) {
    setStateSlug(value);
    setDistrictSlug('');
    setBranchSlug('');
  }

  function handleDistrictChange(value: string) {
    setDistrictSlug(value);
    setBranchSlug('');
  }

  function handleBranchChange(value: string) {
    setBranchSlug(value);
    if (value) {
      router.push(`/${bankSlug}/${stateSlug}/${districtSlug}/${value}`);
    }
  }

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-center gap-2 text-ink-700">
        <MapPinned size={18} className="text-trust-600" />
        <h2 className="font-display text-base font-semibold">Browse by Bank, State &amp; District</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField
          label="Step 1 — Bank"
          placeholder="Select a bank"
          value={bankSlug}
          onChange={handleBankChange}
          options={banks.map((b) => ({ value: b.slug, label: b.name }))}
        />
        <SelectField
          label="Step 2 — State"
          placeholder={bankSlug ? 'Select a state' : 'Select a bank first'}
          value={stateSlug}
          onChange={handleStateChange}
          disabled={!bankSlug}
          options={states.map((s) => ({ value: s.slug, label: s.name }))}
        />
        <SelectField
          label="Step 3 — District"
          placeholder={stateSlug ? 'Select a district' : 'Select a state first'}
          value={districtSlug}
          onChange={handleDistrictChange}
          disabled={!stateSlug}
          options={districts.map((d) => ({ value: d.slug, label: d.name }))}
        />
        <SelectField
          label="Step 4 — Branch"
          placeholder={districtSlug ? 'Select a branch' : 'Select a district first'}
          value={branchSlug}
          onChange={handleBranchChange}
          disabled={!districtSlug}
          options={branchesList.map((b) => ({ value: b.branchSlug, label: b.branch }))}
        />
      </div>
      <p className="mt-4 text-xs text-ink-400">
        Selecting a branch takes you straight to its IFSC code page.
      </p>
    </div>
  );
}
