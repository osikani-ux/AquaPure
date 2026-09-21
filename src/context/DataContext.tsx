import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking, Customer, ServiceRecord, Payment } from '../types';

interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface DataContextType {
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'finalPrice'>) => Booking;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;

  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => Customer;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;

  // Service Records
  serviceRecords: ServiceRecord[];
  addServiceRecord: (record: Omit<ServiceRecord, 'id' | 'createdAt'>) => void;

  // Payments
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  updatePayment: (id: string, updates: Partial<Payment>) => void;

  // Contact Messages
  messages: ContactMessage[];
  addMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Helpers
  getCustomerBookings: (customerId: string) => Booking[];
  getBookingCustomer: (bookingId: string) => Customer | undefined;
  getCustomerPayments: (customerId: string) => Payment[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// LocalStorage keys
const STORAGE_KEYS = {
  BOOKINGS: 'aquapure_bookings',
  CUSTOMERS: 'aquapure_customers',
  SERVICE_RECORDS: 'aquapure_service_records',
  PAYMENTS: 'aquapure_payments',
  MESSAGES: 'aquapure_messages',
};

// Helper to load from localStorage
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

// Helper to save to localStorage
function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => 
    loadFromStorage(STORAGE_KEYS.BOOKINGS, [])
  );
  const [customers, setCustomers] = useState<Customer[]>(() => 
    loadFromStorage(STORAGE_KEYS.CUSTOMERS, [])
  );
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>(() => 
    loadFromStorage(STORAGE_KEYS.SERVICE_RECORDS, [])
  );
  const [payments, setPayments] = useState<Payment[]>(() => 
    loadFromStorage(STORAGE_KEYS.PAYMENTS, [])
  );
  const [messages, setMessages] = useState<ContactMessage[]>(() => 
    loadFromStorage(STORAGE_KEYS.MESSAGES, [])
  );

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BOOKINGS, bookings);
  }, [bookings]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);
  }, [customers]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SERVICE_RECORDS, serviceRecords);
  }, [serviceRecords]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PAYMENTS, payments);
  }, [payments]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.MESSAGES, messages);
  }, [messages]);

  // Booking operations
  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'finalPrice'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: String(Date.now()),
      status: 'pending',
      finalPrice: null,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  // Customer operations
  const addCustomer = (customerData: Omit<Customer, 'id' | 'createdAt'>): Customer => {
    // Check if customer already exists by phone
    const existing = customers.find(c => c.phone === customerData.phone);
    if (existing) return existing;

    const newCustomer: Customer = {
      ...customerData,
      id: String(Date.now()),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomers(prev => [newCustomer, ...prev]);
    return newCustomer;
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  // Service Record operations
  const addServiceRecord = (recordData: Omit<ServiceRecord, 'id' | 'createdAt'>) => {
    const newRecord: ServiceRecord = {
      ...recordData,
      id: String(Date.now()),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setServiceRecords(prev => [newRecord, ...prev]);
  };

  // Payment operations
  const addPayment = (paymentData: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: String(Date.now()),
    };
    setPayments(prev => [newPayment, ...prev]);
  };

  const updatePayment = (id: string, updates: Partial<Payment>) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  // Message operations
  const addMessage = (messageData: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...messageData,
      id: String(Date.now()),
      createdAt: new Date().toLocaleString(),
      read: false,
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  // Helper functions
  const getCustomerBookings = (customerId: string) => {
    return bookings.filter(b => b.customerId === customerId);
  };

  const getBookingCustomer = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return undefined;
    return customers.find(c => c.id === booking.customerId);
  };

  const getCustomerPayments = (customerId: string) => {
    const customerBookings = bookings.filter(b => b.customerId === customerId);
    const bookingIds = customerBookings.map(b => b.id);
    return payments.filter(p => bookingIds.includes(p.bookingId));
  };

  return (
    <DataContext.Provider value={{
      bookings, addBooking, updateBooking, deleteBooking,
      customers, addCustomer, updateCustomer,
      serviceRecords, addServiceRecord,
      payments, addPayment, updatePayment,
      messages, addMessage, markMessageRead, deleteMessage,
      getCustomerBookings, getBookingCustomer, getCustomerPayments,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
