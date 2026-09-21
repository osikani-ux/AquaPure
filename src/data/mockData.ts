import { Booking, Customer, ServiceRecord, Payment } from '../types';

export const mockCustomers: Customer[] = [
  { id: '1', name: 'Kwame Asante', phone: '+233 24 555 1234', whatsapp: '+233 24 555 1234', email: 'kwame@email.com', address: '15 Independence Ave, East Legon', location: 'East Legon', createdAt: '2024-01-15' },
  { id: '2', name: 'Ama Mensah', phone: '+233 20 777 5678', whatsapp: '+233 20 777 5678', email: 'ama@email.com', address: '23 Oxford St, Osu', location: 'Osu', createdAt: '2024-02-20' },
  { id: '3', name: 'Kofi Boateng', phone: '+233 27 888 9012', whatsapp: '+233 27 888 9012', email: 'kofi@email.com', address: '8 Airport Residential', location: 'Airport Residential', createdAt: '2024-03-10' },
  { id: '4', name: 'Abena Osei', phone: '+233 55 333 4567', whatsapp: '+233 55 333 4567', email: 'abena@email.com', address: '42 Tema Community 1', location: 'Tema', createdAt: '2024-04-05' },
  { id: '5', name: 'Yaw Darko Hotels', phone: '+233 24 111 2233', whatsapp: '+233 24 111 2233', email: 'info@yawdarkohotels.com', address: '100 Liberation Rd, Dzorwulu', location: 'Dzorwulu', createdAt: '2024-01-02' },
  { id: '6', name: 'Efua Addo', phone: '+233 50 444 7890', whatsapp: '+233 50 444 7890', email: 'efua@email.com', address: '7 Cantonments Rd', location: 'Cantonments', createdAt: '2024-05-12' },
];

export const mockBookings: Booking[] = [
  { id: '1', customerId: '1', customerName: 'Kwame Asante', customerPhone: '+233 24 555 1234', serviceType: 'Professional Tank Care', tankSize: '2,000L', numberOfTanks: 1, propertyType: 'Home', preferredDate: '2025-01-20', preferredTime: '09:00 AM', status: 'completed', estimatedPrice: 250, finalPrice: 250, notes: '', address: '15 Independence Ave, East Legon', location: 'East Legon', createdAt: '2025-01-18' },
  { id: '2', customerId: '2', customerName: 'Ama Mensah', customerPhone: '+233 20 777 5678', serviceType: 'Essential Tank Clean', tankSize: '1,000L', numberOfTanks: 1, propertyType: 'Apartment', preferredDate: '2025-01-22', preferredTime: '10:00 AM', status: 'confirmed', estimatedPrice: 150, finalPrice: null, notes: 'Rooftop tank', address: '23 Oxford St, Osu', location: 'Osu', createdAt: '2025-01-19' },
  { id: '3', customerId: '5', customerName: 'Yaw Darko Hotels', customerPhone: '+233 24 111 2233', serviceType: 'Commercial Tank Service', tankSize: '10,000L', numberOfTanks: 3, propertyType: 'Hotel', preferredDate: '2025-01-25', preferredTime: '08:00 AM', status: 'pending', estimatedPrice: 1500, finalPrice: null, notes: 'Multiple tanks, scheduled maintenance', address: '100 Liberation Rd, Dzorwulu', location: 'Dzorwulu', createdAt: '2025-01-20' },
  { id: '4', customerId: '3', customerName: 'Kofi Boateng', customerPhone: '+233 27 888 9012', serviceType: 'Premium Tank Care', tankSize: '5,000L', numberOfTanks: 2, propertyType: 'Home', preferredDate: '2025-01-23', preferredTime: '11:00 AM', status: 'in-progress', estimatedPrice: 665, finalPrice: null, notes: '2 tanks with 10% discount', address: '8 Airport Residential', location: 'Airport Residential', createdAt: '2025-01-21' },
  { id: '5', customerId: '4', customerName: 'Abena Osei', customerPhone: '+233 55 333 4567', serviceType: 'Essential Tank Clean', tankSize: '1,500L', numberOfTanks: 1, propertyType: 'Home', preferredDate: '2025-01-15', preferredTime: '02:00 PM', status: 'completed', estimatedPrice: 200, finalPrice: 200, notes: '', address: '42 Tema Community 1', location: 'Tema', createdAt: '2025-01-13' },
  { id: '6', customerId: '6', customerName: 'Efua Addo', customerPhone: '+233 50 444 7890', serviceType: 'Professional Tank Care', tankSize: '2,500L', numberOfTanks: 1, propertyType: 'Home', preferredDate: '2025-01-28', preferredTime: '09:00 AM', status: 'pending', estimatedPrice: 300, finalPrice: null, notes: '', address: '7 Cantonments Rd', location: 'Cantonments', createdAt: '2025-01-22' },
  { id: '7', customerId: '1', customerName: 'Kwame Asante', customerPhone: '+233 24 555 1234', serviceType: 'Professional Tank Care', tankSize: '2,000L', numberOfTanks: 1, propertyType: 'Home', preferredDate: '2025-02-10', preferredTime: '10:00 AM', status: 'confirmed', estimatedPrice: 250, finalPrice: null, notes: 'Regular maintenance', address: '15 Independence Ave, East Legon', location: 'East Legon', createdAt: '2025-01-25' },
  { id: '8', customerId: '2', customerName: 'Ama Mensah', customerPhone: '+233 20 777 5678', serviceType: 'Essential Tank Clean', tankSize: '1,000L', numberOfTanks: 1, propertyType: 'Apartment', preferredDate: '2025-01-10', preferredTime: '03:00 PM', status: 'cancelled', estimatedPrice: 150, finalPrice: null, notes: 'Customer rescheduled', address: '23 Oxford St, Osu', location: 'Osu', createdAt: '2025-01-08' },
];

