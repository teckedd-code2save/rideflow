import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PaymentBadge, SearchInput } from '@/components/ui';
import { fmtGHS, timeAgo } from '@/lib/utils';
import type { PaymentStatus } from '@/types';

const TABS: { label: string; value: PaymentStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
];

const METHOD_ICON: Record<string, string> = { card: '💳', cash: '💵', wallet: '👝', promo: '🎟️' };

export default function Payments() {
  const [tab, setTab] = useState<PaymentStatus | 'all'>('all');
  const [q, setQ] = useState('');

  const { data: paymentsApi, isLoading } = useQuery({ queryKey: ['payments'], queryFn: () => fetch('/api/payments').then(r => r.json()) });

  if (isLoading) return <div className="text-muted p-8 text-center animate-pulse">Loading payments...</div>;

  const PAYMENTS = paymentsApi || [];

  const filtered = PAYMENTS
    .filter((p: any) => tab === 'all' || p.status === tab)
    .filter((p: any) => !q || p.rider_name?.toLowerCase().includes(q.toLowerCase()) || p.gateway_ref?.toLowerCase().includes(q.toLowerCase()))
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const totalRevenue = PAYMENTS.filter((p: any) => p.status === 'completed').reduce((s: number, p: any) => s + Number(p.amount), 0);

  return (
    <div className="space-y-4 animate-fade-up">

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="stat-label mb-1.5">Total Revenue</div>
          <div className="font-display font-bold text-2xl text-success">{fmtGHS(totalRevenue)}</div>
        </div>
        <div className="card p-5">
          <div className="stat-label mb-1.5">Transactions</div>
          <div className="font-display font-bold text-2xl">{PAYMENTS.filter((p: any) => p.status === 'completed').length}</div>
        </div>
        <div className="card p-5">
          <div className="stat-label mb-1.5">Pending</div>
          <div className="font-display font-bold text-2xl text-warning">{PAYMENTS.filter((p: any) => p.status === 'pending').length}</div>
        </div>
        <div className="card p-5">
          <div className="stat-label mb-1.5">Avg Fare</div>
          <div className="font-display font-bold text-2xl">{fmtGHS(totalRevenue / Math.max(1, PAYMENTS.filter((p: any) => p.status === 'completed').length))}</div>
        </div>
      </div>

      <div className="card">
        {/* Tabs */}
        <div className="flex border-b border-border px-6">
          {TABS.map(t => (
            <button key={t.value} onClick={() => setTab(t.value)}
              className={`px-4 py-3 text-xs tracking-wide border-b-2 -mb-px transition-colors ${tab === t.value ? 'text-accent border-accent' : 'text-muted border-transparent hover:text-white'}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="px-6 py-3 border-b border-border">
          <SearchInput value={q} onChange={setQ} placeholder="Search by rider or transaction ref…" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Rider', 'Route', 'Amount', 'Method', 'Ref', 'Status', 'Paid At'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] uppercase tracking-widest text-muted font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p: any) => (
                <tr key={p.id} className="border-b border-border/40 last:border-0 hover:bg-surface2 transition-colors cursor-pointer">
                  <td className="px-6 py-3.5 text-xs font-medium">{p.rider_name}</td>
                  <td className="px-6 py-3.5 text-[11px] text-muted truncate max-w-[160px]">{p.origin_address} → {p.dest_address}</td>
                  <td className="px-6 py-3.5 text-xs font-medium">{fmtGHS(p.amount)}</td>
                  <td className="px-6 py-3.5 text-xs">
                    <span className="flex items-center gap-1.5">
                      {METHOD_ICON[p.method]} {p.method}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-[10px] text-muted font-mono">{p.gateway_ref ?? '—'}</td>
                  <td className="px-6 py-3.5"><PaymentBadge status={p.status} /></td>
                  <td className="px-6 py-3.5 text-[11px] text-muted">{p.paid_at ? timeAgo(p.paid_at) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
