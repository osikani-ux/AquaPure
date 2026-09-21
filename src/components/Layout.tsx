import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Droplets } from 'lucide-react';
import { APP_CONFIG, getWhatsAppLink } from '../config';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-aqua-400" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-navy-900">{APP_CONFIG.companyName.split(' ')[0]}</span>
                <span className="text-lg font-light text-navy-600 ml-1">{APP_CONFIG.companyName.split(' ').slice(1).join(' ')}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? 'text-aqua-600 bg-aqua-50'
                      : 'text-navy-700 hover:text-aqua-600 hover:bg-navy-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/booking"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-aqua-600 to-cyan-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-aqua-600/25 hover:shadow-xl hover:shadow-aqua-600/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                Book Now
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-navy-700 hover:bg-navy-50 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-navy-100 shadow-xl">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive(link.to)
                      ? 'text-aqua-600 bg-aqua-50'
                      : 'text-navy-700 hover:bg-navy-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/booking"
                className="block w-full text-center mt-3 px-5 py-3 bg-gradient-to-r from-aqua-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua-500 to-cyan-500 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-bold">{APP_CONFIG.companyName}</span>
              </div>
              <p className="text-navy-300 text-sm leading-relaxed mb-4">
                Professional water tank cleaning, disinfection, inspection and maintenance services for homes and businesses across Ghana.
              </p>
              <p className="text-aqua-400 font-semibold text-sm">{APP_CONFIG.tagline}</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-navy-300 hover:text-aqua-400 text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/booking" className="text-navy-300 hover:text-aqua-400 text-sm transition-colors">
                    Book a Cleaning
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-navy-300">
                <li>Tank Cleaning</li>
                <li>Tank Disinfection</li>
                <li>Tank Inspection</li>
                <li>Tank Maintenance</li>
                <li>Commercial Services</li>
                <li>Annual Care Plans</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-navy-300">
                  <Phone className="w-4 h-4 text-aqua-400" />
                  <a href={`tel:${APP_CONFIG.phone}`} className="hover:text-aqua-400 transition-colors">{APP_CONFIG.phone}</a>
                </li>
                <li className="flex items-center gap-2 text-sm text-navy-300">
                  <Mail className="w-4 h-4 text-aqua-400" />
                  <a href={`mailto:${APP_CONFIG.email}`} className="hover:text-aqua-400 transition-colors">{APP_CONFIG.email}</a>
                </li>
                <li className="text-sm text-navy-300">
                  <span className="text-aqua-400">📍</span> {APP_CONFIG.address}
                </li>
                <li className="text-sm text-navy-300">
                  <span className="text-aqua-400">🕐</span> {APP_CONFIG.businessHours.weekdays}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-navy-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-navy-400 text-sm">
              © {new Date().getFullYear()} {APP_CONFIG.companyName}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to="/admin/login" className="text-navy-400 hover:text-aqua-400 text-sm transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute -top-10 right-0 bg-navy-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us
        </span>
      </a>
    </div>
  );
}
