export type UserRole = 'rider' | 'driver' | 'admin';
export type DriverStatus = 'active' | 'offline' | 'busy';
export type VehicleType = 'economy' | 'comfort' | 'premium' | 'xl';
export type RideStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'cash' | 'wallet' | 'promo';
export type DiscountType = 'percentage' | 'fixed';

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: UserRole;
  avatar_url: string | null;
  rating: number;
  is_verified: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plate_number: string;
  color: string;
  vehicle_type: VehicleType;
  is_active: boolean;
  created_at: string;
}

export interface DriverProfile {
  id: string;
  user_id: string;
  vehicle_id: string | null;
  license_number: string;
  license_expiry: string;
  status: DriverStatus;
  current_lat: number | null;
  current_lng: number | null;
  total_rides: number;
  // Joined fields
  full_name?: string;
  email?: string;
  rating?: number;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_type?: VehicleType;
  plate_number?: string;
}

export interface RideRequest {
  id: string;
  rider_id: string;
  driver_id: string | null;
  promo_code_id: string | null;
  origin_lat: number;
  origin_lng: number;
  origin_address: string;
  dest_lat: number;
  dest_lng: number;
  dest_address: string;
  status: RideStatus;
  vehicle_type: VehicleType;
  base_fare: number;
  discount_amount: number;
  final_fare: number;
  distance_km: number | null;
  duration_minutes: number | null;
  accepted_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  cancel_reason: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  rider_name?: string;
  driver_name?: string;
}

export interface Payment {
  id: string;
  ride_id: string;
  user_id: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  gateway_ref: string | null;
  paid_at: string | null;
  created_at: string;
  // Joined
  rider_name?: string;
  origin_address?: string;
  dest_address?: string;
}

export interface Rating {
  id: string;
  ride_id: string;
  rater_id: string;
  ratee_id: string;
  score: number;
  comment: string | null;
  created_at: string;
  rater_name?: string;
  ratee_name?: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discount_type: DiscountType;
  discount_value: number;
  min_ride_amount: number;
  max_uses: number | null;
  uses_count: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  updated_at: string;
  full_name?: string;
}

export interface DashboardStats {
  activeRides: number;
  todayRevenue: number;
  driversOnline: number;
  cancellationRate: number;
  totalRidesToday: number;
  pendingPayments: number;
}

export interface RevenuePoint {
  day: string;
  revenue: number;
  rides: number;
}
