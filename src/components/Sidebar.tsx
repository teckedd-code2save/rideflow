import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Map, Car, Users, CreditCard,
  Ticket, BarChart2, Settings, Radio
} from 'lucide-react';
import clsx from 'clsx';

const nav = [
  { section: 'Monitor', items: [
    { to: '/',         icon: LayoutDashboard, label: 'Dashboard', dot: true },
    { to: '/rides',    icon: Car,             label: 'Rides' },
    { to: '/map',      icon: Map,             label: 'Live Map' },
  ]},
  { section: 'Manage', items: [
    { to: '/drivers',  icon: Radio,   label: 'Drivers' },
    { to: '/riders',   icon: Users,   label: 'Riders' },
  ]},
  { section: 'Finance', items: [
    { to: '/payments', icon: CreditCard, label: 'Payments' },
    { to: '/promos',   icon: Ticket,     label: 'Promo Codes' },
  ]},
  { section: 'System', items: [
    { to: '/analytics', icon: BarChart2, label: 'Analytics' },
    { to: '/settings',  icon: Settings,  label: 'Settings' },
  ]},
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[220px] bg-surface border-r border-border flex flex-col z-20">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-border">
        <div className="font-display font-extrabold text-xl tracking-tight">
          Ride<span className="text-accent">Flow</span>
        </div>
        <div className="text-[10px] tracking-[3px] uppercase text-muted mt-0.5">Operations</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {nav.map(group => (
          <div key={group.section}>
            <div className="text-[9px] tracking-[2px] uppercase text-muted/50 px-6 pt-4 pb-2">
              {group.section}
            </div>
            {group.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-6 py-2.5 text-xs tracking-wide transition-all duration-150 border-l-2',
                    isActive
                      ? 'text-accent border-accent bg-accent/5'
                      : 'text-muted border-transparent hover:text-white hover:bg-surface2'
                  )
                }
              >
                <item.icon size={15} />
                {item.label}
                {item.dot && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border">
        <div className="text-[10px] text-muted">v1.0.0 · Accra, GH</div>
      </div>
    </aside>
  );
}
