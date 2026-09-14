'use client';

import { useState, useCallback, FormEvent } from 'react';
import {
  Search,
  Copy,
  Check,
  Share2,
  AlertCircle,
  Loader2,
  Landmark,
  Globe2,
  MapPinned,
  GitBranch,
} from 'lucide-react';
import { lookupIfsc, IfscLookupError } from '@/lib/api';
import { isValidIfsc, buildWhatsAppShareUrl } from '@/lib/utils';
import { decodeSwift, isValidSwift, type SwiftBreakdown } from '@/lib/swift';
import type { BranchRecord, LookupStatus } from '@/lib/types';

type Mode = 'swift' | 'ifsc' | null;

export default function SwiftQuickSearch() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<LookupStatus>('idle');
  const [mode, setMode] = useState<Mode>(null);
  const [swiftResult, setSwiftResult] = useState<SwiftBreakdown | null>(null);
  const [ifscResult, setIfscResult] = useState<BranchRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const runCheck = useCallback(async (value: string) => {
    const trimmed = value.trim().toUpperCase();
    if (!trimmed) return;

    // An 11-character value that matches the IFSC pattern (4 letters + "0" +
    // 6 alphanumerics) is resolved via the branch lookup, so someone who
    // only has their IFSC handy can still get their SWIFT code.
    if (isValidIfsc(trimmed)) {
      setMode('ifsc');
      setStatus('loading');
      setErrorMessage('');
      setSwiftResult(null);
      try {
        const record = await lookupIfsc(trimmed);
        setIfscResult(record);
        setStatus('success');
      } catch (error) {
        setIfscResult(null);
        if (error instanceof IfscLookupError && error.kind === 'not-found') {
          setStatus('not-found');
        } else {
          setStatus('error');
          setErrorMessage(
            error instanceof Error ? error.message : 'Something went wrong. Please try again.'
          );
        }
      }
      return;
    }

    // Otherwise, treat it as a SWIFT/BIC code and validate + decode it
    // entirely offline against the standard 8/11-character structure.
    if (isValidSwift(trimmed)) {
      setMode('swift');
      setIfscResult(null);
      setErrorMessage('');
      setSwiftResult(decodeSwift(trimmed));
      setStatus('success');
      return;
    }

    setMode(null);
    setSwiftResult(null);
    setIfscResult(null);
    setStatus('error');
    setErrorMessage(
      'Enter a valid 8 or 11-character SWIFT/BIC code (e.g. SBININBB123), or an 11-character IFSC code to find your branch\u2019s SWIFT code instead.'
    );
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    runCheck(code);
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
    if (mode === 'swift' && swiftResult) {
      window.open(
        buildWhatsAppShareUrl(`SWIFT/BIC Code: ${swiftResult.code}`),
        '_blank',
        'noopener,noreferrer'
      );
    } else if (mode === 'ifsc' && ifscResult) {
      const message = `${ifscResult.bankName}, ${ifscResult.branch}\nSWIFT: ${
        ifscResult.swift ?? 'Not available'
      }\nIFSC: ${ifscResult.ifsc}`;
      window.open(buildWhatsAppShareUrl(message), '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            placeholder="Enter SWIFT/BIC code or IFSC code, e.g. SBININBB123"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={11}
            className="w-full rounded-xl border border-ink-200 bg-ink-50 py-3 pl-10 pr-4 text-sm font-medium tracking-wide text-ink-900 outline-none transition focus:border-trust-500 focus:bg-white focus:ring-2 focus:ring-trust-100"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-trust-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-trust-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Checking
            </>
          ) : (
            'Check SWIFT Code'
          )}
        </button>
      </form>

      <div className="mt-5" aria-live="polite">
        {status === 'error' && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">That doesn&rsquo;t look right</p>
              <p className="mt-0.5 text-red-700">{errorMessage}</p>
            </div>
          </div>
        )}

        {status === 'not-found' && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">No branch found for &ldquo;{code}&rdquo;</p>
              <p className="mt-0.5 text-amber-700">
                Double-check the IFSC code and try again, or search it on the IFSC lookup page.
              </p>
            </div>
          </div>
        )}

        {status === 'success' && mode === 'swift' && swiftResult && (
          <div className="rounded-xl border border-trust-100 bg-trust-50 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-trust-700">
                  {swiftResult.code.length === 8 ? '8-character SWIFT/BIC' : '11-character SWIFT/BIC'}
                </p>
                <h3 className="mt-0.5 font-mono text-lg font-semibold text-ink-900">
                  {swiftResult.code}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <Check size={13} /> Valid format
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-3">
                <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
                  <Landmark size={13} /> Bank Code
                </dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-ink-900">
                  {swiftResult.bankCode}
                </dd>
              </div>
              <div className="rounded-lg bg-white p-3">
                <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
                  <Globe2 size={13} /> Country
                </dt>
                <dd className="mt-1 text-sm font-semibold text-ink-900">
                  {swiftResult.countryName
                    ? `${swiftResult.countryName} (${swiftResult.countryCode})`
                    : swiftResult.countryCode}
                </dd>
              </div>
              <div className="rounded-lg bg-white p-3">
                <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
                  <MapPinned size={13} /> Location Code
                </dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-ink-900">
                  {swiftResult.locationCode}
                </dd>
              </div>
              <div className="rounded-lg bg-white p-3">
                <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
                  <GitBranch size={13} /> Branch
                </dt>
                <dd className="mt-1 text-sm font-semibold text-ink-900">
                  {swiftResult.isHeadOffice
                    ? 'Head office (primary)'
                    : `Branch code ${swiftResult.branchCode}`}
                </dd>
              </div>
            </dl>

            {swiftResult.isTestCode && (
              <p className="mt-3 flex items-start gap-1.5 text-xs font-medium text-amber-700">
                <AlertCircle size={13} className="mt-0.5 shrink-0" /> The second character of the
                location code is &ldquo;0&rdquo;, which usually marks a test/training BIC rather
                than one used for live transactions.
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleCopy(swiftResult.code)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-trust-200 bg-white px-3 py-1.5 text-xs font-semibold text-trust-700 transition hover:bg-trust-100"
              >
                {copied ? <Check size={14} className="text-trust-600" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-lg border border-trust-200 bg-white px-3 py-1.5 text-xs font-semibold text-trust-700 transition hover:bg-trust-100"
              >
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>
        )}

        {status === 'success' && mode === 'ifsc' && ifscResult && (
          <div className="rounded-xl border border-trust-100 bg-trust-50 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-trust-700">
                  {ifscResult.bankName}
                </p>
                <h3 className="mt-0.5 font-display text-lg font-semibold text-ink-900">
                  {ifscResult.branch}
                </h3>
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
                <dt className="text-xs font-medium text-ink-500">SWIFT Code</dt>
                <dd className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-semibold text-ink-900">
                    {ifscResult.swift ?? 'Not available'}
                  </span>
                  {ifscResult.swift && (
                    <button
                      type="button"
                      onClick={() => handleCopy(ifscResult.swift as string)}
                      className="text-ink-400 transition hover:text-trust-700"
                      aria-label="Copy SWIFT code"
                    >
                      {copied ? <Check size={16} className="text-trust-600" /> : <Copy size={16} />}
                    </button>
                  )}
                </dd>
              </div>
              <div className="rounded-lg bg-white p-3">
                <dt className="text-xs font-medium text-ink-500">IFSC Code</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-ink-900">
                  {ifscResult.ifsc}
                </dd>
              </div>
            </dl>

            {!ifscResult.swift && (
              <p className="mt-3 text-xs leading-relaxed text-ink-500">
                This branch doesn&rsquo;t have a SWIFT code on file — that usually means it
                isn&rsquo;t set up to receive international wires directly. Most Indian banks
                route incoming international payments through a designated head-office branch
                instead, so confirm the right SWIFT code with {ifscResult.bankName} before
                sharing one.
              </p>
            )}

            <a
              href={`/${ifscResult.bankSlug}/${ifscResult.stateSlug}/${ifscResult.districtSlug}/${ifscResult.branchSlug}`}
              className="mt-4 inline-block text-sm font-semibold text-trust-700 hover:underline"
            >
              View full branch page →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
