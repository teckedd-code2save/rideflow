import { useQuery } from '@tanstack/react-query';
import { fmtDate } from '@/lib/utils';

export default function Promos() {
  const { data: promosApi, isLoading } = useQuery({ queryKey: ['promos'], queryFn: () => fetch('/api/promos').then(r => r.json()) });

  if (isLoading) return <div className="text-muted p-8 text-center animate-pulse">Loading promos...</div>;

  const PROMOS = promosApi || [];

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="card">
        <div className="card-header">
          <span className="card-title">Promo Codes</span>
          <button className="btn-accent text-xs px-3 py-1.5">+ New Code</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Code', 'Type', 'Value', 'Min Fare', 'Uses', 'Expires', 'Status'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] uppercase tracking-widest text-muted font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROMOS.map((p: any) => (
                <tr key={p.id} className="border-b border-border/40 last:border-0 hover:bg-surface2 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-bold text-accent tracking-wider">{p.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] bg-surface2 border border-border px-2 py-0.5 rounded capitalize">{p.discount_type}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium">
                    {p.discount_type === 'percentage' ? `${p.discount_value}%` : `₵${p.discount_value}`}
                  </td>
                  <td className="px-6 py-4 text-xs text-muted">₵{p.min_ride_amount}</td>
                  <td className="px-6 py-4">
                    <div className="text-xs">{p.uses_count} / {p.max_uses ?? '∞'}</div>
                    {p.max_uses && (
                      <div className="mt-1 h-1 bg-border rounded-full overflow-hidden w-20">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${(p.uses_count / p.max_uses) * 100}%` }} />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-[11px] text-muted">{p.expires_at ? fmtDate(p.expires_at) : '—'}</td>
                  <td className="px-6 py-4">
                    {p.is_active
                      ? <span className="badge bg-success/10 text-success">Active</span>
                      : <span className="badge bg-muted/20 text-muted">Expired</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
