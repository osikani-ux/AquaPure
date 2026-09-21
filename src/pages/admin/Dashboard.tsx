import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, Users, Wrench, DollarSign, BarChart3, Settings, LogOut, Droplets, Search, Filter, Eye, Edit, CheckCircle2, XCircle, Clock, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockBookings, mockCustomers, revenueData, serviceDistribution } from '../../data/mockData';
import { Booking, Customer } from '../../types';
import { formatGHS, APP_CONFIG } from '../../config';

// Helper function to get date ranges
const getDateRange = (period: string) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (period) {
    case 'today':
      return { start: today, end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1) };
    case 'week':
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      return { start: weekStart, end: new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000 - 1) };
    case 'month':
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      return { start: monthStart, end: monthEnd };
    case 'year':
      const yearStart = new Date(now.getFullYear(), 0, 1);
      const yearEnd = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      return { start: yearStart, end: yearEnd };
    default:
      return { start: today, end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1) };
  }
};

type AdminPage = 'dashboard' | 'bookings' | 'customers' | 'services' | 'pricing' | 'reports' | 'settings';

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState<AdminPage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [reportPeriod, setReportPeriod] = useState('month'); // Default to month
  
  // Customer notes state: map of customerId -> array of notes
  const [customerNotes, setCustomerNotes] = useState<Record<string, Array<{ id: string; text: string; createdAt: string; author: string }>>>({});
  
  // Modal states for Schedule Service and Add Note
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [noteSuccess, setNoteSuccess] = useState(false);
  
  // Schedule form state
  const [scheduleForm, setScheduleForm] = useState({
    serviceType: 'Professional Tank Care',
    tankSize: '2,000L',
    numberOfTanks: '1',
    preferredDate: '',
    preferredTime: '09:00 AM',
    notes: ''
  });
  
  // Note form state
  const [noteText, setNoteText] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) navigate('/admin/login');
  }, [navigate]);

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path && ['dashboard', 'bookings', 'customers', 'services', 'pricing', 'reports', 'settings'].includes(path)) {
      setActivePage(path as AdminPage);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    if (selectedBooking?.id === id) {
      setSelectedBooking(prev => prev ? { ...prev, status } : null);
    }
  };

  // Handle Schedule Service submission
  const handleScheduleService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    
    const newBooking: Booking = {
      id: String(Date.now()),
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      serviceType: scheduleForm.serviceType,
      tankSize: scheduleForm.tankSize,
      numberOfTanks: parseInt(scheduleForm.numberOfTanks) || 1,
      propertyType: 'Home',
      preferredDate: scheduleForm.preferredDate,
      preferredTime: scheduleForm.preferredTime,
      status: 'pending',
      estimatedPrice: 250,
      finalPrice: null,
      notes: scheduleForm.notes,
      address: selectedCustomer.address,
      location: selectedCustomer.location,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setBookings(prev => [newBooking, ...prev]);
    setScheduleSuccess(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setShowScheduleForm(false);
      setScheduleSuccess(false);
      setScheduleForm({
        serviceType: 'Professional Tank Care',
        tankSize: '2,000L',
        numberOfTanks: '1',
        preferredDate: '',
        preferredTime: '09:00 AM',
        notes: ''
      });
    }, 2000);
  };

  // Handle Add Note submission
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || !noteText.trim()) return;
    
    const customerId = selectedCustomer.id;
    const newNote = {
      id: String(Date.now()),
      text: noteText.trim(),
      createdAt: new Date().toLocaleString(),
      author: 'Admin'
    };
    
    setCustomerNotes(prev => ({
      ...prev,
      [customerId]: [...(prev[customerId] || []), newNote]
    }));
    
    setNoteSuccess(true);
    setNoteText('');
    
    setTimeout(() => {
      setNoteSuccess(false);
    }, 2000);
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerPhone.includes(searchTerm) || b.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    todayBookings: bookings.filter(b => b.preferredDate === '2025-01-25').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    monthlyRevenue: 4800,
    totalCustomers: mockCustomers.length,
  };

  const statusColors: Record<string, string> = {
    'pending': 'bg-amber-100 text-amber-700',
    'confirmed': 'bg-blue-100 text-blue-700',
    'in-progress': 'bg-purple-100 text-purple-700',
    'completed': 'bg-green-100 text-green-700',
    'cancelled': 'bg-red-100 text-red-700',
  };

  const COLORS = ['#00b3ac', '#06b6d4', '#22c55e', '#f59e0b'];

  const navItems = [
    { id: 'dashboard' as AdminPage, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'bookings' as AdminPage, icon: CalendarCheck, label: 'Bookings' },
    { id: 'customers' as AdminPage, icon: Users, label: 'Customers' },
    { id: 'services' as AdminPage, icon: Wrench, label: 'Services' },
    { id: 'pricing' as AdminPage, icon: DollarSign, label: 'Pricing' },
    { id: 'reports' as AdminPage, icon: BarChart3, label: 'Reports' },
    { id: 'settings' as AdminPage, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-navy-50/30 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-950 transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-navy-800">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-aqua-500 to-cyan-500 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">AquaPure</p>
                <p className="text-navy-400 text-xs">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activePage === item.id
                    ? 'bg-aqua-500/10 text-aqua-400'
                    : 'text-navy-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-navy-800">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-navy-300 hover:text-red-400 hover:bg-red-500/10 transition-all">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
            <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-navy-300 hover:text-white hover:bg-white/5 transition-all mt-1">
              <Eye className="w-5 h-5" />
              View Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-navy-100 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-navy-50">
              <Filter className="w-5 h-5 text-navy-600" />
            </button>
            <h1 className="text-xl font-bold text-navy-900 capitalize">{activePage}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-navy-800">Admin</p>
              <p className="text-xs text-navy-500">{APP_CONFIG.adminCredentials.email}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-aqua-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">A</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {activePage === 'dashboard' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {[
                  { label: "Today's Bookings", value: stats.todayBookings, icon: CalendarCheck, color: 'from-blue-500 to-blue-600' },
                  { label: 'Pending', value: stats.pending, icon: Clock, color: 'from-amber-500 to-amber-600' },
                  { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle2, color: 'from-purple-500 to-purple-600' },
                  { label: 'Completed', value: stats.completed, icon: TrendingUp, color: 'from-green-500 to-green-600' },
                  { label: 'Monthly Revenue', value: formatGHS(stats.monthlyRevenue), icon: DollarSign, color: 'from-aqua-500 to-cyan-500' },
                  { label: 'Total Customers', value: stats.totalCustomers, icon: Users, color: 'from-navy-600 to-navy-700' },
                ].map((card, i) => (
                  <div key={i} className="bg-white rounded-xl border border-navy-100 p-4 shadow-sm">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-navy-900">{card.value}</p>
                    <p className="text-xs text-navy-500 mt-1">{card.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                  <h3 className="font-bold text-navy-900 mb-4">Revenue Over Time</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#627d98" fontSize={12} />
                      <YAxis stroke="#627d98" fontSize={12} />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#00b3ac" strokeWidth={3} dot={{ fill: '#00b3ac', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                  <h3 className="font-bold text-navy-900 mb-4">Bookings Over Time</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#627d98" fontSize={12} />
                      <YAxis stroke="#627d98" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                  <h3 className="font-bold text-navy-900 mb-4">Popular Services</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={serviceDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {serviceDistribution.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                  <h3 className="font-bold text-navy-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map(booking => (
                      <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-navy-50/50">
                        <div>
                          <p className="text-sm font-semibold text-navy-800">{booking.customerName}</p>
                          <p className="text-xs text-navy-500">{booking.serviceType}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === 'bookings' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Bookings Table */}
              <div className="bg-white rounded-xl border border-navy-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-navy-50">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-600 uppercase">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-600 uppercase hidden md:table-cell">Service</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-600 uppercase hidden lg:table-cell">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-600 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-600 uppercase hidden sm:table-cell">Price</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-navy-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map(booking => (
                        <tr key={booking.id} className="border-t border-navy-100 hover:bg-navy-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <p className="text-sm font-semibold text-navy-800">{booking.customerName}</p>
                            <p className="text-xs text-navy-500">{booking.customerPhone}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-navy-600 hidden md:table-cell">{booking.serviceType}</td>
                          <td className="px-4 py-3 text-sm text-navy-600 hidden lg:table-cell">{booking.preferredDate}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-navy-800 hidden sm:table-cell">
                            {booking.finalPrice ? formatGHS(booking.finalPrice) : formatGHS(booking.estimatedPrice)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => setSelectedBooking(booking)} className="p-2 rounded-lg hover:bg-navy-100 transition-colors">
                              <Eye className="w-4 h-4 text-navy-600" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Booking Detail Modal */}
              {selectedBooking && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
                  <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6 border-b border-navy-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-navy-900">Booking Details</h3>
                        <button onClick={() => setSelectedBooking(null)} className="p-2 rounded-lg hover:bg-navy-50">
                          <XCircle className="w-5 h-5 text-navy-400" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-navy-500">Customer</p>
                          <p className="font-semibold text-navy-800">{selectedBooking.customerName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-navy-500">Phone</p>
                          <p className="font-semibold text-navy-800">{selectedBooking.customerPhone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-navy-500">Service</p>
                          <p className="font-semibold text-navy-800">{selectedBooking.serviceType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-navy-500">Property</p>
                          <p className="font-semibold text-navy-800">{selectedBooking.propertyType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-navy-500">Date</p>
                          <p className="font-semibold text-navy-800">{selectedBooking.preferredDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-navy-500">Time</p>
                          <p className="font-semibold text-navy-800">{selectedBooking.preferredTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-navy-500">Tanks</p>
                          <p className="font-semibold text-navy-800">{selectedBooking.numberOfTanks} × {selectedBooking.tankSize}</p>
                        </div>
                        <div>
                          <p className="text-xs text-navy-500">Location</p>
                          <p className="font-semibold text-navy-800">{selectedBooking.location}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-navy-500">Address</p>
                        <p className="font-semibold text-navy-800">{selectedBooking.address}</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-1 p-3 rounded-lg bg-navy-50">
                          <p className="text-xs text-navy-500">Estimated</p>
                          <p className="font-bold text-navy-800">{formatGHS(selectedBooking.estimatedPrice)}</p>
                        </div>
                        {selectedBooking.finalPrice && (
                          <div className="flex-1 p-3 rounded-lg bg-clean-50">
                            <p className="text-xs text-navy-500">Final</p>
                            <p className="font-bold text-clean-700">{formatGHS(selectedBooking.finalPrice)}</p>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-navy-500 mb-2">Update Status</p>
                        <div className="flex flex-wrap gap-2">
                          {(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'] as const).map(status => (
                            <button
                              key={status}
                              onClick={() => updateBookingStatus(selectedBooking.id, status)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                selectedBooking.status === status
                                  ? 'bg-navy-900 text-white'
                                  : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activePage === 'customers' && (
            <div className="space-y-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                <input 
                  type="text" 
                  placeholder="Search customers..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none" 
                />
              </div>
              <div className="bg-white rounded-xl border border-navy-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-navy-50">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-600 uppercase">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-600 uppercase hidden sm:table-cell">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-600 uppercase hidden md:table-cell">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-600 uppercase hidden lg:table-cell">Last Service</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-navy-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCustomers
                        .filter(customer => 
                          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.phone.includes(searchTerm) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.location.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(customer => (
                        <tr key={customer.id} className="border-t border-navy-100 hover:bg-navy-50/50">
                          <td className="px-4 py-3">
                            <p className="text-sm font-semibold text-navy-800">{customer.name}</p>
                            <p className="text-xs text-navy-500">{customer.email}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-navy-600 hidden sm:table-cell">{customer.phone}</td>
                          <td className="px-4 py-3 text-sm text-navy-600 hidden md:table-cell">{customer.location}</td>
                          <td className="px-4 py-3 text-sm text-navy-600 hidden lg:table-cell">
                            {bookings.find(b => b.customerId === customer.id && b.status === 'completed')?.preferredDate || '—'}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button 
                              onClick={() => setSelectedCustomer(customer)}
                              className="p-2 rounded-lg hover:bg-navy-100 transition-colors"
                            >
                              <Eye className="w-4 h-4 text-navy-600" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Customer Detail Modal */}
              {selectedCustomer && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCustomer(null)}>
                  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6 border-b border-navy-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-navy-900">Customer Details</h3>
                        <button onClick={() => setSelectedCustomer(null)} className="p-2 rounded-lg hover:bg-navy-50">
                          <XCircle className="w-5 h-5 text-navy-400" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6 space-y-6">
                      {/* Customer Information */}
                      <div>
                        <h4 className="text-sm font-semibold text-navy-700 mb-3">Customer Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-navy-500">Name</p>
                            <p className="font-semibold text-navy-800">{selectedCustomer.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-navy-500">Phone</p>
                            <p className="font-semibold text-navy-800">{selectedCustomer.phone}</p>
                          </div>
                          <div>
                            <p className="text-xs text-navy-500">WhatsApp</p>
                            <p className="font-semibold text-navy-800">{selectedCustomer.whatsapp}</p>
                          </div>
                          <div>
                            <p className="text-xs text-navy-500">Email</p>
                            <p className="font-semibold text-navy-800">{selectedCustomer.email}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <p className="text-xs text-navy-500">Address</p>
                            <p className="font-semibold text-navy-800">{selectedCustomer.address}</p>
                          </div>
                          <div>
                            <p className="text-xs text-navy-500">Location</p>
                            <p className="font-semibold text-navy-800">{selectedCustomer.location}</p>
                          </div>
                          <div>
                            <p className="text-xs text-navy-500">Customer Since</p>
                            <p className="font-semibold text-navy-800">{selectedCustomer.createdAt}</p>
                          </div>
                        </div>
                      </div>

                      {/* Tank Information */}
                      <div>
                        <h4 className="text-sm font-semibold text-navy-700 mb-3">Tank Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-navy-50/50">
                          <div>
                            <p className="text-xs text-navy-500">Tank Capacity</p>
                            <p className="font-semibold text-navy-800">2,000 Litres</p>
                          </div>
                          <div>
                            <p className="text-xs text-navy-500">Number of Tanks</p>
                            <p className="font-semibold text-navy-800">1</p>
                          </div>
                          <div>
                            <p className="text-xs text-navy-500">Tank Type</p>
                            <p className="font-semibold text-navy-800">Plastic</p>
                          </div>
                          <div>
                            <p className="text-xs text-navy-500">Condition</p>
                            <p className="font-semibold text-navy-800">Good</p>
                          </div>
                          <div>
                            <p className="text-xs text-navy-500">Last Cleaning</p>
                            <p className="font-semibold text-navy-800">
                              {bookings.find(b => b.customerId === selectedCustomer.id && b.status === 'completed')?.preferredDate || 'Not yet serviced'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-navy-500">Next Recommended Service</p>
                            <p className="font-semibold text-aqua-600">2025-07-20</p>
                          </div>
                        </div>
                      </div>

                      {/* Service History */}
                      <div>
                        <h4 className="text-sm font-semibold text-navy-700 mb-3">Service History</h4>
                        <div className="space-y-3">
                          {bookings.filter(b => b.customerId === selectedCustomer.id).length > 0 ? (
                            bookings.filter(b => b.customerId === selectedCustomer.id).map(booking => (
                              <div key={booking.id} className="p-4 rounded-lg bg-navy-50/50 border border-navy-100">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="font-semibold text-navy-800">{booking.serviceType}</p>
                                    <p className="text-xs text-navy-500">{booking.preferredDate} at {booking.preferredTime}</p>
                                  </div>
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                                    {booking.status}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-navy-600">{booking.numberOfTanks} tank(s) - {booking.tankSize}</span>
                                  <span className="font-bold text-navy-900">
                                    {booking.finalPrice ? formatGHS(booking.finalPrice) : formatGHS(booking.estimatedPrice)}
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-navy-500 text-center py-4">No service history available</p>
                          )}
                        </div>
                      </div>

                      {/* Notes Section */}
                      <div>
                        <h4 className="text-sm font-semibold text-navy-700 mb-3">Notes</h4>
                        <div className="space-y-2">
                          {customerNotes[selectedCustomer.id]?.length > 0 ? (
                            customerNotes[selectedCustomer.id].map(note => (
                              <div key={note.id} className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                                <p className="text-sm text-navy-800">{note.text}</p>
                                <p className="text-xs text-navy-500 mt-1">{note.author} • {note.createdAt}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-navy-500 text-center py-3">No notes yet</p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-navy-100">
                        <button 
                          onClick={() => {
                            setShowScheduleForm(true);
                            // Pre-populate with customer's last booking info if available
                            const lastBooking = bookings.find(b => b.customerId === selectedCustomer.id);
                            if (lastBooking) {
                              setScheduleForm(prev => ({
                                ...prev,
                                serviceType: lastBooking.serviceType,
                                tankSize: lastBooking.tankSize,
                                numberOfTanks: String(lastBooking.numberOfTanks)
                              }));
                            }
                          }}
                          className="flex-1 py-3 bg-gradient-to-r from-aqua-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          Schedule Service
                        </button>
                        <button 
                          onClick={() => setShowNoteForm(true)}
                          className="flex-1 py-3 border-2 border-navy-200 text-navy-800 rounded-xl font-semibold hover:bg-navy-50 transition-colors"
                        >
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Schedule Service Modal */}
              {showScheduleForm && selectedCustomer && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => !scheduleSuccess && setShowScheduleForm(false)}>
                  <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6 border-b border-navy-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-navy-900">Schedule Service</h3>
                          <p className="text-sm text-navy-500 mt-1">For {selectedCustomer.name}</p>
                        </div>
                        {!scheduleSuccess && (
                          <button onClick={() => setShowScheduleForm(false)} className="p-2 rounded-lg hover:bg-navy-50">
                            <XCircle className="w-5 h-5 text-navy-400" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {scheduleSuccess ? (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-clean-50 flex items-center justify-center">
                          <CheckCircle2 className="w-10 h-10 text-clean-500" />
                        </div>
                        <h4 className="text-xl font-bold text-navy-900 mb-2">Service Scheduled!</h4>
                        <p className="text-navy-600">The booking has been created and is pending confirmation.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleScheduleService} className="p-6 space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-navy-700 mb-1.5">Service Type *</label>
                          <select 
                            required
                            value={scheduleForm.serviceType}
                            onChange={(e) => setScheduleForm(prev => ({ ...prev, serviceType: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none"
                          >
                            <option value="Essential Tank Clean">Essential Tank Clean</option>
                            <option value="Professional Tank Care">Professional Tank Care</option>
                            <option value="Premium Tank Care">Premium Tank Care</option>
                            <option value="Commercial Tank Service">Commercial Tank Service</option>
                            <option value="Annual Care Plan">Annual Care Plan</option>
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-navy-700 mb-1.5">Tank Size</label>
                            <select 
                              value={scheduleForm.tankSize}
                              onChange={(e) => setScheduleForm(prev => ({ ...prev, tankSize: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none"
                            >
                              <option value="500-1000L">500–1,000L</option>
                              <option value="1,500-2,000L">1,500–2,000L</option>
                              <option value="2,000L">2,000L</option>
                              <option value="2,500-5,000L">2,500–5,000L</option>
                              <option value="5,000-10,000L">5,000–10,000L</option>
                              <option value="10,000L+">10,000L+</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-navy-700 mb-1.5">Number of Tanks</label>
                            <input 
                              type="number" 
                              min="1"
                              max="50"
                              value={scheduleForm.numberOfTanks}
                              onChange={(e) => setScheduleForm(prev => ({ ...prev, numberOfTanks: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-navy-700 mb-1.5">Preferred Date *</label>
                            <input 
                              type="date" 
                              required
                              value={scheduleForm.preferredDate}
                              onChange={(e) => setScheduleForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-navy-700 mb-1.5">Preferred Time</label>
                            <select 
                              value={scheduleForm.preferredTime}
                              onChange={(e) => setScheduleForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none"
                            >
                              <option value="08:00 AM">8:00 AM</option>
                              <option value="09:00 AM">9:00 AM</option>
                              <option value="10:00 AM">10:00 AM</option>
                              <option value="11:00 AM">11:00 AM</option>
                              <option value="12:00 PM">12:00 PM</option>
                              <option value="01:00 PM">1:00 PM</option>
                              <option value="02:00 PM">2:00 PM</option>
                              <option value="03:00 PM">3:00 PM</option>
                              <option value="04:00 PM">4:00 PM</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-navy-700 mb-1.5">Notes</label>
                          <textarea 
                            rows={3}
                            value={scheduleForm.notes}
                            onChange={(e) => setScheduleForm(prev => ({ ...prev, notes: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none resize-none"
                            placeholder="Any special requirements or notes..."
                          />
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                          <button 
                            type="button"
                            onClick={() => setShowScheduleForm(false)}
                            className="flex-1 py-3 border-2 border-navy-200 text-navy-800 rounded-xl font-semibold hover:bg-navy-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit"
                            className="flex-1 py-3 bg-gradient-to-r from-aqua-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                          >
                            Schedule Service
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {/* Add Note Modal */}
              {showNoteForm && selectedCustomer && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowNoteForm(false)}>
                  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6 border-b border-navy-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-navy-900">Add Note</h3>
                          <p className="text-sm text-navy-500 mt-1">For {selectedCustomer.name}</p>
                        </div>
                        <button onClick={() => setShowNoteForm(false)} className="p-2 rounded-lg hover:bg-navy-50">
                          <XCircle className="w-5 h-5 text-navy-400" />
                        </button>
                      </div>
                    </div>
                    
                    <form onSubmit={handleAddNote} className="p-6 space-y-4">
                      {noteSuccess ? (
                        <div className="text-center py-4">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-clean-50 flex items-center justify-center">
                            <CheckCircle2 className="w-7 h-7 text-clean-500" />
                          </div>
                          <p className="font-semibold text-navy-900">Note Added!</p>
                        </div>
                      ) : (
                        <>
                          <div>
                            <label className="block text-sm font-semibold text-navy-700 mb-1.5">Note *</label>
                            <textarea 
                              required
                              rows={4}
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none resize-none"
                              placeholder="Enter your note here..."
                            />
                          </div>
                          
                          <div className="flex gap-3">
                            <button 
                              type="button"
                              onClick={() => setShowNoteForm(false)}
                              className="flex-1 py-3 border-2 border-navy-200 text-navy-800 rounded-xl font-semibold hover:bg-navy-50 transition-colors"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit"
                              disabled={!noteText.trim()}
                              className="flex-1 py-3 bg-gradient-to-r from-aqua-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Add Note
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activePage === 'services' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Essential Tank Clean', price: 150, active: true },
                  { name: 'Professional Tank Care', price: 250, active: true },
                  { name: 'Premium Tank Care', price: 350, active: true },
                  { name: 'Commercial Tank Service', price: 500, active: true },
                  { name: 'Annual Care Plan', price: 0, active: true },
                  { name: 'Property Management', price: 0, active: true },
                ].map((service, i) => (
                  <div key={i} className="bg-white rounded-xl border border-navy-100 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-navy-900">{service.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${service.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {service.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-aqua-600">{service.price > 0 ? `From ${formatGHS(service.price)}` : 'Custom'}</p>
                    <button className="mt-3 flex items-center gap-1 text-sm text-aqua-600 font-semibold hover:text-aqua-700">
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePage === 'pricing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                <h3 className="font-bold text-navy-900 mb-4">Tank Size Pricing</h3>
                <div className="space-y-3">
                  {[
                    { range: '500–1,000 Litres', price: 150 },
                    { range: '1,500–2,000 Litres', price: 200 },
                    { range: '2,500–5,000 Litres', price: 300 },
                    { range: '5,000–10,000 Litres', price: 500 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-navy-50/50">
                      <span className="text-sm font-medium text-navy-700">{item.range}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-navy-900">{formatGHS(item.price)}</span>
                        <button className="p-1.5 rounded-lg hover:bg-navy-100"><Edit className="w-3.5 h-3.5 text-navy-500" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                <h3 className="font-bold text-navy-900 mb-4">Multi-Tank Discounts</h3>
                <div className="space-y-3">
                  {[
                    { tanks: '2 Tanks', discount: '5%' },
                    { tanks: '3–5 Tanks', discount: '10%' },
                    { tanks: '6+ Tanks', discount: '15%' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-navy-50/50">
                      <span className="text-sm font-medium text-navy-700">{item.tanks}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-aqua-600">{item.discount}</span>
                        <button className="p-1.5 rounded-lg hover:bg-navy-100"><Edit className="w-3.5 h-3.5 text-navy-500" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                <h3 className="font-bold text-navy-900 mb-4">Additional Charges</h3>
                <div className="space-y-3">
                  {[
                    { item: 'Heavy sediment/buildup', charge: '+GH₵50' },
                    { item: 'Difficult tank access', charge: '+GH₵50' },
                    { item: 'High-level/rooftop access', charge: '+GH₵50' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-navy-50/50">
                      <span className="text-sm font-medium text-navy-700">{item.item}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-navy-900">{item.charge}</span>
                        <button className="p-1.5 rounded-lg hover:bg-navy-100"><Edit className="w-3.5 h-3.5 text-navy-500" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activePage === 'reports' && (
            <div className="space-y-6">
              {/* Period Selector */}
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'today', label: 'Today' },
                  { key: 'week', label: 'This Week' },
                  { key: 'month', label: 'This Month' },
                  { key: 'year', label: 'This Year' }
                ].map((period) => (
                  <button 
                    key={period.key}
                    onClick={() => setReportPeriod(period.key)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      reportPeriod === period.key 
                        ? 'bg-aqua-500 text-white shadow-lg shadow-aqua-500/25' 
                        : 'bg-white border border-navy-200 text-navy-700 hover:bg-navy-50'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>

              {/* Reports Content */}
              {(() => {
                const dateRange = getDateRange(reportPeriod);
                const filteredBookings = bookings.filter(b => {
                  const bookingDate = new Date(b.createdAt);
                  return bookingDate >= dateRange.start && bookingDate <= dateRange.end;
                });

                const totalBookings = filteredBookings.length;
                const completedBookings = filteredBookings.filter(b => b.status === 'completed').length;
                const cancelledBookings = filteredBookings.filter(b => b.status === 'cancelled').length;
                const totalRevenue = filteredBookings
                  .filter(b => b.status === 'completed' && b.finalPrice)
                  .reduce((sum, b) => sum + (b.finalPrice || 0), 0);
                
                // Calculate repeat customers (customers with more than 1 booking)
                const customerBookingCounts = filteredBookings.reduce((acc, b) => {
                  acc[b.customerId] = (acc[b.customerId] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>);
                const repeatCustomers = Object.values(customerBookingCounts).filter(count => count > 1).length;

                // Generate chart data based on period
                const generateChartData = () => {
                  if (reportPeriod === 'today') {
                    return [
                      { time: '6AM', bookings: 0, revenue: 0 },
                      { time: '9AM', bookings: 1, revenue: 150 },
                      { time: '12PM', bookings: 2, revenue: 400 },
                      { time: '3PM', bookings: 1, revenue: 250 },
                      { time: '6PM', bookings: 0, revenue: 0 },
                    ];
                  } else if (reportPeriod === 'week') {
                    return [
                      { time: 'Mon', bookings: 3, revenue: 650 },
                      { time: 'Tue', bookings: 2, revenue: 400 },
                      { time: 'Wed', bookings: 4, revenue: 900 },
                      { time: 'Thu', bookings: 1, revenue: 200 },
                      { time: 'Fri', bookings: 3, revenue: 750 },
                      { time: 'Sat', bookings: 2, revenue: 500 },
                      { time: 'Sun', bookings: 0, revenue: 0 },
                    ];
                  } else if (reportPeriod === 'month') {
                    return [
                      { time: 'Week 1', bookings: 12, revenue: 2800 },
                      { time: 'Week 2', bookings: 15, revenue: 3600 },
                      { time: 'Week 3', bookings: 18, revenue: 4200 },
                      { time: 'Week 4', bookings: 14, revenue: 3400 },
                    ];
                  } else {
                    return [
                      { time: 'Jan', bookings: 16, revenue: 4800 },
                      { time: 'Feb', bookings: 14, revenue: 4200 },
                      { time: 'Mar', bookings: 18, revenue: 5400 },
                      { time: 'Apr', bookings: 12, revenue: 3600 },
                      { time: 'May', bookings: 20, revenue: 6000 },
                      { time: 'Jun', bookings: 15, revenue: 4500 },
                      { time: 'Jul', bookings: 17, revenue: 5100 },
                      { time: 'Aug', bookings: 19, revenue: 5700 },
                      { time: 'Sep', bookings: 13, revenue: 3900 },
                      { time: 'Oct', bookings: 16, revenue: 4800 },
                      { time: 'Nov', bookings: 14, revenue: 4200 },
                      { time: 'Dec', bookings: 11, revenue: 3300 },
                    ];
                  }
                };

                const chartData = generateChartData();

                // Calculate percentage changes (mock data for demonstration)
                const getChange = (metric: string) => {
                  const changes: Record<string, Record<string, { value: string; up: boolean }>> = {
                    today: { bookings: { value: '+5%', up: true }, completed: { value: '+3%', up: true }, cancelled: { value: '-1%', up: false }, revenue: { value: '+8%', up: true }, repeat: { value: '+2%', up: true } },
                    week: { bookings: { value: '+12%', up: true }, completed: { value: '+8%', up: true }, cancelled: { value: '-2%', up: false }, revenue: { value: '+15%', up: true }, repeat: { value: '+5%', up: true } },
                    month: { bookings: { value: '+18%', up: true }, completed: { value: '+12%', up: true }, cancelled: { value: '-3%', up: false }, revenue: { value: '+22%', up: true }, repeat: { value: '+10%', up: true } },
                    year: { bookings: { value: '+25%', up: true }, completed: { value: '+20%', up: true }, cancelled: { value: '-5%', up: false }, revenue: { value: '+30%', up: true }, repeat: { value: '+15%', up: true } },
                  };
                  return changes[reportPeriod]?.[metric] || { value: '0%', up: true };
                };

                return (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white rounded-xl border border-navy-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-navy-600">Total Bookings</span>
                          <CalendarCheck className="w-5 h-5 text-aqua-500" />
                        </div>
                        <p className="text-3xl font-bold text-navy-900">{totalBookings}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="text-xs font-medium text-green-600">{getChange('bookings').value}</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-navy-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-navy-600">Completed</span>
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-navy-900">{completedBookings}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="text-xs font-medium text-green-600">{getChange('completed').value}</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-navy-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-navy-600">Cancelled</span>
                          <XCircle className="w-5 h-5 text-red-500" />
                        </div>
                        <p className="text-3xl font-bold text-navy-900">{cancelledBookings}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingDown className="w-3 h-3 text-red-600" />
                          <span className="text-xs font-medium text-red-600">{getChange('cancelled').value}</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-navy-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-navy-600">Revenue</span>
                          <DollarSign className="w-5 h-5 text-aqua-500" />
                        </div>
                        <p className="text-2xl font-bold text-navy-900">{formatGHS(totalRevenue)}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="text-xs font-medium text-green-600">{getChange('revenue').value}</span>
                        </div>
                      </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                        <h3 className="font-bold text-navy-900 mb-4">Revenue Trend</h3>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="time" stroke="#627d98" fontSize={12} />
                            <YAxis stroke="#627d98" fontSize={12} />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#00b3ac" strokeWidth={3} dot={{ fill: '#00b3ac', r: 4 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                        <h3 className="font-bold text-navy-900 mb-4">Bookings Over Time</h3>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="time" stroke="#627d98" fontSize={12} />
                            <YAxis stroke="#627d98" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="bookings" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Detailed Summary */}
                    <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                      <h3 className="font-bold text-navy-900 mb-4">Detailed Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-navy-50/50">
                            <span className="text-sm font-medium text-navy-700">Total Bookings</span>
                            <span className="text-lg font-bold text-navy-900">{totalBookings}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-navy-50/50">
                            <span className="text-sm font-medium text-navy-700">Completed Services</span>
                            <span className="text-lg font-bold text-green-700">{completedBookings}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-navy-50/50">
                            <span className="text-sm font-medium text-navy-700">Cancelled Bookings</span>
                            <span className="text-lg font-bold text-red-700">{cancelledBookings}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-navy-50/50">
                            <span className="text-sm font-medium text-navy-700">Total Revenue</span>
                            <span className="text-lg font-bold text-aqua-600">{formatGHS(totalRevenue)}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-navy-50/50">
                            <span className="text-sm font-medium text-navy-700">Repeat Customers</span>
                            <span className="text-lg font-bold text-navy-900">{repeatCustomers}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-navy-50/50">
                            <span className="text-sm font-medium text-navy-700">Completion Rate</span>
                            <span className="text-lg font-bold text-navy-900">
                              {totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {activePage === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                <h3 className="font-bold text-navy-900 mb-4">Business Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">Company Name</label>
                    <input type="text" defaultValue={APP_CONFIG.companyName} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">WhatsApp Number</label>
                    <input type="text" defaultValue={APP_CONFIG.whatsappNumber} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">Phone</label>
                    <input type="text" defaultValue={APP_CONFIG.phone} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">Email</label>
                    <input type="email" defaultValue={APP_CONFIG.email} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 outline-none" />
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-aqua-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg">
                    Save Changes
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
                <h3 className="font-bold text-navy-900 mb-4">Business Hours</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-navy-700">Monday - Friday</span>
                    <span className="text-sm font-medium text-navy-900">7:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-navy-700">Saturday</span>
                    <span className="text-sm font-medium text-navy-900">8:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-navy-700">Sunday</span>
                    <span className="text-sm font-medium text-navy-900">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
