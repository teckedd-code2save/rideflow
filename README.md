# RideFlow — Operations Dashboard

A production-ready admin dashboard for a ride-sharing platform, built with React + TypeScript + Tailwind.

## Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router v6** for navigation
- **date-fns** for date formatting
- **lucide-react** for icons

## Project Structure

```
rideflow/
├── src/
│   ├── components/
│   │   ├── Layout.tsx       # App shell (sidebar + topbar)
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── Topbar.tsx       # Header with live clock
│   │   └── ui.tsx           # Reusable UI primitives
│   ├── lib/
│   │   ├── data.ts          # Mock data (seeded from DB)
│   │   └── utils.ts         # Formatting helpers
│   ├── pages/
│   │   ├── Dashboard.tsx    # KPIs, charts, overview
│   │   ├── Rides.tsx        # Ride management + filtering
│   │   ├── Drivers.tsx      # Driver roster + status
│   │   ├── Riders.tsx       # Rider management
│   │   ├── Payments.tsx     # Payment tracking
│   │   ├── Promos.tsx       # Promo code management
│   │   ├── Analytics.tsx    # Revenue & performance charts
│   │   └── Other.tsx        # Map + Settings pages
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── App.tsx              # Router setup
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind + global styles
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Connecting to the Database

The app currently uses local mock data from `src/lib/data.ts` (seeded from the live PostgreSQL DB).

To wire it to the real backend, replace the static arrays in `data.ts` with API calls. Suggested pattern:

```typescript
// src/lib/api.ts
const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function fetchRides() {
  const res = await fetch(`${BASE}/rides`);
  return res.json();
}
```

## Database

The PostgreSQL schema is in `schema.sql` and seed data in `seed.sql`.

Tables: `users`, `vehicles`, `driver_profiles`, `promo_codes`, `ride_requests`,
        `payments`, `ratings`, `location_pings`, `wallets`, `wallet_transactions`

Connection string (Datafy):
```
postgresql://user:pass@host:5432/ride_sharing
```
