import type {
  User, DriverProfile, RideRequest, Payment,
  PromoCode, Wallet, DashboardStats, RevenuePoint
} from '@/types';

// ── Users ────────────────────────────────────────────────────
export const USERS: User[] = [
  { id: 'a1000001-0000-0000-0000-000000000001', email: 'james.osei@gmail.com', full_name: 'James Osei', phone: '+233241000001', role: 'rider', avatar_url: null, rating: 4.80, is_verified: true, deleted_at: null, created_at: '2024-01-15T08:00:00Z', updated_at: '2024-01-15T08:00:00Z' },
  { id: 'a1000001-0000-0000-0000-000000000002', email: 'amara.diallo@gmail.com', full_name: 'Amara Diallo', phone: '+233241000002', role: 'rider', avatar_url: null, rating: 4.95, is_verified: true, deleted_at: null, created_at: '2024-02-03T09:00:00Z', updated_at: '2024-02-03T09:00:00Z' },
  { id: 'a1000001-0000-0000-0000-000000000003', email: 'kofi.mensah@gmail.com', full_name: 'Kofi Mensah', phone: '+233241000003', role: 'rider', avatar_url: null, rating: 4.60, is_verified: true, deleted_at: null, created_at: '2024-02-20T10:00:00Z', updated_at: '2024-02-20T10:00:00Z' },
  { id: 'a1000001-0000-0000-0000-000000000004', email: 'fatima.nkrumah@gmail.com', full_name: 'Fatima Nkrumah', phone: '+233241000004', role: 'rider', avatar_url: null, rating: 4.75, is_verified: true, deleted_at: null, created_at: '2024-03-05T11:00:00Z', updated_at: '2024-03-05T11:00:00Z' },
  { id: 'a1000001-0000-0000-0000-000000000005', email: 'emeka.obi@gmail.com', full_name: 'Emeka Obi', phone: '+233241000005', role: 'rider', avatar_url: null, rating: 4.90, is_verified: false, deleted_at: null, created_at: '2024-03-18T12:00:00Z', updated_at: '2024-03-18T12:00:00Z' },
  { id: 'a1000001-0000-0000-0000-000000000006', email: 'ama.owusu@gmail.com', full_name: 'Ama Owusu', phone: '+233241000006', role: 'rider', avatar_url: null, rating: 4.55, is_verified: true, deleted_at: null, created_at: '2024-04-01T13:00:00Z', updated_at: '2024-04-01T13:00:00Z' },
  { id: 'a1000001-0000-0000-0000-000000000007', email: 'yaw.boateng@gmail.com', full_name: 'Yaw Boateng', phone: '+233241000007', role: 'rider', avatar_url: null, rating: 4.85, is_verified: true, deleted_at: null, created_at: '2024-04-12T14:00:00Z', updated_at: '2024-04-12T14:00:00Z' },
  { id: 'a1000001-0000-0000-0000-000000000008', email: 'linda.asante@gmail.com', full_name: 'Linda Asante', phone: '+233241000008', role: 'rider', avatar_url: null, rating: 4.70, is_verified: true, deleted_at: null, created_at: '2024-04-20T15:00:00Z', updated_at: '2024-04-20T15:00:00Z' },
  { id: 'a1000001-0000-0000-0000-000000000009', email: 'esi.amoah@gmail.com', full_name: 'Esi Amoah', phone: '+233241000009', role: 'rider', avatar_url: null, rating: 4.65, is_verified: true, deleted_at: null, created_at: '2024-05-01T08:00:00Z', updated_at: '2024-05-01T08:00:00Z' },
  { id: 'a1000001-0000-0000-0000-000000000010', email: 'kweku.dankwah@gmail.com', full_name: 'Kweku Dankwah', phone: '+233241000010', role: 'rider', avatar_url: null, rating: 4.50, is_verified: false, deleted_at: null, created_at: '2024-05-10T09:00:00Z', updated_at: '2024-05-10T09:00:00Z' },
  { id: 'd2000001-0000-0000-0000-000000000001', email: 'kwame.driver@gmail.com', full_name: 'Kwame Acheampong', phone: '+233241001001', role: 'driver', avatar_url: null, rating: 4.92, is_verified: true, deleted_at: null, created_at: '2023-11-01T08:00:00Z', updated_at: '2023-11-01T08:00:00Z' },
  { id: 'd2000001-0000-0000-0000-000000000002', email: 'abena.driver@gmail.com', full_name: 'Abena Frimpong', phone: '+233241001002', role: 'driver', avatar_url: null, rating: 4.78, is_verified: true, deleted_at: null, created_at: '2023-11-15T09:00:00Z', updated_at: '2023-11-15T09:00:00Z' },
  { id: 'd2000001-0000-0000-0000-000000000003', email: 'kojo.driver@gmail.com', full_name: 'Kojo Asare', phone: '+233241001003', role: 'driver', avatar_url: null, rating: 4.65, is_verified: true, deleted_at: null, created_at: '2023-12-01T10:00:00Z', updated_at: '2023-12-01T10:00:00Z' },
  { id: 'd2000001-0000-0000-0000-000000000004', email: 'efua.driver@gmail.com', full_name: 'Efua Mensah', phone: '+233241001004', role: 'driver', avatar_url: null, rating: 4.88, is_verified: true, deleted_at: null, created_at: '2023-12-15T11:00:00Z', updated_at: '2023-12-15T11:00:00Z' },
  { id: 'd2000001-0000-0000-0000-000000000005', email: 'nii.driver@gmail.com', full_name: 'Nii Armah', phone: '+233241001005', role: 'driver', avatar_url: null, rating: 4.55, is_verified: false, deleted_at: null, created_at: '2024-01-05T12:00:00Z', updated_at: '2024-01-05T12:00:00Z' },
];

