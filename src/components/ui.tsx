import clsx from 'clsx';
import type { RideStatus, DriverStatus, PaymentStatus, VehicleType } from '@/types';
import { initials, avatarColor, STATUS_LABEL, DRIVER_STATUS_LABEL, PAYMENT_STATUS_LABEL } from '@/lib/utils';

// ── Avatar ────────────────────────────────────────────────────
export function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = { sm: 'w-7 h-7 text-[10px]', md: 'w-9 h-9 text-xs', lg: 'w-12 h-12 text-sm' }[size];
  return (
    <div className={clsx('rounded-xl flex items-center justify-center font-display font-bold flex-shrink-0', sz, avatarColor(name))}>
      {initials(name)}
    </div>
  );
}

// ── Status Badges ─────────────────────────────────────────────
export function RideBadge({ status }: { status: RideStatus }) {
  return (
    <span className={`badge-${status} badge`}>
      <span className="w-1 h-1 rounded-full bg-current" />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function DriverBadge({ status }: { status: DriverStatus }) {
  return (
    <span className={`badge-${status} badge`}>
      {DRIVER_STATUS_LABEL[status]}
    </span>
  );
}

export function PaymentBadge({ status }: { status: PaymentStatus }) {
  const cls: Record<PaymentStatus, string> = {
    completed: 'badge bg-success/10 text-success',
    pending:   'badge bg-warning/10 text-warning',
    failed:    'badge bg-accent3/10 text-accent3',
    refunded:  'badge bg-accent2/10 text-accent2',
  };
  return <span className={cls[status]}>{PAYMENT_STATUS_LABEL[status]}</span>;
}

// ── Vehicle type chip ─────────────────────────────────────────
export function VehicleChip({ type }: { type: VehicleType }) {
  const cls: Record<VehicleType, string> = {
    economy: 'bg-muted/20 text-muted',
    comfort: 'bg-accent2/10 text-accent2',
    premium: 'bg-warning/10 text-warning',
    xl:      'bg-accent/10 text-accent',
  };
  return (
    <span className={clsx('text-[10px] px-2 py-0.5 rounded capitalize', cls[type])}>
      {type}
    </span>
  );
}

// ── KPI Card ──────────────────────────────────────────────────
interface KpiProps {
  label: string;
  value: string | number;
  delta?: string;
  up?: boolean;
  color?: string;
  delay?: number;
}

export function KpiCard({ label, value, delta, up, color = '#c8f53a', delay = 0 }: KpiProps) {
  return (
    <div
      className="card relative overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 animate-fade-up cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} />
      <div className="p-6">
        <div className="stat-label mb-2.5">{label}</div>
        <div className="stat-val mb-2">{value}</div>
        {delta && (
          <div className={clsx('text-[11px]', up ? 'text-success' : 'text-accent3')}>
            {up ? '↑' : '↓'} {delta}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────
export function Empty({ message = 'No data' }: { message?: string }) {
  return (
    <div className="py-16 text-center text-muted text-xs tracking-wide">{message}</div>
  );
}

// ── Search input ──────────────────────────────────────────────
export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      className="input"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder ?? 'Search…'}
    />
  );
}
