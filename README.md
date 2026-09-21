# AquaPure Tank Services - Production Ready

A professional water tank cleaning and maintenance service website for Ghana. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd your-project-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure admin credentials**
   
   Edit `src/config/index.ts` and change these values:
   ```typescript
   export const ADMIN_EMAIL = "your-secure-email@example.com";
   export const ADMIN_PASSWORD = "YourStrongPassword123!";
   ```

4. **Update business information**
   
   Edit `src/config/index.ts` and update:
   ```typescript
   export const APP_CONFIG = {
     companyName: "Your Company Name",
     whatsappNumber: "+233XXXXXXXXX",  // Your WhatsApp number
     phone: "+233 XX XXX XXXX",
     email: "your-email@example.com",
     address: "Your Address, Ghana",
     serviceArea: "Your Service Area",
     // ... other settings
   };
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

7. **Deploy**
   
   The `dist` folder contains your production-ready build. Deploy it to:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

## 📋 Features

### Public Website
- **Home** - Professional landing page with hero section
- **Services** - Detailed service offerings with pricing
- **Pricing** - Transparent pricing with interactive calculator
- **About** - Company information and mission
- **How It Works** - 4-step process explanation
- **Contact** - Contact form and business information
- **Booking** - Online booking system

### Admin Dashboard
Access at `/admin/login` with your configured credentials.

#### Dashboard Features
1. **Overview** - Real-time stats and charts
2. **Bookings** - Manage all booking requests
   - View booking details
   - Update status (pending → confirmed → in-progress → completed)
   - Set final prices
   - Add admin notes
   - Search and filter
3. **Customers** - Customer management
   - View customer profiles
   - See service history
   - Schedule new services
   - Add notes
4. **Messages** - Contact form submissions
   - Mark as read
   - Delete messages
   - Unread badge counter
5. **Services** - Service management
   - Edit service details
   - Activate/deactivate services
   - Add new services
6. **Pricing** - Pricing configuration
   - Tank size pricing
   - Multi-tank discounts
   - Additional charges
   - All editable and toggleable
7. **Reports** - Analytics and insights
   - Date range filtering (Today/Week/Month/Year)
   - Revenue trends
   - Booking statistics
   - Service distribution
8. **Settings** - Business configuration

## 🔐 Security Notes

### Current Implementation
- Client-side authentication (demo purposes)
- Credentials stored in config file
- LocalStorage for session management

### For Production Deployment
**IMPORTANT:** Before deploying to production, implement:

1. **Backend API**
   - Node.js/Express or Next.js API routes
   - PostgreSQL/MySQL database
   - Proper authentication with JWT
   - Password hashing with bcrypt

2. **Environment Variables**
   ```bash
   # .env file
   VITE_ADMIN_EMAIL=your-email@example.com
   VITE_ADMIN_PASSWORD=your-secure-password
   ```

3. **Security Measures**
   - HTTPS/SSL certificate
   - Rate limiting
   - Input validation on server
   - SQL injection prevention
   - CSRF protection
   - XSS protection

4. **Payment Integration**
   - Paystack or Flutterwave for Ghana
   - Secure payment processing
   - Invoice generation

## 📊 Data Flow

### Booking Process
```
Customer fills booking form
    ↓
Creates customer record (if new)
    ↓
Creates booking with "pending" status
    ↓
Appears in admin dashboard
    ↓
Admin updates status and sets final price
    ↓
Customer receives confirmation
```

### Contact Process
```
Customer submits contact form
    ↓
Message saved to database
    ↓
Appears in admin Messages section
    ↓
Unread badge shows in sidebar
    ↓
Admin marks as read or deletes
```

## 🎨 Customization

### Colors
Edit `src/index.css` to change the color scheme:
```css
@theme {
  --color-navy-900: #102a43;
  --color-aqua-500: #00e5db;
  --color-cyan-500: #06b6d4;
  /* ... */
}
```

### Pricing
All pricing is managed through the admin dashboard:
- Tank size pricing
- Multi-tank discounts
- Additional charges
- Service packages

### Content
Update text content in respective page components:
- `src/pages/Home.tsx`
- `src/pages/Services.tsx`
- `src/pages/About.tsx`
- etc.

## 📱 Mobile Responsive

The website is fully responsive and works on:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Vite** - Build tool

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Development Server Issues
```bash
# Kill existing processes
lsof -ti:5173 | xargs kill -9

# Restart
npm run dev
```

### TypeScript Errors
```bash
# Check types
npm run typecheck
```

## 📞 Support

For issues or questions:
1. Check this README
2. Review the code comments
3. Check browser console for errors

## 📄 License

This project is proprietary software for AquaPure Tank Services.

## 🎯 Next Steps

After deployment:
1. Test all features thoroughly
2. Set up analytics (Google Analytics)
3. Configure email notifications
4. Set up backup system
5. Monitor performance
6. Gather user feedback
7. Iterate and improve

---

**Built with ❤️ for professional water tank services in Ghana**
