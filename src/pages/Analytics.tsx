import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { fmtGHS } from '@/lib/utils';

export default function Analytics() {
  const { data: dashboard, isLoading: loadDash } = useQuery({ queryKey: ['dashboard'], queryFn: () => fetch('/api/dashboard').then(r => r.json()) });
  const { data: driversApi, isLoading: loadDir } = useQuery({ queryKey: ['drivers'], queryFn: () => fetch('/api/drivers').then(r => r.json()) });
  const { data: ridesApi, isLoading: loadRides } = useQuery({ queryKey: ['rides'], queryFn: () => fetch('/api/rides/recent').then(r => r.json()) });

  if (loadDash || loadDir || loadRides) return <div className="text-muted p-8 text-center animate-pulse">Loading analytics...</div>;

  const DRIVERS = driversApi || [];
  const RIDES = ridesApi || [];
  const REVENUE_CHART = dashboard?.chart || [];

  const driverStats = DRIVERS.map((d: any) => ({
    name: d.full_name!.split(' ')[0],
    rides: RIDES.filter((r: any) => r.driver_id === d.user_id && r.status === 'completed').length,
    rating: d.rating ?? 0,
  })).sort((a: any, b: any) => b.rides - a.rides);

  const vehicleStats = ['economy', 'comfort', 'premium', 'xl'].map((type: string) => ({
    type,
    count: RIDES.filter((r: any) => r.vehicle_type === type).length,
    revenue: RIDES.filter((r: any) => r.vehicle_type === type && r.status === 'completed').reduce((s: number, r: any) => s + Number(r.final_fare || 0), 0),
  }));

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue trend */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Weekly Revenue</span>
          </div>
          <div className="p-6 h-56">
            <ResponsiveContainer>
              <BarChart data={REVENUE_CHART} barSize={24} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="day" tick={{ fill: '#5a5a72', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#5a5a72', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#111118', border: '1px solid #222230', borderRadius: 8, fontSize: 11 }} formatter={(v: number) => [fmtGHS(v), 'Revenue']} />
                <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                  {REVENUE_CHART.map((_: any, i: number) => (
                    <Cell key={i} fill={i === REVENUE_CHART.length - 1 ? '#c8f53a' : '#222230'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Driver performance */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Driver Performance</span>
          </div>
          <div className="p-6 h-56">
            <ResponsiveContainer>
              <BarChart data={driverStats} barSize={20} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="name" tick={{ fill: '#5a5a72', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#5a5a72', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#111118', border: '1px solid #222230', borderRadius: 8, fontSize: 11 }} />
                <Bar dataKey="rides" fill="#3a8bf5" radius={[4, 4, 0, 0]} name="Rides" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Vehicle type breakdown */}
      <div className="card">
        <div className="card-header"><span className="card-title">Revenue by Vehicle Type</span></div>
        <div className="divide-y divide-border/50">
          {vehicleStats.map(v => (
            <div key={v.type} className="flex items-center gap-6 px-6 py-4">
              <div className="w-24 text-xs capitalize font-medium">{v.type}</div>
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(v.count / Math.max(1, RIDES.length)) * 100}%` }} />
              </div>
              <div className="text-xs text-muted w-16 text-right">{v.count} rides</div>
              <div className="text-xs font-medium w-20 text-right">{fmtGHS(v.revenue)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
