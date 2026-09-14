'use client';

import { useState, useCallback, FormEvent } from 'react';
import { Search, Copy, Check, Share2, AlertCircle, Loader2, MapPin, Phone } from 'lucide-react';
import { lookupIfsc, IfscLookupError } from '@/lib/api';
import { isValidIfsc, buildWhatsAppShareUrl } from '@/lib/utils';
import type { BranchRecord, LookupStatus } from '@/lib/types';

export default function IfscQuickSearch() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<LookupStatus>('idle');
  const [result, setResult] = useState<BranchRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState<'ifsc' | 'micr' | null>(null);

  const runLookup = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (!isValidIfsc(trimmed)) {
      setStatus('error');
      setErrorMessage('Enter a valid 11-character IFSC code, e.g. SBIN0001234.');
      setResult(null);
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    try {
      const record = await lookupIfsc(trimmed);
      setResult(record);
      setStatus('success');
    } catch (error) {
      setResult(null);
      if (error instanceof IfscLookupError && error.kind === 'not-found') {
        setStatus('not-found');
      } else {
        setStatus('error');
        setErrorMessage(
          error instanceof Error ? error.message : 'Something went wrong. Please try again.'
        );
      }
    }
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    runLookup(code);
  }

  async function handleCopy(value: string, field: 'ifsc' | 'micr') {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(field);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context) — fail silently.
    }
  }

  function handleShare() {
    if (!result) return;
    const message = `${result.bankName}, ${result.branch}\nIFSC: ${result.ifsc}\nMICR: ${
      result.micr ?? 'N/A'
    }\nAddress: ${result.address}`;
    window.open(buildWhatsAppShareUrl(message), '_blank', 'noopener,noreferrer');
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
            placeholder="Enter 11-digit IFSC code, e.g. SBIN0001234"
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
              <Loader2 size={16} className="animate-spin" /> Searching
            </>
          ) : (
            'Find IFSC'
          )}
        </button>
      </form>

      <div className="mt-5" aria-live="polite">
        {status === 'not-found' && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">No branch found for &ldquo;{code}&rdquo;</p>
              <p className="mt-0.5 text-amber-700">
                Double-check the code, or use the browse tool below to find it by bank, state, and
                district instead.
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">We couldn&rsquo;t complete that search</p>
              <p className="mt-0.5 text-red-700">{errorMessage}</p>
            </div>
          </div>
        )}

        {status === 'success' && result && (
          <div className="rounded-xl border border-trust-100 bg-trust-50 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-trust-700">
                  {result.bankName}
                </p>
                <h3 className="mt-0.5 font-display text-lg font-semibold text-ink-900">
                  {result.branch}
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
                <dt className="text-xs font-medium text-ink-500">IFSC Code</dt>
                <dd className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-semibold text-ink-900">{result.ifsc}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(result.ifsc, 'ifsc')}
                    className="text-ink-400 transition hover:text-trust-700"
                    aria-label="Copy IFSC code"
                  >
                    {copied === 'ifsc' ? <Check size={16} className="text-trust-600" /> : <Copy size={16} />}
                  </button>
                </dd>
              </div>
              <div className="rounded-lg bg-white p-3">
                <dt className="text-xs font-medium text-ink-500">MICR Code</dt>
                <dd className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-semibold text-ink-900">
                    {result.micr ?? 'Not available'}
                  </span>
                  {result.micr && (
                    <button
                      type="button"
                      onClick={() => handleCopy(result.micr as string, 'micr')}
                      className="text-ink-400 transition hover:text-trust-700"
                      aria-label="Copy MICR code"
                    >
                      {copied === 'micr' ? (
                        <Check size={16} className="text-trust-600" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  )}
                </dd>
              </div>
              <div className="rounded-lg bg-white p-3 sm:col-span-2">
                <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
                  <MapPin size={13} /> Address
                </dt>
                <dd className="mt-1 text-sm text-ink-800">
                  {result.address}, {result.city}, {result.district}, {result.state}
                </dd>
              </div>
              <div className="rounded-lg bg-white p-3">
                <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
                  <Phone size={13} /> Contact
                </dt>
                <dd className="mt-1 text-sm text-ink-800">{result.contact}</dd>
              </div>
            </dl>

            <a
              href={`/${result.bankSlug}/${result.stateSlug}/${result.districtSlug}/${result.branchSlug}`}
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
