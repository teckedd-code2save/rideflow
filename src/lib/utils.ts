import { formatDistanceToNow, format } from 'date-fns';
import type { RideStatus, DriverStatus, PaymentStatus } from '@/types';

export function timeAgo(iso: string | null | undefined): string {
  if (!iso) return '—';
  return formatDistanceToNow(new Date(iso), { addSuffix: true });
}

export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return format(new Date(iso), 'MMM d, HH:mm');
}

export function fmtGHS(amount: number | string): string {
  const num = Number(amount) || 0;
  return `₵${num.toFixed(2)}`;
}

export function initials(name: string): string {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export function avatarColor(name: string): string {
  const colors = [
    'bg-accent/20 text-accent',
    'bg-accent2/20 text-accent2',
    'bg-success/20 text-success',
    'bg-warning/20 text-warning',
    'bg-accent3/20 text-accent3',
  ];
  let hash = 0;
  for (const c of name) hash += c.charCodeAt(0);
  return colors[hash % colors.length];
}

export const STATUS_LABEL: Record<RideStatus, string> = {
  requested: 'Requested',
  accepted: 'Accepted',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const DRIVER_STATUS_LABEL: Record<DriverStatus, string> = {
  active: 'Active',
  busy: 'On Ride',
  offline: 'Offline',
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  pending: 'Pending',
  completed: 'Completed',
  failed: 'Failed',
  refunded: 'Refunded',
};
