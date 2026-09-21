import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Lock, Mail, AlertCircle } from 'lucide-react';
import { APP_CONFIG, ADMIN_EMAIL, ADMIN_PASSWORD } from '../../config';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-aqua-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-aqua-500/30">
            <Droplets className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-navy-300 text-sm mt-1">{APP_CONFIG.companyName}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all"
                  placeholder="admin@aquapuretankgh.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-aqua-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg shadow-aqua-600/25 hover:shadow-xl transition-all"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
