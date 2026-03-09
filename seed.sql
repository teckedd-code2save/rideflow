-- seed.sql

BEGIN;

-- 1. Seed Users
INSERT INTO users (id, email, full_name, phone, role, rating, is_verified, created_at, updated_at) VALUES
('a1000001-0000-0000-0000-000000000001', 'james.osei@gmail.com', 'James Osei', '+233241000001', 'rider', 4.80, true, '2024-01-15T08:00:00Z', '2024-01-15T08:00:00Z'),
('a1000001-0000-0000-0000-000000000002', 'amara.diallo@gmail.com', 'Amara Diallo', '+233241000002', 'rider', 4.95, true, '2024-02-03T09:00:00Z', '2024-02-03T09:00:00Z'),
('a1000001-0000-0000-0000-000000000003', 'kofi.mensah@gmail.com', 'Kofi Mensah', '+233241000003', 'rider', 4.60, true, '2024-02-20T10:00:00Z', '2024-02-20T10:00:00Z'),
('a1000001-0000-0000-0000-000000000004', 'fatima.nkrumah@gmail.com', 'Fatima Nkrumah', '+233241000004', 'rider', 4.75, true, '2024-03-05T11:00:00Z', '2024-03-05T11:00:00Z'),
('a1000001-0000-0000-0000-000000000005', 'emeka.obi@gmail.com', 'Emeka Obi', '+233241000005', 'rider', 4.90, false, '2024-03-18T12:00:00Z', '2024-03-18T12:00:00Z'),
('a1000001-0000-0000-0000-000000000006', 'ama.owusu@gmail.com', 'Ama Owusu', '+233241000006', 'rider', 4.55, true, '2024-04-01T13:00:00Z', '2024-04-01T13:00:00Z'),
('a1000001-0000-0000-0000-000000000007', 'yaw.boateng@gmail.com', 'Yaw Boateng', '+233241000007', 'rider', 4.85, true, '2024-04-12T14:00:00Z', '2024-04-12T14:00:00Z'),
('a1000001-0000-0000-0000-000000000008', 'linda.asante@gmail.com', 'Linda Asante', '+233241000008', 'rider', 4.70, true, '2024-04-20T15:00:00Z', '2024-04-20T15:00:00Z'),
('a1000001-0000-0000-0000-000000000009', 'esi.amoah@gmail.com', 'Esi Amoah', '+233241000009', 'rider', 4.65, true, '2024-05-01T08:00:00Z', '2024-05-01T08:00:00Z'),
('a1000001-0000-0000-0000-000000000010', 'kweku.dankwah@gmail.com', 'Kweku Dankwah', '+233241000010', 'rider', 4.50, false, '2024-05-10T09:00:00Z', '2024-05-10T09:00:00Z'),
('d2000001-0000-0000-0000-000000000001', 'kwame.driver@gmail.com', 'Kwame Acheampong', '+233241001001', 'driver', 4.92, true, '2023-11-01T08:00:00Z', '2023-11-01T08:00:00Z'),
('d2000001-0000-0000-0000-000000000002', 'abena.driver@gmail.com', 'Abena Frimpong', '+233241001002', 'driver', 4.78, true, '2023-11-15T09:00:00Z', '2023-11-15T09:00:00Z'),
('d2000001-0000-0000-0000-000000000003', 'kojo.driver@gmail.com', 'Kojo Asare', '+233241001003', 'driver', 4.65, true, '2023-12-01T10:00:00Z', '2023-12-01T10:00:00Z'),
('d2000001-0000-0000-0000-000000000004', 'efua.driver@gmail.com', 'Efua Mensah', '+233241001004', 'driver', 4.88, true, '2023-12-15T11:00:00Z', '2023-12-15T11:00:00Z'),
('d2000001-0000-0000-0000-000000000005', 'nii.driver@gmail.com', 'Nii Armah', '+233241001005', 'driver', 4.55, false, '2024-01-05T12:00:00Z', '2024-01-05T12:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- 2. Seed Driver Profiles
INSERT INTO driver_profiles (user_id, license_number, license_expiry, status, current_lat, current_lng, total_rides, vehicle_make, vehicle_model, vehicle_type, plate_number) VALUES
('d2000001-0000-0000-0000-000000000001', 'GH-DRV-001234', '2027-06-30', 'active', 5.6037, -0.1870, 412, 'Toyota', 'Corolla', 'economy', 'GR-1234-21'),
('d2000001-0000-0000-0000-000000000002', 'GH-DRV-002345', '2026-12-31', 'busy', 5.5912, -0.1976, 289, 'Honda', 'Accord', 'comfort', 'AS-5678-22'),
('d2000001-0000-0000-0000-000000000003', 'GH-DRV-003456', '2027-03-31', 'offline', 5.6145, -0.2073, 178, 'Toyota', 'Camry', 'premium', 'CR-9012-22'),
('d2000001-0000-0000-0000-000000000004', 'GH-DRV-004567', '2028-01-31', 'active', 5.5801, -0.2318, 534, 'Hyundai', 'Elantra', 'economy', 'WR-3456-20'),
('d2000001-0000-0000-0000-000000000005', 'GH-DRV-005678', '2026-09-30', 'offline', 5.6521, -0.1723, 67, 'Toyota', 'HiAce', 'xl', 'ER-7890-21')
ON CONFLICT DO NOTHING;

-- 3. Seed Promo Codes
INSERT INTO promo_codes (id, code, discount_type, discount_value, min_ride_amount, max_uses, uses_count, is_active) VALUES
('ac400001-0000-4000-8000-000000000001', 'WELCOME20', 'percentage', 20, 10, 1000, 342, true),
('ac400001-0000-4000-8000-000000000002', 'FLAT5GH', 'fixed', 5, 0, 500, 128, true),
('ac400001-0000-4000-8000-000000000003', 'WEEKEND15', 'percentage', 15, 20, 200, 200, false),
('ac400001-0000-4000-8000-000000000004', 'NEWUSER30', 'percentage', 30, 5, 100, 1, true)
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Ride Requests
INSERT INTO ride_requests (id, rider_id, driver_id, promo_code_id, origin_lat, origin_lng, origin_address, dest_lat, dest_lng, dest_address, status, vehicle_type, base_fare, discount_amount, final_fare, distance_km, duration_minutes) VALUES
('b5000001-0000-4000-8000-000000000001', 'a1000001-0000-0000-0000-000000000001', 'd2000001-0000-0000-0000-000000000001', null, 5.6037, -0.1870, 'Accra Mall, Spintex Rd', 5.5502, -0.2174, 'Kotoka International Airport', 'completed', 'economy', 35, 0, 35, 12.4, 28),
('b5000001-0000-4000-8000-000000000002', 'a1000001-0000-0000-0000-000000000002', 'd2000001-0000-0000-0000-000000000002', 'ac400001-0000-4000-8000-000000000001', 5.5573, -0.1969, 'Osu Oxford Street', 5.6037, -0.1870, 'Accra Mall', 'completed', 'comfort', 28, 5.6, 22.4, 8.7, 19),
('b5000001-0000-4000-8000-000000000003', 'a1000001-0000-0000-0000-000000000003', 'd2000001-0000-0000-0000-000000000001', null, 5.6145, -0.2073, 'East Legon Hills', 5.5449, -0.2107, 'University of Ghana', 'completed', 'economy', 42, 0, 42, 15.1, 35),
('b5000001-0000-4000-8000-000000000004', 'a1000001-0000-0000-0000-000000000004', 'd2000001-0000-0000-0000-000000000004', 'ac400001-0000-4000-8000-000000000002', 5.5801, -0.2318, 'Dansoman High Street', 5.5573, -0.1969, 'Osu Oxford Street', 'completed', 'economy', 25, 5, 20, 7.8, 22),
('b5000001-0000-4000-8000-000000000005', 'a1000001-0000-0000-0000-000000000005', 'd2000001-0000-0000-0000-000000000002', null, 5.6521, -0.1723, 'Ashiaman Market', 5.6037, -0.1870, 'Accra Mall', 'in_progress', 'economy', 38, 0, 38, 13.5, null),
('b5000001-0000-4000-8000-000000000006', 'a1000001-0000-0000-0000-000000000006', null, null, 5.5912, -0.1976, 'Cantonments Road', 5.6145, -0.2073, 'East Legon', 'requested', 'comfort', 30, 0, 30, null, null),
('b5000001-0000-4000-8000-000000000007', 'a1000001-0000-0000-0000-000000000007', 'd2000001-0000-0000-0000-000000000003', null, 5.5449, -0.2107, 'University of Ghana', 5.5573, -0.1969, 'Osu', 'cancelled', 'economy', 22, 0, 22, null, null),
('b5000001-0000-4000-8000-000000000008', 'a1000001-0000-0000-0000-000000000008', 'd2000001-0000-0000-0000-000000000004', null, 5.6037, -0.1870, 'Accra Mall', 5.5912, -0.1976, 'Cantonments', 'completed', 'premium', 55, 0, 55, 9.2, 21),
('b5000001-0000-4000-8000-000000000009', 'a1000001-0000-0000-0000-000000000009', 'd2000001-0000-0000-0000-000000000001', null, 5.5573, -0.1969, 'Osu', 5.6521, -0.1723, 'Ashiaman', 'completed', 'economy', 40, 0, 40, 14.2, 32),
('b5000001-0000-4000-8000-000000000010', 'a1000001-0000-0000-0000-000000000010', 'd2000001-0000-0000-0000-000000000004', 'ac400001-0000-4000-8000-000000000004', 5.5449, -0.2107, 'University of Ghana', 5.5801, -0.2318, 'Dansoman', 'completed', 'xl', 65, 19.5, 45.5, 18.3, 40)
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Payments
INSERT INTO payments (ride_id, user_id, amount, method, status) VALUES
('b5000001-0000-4000-8000-000000000001', 'a1000001-0000-0000-0000-000000000001', 35, 'card', 'completed'),
('b5000001-0000-4000-8000-000000000002', 'a1000001-0000-0000-0000-000000000002', 22.4, 'wallet', 'completed'),
('b5000001-0000-4000-8000-000000000003', 'a1000001-0000-0000-0000-000000000003', 42, 'cash', 'completed'),
('b5000001-0000-4000-8000-000000000004', 'a1000001-0000-0000-0000-000000000004', 20, 'card', 'completed'),
('b5000001-0000-4000-8000-000000000005', 'a1000001-0000-0000-0000-000000000005', 38, 'card', 'pending'),
('b5000001-0000-4000-8000-000000000008', 'a1000001-0000-0000-0000-000000000008', 55, 'card', 'completed'),
('b5000001-0000-4000-8000-000000000009', 'a1000001-0000-0000-0000-000000000009', 40, 'cash', 'completed'),
('b5000001-0000-4000-8000-000000000010', 'a1000001-0000-0000-0000-000000000010', 45.5, 'card', 'completed')
ON CONFLICT DO NOTHING;

-- 6. Seed Wallets
INSERT INTO wallets (user_id, balance, currency) VALUES
('a1000001-0000-0000-0000-000000000001', 120.50, 'GHS'),
('a1000001-0000-0000-0000-000000000002', 45.00, 'GHS'),
('a1000001-0000-0000-0000-000000000003', 0.00, 'GHS'),
('d2000001-0000-0000-0000-000000000001', 890.00, 'GHS'),
('d2000001-0000-0000-0000-000000000002', 560.75, 'GHS'),
('d2000001-0000-0000-0000-000000000004', 1240.20, 'GHS')
ON CONFLICT DO NOTHING;

COMMIT;