// ── Drivers ───────────────────────────────────────────────────
export const DRIVERS: DriverProfile[] = [
  { id: 'dp1', user_id: 'd2000001-0000-0000-0000-000000000001', vehicle_id: 'v1', license_number: 'GH-DRV-001234', license_expiry: '2027-06-30', status: 'active', current_lat: 5.6037, current_lng: -0.1870, total_rides: 412, full_name: 'Kwame Acheampong', email: 'kwame.driver@gmail.com', rating: 4.92, vehicle_make: 'Toyota', vehicle_model: 'Corolla', vehicle_type: 'economy', plate_number: 'GR-1234-21' },
  { id: 'dp2', user_id: 'd2000001-0000-0000-0000-000000000002', vehicle_id: 'v2', license_number: 'GH-DRV-002345', license_expiry: '2026-12-31', status: 'busy', current_lat: 5.5912, current_lng: -0.1976, total_rides: 289, full_name: 'Abena Frimpong', email: 'abena.driver@gmail.com', rating: 4.78, vehicle_make: 'Honda', vehicle_model: 'Accord', vehicle_type: 'comfort', plate_number: 'AS-5678-22' },
  { id: 'dp3', user_id: 'd2000001-0000-0000-0000-000000000003', vehicle_id: 'v3', license_number: 'GH-DRV-003456', license_expiry: '2027-03-31', status: 'offline', current_lat: 5.6145, current_lng: -0.2073, total_rides: 178, full_name: 'Kojo Asare', email: 'kojo.driver@gmail.com', rating: 4.65, vehicle_make: 'Toyota', vehicle_model: 'Camry', vehicle_type: 'premium', plate_number: 'CR-9012-22' },
  { id: 'dp4', user_id: 'd2000001-0000-0000-0000-000000000004', vehicle_id: 'v4', license_number: 'GH-DRV-004567', license_expiry: '2028-01-31', status: 'active', current_lat: 5.5801, current_lng: -0.2318, total_rides: 534, full_name: 'Efua Mensah', email: 'efua.driver@gmail.com', rating: 4.88, vehicle_make: 'Hyundai', vehicle_model: 'Elantra', vehicle_type: 'economy', plate_number: 'WR-3456-20' },
  { id: 'dp5', user_id: 'd2000001-0000-0000-0000-000000000005', vehicle_id: 'v5', license_number: 'GH-DRV-005678', license_expiry: '2026-09-30', status: 'offline', current_lat: 5.6521, current_lng: -0.1723, total_rides: 67, full_name: 'Nii Armah', email: 'nii.driver@gmail.com', rating: 4.55, vehicle_make: 'Toyota', vehicle_model: 'HiAce', vehicle_type: 'xl', plate_number: 'ER-7890-21' },
];

