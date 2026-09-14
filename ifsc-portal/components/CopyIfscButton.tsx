'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { buildWhatsAppShareUrl } from '@/lib/utils';

export default function CopyIfscButton({ ifsc, swift }: { ifsc: string; swift?: string | null }) {
  const [copied, setCopied] = useState<'ifsc' | 'swift' | null>(null);

  async function handleCopy(value: string, which: 'ifsc' | 'swift') {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      // Clipboard API can be unavailable — fail silently, the code is still visible on screen.
    }
  }

  function handleShare() {
    window.open(
      buildWhatsAppShareUrl(`IFSC Code: ${ifsc}`),
      '_blank',
      'noopener,noreferrer'
    );
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => handleCopy(ifsc, 'ifsc')}
        className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 transition hover:border-trust-300 hover:text-trust-700"
      >
        {copied === 'ifsc' ? <Check size={14} className="text-trust-600" /> : <Copy size={14} />}
        {copied === 'ifsc' ? 'Copied' : 'Copy IFSC'}
      </button>
      {swift && (
        <button
          type="button"
          onClick={() => handleCopy(swift, 'swift')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 transition hover:border-trust-300 hover:text-trust-700"
        >
          {copied === 'swift' ? <Check size={14} className="text-trust-600" /> : <Copy size={14} />}
          {copied === 'swift' ? 'Copied' : 'Copy SWIFT'}
        </button>
      )}
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 transition hover:border-trust-300 hover:text-trust-700"
      >
        <Share2 size={14} /> Share on WhatsApp
      </button>
    </div>
  );
}
