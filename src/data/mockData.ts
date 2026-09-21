import { Booking, Customer, ServiceRecord, Payment } from '../types';

// Start with empty arrays - data will be populated through user interactions
export const mockCustomers: Customer[] = [];

export const mockBookings: Booking[] = [];

export const mockServiceRecords: ServiceRecord[] = [];

export const mockPayments: Payment[] = [];

// Chart data will be calculated from actual bookings
export const revenueData: Array<{ month: string; revenue: number; bookings: number }> = [];

export const serviceDistribution: Array<{ name: string; value: number }> = [];
