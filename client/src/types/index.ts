// Experience Types
export interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
  category: string;
  highlights: string[];
  slots?: Slot[];
  createdAt?: string;
  updatedAt?: string;
}

// Slot Types
export interface Slot {
  _id?: string;
  date: string;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  time: string;
  available: number;
  booked: number;
  _id?: string;
}

// Booking Types
export interface BookingData {
  experienceId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string;
  timeSlot: string;
  numberOfGuests: number;
  totalPrice: number;
  promoCode?: string;
  discount?: number;
}

export interface Booking {
  _id: string;
  experienceId: string | Experience;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string;
  timeSlot: string;
  numberOfGuests: number;
  totalPrice: number;
  promoCode?: string;
  discount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingReference: string;
  createdAt: string;
  updatedAt: string;
}

// Promo Code Types
export interface PromoCodeData {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  finalAmount: number;
}

export interface PromoCodeResponse {
  success: boolean;
  message: string;
  data?: PromoCodeData;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

// Error Types
export interface ApiError {
  success: false;
  message: string;
  error?: string;
}
