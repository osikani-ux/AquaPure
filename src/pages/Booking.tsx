import { useState } from 'react';
import { CheckCircle2, Upload, CalendarCheck } from 'lucide-react';

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '', phone: '', whatsapp: '', email: '', address: '', location: '',
    serviceType: '', tankSize: '', numberOfTanks: '1', propertyType: '',
    preferredDate: '', preferredTime: '', notes: '', agreeContact: false
  });

  const updateForm = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all text-sm";
  const labelClass = "block text-sm font-semibold text-navy-700 mb-1.5";

  if (submitted) {
    return (
      <div>
        <section className="gradient-hero py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Booking Request Received</h1>
          </div>
        </section>
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-clean-50 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-clean-500" />
            </div>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">Thank You!</h2>
            <p className="text-navy-600 text-lg mb-8">
              Your booking request has been received. Our team will contact you shortly to confirm your appointment.
            </p>
            <div className="p-6 rounded-2xl bg-navy-50 border border-navy-100 text-left">
              <h3 className="font-semibold text-navy-900 mb-3">What happens next?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-navy-600">
                  <span className="w-5 h-5 rounded-full bg-aqua-100 text-aqua-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                  Our team reviews your booking request
                </li>
                <li className="flex items-start gap-2 text-sm text-navy-600">
                  <span className="w-5 h-5 rounded-full bg-aqua-100 text-aqua-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                  We contact you to confirm details and pricing
                </li>
                <li className="flex items-start gap-2 text-sm text-navy-600">
                  <span className="w-5 h-5 rounded-full bg-aqua-100 text-aqua-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                  Your appointment is confirmed and scheduled
                </li>
                <li className="flex items-start gap-2 text-sm text-navy-600">
                  <span className="w-5 h-5 rounded-full bg-aqua-100 text-aqua-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                  Our technicians arrive and perform the service
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-aqua-300 text-sm font-medium mb-4">
            <CalendarCheck className="w-4 h-4" />
            Book a Cleaning
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Schedule Your Tank Cleaning</h1>
          <p className="text-navy-200 max-w-2xl mx-auto">
            Fill out the form below and our team will contact you to confirm your appointment.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Customer Information */}
            <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6 lg:p-8">
              <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-aqua-500 text-white flex items-center justify-center text-sm font-bold">1</span>
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelClass}>Full Name *</label>
                  <input type="text" required value={form.fullName} onChange={(e) => updateForm('fullName', e.target.value)} className={inputClass} placeholder="Your full name" />
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input type="tel" required value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} className={inputClass} placeholder="+233 XX XXX XXXX" />
                </div>
                <div>
                  <label className={labelClass}>WhatsApp Number</label>
                  <input type="tel" value={form.whatsapp} onChange={(e) => updateForm('whatsapp', e.target.value)} className={inputClass} placeholder="+233 XX XXX XXXX" />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)} className={inputClass} placeholder="your@email.com" />
                </div>
                <div>
                  <label className={labelClass}>Area/Location *</label>
                  <input type="text" required value={form.location} onChange={(e) => updateForm('location', e.target.value)} className={inputClass} placeholder="e.g., East Legon, Osu, Tema" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Property Address *</label>
                  <input type="text" required value={form.address} onChange={(e) => updateForm('address', e.target.value)} className={inputClass} placeholder="Full property address" />
                </div>
              </div>
            </div>

            {/* Service Information */}
            <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6 lg:p-8">
              <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-aqua-500 text-white flex items-center justify-center text-sm font-bold">2</span>
                Service Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Service Type *</label>
                  <select required value={form.serviceType} onChange={(e) => updateForm('serviceType', e.target.value)} className={inputClass}>
                    <option value="">Select service</option>
                    <option value="Essential Tank Clean">Essential Tank Clean</option>
                    <option value="Professional Tank Care">Professional Tank Care</option>
                    <option value="Premium Tank Care">Premium Tank Care</option>
                    <option value="Commercial Tank Service">Commercial Tank Service</option>
                    <option value="Annual Care Plan">Annual Care Plan</option>
                    <option value="Property Management">Property Management</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Property Type *</label>
                  <select required value={form.propertyType} onChange={(e) => updateForm('propertyType', e.target.value)} className={inputClass}>
                    <option value="">Select property type</option>
                    <option value="Home">Home</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Office">Office</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Hotel">Hotel</option>
                    <option value="School">School</option>
                    <option value="Church">Church</option>
                    <option value="Commercial Property">Commercial Property</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Tank Size</label>
                  <select value={form.tankSize} onChange={(e) => updateForm('tankSize', e.target.value)} className={inputClass}>
                    <option value="">Select tank size</option>
                    <option value="500-1000L">500–1,000 Litres</option>
                    <option value="1500-2000L">1,500–2,000 Litres</option>
                    <option value="2500-5000L">2,500–5,000 Litres</option>
                    <option value="5000-10000L">5,000–10,000 Litres</option>
                    <option value="10000L+">10,000+ Litres</option>
                    <option value="unsure">Not sure</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Number of Tanks</label>
                  <input type="number" min="1" max="50" value={form.numberOfTanks} onChange={(e) => updateForm('numberOfTanks', e.target.value)} className={inputClass} placeholder="1" />
                </div>
                <div>
                  <label className={labelClass}>Preferred Date *</label>
                  <input type="date" required value={form.preferredDate} onChange={(e) => updateForm('preferredDate', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Preferred Time</label>
                  <select value={form.preferredTime} onChange={(e) => updateForm('preferredTime', e.target.value)} className={inputClass}>
                    <option value="">Select time</option>
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
                <div className="md:col-span-2">
                  <label className={labelClass}>Additional Notes</label>
                  <textarea rows={3} value={form.notes} onChange={(e) => updateForm('notes', e.target.value)} className={`${inputClass} resize-none`} placeholder="Any special requirements or information we should know..." />
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6 lg:p-8">
              <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-aqua-500 text-white flex items-center justify-center text-sm font-bold">3</span>
                Photos <span className="text-navy-400 font-normal text-sm">(Optional)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Tank Photo</label>
                  <div className="border-2 border-dashed border-navy-200 rounded-xl p-6 text-center hover:border-aqua-300 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-navy-300 mx-auto mb-2" />
                    <p className="text-navy-500 text-sm">Click to upload tank photo</p>
                    <p className="text-navy-400 text-xs mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Property Photo</label>
                  <div className="border-2 border-dashed border-navy-200 rounded-xl p-6 text-center hover:border-aqua-300 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-navy-300 mx-auto mb-2" />
                    <p className="text-navy-500 text-sm">Click to upload property photo</p>
                    <p className="text-navy-400 text-xs mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consent & Submit */}
            <div className="bg-navy-50/50 rounded-2xl border border-navy-100 p-6 lg:p-8">
              <label className="flex items-start gap-3 cursor-pointer mb-6">
                <input
                  type="checkbox"
                  required
                  checked={form.agreeContact}
                  onChange={(e) => updateForm('agreeContact', e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-navy-300 text-aqua-500 focus:ring-aqua-500"
                />
                <span className="text-navy-700 text-sm">
                  I agree to be contacted regarding my booking request. *
                </span>
              </label>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-aqua-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-aqua-600/25 hover:shadow-2xl hover:shadow-aqua-600/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <CalendarCheck className="w-5 h-5" />
                Submit Booking Request
              </button>
              <p className="text-navy-500 text-xs text-center mt-4">
                Our team will contact you to confirm your appointment and provide a final price quote.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
