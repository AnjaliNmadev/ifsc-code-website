import { Building2, MapPin, Phone, Hash, CreditCard } from 'lucide-react';
import type { BranchRecord } from '@/lib/types';
import CopyIfscButton from './CopyIfscButton';

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-ink-100 py-3.5 last:border-b-0">
      <span className="mt-0.5 text-trust-600">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</p>
        <p className="mt-0.5 break-words text-sm font-medium text-ink-900">{value}</p>
      </div>
    </div>
  );
}

function ServiceBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        active ? 'bg-trust-100 text-trust-700' : 'bg-ink-100 text-ink-400'
      }`}
    >
      {label} {active ? 'available' : 'unavailable'}
    </span>
  );
}

export default function BranchDetailsCard({ branch }: { branch: BranchRecord }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-trust-700">
            {branch.bankName}
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            {branch.branch} Branch
          </h1>
          <p className="mt-1 text-base font-medium text-ink-500">
            {branch.district}, {branch.state}
          </p>
        </div>
        <div className="rounded-xl bg-ink-900 px-4 py-3 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-300">
            IFSC Code
          </p>
          <p className="font-mono text-lg font-bold text-white">{branch.ifsc}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <ServiceBadge label="NEFT" active={branch.neft} />
        <ServiceBadge label="RTGS" active={branch.rtgs} />
        <ServiceBadge label="IMPS" active={branch.imps} />
        <ServiceBadge label="UPI" active={branch.upi} />
      </div>

      <CopyIfscButton ifsc={branch.ifsc} />

      <div className="mt-2">
        <InfoRow icon={<Building2 size={17} />} label="Bank" value={branch.bankName} />
        <InfoRow icon={<Hash size={17} />} label="Branch" value={branch.branch} />
        <InfoRow icon={<MapPin size={17} />} label="Address" value={branch.address} />
        <InfoRow
          icon={<MapPin size={17} />}
          label="City / District / State"
          value={`${branch.city}, ${branch.district}, ${branch.state}`}
        />
        <InfoRow icon={<Phone size={17} />} label="Contact Number" value={branch.contact} />
        <InfoRow
          icon={<CreditCard size={17} />}
          label="MICR Code"
          value={branch.micr ?? 'Not available'}
        />
      </div>
    </div>
  );
}