// ── Rides ─────────────────────────────────────────────────────
const now = Date.now();
const ago = (ms: number) => new Date(now - ms).toISOString();
const MIN = 60_000, HOUR = 3_600_000, DAY = 86_400_000;

export const RIDES: RideRequest[] = [
  { id: 'b5000001-0000-4000-8000-000000000001', rider_id: 'a1000001-0000-0000-0000-000000000001', driver_id: 'd2000001-0000-0000-0000-000000000001', promo_code_id: null, origin_lat: 5.6037, origin_lng: -0.1870, origin_address: 'Accra Mall, Spintex Rd', dest_lat: 5.5502, dest_lng: -0.2174, dest_address: 'Kotoka International Airport', status: 'completed', vehicle_type: 'economy', base_fare: 35, discount_amount: 0, final_fare: 35, distance_km: 12.4, duration_minutes: 28, accepted_at: ago(2*DAY+5*HOUR), started_at: ago(2*DAY+5*HOUR-3*MIN), completed_at: ago(2*DAY+4*HOUR+32*MIN), cancelled_at: null, cancel_reason: null, created_at: ago(2*DAY+5*HOUR+10*MIN), updated_at: ago(2*DAY+4*HOUR+32*MIN), rider_name: 'James Osei', driver_name: 'Kwame Acheampong' },
  { id: 'b5000001-0000-4000-8000-000000000002', rider_id: 'a1000001-0000-0000-0000-000000000002', driver_id: 'd2000001-0000-0000-0000-000000000002', promo_code_id: 'ac400001-0000-4000-8000-000000000001', origin_lat: 5.5573, origin_lng: -0.1969, origin_address: 'Osu Oxford Street', dest_lat: 5.6037, dest_lng: -0.1870, dest_address: 'Accra Mall', status: 'completed', vehicle_type: 'comfort', base_fare: 28, discount_amount: 5.6, final_fare: 22.4, distance_km: 8.7, duration_minutes: 19, accepted_at: ago(DAY+3*HOUR), started_at: ago(DAY+3*HOUR-2*MIN), completed_at: ago(DAY+2*HOUR+41*MIN), cancelled_at: null, cancel_reason: null, created_at: ago(DAY+3*HOUR+8*MIN), updated_at: ago(DAY+2*HOUR+41*MIN), rider_name: 'Amara Diallo', driver_name: 'Abena Frimpong' },
  { id: 'b5000001-0000-4000-8000-000000000003', rider_id: 'a1000001-0000-0000-0000-000000000003', driver_id: 'd2000001-0000-0000-0000-000000000001', promo_code_id: null, origin_lat: 5.6145, origin_lng: -0.2073, origin_address: 'East Legon Hills', dest_lat: 5.5449, dest_lng: -0.2107, dest_address: 'University of Ghana', status: 'completed', vehicle_type: 'economy', base_fare: 42, discount_amount: 0, final_fare: 42, distance_km: 15.1, duration_minutes: 35, accepted_at: ago(3*DAY+HOUR), started_at: ago(3*DAY+HOUR-4*MIN), completed_at: ago(3*DAY+29*MIN), cancelled_at: null, cancel_reason: null, created_at: ago(3*DAY+HOUR+15*MIN), updated_at: ago(3*DAY+29*MIN), rider_name: 'Kofi Mensah', driver_name: 'Kwame Acheampong' },
  { id: 'b5000001-0000-4000-8000-000000000004', rider_id: 'a1000001-0000-0000-0000-000000000004', driver_id: 'd2000001-0000-0000-0000-000000000004', promo_code_id: 'ac400001-0000-4000-8000-000000000002', origin_lat: 5.5801, origin_lng: -0.2318, origin_address: 'Dansoman High Street', dest_lat: 5.5573, dest_lng: -0.1969, dest_address: 'Osu Oxford Street', status: 'completed', vehicle_type: 'economy', base_fare: 25, discount_amount: 5, final_fare: 20, distance_km: 7.8, duration_minutes: 22, accepted_at: ago(12*HOUR), started_at: ago(12*HOUR-5*MIN), completed_at: ago(11*HOUR+43*MIN), cancelled_at: null, cancel_reason: null, created_at: ago(12*HOUR+12*MIN), updated_at: ago(11*HOUR+43*MIN), rider_name: 'Fatima Nkrumah', driver_name: 'Efua Mensah' },
  { id: 'b5000001-0000-4000-8000-000000000005', rider_id: 'a1000001-0000-0000-0000-000000000005', driver_id: 'd2000001-0000-0000-0000-000000000002', promo_code_id: null, origin_lat: 5.6521, origin_lng: -0.1723, origin_address: 'Ashiaman Market', dest_lat: 5.6037, dest_lng: -0.1870, dest_address: 'Accra Mall', status: 'in_progress', vehicle_type: 'economy', base_fare: 38, discount_amount: 0, final_fare: 38, distance_km: 13.5, duration_minutes: null, accepted_at: ago(18*MIN), started_at: ago(15*MIN), completed_at: null, cancelled_at: null, cancel_reason: null, created_at: ago(25*MIN), updated_at: ago(15*MIN), rider_name: 'Emeka Obi', driver_name: 'Abena Frimpong' },
  { id: 'b5000001-0000-4000-8000-000000000006', rider_id: 'a1000001-0000-0000-0000-000000000006', driver_id: null, promo_code_id: null, origin_lat: 5.5912, origin_lng: -0.1976, origin_address: 'Cantonments Road', dest_lat: 5.6145, dest_lng: -0.2073, dest_address: 'East Legon', status: 'requested', vehicle_type: 'comfort', base_fare: 30, discount_amount: 0, final_fare: 30, distance_km: null, duration_minutes: null, accepted_at: null, started_at: null, completed_at: null, cancelled_at: null, cancel_reason: null, created_at: ago(2*MIN), updated_at: ago(2*MIN), rider_name: 'Ama Owusu', driver_name: undefined },
  { id: 'b5000001-0000-4000-8000-000000000007', rider_id: 'a1000001-0000-0000-0000-000000000007', driver_id: 'd2000001-0000-0000-0000-000000000003', promo_code_id: null, origin_lat: 5.5449, origin_lng: -0.2107, origin_address: 'University of Ghana', dest_lat: 5.5573, dest_lng: -0.1969, dest_address: 'Osu', status: 'cancelled', vehicle_type: 'economy', base_fare: 22, discount_amount: 0, final_fare: 22, distance_km: null, duration_minutes: null, accepted_at: ago(5*DAY+2*HOUR), started_at: null, completed_at: null, cancelled_at: ago(5*DAY+2*HOUR-8*MIN), cancel_reason: 'Driver took too long', created_at: ago(5*DAY+2*HOUR+5*MIN), updated_at: ago(5*DAY+2*HOUR-8*MIN), rider_name: 'Yaw Boateng', driver_name: 'Kojo Asare' },
  { id: 'b5000001-0000-4000-8000-000000000008', rider_id: 'a1000001-0000-0000-0000-000000000008', driver_id: 'd2000001-0000-0000-0000-000000000004', promo_code_id: null, origin_lat: 5.6037, origin_lng: -0.1870, origin_address: 'Accra Mall', dest_lat: 5.5912, dest_lng: -0.1976, dest_address: 'Cantonments', status: 'completed', vehicle_type: 'premium', base_fare: 55, discount_amount: 0, final_fare: 55, distance_km: 9.2, duration_minutes: 21, accepted_at: ago(4*DAY+6*HOUR), started_at: ago(4*DAY+6*HOUR-3*MIN), completed_at: ago(4*DAY+5*HOUR+42*MIN), cancelled_at: null, cancel_reason: null, created_at: ago(4*DAY+6*HOUR+10*MIN), updated_at: ago(4*DAY+5*HOUR+42*MIN), rider_name: 'Linda Asante', driver_name: 'Efua Mensah' },
  { id: 'b5000001-0000-4000-8000-000000000009', rider_id: 'a1000001-0000-0000-0000-000000000009', driver_id: 'd2000001-0000-0000-0000-000000000001', promo_code_id: null, origin_lat: 5.5573, origin_lng: -0.1969, origin_address: 'Osu', dest_lat: 5.6521, dest_lng: -0.1723, dest_address: 'Ashiaman', status: 'completed', vehicle_type: 'economy', base_fare: 40, discount_amount: 0, final_fare: 40, distance_km: 14.2, duration_minutes: 32, accepted_at: ago(6*DAY+2*HOUR), started_at: ago(6*DAY+2*HOUR-4*MIN), completed_at: ago(6*DAY+HOUR+32*MIN), cancelled_at: null, cancel_reason: null, created_at: ago(6*DAY+2*HOUR+10*MIN), updated_at: ago(6*DAY+HOUR+32*MIN), rider_name: 'Esi Amoah', driver_name: 'Kwame Acheampong' },
  { id: 'b5000001-0000-4000-8000-000000000010', rider_id: 'a1000001-0000-0000-0000-000000000010', driver_id: 'd2000001-0000-0000-0000-000000000004', promo_code_id: 'ac400001-0000-4000-8000-000000000004', origin_lat: 5.5449, origin_lng: -0.2107, origin_address: 'University of Ghana', dest_lat: 5.5801, dest_lng: -0.2318, dest_address: 'Dansoman', status: 'completed', vehicle_type: 'xl', base_fare: 65, discount_amount: 19.5, final_fare: 45.5, distance_km: 18.3, duration_minutes: 40, accepted_at: ago(7*DAY+3*HOUR), started_at: ago(7*DAY+3*HOUR-5*MIN), completed_at: ago(7*DAY+2*HOUR+25*MIN), cancelled_at: null, cancel_reason: null, created_at: ago(7*DAY+3*HOUR+15*MIN), updated_at: ago(7*DAY+2*HOUR+25*MIN), rider_name: 'Kweku Dankwah', driver_name: 'Efua Mensah' },
];

