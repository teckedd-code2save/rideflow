import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const TITLES: Record<string, string> = {
  '/':          'Dashboard',
  '/rides':     'Rides',
  '/map':       'Live Map',
  '/drivers':   'Drivers',
  '/riders':    'Riders',
  '/payments':  'Payments',
  '/promos':    'Promo Codes',
  '/analytics': 'Analytics',
  '/settings':  'Settings',
};

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        <Topbar title={TITLES[pathname] ?? 'RideFlow'} />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
