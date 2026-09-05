'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { buildWhatsAppShareUrl } from '@/lib/utils';

export default function CopyIfscButton({ ifsc }: { ifsc: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(ifsc);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
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
    <div className="mt-5 flex gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 transition hover:border-trust-300 hover:text-trust-700"
      >
        {copied ? <Check size={14} className="text-trust-600" /> : <Copy size={14} />}
        {copied ? 'Copied' : 'Copy IFSC'}
      </button>
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