// ── Payments ──────────────────────────────────────────────────
export const PAYMENTS: Payment[] = [
  { id: 'pay1', ride_id: 'b5000001-0000-4000-8000-000000000001', user_id: 'a1000001-0000-0000-0000-000000000001', amount: 35, method: 'card', status: 'completed', gateway_ref: 'TXN-001', paid_at: ago(2*DAY+4*HOUR+32*MIN), created_at: ago(2*DAY+5*HOUR+10*MIN), rider_name: 'James Osei', origin_address: 'Accra Mall', dest_address: 'Airport' },
  { id: 'pay2', ride_id: 'b5000001-0000-4000-8000-000000000002', user_id: 'a1000001-0000-0000-0000-000000000002', amount: 22.4, method: 'wallet', status: 'completed', gateway_ref: 'TXN-002', paid_at: ago(DAY+2*HOUR+41*MIN), created_at: ago(DAY+3*HOUR+8*MIN), rider_name: 'Amara Diallo', origin_address: 'Osu Oxford St', dest_address: 'Accra Mall' },
  { id: 'pay3', ride_id: 'b5000001-0000-4000-8000-000000000003', user_id: 'a1000001-0000-0000-0000-000000000003', amount: 42, method: 'cash', status: 'completed', gateway_ref: null, paid_at: ago(3*DAY+29*MIN), created_at: ago(3*DAY+HOUR+15*MIN), rider_name: 'Kofi Mensah', origin_address: 'East Legon', dest_address: 'Univ. of Ghana' },
  { id: 'pay4', ride_id: 'b5000001-0000-4000-8000-000000000004', user_id: 'a1000001-0000-0000-0000-000000000004', amount: 20, method: 'card', status: 'completed', gateway_ref: 'TXN-004', paid_at: ago(11*HOUR+43*MIN), created_at: ago(12*HOUR+12*MIN), rider_name: 'Fatima Nkrumah', origin_address: 'Dansoman', dest_address: 'Osu' },
  { id: 'pay5', ride_id: 'b5000001-0000-4000-8000-000000000005', user_id: 'a1000001-0000-0000-0000-000000000005', amount: 38, method: 'card', status: 'pending', gateway_ref: null, paid_at: null, created_at: ago(25*MIN), rider_name: 'Emeka Obi', origin_address: 'Ashiaman', dest_address: 'Accra Mall' },
  { id: 'pay6', ride_id: 'b5000001-0000-4000-8000-000000000008', user_id: 'a1000001-0000-0000-0000-000000000008', amount: 55, method: 'card', status: 'completed', gateway_ref: 'TXN-008', paid_at: ago(4*DAY+5*HOUR+42*MIN), created_at: ago(4*DAY+6*HOUR+10*MIN), rider_name: 'Linda Asante', origin_address: 'Accra Mall', dest_address: 'Cantonments' },
  { id: 'pay7', ride_id: 'b5000001-0000-4000-8000-000000000009', user_id: 'a1000001-0000-0000-0000-000000000009', amount: 40, method: 'cash', status: 'completed', gateway_ref: null, paid_at: ago(6*DAY+HOUR+32*MIN), created_at: ago(6*DAY+2*HOUR+10*MIN), rider_name: 'Esi Amoah', origin_address: 'Osu', dest_address: 'Ashiaman' },
  { id: 'pay8', ride_id: 'b5000001-0000-4000-8000-000000000010', user_id: 'a1000001-0000-0000-0000-000000000010', amount: 45.5, method: 'card', status: 'completed', gateway_ref: 'TXN-010', paid_at: ago(7*DAY+2*HOUR+25*MIN), created_at: ago(7*DAY+3*HOUR+15*MIN), rider_name: 'Kweku Dankwah', origin_address: 'Univ. of Ghana', dest_address: 'Dansoman' },
];

