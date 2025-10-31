import axios, { AxiosError } from 'axios';
import { 
  Experience, 
  BookingData, 
  Booking, 
  PromoCodeResponse,
  ApiResponse 
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Experience API
export const experienceAPI = {
  // Get all experiences
  getAll: async (): Promise<Experience[]> => {
    try {
      const response = await api.get<ApiResponse<Experience[]>>('/experiences');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },

  // Get single experience by ID
  getById: async (id: string): Promise<Experience> => {
    try {
      const response = await api.get<ApiResponse<Experience>>(`/experiences/${id}`);
      if (!response.data.data) {
        throw new Error('Experience not found');
      }
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching experience ${id}:`, error);
      throw error;
    }
  },
};

// Booking API
export const bookingAPI = {
  // Create new booking
  create: async (bookingData: BookingData): Promise<Booking> => {
    try {
      const response = await api.post<ApiResponse<Booking>>('/bookings', bookingData);
      if (!response.data.data) {
        throw new Error('Booking creation failed');
      }
      return response.data.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get booking by reference number
  getByReference: async (reference: string): Promise<Booking> => {
    try {
      const response = await api.get<ApiResponse<Booking>>(`/bookings/${reference}`);
      if (!response.data.data) {
        throw new Error('Booking not found');
      }
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching booking ${reference}:`, error);
      throw error;
    }
  },
};

// Promo Code API
export const promoAPI = {
  // Validate promo code
  validate: async (code: string, totalAmount: number): Promise<PromoCodeResponse> => {
    try {
      const response = await api.post<PromoCodeResponse>('/promo/validate', { 
        code, 
        totalAmount 
      });
      return response.data;
    } catch (error: any) {
      console.error('Error validating promo code:', error);
      // Return error response instead of throwing
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid promo code',
      };
    }
  },
};

export default api;
