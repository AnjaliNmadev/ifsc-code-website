interface AdSlotProps {
  variant: 'top-banner' | 'sidebar-sticky' | 'post-result-native';
  className?: string;
}

const VARIANT_CONFIG: Record<AdSlotProps['variant'], { label: string; height: string; slotId: string }> = {
  'top-banner': {
    label: 'Advertisement',
    height: 'h-24 sm:h-[90px]',
    slotId: 'ad-slot-top-banner',
  },
  'sidebar-sticky': {
    label: 'Advertisement',
    height: 'h-[600px]',
    slotId: 'ad-slot-sidebar-sticky',
  },
  'post-result-native': {
    label: 'Sponsored',
    height: 'h-40',
    slotId: 'ad-slot-post-result-native',
  },
};

/**
 * Placeholder ad container matching common AdSense unit shapes.
 * Swap the inner <ins> block for your real AdSense unit once your
 * publisher ID and slot IDs are approved:
 *
 *   <ins className="adsbygoogle"
 *        style={{ display: 'block' }}
 *        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *        data-ad-slot="XXXXXXXXXX"
 *        data-ad-format="auto"
 *        data-full-width-responsive="true" />
 */
export default function AdSlot({ variant, className = '' }: AdSlotProps) {
  const config = VARIANT_CONFIG[variant];
  return (
    <div
      id={config.slotId}
      data-ad-variant={variant}
      className={`flex w-full items-center justify-center rounded-lg border border-dashed border-ink-300 bg-ink-100 text-xs font-medium uppercase tracking-wide text-ink-400 ${config.height} ${className}`}
    >
      {config.label} slot
    </div>
  );
}
