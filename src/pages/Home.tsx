import { Link } from 'react-router-dom';
import { Shield, Sparkles, MapPin, CalendarCheck, Droplets, CheckCircle2, ArrowRight, Star, Users, Building2, Home as HomeIcon, Hotel, GraduationCap, Briefcase } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative gradient-hero overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-aqua-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-aqua-300 text-sm font-medium mb-6">
                <Droplets className="w-4 h-4" />
                Professional Water Tank Services
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Clean Tank.<br />
                <span className="text-gradient">Safer Water.</span>
              </h1>
              <p className="text-lg text-navy-200 leading-relaxed mb-8 max-w-lg">
                Professional water tank cleaning, disinfection, inspection and maintenance services delivered to your home or business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-aqua-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-aqua-500/30 hover:shadow-2xl hover:shadow-aqua-500/40 transition-all duration-300 hover:-translate-y-1"
                >
                  Book a Cleaning
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Get a Free Quote
                </Link>
              </div>
              <p className="text-navy-300 text-sm font-medium">
                Serving Homes • Businesses • Institutions
              </p>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-96 h-80 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                  <img 
                    src="https://image.qwenlm.ai/generated-images/3eff1b41-a977-407a-9ff6-44e70ef1da18/_result.png" 
                    alt="Professional water tank cleaning technician" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent"></div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-clean-500/20 border border-clean-400/30 flex items-center justify-center backdrop-blur-sm">
                  <CheckCircle2 className="w-10 h-10 text-clean-400" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-aqua-500/20 border border-aqua-400/30 flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-8 h-8 text-aqua-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Professional Service', desc: 'Trained and properly equipped service team.' },
              { icon: Sparkles, title: 'Thorough Cleaning', desc: 'We remove sediment, dirt and buildup from your tank.' },
              { icon: MapPin, title: 'Convenient', desc: 'We come to your property.' },
              { icon: CalendarCheck, title: 'Scheduled Maintenance', desc: 'Never forget your next tank cleaning.' },
            ].map((item, i) => (
              <div key={i} className="card-hover p-6 rounded-2xl bg-navy-50/50 border border-navy-100 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-aqua-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-aqua-500/20">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-navy-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-navy-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">Our Services</h2>
            <p className="text-navy-600 max-w-2xl mx-auto">Comprehensive water tank cleaning and maintenance solutions for every property type.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Tank Cleaning', desc: 'Professional cleaning to remove dirt, sediment and buildup.', icon: Sparkles },
              { title: 'Tank Disinfection', desc: 'Cleaning and appropriate disinfection procedures for water-storage systems.', icon: Shield },
              { title: 'Tank Inspection', desc: 'Visual inspection of the tank, cover, pipes, valves and visible components.', icon: CheckCircle2 },
              { title: 'Tank Maintenance', desc: 'Identify visible maintenance issues and recommend corrective action.', icon: CalendarCheck },
              { title: 'Commercial Tank Cleaning', desc: 'Scheduled cleaning services for businesses, institutions and large properties.', icon: Building2 },
              { title: 'Property Tank Management', desc: 'Recurring cleaning and maintenance plans for landlords and property managers.', icon: Briefcase },
            ].map((service, i) => (
              <div key={i} className="card-hover p-6 rounded-2xl bg-white border border-navy-100 shadow-sm">
                <div className="w-12 h-12 mb-4 rounded-xl bg-aqua-50 flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-aqua-600" />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{service.title}</h3>
                <p className="text-navy-600 text-sm mb-4">{service.desc}</p>
                <Link to="/services" className="text-aqua-600 font-semibold text-sm hover:text-aqua-700 transition-colors inline-flex items-center gap-1">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-16 lg:py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-navy-300 max-w-2xl mx-auto">Getting your tank cleaned is simple and convenient.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Book', desc: 'Choose your preferred service and submit your details.' },
              { step: '02', title: 'We Confirm', desc: 'Our team contacts you to confirm the appointment.' },
              { step: '03', title: 'We Clean', desc: 'Our technicians arrive and perform the service.' },
              { step: '04', title: 'Stay Protected', desc: 'Receive your service record and next maintenance reminder.' },
            ].map((item, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-5xl font-bold text-aqua-500/30">{item.step}</span>
                <h3 className="font-bold text-white text-lg mt-2 mb-2">{item.title}</h3>
                <p className="text-navy-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/how-it-works" className="inline-flex items-center gap-2 text-aqua-400 font-semibold hover:text-aqua-300 transition-colors">
              Learn more about our process <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">See the Difference</h2>
            <p className="text-navy-600 max-w-2xl mx-auto">See the difference professional tank cleaning can make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-navy-200 shadow-lg">
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-amber-300/50 border-4 border-amber-400/60 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-amber-400/40 border-2 border-amber-500/40"></div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-lg">Before</div>
              </div>
              <div className="p-4 bg-white">
                <p className="font-semibold text-navy-900">Before Cleaning</p>
                <p className="text-navy-600 text-sm">Sediment buildup, staining, and debris accumulation.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-navy-200 shadow-lg">
              <div className="aspect-[4/3] bg-gradient-to-br from-cyan-50 to-aqua-50 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-white/80 border-4 border-aqua-200 flex items-center justify-center shadow-inner">
                    <div className="w-32 h-32 rounded-full bg-aqua-50 border-2 border-aqua-100"></div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-clean-500 text-white text-sm font-bold rounded-lg">After</div>
              </div>
              <div className="p-4 bg-white">
                <p className="font-semibold text-navy-900">After Cleaning</p>
                <p className="text-navy-600 text-sm">Clean, refreshed, and properly maintained.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Documentation */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-navy-900 to-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Every Service Is Documented</h2>
              <p className="text-navy-200 mb-6 leading-relaxed">
                We provide a detailed service record for every cleaning, so you always know the condition of your tank and when your next maintenance is due.
              </p>
              <ul className="space-y-3">
                {['Service date', 'Tank size', 'Cleaning performed', 'Visible tank condition', 'Maintenance observations', 'Recommended next service date'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-navy-200">
                    <CheckCircle2 className="w-5 h-5 text-aqua-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/services" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-aqua-500 text-white rounded-xl font-semibold hover:bg-aqua-600 transition-colors">
                Learn About Our Service <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-72 h-96 rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Droplets className="w-5 h-5 text-aqua-400" />
                  <span className="text-white font-semibold text-sm">Service Report</span>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-white/20 rounded w-3/4"></div>
                  <div className="h-3 bg-white/10 rounded w-full"></div>
                  <div className="h-3 bg-white/10 rounded w-5/6"></div>
                  <div className="mt-4 p-3 rounded-lg bg-aqua-500/20 border border-aqua-400/30">
                    <div className="h-2 bg-aqua-400/40 rounded w-1/2 mb-2"></div>
                    <div className="h-2 bg-aqua-400/30 rounded w-3/4"></div>
                  </div>
                  <div className="h-3 bg-white/10 rounded w-2/3 mt-4"></div>
                  <div className="h-3 bg-white/10 rounded w-full"></div>
                  <div className="h-3 bg-white/10 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Types */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">Who We Serve</h2>
            <p className="text-navy-600 max-w-2xl mx-auto">Professional tank cleaning for every type of property.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: HomeIcon, title: 'Homes', desc: 'Household water storage' },
              { icon: Building2, title: 'Apartments', desc: 'Residential properties' },
              { icon: Star, title: 'Restaurants', desc: 'Food service businesses' },
              { icon: Hotel, title: 'Hotels', desc: 'Hospitality properties' },
              { icon: GraduationCap, title: 'Schools', desc: 'Educational institutions' },
              { icon: Users, title: 'Property Managers', desc: 'Multiple properties' },
            ].map((item, i) => (
              <div key={i} className="card-hover p-5 rounded-2xl bg-navy-50/50 border border-navy-100 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-aqua-50 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-aqua-600" />
                </div>
                <h3 className="font-bold text-navy-900 text-sm mb-1">{item.title}</h3>
                <p className="text-navy-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-navy-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">Why Choose Us</h2>
            <p className="text-navy-600 max-w-2xl mx-auto">We're committed to making water tank maintenance convenient, professional, and reliable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Convenient mobile service',
              'Professional equipment',
              'Thorough cleaning',
              'Transparent pricing',
              'Customer service',
              'Scheduled maintenance',
              'Service records',
              'Residential & commercial',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-navy-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-clean-500 flex-shrink-0" />
                <span className="text-navy-800 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-aqua-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-aqua-600/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Schedule Your Tank Cleaning <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready for Cleaner Water?</h2>
          <p className="text-navy-200 text-lg mb-8">Book your professional tank cleaning today and experience the difference.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy-900 rounded-xl font-bold text-lg hover:bg-navy-50 transition-colors">
              Book a Cleaning
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
