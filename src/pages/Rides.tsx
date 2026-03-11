import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RideBadge, VehicleChip, SearchInput } from '@/components/ui';
import { fmtGHS, timeAgo } from '@/lib/utils';
import type { RideStatus } from '@/types';

const TABS: { label: string; value: RideStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Requested', value: 'requested' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function Rides() {
  const [tab, setTab] = useState<RideStatus | 'all'>('all');
  const [q, setQ] = useState('');

  const { data: ridesApi, isLoading } = useQuery({
    queryKey: ['rides'],
    queryFn: () => fetch('/api/rides/recent').then(r => r.json())
  });
  const RIDES = ridesApi || [];

  if (isLoading) return <div className="text-muted p-8 text-center animate-pulse">Loading rides...</div>;

  const filtered = RIDES
    .filter((r: any) => tab === 'all' || r.status === tab)
    .filter((r: any) =>
      !q || [r.rider_name, r.driver_name, r.origin_address, r.dest_address].some(
        f => f?.toLowerCase().includes(q.toLowerCase())
      )
    )
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="card">
        {/* Tabs */}
        <div className="flex border-b border-border px-6 gap-0">
          {TABS.map(t => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`px-4 py-3 text-xs tracking-wide border-b-2 -mb-px transition-colors ${tab === t.value ? 'text-accent border-accent' : 'text-muted border-transparent hover:text-white'
                }`}
            >
              {t.label}
              <span className="ml-1.5 text-[10px] opacity-60">
                {t.value === 'all' ? RIDES.length : RIDES.filter((r: any) => r.status === t.value).length}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-border">
          <SearchInput value={q} onChange={setQ} placeholder="Search rider, driver, or address…" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Rider', 'Driver', 'Route', 'Type', 'Fare', 'Status', 'Created'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] uppercase tracking-widest text-muted font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((ride: any) => (
                <tr key={ride.id} className="border-b border-border/40 last:border-0 hover:bg-surface2 transition-colors cursor-pointer">
                  <td className="px-6 py-3.5 text-xs font-medium">{ride.rider_name}</td>
                  <td className="px-6 py-3.5 text-xs text-muted">{ride.driver_name ?? <span className="italic">Unassigned</span>}</td>
                  <td className="px-6 py-3.5 text-[11px] text-muted max-w-[200px] truncate">
                    <span className="text-white">{ride.origin_address}</span>
                    <span className="mx-1 text-muted">→</span>
                    {ride.dest_address}
                  </td>
                  <td className="px-6 py-3.5"><VehicleChip type={ride.vehicle_type} /></td>
                  <td className="px-6 py-3.5 text-xs font-medium">
                    {fmtGHS(ride.final_fare)}
                    {ride.discount_amount > 0 && (
                      <div className="text-[10px] text-success">-{fmtGHS(ride.discount_amount)}</div>
                    )}
                  </td>
                  <td className="px-6 py-3.5"><RideBadge status={ride.status} /></td>
                  <td className="px-6 py-3.5 text-[11px] text-muted whitespace-nowrap">{timeAgo(ride.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted text-xs">No rides found</div>
          )}
        </div>
      </div>
    </div>
  );
}