// ── Promo Codes ───────────────────────────────────────────────
export const PROMOS: PromoCode[] = [
  { id: 'ac400001-0000-4000-8000-000000000001', code: 'WELCOME20', discount_type: 'percentage', discount_value: 20, min_ride_amount: 10, max_uses: 1000, uses_count: 342, expires_at: new Date(now + 60*DAY).toISOString(), is_active: true, created_at: ago(90*DAY) },
  { id: 'ac400001-0000-4000-8000-000000000002', code: 'FLAT5GH', discount_type: 'fixed', discount_value: 5, min_ride_amount: 0, max_uses: 500, uses_count: 128, expires_at: new Date(now + 30*DAY).toISOString(), is_active: true, created_at: ago(60*DAY) },
  { id: 'ac400001-0000-4000-8000-000000000003', code: 'WEEKEND15', discount_type: 'percentage', discount_value: 15, min_ride_amount: 20, max_uses: 200, uses_count: 200, expires_at: ago(7*DAY), is_active: false, created_at: ago(45*DAY) },
  { id: 'ac400001-0000-4000-8000-000000000004', code: 'NEWUSER30', discount_type: 'percentage', discount_value: 30, min_ride_amount: 5, max_uses: 100, uses_count: 1, expires_at: new Date(now + 90*DAY).toISOString(), is_active: true, created_at: ago(30*DAY) },
];

