'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, MapPinned, Loader2 } from 'lucide-react';
import {
  getAllBanks,
  getStatesForBank,
  getDistrictsForState,
  getBranchesForDistrict,
} from '@/lib/data';
import type { BankSummary, BranchRecord, DistrictSummary, StateSummary } from '@/lib/types';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  loading?: boolean;
  placeholder: string;
}

function SelectField({ label, value, onChange, options, disabled, loading, placeholder }: SelectFieldProps) {
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
          <option value="">{loading ? 'Loading…' : placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {loading ? (
          <Loader2 size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-ink-400" />
        ) : (
          <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
        )}
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

  const [banks, setBanks] = useState<BankSummary[]>([]);
  const [states, setStates] = useState<StateSummary[]>([]);
  const [districts, setDistricts] = useState<DistrictSummary[]>([]);
  const [branchesList, setBranchesList] = useState<BranchRecord[]>([]);

  const [loadingBanks, setLoadingBanks] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingBranches, setLoadingBranches] = useState(false);

  // Load the bank list once, on mount.
  useEffect(() => {
    let cancelled = false;
    setLoadingBanks(true);
    getAllBanks().then((result) => {
      if (!cancelled) {
        setBanks(result);
        setLoadingBanks(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Load states whenever the selected bank changes.
  useEffect(() => {
    if (!bankSlug) {
      setStates([]);
      return;
    }
    let cancelled = false;
    setLoadingStates(true);
    getStatesForBank(bankSlug).then((result) => {
      if (!cancelled) {
        setStates(result);
        setLoadingStates(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [bankSlug]);

  // Load districts whenever the selected state changes.
  useEffect(() => {
    if (!bankSlug || !stateSlug) {
      setDistricts([]);
      return;
    }
    let cancelled = false;
    setLoadingDistricts(true);
    getDistrictsForState(bankSlug, stateSlug).then((result) => {
      if (!cancelled) {
        setDistricts(result);
        setLoadingDistricts(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [bankSlug, stateSlug]);

  // Load branches whenever the selected district changes.
  useEffect(() => {
    if (!bankSlug || !stateSlug || !districtSlug) {
      setBranchesList([]);
      return;
    }
    let cancelled = false;
    setLoadingBranches(true);
    getBranchesForDistrict(bankSlug, stateSlug, districtSlug).then((result) => {
      if (!cancelled) {
        setBranchesList(result);
        setLoadingBranches(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [bankSlug, stateSlug, districtSlug]);

  const bankOptions = useMemo(
    () => banks.map((b) => ({ value: b.slug, label: b.name })),
    [banks]
  );
  const stateOptions = useMemo(
    () => states.map((s) => ({ value: s.slug, label: s.name })),
    [states]
  );
  const districtOptions = useMemo(
    () => districts.map((d) => ({ value: d.slug, label: d.name })),
    [districts]
  );
  const branchOptions = useMemo(
    () => branchesList.map((b) => ({ value: b.branchSlug, label: b.branch })),
    [branchesList]
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
          options={bankOptions}
          loading={loadingBanks}
        />
        <SelectField
          label="Step 2 — State"
          placeholder={bankSlug ? 'Select a state' : 'Select a bank first'}
          value={stateSlug}
          onChange={handleStateChange}
          disabled={!bankSlug}
          loading={loadingStates}
          options={stateOptions}
        />
        <SelectField
          label="Step 3 — District"
          placeholder={stateSlug ? 'Select a district' : 'Select a state first'}
          value={districtSlug}
          onChange={handleDistrictChange}
          disabled={!stateSlug}
          loading={loadingDistricts}
          options={districtOptions}
        />
        <SelectField
          label="Step 4 — Branch"
          placeholder={districtSlug ? 'Select a branch' : 'Select a district first'}
          value={branchSlug}
          onChange={handleBranchChange}
          disabled={!districtSlug}
          loading={loadingBranches}
          options={branchOptions}
        />
      </div>
      <p className="mt-4 text-xs text-ink-400">
        Selecting a branch takes you straight to its IFSC code page.
      </p>
    </div>
  );
}
