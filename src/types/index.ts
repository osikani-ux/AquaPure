export interface Customer {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  location: string;
  createdAt: string;
}

export interface Tank {
  id: string;
  customerId: string;
  capacity: string;
  tankType: string;
  quantity: number;
  condition: string;
  notes: string;
  lastCleaning: string;
  nextServiceDate: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  tankSize: string;
  numberOfTanks: number;
  propertyType: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  estimatedPrice: number;
  finalPrice: number | null;
  notes: string;
  address: string;
  location: string;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  active: boolean;
  lastUpdated: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tankCapacityRange: string;
  startingPrice: number;
  active: boolean;
}

export interface ServiceRecord {
  id: string;
  bookingId: string;
  tankCondition: string;
  cleaningPerformed: string;
  observations: string;
  recommendations: string;
  nextServiceDate: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentMethod: 'cash' | 'mobile-money' | 'bank-transfer' | 'other';
  paymentStatus: 'pending' | 'paid' | 'partially-paid' | 'refunded';
  paymentDate: string;
}
