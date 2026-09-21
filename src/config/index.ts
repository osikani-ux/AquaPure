// Application Configuration
// All configurable values are stored here for easy management

export const APP_CONFIG = {
  companyName: "AquaPure Tank Services",
  tagline: "Clean Tank. Safer Water.",
  whatsappNumber: "+233241234567", // Configure your WhatsApp number
  whatsappMessage: "Hello, I would like to book a water tank cleaning service.",
  phone: "+233 24 123 4567",
  email: "info@aquapuretankgh.com",
  address: "Accra, Ghana",
  serviceArea: "Greater Accra & Surrounding Regions",
  businessHours: {
    weekdays: "Monday - Friday: 7:00 AM - 6:00 PM",
    saturday: "Saturday: 8:00 AM - 4:00 PM",
    sunday: "Sunday: Closed (Emergency services available)"
  }
};

// Admin credentials - CHANGE THESE before deploying to production
export const ADMIN_EMAIL = "admin@aquapuretankgh.com";
export const ADMIN_PASSWORD = "SecureP@ss2024!";

// WhatsApp link generator
export const getWhatsAppLink = (customMessage?: string) => {
  const message = customMessage || APP_CONFIG.whatsappMessage;
  const number = APP_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

// Currency formatter
export const formatGHS = (amount: number): string => {
  return `GH₵${amount.toLocaleString()}`;
};
