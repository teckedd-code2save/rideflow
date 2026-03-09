import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar, DriverBadge, VehicleChip } from '@/components/ui';
import { SearchInput } from '@/components/ui';

export default function Drivers() {
  const [q, setQ] = useState('');

  const { data: driversApi, isLoading: loadDir } = useQuery({ queryKey: ['drivers'], queryFn: () => fetch('/api/drivers').then(r => r.json()) });
  const { data: ridesApi, isLoading: loadRides } = useQuery({ queryKey: ['rides'], queryFn: () => fetch('/api/rides/recent').then(r => r.json()) });

  if (loadDir || loadRides) return <div className="text-muted p-8 text-center animate-pulse">Loading drivers...</div>;

  const DRIVERS = driversApi || [];
  const RIDES = ridesApi || [];

  const filtered = DRIVERS.filter(d =>
    !q || d.full_name?.toLowerCase().includes(q.toLowerCase()) ||
    d.license_number.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="card">
        <div className="card-header">
          <span className="card-title">All Drivers</span>
          <span className="text-[10px] text-muted">{DRIVERS.length} registered</span>
        </div>
        <div className="px-6 py-3 border-b border-border">
          <SearchInput value={q} onChange={setQ} placeholder="Search by name or license…" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Driver', 'Vehicle', 'License', 'Rides', 'Rating', 'Status', 'Location'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] uppercase tracking-widest text-muted font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => {
                const driverRides = RIDES.filter(r => r.driver_id === d.user_id);
                return (
                  <tr key={d.id} className="border-b border-border/40 last:border-0 hover:bg-surface2 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={d.full_name!} size="sm" />
                        <div>
                          <div className="text-xs font-medium">{d.full_name}</div>
                          <div className="text-[10px] text-muted">{d.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs">{d.vehicle_make} {d.vehicle_model}</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <VehicleChip type={d.vehicle_type!} />
                        <span className="text-[10px] text-muted">{d.plate_number}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted font-mono">{d.license_number}</td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-medium">{d.total_rides}</div>
                      <div className="text-[10px] text-muted">{driverRides.length} in data</div>
                    </td>
                    <td className="px-6 py-4 text-xs">⭐ {d.rating?.toFixed(2)}</td>
                    <td className="px-6 py-4"><DriverBadge status={d.status} /></td>
                    <td className="px-6 py-4 text-[10px] text-muted font-mono">
                      {d.current_lat?.toFixed(4)}, {d.current_lng?.toFixed(4)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
