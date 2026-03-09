import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar, SearchInput } from '@/components/ui';
import { timeAgo } from '@/lib/utils';

export default function Riders() {
  const [q, setQ] = useState('');

  const { data: usersApi, isLoading: loadUsers } = useQuery({ queryKey: ['users'], queryFn: () => fetch('/api/users').then(r => r.json()) });
  const { data: ridesApi, isLoading: loadRides } = useQuery({ queryKey: ['rides'], queryFn: () => fetch('/api/rides/recent').then(r => r.json()) });

  if (loadUsers || loadRides) return <div className="text-muted p-8 text-center animate-pulse">Loading riders...</div>;

  const USERS = usersApi || [];
  const RIDES = ridesApi || [];

  const riders = USERS.filter((u: any) => u.role === 'rider');
  const filtered = riders.filter(u =>
    !q || u.full_name.toLowerCase().includes(q.toLowerCase()) ||
    u.email.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="card">
        <div className="card-header">
          <span className="card-title">All Riders</span>
          <span className="text-[10px] text-muted">{riders.length} registered</span>
        </div>
        <div className="px-6 py-3 border-b border-border">
          <SearchInput value={q} onChange={setQ} placeholder="Search by name or email…" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Rider', 'Phone', 'Rating', 'Rides', 'Verified', 'Joined'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] uppercase tracking-widest text-muted font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => {
                const rideCount = RIDES.filter(r => r.rider_id === u.id).length;
                return (
                  <tr key={u.id} className="border-b border-border/40 last:border-0 hover:bg-surface2 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.full_name} size="sm" />
                        <div>
                          <div className="text-xs font-medium">{u.full_name}</div>
                          <div className="text-[10px] text-muted">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted font-mono">{u.phone}</td>
                    <td className="px-6 py-4 text-xs">⭐ {u.rating.toFixed(2)}</td>
                    <td className="px-6 py-4 text-xs font-medium">{rideCount}</td>
                    <td className="px-6 py-4">
                      {u.is_verified
                        ? <span className="text-[10px] bg-success/10 text-success px-2 py-0.5 rounded-full">Verified</span>
                        : <span className="text-[10px] bg-muted/20 text-muted px-2 py-0.5 rounded-full">Pending</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-[11px] text-muted">{timeAgo(u.created_at)}</td>
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
