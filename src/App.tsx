import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import PricingPage from './pages/Pricing';
import AboutPage from './pages/About';
import HowItWorksPage from './pages/HowItWorks';
import ContactPage from './pages/Contact';
import BookingPage from './pages/Booking';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages with Layout */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/how-it-works" element={<Layout><HowItWorksPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/booking" element={<Layout><BookingPage /></Layout>} />

        {/* Admin Pages - No Layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<AdminDashboard />} />
        <Route path="/admin/messages" element={<AdminDashboard />} />
        <Route path="/admin/services" element={<AdminDashboard />} />
        <Route path="/admin/pricing" element={<AdminDashboard />} />
        <Route path="/admin/reports" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
