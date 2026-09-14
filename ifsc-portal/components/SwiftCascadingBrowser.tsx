'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  MapPinned,
  Loader2,
  Copy,
  Check,
  Share2,
  AlertCircle,
  Globe,
} from 'lucide-react';
import {
  getAllBanks,
  getStatesForBank,
  getDistrictsForState,
  getBranchesForDistrict,
  getBranch,
} from '@/lib/data';
import { buildWhatsAppShareUrl } from '@/lib/utils';
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

export default function SwiftCascadingBrowser() {
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
  const [loadingResult, setLoadingResult] = useState(false);

  const [result, setResult] = useState<BranchRecord | null>(null);
  const [copied, setCopied] = useState(false);

  // Load the bank list once, on mount.
  useEffect(() => {
    let cancelled = false;
    setLoadingBanks(true);
    getAllBanks().then((res) => {
      if (!cancelled) {
        setBanks(res);
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
    getStatesForBank(bankSlug).then((res) => {
      if (!cancelled) {
        setStates(res);
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
    getDistrictsForState(bankSlug, stateSlug).then((res) => {
      if (!cancelled) {
        setDistricts(res);
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
    getBranchesForDistrict(bankSlug, stateSlug, districtSlug).then((res) => {
      if (!cancelled) {
        setBranchesList(res);
        setLoadingBranches(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [bankSlug, stateSlug, districtSlug]);

  // Fetch the full branch record (with its SWIFT code) whenever a branch is picked.
  useEffect(() => {
    if (!bankSlug || !stateSlug || !districtSlug || !branchSlug) {
      setResult(null);
      return;
    }
    let cancelled = false;
    setLoadingResult(true);
    getBranch(bankSlug, stateSlug, districtSlug, branchSlug).then((res) => {
      if (!cancelled) {
        setResult(res);
        setLoadingResult(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [bankSlug, stateSlug, districtSlug, branchSlug]);

  const bankOptions = useMemo(() => banks.map((b) => ({ value: b.slug, label: b.name })), [banks]);
  const stateOptions = useMemo(() => states.map((s) => ({ value: s.slug, label: s.name })), [states]);
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
    setResult(null);
  }

  function handleStateChange(value: string) {
    setStateSlug(value);
    setDistrictSlug('');
    setBranchSlug('');
    setResult(null);
  }

  function handleDistrictChange(value: string) {
    setDistrictSlug(value);
    setBranchSlug('');
    setResult(null);
  }

  function handleBranchChange(value: string) {
    setBranchSlug(value);
  }

  async function handleCopy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context) — fail silently.
    }
  }

  function handleShare() {
    if (!result) return;
    const swiftLine = result.swift
      ? `SWIFT: ${result.swift}`
      : result.swiftFallback
        ? `SWIFT: ${result.swiftFallback} (bank fallback, not this branch's own — confirm with bank)`
        : 'SWIFT: Not available';
    const message = `${result.bankName}, ${result.branch}\n${swiftLine}\nIFSC: ${result.ifsc}`;
    window.open(buildWhatsAppShareUrl(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-center gap-2 text-ink-700">
        <MapPinned size={18} className="text-trust-600" />
        <h2 className="font-display text-base font-semibold">
          Find SWIFT Code by Bank, State &amp; District
        </h2>
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

      <div className="mt-5" aria-live="polite">
        {loadingResult && (
          <div className="flex items-center gap-2 rounded-xl border border-ink-200 bg-ink-50 p-4 text-sm font-medium text-ink-500">
            <Loader2 size={16} className="animate-spin" /> Fetching SWIFT code…
          </div>
        )}

        {!loadingResult && branchSlug && result && (
          <div className="rounded-xl border border-trust-100 bg-trust-50 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-trust-700">
                  {result.bankName}
                </p>
                <h3 className="mt-0.5 font-display text-lg font-semibold text-ink-900">
                  {result.branch}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-ink-500">
                  {result.district}, {result.state}
                </p>
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-lg border border-trust-200 bg-white px-3 py-1.5 text-xs font-semibold text-trust-700 transition hover:bg-trust-100"
              >
                <Share2 size={14} /> Share
              </button>
            </div>

            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-3">
                <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
                  <Globe size={13} /> SWIFT / BIC Code
                </dt>
                <dd className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-semibold text-ink-900">
                    {result.swift ?? result.swiftFallback ?? 'Not available'}
                  </span>
                  {(result.swift || result.swiftFallback) && (
                    <button
                      type="button"
                      onClick={() => handleCopy((result.swift ?? result.swiftFallback) as string)}
                      className="text-ink-400 transition hover:text-trust-700"
                      aria-label="Copy SWIFT code"
                    >
                      {copied ? <Check size={16} className="text-trust-600" /> : <Copy size={16} />}
                    </button>
                  )}
                </dd>
                {!result.swift && result.swiftFallback && (
                  <p className="mt-1 text-[11px] font-medium text-amber-700">
                    Bank-level fallback — not this branch&rsquo;s own code
                  </p>
                )}
              </div>
              <div className="rounded-lg bg-white p-3">
                <dt className="text-xs font-medium text-ink-500">IFSC Code</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-ink-900">{result.ifsc}</dd>
              </div>
            </dl>

            {!result.swift && result.swiftFallback && (
              <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-ink-500">
                <AlertCircle size={13} className="mt-0.5 shrink-0 text-amber-600" />
                This branch doesn&rsquo;t have its own SWIFT code — the code above belongs to{' '}
                <span className="font-semibold text-ink-700">
                  {result.bankName}&rsquo;s {result.swiftFallbackBranch}
                </span>{' '}
                branch, which is the closest thing on file to a nodal/head-office code. Most Indian
                banks route incoming international wires through one such branch. Please confirm
                with {result.bankName} directly before sharing this code, since it may not be the
                correct routing branch.
              </p>
            )}

            {!result.swift && !result.swiftFallback && (
              <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-ink-500">
                <AlertCircle size={13} className="mt-0.5 shrink-0 text-amber-600" />
                Neither this branch nor any other {result.bankName} branch in our records has a
                SWIFT code on file. Most Indian bank branches aren&rsquo;t individually set up for
                international wires — please confirm the right routing SWIFT code with{' '}
                {result.bankName} before sharing one.
              </p>
            )}

            <a
              href={`/${result.bankSlug}/${result.stateSlug}/${result.districtSlug}/${result.branchSlug}`}
              className="mt-4 inline-block text-sm font-semibold text-trust-700 hover:underline"
            >
              View full branch page →
            </a>
          </div>
        )}

        {!loadingResult && branchSlug && !result && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>Couldn&rsquo;t load that branch. Please try selecting it again.</p>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-ink-400">
        Pick a bank, state, district, and branch to see that branch&rsquo;s SWIFT code — the same way
        you&rsquo;d browse to find an IFSC code.
      </p>
    </div>
  );
}
