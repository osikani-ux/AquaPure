import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG, getWhatsAppLink } from '../config';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-navy-200 text-lg max-w-2xl mx-auto">
            Get in touch with our team. We're here to help with any questions about our services.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Get In Touch</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-aqua-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-aqua-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Phone</h3>
                    <a href={`tel:${APP_CONFIG.phone}`} className="text-navy-600 hover:text-aqua-600 transition-colors">{APP_CONFIG.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">WhatsApp</h3>
                    <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:text-green-600 transition-colors">
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-navy-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Email</h3>
                    <a href={`mailto:${APP_CONFIG.email}`} className="text-navy-600 hover:text-aqua-600 transition-colors">{APP_CONFIG.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-aqua-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-aqua-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Service Area</h3>
                    <p className="text-navy-600">{APP_CONFIG.serviceArea}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-navy-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Business Hours</h3>
                    <p className="text-navy-600 text-sm">{APP_CONFIG.businessHours.weekdays}</p>
                    <p className="text-navy-600 text-sm">{APP_CONFIG.businessHours.saturday}</p>
                    <p className="text-navy-600 text-sm">{APP_CONFIG.businessHours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl border border-navy-100 shadow-lg p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-clean-50 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-clean-500" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                  <p className="text-navy-600">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }} className="mt-4 text-aqua-600 font-semibold hover:text-aqua-700 transition-colors">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-navy-900 mb-2">Send Us a Message</h2>
                  <p className="text-navy-600 text-sm mb-6">Fill out the form and we'll get back to you as soon as possible.</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-navy-700 mb-1.5">Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-navy-700 mb-1.5">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all"
                          placeholder="+233 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy-700 mb-1.5">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-700 mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-800 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-aqua-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg shadow-aqua-600/25 hover:shadow-xl transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