export const mockServiceRecords: ServiceRecord[] = [
  { id: '1', bookingId: '1', tankCondition: 'Moderate sediment buildup. Cover in good condition.', cleaningPerformed: 'Full tank drainage, sediment removal, interior scrubbing, rinsing, disinfection applied.', observations: 'Float valve functioning properly. Minor staining on interior walls.', recommendations: 'Schedule next cleaning in 6 months. Consider cover replacement within 12 months.', nextServiceDate: '2025-07-20', createdAt: '2025-01-20' },
  { id: '2', bookingId: '5', tankCondition: 'Light sediment. Tank in good overall condition.', cleaningPerformed: 'Tank drainage, sediment removal, interior cleaning, rinsing.', observations: 'No significant issues found. Inlet/outlet in good condition.', recommendations: 'Next cleaning recommended in 6 months.', nextServiceDate: '2025-07-15', createdAt: '2025-01-15' },
];

export const mockPayments: Payment[] = [
  { id: '1', bookingId: '1', amount: 250, paymentMethod: 'mobile-money', paymentStatus: 'paid', paymentDate: '2025-01-20' },
  { id: '2', bookingId: '5', amount: 200, paymentMethod: 'cash', paymentStatus: 'paid', paymentDate: '2025-01-15' },
];

export const revenueData = [
  { month: 'Aug', revenue: 2400, bookings: 8 },
  { month: 'Sep', revenue: 3200, bookings: 11 },
  { month: 'Oct', revenue: 2800, bookings: 9 },
  { month: 'Nov', revenue: 4100, bookings: 14 },
  { month: 'Dec', revenue: 3600, bookings: 12 },
  { month: 'Jan', revenue: 4800, bookings: 16 },
];

export const serviceDistribution = [
  { name: 'Essential Clean', value: 35 },
  { name: 'Professional Care', value: 40 },
  { name: 'Premium Care', value: 15 },
  { name: 'Commercial', value: 10 },
];