// ── Wallets ───────────────────────────────────────────────────
export const WALLETS: Wallet[] = [
  { id: 'w1', user_id: 'a1000001-0000-0000-0000-000000000001', balance: 120.50, currency: 'GHS', updated_at: ago(DAY), full_name: 'James Osei' },
  { id: 'w2', user_id: 'a1000001-0000-0000-0000-000000000002', balance: 45.00, currency: 'GHS', updated_at: ago(DAY), full_name: 'Amara Diallo' },
  { id: 'w3', user_id: 'a1000001-0000-0000-0000-000000000003', balance: 0.00, currency: 'GHS', updated_at: ago(3*DAY), full_name: 'Kofi Mensah' },
  { id: 'w4', user_id: 'd2000001-0000-0000-0000-000000000001', balance: 890.00, currency: 'GHS', updated_at: ago(HOUR), full_name: 'Kwame Acheampong' },
  { id: 'w5', user_id: 'd2000001-0000-0000-0000-000000000002', balance: 560.75, currency: 'GHS', updated_at: ago(2*HOUR), full_name: 'Abena Frimpong' },
  { id: 'w6', user_id: 'd2000001-0000-0000-0000-000000000004', balance: 1240.20, currency: 'GHS', updated_at: ago(30*MIN), full_name: 'Efua Mensah' },
];

// ── Dashboard Stats ───────────────────────────────────────────
export const DASHBOARD_STATS: DashboardStats = {
  activeRides: 1,
  todayRevenue: 174.4,
  driversOnline: 2,
  cancellationRate: 10,
  totalRidesToday: 4,
  pendingPayments: 1,
};

export const REVENUE_CHART: RevenuePoint[] = [
  { day: 'Mon', revenue: 112, rides: 4 },
  { day: 'Tue', revenue: 198, rides: 7 },
  { day: 'Wed', revenue: 87,  rides: 3 },
  { day: 'Thu', revenue: 245, rides: 9 },
  { day: 'Fri', revenue: 320, rides: 11 },
  { day: 'Sat', revenue: 178, rides: 6 },
  { day: 'Sun', revenue: 174, rides: 4 },
];
