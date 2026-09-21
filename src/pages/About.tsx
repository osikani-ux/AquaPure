import { Link } from 'react-router-dom';
import { Droplets, Target, Eye, ArrowRight, Heart, Shield, Users } from 'lucide-react';
import { APP_CONFIG } from '../config';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-aqua-300 text-sm font-medium mb-6">
            <Droplets className="w-4 h-4" />
            About Us
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">About {APP_CONFIG.companyName}</h1>
          <p className="text-navy-200 text-lg max-w-2xl mx-auto">
            Professional water tank cleaning and maintenance — making clean water storage convenient and accessible for homes and businesses across Ghana.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Our Story</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              {APP_CONFIG.companyName} was founded with a simple mission: to make professional water tank cleaning and maintenance convenient and accessible for every home and business in Ghana.
            </p>
            <p className="text-navy-600 leading-relaxed mb-4">
              We recognized that many properties rely on water storage tanks for their daily water supply, yet proper tank maintenance is often overlooked. Sediment buildup, debris accumulation, and lack of regular cleaning can affect water storage hygiene.
            </p>
            <p className="text-navy-600 leading-relaxed">
              Our team of trained professionals uses proper equipment and techniques to thoroughly clean, inspect, and maintain water storage tanks — delivering a convenient, reliable service that property owners can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20 bg-navy-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-10 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Professional Service', desc: 'We use proper equipment, trained technicians, and professional procedures for every service.' },
              { icon: Heart, title: 'Customer Focus', desc: 'Your convenience and satisfaction are our priority. We make the process simple and hassle-free.' },
              { icon: Users, title: 'Community Trust', desc: 'We serve homes, businesses, and institutions across Ghana with integrity and reliability.' },
            ].map((item, i) => (
              <div key={i} className="card-hover p-8 rounded-2xl bg-white border border-navy-100 shadow-sm text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-aqua-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-aqua-500/20">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 border border-navy-700">
              <div className="w-12 h-12 mb-4 rounded-xl bg-aqua-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-aqua-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-navy-200 leading-relaxed">
                To make professional water tank cleaning and maintenance convenient and accessible for homes and businesses across Ghana.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-aqua-600 to-cyan-600 border border-aqua-500">
              <div className="w-12 h-12 mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/90 leading-relaxed">
                To become a trusted water-storage maintenance company serving properties across Ghana — setting the standard for professional tank cleaning services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 lg:py-20 bg-navy-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-8">Our Focus Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {['Water-Storage Hygiene', 'Convenience', 'Reliable Service', 'Professional Cleaning', 'Preventive Maintenance'].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-navy-100 shadow-sm">
                <p className="font-semibold text-navy-800 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Work With Us</h2>
          <p className="text-navy-200 mb-8">Experience professional water tank cleaning and maintenance you can trust.</p>
          <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy-900 rounded-xl font-bold text-lg hover:bg-navy-50 transition-colors">
            Book a Cleaning <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
