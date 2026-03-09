import { useQuery } from '@tanstack/react-query';
import { DriverBadge } from '@/components/ui';

export function MapPage() {
  const { data: driversApi, isLoading: loadDir } = useQuery({ queryKey: ['drivers'], queryFn: () => fetch('/api/drivers').then(r => r.json()) });
  const { data: ridesApi, isLoading: loadRides } = useQuery({ queryKey: ['rides'], queryFn: () => fetch('/api/rides/recent').then(r => r.json()) });

  if (loadDir || loadRides) return <div className="text-muted p-8 text-center animate-pulse">Loading map...</div>;

  const DRIVERS = driversApi || [];
  const RIDES = ridesApi || [];

  const activeRide = RIDES.find((r: any) => r.status === 'in_progress');
  return (
    <div className="space-y-4 animate-fade-up">
      <div className="card">
        <div className="card-header">
          <span className="card-title">Live Map — Accra</span>
          <span className="badge bg-success/10 text-success">Real-time</span>
        </div>
        <div className="relative h-[420px] bg-[#0d0d14] overflow-hidden">
          {/* Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(58,139,245,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(58,139,245,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }} />
          {/* SVG roads */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 420" preserveAspectRatio="none">
            <path d="M0,180 Q200,160 400,210 Q600,260 800,190" stroke="rgba(58,139,245,0.15)" strokeWidth="10" fill="none" />
            <path d="M0,300 Q250,280 500,295 Q700,308 800,285" stroke="rgba(58,139,245,0.1)" strokeWidth="7" fill="none" />
            <path d="M280,0 Q310,120 295,210 Q280,300 305,420" stroke="rgba(58,139,245,0.12)" strokeWidth="8" fill="none" />
            <path d="M540,0 Q560,100 545,210 Q530,320 555,420" stroke="rgba(58,139,245,0.08)" strokeWidth="5" fill="none" />
            {activeRide && <path d="M210,195 Q310,160 440,185" stroke="rgba(245,58,122,0.6)" strokeWidth="2" strokeDasharray="6,4" fill="none" />}
          </svg>

          {/* Driver dots */}
          {DRIVERS.filter((d: any) => d.status !== 'offline').map((d: any, i: number) => (
            <div key={d.id} className="absolute" style={{ left: `${[27, 55, 71][i % 3]}%`, top: `${[45, 60, 38][i % 3]}%`, transform: 'translate(-50%,-50%)' }}>
              <div className={`w-3 h-3 rounded-full ${d.status === 'busy' ? 'bg-accent3 animate-pulse' : 'bg-accent'}`} style={{ boxShadow: `0 0 12px currentColor` }} />
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex gap-4">
            {[['#c8f53a', 'Available'], ['#f53a7a', 'On Ride'], ['#3a8bf5', 'Rider']].map(([c, l]) => (
              <div key={l} className="flex items-center gap-1.5 text-[10px] text-muted">
                <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                {l}
              </div>
            ))}
          </div>
        </div>
        {/* Driver list */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-0 border-t border-border">
          {DRIVERS.map((d: any) => (
            <div key={d.id} className="p-4 border-r border-border last:border-0 hover:bg-surface2 transition-colors cursor-pointer">
              <div className="text-xs font-medium mb-1 truncate">{d.full_name?.split(' ')[0]}</div>
              <DriverBadge status={d.status} />
              <div className="text-[10px] text-muted mt-1.5 font-mono">{d.current_lat?.toFixed(3)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Settings() {
  return (
    <div className="animate-fade-up">
      <div className="card p-12 text-center">
        <div className="text-4xl mb-4">⚙️</div>
        <div className="font-display font-bold text-lg mb-2">Settings</div>
        <div className="text-sm text-muted">Configuration panel coming soon</div>
      </div>
    </div>
  );
}
