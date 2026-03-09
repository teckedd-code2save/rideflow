import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Rides from '@/pages/Rides';
import Drivers from '@/pages/Drivers';
import Riders from '@/pages/Riders';
import Payments from '@/pages/Payments';
import Promos from '@/pages/Promos';
import Analytics from '@/pages/Analytics';
import { MapPage, Settings } from '@/pages/Other';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/rides"     element={<Rides />} />
          <Route path="/map"       element={<MapPage />} />
          <Route path="/drivers"   element={<Drivers />} />
          <Route path="/riders"    element={<Riders />} />
          <Route path="/payments"  element={<Payments />} />
          <Route path="/promos"    element={<Promos />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings"  element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
