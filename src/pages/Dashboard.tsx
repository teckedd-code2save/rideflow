import { useQuery } from '@tanstack/react-query';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { KpiCard, RideBadge, DriverBadge, Avatar } from '@/components/ui';
import { fmtGHS, timeAgo } from '@/lib/utils';

const PIE_DATA = [
  { name: 'Card', value: 55, color: '#c8f53a' },
  { name: 'Cash', value: 25, color: '#3a8bf5' },
  { name: 'Wallet', value: 15, color: '#3af5a0' },
  { name: 'Promo', value: 5, color: '#f53a7a' },
];

export default function Dashboard() {
  const { data: dashboard, isLoading: isLoadingDash } = useQuery({ queryKey: ['dashboard'], queryFn: () => fetch('/api/dashboard').then(r => r.json()) });
  const { data: recentRidesApi, isLoading: isLoadingRides } = useQuery({ queryKey: ['recentRides'], queryFn: () => fetch('/api/rides/recent').then(r => r.json()) });
  const { data: drivers, isLoading: isLoadingDrivers } = useQuery({ queryKey: ['drivers'], queryFn: () => fetch('/api/drivers').then(r => r.json()) });
  const { data: pendingPaymentsApi, isLoading: isLoadingPayments } = useQuery({ queryKey: ['pendingPayments'], queryFn: () => fetch('/api/payments/pending').then(r => r.json()) });

  if (isLoadingDash || isLoadingRides || isLoadingDrivers || isLoadingPayments) {
    return <div className="flex h-64 items-center justify-center text-muted">Loading live data...</div>;
  }

  const DASHBOARD_STATS = dashboard?.stats || {};
  const REVENUE_CHART = dashboard?.chart || [];
  const DRIVERS = drivers || [];
  const recentRides = recentRidesApi || [];
  const pendingPayments = pendingPaymentsApi || [];

  return (
    <div className="space-y-6 animate-fade-up">

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Active Rides" value={DASHBOARD_STATS.activeRides} delta="12% vs yesterday" up color="#c8f53a" delay={0} />
        <KpiCard label="Today's Revenue" value={fmtGHS(DASHBOARD_STATS.todayRevenue)} delta="8.4% vs yesterday" up color="#3af5a0" delay={60} />
        <KpiCard label="Drivers Online" value={DASHBOARD_STATS.driversOnline} delta="1 from peak" color="#3a8bf5" delay={120} />
        <KpiCard label="Cancellation Rate" value={`${DASHBOARD_STATS.cancellationRate}%`} delta="3% better" up color="#f53a7a" delay={180} />
      </div>

      {/* Row 2: Chart + Drivers */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Revenue Chart */}
        <div className="card xl:col-span-2">
          <div className="card-header">
            <span className="card-title">Revenue — Last 7 Days</span>
            <span className="badge bg-success/10 text-success">GHS</span>
          </div>
          <div className="p-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_CHART} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c8f53a" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#c8f53a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: '#5a5a72', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#5a5a72', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#111118', border: '1px solid #222230', borderRadius: 8, fontSize: 11, fontFamily: 'DM Mono' }}
                  labelStyle={{ color: '#c8f53a' }}
                  itemStyle={{ color: '#e8e8f0' }}
                  formatter={(v: number) => [`₵${v}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#c8f53a" strokeWidth={2} fill="url(#revGrad)" dot={{ fill: '#c8f53a', r: 3 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Driver Status */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Drivers</span>
            <span className="badge bg-accent/10 text-accent">{DRIVERS.length} total</span>
          </div>
          <div>
            {DRIVERS.map((d: any) => (
              <div key={d.id} className="flex items-center gap-3 px-6 py-3 border-b border-border/50 last:border-0 hover:bg-surface2 transition-colors cursor-pointer">
                <Avatar name={d.full_name!} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{d.full_name}</div>
                  <div className="text-[10px] text-muted">{d.vehicle_make} {d.vehicle_model} · ⭐ {d.rating}</div>
                </div>
                <DriverBadge status={d.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Payments donut + Recent rides + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Payment Breakdown */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Payment Methods</span>
            <span className="badge bg-accent2/10 text-accent2">Today</span>
          </div>
          <div className="flex items-center gap-6 p-6">
            <PieChart width={100} height={100}>
              <Pie data={PIE_DATA} cx={46} cy={46} innerRadius={28} outerRadius={46} dataKey="value" strokeWidth={0}>
                {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
            <div className="flex-1 space-y-2.5">
              {PIE_DATA.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-[11px] text-muted flex-1">{item.name}</span>
                  <span className="text-xs font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-border">
            {[['5', 'Completed', 'text-success'], ['1', 'Pending', 'text-warning'], ['0', 'Failed', 'text-accent3']].map(([v, l, c]) => (
              <div key={l} className="py-4 text-center border-r border-border last:border-0">
                <div className={`font-display font-bold text-xl ${c}`}>{v}</div>
                <div className="text-[10px] text-muted">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Rides */}
        <div className="card lg:col-span-2">
          <div className="card-header">
            <span className="card-title">Recent Rides</span>
            <span className="badge bg-accent/10 text-accent">Latest 5</span>
          </div>
          <div>
            {recentRides.map((ride: any) => (
              <div key={ride.id} className="flex items-center gap-4 px-6 py-3.5 border-b border-border/50 last:border-0 hover:bg-surface2 transition-colors cursor-pointer">
                <Avatar name={ride.rider_name ?? '?'} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium">{ride.rider_name}</span>
                    <span className="text-[10px] text-muted">→ {ride.driver_name ?? 'Unassigned'}</span>
                  </div>
                  <div className="text-[10px] text-muted truncate">{ride.origin_address} → {ride.dest_address}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-medium mb-1">{fmtGHS(ride.final_fare || 0)}</div>
                  <RideBadge status={ride.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Payments Alert */}
      {pendingPayments.length > 0 && (
        <div className="card border-warning/30">
          <div className="card-header">
            <span className="card-title text-warning">⚠ Pending Payments</span>
            <span className="badge bg-warning/10 text-warning">{pendingPayments.length} stalled</span>
          </div>
          <div>
            {pendingPayments.map((p: any) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-3.5 border-b border-border/50 last:border-0">
                <div className="flex-1">
                  <div className="text-xs font-medium">{p.rider_name} — {p.origin_address} → {p.dest_address}</div>
                  <div className="text-[10px] text-muted mt-0.5">Initiated {timeAgo(p.created_at)} · {fmtGHS(p.amount)} · {p.method}</div>
                </div>
                <button className="btn-ghost text-[11px] py-1.5">Investigate</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
